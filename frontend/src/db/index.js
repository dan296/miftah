import SQLite from 'react-native-sqlite-storage';
import { SURAHS, VERSES } from '../constants';

// Enable debugging (optional)
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const getDBConnection = async () => {
  return SQLite.openDatabase({name: 'quran.db', location: 'default'});
};
// TO FIND LOCATION:
//Users/***/Library/Developer/CoreSimulator/Devices -> use CMD+SHIFT+G to enter directory
// Once in directory, run find . -type f -name "quran.db"

// Function to delete all tables
// Function to drop all tables in the SQLite database
const dropAllTables = async (db) => {
  try {
    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table';",
          [],
          (tx, result) => {
            // Retrieve table names
            const tableNames = result.rows.raw().map(row => row.name);

            // Filter out the sqlite_sequence table
            const tablesToDrop = tableNames.filter(name => name !== 'sqlite_sequence');

            // Generate DROP TABLE statements for each table
            const dropStatements = tablesToDrop.map(name => `DROP TABLE IF EXISTS ${name};`);

            // Execute each DROP TABLE statement
            const executeStatements = dropStatements.map(statement =>
              new Promise((resolveStmt, rejectStmt) => {
                tx.executeSql(
                  statement,
                  [],
                  () => {
                    console.log(`Dropped table: ${statement}`);
                    resolveStmt();
                  },
                  (tx, error) => {
                    console.error(`Error dropping table: ${statement}`, error);
                    rejectStmt(error);
                  }
                );
              })
            );

            // Wait for all DROP TABLE statements to complete
            Promise.all(executeStatements)
              .then(() => resolve())
              .catch(reject);
          },
          (tx, error) => {
            console.error('Error retrieving table names:', error);
            reject(error);
          }
        );
      });
    });
    console.log('All tables dropped successfully (excluding system tables)');
  } catch (error) {
    console.error('Error dropping tables:', error);
  }
};


const createTables = async (db) => {
  await db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS surahs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        english_name TEXT NOT NULL,
        english_name_translation TEXT NOT NULL,
        revelation_place TEXT NOT NULL
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ayahs (
        surah_id INTEGER,
        ayah_number INTEGER,
        text TEXT NOT NULL,
        english_text TEXT NOT NULL,
        juz INTEGER NOT NULL,
        manzil INTEGER NOT NULL,
        page INTEGER NOT NULL,
        ruku INTEGER NOT NULL,
        hizb_quarter INTEGER NOT NULL,
        sajda BOOLEAN NOT NULL,
        PRIMARY KEY (surah_id, ayah_number),
        FOREIGN KEY (surah_id) REFERENCES surahs (id)
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS words (
        ayah_surah_id INTEGER,
        ayah_number INTEGER,
        word_number INTEGER,
        text TEXT NOT NULL,
        translation TEXT NOT NULL,
        root TEXT,
        PRIMARY KEY (ayah_surah_id, ayah_number, word_number),
        FOREIGN KEY (ayah_surah_id, ayah_number) REFERENCES ayahs (surah_id, ayah_number)
      );`
    );
  });
};

const insertSurah = async (db, name, englishName, englishNameTranslation, relevationPlace) => {
  try {
    await db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO surahs (name, english_name, english_name_translation, revelation_place) VALUES (?, ?, ?, ?);',
        [name, englishName, englishNameTranslation, relevationPlace]
      );
    });
    console.log('Surah inserted successfully');
  } catch (error) {
    console.error('Error inserting Surah:', error);
  }
};

const insertAllSurahsAndAyahs= async (db) => {
  //var tmpSurahs = SURAHS.slice(112,114);
  for(const surah of SURAHS) {
    await insertSurah(db, surah.name, surah.englishName, surah.englishNameTranslation, surah.revelationType);
    for(const ayah of surah.ayahs) {
      await insertAyah(db, surah.number, ayah.numberInSurah, ayah.arab_text, ayah.text, ayah.juz, ayah.manzil, ayah.page, ayah.ruku, ayah.hizbQuarter, ayah.sajda);
    }
  }
};

const insertAllWords = async (db) => {
  var tmpVerses = VERSES.slice(1,7);
  for(const verse of tmpVerses) {
    for(const word of verse.words) {
      await insertWord(db, parseInt(verse.verse_key.split(":")[0]), verse.verse_number, word.position, word.text, word.translation.text, "");
    }
  }
}

const insertAyah = async (db, surahId, ayahNumber, text, englishText, juz, manzil, page, ruku, hizbQuarter, sajda) => {
  try {
    await db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO ayahs (surah_id, ayah_number, text, english_text, juz, manzil, page, ruku, hizb_quarter, sajda) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [surahId, ayahNumber, text, englishText, juz, manzil, page, ruku, hizbQuarter, sajda]
      );
    });
    console.log('Ayah inserted successfully');
  } catch (error) {
    console.error('Error inserting Ayah:', error);
  }
};

const insertWord = async (db, surahId, ayahNumber, wordNumber, text, translation, root) => {
  try {
    await db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO words (ayah_surah_id, ayah_number, word_number, text, translation, root) VALUES (?, ?, ?, ?, ?, ?);',
        [surahId, ayahNumber, wordNumber, text, translation, root]
      );
    });
    console.log('Word inserted successfully');
  } catch (error) {
    console.error('Error inserting Word:', error);
  }
};

const getSurahs = async (db) => {
  try {
    const [results] = await db.executeSql('SELECT * FROM surahs');
    console.log(results.rows.item(201));
    return results;
  } catch (error) {
    console.error('Error getting Surahs:', error);
    return [];
  }
};

class SurahRepository {
  constructor(db) {
      this.db = db;  // The database connection instance
  }

  // Fetch all surahs
  async getAllSurahs() {
      try {
          const [results] = await this.db.executeSql('SELECT * FROM surahs');
          const surahs = [];
          for (let i = 0; i < results.rows.length; i++) {
              surahs.push(results.rows.item(i));
          }
          return surahs;
      } catch (error) {
          console.error('Error fetching surahs:', error);
          return [];
      }
  }

  // Fetch a surah by its ID
  async getSurahById(surahId) {
      try {
          const [results] = await this.db.executeSql('SELECT * FROM surahs WHERE id = ?', [surahId]);
          if (results.rows.length > 0) {
              return results.rows.item(0);
          } else {
              return null;
          }
      } catch (error) {
          console.error(`Error fetching surah with ID ${surahId}:`, error);
          return null;
      }
  }

  // Insert a new surah
  async insertSurah(surah) {
      try {
          const { name, translation } = surah;
          await this.db.executeSql('INSERT INTO surahs (name, translation) VALUES (?, ?)', [name, translation]);
          console.log('Surah inserted successfully.');
      } catch (error) {
          console.error('Error inserting surah:', error);
      }
  }

  // Update an existing surah by ID
  async updateSurah(surahId, updatedSurah) {
      try {
          const { name, translation } = updatedSurah;
          await this.db.executeSql('UPDATE surahs SET name = ?, translation = ? WHERE id = ?', [name, translation, surahId]);
          console.log(`Surah with ID ${surahId} updated successfully.`);
      } catch (error) {
          console.error(`Error updating surah with ID ${surahId}:`, error);
      }
  }

  // Delete a surah by its ID
  async deleteSurah(surahId) {
      try {
          await this.db.executeSql('DELETE FROM surahs WHERE id = ?', [surahId]);
          console.log(`Surah with ID ${surahId} deleted successfully.`);
      } catch (error) {
          console.error(`Error deleting surah with ID ${surahId}:`, error);
      }
  }
}


// Example usage
export const initializeDatabase = async () => {
  const db = await getDBConnection();
  // Usage example
  //await dropAllTables(db)
  //.then(() => console.log('All tables deleted successfully'))
  //.catch(error => console.error('Error deleting tables:', error));
  //await createTables(db);
  //await insertAllSurahsAndAyahs(db);
  //await insertAllWords(db);
  //await getSurahs(db);
  // Insert example Words
  //await insertWord(db, 1, 1, 1, 'بِسْمِ');
  //await insertWord(db, 1, 1, 2, 'اللَّهِ');
};
