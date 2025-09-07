"use client";
import React from "react";

export default function WifiInfoWidget() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">WiFi Test & Analyse</span>
      <a href="https://www.speedtest.net/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Snelheidstest (Speedtest.net)</a>
      <a href="https://www.wifiman.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">WiFi Analyzer (Wifiman)</a>
      <a href="https://www.netspotapp.com/wifi-analyzer/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">NetSpot WiFi Analyzer</a>
      <a href="https://www.consumentenbond.nl/internet-privacy/wifi-beveiligen" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Meer over wifi-beveiliging</a>
    </div>
  );
}