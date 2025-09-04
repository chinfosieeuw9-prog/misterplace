import React from "react";
import { useEffect, useState } from "react";
import './widgets.css';

const OnlineStatusWidget: React.FC = () => {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOnline(window.navigator.onLine);
      window.addEventListener("online", () => setOnline(true));
      window.addEventListener("offline", () => setOnline(false));
      return () => {
        window.removeEventListener("online", () => setOnline(true));
        window.removeEventListener("offline", () => setOnline(false));
      };
    }
  }, []);
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold">Status</span>
      <span className={`status-icon ${online ? 'status-icon-green' : 'status-icon-red'}`} />
      <span className="text-xs text-gray-400">{online ? "Online" : "Offline"}</span>
    </div>
  );
};

export default OnlineStatusWidget;
