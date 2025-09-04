"use client";
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/navigation';


export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push('/dashboard');
    setLoading(false);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else router.push('/dashboard');
    setLoading(false);
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {view === 'login' ? 'Inloggen' : view === 'register' ? 'Registreren' : 'Wachtwoord vergeten'}
        </h2>
        <form onSubmit={view === 'login' ? handleLogin : view === 'register' ? handleRegister : handleForgot}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          {(view !== 'forgot') && (
            <input
              type="password"
              placeholder="Wachtwoord"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
          )}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Bezig...' : view === 'login' ? 'Inloggen' : view === 'register' ? 'Registreren' : 'Reset link sturen'}
          </button>
        </form>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            {view === 'login' && (
              <button
                type="button"
                className="text-blue-500 hover:underline text-left"
                onClick={() => setView('forgot')}
              >
                Wachtwoord vergeten?
              </button>
            )}
            {view !== 'login' && (
              <button className="text-blue-600" onClick={() => setView('login')}>Inloggen</button>
            )}
            {view !== 'register' && (
              <button className="text-blue-600" onClick={() => setView('register')}>Account maken</button>
            )}
          </div>
          <div className="flex justify-between">
            {view !== 'forgot' && (
              <button className="text-blue-600" onClick={() => setView('forgot')}>Wachtwoord vergeten?</button>
            )}
            <button className="text-blue-600" onClick={() => {
              const newPin = window.prompt('Nieuwe pincode instellen (minimaal 4 cijfers):');
              if (newPin && /^\d{4,6}$/.test(newPin)) {
                alert('Pincode reset link verstuurd (dummy)!');
              } else if (newPin) {
                alert('Ongeldige pincode. Minimaal 4 cijfers.');
              }
            }}>Pincode vergeten?</button>
          </div>
        </div>
      </div>
    </div>
  );
}
