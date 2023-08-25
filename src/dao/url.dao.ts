import { resolve } from 'path';
import { Database } from 'sqlite3';

export class UrlDao {
  CREATE_URL = `INSERT INTO url(short_code,redirect_url) VALUES(?,?)`;
  constructor(private DBConnection: Database) {}

  async getUrl(shortCode: string) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM url WHERE short_code = "${shortCode}"`;
      this.DBConnection.all(query, (err: any, rows: any) => {
        if (err) {
          reject(err);
        }
        if (rows && rows.length > 0) {
          resolve(rows[0]);
        }
        resolve(null);
      });
    });
  }

  async createUrl(options: { redirectUrl: string; shortCode: string }) {
    return new Promise((resolve, reject) => {
      const queryValues = [options.shortCode, options.redirectUrl];
      this.DBConnection.run(this.CREATE_URL, queryValues, (err: any) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(null);
      });
    });
  }
}
