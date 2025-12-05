import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEventAdmin } from "../api/admin";
import { useAuth } from "../context/AuthContext";

function AdminCreateEvent() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    capacity: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createEventAdmin(formData, token);
      alert("Événement créé avec succès !");
      navigate("/admin/events");
    } catch (err) {
      alert("Erreur lors de la création !");
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Créer un événement</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "350px", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Titre"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <label>Date de début</label>
        <input
          type="datetime-local"
          value={formData.start_date}
          onChange={(e) =>
            setFormData({ ...formData, start_date: e.target.value })
          }
          required
        />

        <label>Date de fin</label>
        <input
          type="datetime-local"
          value={formData.end_date}
          onChange={(e) =>
            setFormData({ ...formData, end_date: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Capacité"
          value={formData.capacity}
          onChange={(e) =>
            setFormData({ ...formData, capacity: e.target.value })
          }
        />

        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default AdminCreateEvent;
