export default function HostDashboard() {
  const teams = JSON.parse(localStorage.getItem("teams")) || [];

  return (
    <div>
      <h1>Host Dashboard</h1>

      {teams.length === 0 ? (
        <p>No teams saved yet.</p>
      ) : (
        teams.map((t, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <strong>{t.username}</strong> — Score: {t.score}
          </div>
        ))
      )}
    </div>
  );
}