import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
const app = express();
const port = process.env.PORT || 3000;
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port: ${port}`);
});
