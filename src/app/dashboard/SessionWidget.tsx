import React from "react";

export default function SessionWidget() {
  // Hardcoded data
  const session = "4m 32s";
  const change = 10.3;
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Session</span>
      <span className="text-3xl font-bold text-white">{session}</span>
      <span className={change < 0 ? "text-red-400" : "text-green-400"}>
        {`${change < 0 ? "↓" : "↑"} ${Math.abs(change)}%`}
      </span>
    </div>
  );
}
