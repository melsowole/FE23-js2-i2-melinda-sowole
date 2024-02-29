import express from "express";
import cors from "cors";
import { router } from "./modules/routes.js";

const app = express();

// MIDDLEWARE
app.use(express.json(), cors());

// Routes
app.use("/api/tasks", router);

// AFTERWARE
// Error handler, called from req handlers
app.use((err, req, res, next) => {
  res
    .status(err.code)
    .json({ code: err.code, message: err.message, error: err.error });
  return;
});

export { app };
