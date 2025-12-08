import { useEffect, useState } from "react";
import { getMyRegistrations } from "../api/events";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { unregisterFromEvent } from "../api/events";


function MyEvents() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  async function fetchInscr() {
    try {
      const data = await getMyRegistrations(token);

      setEvents(data);     
      setLoading(false);
    } catch (err) {
      setError("Impossible de récupérer vos inscriptions.");
      console.log(err);

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

          <button style={{ marginRight: "10px" }}>
            Voir l'événement
          </button>
        </Link>

        <button
          style={{ backgroundColor: "red", border: "none", padding: "6px 10px", cursor: "pointer", color: "#fff" }}
          onClick={async () => {
            try {
              await unregisterFromEvent(ev.event_id, token);
              setEvents(events.filter((e) => e.id !== ev.id)); 
              alert("Désinscription réussie !");
            } catch (error) {
              alert("Erreur lors de la désinscription");
            }
          }}
        >
          Se désinscrire
        </button>
      </div>
  ))}
</div>

      )}
    </div>
  );
}

export default MyEvents;
