-- ========================
-- Quran Tables
-- ========================

CREATE TABLE chapters (
  id INTEGER PRIMARY KEY AUTOINCREMENT, -- chapter number (1–114)
  name TEXT NOT NULL, -- Arabic name
  revelation_type INTEGER NOT NULL, -- 0=Meccan, 1=Medinan
  revelation_order INTEGER NOT NULL, -- Order of revelation
  icon_name TEXT NOT NULL, -- e.g., "Door"
  icon_type TEXT NOT NULL -- e.g., "MaterialCommunityIcons"
);

CREATE TABLE verses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  chapter_id INTEGER NOT NULL REFERENCES chapters(id),
  verse_number INTEGER NOT NULL, -- Position inside chapter
  text TEXT NOT NULL, -- Arabic text of the verse
  juz INTEGER,
  manzil INTEGER,
  ruku INTEGER,
  hizb INTEGER,
  hizb_quarter INTEGER, -- 1=quarter, 2=half, 3=three-quarters, 4=full hizb
  sajda BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  verse_id INTEGER NOT NULL REFERENCES verses(id),
  word_number INTEGER NOT NULL, -- Position in the verse
  text TEXT NOT NULL,
  page INTEGER NOT NULL, -- Page number in Madani Mushaf,
  root_id INTEGER NOT NULL REFERENCES roots(id), -- optional, if this is a root word
);

CREATE TABLE roots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trilateral TEXT NOT NULL, -- e.g., "ف ع ل", "ك ت ب"
);

CREATE TABLE localizations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id INTEGER NOT NULL,
  parent_type INTEGER NOT NULL, -- 0=chapter, 1=verse, 2=word
  language TEXT NOT NULL, -- 'en', 'ar', 'ur', 'es'
  translation TEXT NOT NULL,
  transliteration TEXT NOT NULL, -- e.g., "Bismillah hir-Rahman ir-Rahim"
  revelation_place TEXT NOT NULL -- e.g., "Meccan", localized
);

CREATE TABLE scripts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_type INTEGER NOT NULL, -- 1=verse, 2=word
  parent_id INTEGER NOT NULL, -- ID of the parent (verse, or word)
  name TEXT NOT NULL, -- e.g., "Uthmani", "Indo-Pak"
  text TEXT NOT NULL, -- Script text
);

-- ========================
-- User Tables
-- ========================

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE memorization_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  verse_id INTEGER NOT NULL REFERENCES verses(id),
  status TEXT NOT NULL, -- 'learning', 'reviewing', 'mastered'
  ease INTEGER DEFAULT 0, -- for spaced repetition
  next_review_date DATETIME
);

CREATE TABLE user_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  preferred_language TEXT DEFAULT 'en',
  loop_count INTEGER DEFAULT 3, -- audio loops
  audio_speed REAL DEFAULT 1.0, -- 1.0x speed
  tajweed_enabled BOOLEAN DEFAULT 1
);

-- ========================
-- Audio Tables
-- ========================

CREATE TABLE audio_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  verse_id INTEGER NOT NULL REFERENCES verses(id),
  url TEXT NOT NULL,
  word_id INTEGER, -- optional, if this is word-level audio
  type TEXT NOT NULL -- 'verse' or 'word'
);

-- ========================
-- Tajweed Tables
-- ========================

CREATE TABLE tajweed_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, -- "Ghunnah", "Ikhfa", etc.
  description TEXT NOT NULL
);

CREATE TABLE tajweed_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word_id INTEGER NOT NULL REFERENCES words(id),
  tajweed_rule_id INTEGER NOT NULL REFERENCES tajweed_rules(id),
  start_index INTEGER, -- where the tajweed rule applies in the word
  end_index INTEGER
);

-- ========================
-- Reference Info Tables
-- ========================

CREATE TABLE divisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, -- 'Juz', 'Hizb', 'Manzil', 'Ruku', etc.
  description TEXT NOT NULL
);