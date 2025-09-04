import React from "react";

const SystemStatusWidget: React.FC = () => {
  // Mock data, later uitbreiden met echte API
  const battery = "87%";
  const storage = "2.1 GB / 32 GB";
  const cpu = "12%";
  const network = "Online";
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Systeemstatus</span>
      <span className="text-xs text-gray-400">Batterij: <span className="text-white">{battery}</span></span>
      <span className="text-xs text-gray-400">Opslag: <span className="text-white">{storage}</span></span>
      <span className="text-xs text-gray-400">CPU: <span className="text-white">{cpu}</span></span>
      <span className="text-xs text-gray-400">Netwerk: <span className="text-white">{network}</span></span>
    </div>
  );
};

export default SystemStatusWidget;
