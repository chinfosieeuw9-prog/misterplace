import React from "react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 flex flex-col items-center justify-center text-white">
      <div className="max-w-md w-full bg-white bg-opacity-10 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Mijn Profiel</h1>
        <ul className="space-y-4">
          <li>
            <Link href="/profile/settings" className="block bg-blue-700 hover:bg-blue-900 text-white rounded-lg px-4 py-2 text-center font-semibold">Instellingen</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
