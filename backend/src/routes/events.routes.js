import express from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import {
  getAllPublishedEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/events.controller.js";

const router = express.Router();

router.get("/", getAllPublishedEvents);
router.get("/:id", getEventById);

router.post("/", verifyToken, isAdmin, createEvent);
router.put("/:id", verifyToken, isAdmin, updateEvent);
router.delete("/:id", verifyToken, isAdmin, deleteEvent);

export default router;
