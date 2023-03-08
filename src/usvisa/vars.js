import { resolve } from "path";
import { parse } from "dotenv";
import { readFileSync } from "fs";

const env = parse(readFileSync(resolve(process.cwd(), "src/usvisa/.env")));

export default {
  username: env.USVISA_USERNAME,
  password: env.USVISA_PASSWORD,
  scheduleId: env.USVISA_SCHEDULE_ID,
};
