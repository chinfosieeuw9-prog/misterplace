"use client";
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function SharePage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError('');
    try {
    const { error } = await supabase.storage.from('files').upload(file.name, file);
      if (error) throw error;
      const url = supabase.storage.from('files').getPublicUrl(file.name).data.publicUrl;
      setDownloadUrl(url);
  } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Onbekende fout');
      }
    }
    setUploading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Bestand delen</h1>
      <form onSubmit={handleUpload} className="w-full max-w-md">
        <input
          placeholder="Voer waarde in"
          type="file"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full"
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
          disabled={uploading}
        >
          {uploading ? 'Bezig met uploaden...' : 'Uploaden'}
        </button>
      </form>
      {downloadUrl && (
        <div className="mt-6">
          <p>Downloadlink:</p>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{downloadUrl}</a>
        </div>
      )}
    </div>
  );
}
