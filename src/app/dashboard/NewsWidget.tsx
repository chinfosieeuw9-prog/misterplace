import React, { useEffect, useState } from "react";

export default function NewsWidget() {
  // ...existing code...
    // Hardcoded nieuws-headlines
    const news = [
      { title: "AEX sluit hoger na sterke dag tech-aandelen", url: "https://www.example.com/aex" },
      { title: "Kabinet presenteert nieuwe begroting", url: "https://www.example.com/begroting" },
      { title: "Weerbericht: zonnig en warm weekend verwacht", url: "https://www.example.com/weer" },
      { title: "Voetbal: Ajax wint met ruime cijfers", url: "https://www.example.com/ajax" },
      { title: "Economie groeit sneller dan verwacht", url: "https://www.example.com/economie" }
    ];
    return (
      <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2">
        <span className="font-bold mb-2">Nieuws</span>
        {news.map((n, i) => (
          <a key={i} href={n.url} target="_blank" rel="noopener" className="text-xs text-blue-400 hover:underline mb-1">{n.title}</a>
        ))}
      </div>
    );
}
