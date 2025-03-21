import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS policy
const corsOption = {
  origin: ["http://localhost:5173"],
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
  credentials: true,
};

// Middleware for handling CORS
app.use(cors(corsOption));

app.use(express.json());
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
