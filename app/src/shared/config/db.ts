// Database connection setup using Sequelize ORM
import { Sequelize } from "sequelize";
import { env } from "./env";

// Initialize Sequelize with environment variables
export const sequelize = new Sequelize(
    env.db.name,
    env.db.user,
    env.db.pass,
    {
        host: env.db.host,
        port: env.db.port,
        dialect: "postgres",
        logging: false, 
});


// Simple connection test 
export const testConnection = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connection established successfully.");
    } catch (error) {
    console.error("❌ Database connection failed:", error);
    }
};


