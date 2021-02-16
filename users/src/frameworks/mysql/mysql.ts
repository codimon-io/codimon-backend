import mysql from "mysql2";

import config from "../config";

class MySQL {
  public connection: mysql.Connection | null;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;

  constructor() {
    this.connection = null;
    this.host = config.mysql.HOST;
    this.port = config.mysql.PORT as number;
    this.user = config.mysql.USER;
    this.password = config.mysql.PASSWORD;
    this.database = config.mysql.DATABASE;
  }

  getOptions() {
    const options = {
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      database: this.database,
    };
    if (config.env === "production" || config.env === "staging") {
      return {
        ...options,
        socketPath: `${config.mysql.DB_SOCKET_PATH}/${config.mysql.CLOUD_SQL_CONNECTION_NAME}`,
      };
    } else {
      return options;
    }
  }

  async connect() {
    try {
      const options = this.getOptions();
      this.connection = await mysql.createConnection(options);
    } catch (error) {
      throw error;
    }
  }
}

export const db = new MySQL();