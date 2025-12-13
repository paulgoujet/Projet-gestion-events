import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EventDetails.css";
import {
  getEventById,
  registerToEvent,
  unregisterFromEvent,
} from "../api/events";
import { useAuth } from "../context/AuthContext";

function EventDetails() {
  const { id } = useParams();
  const { user, token } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEventById(id);
        setEvent(data);

        if (user && data.registrations) {
          const already = data.registrations.some(
            (r) => r.user_id === user.id
          );
          setIsRegistered(already);
        }
      } catch (err) {
        setError("Impossible de récupérer cet événement.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id, user]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  async function handleRegister() {
    try {
      await registerToEvent(event.id, token);
      setIsRegistered(true);
      alert("Inscription réussie !");
    } catch {
      alert("Erreur lors de l'inscription");
    }
  }

  async function handleUnregister() {
    try {
      await unregisterFromEvent(event.id, token);
      setIsRegistered(false);
      alert("Vous êtes désinscrit !");
    } catch {
      alert("Erreur lors de la désinscription");
    }
  }

return (
  <div className="event-details-container">
    <div className="event-details-card">
      <h1>{event.title}</h1>

      <p>
        <strong>Description :</strong> {event.description}
      </p>

      <p>
        <strong>Date :</strong>{" "}
        {new Date(event.start_date).toLocaleString()} →{" "}
        {new Date(event.end_date).toLocaleString()}
      </p>

      <p>
        <strong>Catégorie :</strong> {event.category || "Aucune"}
      </p>

      <p>
        <strong>Lieu :</strong> {event.location || "Inconnu"}
      </p>

      {!user && (
        <p className="login-required">
          Vous devez être connecté pour vous inscrire.
        </p>
      )}

      {user && (
        <div className="event-details-actions">
          {!isRegistered ? (
            <button
              className="btn-register"
              onClick={handleRegister}
            >
              S’inscrire
            </button>
          ) : (
            <button
              className="btn-unregister"
              onClick={handleUnregister}
            >
              Se désinscrire
            </button>
          )}
        </div>
      )}
    </div>
  </div>
  );
}
export default EventDetails;