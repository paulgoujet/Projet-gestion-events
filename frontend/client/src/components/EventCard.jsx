import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  const image = event.image_url || "https://via.placeholder.com/600x400?text=Event";

  return (
    <Link to={`/events/${event.id}`} className="event-card-link">
      <div
        className="event-card"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="event-card-overlay" />
        <div className="event-card-content">
          <h3 className="event-card-title">{event.title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
