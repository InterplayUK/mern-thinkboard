import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import nodeRoutes from "./routes/nodeRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Middleware

//cors always above ratelimiter
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); //this middleware will parse JSON bodies
app.use(ratelimiter);

app.use("/api/notes", nodeRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
    // process.exit(1);
  });
});
