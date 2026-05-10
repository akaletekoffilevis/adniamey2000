const Database = require('better-sqlite3');
const path = require('path');

function initDB() {
  const dbPath = path.join(__dirname, '..', '..', 'database', 'adniamey.db');
  const db = new Database(dbPath);

  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
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

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS prayer_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      request TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      content_fr TEXT NOT NULL,
      content_en TEXT DEFAULT '',
      content_ha TEXT DEFAULT '',
      content_it TEXT DEFAULT '',
      role_fr TEXT DEFAULT '',
      role_en TEXT DEFAULT '',
      role_ha TEXT DEFAULT '',
      role_it TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day_fr TEXT NOT NULL,
      day_en TEXT DEFAULT '',
      day_ha TEXT DEFAULT '',
      day_it TEXT DEFAULT '',
      time_start TEXT NOT NULL,
      time_end TEXT NOT NULL,
      label_fr TEXT NOT NULL,
      label_en TEXT DEFAULT '',
      label_ha TEXT DEFAULT '',
      label_it TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS ministries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_fr TEXT NOT NULL,
      name_en TEXT DEFAULT '',
      name_ha TEXT DEFAULT '',
      name_it TEXT DEFAULT '',
      description_fr TEXT DEFAULT '',
      description_en TEXT DEFAULT '',
      description_ha TEXT DEFAULT '',
      description_it TEXT DEFAULT '',
      leader TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS doctrine (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_fr TEXT NOT NULL,
      title_en TEXT DEFAULT '',
      title_ha TEXT DEFAULT '',
      title_it TEXT DEFAULT '',
      content_fr TEXT DEFAULT '',
      content_en TEXT DEFAULT '',
      content_ha TEXT DEFAULT '',
      content_it TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS history_blocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section TEXT NOT NULL,
      content_fr TEXT DEFAULT '',
      content_en TEXT DEFAULT '',
      content_ha TEXT DEFAULT '',
      content_it TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS site_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label_fr TEXT NOT NULL,
      label_en TEXT DEFAULT '',
      label_ha TEXT DEFAULT '',
      label_it TEXT DEFAULT '',
      value_text TEXT NOT NULL,
      suffix TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS contact_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      value TEXT NOT NULL,
      label_fr TEXT DEFAULT '',
      label_en TEXT DEFAULT '',
      label_ha TEXT DEFAULT '',
      label_it TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS social_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT NOT NULL,
      url TEXT NOT NULL,
      icon_svg TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS donation_methods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      method TEXT NOT NULL,
      number TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS cache_version (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      version INTEGER NOT NULL DEFAULT 1
    );

    INSERT OR IGNORE INTO cache_version (id, version) VALUES (1, 1);
  `);
  return db;
}

module.exports = { initDB };
