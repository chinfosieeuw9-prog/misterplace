import React from "react";

export default function DownloadPage() {
  return (
    <div className="p-10">
  <a href="/dashboard" className="inline-block mb-2 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition">← Terug</a>
      <h1 className="text-3xl font-bold mb-4">Download</h1>
      <p className="text-gray-400 mb-8">Hier kun je straks bestanden downloaden van lokaal, online, OneDrive of Google Drive.</p>
      {/* Hier komt het uitgebreide bestandensysteem */}
      <div className="bg-gray-900 rounded-xl p-6 shadow text-white">Download functionaliteit volgt...</div>
    </div>
  );
}