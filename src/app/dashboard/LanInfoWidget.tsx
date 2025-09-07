"use client";
import React, { useEffect, useState } from "react";
import './widgets.css';

const LanInfoWidget: React.FC = () => {
  // ...existing code...
  const [publicIp, setPublicIp] = useState<string>("");
  const [copied, setCopied] = useState(false);
  // const [pingHost, setPingHost] = useState<string>("");
  // const [pingResult, setPingResult] = useState<string>("");
  // const [pingFullOutput, setPingFullOutput] = useState<string>("");
  // Oude ping/traceroute functionaliteit verwijderd. Gebruik de OnlinePingTraceWidget.

  // Wis pingResult na 15 minuten automatisch
  // useEffect(() => {
  //   if (pingResult) {
  //     const timer = setTimeout(() => setPingResult("") , 15 * 60 * 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [pingResult]);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setPublicIp(data.ip));
  }, []);

  // Hydration fix: deviceName wordt pas na de eerste render opgehaald in de client
  const [deviceName, setDeviceName] = useState<string>("Onbekend");
  const [status, setStatus] = useState<string>("Offline");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDeviceName(window.location.hostname);
      setStatus(window.navigator.onLine ? "Verbonden" : "Offline");
    }
  }, []);
  const details = `Computernaam: ${deviceName}\nPubliek IP: ${publicIp}\nStatus: ${status}`;

  // Oude ping functionaliteit verwijderd. Gebruik de OnlinePingTraceWidget.

  // Oude ping/traceroute functionaliteit verwijderd. Gebruik de OnlinePingTraceWidget.

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">LAN Info</span>
      <span className="text-xs text-gray-400">Computernaam: <span className="text-white">{deviceName}</span></span>
      <span className="text-xs text-gray-400">Publiek IP: <span className="text-white">{publicIp || "Laden..."}</span></span>
      <span className="text-xs text-gray-400">Status: <span className={status === "Verbonden" ? "text-green-400" : "text-red-400"}>{status}</span></span>
      <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded w-fit mt-2" onClick={() => {navigator.clipboard.writeText(details);setCopied(true);setTimeout(()=>setCopied(false),1500);}}>{copied ? "Gekopieerd!" : "Kopieer info"}</button>
      {status === "Offline" && <span className="text-red-400 text-xs mt-2">Je bent offline!</span>}
      <div className="mt-4">
        <span className="font-bold mb-2 block">Ping / Traceroute</span>
  <div className="text-xs text-gray-400 mb-2">Gebruik de widget &quot;Online Ping &amp; Traceroute&quot; voor deze functionaliteit.</div>
      </div>
    </div>
  );
};

export default LanInfoWidget;