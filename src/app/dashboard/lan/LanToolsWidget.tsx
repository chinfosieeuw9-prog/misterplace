import React, { useState } from "react";

const mockDevices = [
  { ip: "192.168.1.10", hostname: "NAS", status: "Online" },
  { ip: "192.168.1.20", hostname: "Printer", status: "Online" },
  { ip: "192.168.1.30", hostname: "Laptop", status: "Offline" },
];

const mockArp = [
  { ip: "192.168.1.10", mac: "00:11:22:33:44:55" },
  { ip: "192.168.1.20", mac: "00:11:22:33:44:66" },
];

const mockDhcp = [
  { ip: "192.168.1.30", lease: "2025-08-31 12:00" },
];

const LanToolsWidget: React.FC = () => {
  // Terminal box state & log
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalResult, setTerminalResult] = useState<string>("");
  const [terminalLog, setTerminalLog] = useState<{cmd: string, result: string}[]>([]);
  const [pingResult, setPingResult] = useState<string>("");
  const [tracerouteResult, setTracerouteResult] = useState<string>("");
  const [target, setTarget] = useState("");
  // Extra tool states
  const [wolTarget, setWolTarget] = useState("");
  const [wolResult, setWolResult] = useState("");
  const [portscanTarget, setPortscanTarget] = useState("");
  const [portscanResult, setPortscanResult] = useState("");
  const [rdpTarget, setRdpTarget] = useState("");
  const [rdpResult, setRdpResult] = useState("");
  const [logResult, setLogResult] = useState("");
  const [mapResult, setMapResult] = useState("");
  const [speedResult, setSpeedResult] = useState("");

  // Mock output for known commands
  function getMockTerminalResult(cmd: string) {
    if (cmd.trim().toLowerCase() === "ipconfig") {
      return `Windows IP Configuration\n\nEthernet adapter Ethernet:\n   Connection-specific DNS Suffix  . : lan\n   IPv4 Address. . . . . . . . . . . : 192.168.1.100\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1`;
    }
    if (cmd.trim().toLowerCase().startsWith("ping")) {
      return `Pinging 8.8.8.8 with 32 bytes of data:\nReply from 8.8.8.8: bytes=32 time=12ms TTL=56\nReply from 8.8.8.8: bytes=32 time=13ms TTL=56\n\nPing statistics for 8.8.8.8:\n    Packets: Sent = 2, Received = 2, Lost = 0 (0% loss),\nApproximate round trip times in milli-seconds:\n    Minimum = 12ms, Maximum = 13ms, Average = 12ms`;
    }
    if (cmd.trim().toLowerCase().startsWith("tracert")) {
      return `Tracing route to 8.8.8.8 over a maximum of 30 hops:\n  1    <1 ms    1 ms    1 ms  192.168.1.1\n  2    12 ms   13 ms   12 ms  8.8.8.8\nTrace complete.`;
    }
    return `Uitgevoerd: ${cmd} (mock resultaat)`;
  }
  // Terminal box state
  // ...existing code...

  function handlePing() {
    if (!target) return;
    setPingResult('Bezig...');
    // fetch(`http://localhost:5000/api/ping?host=${encodeURIComponent(target)}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.error) {
    //       setPingResult(`Fout: ${data.error}`);
    //     } else {
    //       setPingResult(data.output);
    //     }
    //   })
    //   .catch(() => setPingResult('Fout bij ophalen ping resultaat'));
    setPingResult('Niet beschikbaar in online omgeving. Gebruik de Online Ping & Traceroute widget.');
  }
  function handleTraceroute() {
    if (!target) return;
    setTracerouteResult('Bezig...');
    // fetch(`http://localhost:5000/api/traceroute?host=${encodeURIComponent(target)}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.error) {
    //       setTracerouteResult(`Fout: ${data.error}`);
    //     } else {
    //       setTracerouteResult(data.output);
    //     }
    //   })
    //   .catch(() => setTracerouteResult('Fout bij ophalen traceroute resultaat'));
    setTracerouteResult('Niet beschikbaar in online omgeving. Gebruik de Online Ping & Traceroute widget.');
  }
  function handleWakeOnLan() {
    setWolResult(`Wake-on-LAN verzonden naar ${wolTarget} (mock)`);
  }
  function handlePortscan() {
    setPortscanResult(`Portscan van ${portscanTarget}: 22 (open), 80 (open), 443 (gesloten) (mock)`);
  }
  function handleRdp() {
    setRdpResult(`RDP/SSH verbinding gestart naar ${rdpTarget} (mock)`);
  }
  function handleLog() {
    setLogResult(`Netwerk log: 3 events gevonden (mock)`);
  }
  function handleMap() {
    setMapResult(`Netwerk kaart: 5 apparaten verbonden (mock)`);
  }
  function handleSpeedtest() {
    setSpeedResult(`Speedtest: 94 Mbps down / 12 Mbps up (mock)`);
  }

  return (
  <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-4 widget-uniform">
      <span className="font-bold mb-2">LAN Tools</span>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Netwerk Scanner */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Netwerk apparaten</span>
          <ul className="text-xs text-gray-400">
            {mockDevices.map((dev, i) => (
              <li key={i} className="mb-1 flex gap-2 items-center">
                <span className="text-white">{dev.hostname}</span>
                <span className="bg-gray-900 rounded px-2">{dev.ip}</span>
                <span className={dev.status === "Online" ? "bg-green-500 text-white px-2 rounded" : "bg-red-500 text-white px-2 rounded"}>{dev.status}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* ARP Table */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">ARP Tabel</span>
          <ul className="text-xs text-gray-400">
            {mockArp.map((a, i) => (
              <li key={i} className="mb-1 flex gap-2 items-center">
                <span className="text-white">{a.ip}</span>
                <span className="bg-gray-900 rounded px-2">{a.mac}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* DHCP Info */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">DHCP Leases</span>
          <ul className="text-xs text-gray-400">
            {mockDhcp.map((d, i) => (
              <li key={i} className="mb-1 flex gap-2 items-center">
                <span className="text-white">{d.ip}</span>
                <span className="bg-gray-900 rounded px-2">{d.lease}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Ping/Traceroute */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Ping / Traceroute</span>
          <input value={target} onChange={e => setTarget(e.target.value)} className="bg-gray-900 text-white p-2 rounded mb-2 w-full" placeholder="IP of hostname..." />
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded" onClick={handlePing}>Ping</button>
            <button className="bg-green-600 text-white text-xs px-2 py-1 rounded" onClick={handleTraceroute}>Traceroute</button>
          </div>
          {pingResult && <div className="text-xs text-gray-400 mt-2">{pingResult}</div>}
          {tracerouteResult && <div className="text-xs text-gray-400 mt-2">{tracerouteResult}</div>}
        </div>
        {/* Wake-on-LAN */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Wake-on-LAN</span>
          <div className="flex gap-2 items-center mb-2">
            <input value={wolTarget} onChange={e => setWolTarget(e.target.value)} className="bg-gray-900 text-white p-1 rounded text-xs w-32" placeholder="MAC/IP..." />
            <button className="bg-yellow-600 text-white text-xs px-2 py-1 rounded" onClick={handleWakeOnLan}>Wake-on-LAN</button>
          </div>
          {wolResult && <div className="text-xs text-gray-400">{wolResult}</div>}
        </div>
        {/* Portscan */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Portscan</span>
          <div className="flex gap-2 items-center mb-2">
            <input value={portscanTarget} onChange={e => setPortscanTarget(e.target.value)} className="bg-gray-900 text-white p-1 rounded text-xs w-32" placeholder="IP..." />
            <button className="bg-purple-600 text-white text-xs px-2 py-1 rounded" onClick={handlePortscan}>Portscan</button>
          </div>
          {portscanResult && <div className="text-xs text-gray-400">{portscanResult}</div>}
        </div>
        {/* RDP/SSH */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">RDP/SSH</span>
          <div className="flex gap-2 items-center mb-2">
            <input value={rdpTarget} onChange={e => setRdpTarget(e.target.value)} className="bg-gray-900 text-white p-1 rounded text-xs w-32" placeholder="IP..." />
            <button className="bg-blue-800 text-white text-xs px-2 py-1 rounded" onClick={handleRdp}>RDP/SSH</button>
          </div>
          {rdpResult && <div className="text-xs text-gray-400">{rdpResult}</div>}
        </div>
        {/* Netwerk Log/History */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Netwerk Log</span>
          <button className="bg-gray-700 text-white text-xs px-2 py-1 rounded mb-2" onClick={handleLog}>Netwerk Log</button>
          {logResult && <div className="text-xs text-gray-400">{logResult}</div>}
        </div>
        {/* Netwerk Kaart */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Netwerk Kaart</span>
          <button className="bg-green-700 text-white text-xs px-2 py-1 rounded mb-2" onClick={handleMap}>Netwerk Kaart</button>
          {mapResult && <div className="text-xs text-gray-400">{mapResult}</div>}
        </div>
        {/* Speedtest */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Speedtest</span>
          <button className="bg-pink-600 text-white text-xs px-2 py-1 rounded mb-2" onClick={handleSpeedtest}>Speedtest</button>
          {speedResult && <div className="text-xs text-gray-400">{speedResult}</div>}
        </div>
        {/* NetBalancer */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">NetBalancer</span>
          <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2" onClick={() => setTerminalResult('NetBalancer: Bandbreedte mock overzicht')}>NetBalancer</button>
          <span className="text-xs text-gray-400">Bandbreedtebeheer (mock)</span>
        </div>
        {/* Ping Monitor */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Ping Monitor</span>
          <button className="bg-green-500 text-white text-xs px-2 py-1 rounded mb-2" onClick={() => setTerminalResult('Ping Monitor: Uptime mock overzicht')}>Ping Monitor</button>
          <span className="text-xs text-gray-400">Uptime monitoring (mock)</span>
        </div>
        {/* ntop */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">ntop</span>
          <button className="bg-orange-500 text-white text-xs px-2 py-1 rounded mb-2" onClick={() => setTerminalResult('ntop: Verkeersanalyse mock overzicht')}>ntop</button>
          <span className="text-xs text-gray-400">Verkeersanalyse (mock)</span>
        </div>
        {/* SNMP tools */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">SNMP tools</span>
          <button className="bg-teal-500 text-white text-xs px-2 py-1 rounded mb-2" onClick={() => setTerminalResult('SNMP tools: SNMP mock overzicht')}>SNMP tools</button>
          <span className="text-xs text-gray-400">SNMP beheer (mock)</span>
        </div>
        {/* Sysinternals tools */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Sysinternals</span>
          <button className="bg-gray-500 text-white text-xs px-2 py-1 rounded mb-2" onClick={() => setTerminalResult('Sysinternals: Process Monitor, TCPView, AutoRuns (mock)')}>Sysinternals</button>
          <span className="text-xs text-gray-400">Process Monitor, TCPView, AutoRuns (mock)</span>
        </div>
        {/* Advanced IP Scanner */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Advanced IP Scanner</span>
          <button className="bg-indigo-500 text-white text-xs px-2 py-1 rounded mb-2" onClick={() => setTerminalResult('Advanced IP Scanner: Apparaten detecteren (mock)')}>Advanced IP Scanner</button>
          <span className="text-xs text-gray-400">Apparaten detecteren (mock)</span>
        </div>
        {/* Axence NetTools */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Axence NetTools</span>
          <button className="bg-lime-500 text-white text-xs px-2 py-1 rounded mb-2" onClick={() => setTerminalResult('Axence NetTools: Netwerkanalyse (mock)')}>Axence NetTools</button>
          <span className="text-xs text-gray-400">Uitgebreide netwerkanalyse (mock)</span>
        </div>
        {/* CurrPorts */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">CurrPorts</span>
          <button className="bg-pink-500 text-white text-xs px-2 py-1 rounded mb-2" onClick={() => setTerminalResult('CurrPorts: Overzicht verbindingen (mock)')}>CurrPorts</button>
          <span className="text-xs text-gray-400">Overzicht verbindingen (mock)</span>
        </div>
        {/* Nmap */}
        <div className="bg-gray-800 rounded p-3 flex flex-col">
          <span className="font-semibold text-xs mb-1 block">Nmap</span>
          <input className="bg-gray-900 text-white p-1 rounded text-xs w-32 mb-2" placeholder="IP/Range..." />
          <button className="bg-red-500 text-white text-xs px-2 py-1 rounded mb-2" onClick={() => setTerminalResult('Nmap: Geavanceerde netwerkscan (mock)')}>Nmap</button>
          <span className="text-xs text-gray-400">Netwerkscan (mock)</span>
        </div>
        {/* PowerShell/Terminal box */}
        <div className="bg-gray-800 rounded p-3 flex flex-col col-span-1 md:col-span-2 xl:col-span-3">
          <span className="font-semibold text-xs mb-1 block">PowerShell / Terminal</span>
          <input
            type="text"
            className="bg-gray-900 text-white p-1 rounded text-xs w-full mb-2"
            placeholder="Voer een commando in... (mock)"
            value={terminalInput}
            onChange={e => setTerminalInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && terminalInput.trim()) {
                const result = getMockTerminalResult(terminalInput);
                setTerminalResult(result);
                setTerminalLog(log => [...log, {cmd: terminalInput, result}]);
                setTerminalInput("");
              }
            }}
          />
          {terminalResult && <div className="text-xs text-green-400 mt-2 whitespace-pre-line">{terminalResult}</div>}
          {terminalLog.length > 0 && (
            <div className="mt-4">
              <span className="font-semibold text-xs mb-1 block">Terminal Log</span>
              <ul className="text-xs text-gray-300 bg-gray-900 rounded p-2 max-h-40 overflow-y-auto">
                {terminalLog.map((entry, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="text-blue-400">{entry.cmd}</span>
                    <pre className="text-green-400 whitespace-pre-line">{entry.result}</pre>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanToolsWidget;
