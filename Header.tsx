"use client";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white border-b border-gray-200 shadow-sm px-8 py-4">
      <h2 className="text-xl font-semibold text-blue-900">
        Healthcare Credentialing Automation
      </h2>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Admin • Arthrex</span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          className="w-9 h-9 rounded-full border border-gray-300"
          alt="user"
        />
      </div>
    </header>
  );
}
