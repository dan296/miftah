"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = require("fs");
const path_1 = require("path");
// Define the paths
const dbPath = (0, path_1.resolve)(__dirname, 'quran.db');
const schemaPath = (0, path_1.resolve)(__dirname, 'schema.sql');
// Create or open the database
const db = new better_sqlite3_1.default(dbPath);
// Read the SQL schema
const schema = (0, fs_1.readFileSync)(schemaPath, 'utf8');
// Run the schema in a transaction
db.exec('BEGIN TRANSACTION;');
db.exec(schema);
db.exec('COMMIT;');
console.log('✅ Migration completed successfully!');
