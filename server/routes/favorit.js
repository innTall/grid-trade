import express from "express";
import {
  createFavorit,
  getFavorit,
  updateFavorit,
  deleteItem,
  deleteAll
} from "../controllers/favoritCont.js";
const router = express.Router();
//Create Favorit
router.get("/", getFavorit);
router.post("/", createFavorit);
router.put("/:id", updateFavorit);
router.delete("/:id", deleteItem);
router.delete("/", deleteAll);
export default router;
