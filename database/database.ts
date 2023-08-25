import { Database } from 'sqlite3';
import path from 'path';

export async function connectToDB(): Promise<Database> {
  const DBPath = path.resolve(__dirname, '../../db.sqlite');
  console.log(DBPath);
  return new Database(DBPath);
}
