import fs from 'fs';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, 'quran.db');

// Check if the database file exists
if (!fs.existsSync(dbPath)) {
    console.log('Error: Database does not exist. Exiting...');
    process.exit(1); // Exit the process with a non-zero status code to indicate failure
} else {
    console.log('Database found. Proceeding with migration...');
}

// Initialize SQLite Database
const db = new Database(dbPath, { verbose: console.log });

// Read quran.json file
const quranData = JSON.parse(fs.readFileSync(path.join(__dirname, 'quran.json'), 'utf-8'));

// Insert Surahs
const insertSurah = db.prepare(`
  INSERT INTO surahs (id, name, revelation_type, icon_name, icon_type) VALUES (?, ?, ?, ?, ?)
`);

// Insert Localizations
const insertSurahLocalizations = db.prepare(`
    INSERT INTO surah_localizations (surah_id, language, transliterated_name, translated_name, revelation_place) 
    VALUES (?, ?, ?, ?, ?)
  `);

const insertAyah = db.prepare(`
  INSERT INTO ayahs (id, surah_id, ayah_number, text) VALUES (?, ?, ?, ?)
`);
// const insertWord = db.prepare(`
//   INSERT INTO words (id, ayah_id, word_number, word, meaning, root) VALUES (?, ?, ?, ?, ?, ?)
// `);

db.transaction(() => {
    // Insert Surahs
    quranData.forEach((surah: any) => {
        var revelation_type = surah.revelationType == "Meccan" ? 0 : 1;
        insertSurah.run(surah.number, surah.name, revelation_type, surah.iconName, surah.iconType);
        insertSurahLocalizations.run(surah.number, "en", surah.englishName, surah.englishNameTranslation, surah.revelationType);
        // Insert Ayahs for each Surah
//         juz INTEGER,
//   manzil INTEGER,
//   page INTEGER,
//   ruku INTEGER,
//   hizb INTEGER,
//   hizb_quarter INTEGER, -- 1=quarter, 2=half, 3=three-quarters, 4=full hizb
//   sajda BOOLEAN NOT NULL DEFAULT 0
        surah.ayahs.forEach((ayah: any) => {
          insertAyah.run(ayah.number, surah.id, ayah.numberInSurah, ayah.arab_text);

        //   // Insert Words for each Ayah
        //   ayah.words.forEach((word: any, index: number) => {
        //     insertWord.run(word.id, ayah.id, index + 1, word.word, word.meaning, word.root);
        //   });
        });
    });
})();

console.log('Migration complete!');