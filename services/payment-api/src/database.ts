import pg from "pg";

const { DATABASE_URL } = process.env;

const { Pool } = pg;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

export const pool = new Pool({
  connectionString: DATABASE_URL,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
  console.error("Database connection error:", err.message);
});
