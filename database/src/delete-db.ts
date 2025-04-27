import { unlinkSync, existsSync } from 'fs';
import { resolve } from 'path';

const dbPath = resolve(__dirname, 'quran.db');

if (existsSync(dbPath)) {
  unlinkSync(dbPath);
  console.log('Database file deleted.');
} else {
  console.log('No database file found.');
}
