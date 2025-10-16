import React from "react";
import Sidebar from "../components/Sidebar";
import "../globals.css";

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[24rem_1fr] min-h-screen bg-[#0b1430]">
      {/* Col 1: fixed-width sidebar */}
      <Sidebar />

      {/* Col 2: app content */}
      <main className="bg-[#f6f8fb] relative z-10">
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
