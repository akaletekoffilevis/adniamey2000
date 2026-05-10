const express = require('express');
const { initDB } = require('../db/schema');

const router = express.Router();

router.get('/', (req, res) => {
  const db = initDB();
  const events = db.prepare('SELECT * FROM events ORDER BY date ASC').all();
  db.close();
  res.json(events);
});

router.get('/:id', (req, res) => {
  const db = initDB();
  const event = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
  db.close();
  if (!event) return res.status(404).json({ error: 'Event not found' });
  res.json(event);
});

module.exports = router;
