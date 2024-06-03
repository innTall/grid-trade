import express from "express";
import { getTicker } from "../controllers/tickerCont.js";
const router = express.Router();
router.get("/", getTicker);
export default router;
