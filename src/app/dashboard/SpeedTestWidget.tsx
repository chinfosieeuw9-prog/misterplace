"use client";
import React, { useState, useEffect } from "react";
import './widgets.css';

const SpeedTestWidget: React.FC = () => {
  const [result, setResult] = useState<{download: number, upload: number, ping: number, time: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{download: number, upload: number, ping: number, time: string}>>([]);
  const [location, setLocation] = useState<{city?: string, country?: string, lat?: number, lon?: number} | null>(null);

  useEffect(() => {
    fetch("https://ip-api.com/json/")
      .then(res => res.json())
      .then(data => setLocation({ city: data.city, country: data.country, lat: data.lat, lon: data.lon }));
  }, []);

  function runSpeedTest() {
    setLoading(true);
    setTimeout(() => {
      const res = { download: 94.2, upload: 21.7, ping: 18, time: new Date().toLocaleTimeString() };
      setResult(res);
      setHistory(h => [res, ...h].slice(0,5));
      setLoading(false);
    }, 1500);
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Speedtest</span>
      <button
        className="bg-blue-600 text-white text-xs px-4 py-2 rounded w-fit mb-2"
        onClick={runSpeedTest}
        disabled={loading}
      >{loading ? "Testen..." : "Start speedtest"}</button>
      {result && (
        <div className="mt-2 text-xs text-gray-400">
          <div>Download: <span className="text-white">{result.download} Mbps</span></div>
          <div>Upload: <span className="text-white">{result.upload} Mbps</span></div>
          <div>Ping: <span className="text-white">{result.ping} ms</span></div>
          <div>Tijd: <span className="text-white">{result.time}</span></div>
        </div>
      )}
      {location && (
        <div className="mt-2 text-xs text-gray-400">
          <div>Locatie: <span className="text-white">{location?.city}, {location?.country}</span></div>
          <div>Coördinaten: <span className="text-white">{location?.lat}, {location?.lon}</span></div>
        </div>
      )}
      {history.length > 0 && (
        <div className="mt-4">
          <span className="font-bold text-xs mb-1 block">Speedtest geschiedenis</span>
          <ul className="text-xs text-gray-400 space-y-1">
            {history.map((h, i) => (
              <li key={i} className="bg-gray-800 rounded px-2 py-1">
                {h.time}: <span className="text-white">{h.download} Mbps</span> ↓ / <span className="text-white">{h.upload} Mbps</span> ↑ / <span className="text-white">{h.ping} ms</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpeedTestWidget;