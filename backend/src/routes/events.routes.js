import express from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";
import {
  getAllPublishedEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerToEvent,
  unregisterFromEvent,
  getMyRegistrations,
  getEventRegistrations,
  getAllEvents
} from "../controllers/events.controller.js";

const router = express.Router();

router.get("/", getAllPublishedEvents);
router.get("/:id", getEventById);

router.post("/", verifyToken, isAdmin, createEvent);
router.put("/:id", verifyToken, isAdmin, updateEvent);
router.delete("/:id", verifyToken, isAdmin, deleteEvent);

router.post("/:id/register", verifyToken, registerToEvent);
router.delete("/:id/register", verifyToken, unregisterFromEvent);

router.get("/me/registrations", verifyToken, getMyRegistrations);

router.get("/:id/registrations", verifyToken, isAdmin, getEventRegistrations);
router.get("/admin/all", verifyToken, isAdmin, getAllEvents);
export default router;
