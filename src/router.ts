import { Router } from "express";
import { createGuitar, getGuitars } from "./handlers/guitars";
import { validateGuitar } from "./middleware/validateGuitar";

const router = Router();

router.get("/", getGuitars);
router.post("/", validateGuitar, createGuitar);

export default router;
