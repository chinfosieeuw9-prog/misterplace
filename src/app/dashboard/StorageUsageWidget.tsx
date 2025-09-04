"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function StorageUsageWidget() {
  const [used, setUsed] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const maxSpace = 500 * 1024 * 1024; // 500MB fictief limiet

  useEffect(() => {
    async function fetchUsage() {
      const { data, error } = await supabase.storage.from("files").list();
      if (!error && data) {
        setCount(data.length);
        let total = 0;
        for (const file of data) {
          total += file.metadata?.size || 0;
        }
        setUsed(total);
      }
    }
    fetchUsage();
  }, []);

  function formatMB(bytes: number) {
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col">
      <span className="text-gray-400 text-sm">Schijfruimte</span>
      <span className="text-3xl font-bold mt-2">{formatMB(used)} / {formatMB(maxSpace)}</span>
      <span className="text-blue-400 text-xs mt-1">{count} bestanden</span>
      <div className="w-full h-2 bg-gray-800 rounded mt-3">
        <div
          className="h-2 bg-blue-600 rounded"
          style={{ width: `${Math.min(100, (used / maxSpace) * 100)}%` }}
        />
      </div>
    </div>
  );
}