import React, { useState } from "react";

const defaultLinks = [
  { name: "Google", url: "https://google.com" },
  { name: "YouTube", url: "https://youtube.com" },
  { name: "CoinGecko", url: "https://coingecko.com" },
];

export default function FavoriteLinksWidget() {
  const [links, setLinks] = useState(defaultLinks);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  function addLink() {
    if (!name.trim() || !url.trim()) return;
    setLinks([...links, { name, url }]);
    setName("");
    setUrl("");
  }

  function removeLink(idx: number) {
    setLinks(links.filter((_, i) => i !== idx));
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2">
      <span className="font-bold mb-2">Favoriete links</span>
      {links.map((l, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <a href={l.url} target="_blank" rel="noopener" className="text-xs text-blue-400 hover:underline">{l.name}</a>
          <button className="text-red-400 text-xs" onClick={() => removeLink(i)}>×</button>
        </div>
      ))}
      <div className="flex flex-col md:flex-row gap-2 mt-2 w-full">
  {/* Naam input verwijderd voor compactheid */}
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" className="px-2 py-1 rounded bg-gray-700 text-white text-xs border-none outline-none w-full md:w-auto" />
        <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs w-full md:w-auto" onClick={addLink}>Toevoegen</button>
      </div>
    </div>
  );
}
