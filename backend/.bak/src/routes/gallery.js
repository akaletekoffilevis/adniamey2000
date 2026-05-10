const express = require('express');
const { initDB } = require('../db/schema');

const router = express.Router();

router.get('/', (req, res) => {
  const db = initDB();
  const items = db.prepare('SELECT * FROM gallery ORDER BY date DESC').all();
  db.close();
  res.json(items);
});

module.exports = router;
