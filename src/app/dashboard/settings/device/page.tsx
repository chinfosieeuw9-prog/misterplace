"use client";
import React from "react";

export default function DeviceSettingsPage() {
  const [loading, setLoading] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    deviceName: "",
    os: typeof window !== "undefined" ? window.navigator.platform : "",
    browser: typeof window !== "undefined" ? window.navigator.userAgent : "",
    resolution: typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "",
    language: typeof window !== "undefined" ? window.navigator.language : "Nederlands",
    theme: "Donker",
    pin: "",
    screensaverTimer: 5,
    lockTimer: 10,
    customTimer: 15
  });

  async function handleDeviceAction(endpoint: string, confirmMsg?: string) {
    // Voor reset: pincode vragen
    if (endpoint === '/api/device-reset') {
      const pin = window.prompt("Voer uw pincode in om te bevestigen:");
      if (!pin || pin !== form.pin) {
        alert("Pincode onjuist of geannuleerd.");
        return;
      }
    }
    if (confirmMsg && !window.confirm(confirmMsg)) return;
    setLoading(endpoint);
    try {
      const res = await fetch(endpoint, { method: 'POST' });
      const data = await res.json();
      alert(data.message);
      setLoading(null);
    } catch {
      alert('Er is een fout opgetreden bij de actie.');
      setLoading(null);
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
  setForm({ ...form, [e.target.name]: value });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  alert(`Opgeslagen:\nApparaatnaam: ${form.deviceName}\nBesturingssysteem: ${form.os}\nBrowser: ${form.browser}\nResolutie: ${form.resolution}\nTaal: ${form.language}\nThema: ${form.theme}\nPincode: ${form.pin}\nScreensaver timer: ${form.screensaverTimer} min\nLock timer: ${form.lockTimer} min\nCustom timer: ${form.customTimer} min`);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-900 rounded-xl p-8 shadow max-w-xl w-full">
        <a href="/dashboard" className="inline-block mb-4 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition">← Terug naar dashboard</a>
        <h1 className="text-2xl font-bold mb-6">Instellingen device</h1>
        <form className="mb-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-4 text-xs text-gray-400">
            <p><b>Reset device:</b> Zet het apparaat terug naar fabrieksinstellingen. Vereist pincode.</p>
            <p><b>Backup device:</b> Maakt een backup van je instellingen en data.</p>
            <p><b>Update device:</b> Installeert de nieuwste software-update.</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4 mt-6">
            <button type="button" className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition" onClick={() => handleDeviceAction('/api/device-reset', 'Weet u het zeker? Dit zal het device resetten.')} disabled={!!loading}>
              {loading === '/api/device-reset' ? 'Bezig...' : 'Reset device'}
            </button>
            <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition" onClick={() => handleDeviceAction('/api/device-backup', 'Backup van device starten?')} disabled={!!loading}>
              {loading === '/api/device-backup' ? 'Bezig...' : 'Backup device'}
            </button>
            <button type="button" className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition" onClick={() => handleDeviceAction('/api/device-update', 'Device update starten?')} disabled={!!loading}>
              {loading === '/api/device-update' ? 'Bezig...' : 'Update device'}
            </button>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition" onClick={() => {
              const newPin = window.prompt('Nieuwe pincode instellen (minimaal 4 cijfers):');
              if (newPin && /^\d{4,6}$/.test(newPin)) {
                setForm({ ...form, pin: newPin });
                alert('Pincode succesvol aangepast!');
              } else if (newPin) {
                alert('Ongeldige pincode. Minimaal 4 cijfers.');
              }
            }}>Reset pincode</button>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Pincode</label>
            <input type="password" name="pin" value={form.pin} onChange={handleChange} className={`bg-gray-800 text-white rounded px-3 py-2 w-full border ${form.pin.length < 4 ? 'border-red-500' : 'border-green-500'}`} placeholder="Pincode (minimaal 4 cijfers)" maxLength={6} pattern="\d{4,6}" required />
            {form.pin.length < 4 && <span className="text-xs text-red-400">Minimaal 4 cijfers vereist</span>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Screensaver timer (minuten)</label>
            <input type="number" name="screensaverTimer" value={form.screensaverTimer} onChange={handleChange} className={`bg-gray-800 text-white rounded px-3 py-2 w-full border ${(form.screensaverTimer < 1 || form.screensaverTimer > 120) ? 'border-red-500' : 'border-green-500'}`} min={1} max={120} required placeholder="Bijv. 5" title="Geef een waarde tussen 1 en 120 minuten" />
            {(form.screensaverTimer < 1 || form.screensaverTimer > 120) && <span className="text-xs text-red-400">Geef een waarde tussen 1 en 120 minuten</span>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Lock timer (minuten)</label>
            <input type="number" name="lockTimer" value={form.lockTimer} onChange={handleChange} className={`bg-gray-800 text-white rounded px-3 py-2 w-full border ${(form.lockTimer < 1 || form.lockTimer > 120) ? 'border-red-500' : 'border-green-500'}`} min={1} max={120} required placeholder="Bijv. 10" title="Geef een waarde tussen 1 en 120 minuten" />
            {(form.lockTimer < 1 || form.lockTimer > 120) && <span className="text-xs text-red-400">Geef een waarde tussen 1 en 120 minuten</span>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Custom timer (minuten)</label>
            <input type="number" name="customTimer" value={form.customTimer} onChange={handleChange} className={`bg-gray-800 text-white rounded px-3 py-2 w-full border ${(form.customTimer < 1 || form.customTimer > 240) ? 'border-red-500' : 'border-green-500'}`} min={1} max={240} required placeholder="Bijv. 15" title="Geef een waarde tussen 1 en 240 minuten" />
            {(form.customTimer < 1 || form.customTimer > 240) && <span className="text-xs text-red-400">Geef een waarde tussen 1 en 240 minuten</span>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Apparaatnaam</label>
            <input type="text" name="deviceName" value={form.deviceName} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" placeholder="Apparaatnaam" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Besturingssysteem</label>
            <input type="text" name="os" value={form.os} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" placeholder="Besturingssysteem" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Browser</label>
            <input type="text" name="browser" value={form.browser} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" placeholder="Browser" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Schermresolutie</label>
            <input type="text" name="resolution" value={form.resolution} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" placeholder="Resolutie" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Taal</label>
            <select name="language" value={form.language} onChange={handleChange} className="bg-gray-800 text-white rounded px-3 py-2 w-full" title="Taal">
              <option>Nederlands</option>
              <option>Engels</option>
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4" type="submit">Opslaan</button>
        </form>
      </div>
*** End Patch
    </div>
  );
}
