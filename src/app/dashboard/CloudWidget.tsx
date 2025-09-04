import React from "react";
import './widgets.css';

const CloudWidget: React.FC = () => {
  // Mock data, later uitbreiden met echte API
  const onedriveFiles = 12;
  const googleFiles = 8;
  const usedStorage = "2.3 GB";
  return (
  <div className="widget-uniform widget-compact flex flex-col gap-1 p-3 items-start">
      <span className="font-bold mb-1 text-sm">OneDrive & Google Drive</span>
      <span className="text-xs text-blue-400">OneDrive: <span className="text-white">{onedriveFiles}</span></span>
      <span className="text-xs text-green-400">Google: <span className="text-white">{googleFiles}</span></span>
      <span className="text-xs text-gray-400">Opslag: <span className="text-white">{usedStorage}</span></span>
    </div>
  );
};

export default CloudWidget;
