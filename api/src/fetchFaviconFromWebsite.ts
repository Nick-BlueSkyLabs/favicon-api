import axios from "axios";


export async function fetchFaviconFromWebsite(url: string): Promise<Buffer> {
  const request = await axios.get(url, { responseType: "arraybuffer" });

  return Buffer.from(request.data, "binary");
}
