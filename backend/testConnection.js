import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

// Create a pool connection
const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  ssl: false, // set to true if using deployed DB like Neon
});

// Test connection function
const testConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()"); // simple query to test DB
    console.log("✅ Connected to PostgreSQL successfully at:", result.rows[0].now);
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
  } finally {
    await pool.end(); // close the connection
  }
};

// Run the test
testConnection();
