import { db } from "../config/db.js";

export const getAllPublishedEvents = async (req, res) => {
  try {
    const sql = `
      SELECT 
        e.id,
        e.title,
        e.description,
        e.start_date,
        e.end_date,
        e.capacity,
        e.status,
        c.name AS category,
        l.name AS location,
        e.image_url,
        l.city AS city
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN locations l ON e.location_id = l.id
      WHERE e.status = 'PUBLISHED'
      ORDER BY e.start_date ASC
    `;

    const [events] = await db.query(sql);

    return res.json(events);
  } catch (error) {
    console.error("Erreur récupération events :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};



export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    const sql = `
      SELECT 
        e.id,
        e.title,
        e.description,
        e.start_date,
        e.end_date,
        e.capacity,
        e.status,
        c.name AS category,
        l.name AS location,
        l.city AS city,
        u.first_name AS created_by_first_name,
        u.last_name AS created_by_last_name,
        e.image_url
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN locations l ON e.location_id = l.id
      LEFT JOIN users u ON e.created_by = u.id
      WHERE e.id = ?
    `;

    const [rows] = await db.query(sql, [eventId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Événement introuvable." });
    }

    return res.json(rows[0]);

  } catch (error) {
    console.error("Erreur get event by id :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};


export const createEvent = async (req, res) => {
  try {
    const { title, description, start_date, end_date, capacity, category_id, location_id, status, image_url } = req.body;

    if (!title || !start_date || !end_date) {
      return res.status(400).json({ message: "Titre, date de début et fin obligatoires." });
    }

    const created_by = req.user.id;

    const sql = `
      INSERT INTO events
      (title, description, start_date, end_date, capacity, category_id, location_id, status, image_url, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      image_url || null,
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

    const [existing] = await db.query("SELECT * FROM events WHERE id = ?", [eventId]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Événement introuvable." });
    }

    const fields = [];
    const values = [];

    if (title !== undefined) { fields.push("title = ?"); values.push(title); }
    if (description !== undefined) { fields.push("description = ?"); values.push(description); }
    if (start_date !== undefined) { fields.push("start_date = ?"); values.push(start_date); }
    if (end_date !== undefined) { fields.push("end_date = ?"); values.push(end_date); }
    if (capacity !== undefined) { fields.push("capacity = ?"); values.push(capacity); }
    if (category_id !== undefined) { fields.push("category_id = ?"); values.push(category_id); }
    if (location_id !== undefined) { fields.push("location_id = ?"); values.push(location_id); }
    if (status !== undefined) { fields.push("status = ?"); values.push(status); }

    if (fields.length === 0) {
      return res.status(400).json({ message: "Aucune donnée à mettre à jour." });
    }

    const sql = `
      UPDATE events
      SET ${fields.join(", ")}
      WHERE id = ?
    `;

    values.push(eventId);

    await db.query(sql, values);

    return res.json({ message: "Événement mis à jour avec succès." });

  } catch (error) {
    console.error("Erreur update event :", error);
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

export async function registerToEvent(req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const [existing] = await db.query(
      "SELECT * FROM registrations WHERE event_id = ? AND user_id = ?",
      [eventId, userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Déjà inscrit à cet événement" });
    }

    await db.query(
      "INSERT INTO registrations (event_id, user_id) VALUES (?, ?)",
      [eventId, userId]
    );
    res.json({ message: "Inscription réussie" });
  } catch (error) {
    console.error("Erreur inscription :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
}

export async function unregisterFromEvent(req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const [result] = await db.query(
      "DELETE FROM registrations WHERE event_id = ? AND user_id = ?",
      [eventId, userId]
    );

    console.log("DELETE result:", result); // 👈 ajoute ça

    res.json({ message: "Désinscription réussie" });
  } catch (error) {
    console.error("Erreur désinscription :", error);
    res.status(500).json({ message: "Erreur lors de la désinscription" });
  }
}

export async function getEventRegistrations(req, res) {
  try {
    const eventId = req.params.id;

    const [rows] = await db.query(
      `SELECT r.id, u.first_name, u.last_name, u.email
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      WHERE r.event_id = ?`,
      [eventId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Erreur récupération inscriptions :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des inscriptions" });
  }
}

export async function getMyRegistrations(req, res) {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT 
          r.id,
          e.id AS event_id,
          e.title,
          e.start_date,
          e.end_date
       FROM registrations r
       JOIN events e ON r.event_id = e.id
       WHERE r.user_id = ?`,
      [userId]
    );

    return res.json(rows);
  } catch (error) {
    console.error("Erreur récupération de mes inscriptions :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
}


export const getAllEvents = async (req, res) => {
  try {
    const sql = `
      SELECT 
        e.id,
        e.title,
        e.description,
        e.start_date,
        e.end_date,
        e.capacity,
        e.status,
        c.name AS category,
        l.name AS location
      FROM events e
      LEFT JOIN categories c ON e.category_id = c.id
      LEFT JOIN locations l ON e.location_id = l.id
      ORDER BY e.start_date ASC
    `;

    const [rows] = await db.query(sql);
    return res.json(rows);
  } catch (error) {
    console.error("Erreur récupération events admin :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
