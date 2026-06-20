import { NextResponse } from "next/server";

export async function POST() {
  if (!process.env.N8N_WEBHOOK_URL) {
    return NextResponse.json({ ok: false, status: "N8N_WEBHOOK_URL is not configured" }, { status: 400 });
  }

  const response = await fetch(process.env.N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "frugality_scanner_webhook_test",
      sent_at: new Date().toISOString(),
    }),
  });

  return NextResponse.json({ ok: response.ok, status: response.status });
}
