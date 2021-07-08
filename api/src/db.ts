import { createConnection, Connection, ConnectionOptions } from "typeorm";

export let db: Connection;

interface ENV {
  [x: string]: string;
}

export const openDB = async () => {
  const { DB_HOST } = process.env as ENV
  db = await createConnection({
    type: "cockroachdb",
    host: DB_HOST || "localhost",
    port: 26257,
    username: "api",
    // password: "test",
    database: "bank"
  });
  return db
}