import Fastify from "fastify";
import { client } from "./db"
import SQL from 'sql-template-strings'

export const app = Fastify({ logger: true });

interface Account {
  id: string;
  balance: string
}

app.get("/", async (req, res) => {

  const { rows } = await (await client).query<Account[]>(SQL`SELECT * FROM accounts`)
  
  return { rows }

});

interface Body {
  [x: string]: string;
}

app.post("/", async (req, res) => {

  const { balance } = req.body as Body

  await (await client).query(SQL`INSERT INTO accounts (balance) VALUES (${balance})`)
  
  return { done: "success" }
  
});
