import { NextResponse } from "next/server";
import { db } from "../data";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json();
  const rec = db.update(id, body);
  return NextResponse.json({ data: rec });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  db.remove(id);
  return NextResponse.json({ ok: true });
}
