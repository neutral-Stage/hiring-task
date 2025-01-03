import express from "express";
import cors from "cors";
import { dbCreate, AppDataSouce } from "./db";
import { router } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";

const setupServer = async () => {
  try {
    await dbCreate();

    await AppDataSouce.initialize();
    console.log("Database connected successfully");

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(routeMiddleware);

    app.use("/health", (_req, res) => {
      res.json({ msg: "Hello Get Zell" });
    });

    app.use("/api", router);
    app.use(errorHandlerMiddleware);

    const { port } = Env;

    // Add error handling for server start
    const server = app.listen(port, () => {
      console.log(`Server is listening on ${port}.`);
    });

    server.on("error", (e: NodeJS.ErrnoException) => {
      if (e.code === "EADDRINUSE") {
        console.log(`Port ${port} is already in use`);
        process.exit(1);
      } else {
        console.error("Server error:", e);
      }
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

setupServer();
