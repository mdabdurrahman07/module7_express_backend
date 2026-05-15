import { Pool } from "pg";
import config from "../config/env.config";
// console.log(process.env.NEON_PG_CONNECTION_STRING)
// db pool Connection with neon
export const pool = new Pool({
  connectionString: config.connection_string,
});

//! db Connection
export const initDB = async () => {
  try {
    await pool.query(
      `
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(30) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()

            )
            `,
    );
    console.log("DB connected");
  } catch (error) {
    console.log("db connection error", error);
  }
};