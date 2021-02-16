import mysql from "mysql2";

import { IEntities } from "../../entities/IEntities";
import { IDType } from "../../entities/types";
import { IRepositories } from "../../useCases/ports/IRepositories";
import { db } from "../../../../frameworks/mysql/mysql";

export class MySqlBaseRepository<T extends IEntities> {
  readonly tableName: string;

  /**
   * Returns the new entity's id.
   */
  _create(payload: object): Promise<T> {
    return new Promise((resolve, reject) => {
      let columns: string[] = [];
      let placeholders: string[] = [];
      let values = Object.values(payload);
      const now = new Date();

      function parseColumns() {
        Object.keys(payload).forEach(key => {
          columns.push(`\`${key}\``);
          placeholders.push("?");
        });
      }

      function addDefaultColumns() {
        columns = columns.concat(["\`createdAt\`", "\`updatedAt\`"]);
        placeholders = placeholders.concat(["?", "?"]);
        values = values.concat([now, now]);
      }

      parseColumns();
      addDefaultColumns();
      const query = `INSERT INTO \`${this.tableName}\` ( ${columns.join(",")} ) VALUES ( ${placeholders.join(",")} );`;
      db.connection.execute(query, values, (err: mysql.QueryError, result: mysql.ResultSetHeader, fields: mysql.FieldPacket[]) => {
          if (err) reject(err);
          resolve({
            ...payload,
            id: result.insertId as IDType,
            createdAt: now,
            updatedAt: now,
          } as unknown as T);
        }
      );
    });
  }

  findOne(payload: object): Promise<T|null> {
    return new Promise((resolve, reject) => {
      const columns: string[] = [];
      const values = Object.values(payload);

      function parseColumns() {
        Object.keys(payload).forEach(key => {
          columns.push(`\`${key}\` = ?`);
        });
      }

      parseColumns();
      const query = `SELECT * FROM \`${this.tableName}\` WHERE ${columns.join(" AND ")} LIMIT 1`;
      db.connection.execute(query, values, (err: mysql.QueryError, results: mysql.RowDataPacket[], fields: mysql.FieldPacket[]) => {
        if (err) reject(err);
        if (results.length > 0) {
          resolve(results[0] as T);
        } else {
          resolve(null);
        }
      });
    });
  }

  findById(id: IDType): Promise<T|null> {
    return this.findOne({ id, });
  }

  async isAvailable(query: object): Promise<boolean> {
    try {
      const doc = await this.findOne(query);
      if (doc) {
        // is not available, the document exists.
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  delete(query: object): Promise<number> {
    return new Promise((resolve, reject) => {
      const columns: string[] = [];
      const values = Object.values(query);

      function parseColumns() {
        Object.keys(query).forEach(key => {
          columns.push(`\`${key}\` = ?`);
        });
      }

      parseColumns();
      const sql = `DELETE FROM \`${this.tableName}\` WHERE ${columns.join(" AND ")} `;
      db.connection.execute(sql, values, (err: mysql.QueryError, results: mysql.ResultSetHeader, fields: mysql.FieldPacket[]) => {
        if (err) reject(err);
        resolve(results.affectedRows);
      });
    });
  }
}