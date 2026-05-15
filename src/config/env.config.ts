import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: process.env.NEON_PG_CONNECTION_STRING as string,
  PORT: process.env.PORT,
};

export default config;
