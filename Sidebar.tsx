"use client";
import {
  HomeIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const items = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "Providers", icon: ShieldCheckIcon },
  { name: "Verifications", icon: ClipboardDocumentListIcon },
  { name: "Analytics", icon: ChartBarIcon },
  { name: "Settings", icon: Cog6ToothIcon },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-blue-950 to-blue-900 text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold tracking-wide mb-10">
        🏥 HealthCred Console
      </h1>
      <nav className="flex flex-col gap-2">
        {items.map((i) => (
          <div
            key={i.name}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-800 cursor-pointer transition"
          >
            <i.icon className="w-5 h-5" />
            <span>{i.name}</span>
          </div>
        ))}
      </nav>
      <div className="mt-auto text-sm text-gray-400 border-t border-blue-800 pt-4">
        v3.0 • Secure Cloud
      </div>
    </aside>
  );
}
