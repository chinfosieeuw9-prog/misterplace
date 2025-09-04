import React, { useState } from "react";

const mockFiles = [
  { name: "document.pdf", size: "1.2 MB", type: "PDF", modified: "2025-08-30" },
  { name: "photo.jpg", size: "3.4 MB", type: "JPG", modified: "2025-08-29" },
  { name: "notes.txt", size: "4 KB", type: "TXT", modified: "2025-08-28" },
];

export default function FileManagerWidget() {
  const [files, setFiles] = useState(mockFiles);
  const [selected, setSelected] = useState<number | null>(null);
  const [uploadName, setUploadName] = useState("");

  function handleDelete(idx: number) {
    setFiles(files => files.filter((_, i) => i !== idx));
    setSelected(null);
  }

  function handleUpload() {
    if (uploadName) {
      setFiles(files => [...files, { name: uploadName, size: "0 KB", type: "NEW", modified: "2025-08-31" }]);
      setUploadName("");
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow flex flex-col gap-4 w-full">
      <span className="font-bold mb-2">Bestandenbeheer</span>
      <div className="mb-2 flex gap-2">
        <input
          type="text"
          className="bg-gray-900 text-white p-1 rounded text-xs w-40"
          placeholder="Bestandsnaam uploaden..."
          value={uploadName}
          onChange={e => setUploadName(e.target.value)}
        />
        <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded" onClick={handleUpload}>Upload</button>
      </div>
      <table className="w-full text-xs text-left">
        <thead>
          <tr className="text-gray-400">
            <th>Naam</th>
            <th>Type</th>
            <th>Grootte</th>
            <th>Gewijzigd</th>
            <th>Acties</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, idx) => (
            <tr key={idx} className={selected === idx ? "bg-blue-900" : "hover:bg-gray-700"}>
              <td onClick={() => setSelected(idx)} className="cursor-pointer text-white">{file.name}</td>
              <td>{file.type}</td>
              <td>{file.size}</td>
              <td>{file.modified}</td>
              <td>
                <button className="bg-red-600 text-white px-2 py-1 rounded text-xs mr-2" onClick={() => handleDelete(idx)}>Verwijder</button>
                <button className="bg-green-600 text-white px-2 py-1 rounded text-xs" onClick={() => alert(`Download: ${file.name}`)}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected !== null && (
        <div className="mt-2 p-2 bg-gray-900 rounded text-xs text-white">
          <span className="font-semibold">Preview:</span> {files[selected].name} ({files[selected].type})
        </div>
      )}
    </div>
  );
}
