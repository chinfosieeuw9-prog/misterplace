
import React from "react";

export default function RadioWidget() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Radio</span>
      <a href="https://www.radio538.nl/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Radio 538</a>
      <a href="https://www.nporadio1.nl/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">NPO Radio 1</a>
      <a href="https://www.qmusic.nl/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Qmusic</a>
    </div>
  );
}
