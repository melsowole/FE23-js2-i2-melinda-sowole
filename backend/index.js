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
app.get("/api", get);
app.get("/api/:id", get);

app.post("/api", post);

app.patch("/api/:id", patch);

app.delete("/api/:id", del);

// AFTERWARE
// Error handler, called from req handlers
app.use((err, req, res, next) => {
  res
    .status(err.code)
    .json({ code: err.code, message: err.message, error: err.error });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
