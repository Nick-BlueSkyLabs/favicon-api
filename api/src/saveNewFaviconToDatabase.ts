import { client } from "./db";
import SQL from "sql-template-strings";
import { ImageDetails } from "./ImageDetails";
import { v4 as uuid } from "uuid";

export async function saveNewFaviconToDatabase(
  url: string,
  md5: string
): Promise<ImageDetails> {
  const imageId = uuid();
  const timestamp = Date.now();

  await (
    await client
  ).query(SQL`
  
    INSERT INTO favicons
    ("imageId", "url", "md5", "timestamp")
    VALUES
    (${imageId}, "${url}", "${md5}", "${timestamp}")

  `);

  return { imageId, url, md5, timestamp };
}
