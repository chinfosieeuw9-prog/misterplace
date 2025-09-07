"use client";

import React from "react";
import Link from "next/link";
import RadioWidget from "./RadioWidget";
import NewsWidget from "./NewsWidget";
import FavoriteLinksWidget from "./FavoriteLinksWidget";
import NetworkMonitorWidget from "./NetworkMonitorWidget";
import WifiInfoWidget from "./WifiInfoWidget";
import NetworkToolsWidget from "./OnlinePingTraceWidget";
import NotesWidget from "./NotesWidget";
import TickerBar from "./TickerBar";
import StorageUsageWidget from "./StorageUsageWidget";
import ConversionWidget from "./ConversionWidget";
import SessionWidget from "./SessionWidget";
import LastUploadWidget from "./LastUploadWidget";
import LanInfoWidget from "../dashboard/LanInfoWidget";
import AgendaWidget from "./AgendaWidget";
import FavoritesWidget from "./FavoritesWidget";
import ChatWidget from "./ChatWidget";
import SystemStatusWidget from "./SystemStatusWidget";
import TeamViewerWidget from "./TeamViewerWidget";
import RemoteDesktopWidget from "./RemoteDesktopWidget";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const initialWidgets = [
  { id: 'radio', component: <RadioWidget /> },
  { id: 'lan', component: <LanInfoWidget /> },
  { id: 'news', component: <NewsWidget /> },
  { id: 'favlinks', component: <FavoriteLinksWidget /> },
  { id: 'network', component: <NetworkMonitorWidget /> },
  { id: 'wifi', component: <WifiInfoWidget /> },
  { id: 'notes', component: <NotesWidget /> },
  { id: 'teamviewer', component: <TeamViewerWidget /> },
  { id: 'networktools', component: <NetworkToolsWidget /> },
  { id: 'remotedesktop', component: <RemoteDesktopWidget /> }
];

export default function DashboardPage() {
  const [widgets, setWidgets] = React.useState(initialWidgets);

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const items = Array.from(widgets);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setWidgets(items);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col md:flex-row">
      <div className="fixed top-0 left-0 w-full z-50">
        <TickerBar />
      </div>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 p-6 flex-col gap-8 min-h-screen shadow-xl hidden md:flex">
        <div className="text-2xl font-bold mb-8">once ui</div>
        <nav className="flex flex-col gap-4">
          {/* Links verwijderd: Home, Analytics, Reports */}
          <a href="/dashboard/filemanager" className="font-semibold text-blue-400 hover:text-white">Bestanden</a>
          <a href="#" className="font-semibold text-blue-400 hover:text-white">Mijn bestanden</a>
          <a href="/dashboard/upload" className="font-semibold text-blue-400 hover:text-white">Upload</a>
          <a href="/dashboard/download" className="font-semibold text-blue-400 hover:text-white">Download</a>
          <a href="/dashboard/lan" className="font-semibold text-blue-400 hover:text-white">LAN</a>
        </nav>
        <div className="mt-8">
          <div className="text-xs uppercase text-gray-500 mb-2">Instellingen</div>
          <nav className="flex flex-col gap-2">
            <a href="/dashboard/settings" className="text-gray-400 hover:text-white">Algemeen</a>
            <a href="/dashboard/settings/user" className="text-gray-400 hover:text-white">Mijn instellingen</a>
          </nav>
        </div>
        <div className="mt-8">
          <div className="text-xs uppercase text-gray-500 mb-2">Management</div>
          <nav className="flex flex-col gap-2">
            <a href="#" className="text-gray-400 hover:text-white">Users</a>
            <a href="#" className="text-gray-400 hover:text-white">Roles</a>
            <a href="#" className="text-gray-400 hover:text-white">Permissions</a>
          </nav>
        </div>
        <div className="mt-8">
          <div className="text-xs uppercase text-gray-500 mb-2">Projects</div>
          <nav className="flex flex-col gap-2">
            <a href="#" className="text-gray-400 hover:text-white">Overview</a>
            <a href="#" className="text-gray-400 hover:text-white">My projects</a>
          </nav>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-4 md:p-10">
  <Link href="/" className="inline-block mb-2 bg-gray-800 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition">← Terug</Link>
        <header className="mb-8 flex justify-between items-center">
          <div className="dashboard-header-container">
            <div className="dashboard-header">Dashboard</div>
            <div className="dashboard-header-gloss" />
          </div>
        </header>
        {/* Bestandensysteem */}
        {/* Bestandswidgets zonder uploadknoppen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* UploadForm verwijderd */}
          {/* MyFileWidget verwijderd */}
        </div>
        {/* Netwerk-widgets onder de bestandswidgets */}
        <div className="w-full">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dashboard-widgets" direction="horizontal">
              {(provided) => (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {widgets.map((w, idx) => (
                    <Draggable key={w.id} draggableId={w.id} index={idx}>
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          className="cursor-move widget-uniform flex flex-col justify-center items-center"
                        >
                          {w.component}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StorageUsageWidget />
          <LastUploadWidget />
          <ConversionWidget />
          <SessionWidget />
        </div>
        {/* Nieuwe widgets onder de header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <AgendaWidget />
          <NotesWidget />
          <FavoritesWidget />
          <ChatWidget />
          <SystemStatusWidget />
        </div>
      </main>
    </div>
  );
}
