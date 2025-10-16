"use client";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MetricsGrid from "./components/MetricsGrid";
import VerificationTable from "./components/VerificationTable";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-8 overflow-y-auto bg-gray-50">
          <MetricsGrid />
          <VerificationTable />
        </main>
      </div>
    </div>
  );
}
