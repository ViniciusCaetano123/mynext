import { Client, QueryConfig } from "pg";

export async function query(sql: string | QueryConfig) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    return await client.query(sql);
  } catch (error) {
    console.error("Erro ao executar query:", error);
    throw error;
  } finally {
    await client.end();
  }
}
