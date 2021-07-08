import axios from "axios";
import { URL } from "url";


export async function fetchFaviconFromWebsite(url: string): Promise<Buffer> {
  
  const faviconUrl = new URL("/favicon.ico", url).toString()
  
  const request = await axios.get(faviconUrl, { responseType: "arraybuffer" });

  return Buffer.from(request.data, "binary");
}
