"use client";
import { useState } from "react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export default function VerificationTable() {
  const [rows, setRows] = useState([
    { id: 1, name: "Dr. Alice Smith", dept: "Cardiology", status: "Verified" },
    { id: 2, name: "Dr. Bob Johnson", dept: "Orthopedics", status: "Pending" },
  ]);
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");

  const addRow = () => {
    if (!name.trim() || !dept.trim()) return;
    setRows([...rows, { id: Date.now(), name, dept, status: "Pending" }]);
    setName(""); setDept("");
  };

  const verify = (id: number) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, status: "Verified" } : r)));

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Credential Verification</h3>

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Provider Name"
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        <input
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          placeholder="Department"
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addRow}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Add
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
              >
                <td className="p-3">{r.id}</td>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.dept}</td>
                <td className="p-3">
                  {r.status === "Verified" ? (
                    <span className="flex items-center gap-1 text-green-700">
                      <CheckCircleIcon className="w-4 h-4" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-700">
                      <ClockIcon className="w-4 h-4" /> Pending
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {r.status === "Pending" && (
                    <button
                      onClick={() => verify(r.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                    >
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
