import React from "react";

export default function RemoteDesktopWidget() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Remote Desktop / Support</span>
      <a href="https://remotedesktop.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Google Remote Desktop</a>
      <a href="https://anydesk.com/nl" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">AnyDesk</a>
      <a href="https://www.teamviewer.com/nl/download/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">TeamViewer Download</a>
    </div>
  );
}
