import { ImageDetails } from "./ImageDetails";
import { fetchFaviconFromWebsite } from "./fetchFaviconFromWebsite";
import { saveNewFavicon } from "./saveNewFavicon";

export async function checkForUpdatedFavicon(url: string, imageDetails: ImageDetails) {
  if (imageDetails.timestamp > 0) {
    const image = await fetchFaviconFromWebsite(url);
    await saveNewFavicon(imageDetails, image, url);
  }
}
