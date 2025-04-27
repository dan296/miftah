import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Define the paths
const dbPath = resolve(__dirname, 'quran.db');
const schemaPath = resolve(__dirname, 'schema.sql');

// Create or open the database
const db = new Database(dbPath);

// Read the SQL schema
const schema = readFileSync(schemaPath, 'utf8');

// Run the schema in a transaction
db.exec('BEGIN TRANSACTION;');
db.exec(schema);
db.exec('COMMIT;');

console.log('✅ Migration completed successfully!');
