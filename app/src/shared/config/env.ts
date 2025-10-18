// Centralized environment loader (strict)
import dotenv from "dotenv";
dotenv.config();

// Validate required PostgreSQL variables
const required = ["POSTGRES_USER", "POSTGRES_PASSWORD", "POSTGRES_DB", "POSTGRES_PORT"];
required.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Environment variable ${key} is required but not defined`);
    }
});

export const env = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 3000,

  // Database configuration (mapped to docker-compose Postgres service)
    db: {
        host: process.env.DB_HOST || "db", // Default to docker service name
        port: Number(process.env.POSTGRES_PORT),
        name: process.env.POSTGRES_DB!,
        user: process.env.POSTGRES_USER!,
        pass: process.env.POSTGRES_PASSWORD!,
    },

  // JWT keys (for auth modules)
    jwt: {
        privateKey: process.env.PRIVATE_KEY || "default_private_key",
        publicKey: process.env.PUBLIC_KEY || "default_public_key",
    },
};
