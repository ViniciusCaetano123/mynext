async function StatusPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/v1/status`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Falha ao buscar status"); // opcional
  const data = await res.json();

  return (
    <div>
      <h1>Status</h1>
      <p>Ultima atualização: {data.updated_at}</p>
      <p>Versão do PostgreSQL: {data.database.version}</p>
      <p>Conexões abertas: {data.database.open_connections}</p>
    </div>
  );
}

export default StatusPage;
