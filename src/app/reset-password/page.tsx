"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setError("Geen toegangstoken gevonden. Gebruik de link uit je e-mail.");
    }
  }, [accessToken]);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!password || password.length < 6) {
      setError("Wachtwoord moet minimaal 6 tekens zijn.");
      return;
    }
    if (password !== confirm) {
      setError("Wachtwoorden komen niet overeen.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) setError(error.message);
    else {
      setSuccess(true);
      setTimeout(() => router.push("/auth"), 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Nieuw wachtwoord instellen</h2>
        {success ? (
          <div className="text-green-600 text-center">Wachtwoord succesvol gewijzigd! Je wordt doorgestuurd...</div>
        ) : (
          <form onSubmit={handleReset}>
            <input
              type="password"
              placeholder="Nieuw wachtwoord"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Herhaal wachtwoord"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
              disabled={loading || !accessToken}
            >
              {loading ? "Bezig..." : "Wachtwoord instellen"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
