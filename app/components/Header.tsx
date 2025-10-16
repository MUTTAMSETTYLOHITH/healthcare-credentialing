"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [dense, setDense] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dense", dense);
  }, [dense]);

  return (
    <header className="bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div>
        <div className="text-[12px] text-gray-500">Credentialing</div>
        <h1 className="text-[18px] font-semibold text-[#0b1530]">Executive Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={()=>setDense(false)}
            className={`btn btn-ghost ${!dense ? "ring-2 ring-blue-200" : ""}`}
          >
            Comfort
          </button>
          <button
            onClick={()=>setDense(true)}
            className={`btn btn-ghost ${dense ? "ring-2 ring-blue-200" : ""}`}
          >
            Compact
          </button>
        </div>
        <button className="btn btn-primary">New Provider</button>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          className="w-8 h-8 rounded-full border border-gray-300"
          alt="user"
        />
      </div>
    </header>
  );
}
