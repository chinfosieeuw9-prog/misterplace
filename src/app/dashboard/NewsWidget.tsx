import React, { useEffect, useState } from "react";


export default function NewsWidget() {
  const [news, setNews] = useState<{title: string, link: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://feeds.nos.nl/nosnieuwsalgemeen")
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setNews(data.items.slice(0, 5).map((item: { title: string; link: string }) => ({ title: item.title, link: item.link })));
        } else {
          setError("Geen nieuws gevonden.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Fout bij ophalen nieuws.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Nieuws</span>
      {loading && <div className="text-xs text-gray-400">Laden...</div>}
      {error && <div className="text-xs text-red-400">{error}</div>}
      {!loading && !error && (
        <ul className="text-xs text-gray-400">
          {news.map((n, i) => (
            <li key={i} className="mb-1">
              <a href={n.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{n.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
