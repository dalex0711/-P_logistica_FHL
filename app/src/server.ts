// Main API entry point
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./shared/config/env";
import { testConnection } from "./shared/config/db";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/health", (_req, res) => {
    res.json({ ok: true, env: env.nodeEnv });
});

// Test DB connection when app starts
testConnection();

app.listen(env.port, () => {
    console.log(`[FHL] API running on port ${env.port}`);
});
