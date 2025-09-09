import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import nodeRoutes from "./routes/nodeRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//Middleware

//cors always above ratelimiter
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); //this middleware will parse JSON bodies
app.use(ratelimiter);

app.use("/api/notes", nodeRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
    // process.exit(1);
  });
});
