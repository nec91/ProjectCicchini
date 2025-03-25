import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = join(dirname(__filename), "../../");

dotenv.config();

const USERMONGODB = process.env.USERMONGODB
const PASSWORDMONGODB = process.env.PASSWORDMONGODB
const SERVER_PORT = process.env.SERVER_PORT

export const config = {
  PORT: SERVER_PORT,
  db: {
    connectionString: `mongodb+srv://${USERMONGODB}:${PASSWORDMONGODB}@cluster0.noki4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  },
}
