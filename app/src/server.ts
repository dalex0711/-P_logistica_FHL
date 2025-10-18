// Main API entry point
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./shared/config/env";
import { initDatabase } from "./shared/db";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/health", (_req, res) => {
    res.json({ ok: true, env: env.nodeEnv });
});

// Initialize DB on startup
initDatabase().catch((err) => {
    console.error("❌ DB init failed:", err);
  process.exit(1); // Fail fast if the database is not reachable
});

app.listen(env.port, () => {
    console.log(`[FHL] API running on port ${env.port}`);
});
