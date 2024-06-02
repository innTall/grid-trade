import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectDB() {
  try {
    await mongoose.connect(process.env.LOCAL_URI);
    //.connect('mongodb://user:password@127.0.0.1:27017/test');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${process.env.LOCAL_URI}`);
  });
  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
connectDB();
export default connectDB;
