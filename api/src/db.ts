import { Pool, PoolClient } from "pg";
import { DB_HOST } from "./ENV";

const config = {
  user: "root",
  host: DB_HOST || "localhost",
  database: "favicon",
  port: 26257
};

export const client = (new Pool(config)).connect();
