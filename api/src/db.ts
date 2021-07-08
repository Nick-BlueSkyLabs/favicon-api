import { Pool, PoolClient } from "pg";


interface ENV {
  [x: string]: string;
}

const { DB_HOST } = process.env as ENV;

const config = {
  user: "api",
  host: DB_HOST || "localhost",
  database: "bank",
  port: 26257
};

export const client = (new Pool(config)).connect();
