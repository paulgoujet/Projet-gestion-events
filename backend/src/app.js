import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { verifyToken, isAdmin } from "./middlewares/auth.middleware.js";
import eventsRoutes from "./routes/events.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/events", eventsRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Backend is running"});
});


export default app;
