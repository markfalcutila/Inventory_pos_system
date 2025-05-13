import { subscribe } from "diagnostics_channel";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [
        "src/entity/**/*.ts",
    ],
    migrations: ["src/migration/*.ts"],
    subscribers: [],    
    
});