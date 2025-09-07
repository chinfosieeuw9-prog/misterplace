"use client";
import React from "react";

export default function TeamViewerWidget() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">TeamViewer</span>
      <a href="https://www.teamviewer.com/nl/download/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Download TeamViewer</a>
      <a href="https://community.teamviewer.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">TeamViewer Support</a>
    </div>
  );
}
