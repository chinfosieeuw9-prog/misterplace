"use client";
import React from "react";


const FileManagerPage: React.FC = () => {
  const [activeFolder, setActiveFolder] = React.useState<string>("root");
  function handleFolderClick(folder: string) {
    setActiveFolder(folder);
  }
  // Dummy data for folders and files
  const dummyFolders = ["root", "testmap"];
  const dummyFiles = activeFolder === "testmap"
    ? [{ name: "testbestand.txt", path: "testmap/testbestand.txt" }]
    : [
        { name: "7091_drop-of-water-blue-dark_3440x1440.jpg", path: "root/7091_drop-of-water-blue-dark_3440x1440.jpg" },
        { name: "Gsrg3rVXQAAccmc.jpg", path: "root/Gsrg3rVXQAAccmc.jpg" },
        { name: "GtPR_qDWQAAArtF.jpg", path: "root/GtPR_qDWQAAArtF.jpg" },
        { name: "GtZVZc9WYAEBfJr.jpg", path: "root/GtZVZc9WYAEBfJr.jpg" }
      ];
  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="mb-4">
        <a href="/dashboard" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">← Terug naar dashboard</a>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-white">Bestandbeheer</h1>
      <div className="flex gap-6">
        <aside className="w-64 bg-gray-800 rounded-xl p-4 text-white">
          <h2 className="font-semibold mb-4">Mappen</h2>
          <ul>
            {dummyFolders.map(folder => (
              <li key={folder} className={`mb-2 cursor-pointer flex items-center gap-2 ${activeFolder === folder ? 'font-bold text-blue-400' : ''}`}>
                <span onClick={() => handleFolderClick(folder)} style={{flex:1}}>📁 {folder}</span>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <input className="bg-gray-700 text-white p-2 rounded w-1/2" placeholder="Zoek bestanden..." autoComplete="off" disabled />
            <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-not-allowed opacity-50">
              Upload niet beschikbaar
              <input type="file" className="hidden" disabled />
            </label>
          </div>
          <ul className="divide-y divide-gray-800">
            {dummyFiles.map(file => (
              <li key={file.name} className="flex items-center py-2 px-2 hover:bg-gray-700 cursor-pointer text-sm">
                <span className="mr-2 text-lg">{file.name.endsWith('.pdf') ? '📄' : file.name.match(/\.(png|jpg|jpeg|gif|webp)$/i) ? '🖼️' : '�'}</span>
                <span className="flex-1 truncate text-white">{file.name}</span>
                <span className="text-xs text-gray-400">Acties niet beschikbaar online.</span>
              </li>
            ))}
          </ul>
        </main>
      </div>
      </div>
    );
                    e.stopPropagation();
                    // Verwijder map door alle bestanden te verwijderen
                    const res = await fetch(getApiUrl(`/api/files?folder=${folder}`));
                    const files = await res.json();
                    for (const file of files) {
                      await fetch(getApiUrl("/api/delete"), {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ folder, name: file.name })
                      });
                    }
                    // Verwijder map zelf (optioneel, als leeg)
                    await fetch(getApiUrl("/api/delete-folder"), {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ folder })
                    });
                    fetch(getApiUrl("/api/folders")).then(r => r.json()).then(setFolders);
                  }}>Verwijder</button>
                )}
              </li>
            ))}
          </ul>
        </aside>
        {/* Hoofdsectie voor bestanden */}
        <main className="flex-1 bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <input className="bg-gray-700 text-white p-2 rounded w-1/2" placeholder="Zoek bestanden..." autoComplete="off" />
            <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
              {uploading ? "Uploaden..." : "Upload bestand"}
              <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
          {/* Bestanden grid */}
          // Dummy data for folders and files
          const dummyFolders = ["root", "testmap"];
          const dummyFiles = activeFolder === "testmap"
            ? [{ name: "testbestand.txt", path: "testmap/testbestand.txt" }]
            : [
                { name: "7091_drop-of-water-blue-dark_3440x1440.jpg", path: "root/7091_drop-of-water-blue-dark_3440x1440.jpg" },
                { name: "Gsrg3rVXQAAccmc.jpg", path: "root/Gsrg3rVXQAAccmc.jpg" },
                { name: "GtPR_qDWQAAArtF.jpg", path: "root/GtPR_qDWQAAArtF.jpg" },
                { name: "GtZVZc9WYAEBfJr.jpg", path: "root/GtZVZc9WYAEBfJr.jpg" }
              ];
          return (
            <div className="bg-gray-900 min-h-screen p-8">
              <div className="mb-4">
                <a href="/dashboard" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">← Terug naar dashboard</a>
              </div>
              <h1 className="text-2xl font-bold mb-6 text-white">Bestandbeheer</h1>
              <div className="flex gap-6">
                <aside className="w-64 bg-gray-800 rounded-xl p-4 text-white">
                  <h2 className="font-semibold mb-4">Mappen</h2>
                  <ul>
                    {dummyFolders.map(folder => (
                      <li key={folder} className={`mb-2 cursor-pointer flex items-center gap-2 ${activeFolder === folder ? 'font-bold text-blue-400' : ''}`}>
                        <span onClick={() => handleFolderClick(folder)} style={{flex:1}}>📁 {folder}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
                <main className="flex-1 bg-gray-800 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <input className="bg-gray-700 text-white p-2 rounded w-1/2" placeholder="Zoek bestanden..." autoComplete="off" disabled />
                    <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-not-allowed opacity-50">
                      Upload niet beschikbaar
                      <input type="file" className="hidden" disabled />
                    </label>
                  </div>
                  <ul className="divide-y divide-gray-800">
                    {dummyFiles.map(file => (
                      <li key={file.name} className="flex items-center py-2 px-2 hover:bg-gray-700 cursor-pointer text-sm">
                        <span className="mr-2 text-lg">{file.name.endsWith('.pdf') ? '📄' : file.name.match(/\.(png|jpg|jpeg|gif|webp)$/i) ? '🖼️' : '📦'}</span>
                        <span className="flex-1 truncate text-white">{file.name}</span>
                        <span className="text-xs text-gray-400">Acties niet beschikbaar online.</span>
                      </li>
                    ))}
                  </ul>
                </main>
              </div>
              </div>
            );
          export default FileManagerPage;
