"use client";
import React, { useState } from "react";
import Image from "next/image";

type WidgetOptions = {
  upload?: boolean;
  delete?: boolean;
  sort?: boolean;
  filter?: boolean;
};

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Vervang door je eigen client ID
const REDIRECT_URI = typeof window !== "undefined" ? window.location.origin + "/dashboard/upload" : "";

export default function GoogleDriveWidget({ options = {} }: { options?: WidgetOptions }) {
  const [token, setToken] = useState<string>("");

  function login() {
    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=https://www.googleapis.com/auth/drive.readonly`;
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow text-white flex flex-col gap-4 max-w-xl">
      <label className="font-bold mb-2">Google Drive</label>
      {!token ? (
        <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded w-fit" onClick={login}>
          Inloggen met Google
        </button>
      ) : (
        <>
          <span className="text-gray-400 text-xs mb-2">Bestanden in jouw Google Drive:</span>
          {options.filter && (
            <input className="text-xs mb-2 px-2 py-1 rounded bg-gray-800 text-white" placeholder="Filter op naam..." />
          )}
          {options.sort && (
            <button className="bg-gray-800 text-white text-xs px-2 py-1 rounded mb-2">Sorteren</button>
          )}
          {options.upload && (
            <form className="flex gap-2 items-center mb-2" onSubmit={e => e.preventDefault()}>
              <input type="file" className="text-xs" title="Bestand kiezen" />
              <button type="submit" className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Upload</button>
            </form>
          )}
          <ul className="space-y-1">
            {/* Details: bestandsnaam, type, grootte, datum, download, preview, status, acties */}
            <li className="flex flex-col bg-gray-800 rounded p-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono truncate max-w-[160px]">voorbeeld.pdf</span>
                <span className="ml-2 text-gray-400">application/pdf</span>
                <span className="ml-2 text-gray-400">120 KB</span>
                <span className="ml-2 text-gray-400">31-08-2025 12:00</span>
                <button className="text-blue-400 underline ml-2">Download</button>
                {options.delete && (
                  <button className="text-red-400 ml-2 text-xs">Verwijder</button>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <span className="bg-gray-700 px-2 py-1 rounded">ID: 123456</span>
                <span className="bg-gray-700 px-2 py-1 rounded">Status: Beschikbaar</span>
              </div>
            </li>
            <li className="flex flex-col bg-gray-800 rounded p-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono truncate max-w-[160px]">afbeelding.jpg</span>
                <span className="ml-2 text-gray-400">image/jpeg</span>
                <span className="ml-2 text-gray-400">220 KB</span>
                <span className="ml-2 text-gray-400">30-08-2025 09:30</span>
                <button className="text-blue-400 underline ml-2">Download</button>
                {options.delete && (
                  <button className="text-red-400 ml-2 text-xs">Verwijder</button>
                )}
              </div>
              <Image src="https://via.placeholder.com/100" alt="afbeelding.jpg" width={100} height={100} className="mt-2 max-h-32 rounded" />
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="bg-gray-700 px-2 py-1 rounded">ID: 654321</span>
                <span className="bg-gray-700 px-2 py-1 rounded">Status: Beschikbaar</span>
                <span className="bg-gray-700 px-2 py-1 rounded">Type: image/jpeg</span>
                <span className="bg-gray-700 px-2 py-1 rounded">Grootte: 220 KB</span>
                <span className="bg-gray-700 px-2 py-1 rounded">Datum: 30-08-2025 09:30</span>
                <span className="bg-gray-700 px-2 py-1 rounded">Pad: /drive/images</span>
                <span className="bg-gray-700 px-2 py-1 rounded">Eigenaar: Jordan</span>
                <span className="bg-gray-700 px-2 py-1 rounded">Gedeeld</span>
              </div>
            </li>
            <li className="text-gray-500 text-xs">(Bestandslijst volgt na integratie)</li>
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