"use client";
import React, { useEffect, useState } from "react";
import './widgets.css';

const WifiInfoWidget: React.FC = () => {
  const [publicIp, setPublicIp] = useState<string>("");
  const [copied, setCopied] = useState(false);
  // Niet beschikbaar online: wifi-netwerken, connectie, ssid, strength, channel
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setPublicIp(data.ip));
    // Wifi-informatie en netwerklijst niet beschikbaar in online omgeving
  }, []);
  // ssid niet gebruikt in online omgeving
  const status = typeof navigator !== "undefined" && navigator.onLine ? "Verbonden" : "Offline";
  const details = `Publiek IP: ${publicIp}\nStatus: ${status}`;
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Beschikbare WiFi-netwerken</span>
      <div className="bg-gray-800 text-white px-2 py-1 rounded mb-2 text-xs">Lijst met wifi-netwerken niet beschikbaar online.</div>
      {/* Connectie niet beschikbaar online */}
      <span className="font-bold mb-2">WiFi Info</span>
      <span className="text-xs text-gray-400">Publiek IP: <span className="text-white">{publicIp || "Laden..."}</span></span>
      <span className="text-xs text-gray-400">Status: <span className={status === "Verbonden" ? "text-green-400" : "text-red-400"}>{status}</span></span>
      <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded w-fit mt-2" onClick={() => {navigator.clipboard.writeText(details);setCopied(true);setTimeout(()=>setCopied(false),1500);}}>{copied ? "Gekopieerd!" : "Kopieer info"}</button>
      {status === "Offline" && <span className="text-red-400 text-xs mt-2">Je bent offline!</span>}
    </div>
  );
};

export default WifiInfoWidget;