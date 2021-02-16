import * as dotenv from "dotenv";
if (!process?.env?.NODE_ENV) {
  dotenv.config();
}

const dev = "development";

export default {
  env: process.env.APP_ENV || dev,
  server: {
    port: process.env.PORT || 3003,
    origins:
      process.env.ORIGINS || "http://localhost:3000,http://localhost:3001,http://localhost:3002",
  },
  params: {
    envs: {
      dev,
      pdn: "production",
      test: "testing",
    },
    defaultError: {
      code: 500,
      message: "SOMETHING_WENT_WRONG",
    },
    defaultLang: "en",
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET || "abcdef",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "30d",
  },
  mysql: {
    HOST: process.env.MYSQL_HOST || '127.0.0.1',
    PORT: process.env.MYSQL_PORT || 8889,
    USER: process.env.MYSQL_USER || 'root',
    PASSWORD: process.env.MYSQL_PASSWORD || 'root',
    DATABASE: process.env.MYSQL_DATABASE || 'db',
    DB_SOCKET_PATH: process.env.DB_SOCKET_PATH || '',
    CLOUD_SQL_CONNECTION_NAME: process.env.CLOUD_SQL_CONNECTION_NAME || '',
  },
};
