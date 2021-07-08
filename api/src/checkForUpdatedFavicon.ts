import { ImageDetails } from "./ImageDetails";
import { fetchFaviconFromWebsite } from "./fetchFaviconFromWebsite";
import { saveNewFavicon } from "./saveNewFavicon";

export async function checkForUpdatedFavicon(url: string, imageDetails: ImageDetails) {

  const TwentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000)

  if ((imageDetails?.timestamp || 0) < TwentyFourHoursAgo) {

    const image = await fetchFaviconFromWebsite(url);

    await saveNewFavicon(imageDetails, image, url);

  }

}
