import Fastify from "fastify";

import { getLatestFaviconFromDatabase } from "./getLatestFaviconFromDatabase";
import { checkForUpdatedFavicon } from "./checkForUpdatedFavicon";
import { saveNewFavicon } from "./saveNewFavicon";
import { getLatestFaviconFromStorage } from "./getLatestFaviconFromStorage";
import { fetchFaviconFromWebsite } from "./fetchFaviconFromWebsite";

export const app = Fastify({ logger: true });

interface Query {
  url: string;
}

app.get("/", async (req, res) => {
  const { url } = req.query as Query;

  const imageDetails = await getLatestFaviconFromDatabase(url);

  // don't await this
  checkForUpdatedFavicon(url, imageDetails);

  if (imageDetails) {
    const favicon = await getLatestFaviconFromStorage(imageDetails.imageId);

    return favicon;
  }

  const favicon = await fetchFaviconFromWebsite(url);

  // don't await this either
  saveNewFavicon(imageDetails, favicon, url);

  return favicon;
});


