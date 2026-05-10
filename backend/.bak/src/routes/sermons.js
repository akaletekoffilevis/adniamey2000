const express = require('express');
const { initDB } = require('../db/schema');

const router = express.Router();

router.get('/', (req, res) => {
  const db = initDB();
  const sermons = db.prepare('SELECT * FROM sermons ORDER BY date DESC').all();
  db.close();
  res.json(sermons);
});

router.get('/:id', (req, res) => {
  const db = initDB();
  const sermon = db.prepare('SELECT * FROM sermons WHERE id = ?').get(req.params.id);
  db.close();
  if (!sermon) return res.status(404).json({ error: 'Sermon not found' });
  res.json(sermon);
});

module.exports = router;
