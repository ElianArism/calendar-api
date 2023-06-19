import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/config";
import router from "./routes/router";

dotenv.config();

export const app = express();

// Body Requests Parser
app.use(express.json());

// Public dir
app.use(express.static("public"));

// Routes
app.use(router);

connectDB();

// Server
app.listen(process.env.PORT, () => {
  console.log("Server running at port: ", process.env.PORT);
});
