"use client";
import React, { useEffect, useState } from "react";
import './widgets.css';

const WifiInfoWidget: React.FC = () => {
  const [password, setPassword] = useState("");
  const [connectMsg, setConnectMsg] = useState("");
  const [networks, setNetworks] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [publicIp, setPublicIp] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [wifi, setWifi] = useState<{ssid: string, strength: string, channel: string} | null>(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/wifi-list")
      .then(res => res.json())
      .then(data => setNetworks(data.networks || []));
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setPublicIp(data.ip));
    fetch("http://localhost:5000/api/wifi")
      .then(res => res.json())
      .then(data => setWifi(data));
  }, []);
  const ssid = wifi?.ssid || "Onbekend";
  const strength = wifi?.strength || "?";
  const channel = wifi?.channel || "?";
  const status = typeof navigator !== "undefined" && navigator.onLine ? "Verbonden" : "Offline";
  const details = `WiFi naam: ${ssid}\nSignaalsterkte: ${strength}\nKanaal: ${channel}\nPubliek IP: ${publicIp}\nStatus: ${status}`;
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Beschikbare WiFi-netwerken</span>
      <select className="bg-gray-800 text-white px-2 py-1 rounded mb-2" value={selected} onChange={e => setSelected(e.target.value)} title="Beschikbare WiFi-netwerken">
        <option value="">Selecteer WiFi...</option>
        {networks.map((n, i) => <option key={i} value={n}>{n}</option>)}
      </select>
      <div className="flex gap-2 mb-2">
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Wachtwoord" className="px-2 py-1 rounded bg-gray-700 text-white text-xs border-none outline-none" />
        <button className="px-2 py-1 bg-green-600 text-white rounded text-xs" disabled={!selected} onClick={async () => {
          setConnectMsg("Bezig met verbinden...");
          const res = await fetch("http://localhost:5000/api/wifi-connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ssid: selected, password })
          });
          const data = await res.json();
          setConnectMsg(data.success ? "Verbonden!" : `Fout: ${data.error || 'Onbekend'}`);
        }}>Verbind</button>
      </div>
      {connectMsg && <span className="text-xs text-blue-400 mt-1">{connectMsg}</span>}
      <span className="font-bold mb-2">WiFi Info</span>
      <span className="text-xs text-gray-400">WiFi naam: <span className="text-white">{ssid}</span></span>
      <span className="text-xs text-gray-400">Signaalsterkte: <span className="text-white">{strength}</span></span>
      <span className="text-xs text-gray-400">Kanaal: <span className="text-white">{channel}</span></span>
      <span className="text-xs text-gray-400">Publiek IP: <span className="text-white">{publicIp || "Laden..."}</span></span>
      <span className="text-xs text-gray-400">Status: <span className={status === "Verbonden" ? "text-green-400" : "text-red-400"}>{status}</span></span>
      <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded w-fit mt-2" onClick={() => {navigator.clipboard.writeText(details);setCopied(true);setTimeout(()=>setCopied(false),1500);}}>{copied ? "Gekopieerd!" : "Kopieer info"}</button>
      {status === "Offline" && <span className="text-red-400 text-xs mt-2">Je bent offline!</span>}
    </div>
  );
};

export default WifiInfoWidget;