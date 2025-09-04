"use client";
import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function LastUploadWidget() {
  const [lastFile, setLastFile] = useState<{ name: string; created_at?: string; size?: number } | null>(null);

  useEffect(() => {
  const interval: NodeJS.Timeout = setInterval(fetchLastFile, 10000);
    async function fetchLastFile() {
  const { data, error } = await supabase.storage.from("files").list();
      if (!error && data && data.length > 0) {
        // Sorteer op datum, indien beschikbaar
        const sorted = [...data].sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        });
        setLastFile({ name: sorted[0].name, created_at: sorted[0].created_at, size: sorted[0].metadata?.size });
      } else {
        setLastFile(null);
      }
    }
    fetchLastFile();
  // interval is now a const, so no reassignment
  return () => clearInterval(interval);
  }, []);

  // Functies buiten useEffect plaatsen
  function formatSize(bytes?: number) {
    if (!bytes) return "Onbekend";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function getDownloadUrl(name: string) {
    const { data } = supabase.storage.from("files").getPublicUrl(name);
    return data?.publicUrl || "#";
  }

  function formatDate(dateStr?: string) {
    if (!dateStr) return "Onbekend";
    const d = new Date(dateStr);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  }

  return (
  <div className="widget-uniform widget-compact flex flex-col">
      <span className="text-gray-400 text-sm">Laatste upload</span>
      {lastFile ? (
        <>
          <span className="text-3xl font-bold mt-2 truncate max-w-[140px]">{lastFile.name}</span>
          <span className="text-blue-400 text-xs mt-1">{formatDate(lastFile.created_at)}</span>
          <span className="text-gray-400 text-xs mt-1">Grootte: {formatSize(lastFile.size)}</span>
          <a
            href={getDownloadUrl(lastFile.name)}
            target="_blank"
            rel="noopener"
            className="text-blue-400 underline text-xs mt-1"
          >Download</a>
          <form className="mt-2 flex gap-2 items-center" onSubmit={async e => {
            e.preventDefault();
            const input = (e.target as HTMLFormElement).elements.namedItem("file") as HTMLInputElement;
            const file = input?.files?.[0];
            if (file) {
              await supabase.storage.from("files").upload(file.name, file);
            }
          }}>
            <input type="file" name="file" className="text-xs max-w-[110px]" placeholder="Kies bestand" />
            <button type="submit" className="bg-blue-600 text-white text-xs px-2 py-1 rounded max-w-[70px]">Upload</button>
          </form>
        </>
      ) : (
        <>
          <span className="text-gray-500 text-xs mt-2">Geen uploads gevonden</span>
          <form className="mt-2 flex gap-2 items-center" onSubmit={async e => {
            e.preventDefault();
            const input = (e.target as HTMLFormElement).elements.namedItem("file") as HTMLInputElement;
            const file = input?.files?.[0];
            if (file) {
              await supabase.storage.from("files").upload(file.name, file);
            }
          }}>
            <input type="file" name="file" className="text-xs max-w-[110px]" placeholder="Kies bestand" />
            <button type="submit" className="bg-blue-600 text-white text-xs px-2 py-1 rounded max-w-[70px]">Upload</button>
          </form>
        </>
      )}
    </div>
  );
}