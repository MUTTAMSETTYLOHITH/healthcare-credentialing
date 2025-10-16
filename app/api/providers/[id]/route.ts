import { NextRequest, NextResponse } from "next/server";
import type { Provider } from "../route";

type Status = "Pending" | "Verified" | "Flagged";

declare global {
  // eslint-disable-next-line no-var
  var __providers: Provider[] | undefined;
}

function getStore(): Provider[] {
  if (!globalThis.__providers) {
    globalThis.__providers = [
      { id: 10243, name: "Dr. Chen Liu",  dept: "Anesthesiology", status: "Flagged" },
      { id: 10242, name: "Dr. Bob Johnson", dept: "Orthopedics",   status: "Pending" },
      { id: 10241, name: "Dr. Alice Smith", dept: "Cardiology",    status: "Verified" },
      { id: 10240, name: "Dr. Maya Patel",  dept: "Radiology",     status: "Pending" },
      { id: 10239, name: "Dr. Omar Aziz",   dept: "Neurology",     status: "Verified" },
    ];
  }
  return globalThis.__providers!;
}

// Next.js 15: context.params is a Promise — await it
export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const data = getStore();
  const rec = data.find(p => p.id === Number(id));
  if (!rec) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: rec });
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();
  const data = getStore();
  const rec = data.find(p => p.id === Number(id));
  if (!rec) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (typeof body.name === "string") rec.name = body.name;
  if (typeof body.dept === "string") rec.dept = body.dept;
  if (body.status === "Pending" || body.status === "Verified" || body.status === "Flagged") {
    rec.status = body.status as Status;
  }
  return NextResponse.json({ data: rec });
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const data = getStore();
  const idx = data.findIndex(p => p.id === Number(id));
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data.splice(idx, 1);
  return NextResponse.json({ ok: true });
}
