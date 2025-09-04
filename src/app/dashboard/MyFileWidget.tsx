"use client";
import React from "react";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function MyFileWidget() {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem("file") as HTMLInputElement);
    const file = input?.files?.[0];
    if (file) {
      setUploading(true);
  const { error } = await supabase.storage.from("files").upload(file.name, file);
      if (!error) {
        const { data } = supabase.storage.from("files").getPublicUrl(file.name);
        setFileUrl(data?.publicUrl || "");
      }
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 min-w-[220px]">
      <h2 className="text-lg font-bold mb-2">Mijn bestanden</h2>
      <form className="flex gap-2 items-center" onSubmit={handleUpload}>
        <input type="file" name="file" className="text-xs" placeholder="Kies bestand..." title="Bestand kiezen" />
        <button type="submit" className="bg-blue-600 text-white text-xs px-2 py-1 rounded" disabled={uploading}>
          {uploading ? "Uploaden..." : "Upload"}
        </button>
      </form>
      {fileUrl && (
        <a
          href={fileUrl}
          className="bg-gray-900 text-blue-400 underline text-xs px-2 py-1 rounded mt-2"
          target="_blank"
          rel="noopener"
        >Download mijn laatste bestand</a>
      )}
    </div>
  );
}