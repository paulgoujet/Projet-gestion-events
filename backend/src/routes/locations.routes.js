import express from "express";
import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation
} from "../controllers/locations.controller.js";

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getLocations);

router.post("/", verifyToken, isAdmin, createLocation);
router.put("/:id", verifyToken, isAdmin, updateLocation);
router.delete("/:id", verifyToken, isAdmin, deleteLocation);

export default router;
