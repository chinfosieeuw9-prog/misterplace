import React from "react";

export default function FavoriteLinksWidget() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Favoriete Links beheren</span>
      <a href="https://raindrop.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Raindrop.io (Google login)</a>
      <a href="https://www.start.me/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mb-1">Start.me (Google login)</a>
    </div>
  );
}
