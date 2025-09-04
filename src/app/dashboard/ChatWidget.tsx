import React from "react";

const ChatWidget: React.FC = () => (
  <div className="bg-gray-900 rounded-xl p-6 shadow flex flex-col gap-2 widget-uniform">
    <span className="font-bold mb-2">Berichten / Chat</span>
    <a
      href="https://web.whatsapp.com/"
      target="_blank"
      rel="noopener"
      className="bg-green-500 text-white text-xs px-4 py-2 rounded w-fit mb-2 hover:bg-green-600 transition"
    >
      Open WhatsApp Web
    </a>
    <span className="text-xs text-gray-400">
      Start direct een chat via WhatsApp Web.
    </span>
  </div>
);

export default ChatWidget;
