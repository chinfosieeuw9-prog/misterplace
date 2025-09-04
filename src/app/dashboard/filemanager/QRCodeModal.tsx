"use client";
import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeModalProps {
  url: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 relative flex flex-col items-center">
        <button className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded" onClick={onClose}>Sluiten</button>
        <h2 className="text-white font-bold mb-4">QR-code voor delen</h2>
        <QRCodeSVG value={url} size={200} bgColor="#222" fgColor="#fff" />
        <div className="mt-4 text-white break-all text-xs">{url}</div>
      </div>
    </div>
  );
};

export default QRCodeModal;
