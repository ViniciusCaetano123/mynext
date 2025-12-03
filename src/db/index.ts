import { Client, QueryConfig } from "pg";

const configDb = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DB,
};
export async function query(sql: string | QueryConfig) {
  const client = new Client(configDb);
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
