"use client";
import React, { useState } from "react";

export default function UserSettingsPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    notifications: "Alle",
    theme: "Donker",
    language: "Nederlands"
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const newErrors: typeof errors = { username: "", email: "", password: "", phone: "" };
    if (!form.username.trim()) {
      newErrors.username = "Gebruikersnaam is verplicht.";
    } else if (form.username.length < 3) {
      newErrors.username = "Minimaal 3 tekens.";
    }
    if (!form.email.trim()) {
      newErrors.email = "E-mail is verplicht.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Ongeldig e-mailadres.";
    }
    if (form.password && form.password.length < 6) {
      newErrors.password = "Minimaal 6 tekens.";
    }
    if (form.phone && !/^\+?[0-9]{6,}$/.test(form.phone)) {
      newErrors.phone = "Ongeldig telefoonnummer.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    alert(`Opgeslagen:\nGebruikersnaam: ${form.username}\nE-mail: ${form.email}\nWachtwoord: ${form.password}\nTelefoon: ${form.phone}\nNotificaties: ${form.notifications}\nThema: ${form.theme}\nTaal: ${form.language}`);
  }
  return (
    <div className="bg-gray-900 rounded-xl p-8 shadow mt-4 max-w-xl mx-auto">
      <a href="/dashboard" className="inline-block mb-4 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition">← Terug naar dashboard</a>
      <h1 className="text-2xl font-bold mb-6">Mijn instellingen</h1>
      <form className="mb-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Gebruikersnaam</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" placeholder="Gebruikersnaam" />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">E-mail</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" placeholder="E-mail" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Wachtwoord</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" placeholder="Nieuw wachtwoord" />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Profielfoto</label>
          <input type="file" className="bg-gray-800 text-white rounded px-3 py-2 w-full" accept="image/*" title="Profielfoto" />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Telefoonnummer</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" placeholder="Telefoonnummer" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Notificaties</label>
          <select name="notifications" value={form.notifications} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" title="Notificaties">
            <option>Alle</option>
            <option>Alleen belangrijk</option>
            <option>Geen</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Thema</label>
          <select name="theme" value={form.theme} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" title="Thema">
            <option>Donker</option>
            <option>Licht</option>
            <option>Systeem</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Taal</label>
          <select name="language" value={form.language} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" title="Taal">
            <option>Nederlands</option>
            <option>Engels</option>
          </select>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit">Opslaan</button>
  <a href="/profile/account" className="block mt-4 bg-green-600 hover:bg-green-800 text-white rounded-lg px-4 py-2 text-center font-semibold">Account aanmaken</a>
      </form>
    </div>
  );
}
