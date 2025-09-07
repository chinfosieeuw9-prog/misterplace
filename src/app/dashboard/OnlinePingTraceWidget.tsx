import React from "react";

export default function NetworkToolsWidget() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Network Tools</span>
      <a href="https://ping.eu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Ping &amp; Traceroute (ping.eu)</a>
      <a href="https://www.yougetsignal.com/tools/open-ports/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Open Port Check</a>
      <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Speedtest</a>
      <a href="https://www.whatsmydns.net/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">DNS Checker</a>
    </div>
  );
}
