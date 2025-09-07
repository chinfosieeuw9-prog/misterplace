import React, { useState } from "react";
import './widgets.css';

const ONLINE_PING_API = "https://api.hackertarget.com/nping/?q=";
const ONLINE_TRACE_API = "https://api.hackertarget.com/mtr/?q=";

const OnlinePingTraceWidget: React.FC = () => {
  const [host, setHost] = useState("");
  const [pingResult, setPingResult] = useState("");
  const [traceResult, setTraceResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePing() {
    if (!host) return;
    setLoading(true);
    setPingResult("");
    setError("");
    try {
      const res = await fetch(ONLINE_PING_API + encodeURIComponent(host));
      const text = await res.text();
      setPingResult(text);
    } catch {
      setError("Fout bij uitvoeren van online ping.");
    }
    setLoading(false);
  }

  async function handleTrace() {
    if (!host) return;
    setLoading(true);
    setTraceResult("");
    setError("");
    try {
      const res = await fetch(ONLINE_TRACE_API + encodeURIComponent(host));
      const text = await res.text();
      setTraceResult(text);
    } catch {
      setError("Fout bij uitvoeren van online traceroute.");
    }
    setLoading(false);
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Online Ping & Traceroute</span>
      <input
        className="bg-gray-800 text-white px-2 py-1 rounded mb-2"
        value={host}
        onChange={e => setHost(e.target.value)}
        placeholder="Voer host of IP in..."
      />
      <div className="flex gap-2 mb-2">
        <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs" onClick={handlePing} disabled={loading || !host}>Ping</button>
        <button className="px-2 py-1 bg-green-600 text-white rounded text-xs" onClick={handleTrace} disabled={loading || !host}>Traceroute</button>
      </div>
      {loading && <span className="text-xs text-blue-400">Bezig...</span>}
      {error && <span className="text-xs text-red-400">{error}</span>}
      {pingResult && (
        <div className="mt-2">
          <span className="font-bold text-xs">Ping resultaat:</span>
          <pre className="bg-gray-800 text-white text-xs p-2 rounded overflow-x-auto max-h-48">{pingResult}</pre>
        </div>
      )}
      {traceResult && (
        <div className="mt-2">
          <span className="font-bold text-xs">Traceroute resultaat:</span>
          <pre className="bg-gray-800 text-white text-xs p-2 rounded overflow-x-auto max-h-48">{traceResult}</pre>
        </div>
      )}
    </div>
  );
};

export default OnlinePingTraceWidget;
