import { NextResponse } from "next/server";
import { db } from "./data";

export async function GET() {
  return NextResponse.json({ data: db.list() });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.name || !body?.dept || !body?.status) {
    return NextResponse.json({ error: "name, dept, status required" }, { status: 400 });
  }
  const rec = db.add({ name: body.name, dept: body.dept, status: body.status });
  return NextResponse.json({ data: rec });
}

// Bulk operations: { action: "verify"|"delete"|"flag", ids: number[] }
export async function PUT(req: Request) {
  const body = await req.json();
  if (!Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json({ error: "ids required" }, { status: 400 });
  }
  if (body.action === "delete") db.bulkRemove(body.ids);
  else if (body.action === "verify") db.bulkUpdate(body.ids, { status: "Verified" });
  else if (body.action === "flag") db.bulkUpdate(body.ids, { status: "Flagged" });
  else return NextResponse.json({ error: "invalid action" }, { status: 400 });

  return NextResponse.json({ data: db.list() });
}
