import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant ou invalide." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next(); 

  } catch (error) {
    console.error("verifyToken error:", error);
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};


export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs." });
  }
  next();
};
