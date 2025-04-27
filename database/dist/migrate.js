"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(__dirname, 'quran.db');
// Check if the database file exists
if (!fs_1.default.existsSync(dbPath)) {
    console.log('Error: Database does not exist. Exiting...');
    process.exit(1); // Exit the process with a non-zero status code to indicate failure
}
else {
    console.log('Database found. Proceeding with migration...');
}
// Initialize SQLite Database
const db = new better_sqlite3_1.default(dbPath, { verbose: console.log });
// Read quran.json file
const quranData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, 'quran.json'), 'utf-8'));
// Insert Surahs
const insertSurah = db.prepare(`
  INSERT INTO surahs (id, name, revelation_type, icon_name, icon_type) VALUES (?, ?, ?, ?, ?)
`);
// Insert Localizations
const insertSurahLocalizations = db.prepare(`
    INSERT INTO surah_localizations (surah_id, language, transliterated_name, translated_name, revelation_place) 
    VALUES (?, ?, ?, ?, ?)
  `);
// const insertAyah = db.prepare(`
//   INSERT INTO ayahs (id, surah_id, ayah_number, text) VALUES (?, ?, ?, ?)
// `);
// const insertWord = db.prepare(`
//   INSERT INTO words (id, ayah_id, word_number, word, meaning, root) VALUES (?, ?, ?, ?, ?, ?)
// `);
db.transaction(() => {
    // Insert Surahs
    quranData.forEach((surah) => {
        var revelation_type = surah.revelationType == "Meccan" ? 0 : 1;
        insertSurah.run(surah.number, surah.name, revelation_type, surah.iconName, surah.iconType);
        insertSurahLocalizations.run(surah.number, "en", surah.englishName, surah.englishNameTranslation, surah.revelationType);
        // Insert Ayahs for each Surah
        // surah.ayahs.forEach((ayah: any) => {
        //   insertAyah.run(ayah.id, surah.id, ayah.ayah_number, ayah.text);
        // //   // Insert Words for each Ayah
        // //   ayah.words.forEach((word: any, index: number) => {
        // //     insertWord.run(word.id, ayah.id, index + 1, word.word, word.meaning, word.root);
        // //   });
        // });
    });
})();
console.log('Migration complete!');
