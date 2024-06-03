import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import ticker from "./routes/ticker.js";
import favorit from "./routes/favorit.js";
const app = express();
const port = process.env.PORT || 3000;
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", favorit);
app.use("/watch", ticker);
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port: ${port}`);
});
