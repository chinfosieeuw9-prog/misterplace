"use client";
import React from "react";
import Image from "next/image";

type WidgetOptions = {
  upload?: boolean;
  delete?: boolean;
  sort?: boolean;
  filter?: boolean;
};

type OneDriveFile = {
  id: string;
  name: string;
  lastModifiedDateTime?: string;
  file?: { mimeType?: string };
  '@microsoft.graph.downloadUrl'?: string;
  size?: number;
  parentReference?: { path?: string };
  createdBy?: { user?: { displayName?: string } };
  shared?: boolean;
};

const CLIENT_ID = "YOUR_CLIENT_ID_HERE";

  function OneDriveWidget({ options = {} }: { options?: WidgetOptions }) {
    const [token, setToken] = React.useState<string>("");
    const [files, setFiles] = React.useState<OneDriveFile[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string>("");
    const [filter, setFilter] = React.useState<string>("");
    const [sortBy, setSortBy] = React.useState<"name"|"date"|"type">("name");
    const [sortDir, setSortDir] = React.useState<"asc"|"desc">("asc");
    const [uploading, setUploading] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Haal access token uit URL fragment
    React.useEffect(() => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash.includes("access_token")) {
          const params = new URLSearchParams(hash.replace("#", ""));
          const accessToken = params.get("access_token") || "";
          setToken(accessToken);
          window.location.hash = "";
        }
      }
    }, []);

    // Ophalen bestanden uit OneDrive
    React.useEffect(() => {
      if (!token) return;
      setLoading(true);
      setError("");
      fetch("https://graph.microsoft.com/v1.0/me/drive/root/children", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setFiles(data.value || []);
          setLoading(false);
        })
        .catch(() => {
          setError("Fout bij ophalen bestanden");
          setLoading(false);
        });
    }, [token]);

    // Upload bestand naar OneDrive
    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (!fileInputRef.current?.files?.[0]) return;
      setUploading(true);
      setError("");
      const file = fileInputRef.current.files[0];
      try {
        const res = await fetch("https://graph.microsoft.com/v1.0/me/drive/root:/" + encodeURIComponent(file.name) + ":/content", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: file,
        });
        if (!res.ok) throw new Error("Upload mislukt");
        // Refresh lijst
        const data = await res.json();
        setFiles(f => [...f, data]);
      } catch {
        setError("Upload mislukt");
      }
      setUploading(false);
    }

    // Verwijder bestand uit OneDrive
    async function handleDelete(id: string) {
      setError("");
      try {
        const res = await fetch("https://graph.microsoft.com/v1.0/me/drive/items/" + id, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Verwijderen mislukt");
        setFiles(f => f.filter(file => file.id !== id));
      } catch {
        setError("Verwijderen mislukt");
      }
    }

    // Sorteren en filteren
    function getVisibleFiles() {
      let result = [...files];
      if (filter) {
        result = result.filter(f => f.name && f.name.toLowerCase().includes(filter.toLowerCase()));
      }
      result.sort((a, b) => {
        let valA: string | number = "", valB: string | number = "";
        if (sortBy === "name") {
          valA = a.name?.toLowerCase() || ""; valB = b.name?.toLowerCase() || "";
        } else if (sortBy === "date") {
          valA = new Date(a.lastModifiedDateTime || 0).getTime(); valB = new Date(b.lastModifiedDateTime || 0).getTime();
        } else {
          valA = (a.file?.mimeType || ""); valB = (b.file?.mimeType || "");
        }
        if (valA < valB) return sortDir === "asc" ? -1 : 1;
        if (valA > valB) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
      return result;
    }

    // Download functie
    function handleDownload(url: string, name: string) {
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function login() {
      window.location.href =
        `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(window.location.origin + "/dashboard/upload")}&scope=Files.ReadWrite.All offline_access`;
    }

    return (
      <div className="bg-gray-900 rounded-xl p-6 shadow text-white flex flex-col gap-4 max-w-xl">
        <label className="font-bold mb-2">OneDrive</label>
        {!token ? (
          <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded w-fit" onClick={login}>
            Inloggen met Microsoft
          </button>
        ) : (
          <>
            <span className="text-gray-400 text-xs mb-2">Bestanden in jouw OneDrive:</span>
            {error && <span className="text-red-400 text-xs mb-2">{error}</span>}
            {options.filter && (
              <input
                className="text-xs mb-2 px-2 py-1 rounded bg-gray-800 text-white"
                placeholder="Filter op naam..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
            )}
            {options.sort && (
              <div className="flex gap-2 mb-2">
                 <select className="text-xs bg-gray-800 text-white rounded px-2 py-1" value={sortBy} onChange={e => setSortBy(e.target.value as "name"|"date"|"type")} title="Sorteer op">
                  <option value="name">Naam</option>
                  <option value="date">Datum</option>
                  <option value="type">Type</option>
                </select>
                <button className="bg-gray-800 text-white text-xs px-2 py-1 rounded" onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}>{sortDir === "asc" ? "↑" : "↓"}</button>
              </div>
            )}
            {options.upload && (
              <form className="flex gap-2 items-center mb-2" onSubmit={handleUpload}>
                <input ref={fileInputRef} type="file" className="text-xs" title="Bestand kiezen" />
                <button type="submit" className="bg-blue-600 text-white text-xs px-2 py-1 rounded" disabled={uploading}>{uploading ? "Uploaden..." : "Upload"}</button>
              </form>
            )}
             <ul className="space-y-1">
               {getVisibleFiles().map(file => (
                 <li key={file.id} className="flex flex-col bg-gray-800 rounded p-2 text-xs">
                   <div className="flex justify-between items-center">
                     <span className="font-mono truncate max-w-[160px]">{file.name}</span>
                     <span className="ml-2 text-gray-400">{file.file?.mimeType || "Onbekend type"}</span>
                     <span className="ml-2 text-gray-400">{file.size ? `${(file.size/1024).toFixed(1)} KB` : "? KB"}</span>
                     <span className="ml-2 text-gray-400">{file.lastModifiedDateTime ? new Date(file.lastModifiedDateTime).toLocaleString() : "Geen datum"}</span>
                     {file['@microsoft.graph.downloadUrl'] && (
                       <button className="text-blue-400 underline ml-2" onClick={() => handleDownload(file['@microsoft.graph.downloadUrl']!, file.name)}>
                         Download
                       </button>
                     )}
                     {options.delete && (
                       <button className="text-red-400 ml-2 text-xs" onClick={() => handleDelete(file.id)}>Verwijder</button>
                     )}
                   </div>
                   {file.file?.mimeType?.startsWith("image/") && file['@microsoft.graph.downloadUrl'] && (
                     <Image src={file['@microsoft.graph.downloadUrl']} alt={file.name} width={160} height={120} className="mt-2 max-h-32 rounded" />
                   )}
                   <div className="flex gap-2 mt-2 flex-wrap">
                     <span className="bg-gray-700 px-2 py-1 rounded">ID: {file.id}</span>
                     <span className="bg-gray-700 px-2 py-1 rounded">Status: {file.size ? "Beschikbaar" : "Onbekend"}</span>
                     <span className="bg-gray-700 px-2 py-1 rounded">Type: {file.file?.mimeType || "Onbekend"}</span>
                     <span className="bg-gray-700 px-2 py-1 rounded">Grootte: {file.size ? `${(file.size/1024).toFixed(1)} KB` : "? KB"}</span>
                     <span className="bg-gray-700 px-2 py-1 rounded">Datum: {file.lastModifiedDateTime ? new Date(file.lastModifiedDateTime).toLocaleString() : "Geen datum"}</span>
                     {file.parentReference?.path && <span className="bg-gray-700 px-2 py-1 rounded">Pad: {file.parentReference.path}</span>}
                     {file.createdBy?.user?.displayName && <span className="bg-gray-700 px-2 py-1 rounded">Eigenaar: {file.createdBy.user.displayName}</span>}
                     {file.shared && <span className="bg-gray-700 px-2 py-1 rounded">Gedeeld</span>}
                   </div>
                 </li>
               ))}
               {getVisibleFiles().length === 0 && !loading && <li className="text-gray-500 text-xs">Geen bestanden gevonden</li>}
             </ul>
             <div className="mt-6 p-4 bg-gray-800 rounded-xl">
               <h3 className="font-bold mb-2 text-sm">Bestandsysteem overzicht</h3>
               <ul className="text-xs text-gray-300">
                 <li>Bestandsnaam, type, grootte, datum, download, preview, status, acties</li>
                 <li>Ondersteunde acties: upload, download, verwijderen, sorteren, filteren</li>
                 <li>Preview voor afbeeldingen, download voor alle types</li>
                 <li>Details: ID, status, datum, type, grootte</li>
               </ul>
             </div>
          </>
        )}
      </div>
    );
  }

export default OneDriveWidget;
