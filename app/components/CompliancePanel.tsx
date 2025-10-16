"use client";

const alerts = [
  { id: "C-9811", text: "DEA license expiring in 12 days (Dr. Bob Johnson)", level: "Warn", ts: "Today 09:14" },
  { id: "C-9810", text: "OIG exclusion list re-check completed (All Florida providers)", level: "OK", ts: "Today 08:03" },
  { id: "C-9802", text: "Malpractice policy missing — needs upload (Dr. Chen Liu)", level: "Flag", ts: "Yesterday 17:22" },
];

export default function CompliancePanel(){
  const shade = (lvl:string) =>
    lvl==="OK" ? "bg-green-50 text-green-700 border border-green-200"
    : lvl==="Warn" ? "bg-amber-50 text-amber-800 border border-amber-200"
    : "bg-rose-50 text-rose-700 border border-rose-200";

  return (
    <section className="glass rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Compliance & Alerts</h3>
      <ul className="space-y-3">
        {alerts.map(a=>(
          <li key={a.id} className="flex items-start gap-3">
            <span className={`chip ${shade(a.level)}`}>{a.level}</span>
            <div className="flex-1">
              <div className="text-sm">{a.text}</div>
              <div className="text-xs text-gray-500 mt-1">{a.ts} • {a.id}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
