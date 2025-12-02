import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { registerToEvent, unregisterFromEvent, getMyRegistrations, getEventRegistrations } from "../controllers/registrations.controller.js";

const router = express.Router();

router.post("/:event_id/register", verifyToken, registerToEvent);

router.delete("/:event_id/register", verifyToken, unregisterFromEvent);


router.get("/me", verifyToken, getMyRegistrations);

router.get("/:event_id/registrations", verifyToken, getEventRegistrations);

export default router;
