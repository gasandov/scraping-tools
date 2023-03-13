import { resolve } from "path";
import { parse } from "dotenv";
import { readFileSync } from "fs";

const env = parse(readFileSync(resolve(process.cwd(), "src/usvisa/.env")));

export default {
  username: env.USVISA_USERNAME,
  password: env.USVISA_PASSWORD,
  scheduleId: env.USVISA_SCHEDULE_ID,
  allowedCities: env.USVISA_ALLOWED_CITIES,
  allowedTimeSlots: env.USVISA_ALLOWED_TIME_SLOTS,
  allowedDateSlots: env.USVISA_ALLOWED_DATE_SLOTS,
};
