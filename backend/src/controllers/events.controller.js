import { db } from "../config/db.js";

export const getAllPublishedEvents = async (req, res) => {
  try {
    const [events] = await db.query(
      "SELECT * FROM events WHERE status = 'PUBLISHED' ORDER BY start_date ASC"
    );

    return res.json(events);
  } catch (error) {
    console.error("getAllPublishedEvents error:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};


export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    const [rows] = await db.query(
      "SELECT * FROM events WHERE id = ? AND status = 'PUBLISHED'",
      [eventId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Événement non trouvé." });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error("getEventById error:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, start_date, end_date, capacity, category_id, location_id, status } = req.body;

    // Validation rapide
    if (!title || !start_date || !end_date) {
      return res.status(400).json({ message: "Titre, date de début et fin obligatoires." });
    }

    // created_by = id de l'admin extrait du token JWT
    const created_by = req.user.id;

    const sql = `
      INSERT INTO events
      (title, description, start_date, end_date, capacity, category_id, location_id, status, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      title,
      description || null,
      start_date,
      end_date,
      capacity || null,
      category_id || null,
      location_id || null,
      status || "DRAFT",
      created_by
    ]);

    return res.status(201).json({ message: "Événement créé avec succès !" });

  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const {
      title,
      description,
      start_date,
      end_date,
      capacity,
      category_id,
      location_id,
      status
    } = req.body;

    await db.query(
      `UPDATE events
       SET title=?, description=?, start_date=?, end_date=?, capacity=?, category_id=?, location_id=?, status=?
       WHERE id=?`,
      [
        title,
        description,
        start_date,
        end_date,
        capacity,
        category_id,
        location_id,
        status,
        eventId,
      ]
    );

    return res.json({ message: "Événement mis à jour avec succès !" });
  } catch (error) {
    console.error("updateEvent error:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    await db.query("DELETE FROM events WHERE id = ?", [eventId]);

    return res.json({ message: "Événement supprimé avec succès !" });
  } catch (error) {
    console.error("deleteEvent error:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
