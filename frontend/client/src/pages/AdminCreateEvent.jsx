import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createEvent, getCategories, getLocations } from "../api/events";


function AdminCreateEvent() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    capacity: "",
    category_id: "",
    location_id: "",
    image_url: "",
    status: "PUBLISHED",
  });

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [cats, locs] = await Promise.all([
          getCategories(token),
          getLocations(token),
        ]);
        setCategories(cats);
        setLocations(locs);
      } catch (err) {
        setError("Impossible de charger les catégories/lieux");
      }
    }
    fetchData();
  }, [token]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await createEvent(form, token);
      navigate("/admin/events");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la création");
    }
  }

  return (
    <div>
      <h2>Créer un événement</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}
      >
        <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} required />

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <input type="datetime-local" name="start_date" value={form.start_date} onChange={handleChange} required />

        <input type="datetime-local" name="end_date" value={form.end_date} onChange={handleChange} required />

        <input type="number" name="capacity" placeholder="Capacité" value={form.capacity} onChange={handleChange} min="1"/>

        <input
          name="image_url"
          placeholder="Lien de l'image"
          value={form.image_url}
          onChange={handleChange}
        />

        <select name="category_id" value={form.category_id} onChange={handleChange}>
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select name="location_id" value={form.location_id} onChange={handleChange}>
          <option value="">Sélectionnez un lieu</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>{l.name} - {l.city}</option>
          ))}
        </select>

        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default AdminCreateEvent;
