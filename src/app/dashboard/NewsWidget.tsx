import React from "react";

export default function NewsWidget() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Nieuws</span>
      <a href="https://www.nu.nl/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">NU.nl</a>
      <a href="https://nos.nl/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">NOS</a>
      <a href="https://www.ad.nl/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">AD</a>
    </div>
  );
}
