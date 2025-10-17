import React from "react";
import Sidebar from "../components/Sidebar";
import "../globals.css";

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  // Two-column grid: sidebar + main
  return (
    <div className="grid grid grid-cols-[24rem_1fr] min-h-screen bg-[#0b1430]">
      <Sidebar />
      <main className="bg-[#f6f8fb] bg-[#f6f8fb]">
        <div className="topbar">
          <div className="topbar-inner">
            <span className="topbar-title">Credentialing</span>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 py-6">{children}</div>
      </main>
    </div>
  );
}

