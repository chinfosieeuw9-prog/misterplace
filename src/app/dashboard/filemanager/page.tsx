"use client";
import React from "react";
import QRCodeModal from "./QRCodeModal";


const FileManagerPage: React.FC = () => {
  // Preview functionaliteit herstellen
  const [previewFile, setPreviewFile] = React.useState<string | null>(null);
  const [previewType, setPreviewType] = React.useState<string | null>(null);
  function closePreview() { setPreviewFile(null); setPreviewType(null); }
  function handlePreview(name: string) {
    // Dummy: laat alleen bestandsnaam zien, type op basis van extensie
    setPreviewFile(name);
    if (name.endsWith('.pdf')) setPreviewType('pdf');
    else if (name.match(/\.(png|jpg|jpeg|gif|webp)$/i)) setPreviewType('image');
    else if (name.match(/\.(txt|md|log)$/i)) setPreviewType('text');
    else if (name.match(/\.(mp3|wav)$/i)) setPreviewType('audio');
    else if (name.match(/\.(mp4|webm|avi)$/i)) setPreviewType('video');
    else setPreviewType('other');
  }
  const [folders, setFolders] = React.useState<string[]>([]);
  const [activeFolder, setActiveFolder] = React.useState<string>("root");
  const [files, setFiles] = React.useState<{name: string, path: string}[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [apiError, setApiError] = React.useState<string>("");

  // Dynamische API-URL helper
  function getApiUrl(path: string) {
    // Gebruik window.location.hostname en poort, standaard 5000 als niet op localhost
    if (typeof window === "undefined") return `http://localhost:5000${path}`;
    const { hostname } = window.location;
    let port = window.location.port;
    // Als frontend op 3000/3001 draait, gebruik backend op 5000
    if (port === "3000" || port === "3001" || port === "") port = "5000";
    return `http://${hostname}:${port}${path}`;
  }

  // Ophalen van mappen en bestanden
  React.useEffect(() => {
    setApiError("");
    fetch(getApiUrl("/api/folders"))
      .then(r => {
        if (!r.ok) throw new Error(`API error: ${r.status} ${r.statusText}`);
        return r.json();
      })
      .then(setFolders)
      .catch(err => setApiError(err.message));
  }, []);
  React.useEffect(() => {
    setApiError("");
    fetch(getApiUrl(`/api/files?folder=${activeFolder}`))
      .then(r => {
        if (!r.ok) throw new Error(`API error: ${r.status} ${r.statusText}`);
        return r.json();
      })
      .then(setFiles)
      .catch(err => setApiError(err.message));
  }, [activeFolder]);

  function handleFolderClick(folder: string) {
    setActiveFolder(folder);
  }
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("folder", activeFolder);
    await fetch(getApiUrl("/api/upload"), {
      method: "POST",
      body: formData,
      // geen headers, browser zet automatisch multipart/form-data
    });
    setUploading(false);
    // Refresh files
    fetch(getApiUrl(`/api/files?folder=${activeFolder}`))
      .then(r => r.json())
      .then(setFiles);
  }
  const [showQR, setShowQR] = React.useState<string | null>(null);
  const [expiryDate, setExpiryDate] = React.useState<string>("");
  const [copiedUrl, setCopiedUrl] = React.useState<string | null>(null);
  function handleCopyUrl(name: string) {
    let url = `${window.location.origin}/files/${encodeURIComponent(name)}`;
    if (expiryDate) {
      url += `?expires=${encodeURIComponent(expiryDate)}`;
    }
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    return (
      <div className="p-10">
        <a href="/dashboard" className="inline-block mb-2 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition">← Terug naar dashboard</a>
        <h1 className="text-3xl font-bold mb-4">Bestandbeheer</h1>
        {apiError && (
          <div className="bg-red-700 text-white p-2 rounded mb-4 text-xs">API fout: {apiError}</div>
        )}
        <div className="flex gap-8">
          <div className="bg-gray-900 rounded-xl p-6 shadow text-white flex flex-col gap-4 min-w-[200px]">
            <span className="font-bold mb-2">Mappen</span>
            {/* ...rest van de mappen UI... */}
          </div>
          <div className="flex-1 bg-gray-900 rounded-xl p-6 shadow text-white flex flex-col gap-4">
            <div className="flex gap-4 items-center mb-4">
              <input
                type="text"
                className="bg-gray-800 text-white px-4 py-2 rounded w-full"
                placeholder="Zoek bestanden..."
                autoComplete="off"
              />
              <label className="relative">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
                <span className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer select-none">Upload bestand</span>
              </label>
            </div>
            {/* ...rest van de bestanden UI... */}
          </div>
        </div>
        {/* ...rest van de pagina... */}
      </div>
    );
  }
  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="mb-4">
        <a href="/dashboard" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">← Terug naar dashboard</a>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-white">Bestandbeheer</h1>
      {/* Preview popup */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 relative w-[90vw] max-w-2xl max-h-[90vh] flex flex-col items-center">
            <button className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded" onClick={closePreview}>Sluiten</button>
            {previewType === 'pdf' && (
              <iframe src={previewFile!} className="w-full h-[70vh] bg-white rounded" title="PDF preview"></iframe>
            )}
            {previewType === 'image' && previewFile && (
              <img src={`http://localhost:5000/uploads/${activeFolder}/${previewFile}`} alt="Preview" className="preview-img" />
            )}
            {previewType === 'text' && (
              <pre className="bg-gray-900 text-white p-4 rounded w-full h-[70vh] overflow-auto">{previewFile}</pre>
            )}
            {previewType === 'audio' && previewFile && (
              <audio controls src={previewFile} className="w-full mt-4" />
            )}
            {previewType === 'video' && previewFile && (
              <video controls src={previewFile} className="w-full max-h-[70vh] mt-4 rounded" />
            )}
            {previewType === 'other' && (
              <div className="text-white">Geen preview beschikbaar voor dit bestandstype.</div>
            )}
          </div>
        </div>
      )}
      {/* Sidebar voor mappen */}
      <div className="flex gap-6">
        <aside className="w-64 bg-gray-800 rounded-xl p-4 text-white">
          <h2 className="font-semibold mb-4">Mappen</h2>
          <form className="mb-4 flex gap-2" onSubmit={async e => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.folderName as HTMLInputElement;
            const name = input.value.trim();
            if (!name) return;
            // Maak map aan via upload van dummy bestand
            const formData = new FormData();
            formData.append("file", new Blob(["dummy"], { type: "text/plain" }), "dummy.txt");
            formData.append("folder", name);
            await fetch(getApiUrl("/api/upload"), { method: "POST", body: formData });
            input.value = "";
            fetch(getApiUrl("/api/folders")).then(r => r.json()).then(setFolders);
          }}>
            <input name="folderName" type="text" className="bg-gray-700 text-white px-2 py-1 rounded w-full" placeholder="Nieuwe map..." />
            <button type="submit" className="bg-green-600 px-2 py-1 rounded">Maak map</button>
          </form>
          <ul>
            {folders.map(folder => (
              <li key={folder} className={`mb-2 cursor-pointer flex items-center gap-2 ${activeFolder === folder ? 'font-bold text-blue-400' : ''}`}>
                <span onClick={() => handleFolderClick(folder)} style={{flex:1}}>📁 {folder}</span>
                {folder !== 'root' && (
                  <button className="bg-red-600 text-xs px-2 py-1 rounded" onClick={async e => {
                    e.stopPropagation();
                    // Verwijder map door alle bestanden te verwijderen
                    const res = await fetch(getApiUrl(`/api/files?folder=${folder}`));
                    const files = await res.json();
                    for (const file of files) {
                      await fetch(getApiUrl("/api/delete"), {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ folder, name: file.name })
                      });
                    }
                    // Verwijder map zelf (optioneel, als leeg)
                    await fetch(getApiUrl("/api/delete-folder"), {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ folder })
                    });
                    fetch(getApiUrl("/api/folders")).then(r => r.json()).then(setFolders);
                  }}>Verwijder</button>
                )}
              </li>
            ))}
          </ul>
        </aside>
        {/* Hoofdsectie voor bestanden */}
        <main className="flex-1 bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <input className="bg-gray-700 text-white p-2 rounded w-1/2" placeholder="Zoek bestanden..." autoComplete="off" />
            <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
              {uploading ? "Uploaden..." : "Upload bestand"}
              <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
          {/* Bestanden grid */}
          <ul className="divide-y divide-gray-800">
            {files.map(file => (
              <li key={file.name} className="flex items-center py-2 px-2 hover:bg-gray-700 cursor-pointer text-sm" onClick={() => handlePreview(file.name)}>
                <span className="mr-2 text-lg">{file.name.endsWith('.pdf') ? '📄' : file.name.match(/\.(png|jpg|jpeg|gif|webp)$/i) ? '�️' : '📦'}</span>
                <span className="flex-1 truncate text-white">{file.name}</span>
                <a href={`http://localhost:5000${file.path}`} className="bg-green-600 text-xs px-1 py-0.5 rounded mx-1" download>⬇</a>
                <button className="bg-red-600 text-xs px-1 py-0.5 rounded mx-1" onClick={async e => {
                  e.stopPropagation();
                  await fetch("http://localhost:5000/api/delete", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ folder: activeFolder, name: file.name })
                  });
                  fetch(`http://localhost:5000/api/files?folder=${activeFolder}`)
                    .then(r => r.json())
                    .then(setFiles);
                }}>🗑️</button>
                <button className="bg-blue-600 text-xs px-1 py-0.5 rounded mx-1" onClick={e => {e.stopPropagation(); handlePreview(file.name);}}>👁️</button>
                <button className="bg-gray-600 text-xs px-1 py-0.5 rounded mx-1" onClick={async e => {
                  e.stopPropagation();
                  // Unieke downloadlink genereren
                  const downloadUrl = `http://localhost:5000/api/download?folder=${activeFolder}&name=${encodeURIComponent(file.name)}`;
                  navigator.clipboard.writeText(downloadUrl);
                  setCopiedUrl(downloadUrl);
                  setShowQR(downloadUrl);
                  setTimeout(() => setCopiedUrl(null), 2000);
                }}>🔗</button>
                <input type="date" className="bg-gray-900 text-white text-xs px-1 py-0.5 rounded ml-1 w-[90px]" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} title="Vervaldatum" />
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default FileManagerPage;
