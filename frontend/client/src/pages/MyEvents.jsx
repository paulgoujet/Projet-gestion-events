import { useEffect, useState } from "react";
import { getMyRegistrations, unregisterFromEvent } from "../api/events";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./MyEvents.css";

function MyEvents() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    async function fetchInscr() {
      try {
        const data = await getMyRegistrations(token);
        setEvents(data);
      } catch (err) {
        setError("Impossible de récupérer vos inscriptions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchInscr();
  }, [token]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="my-events-container">
      <h1>Mes inscriptions</h1>

      {events.length === 0 ? (
        <p>Vous n’êtes inscrit à aucun événement.</p>
      ) : (
        <div className="my-events-list">
          {events.map((ev) => (
            <div key={ev.id} className="my-event-card">
              <h2>{ev.title}</h2>

              {ev.description && <p>{ev.description}</p>}

              <p>
                <strong>Date :</strong>{" "}
                {new Date(ev.start_date).toLocaleString()} →{" "}
                {new Date(ev.end_date).toLocaleString()}
              </p>

              <div className="my-events-actions">
                <Link to={`/events/${ev.event_id}`}>
                  <button className="btn-view-event">
                    Voir l'événement
                  </button>
                </Link>

                <button
                  className="btn-unregister"
                  onClick={async () => {
                    try {
                      await unregisterFromEvent(ev.event_id, token);
                      setEvents(events.filter((e) => e.id !== ev.id));
                      alert("Désinscription réussie !");
                    } catch {
                      alert("Erreur lors de la désinscription");
                    }
                  }}
                >
                  Se désinscrire
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEvents;
