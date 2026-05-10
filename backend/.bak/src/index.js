const express = require('express');
const cors = require('cors');
const { initDB } = require('./db/schema');

const sermonsRouter = require('./routes/sermons');
const articlesRouter = require('./routes/articles');
const eventsRouter = require('./routes/events');
const galleryRouter = require('./routes/gallery');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/sermons', sermonsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/events', eventsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/auth', authRouter);

initDB();

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
