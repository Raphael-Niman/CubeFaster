import { query } from "@/lib/database";

export async function GET() {
  try {
    const rows = await query("SELECT 1 AS ok");
    return Response.json({ ok: true, rows });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "db_error" }, { status: 500 });
  }
}
