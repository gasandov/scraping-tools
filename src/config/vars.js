import dotenv from "dotenv";

dotenv.config({});

export default {
  usvisa: {
    username: process.env.USVISA_USERNAME,
    password: process.env.USVISA_PASSWORD,
  },
};
