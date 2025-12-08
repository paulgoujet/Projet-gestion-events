import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM locations ORDER BY name ASC");
    res.json(rows);
  } catch (error) {
    console.error("Erreur lieux :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

export default router;
