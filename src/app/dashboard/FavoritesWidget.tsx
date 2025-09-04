import React from "react";

const favorites = [
  { label: "Google", url: "https://www.google.com" },
  { label: "Outlook", url: "https://outlook.com" },
  { label: "Teams", url: "https://teams.microsoft.com" },
  { label: "Mijn bestanden", url: "/dashboard/upload" },
];

const FavoritesWidget: React.FC = () => (
  <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
    <span className="font-bold mb-2">Favorieten</span>
    <ul className="text-xs text-blue-400">
      {favorites.map((fav, i) => (
        <li key={i} className="mb-1">
          <a href={fav.url} target="_blank" rel="noopener" className="text-white hover:text-blue-400 underline">{fav.label}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default FavoritesWidget;
