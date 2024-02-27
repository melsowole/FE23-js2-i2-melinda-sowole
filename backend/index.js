import express from "express";
import cors from "cors";
import { get, post, patch, del } from "./modules/reqHandlers.js";

const app = express();
const port = 3000;

// MIDDLEWARE
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());

// REQS
app.get("/api/tasks", get);
app.get("/api/tasks/:id", get);

app.post("/api/tasks", post);

app.patch("/api/tasks", patch);
app.patch("/api/tasks/:id", patch);

app.delete("/api/tasks", del);
app.delete("/api/tasks/:id", del);

// AFTERWARE
// Error handler, called from req handlers
app.use((err, req, res, next) => {
  res
    .status(err.code)
    .json({ code: err.code, message: err.message, error: err.error });
  return;
});

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
