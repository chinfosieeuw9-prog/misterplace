import React, { useEffect, useState } from "react";

export default function ConversionWidget() {
  // Hardcoded data
  const conversion = 3.2;
  const change = -1.8;
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Conversion</span>
      <span className="text-3xl font-bold text-white">{`${conversion}%`}</span>
      <span className={change < 0 ? "text-red-400" : "text-green-400"}>
        {`${change < 0 ? "↓" : "↑"} ${Math.abs(change)}%`}
      </span>
    </div>
  );
}
