import React from "react";

export default function SettingsPage() {
  return (
    <div className="bg-gray-900 rounded-xl p-8 shadow mt-4">
      <a href="/dashboard" className="inline-block mb-4 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition">← Terug naar dashboard</a>
      <h1 className="text-2xl font-bold mb-6">Instellingen</h1>
      <ul className="mb-4">
        <li><a href="/dashboard/settings/user" className="text-blue-400 hover:underline">Mijn instellingen</a></li>
        <li><a href="/dashboard/settings/device" className="text-blue-400 hover:underline">Instellingen device</a></li>
      </ul>
      <p className="text-gray-400">Kies een categorie om te beheren.</p>
    </div>
  );
}
