import { db } from "../config/db.js";

export const getCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories ORDER BY name ASC");
    return res.json(rows);
  } catch (error) {
    console.error("Erreur récupération catégories :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Le nom est obligatoire." });
    }

    await db.query("INSERT INTO categories (name) VALUES (?)", [name]);

    return res.status(201).json({ message: "Catégorie créée avec succès !" });
  } catch (error) {
    console.error("Erreur création catégorie :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryId = req.params.id;

    if (!name) {
      return res.status(400).json({ message: "Le nom est obligatoire." });
    }

    const [existing] = await db.query("SELECT * FROM categories WHERE id = ?", [
      categoryId,
    ]);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Catégorie introuvable." });
    }

    await db.query("UPDATE categories SET name = ? WHERE id = ?", [
      name,
      categoryId,
    ]);

    return res.json({ message: "Catégorie mise à jour." });
  } catch (error) {
    console.error("Erreur mise à jour catégorie :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    await db.query("DELETE FROM categories WHERE id = ?", [categoryId]);

    return res.json({ message: "Catégorie supprimée." });
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({
        message:
          "Impossible de supprimer la catégorie : elle est utilisée par des événements.",
      });
    }

    console.error("Erreur suppression catégorie :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
