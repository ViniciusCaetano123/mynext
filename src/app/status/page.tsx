async function StatusPage() {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/v1/status`,
    {
      cache: "no-store",
    }
  );
  console.log(res);
  if (!res.ok) throw new Error("Falha ao buscar status"); // opcional
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <h1>Status</h1>
      <p>Ultima atualização: {data.updated_at}</p>
      <p>Versão do PostgreSQL: {data.database.version}</p>
      <p>Conexões abertas: {data.database.open_connections}</p>
      <p>Conexões disponíveis: {data.database.max_connection}</p>
    </div>
  );
}

export default StatusPage;
