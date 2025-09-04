"use client";
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const TeamViewerWidget: React.FC = () => {
  const [teamViewerId, setTeamViewerId] = useState("");
  const [teamViewerPass, setTeamViewerPass] = useState("");
  const supportLink = teamViewerId ? `teamviewer://${teamViewerId}` : "";

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-3 widget-uniform">
      <span className="font-bold mb-2">TeamViewer Sessie</span>
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
          <QRCodeCanvas value={supportLink} size={96} />
        </div>
      )}
      <div className="mt-2 text-xs text-gray-500">
        Vul je TeamViewer gegevens in en deel ze met je supportmedewerker.
      </div>
    </div>
  );
};

export default TeamViewerWidget;
