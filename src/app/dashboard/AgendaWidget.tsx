import React, { useState } from "react";
import './widgets.css';

const mockAgenda = [
  { date: "2025-08-01", title: "Teamoverleg" },
  { date: "2025-08-12", title: "Klantcall" },
  { date: "2025-08-18", title: "Documentatie bijwerken" },
];

const AgendaWidget: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
      <span className="font-bold mb-2">Agenda</span>
      <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded w-fit mb-2" onClick={() => setShowPopup(true)}>Open maandoverzicht</button>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 shadow-lg w-full max-w-lg flex flex-col gap-4">
            <span className="font-bold text-lg mb-2">Maandoverzicht Augustus 2025</span>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const dateStr = `2025-08-${day.toString().padStart(2, '0')}`;
                const event = mockAgenda.find(e => e.date === dateStr);
                return (
                  <div key={day} className={`bg-gray-800 rounded p-2 text-xs text-white h-12 flex flex-col items-center justify-center ${event ? 'border-2 border-blue-500' : ''}`}>
                    <span>{day}</span>
                    {event && <span className="text-blue-400 mt-1">{event.title}</span>}
                  </div>
                );
              })}
            </div>
            <button className="bg-red-600 text-white text-xs px-2 py-1 rounded w-fit mt-2 self-end" onClick={() => setShowPopup(false)}>Sluiten</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaWidget;
