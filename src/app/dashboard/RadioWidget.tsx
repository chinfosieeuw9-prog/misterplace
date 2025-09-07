
import React, { useState, useRef } from "react";
import NetworkMonitorWidget from "./NetworkMonitorWidget";

const defaultStations = [
  { name: "Radio 538", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO538.mp3" },
  { name: "NPO Radio 1", url: "https://icecast.omroep.nl/radio1-bb-mp3" },
  { name: "Qmusic", url: "https://icecast-qmusic.cdp.triple-it.nl/Qmusic_nl_live_96.mp3" },
];


export default function RadioWidget() {
  const [stations, setStations] = useState(defaultStations);
  const [current, setCurrent] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [showNetwork, setShowNetwork] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function addStation() {
    if (!name.trim() || !url.trim()) return;
    setStations([...stations, { name, url }]);
    setName("");
    setUrl("");
  }

  function removeStation(idx: number) {
    setStations(stations.filter((_, i) => i !== idx));
  }

  // Try to play audio when current changes
  React.useEffect(() => {
    if (current && audioRef.current) {
      setAudioError(null);
      setAutoplayBlocked(false);
      audioRef.current.play().catch((err) => {
        if (err.name === "NotAllowedError") {
          setAutoplayBlocked(true);
        } else {
          setAudioError("Kan de stream niet afspelen. Mogelijk geblokkeerd door browser of CORS.");
        }
      });
    }
  }, [current]);

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">{showNetwork ? "Netwerkverkeer" : "Internet Radio"}</span>
        <button className="bg-blue-700 text-white text-xs px-2 py-1 rounded" onClick={() => setShowNetwork(v => !v)}>
          {showNetwork ? "Radio" : "Netwerk"}
        </button>
      </div>
      {showNetwork ? (
        <NetworkMonitorWidget />
      ) : (
        <>
          <div className="flex gap-2 mb-2">
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Stream URL" className="px-2 py-1 rounded bg-gray-700 text-white text-xs border-none outline-none" />
            <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs" onClick={addStation}>Toevoegen</button>
          </div>
          {stations.map((s, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <button className="bg-green-600 text-white text-xs px-2 py-1 rounded" onClick={() => setCurrent(s.url)}>
                ▶
              </button>
              <span className="text-xs text-white">{s.name}</span>
              <button className="text-red-400 text-xs" onClick={() => removeStation(i)}>×</button>
            </div>
          ))}
          {current && (
            <>
              <audio
                ref={audioRef}
                src={current}
                controls
                autoPlay
                className="mt-4 w-full"
                onError={() => setAudioError("Kan de stream niet afspelen. Mogelijk geblokkeerd door browser of CORS.")}
              />
              {autoplayBlocked && (
                <div className="text-xs text-yellow-400 mt-2">Autoplay is geblokkeerd door je browser. Druk op play om te starten.</div>
              )}
              {audioError && (
                <div className="text-xs text-red-400 mt-2">{audioError}</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
