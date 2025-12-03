import { useEffect, useState } from "react";
import { getPublishedEvents } from "../api/events";
import { Link } from "react-router-dom";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getPublishedEvents();
        setEvents(data);
      } catch (err) {
        setError("Impossible de récupérer les événements.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) return <p>Chargement des événements...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Événements disponibles</h1>

      {events.length === 0 ? (
        <p>Aucun événement disponible.</p>
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
              {/* TITRE CLIQUABLE */}
              <Link to={`/events/${ev.id}`} style={{ textDecoration: "none" }}>
                <h2 style={{ cursor: "pointer", color: "#0077ff" }}>
                  {ev.title}
                </h2>
              </Link>

              <p>{ev.description}</p>

              <p>
                <strong>Date :</strong>{" "}
                {new Date(ev.start_date).toLocaleString()} →{" "}
                {new Date(ev.end_date).toLocaleString()}
              </p>

              <p>
                <strong>Catégorie :</strong> {ev.category || "Aucune"}
              </p>
              <p>
                <strong>Lieu :</strong> {ev.location || "Inconnu"}
              </p>

              {/* BOUTON Voir détails */}
              <Link to={`/events/${ev.id}`}>
                <button style={{ marginTop: "10px" }}>Voir détails</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventsList;
