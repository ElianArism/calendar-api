import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/config";
import router from "./routes/router";

dotenv.config();

export const app = express();

// CORS
app.use(cors());

// Body Requests Parser
app.use(express.json());

// Routes
app.use(router);

// Public dir
app.use(express.static("public"));

// Database
connectDB();

// Server
app.listen(process.env.PORT, () => {
  console.log("Server running at port: ", process.env.PORT);
});
