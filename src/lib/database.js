import mysql from "mysql2/promise";

const globalForDb = globalThis;

export const pool =
  globalForDb.mysqlPool ??
  mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 5, // keep low for Hostinger + serverless
    ssl: {
      // Hostinger often needs TLS from remote clients; relax reject if their cert chain is awkward
      rejectUnauthorized: false,
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.mysqlPool = pool;
}

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
