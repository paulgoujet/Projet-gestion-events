import { db } from "../config/db.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (existing.length > 0) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, 'USER')",
      [first_name, last_name, email, hashedPassword]
    );

    const newUserId = result[0].insertId;

    const [rows] = await db.query(
      "SELECT id, first_name, last_name, email, role FROM users WHERE id = ?",
      [newUserId]
    );
    const user = rows[0];

    const token = jwt.sign(
      { id: newUserId, role: "USER" },  
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Utilisateur créé avec succès !",
      user: {
        id: newUserId,
        first_name,
        last_name,
        email,
        role: "USER"
      },
      token
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};



export const login = async (req, res) => {
  try {
    console.log("Données reçues depuis Thunder Client :", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = users[0];
    console.log("Utilisateur trouvé en BDD :", user);


    if (!user) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect." });
    }


    console.log("Mot de passe reçu :", password);
    console.log("Hash en BDD :", user.password_hash);

    const validPassword = await bcrypt.compare(password, user.password_hash);

    console.log("Résultat compare :", validPassword);

    if (!validPassword) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect." });
    }


    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
      },
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
