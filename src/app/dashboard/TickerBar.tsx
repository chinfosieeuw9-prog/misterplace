import React, { useState } from "react";

const defaultTickers = [
  { symbol: "EUR", name: "Euro" },
  { symbol: "USD", name: "Dollar" },
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ADA", name: "Cardano" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "GOLD", name: "Goud" },
  { symbol: "SILVER", name: "Zilver" },
];

export default function TickerBar() {
  const [tickers, setTickers] = useState(defaultTickers);
  const [input, setInput] = useState("");

  function addTicker() {
    if (!input.trim()) return;
    setTickers([...tickers, { symbol: input.trim().toUpperCase(), name: input.trim() }]);
    setInput("");
  }

  function removeTicker(symbol: string) {
    setTickers(tickers.filter(t => t.symbol !== symbol));
  }

  // Prijzen ophalen
  const [prices, setPrices] = useState<{[symbol: string]: string}>({});

  React.useEffect(() => {
    async function fetchPrices() {
      const newPrices: {[symbol: string]: string} = {};
      for (const t of tickers) {
        // Crypto via CoinGecko
        if (["BTC", "ETH", "ADA"].includes(t.symbol)) {
          const cgId = t.symbol === "BTC" ? "bitcoin" : t.symbol === "ETH" ? "ethereum" : t.symbol === "ADA" ? "cardano" : "";
          try {
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cgId}&vs_currencies=eur`);
            const data = await res.json();
            newPrices[t.symbol] = data[cgId]?.eur ? `€${data[cgId].eur}` : "?";
          } catch {
            newPrices[t.symbol] = "?";
          }
        } else if (t.symbol === "GOLD") {
          // Goud via Yahoo Finance
          try {
            const yfRes = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=GOLD=X`);
            const yfData = await yfRes.json();
            const quote = yfData?.quoteResponse?.result?.[0];
            newPrices[t.symbol] = quote?.regularMarketPrice ? `€${quote.regularMarketPrice}` : "?";
          } catch {
            newPrices[t.symbol] = "?";
          }
        } else if (t.symbol === "SILVER") {
          // Zilver via Yahoo Finance
          try {
            const yfRes = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=SILVER=X`);
            const yfData = await yfRes.json();
            const quote = yfData?.quoteResponse?.result?.[0];
            newPrices[t.symbol] = quote?.regularMarketPrice ? `€${quote.regularMarketPrice}` : "?";
          } catch {
            newPrices[t.symbol] = "?";
          }
        } else {
          // Valuta/aandelen via Yahoo Finance
          try {
            const yfRes = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${t.symbol}`);
            const yfData = await yfRes.json();
            const quote = yfData?.quoteResponse?.result?.[0];
            newPrices[t.symbol] = quote?.regularMarketPrice ? `€${quote.regularMarketPrice}` : "?";
          } catch {
            newPrices[t.symbol] = "?";
          }
        }
      }
      setPrices(newPrices);
    }
    fetchPrices();
  }, [tickers]);

  return (
    <div className="w-full bg-gray-900 py-2 px-4 border-b border-gray-800 relative" style={{overflow: 'hidden', height: '48px'}}>
      <div
        className="absolute left-0 top-0 flex items-center animate-marquee"
  style={{whiteSpace: 'nowrap', willChange: 'transform', animation: 'marquee 60s linear infinite'}}
      >
        {tickers.map(t => (
          <span key={t.symbol} className="mx-2 px-3 py-1 bg-gray-800 rounded text-xs font-bold text-white flex items-center">
            {t.symbol} <span className="ml-2 text-green-400">{prices[t.symbol] || '?'}</span>
            <button className="ml-2 text-red-400" onClick={() => removeTicker(t.symbol)} title="Verwijder">×</button>
          </span>
        ))}
      </div>
      <div className="absolute right-4 top-2 flex items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ticker toevoegen..."
          className="px-2 py-1 rounded bg-gray-700 text-white text-xs border-none outline-none"
          onKeyDown={e => { if (e.key === "Enter") addTicker(); }}
        />
        <button className="ml-2 px-2 py-1 bg-blue-600 text-white rounded text-xs" onClick={addTicker}>Toevoegen</button>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
