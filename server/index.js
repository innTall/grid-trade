import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import ticker from "./routes/ticker.js";
import options from "./routes/options.js";
const app = express();
const port = process.env.PORT || 3000;
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/watch", ticker);
app.use("/options", options);
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port: ${port}`);
});
