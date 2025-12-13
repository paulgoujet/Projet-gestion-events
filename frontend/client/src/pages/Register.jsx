import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await registerUser(form);
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  }

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h2>Créer un compte</h2>

        {error && <p className="register-error">{error}</p>}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="Prénom"
            value={form.first_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder="Nom"
            value={form.last_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default Register;

