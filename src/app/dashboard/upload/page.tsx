"use client";
import React, { useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import OneDriveWidget from "./OneDriveWidget";
import GoogleDriveWidget from "./GoogleDriveWidget";
import Image from "next/image";

const TABS = ["Lokaal", "Supabase", "OneDrive", "Google Drive"];

export default function UploadPage() {
  const [localMessage, setLocalMessage] = useState<string>("");
  const [localFilter, setLocalFilter] = useState("");
  const [localSort, setLocalSort] = useState<"name"|"size"|"date">("name");
  const [localSortDir, setLocalSortDir] = useState<"asc"|"desc">("asc");
  const [tab, setTab] = useState("Lokaal");
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [supabaseUploading, setSupabaseUploading] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState<string>("");

  async function handleSupabaseUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!localFile) return;
    setSupabaseUploading(true);
    const { error } = await supabase.storage.from("files").upload(localFile.name, localFile);
    if (!error) {
      const { data } = supabase.storage.from("files").getPublicUrl(localFile.name);
      setSupabaseUrl(data?.publicUrl || "");
    }
    setSupabaseUploading(false);
  }

  return (
    <div className="p-10">
      <a href="/dashboard" className="inline-block mb-2 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition">← Terug</a>
      <h1 className="text-3xl font-bold mb-4">Upload</h1>
      <div className="mb-6 flex gap-4">
        {TABS.map(t => (
          <button
            key={t}
            className={`px-4 py-2 rounded ${tab === t ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
            onClick={() => setTab(t)}
          >{t}</button>
        ))}
      </div>
      {tab === "Lokaal" && (
        <div className="bg-gray-900 rounded-xl p-6 shadow text-white flex flex-col gap-4 max-w-md">
          <label className="font-bold mb-2">Upload lokaal bestand</label>
          <input
            type="file"
            className="text-xs mb-2"
            onChange={e => setLocalFile(e.target.files?.[0] || null)}
            placeholder="Kies bestand..."
            title="Bestand kiezen"
          />
          <button
            className="bg-blue-600 text-white text-xs px-4 py-2 rounded w-fit mb-2"
            disabled={!localFile}
            onClick={() => {
              if (localFile) {
                setLocalFiles(prev => [...prev, localFile]);
                setLocalFile(null);
                setLocalMessage(`Bestand '${localFile.name}' toegevoegd aan lokaal systeem.`);
                setTimeout(() => setLocalMessage(""), 2500);
              }
            }}
          >Upload</button>
          {localMessage && (
            <div className="bg-green-700 text-white text-xs px-3 py-2 rounded mb-2 animate-fade-in">
              {localMessage}
            </div>
          )}
          <div className="mt-4">
            <h3 className="font-bold mb-2 text-sm">Lokaal bestandssysteem</h3>
            <div className="flex gap-2 mb-2">
              <input
                className="text-xs px-2 py-1 rounded bg-gray-800 text-white"
                placeholder="Filter op naam..."
                value={localFilter}
                onChange={e => setLocalFilter(e.target.value)}
              />
              <select
                className="text-xs bg-gray-800 text-white rounded px-2 py-1"
                value={localSort}
                onChange={e => setLocalSort(e.target.value as "name"|"size"|"date")}
                title="Sorteer op"
              >
                <option value="name">Naam</option>
                <option value="size">Grootte</option>
                <option value="date">Datum</option>
              </select>
              <button className="bg-gray-800 text-white text-xs px-2 py-1 rounded" onClick={() => setLocalSortDir(d => d === "asc" ? "desc" : "asc")}>{localSortDir === "asc" ? "↑" : "↓"}</button>
            </div>
            {localFiles.length === 0 && <span className="text-gray-500 text-xs">Geen bestanden geüpload</span>}
            <ul className="space-y-2">
              {localFiles
                .filter(file => file.name.toLowerCase().includes(localFilter.toLowerCase()))
                .sort((a, b) => {
                  let valA: string|number = "", valB: string|number = "";
                  if (localSort === "name") {
                    valA = a.name.toLowerCase(); valB = b.name.toLowerCase();
                  } else if (localSort === "size") {
                    valA = a.size; valB = b.size;
                  } else {
                    valA = a.lastModified || 0; valB = b.lastModified || 0;
                  }
                  if (valA < valB) return localSortDir === "asc" ? -1 : 1;
                  if (valA > valB) return localSortDir === "asc" ? 1 : -1;
                  return 0;
                })
                .map((file, idx) => {
                  const ext = file.name.split('.').pop()?.toLowerCase() || "";
                  // Fictieve attributen
                  const pad = `C:/Gebruikers/Jordan/Bestanden/${file.name}`;
                  const readonly = ext === "pdf" || ext === "jpg";
                  return (
                    <li key={idx} className="flex flex-col bg-gray-800 rounded p-2 text-xs">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                        <span className="font-mono truncate max-w-[160px]">{file.name}</span>
                        <span className="ml-2 text-gray-400">Type: {file.type || "Onbekend type"}</span>
                        <span className="ml-2 text-gray-400">Extensie: {ext}</span>
                        <span className="ml-2 text-gray-400">Grootte: {(file.size/1024).toLocaleString(undefined, {maximumFractionDigits:2})} KB</span>
                        <span className="ml-2 text-gray-400">Datum: {file.lastModified ? new Date(file.lastModified).toLocaleString() : "Geen datum"}</span>
                        <span className="ml-2 text-gray-400">Pad: {pad}</span>
                        <span className="ml-2 text-gray-400">Readonly: {readonly ? "Ja" : "Nee"}</span>
                        <span className="ml-2 text-gray-400">Status: Lokaal</span>
                        <span className="ml-2 text-gray-400">Index: {idx+1}</span>
                        <button
                          className="text-blue-400 underline ml-2"
                          onClick={() => {
                            const url = URL.createObjectURL(file);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = file.name;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }}
                        >Download</button>
                        <button
                          className="text-red-400 ml-2 text-xs"
                          onClick={() => setLocalFiles(files => files.filter((_, i) => i !== idx))}
                        >Verwijder</button>
                      </div>
                      <div className="flex gap-2 flex-wrap mt-2">
                        <span className="bg-gray-700 px-2 py-1 rounded">Bestandsnaam: {file.name}</span>
                        <span className="bg-gray-700 px-2 py-1 rounded">Type: {file.type || "Onbekend"}</span>
                        <span className="bg-gray-700 px-2 py-1 rounded">Extensie: {ext}</span>
                        <span className="bg-gray-700 px-2 py-1 rounded">Grootte: {(file.size/1024).toLocaleString(undefined, {maximumFractionDigits:2})} KB</span>
                        <span className="bg-gray-700 px-2 py-1 rounded">Datum: {file.lastModified ? new Date(file.lastModified).toLocaleString() : "Onbekend"}</span>
                        <span className="bg-gray-700 px-2 py-1 rounded">Pad: {pad}</span>
                        <span className="bg-gray-700 px-2 py-1 rounded">Readonly: {readonly ? "Ja" : "Nee"}</span>
                        <span className="bg-gray-700 px-2 py-1 rounded">Index: {idx+1}</span>
                      </div>
                      {file.type.startsWith("image/") && (
                        <Image src={URL.createObjectURL(file)} alt={file.name} width={160} height={120} className="mt-2 max-h-32 rounded" onLoad={e => URL.revokeObjectURL((e.target as HTMLImageElement).src)} />
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
      {tab === "Supabase" && (
        <div className="bg-gray-900 rounded-xl p-6 shadow text-white flex flex-col gap-4 max-w-md">
          <label className="font-bold mb-2">Upload naar Supabase Storage</label>
          <form onSubmit={handleSupabaseUpload} className="flex gap-2 items-center">
            <input
              type="file"
              className="text-xs"
              onChange={e => setLocalFile(e.target.files?.[0] || null)}
              placeholder="Kies bestand..."
              title="Bestand kiezen"
            />
            <button type="submit" className="bg-blue-600 text-white text-xs px-2 py-1 rounded" disabled={supabaseUploading}>
              {supabaseUploading ? "Uploaden..." : "Upload"}
            </button>
          </form>
          {supabaseUrl && (
            <a
              href={supabaseUrl}
              className="text-blue-400 underline text-xs mt-2"
              target="_blank"
              rel="noopener"
            >Download link: {localFile?.name}</a>
          )}
        </div>
      )}
      {(tab === "OneDrive" || tab === "Google Drive") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OneDriveWidget options={{ upload: true, delete: true, sort: true, filter: true }} />
          <GoogleDriveWidget options={{ upload: true, delete: true, sort: true, filter: true }} />
        </div>
      )}
      {tab === "Google Drive" && (
        <div className="bg-gray-900 rounded-xl p-6 shadow text-white flex flex-col gap-4 max-w-md">
          <label className="font-bold mb-2">Google Drive integratie volgt...</label>
        </div>
      )}
    </div>
  );
}