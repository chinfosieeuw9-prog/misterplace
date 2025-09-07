
export default function NetworkMonitorWidget() {
  const [down, setDown] = useState(Math.random() * 100 + 50);
  const [up, setUp] = useState(Math.random() * 20 + 5);
  const [totalDown, setTotalDown] = useState(0);
  const [totalUp, setTotalUp] = useState(0);
  const [ssid, setSsid] = useState('Laden...');
  const [ip, setIp] = useState('');
  const [status, setStatus] = useState('Onbekend');

  useEffect(() => {
  // Wifi-informatie niet beschikbaar in online omgeving
  setSsid('Niet beschikbaar online');
  setStatus(typeof navigator !== "undefined" && navigator.onLine ? "Verbonden" : "Offline");
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDown = Math.random() * 100 + 50;
      const newUp = Math.random() * 20 + 5;
      setDown(newDown);
      setUp(newUp);
      setTotalDown(prev => prev + newDown / 20); // Simuleer totaal (elke 3s ~150MB)
      setTotalUp(prev => prev + newUp / 20);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2">
      <span className="font-bold mb-2">Netwerk: <span className="text-white">{ssid}</span></span>
      <span className="text-xs text-gray-400">Status: <span className={status === "Verbonden" ? "text-green-400" : "text-red-400"}>{status}</span></span>
      <span className="text-xs text-gray-400">Publiek IP: <span className="text-white">{ip}</span></span>
      <span className="text-xs text-gray-400">Download: <span className="text-green-400 font-bold">{down.toFixed(1)} Mbps</span></span>
      <span className="text-xs text-gray-400">Upload: <span className="text-blue-400 font-bold">{up.toFixed(1)} Mbps</span></span>
      <span className="text-xs text-gray-400">Totaal gedownload: <span className="text-green-400 font-bold">{totalDown.toFixed(2)} MB</span></span>
      <span className="text-xs text-gray-400">Totaal geüpload: <span className="text-blue-400 font-bold">{totalUp.toFixed(2)} MB</span></span>
    </div>
  );
}
import React, { useEffect, useState } from "react";
