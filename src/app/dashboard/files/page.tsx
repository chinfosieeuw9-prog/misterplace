"use client";
import React from "react";
import FileManagerWidget from "../lan/FileManagerWidget";
import Link from "next/link";

export default function FilesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Bestandenbeheer</h1>
      <Link href="/dashboard" className="mb-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
        Terug naar Dashboard
      </Link>
      <div className="bg-gray-900 rounded-xl p-6 shadow text-white flex flex-col gap-4 w-full max-w-3xl">
        <span className="text-gray-400 text-xs mb-2">Hier kun je bestanden uploaden, downloaden, verwijderen, bekijken en beheren.</span>
        <FileManagerWidget />
      </div>
    </div>
  );
}
