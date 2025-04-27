"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const dbPath = (0, path_1.resolve)(__dirname, 'quran.db');
if ((0, fs_1.existsSync)(dbPath)) {
    (0, fs_1.unlinkSync)(dbPath);
    console.log('Database file deleted.');
}
else {
    console.log('No database file found.');
}
