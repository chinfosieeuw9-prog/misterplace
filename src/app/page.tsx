
"use client";
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

function Clock() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <span className="font-mono text-xs">{time.toLocaleTimeString()}</span>;
}

export default function HomePage() {
  // Dummy nieuws, later API integratie
  const nieuws = [
    {
      bron: "Tweakers",
      titel: "Nieuwe iPhone 15 Pro aangekondigd",
      url: "https://tweakers.net/nieuws/",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=48&q=80"
    },
    {
      bron: "Androidworld",
      titel: "Android 14 update nu beschikbaar",
      url: "https://androidworld.nl/nieuws/",
      img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=48&q=80"
    },
    {
      bron: "Hardware Info",
      titel: "Nvidia RTX 5090 benchmarks gelekt",
      url: "https://nl.hardware.info/nieuws/",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=48&q=80"
    },
    {
      bron: "Microsoft",
      titel: "Windows 12 preview nu te testen",
      url: "https://blogs.windows.com/",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=48&q=80"
    },
    {
      bron: "iCulture",
      titel: "iOS 19: dit zijn de nieuwe functies",
      url: "https://www.iculture.nl/nieuws/",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=48&q=80"
    },
  ];
  const categorieen = [
    { naam: "Tweakers", kleur: "bg-blue-800" },
    { naam: "Androidworld", kleur: "bg-green-700" },
    { naam: "Hardware Info", kleur: "bg-yellow-700" },
    { naam: "Microsoft", kleur: "bg-blue-500" },
    { naam: "iCulture", kleur: "bg-pink-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-start">
      <header className="mb-8 w-full max-w-4xl flex justify-between items-center px-4">
        <div className="dashboard-header-container">
          <div className="dashboard-header text-2xl font-bold">Homepage</div>
          <div className="dashboard-header-gloss" />
        </div>
        <div className="ml-auto"><Clock /></div>
      </header>
  <Link href="/login" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded mb-8">Inloggen</Link>
      <h2 className="text-xl font-semibold mb-6 text-center w-full">Laatste nieuws per categorie</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-10">
        {categorieen.map((cat) => (
          <div key={cat.naam} className={`rounded-xl p-4 ${cat.kleur}`}> 
            <h3 className="font-bold mb-2 text-lg">{cat.naam}</h3>
            {nieuws.filter((n) => n.bron === cat.naam).map((n) => (
              <a key={n.titel} href={n.url} target="_blank" rel="noopener" className="flex items-center gap-3 mb-2 hover:bg-gray-800 rounded p-2">
                <Image src={n.img} alt={n.titel} width={48} height={48} className="rounded" />
                <span>{n.titel}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
      {/* Extra widgets/secties kunnen hier toegevoegd worden */}
    </div>
  );
}


