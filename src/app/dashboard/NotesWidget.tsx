import React, { useState } from "react";


const NotesWidget: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Load notes from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("notes-widget");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Save notes to localStorage when changed
  React.useEffect(() => {
    localStorage.setItem("notes-widget", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (input.trim()) {
      setNotes([input, ...notes]);
      setInput("");
    }
  }

  function removeNote(idx: number) {
    setNotes(notes.filter((_, i) => i !== idx));
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Notities</span>
      <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded w-fit mb-2" onClick={() => setShowPopup(true)}>Open notities</button>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 shadow-lg w-full max-w-md flex flex-col gap-4">
            <span className="font-bold text-lg mb-2">Notities</span>
            <input value={input} onChange={e => setInput(e.target.value)} className="bg-gray-800 text-white p-2 rounded mb-2" placeholder="Typ een notitie..." />
            <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded w-fit mb-2" onClick={addNote}>Toevoegen</button>
            <ul className="text-xs text-gray-400 max-h-48 overflow-y-auto">
              {notes.map((note, i) => (
                <li key={i} className="mb-1 bg-gray-800 rounded px-2 py-1 text-white flex justify-between items-center">
                  <span>{note}</span>
                  <button className="bg-red-600 text-white text-xs px-2 py-1 rounded ml-2" onClick={() => removeNote(i)}>Verwijder</button>
                </li>
              ))}
            </ul>
            <button className="bg-red-600 text-white text-xs px-2 py-1 rounded w-fit mt-2 self-end" onClick={() => setShowPopup(false)}>Sluiten</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesWidget;
