import { db } from "../config/db.js";

export const getLocations = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM locations ORDER BY name ASC");
    return res.json(rows);
  } catch (error) {
    console.error("Erreur récupération lieux :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const createLocation = async (req, res) => {
  try {
    const { name, address, city } = req.body;

    if (!name || !address || !city) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    await db.query(
      "INSERT INTO locations (name, address, city) VALUES (?, ?, ?)",
      [name, address, city]
    );

    return res.status(201).json({ message: "Lieu créé avec succès !" });
  } catch (error) {
    console.error("Erreur création lieu :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { name, address, city } = req.body;
    const locationId = req.params.id;

    if (!name || !address || !city) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    const [existing] = await db.query("SELECT * FROM locations WHERE id = ?", [
      locationId
    ]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Lieu introuvable." });
    }

    await db.query(
      "UPDATE locations SET name = ?, address = ?, city = ? WHERE id = ?",
      [name, address, city, locationId]
    );

    return res.json({ message: "Lieu mis à jour." });
  } catch (error) {
    console.error("Erreur mise à jour lieu :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const locationId = req.params.id;

    await db.query("DELETE FROM locations WHERE id = ?", [locationId]);

    return res.json({ message: "Lieu supprimé." });
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({
        message:
          "Impossible de supprimer : ce lieu est utilisé par des événements."
      });
    }

    console.error("Erreur suppression lieu :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
