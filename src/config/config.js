import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = join(dirname(__filename), "../../../");

const USERMONGODB = process.env.USERMONGODB
const PASSWORDMONGODB = process.env.PASSWORDMONGODB


export const config = {
  dirname: __dirname,
  PORT: 8080,
  db: {
    connectionString: `mongodb+srv://${USERMONGODB}:${PASSWORDMONGODB}@cluster0.noki4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  },
}

