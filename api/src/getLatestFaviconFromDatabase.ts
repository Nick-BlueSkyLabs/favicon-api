import { client } from "./db";
import SQL from "sql-template-strings";
import { ImageDetails } from "./ImageDetails";

export async function getLatestFaviconFromDatabase(url: string): Promise<ImageDetails> {
  const { rows } = await (await client).query<ImageDetails>(SQL`
  
    SELECT *
    FROM favicon.faviconss
    WHERE url = ${url}
    ORDER BY timestamp ASC
    LIMIT 1;

  `);

  // get the latest one
  const imageDetails = rows[0]

  return imageDetails;
}
