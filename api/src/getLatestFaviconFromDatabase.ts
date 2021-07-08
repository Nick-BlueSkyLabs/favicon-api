import { client } from "./db";
import SQL from "sql-template-strings";
import { ImageDetails } from "./ImageDetails";

export async function getLatestFaviconFromDatabase(
  url: string): Promise<ImageDetails> {
  const { rows } = await (await client).query<any>(SQL``);

  return rows[0];
}
