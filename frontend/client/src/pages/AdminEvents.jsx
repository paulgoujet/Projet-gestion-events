import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  getAllEventsAdmin,
  deleteEventAdmin,
  updateEventStatus,
} from "../api/admin";
import "./AdminEvents.css";

function AdminEvents() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    } catch {
      alert("Erreur lors de la suppression");
    }
  }

  async function handleToggleStatus(ev) {
    const newStatus = ev.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    try {
      await updateEventStatus(ev.id, newStatus, token);
      setEvents(
        events.map((e) =>
          e.id === ev.id ? { ...e, status: newStatus } : e
        )
      );
      alert("Statut modifié !");
    } catch {
      alert("Erreur lors du changement de statut");
    }
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-events-container">
      <h1>Gestion des événements</h1>

      <Link to="/admin/events/create">
        <button className="admin-create-btn">Créer un événement</button>
      </Link>

      <div className="admin-events-list">
        {events.map((ev) => (
          <div key={ev.id} className="admin-event-card">
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
            <p>
              <strong>Statut :</strong> {ev.status}
            </p>

            <div className="admin-event-actions">
              <Link to={`/events/${ev.id}`}>
                <button className="admin-btn admin-btn-view">Voir</button>
              </Link>

              <Link to={`/admin/events/${ev.id}/edit`}>
                <button className="admin-btn admin-btn-edit">Modifier</button>
              </Link>

              <button
                className="admin-btn admin-btn-delete"
                onClick={() => handleDelete(ev.id)}
              >
                Supprimer
              </button>

              <button
                className={`admin-btn ${
                  ev.status === "PUBLISHED"
                    ? "admin-btn-status"
                    : "admin-btn-publish"
                }`}
                onClick={() => handleToggleStatus(ev)}
              >
                {ev.status === "PUBLISHED" ? "Dépublier" : "Publier"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminEvents;