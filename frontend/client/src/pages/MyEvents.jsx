import { useEffect, useState } from "react";
import { getMyRegistrations } from "../api/events";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function MyEvents() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInscr() {
      try {
        const data = await getMyRegistrations(token);
        setEvents(data); // ✅ CORRECTION ICI
      } catch (err) {
        setError("Impossible de récupérer vos inscriptions.");
        console.log("Erreur récupération :", err);
      } finally {
        setLoading(false); // ✅ TRÈS IMPORTANT !!
      }
    }

    fetchInscr();
  }, [token]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Mes inscriptions</h1>

      {events.length === 0 ? (
        <p>Vous n’êtes inscrit à aucun événement.</p>
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
              <p>
                <strong>Date :</strong>{" "}
                {new Date(ev.start_date).toLocaleString()} →{" "}
                {new Date(ev.end_date).toLocaleString()}
              </p>

              <Link to={`/events/${ev.event_id}`}>
                <button style={{ marginTop: "10px" }}>
                  Voir l'événement
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEvents;
