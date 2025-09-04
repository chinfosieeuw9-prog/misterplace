import React from "react";
import './widgets.css';

const SystemInfoWidget: React.FC = () => {
  const isClient = typeof window !== "undefined";
  const os = isClient ? window.navigator.platform : "-";
  const browser = isClient ? window.navigator.userAgent : "-";
  const screen = isClient ? `${window.screen.width}x${window.screen.height}` : "-";
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Systeeminfo</span>
      <span className="text-xs text-gray-400">OS: <span className="text-white">{os}</span></span>
      <span className="text-xs text-gray-400">Browser: <span className="text-white">{browser}</span></span>
      <span className="text-xs text-gray-400">Resolutie: <span className="text-white">{screen}</span></span>
    </div>
  );
};

export default SystemInfoWidget;
