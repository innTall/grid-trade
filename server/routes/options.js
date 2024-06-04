import express from "express";
import {
  getOptions,
  createOptions,
  updateOptions,
  deleteOptions,
} from "../controllers/optionsCont.js";
const router = express.Router();
//Create options
router.get("/", getOptions);
router.post("/", createOptions);
router.put("/", updateOptions);
router.delete("/all", deleteOptions);
export default router;
