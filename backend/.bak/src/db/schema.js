const Database = require('better-sqlite3');
const path = require('path');

function initDB() {
  const dbPath = path.join(__dirname, '..', '..', 'database', 'adniamey.db');
  const db = new Database(dbPath);

  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS sermons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_fr TEXT NOT NULL,
      title_en TEXT NOT NULL,
      title_ha TEXT NOT NULL,
      pastor_fr TEXT NOT NULL,
      pastor_en TEXT NOT NULL,
      pastor_ha TEXT NOT NULL,
      category TEXT NOT NULL,
      duration TEXT NOT NULL,
      video_id TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_fr TEXT NOT NULL,
      title_en TEXT NOT NULL,
      title_ha TEXT NOT NULL,
      content_fr TEXT NOT NULL,
      content_en TEXT NOT NULL,
      content_ha TEXT NOT NULL,
      author_fr TEXT NOT NULL,
      author_en TEXT NOT NULL,
      author_ha TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'published',
      date TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_fr TEXT NOT NULL,
      title_en TEXT NOT NULL,
      title_ha TEXT NOT NULL,
      description_fr TEXT NOT NULL,
      description_en TEXT NOT NULL,
      description_ha TEXT NOT NULL,
      location_fr TEXT NOT NULL,
      location_en TEXT NOT NULL,
      location_ha TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'upcoming',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      caption_fr TEXT NOT NULL,
      caption_en TEXT NOT NULL,
      caption_ha TEXT NOT NULL,
      category TEXT NOT NULL,
      gradient TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user'
    );
  `);

  return db;
}

module.exports = { initDB };
