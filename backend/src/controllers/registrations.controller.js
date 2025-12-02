import { db } from "../config/db.js";


export const registerToEvent = async (req, res) => {
  try {
    const user_id = req.user.id;
    const event_id = req.params.event_id;

    const [events] = await db.query(
      "SELECT * FROM events WHERE id = ? AND status = 'PUBLISHED'",
      [event_id]
    );

    if (events.length === 0) {
      return res.status(404).json({ message: "Événement introuvable ou non publié." });
    }

    const event = events[0];

    const [exists] = await db.query(
      "SELECT * FROM registrations WHERE user_id = ? AND event_id = ?",
      [user_id, event_id]
    );

    if (exists.length > 0) {
      return res.status(400).json({ message: "Vous êtes déjà inscrit à cet événement." });
    }

    if (event.capacity !== null) {
      const [count] = await db.query(
        "SELECT COUNT(*) AS total FROM registrations WHERE event_id = ?",
        [event_id]
      );

      if (count[0].total >= event.capacity) {
        return res.status(400).json({ message: "Aucune place disponible." });
      }
    }

    
    await db.query(
      "INSERT INTO registrations (user_id, event_id) VALUES (?, ?)",
      [user_id, event_id]
    );

    return res.json({ message: "Inscription réussie !" });

  } catch (err) {
    console.error("Erreur inscription :", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const unregisterFromEvent = async (req, res) => {
  try {
    const user_id = req.user.id;
    const event_id = req.params.event_id;

    const [result] = await db.query(
      "DELETE FROM registrations WHERE user_id = ? AND event_id = ?",
      [user_id, event_id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Vous n'étiez pas inscrit à cet événement." });
    }

    return res.json({ message: "Désinscription réussie." });

  } catch (err) {
    console.error("Erreur désinscription :", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const getMyRegistrations = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [rows] = await db.query(
      `
      SELECT r.id, r.created_at, e.title, e.start_date, e.end_date
      FROM registrations r
      JOIN events e ON e.id = r.event_id
      WHERE r.user_id = ?
      `,
      [user_id]
    );

    return res.json(rows);

  } catch (err) {
    console.error("Erreur liste inscriptions :", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const getEventRegistrations = async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Accès interdit." });
    }

    const event_id = req.params.event_id;

    const [rows] = await db.query(
      `
      SELECT u.first_name, u.last_name, u.email, r.created_at
      FROM registrations r
      JOIN users u ON u.id = r.user_id
      WHERE r.event_id = ?
      `,
      [event_id]
    );

    return res.json(rows);

  } catch (err) {
    console.error("Erreur liste inscrits :", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
