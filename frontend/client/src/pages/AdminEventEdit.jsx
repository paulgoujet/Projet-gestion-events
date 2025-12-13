import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../api/events";
import { updateEventAdmin } from "../api/admin";
import { useAuth } from "../context/AuthContext";
import "./AdminEventEdit.css";

function AdminEventEdit() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    capacity: "",
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEventById(id);

        setForm({
          title: data.title || "",
          description: data.description || "",
          start_date: data.start_date?.slice(0, 16) || "",
          end_date: data.end_date?.slice(0, 16) || "",
          capacity: data.capacity || "",
        });
      } catch (err) {
        console.error(err);
        setError("Impossible de charger l’événement.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await updateEventAdmin(id, form, token);
      alert("Événement mis à jour !");
      navigate("/admin/events");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour.");
    }
  }

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-edit-page">
      <div className="admin-edit-container">
        <h1>Modifier l’événement</h1>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Titre</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <label>Date début</label>
          <input
            type="datetime-local"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
          />

          <label>Date fin</label>
          <input
            type="datetime-local"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            required
          />

          <label>Capacité</label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            min="1"
          />

          <button className="admin-btn admin-btn-save" type="submit">
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEventEdit;


