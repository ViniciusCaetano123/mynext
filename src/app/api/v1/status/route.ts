import { NextResponse } from "next/server";
import { query } from "@/db/index";
// src/app/api/v1/status/route.ts
export async function GET(request: Request) {
  const updatedAt = new Date().toISOString();
  const versionResult = await query("SHOW server_version");
  const [versionRow] = versionResult.rows;

  const maxConnectionResult = await query(`SHOW max_connections;`);
  const [maxConnectionRow] = maxConnectionResult.rows;

  const openConnectionsResult = await query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1`,
    values: [process.env.POSTGRES_DB],
  });
  const [openConnectionsRow] = openConnectionsResult.rows;

  return NextResponse.json({
    status: "ok",
    updated_at: updatedAt,
    database: {
      version: versionRow.server_version,
      max_connection: maxConnectionRow.max_connections,
      open_connections: openConnectionsRow.count,
    },
  });
}

export function POST(request: Request) {
  console.log(request.method);
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
