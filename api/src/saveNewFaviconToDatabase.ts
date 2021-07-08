import { client } from "./db";
import SQL from "sql-template-strings";
import { ImageDetails } from "./ImageDetails";


export async function saveNewFaviconToDatabase(
  url: string,
  md5: string
): Promise<{ imageId: string; } & Partial<ImageDetails>> {
  const { rows } = await (await client).query<any>(SQL``);

  return rows[0];
}
