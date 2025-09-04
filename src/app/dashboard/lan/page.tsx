"use client";
import React from "react";
import LanToolsWidget from "./LanToolsWidget";

export default function LanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center p-10">
      <a href="/dashboard" className="inline-block mb-4 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition">← Terug naar dashboard</a>
      <h1 className="text-3xl font-bold mb-6">LAN Tools</h1>
      <div className="bg-gray-900 rounded-xl p-6 shadow text-white flex flex-col gap-4 max-w-xl">
        <span className="text-gray-400 text-xs mb-2">Hier komt straks alle LAN informatie, apparaten, snelheid, IP-adressen, en meer.</span>
        {/* Voeg hier widgets en details toe voor LAN */}
        <LanToolsWidget />
      </div>
    </div>
  );
}
