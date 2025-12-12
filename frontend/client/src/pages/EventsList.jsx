import { useEffect, useState } from "react";
import { getPublishedEvents } from "../api/events";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import "./EventsList.css";
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
      


      {events.length === 0 ? (
        <p>Aucun événement disponible.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <div className="events-grid">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
          </div>
          
        </div>
      )}
    </div>
  );
}

export default EventsList;
