"use client";
import React, { useState } from "react";

export default function AccountPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [created, setCreated] = useState(false);
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });

  function validate() {
  let valid = true;
  const newErrors = { username: "", email: "", password: "" };
    // Gebruikersnaam: minimaal 3 tekens, alleen letters/cijfers
    if (!form.username || form.username.length < 3 || /[^a-zA-Z0-9]/.test(form.username)) {
      newErrors.username = "Minimaal 3 tekens, alleen letters/cijfers.";
      valid = false;
    }
    // E-mail: basisformat
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Voer een geldig e-mailadres in.";
      valid = false;
    }
    // Wachtwoord: minimaal 8 tekens, cijfer en letter
    if (!form.password || form.password.length < 8 || !/[a-zA-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
      newErrors.password = "Minimaal 8 tekens, met letter en cijfer.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    // Hier zou je een API-call doen om een account aan te maken
    setCreated(true);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 flex flex-col items-center justify-center text-white">
      <div className="max-w-md w-full bg-white bg-opacity-10 rounded-xl shadow-lg p-8">
        <a href="/dashboard/settings/user" className="inline-block mb-4 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition">← Terug</a>
        <h1 className="text-xl font-bold mb-6 text-white">Account aanmaken</h1>
        {created ? (
          <div className="text-green-300 font-semibold mb-4">Account succesvol aangemaakt!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-lg font-semibold text-blue-900">Gebruikersnaam</label>
              <input type="text" name="username" value={form.username} onChange={handleChange} className="w-full rounded px-3 py-2 bg-gray-800 text-white" required placeholder="Gebruikersnaam" />
              {errors.username && <div className="text-red-400 text-xs mt-1">{errors.username}</div>}
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold text-blue-900">E-mail</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded px-3 py-2 bg-gray-800 text-white" required placeholder="E-mail" />
              {errors.email && <div className="text-red-400 text-xs mt-1">{errors.email}</div>}
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold text-blue-900">Wachtwoord</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full rounded px-3 py-2 bg-gray-800 text-white" required placeholder="Wachtwoord" />
              {errors.password && <div className="text-red-400 text-xs mt-1">{errors.password}</div>}
            </div>
            <button type="submit" className="bg-blue-700 hover:bg-blue-900 text-white rounded-lg px-4 py-2 font-semibold w-full">Account maken</button>
          </form>
        )}
      </div>
    </main>
  );
}
