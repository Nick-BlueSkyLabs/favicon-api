import { createConnection, Connection } from "typeorm";

export let db: Connection;

export const openDB = async () => {
  db = await createConnection({
    type: "cockroachdb",
    host: "localhost",
    port: 26257,
    username: "api",
    // password: "test",
    database: "bank"
  });
  return db
}