"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function UploadForm() {
  const [files, setFiles] = useState<{ name: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  // Ophalen van bestanden uit Supabase Storage
  useEffect(() => {
    async function fetchFiles() {
      const { data, error } = await supabase.storage.from("files").list();
      if (!error && data) setFiles(data);
    }
    fetchFiles();
  }, []);

  // Upload handler
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { error } = await supabase.storage.from("files").upload(file.name, file);
    setUploading(false);
    if (!error) {
      // Refresh lijst
      const { data } = await supabase.storage.from("files").list();
      if (data) setFiles(data);
    } else {
      alert("Upload mislukt: " + error.message);
    }
  }

  // Download link generator
  function getDownloadUrl(name: string) {
    const { data } = supabase.storage.from("files").getPublicUrl(name);
    return data?.publicUrl || "#";
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
      <form className="flex gap-2 items-center" onSubmit={e => e.preventDefault()}>
        <input
          type="file"
          className="block text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          onChange={handleUpload}
          disabled={uploading}
          placeholder="Kies een bestand..."
          title="Bestand kiezen"
        />
        {uploading && <span className="text-xs text-blue-400">Uploaden...</span>}
      </form>
      <ul className="space-y-1 mt-2">
        {files.map(file => (
          <li key={file.name} className="flex justify-between items-center bg-gray-900 rounded p-2 text-xs">
            <span className="font-mono truncate max-w-[120px]">{file.name}</span>
            <a href={getDownloadUrl(file.name)} target="_blank" rel="noopener" className="text-blue-400 underline">Download</a>
          </li>
        ))}
        {files.length === 0 && <li className="text-gray-500 text-xs">Geen bestanden gevonden</li>}
      </ul>
    </div>
  );
}