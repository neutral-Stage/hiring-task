import express from "express";
import path from "path";
import { router } from "./routes";
import cors from "cors";

const app = express();

// ... other middleware
// Middleware to parse JSON bodies
// app.use(express.json()); // Add this line

// API routes
app.use("/api", router);

// Serve static files from React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.use(
  cors({
    origin: "http://localhost:3000", // Vite's default port
    credentials: true,
  })
);

export default app;
