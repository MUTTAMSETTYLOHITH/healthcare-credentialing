import { NextRequest, NextResponse } from "next/server";

type Status = "Pending" | "Verified" | "Flagged";
export type Provider = { id: number; name: string; dept: string; status: Status };

declare global {
  // persist in-memory across hot reloads on the server
  // eslint-disable-next-line no-var
  var __providers: Provider[] | undefined;
}

function seed(): Provider[] {
  return [
    { id: 10243, name: "Dr. Chen Liu",  dept: "Anesthesiology", status: "Flagged" },
    { id: 10242, name: "Dr. Bob Johnson", dept: "Orthopedics",   status: "Pending" },
    { id: 10241, name: "Dr. Alice Smith", dept: "Cardiology",    status: "Verified" },
    { id: 10240, name: "Dr. Maya Patel",  dept: "Radiology",     status: "Pending" },
    { id: 10239, name: "Dr. Omar Aziz",   dept: "Neurology",     status: "Verified" },
  ];
}

function getStore(): Provider[] {
  if (!globalThis.__providers) globalThis.__providers = seed();
  return globalThis.__providers;
}

export async function GET() {
  const data = getStore();
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = getStore();
  const nextId = Math.max(...data.map(d => d.id), 10000) + 1;
  const rec: Provider = {
    id: nextId,
    name: body.name ?? "New Provider",
    dept: body.dept ?? "General",
    status: (body.status as Status) ?? "Pending",
  };
  data.unshift(rec);
  return NextResponse.json({ data: rec }, { status: 201 });
}

/**
 * Bulk ops: { action: "verify" | "flag" | "delete", ids: number[] }
 */
export async function PUT(req: NextRequest) {
  const { action, ids } = await req.json() as { action: "verify" | "flag" | "delete"; ids: number[] };
  const data = getStore();

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "No ids provided" }, { status: 400 });
  }

  if (action === "delete") {
    const remaining = data.filter(p => !ids.includes(p.id));
    globalThis.__providers = remaining;
    return NextResponse.json({ ok: true, count: ids.length });
  }

  const status: Status = action === "verify" ? "Verified" : "Flagged";
  for (const p of data) {
    if (ids.includes(p.id)) p.status = status;
  }
  return NextResponse.json({ ok: true, count: ids.length });
}
