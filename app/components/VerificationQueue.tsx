"use client";
import { useMemo, useState } from "react";
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Status = "Pending" | "Verified" | "Flagged";
type Row = { id: number; name: string; dept: string; status: Status };

const initial: Row[] = [
  { id: 10243, name: "Dr. Chen Liu",    dept: "Anesthesiology", status: "Flagged" },
  { id: 10242, name: "Dr. Bob Johnson", dept: "Orthopedics",    status: "Pending" },
  { id: 10241, name: "Dr. Alice Smith", dept: "Cardiology",     status: "Verified" },
  { id: 10240, name: "Dr. Maya Patel",  dept: "Radiology",      status: "Pending" },
  { id: 10239, name: "Dr. Omar Aziz",   dept: "Neurology",      status: "Verified" },
  { id: 10238, name: "Dr. Eva Martin",  dept: "Pathology",      status: "Pending" },
  { id: 10237, name: "Dr. Jake Turner", dept: "Oncology",       status: "Verified" },
  { id: 10236, name: "Dr. Sophia Rao",  dept: "Pediatrics",     status: "Flagged" },
];

export default function VerificationQueue({ onOpen }: { onOpen: (row: Row)=>void }) {
  const [rows, setRows] = useState<Row[]>(initial);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<Status | "All">("All");
  const [tab, setTab] = useState<"Queue"|"Completed">("Queue");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(()=>{
    let r = rows.filter(r =>
      r.name.toLowerCase().includes(q.toLowerCase()) ||
      String(r.id).includes(q) ||
      r.dept.toLowerCase().includes(q.toLowerCase())
    );
    if (status !== "All") r = r.filter(x => x.status === status);
    if (tab === "Completed") r = r.filter(x => x.status === "Verified");
    if (tab === "Queue") r = r.filter(x => x.status !== "Verified");
    return r;
  }, [rows, q, status, tab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const view = filtered.slice((page-1)*pageSize, page*pageSize);

  const add = (name: string, dept: string) => {
    if (!name.trim() || !dept.trim()) return;
    setRows([{ id: Date.now(), name, dept, status: "Pending" }, ...rows]);
    setPage(1);
  };

  const verify = (id: number) =>
    setRows(rows.map(r => (r.id === id ? { ...r, status: "Verified" } : r)));

  const chip = (s: Status) =>
    s === "Verified" ? "bg-green-50 text-green-700 border border-green-200"
    : s === "Flagged" ? "bg-amber-50 text-amber-800 border border-amber-200"
    : "bg-blue-50 text-blue-700 border border-blue-200";

  const icon = (s: Status) =>
    s === "Verified" ? <CheckCircleIcon className="w-4 h-4" />
    : s === "Flagged" ? <ExclamationTriangleIcon className="w-4 h-4" />
    : <ClockIcon className="w-4 h-4" />;

  // quick add controls
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");

  return (
    <section className="panel p-5">
      {/* Tabs & controls */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
        <div className="flex gap-2">
          {(["Queue","Completed"] as const).map(t=>(
            <button key={t}
              onClick={()=>{ setTab(t); setPage(1); }}
              className={`btn ${tab===t ? "btn-primary" : "btn-ghost"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full md:w-auto">
          <input className="input" placeholder="Search name, ID, deptâ€¦" value={q} onChange={e=>{ setQ(e.target.value); setPage(1); }} />
          <select className="input" value={status} onChange={e=>{ setStatus(e.target.value as any); setPage(1); }}>
            {["All","Pending","Verified","Flagged"].map(s=><option key={s}>{s}</option>)}
          </select>
          <input className="input" placeholder="Provider name" value={name} onChange={e=>setName(e.target.value)} />
          <div className="flex gap-2">
            <input className="input" placeholder="Department" value={dept} onChange={e=>setDept(e.target.value)} />
            <button className="btn btn-primary" onClick={()=>add(name, dept)}>Add</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-[13px]">
          <thead className="bg-[#0b1840] text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {view.map((r, idx)=>(
              <tr key={r.id} className={idx % 2 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 font-mono">{r.id}</td>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.dept}</td>
                <td className="p-3">
                  <span className={`chip ${chip(r.status)}`}>{icon(r.status)}{r.status}</span>
                </td>
                <td className="p-3 flex items-center gap-2">
                  <button className="text-xs btn btn-ghost" onClick={()=>onOpen(r)}>
                    Details <ChevronRightIcon className="w-4 h-4"/>
                  </button>
                  {r.status === "Pending" && (
                    <button onClick={()=>verify(r.id)} className="text-xs btn btn-primary">Verify</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3 text-[13px]">
        <div className="text-gray-600">Showing {view.length} of {filtered.length}</div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
          <div className="px-2 py-1 border rounded-lg">{page} / {totalPages}</div>
          <button className="btn btn-ghost" disabled={page>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</button>
        </div>
      </div>
    </section>
  );
}


