"use client";
import React, { useEffect, useState } from "react";
import './widgets.css';

const LanInfoWidget: React.FC = () => {
  // ...existing code...
  const [publicIp, setPublicIp] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [pingHost, setPingHost] = useState<string>("");
  const [pingResult, setPingResult] = useState<string>("");
  const [pingFullOutput, setPingFullOutput] = useState<string>("");
  const [pingLoading, setPingLoading] = useState(false);
  const [traceResult, setTraceResult] = useState<string>("");
  const [traceFullOutput, setTraceFullOutput] = useState<string>("");
  const [traceLoading, setTraceLoading] = useState(false);
  const [showPingFull, setShowPingFull] = useState(false);
  const [showTraceFull, setShowTraceFull] = useState(false);

  // Wis pingResult na 15 minuten automatisch
  useEffect(() => {
    if (pingResult) {
      const timer = setTimeout(() => setPingResult("") , 15 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [pingResult]);

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

  async function handlePing() {
    if (!pingHost) return;
    setPingLoading(true);
    setPingResult("");
    setPingFullOutput("");
    try {
      const res = await fetch(`http://localhost:5000/api/ping?host=${encodeURIComponent(pingHost)}`);
      const data = await res.json();
      if (data.error) {
        setPingResult(`Fout: ${data.error}`);
      } else {
  setPingResult(data.output);
  setPingFullOutput(data.output);
      }
    } catch {
      setPingResult("Fout bij ophalen ping resultaat");
    }
    setPingLoading(false);
  }

  async function handleTraceroute() {
    if (!pingHost) return;
    setTraceLoading(true);
    setTraceResult("");
    setTraceFullOutput("");
    try {
      const res = await fetch(`http://localhost:5000/api/traceroute?host=${encodeURIComponent(pingHost)}`);
      const data = await res.json();
      if (data.error) {
        setTraceResult(`Fout: ${data.error}`);
      } else {
        setTraceResult(`Traceroute naar ${data.host}`);
        setTraceFullOutput(data.output);
      }
    } catch {
      setTraceResult("Fout bij ophalen traceroute resultaat");
    }
    setTraceLoading(false);
  }

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
        <input
          type="text"
          value={pingHost}
          onChange={e => setPingHost(e.target.value)}
          className="bg-gray-800 text-white px-2 py-1 rounded w-full mb-2"
          placeholder="ping www.nu.nl"
        />
        <button
          className="bg-blue-600 text-white text-xs px-2 py-1 rounded mr-2"
          onClick={handlePing}
          disabled={pingLoading || !pingHost}
        >Ping</button>
        <button
          className="bg-green-600 text-white text-xs px-2 py-1 rounded mr-2"
          onClick={handleTraceroute}
          disabled={traceLoading || !pingHost}
        >Traceroute</button>
        {(pingLoading || traceLoading) && <span className="text-xs text-gray-400 ml-2">Bezig...</span>}
        {pingResult && (
          <>
            <pre className="ping-output bg-gray-800 text-white p-4 rounded mt-2 whitespace-pre-wrap">{pingResult}</pre>
            <button className="bg-gray-700 text-white text-xs px-2 py-1 rounded mt-2" onClick={() => setShowPingFull(v => !v)}>{showPingFull ? "Verberg volledige output" : "Toon volledige output"}</button>
            {showPingFull && (
              <pre className="ping-output bg-gray-900 text-white p-4 rounded mt-2 whitespace-pre-wrap">{pingFullOutput}</pre>
            )}
          </>
        )}
        {traceResult && (
          <>
            <pre className="bg-gray-800 text-white p-2 rounded mt-2 text-xs whitespace-pre-wrap">{traceResult}</pre>
            <button className="bg-gray-700 text-white text-xs px-2 py-1 rounded mt-2" onClick={() => setShowTraceFull(v => !v)}>{showTraceFull ? "Verberg volledige output" : "Toon volledige output"}</button>
            {showTraceFull && (
              <pre className="bg-gray-900 text-white p-2 rounded mt-2 text-xs whitespace-pre-wrap">{traceFullOutput}</pre>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LanInfoWidget;