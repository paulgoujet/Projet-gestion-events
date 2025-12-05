import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../api/events";
import { updateEventAdmin } from "../api/admin";
import { useAuth } from "../context/AuthContext";

function AdminEventEdit() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    capacity: "",
  });

  useEffect(() => {
    async function fetchEvent() {
      const data = await getEventById(id);
      setEvent(data);
      setForm({
        title: data.title,
        description: data.description,
        start_date: data.start_date.slice(0, 16),
        end_date: data.end_date.slice(0, 16),
        capacity: data.capacity || "",
      });
      setLoading(false);
    }
    fetchEvent();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateEventAdmin(id, form, token);
      alert("Événement mis à jour !");
      navigate("/admin/events");
    } catch (error) {
      alert("Erreur mise à jour");
    }
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Modifier l’événement</h1>

      <form onSubmit={handleSubmit}>
        <label>Titre :</label>
        <input name="title" value={form.title} onChange={handleChange} required />

        <label>Description :</label>
        <textarea name="description" value={form.description} onChange={handleChange} />

        <label>Date début :</label>
        <input type="datetime-local" name="start_date" value={form.start_date} onChange={handleChange} required />

        <label>Date fin :</label>
        <input type="datetime-local" name="end_date" value={form.end_date} onChange={handleChange} required />

        <label>Capacité :</label>
        <input type="number" name="capacity" value={form.capacity} onChange={handleChange} />

        <button style={{ marginTop: "12px" }} type="submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default AdminEventEdit;
