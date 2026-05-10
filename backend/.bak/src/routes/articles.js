const express = require('express');
const { initDB } = require('../db/schema');

const router = express.Router();

router.get('/', (req, res) => {
  const db = initDB();
  const articles = db.prepare('SELECT * FROM articles ORDER BY date DESC').all();
  db.close();
  res.json(articles);
});

router.get('/:id', (req, res) => {
  const db = initDB();
  const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
  db.close();
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json(article);
});

module.exports = router;
