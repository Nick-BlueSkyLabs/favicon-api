import 'source-map-support/register';
import 'dotenv/config'
import { app } from "./app";
import { openDB } from "./db"

const port = 4444;

(async () => {
  try {
    await openDB();
    await app.listen(port, '0.0.0.0')
  } catch (error) {
    app.log.error(error);
  }
})()