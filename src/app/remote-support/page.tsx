"use client";
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function RemoteSupportPage() {
  const [teamViewerId, setTeamViewerId] = useState("");
  const [teamViewerPass, setTeamViewerPass] = useState("");
  const supportLink = teamViewerId ? `teamviewer://${teamViewerId}` : "";

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-4 max-w-md mx-auto mt-8">
      <h2 className="font-bold text-lg mb-2 text-white">Remote Support</h2>
      <p className="text-xs text-gray-400 mb-2">
        Vul hieronder je TeamViewer-ID en wachtwoord in. Deel deze gegevens met je supportmedewerker om je sessie te starten.
      </p>
      <input
        type="text"
        className="px-2 py-1 rounded bg-gray-700 text-white text-xs border-none outline-none mb-2"
        placeholder="TeamViewer ID"
        value={teamViewerId}
        onChange={e => setTeamViewerId(e.target.value)}
      />
      <input
        type="text"
        className="px-2 py-1 rounded bg-gray-700 text-white text-xs border-none outline-none mb-2"
        placeholder="Wachtwoord"
        value={teamViewerPass}
        onChange={e => setTeamViewerPass(e.target.value)}
      />
      {teamViewerId && (
        <div className="flex flex-col items-center gap-2 mt-2">
          <span className="text-xs text-gray-400">TeamViewer Link:</span>
          <a href={supportLink} className="text-blue-400 underline text-xs" target="_blank" rel="noopener">{supportLink}</a>
          <QRCodeCanvas value={supportLink} size={128} />
        </div>
      )}
      <div className="mt-4 text-xs text-gray-500">
        <b>Let op:</b> Deel je TeamViewer gegevens alleen met vertrouwde personen.
      </div>
    </div>
  );
}
