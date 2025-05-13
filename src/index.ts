import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./ormconfig";
import productRoutes from "./routes/routes";

// Load .env file contents into process.env
dotenv.config();

const app = express();

// Use port from .env or default to 3000
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to handle URL-encoded bodies (optional)
app.use(express.urlencoded({ extended: true }));

// Prefix all product routes with /api
app.use("/api", productRoutes);

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.error("Database connection error:", error));
