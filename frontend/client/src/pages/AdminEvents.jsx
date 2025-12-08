import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { getAllEventsAdmin, deleteEventAdmin, updateEventStatus } from "../api/admin";

function AdminEvents() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    <Link to="/admin/events/create">
        <button style={{ marginBottom: "15px" }}>Créer un événement</button>
    </Link>

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllEventsAdmin(token);
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les événements Admin.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cet événement ?")) return;

    try {
      await deleteEventAdmin(id, token);
      setEvents(events.filter((e) => e.id !== id));
      alert("Événement supprimé !");
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Gestion des événements</h1>
        <Link to="/admin/events/create">
            <button
                style={{
                marginBottom: "20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
                borderRadius: "5px"
                }}
            >
                Créer un événement
            </button>
        </Link>
      {events.length === 0 ? (
        <p>Aucun événement trouvé.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {events.map((ev) => (
            <div
              key={ev.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            >
              <h2>{ev.title}</h2>
              <p>{ev.description}</p>

              <Link to={`/events/${ev.id}`}>
                <button style={{ marginRight: "8px" }}>Voir</button>
              </Link>

              <Link to={`/admin/events/${ev.id}/edit`}>
                <button style={{ marginRight: "8px" }}>Modifier</button>
              </Link>

              <button
                style={{ backgroundColor: "red", color: "#fff", border: "none", padding: "6px 10px", cursor: "pointer" }}
                onClick={() => handleDelete(ev.id)}
              >
                Supprimer
              </button>
              <button
                style={{
                    marginRight: "10px",
                    backgroundColor: ev.status === "PUBLISHED" ? "orange" : "blue",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                }}
                onClick={async () => {
                    const newStatus = ev.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

                    try {
                    await updateEventStatus(ev.id, newStatus, token);
                    setEvents(events.map((e) =>
                        e.id === ev.id ? { ...e, status: newStatus } : e
                    ));
                    alert("Statut modifié !");
                    } catch (err) {
                    alert("Erreur lors du changement de statut");
                    }
                }}
                >
                {ev.status === "PUBLISHED" ? "Dépublier" : "Publier"}
                </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminEvents;

