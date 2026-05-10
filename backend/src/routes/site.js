const { authMiddleware } = require('../middleware/auth');
const { fillAllLangs } = require('../utils/translate');

module.exports = async function (fastify) {
  const { db, io } = fastify;

  function bumpVersion() {
    db.prepare('UPDATE cache_version SET version = version + 1 WHERE id = 1').run();
    var v = db.prepare('SELECT version FROM cache_version WHERE id = 1').get();
    io.emit('site:updated', { version: v.version });
    return v.version;
  }

  // GET /api/site - public, returns all site data in one call
  fastify.get('/api/site', async (req, reply) => {
    var version = db.prepare('SELECT version FROM cache_version WHERE id = 1').get();
    var testimonials = db.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC').all();
    var schedules = db.prepare('SELECT * FROM schedules ORDER BY sort_order ASC, id ASC').all();
    var ministries = db.prepare('SELECT * FROM ministries ORDER BY sort_order ASC, id ASC').all();
    var doctrine = db.prepare('SELECT * FROM doctrine ORDER BY sort_order ASC, id ASC').all();
    var history = db.prepare('SELECT * FROM history_blocks ORDER BY sort_order ASC, id ASC').all();
    var stats = db.prepare('SELECT * FROM site_stats ORDER BY sort_order ASC, id ASC').all();
    var contacts = db.prepare('SELECT * FROM contact_details ORDER BY sort_order ASC, id ASC').all();
    var events = db.prepare('SELECT * FROM events ORDER BY date ASC').all();
    var social = db.prepare('SELECT * FROM social_links ORDER BY sort_order ASC, id ASC').all();
    var donations = db.prepare('SELECT * FROM donation_methods ORDER BY sort_order ASC, id ASC').all();
    var settings = db.prepare('SELECT key, value FROM settings').all();
    var settingsObj = {};
    for (var i = 0; i < settings.length; i++) {
      settingsObj[settings[i].key] = settings[i].value;
    }
    return {
      version: version ? version.version : 1,
      testimonials: testimonials,
      events: events,
      schedules: schedules,
      ministries: ministries,
      doctrine: doctrine,
      history: history,
      stats: stats,
      contacts: contacts,
      social: social,
      donations: donations,
      settings: settingsObj
    };
  });

  // GET /api/site/version
  fastify.get('/api/site/version', async (req, reply) => {
    var v = db.prepare('SELECT version FROM cache_version WHERE id = 1').get();
    return { version: v ? v.version : 1 };
  });

  // ========== ADMIN CRUD ==========

  // --- SETTINGS ---
  fastify.put('/api/admin/settings', { preHandler: [authMiddleware] }, async (req, reply) => {
    var body = req.body;
    for (var key in body) {
      if (body.hasOwnProperty(key)) {
        db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(key, String(body[key]));
      }
    }
    bumpVersion();
    return { ok: true };
  });

  // --- TESTIMONIALS ---
  fastify.get('/api/admin/testimonials', { preHandler: [authMiddleware] }, async (req, reply) => {
    return db.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC').all();
  });
  fastify.post('/api/admin/testimonials', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    var r = db.prepare('INSERT INTO testimonials (author, content_fr, content_en, content_ha, content_it, role_fr, role_en, role_ha, role_it, sort_order) VALUES (@author, @content_fr, @content_en, @content_ha, @content_it, @role_fr, @role_en, @role_ha, @role_it, @sort_order)').run(data);
    var item = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(r.lastInsertRowid);
    bumpVersion();
    reply.code(201).send(item);
  });
  fastify.put('/api/admin/testimonials/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    data.id = req.params.id;
    db.prepare('UPDATE testimonials SET author=@author, content_fr=@content_fr, content_en=@content_en, content_ha=@content_ha, content_it=@content_it, role_fr=@role_fr, role_en=@role_en, role_ha=@role_ha, role_it=@role_it, sort_order=@sort_order WHERE id=@id').run(data);
    bumpVersion();
    return db.prepare('SELECT * FROM testimonials WHERE id = ?').get(req.params.id);
  });
  fastify.delete('/api/admin/testimonials/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
    bumpVersion();
    return { ok: true };
  });

  // --- SCHEDULES ---
  fastify.get('/api/admin/schedules', { preHandler: [authMiddleware] }, async (req, reply) => {
    return db.prepare('SELECT * FROM schedules ORDER BY sort_order ASC, id ASC').all();
  });
  fastify.post('/api/admin/schedules', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    var r = db.prepare('INSERT INTO schedules (day_fr, day_en, day_ha, day_it, time_start, time_end, label_fr, label_en, label_ha, label_it, sort_order) VALUES (@day_fr, @day_en, @day_ha, @day_it, @time_start, @time_end, @label_fr, @label_en, @label_ha, @label_it, @sort_order)').run(data);
    var item = db.prepare('SELECT * FROM schedules WHERE id = ?').get(r.lastInsertRowid);
    bumpVersion();
    reply.code(201).send(item);
  });
  fastify.put('/api/admin/schedules/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    data.id = req.params.id;
    db.prepare('UPDATE schedules SET day_fr=@day_fr, day_en=@day_en, day_ha=@day_ha, day_it=@day_it, time_start=@time_start, time_end=@time_end, label_fr=@label_fr, label_en=@label_en, label_ha=@label_ha, label_it=@label_it, sort_order=@sort_order WHERE id=@id').run(data);
    bumpVersion();
    return db.prepare('SELECT * FROM schedules WHERE id = ?').get(req.params.id);
  });
  fastify.delete('/api/admin/schedules/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    db.prepare('DELETE FROM schedules WHERE id = ?').run(req.params.id);
    bumpVersion();
    return { ok: true };
  });

  // --- MINISTRIES ---
  fastify.get('/api/admin/ministries', { preHandler: [authMiddleware] }, async (req, reply) => {
    return db.prepare('SELECT * FROM ministries ORDER BY sort_order ASC, id ASC').all();
  });
  fastify.post('/api/admin/ministries', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    var r = db.prepare('INSERT INTO ministries (name_fr, name_en, name_ha, name_it, description_fr, description_en, description_ha, description_it, leader, sort_order) VALUES (@name_fr, @name_en, @name_ha, @name_it, @description_fr, @description_en, @description_ha, @description_it, @leader, @sort_order)').run(data);
    var item = db.prepare('SELECT * FROM ministries WHERE id = ?').get(r.lastInsertRowid);
    bumpVersion();
    reply.code(201).send(item);
  });
  fastify.put('/api/admin/ministries/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    data.id = req.params.id;
    db.prepare('UPDATE ministries SET name_fr=@name_fr, name_en=@name_en, name_ha=@name_ha, name_it=@name_it, description_fr=@description_fr, description_en=@description_en, description_ha=@description_ha, description_it=@description_it, leader=@leader, sort_order=@sort_order WHERE id=@id').run(data);
    bumpVersion();
    return db.prepare('SELECT * FROM ministries WHERE id = ?').get(req.params.id);
  });
  fastify.delete('/api/admin/ministries/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    db.prepare('DELETE FROM ministries WHERE id = ?').run(req.params.id);
    bumpVersion();
    return { ok: true };
  });

  // --- DOCTRINE ---
  fastify.get('/api/admin/doctrine', { preHandler: [authMiddleware] }, async (req, reply) => {
    return db.prepare('SELECT * FROM doctrine ORDER BY sort_order ASC, id ASC').all();
  });
  fastify.post('/api/admin/doctrine', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    var r = db.prepare('INSERT INTO doctrine (title_fr, title_en, title_ha, title_it, content_fr, content_en, content_ha, content_it, sort_order) VALUES (@title_fr, @title_en, @title_ha, @title_it, @content_fr, @content_en, @content_ha, @content_it, @sort_order)').run(data);
    var item = db.prepare('SELECT * FROM doctrine WHERE id = ?').get(r.lastInsertRowid);
    bumpVersion();
    reply.code(201).send(item);
  });
  fastify.put('/api/admin/doctrine/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    data.id = req.params.id;
    db.prepare('UPDATE doctrine SET title_fr=@title_fr, title_en=@title_en, title_ha=@title_ha, title_it=@title_it, content_fr=@content_fr, content_en=@content_en, content_ha=@content_ha, content_it=@content_it, sort_order=@sort_order WHERE id=@id').run(data);
    bumpVersion();
    return db.prepare('SELECT * FROM doctrine WHERE id = ?').get(req.params.id);
  });
  fastify.delete('/api/admin/doctrine/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    db.prepare('DELETE FROM doctrine WHERE id = ?').run(req.params.id);
    bumpVersion();
    return { ok: true };
  });

  // --- HISTORY ---
  fastify.get('/api/admin/history', { preHandler: [authMiddleware] }, async (req, reply) => {
    return db.prepare('SELECT * FROM history_blocks ORDER BY sort_order ASC, id ASC').all();
  });
  fastify.post('/api/admin/history', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    var r = db.prepare('INSERT INTO history_blocks (section, content_fr, content_en, content_ha, content_it, sort_order) VALUES (@section, @content_fr, @content_en, @content_ha, @content_it, @sort_order)').run(data);
    var item = db.prepare('SELECT * FROM history_blocks WHERE id = ?').get(r.lastInsertRowid);
    bumpVersion();
    reply.code(201).send(item);
  });
  fastify.put('/api/admin/history/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    data.id = req.params.id;
    db.prepare('UPDATE history_blocks SET section=@section, content_fr=@content_fr, content_en=@content_en, content_ha=@content_ha, content_it=@content_it, sort_order=@sort_order WHERE id=@id').run(data);
    bumpVersion();
    return db.prepare('SELECT * FROM history_blocks WHERE id = ?').get(req.params.id);
  });
  fastify.delete('/api/admin/history/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    db.prepare('DELETE FROM history_blocks WHERE id = ?').run(req.params.id);
    bumpVersion();
    return { ok: true };
  });

  // --- STATS ---
  fastify.get('/api/admin/stats', { preHandler: [authMiddleware] }, async (req, reply) => {
    return db.prepare('SELECT * FROM site_stats ORDER BY sort_order ASC, id ASC').all();
  });
  fastify.post('/api/admin/stats', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    var r = db.prepare('INSERT INTO site_stats (label_fr, label_en, label_ha, label_it, value_text, suffix, sort_order) VALUES (@label_fr, @label_en, @label_ha, @label_it, @value_text, @suffix, @sort_order)').run(data);
    var item = db.prepare('SELECT * FROM site_stats WHERE id = ?').get(r.lastInsertRowid);
    bumpVersion();
    reply.code(201).send(item);
  });
  fastify.put('/api/admin/stats/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    data.id = req.params.id;
    db.prepare('UPDATE site_stats SET label_fr=@label_fr, label_en=@label_en, label_ha=@label_ha, label_it=@label_it, value_text=@value_text, suffix=@suffix, sort_order=@sort_order WHERE id=@id').run(data);
    bumpVersion();
    return db.prepare('SELECT * FROM site_stats WHERE id = ?').get(req.params.id);
  });
  fastify.delete('/api/admin/stats/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    db.prepare('DELETE FROM site_stats WHERE id = ?').run(req.params.id);
    bumpVersion();
    return { ok: true };
  });

  // --- CONTACT DETAILS ---
  fastify.get('/api/admin/contacts', { preHandler: [authMiddleware] }, async (req, reply) => {
    return db.prepare('SELECT * FROM contact_details ORDER BY sort_order ASC, id ASC').all();
  });
  fastify.post('/api/admin/contacts', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    var r = db.prepare('INSERT INTO contact_details (type, value, label_fr, label_en, label_ha, label_it, sort_order) VALUES (@type, @value, @label_fr, @label_en, @label_ha, @label_it, @sort_order)').run(data);
    var item = db.prepare('SELECT * FROM contact_details WHERE id = ?').get(r.lastInsertRowid);
    bumpVersion();
    reply.code(201).send(item);
  });
  fastify.put('/api/admin/contacts/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = fillAllLangs(req.body);
    data.id = req.params.id;
    db.prepare('UPDATE contact_details SET type=@type, value=@value, label_fr=@label_fr, label_en=@label_en, label_ha=@label_ha, label_it=@label_it, sort_order=@sort_order WHERE id=@id').run(data);
    bumpVersion();
    return db.prepare('SELECT * FROM contact_details WHERE id = ?').get(req.params.id);
  });
  fastify.delete('/api/admin/contacts/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    db.prepare('DELETE FROM contact_details WHERE id = ?').run(req.params.id);
    bumpVersion();
    return { ok: true };
  });

  // --- SOCIAL LINKS ---
  fastify.get('/api/admin/social', { preHandler: [authMiddleware] }, async (req, reply) => {
    return db.prepare('SELECT * FROM social_links ORDER BY sort_order ASC, id ASC').all();
  });
  fastify.post('/api/admin/social', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = req.body;
    var r = db.prepare('INSERT INTO social_links (platform, url, icon_svg, sort_order) VALUES (@platform, @url, @icon_svg, @sort_order)').run(data);
    var item = db.prepare('SELECT * FROM social_links WHERE id = ?').get(r.lastInsertRowid);
    bumpVersion();
    reply.code(201).send(item);
  });
  fastify.put('/api/admin/social/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = req.body;
    data.id = req.params.id;
    db.prepare('UPDATE social_links SET platform=@platform, url=@url, icon_svg=@icon_svg, sort_order=@sort_order WHERE id=@id').run(data);
    bumpVersion();
    return db.prepare('SELECT * FROM social_links WHERE id = ?').get(req.params.id);
  });
  fastify.delete('/api/admin/social/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    db.prepare('DELETE FROM social_links WHERE id = ?').run(req.params.id);
    bumpVersion();
    return { ok: true };
  });

  // --- DONATION METHODS ---
  fastify.get('/api/admin/donations', { preHandler: [authMiddleware] }, async (req, reply) => {
    return db.prepare('SELECT * FROM donation_methods ORDER BY sort_order ASC, id ASC').all();
  });
  fastify.post('/api/admin/donations', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = req.body;
    var r = db.prepare('INSERT INTO donation_methods (method, number, sort_order) VALUES (@method, @number, @sort_order)').run(data);
    var item = db.prepare('SELECT * FROM donation_methods WHERE id = ?').get(r.lastInsertRowid);
    bumpVersion();
    reply.code(201).send(item);
  });
  fastify.put('/api/admin/donations/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    var data = req.body;
    data.id = req.params.id;
    db.prepare('UPDATE donation_methods SET method=@method, number=@number, sort_order=@sort_order WHERE id=@id').run(data);
    bumpVersion();
    return db.prepare('SELECT * FROM donation_methods WHERE id = ?').get(req.params.id);
  });
  fastify.delete('/api/admin/donations/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
    db.prepare('DELETE FROM donation_methods WHERE id = ?').run(req.params.id);
    bumpVersion();
    return { ok: true };
  });

  // --- GET by ID for each section (needed by admin edit) ---
  fastify.get('/api/admin/settings', { preHandler: [authMiddleware] }, async (req, reply) => {
    var rows = db.prepare('SELECT key, value FROM settings').all();
    var obj = {};
    for (var i = 0; i < rows.length; i++) obj[rows[i].key] = rows[i].value;
    return obj;
  });

  var getById = [
    { route: 'testimonials', table: 'testimonials' },
    { route: 'schedules', table: 'schedules' },
    { route: 'ministries', table: 'ministries' },
    { route: 'doctrine', table: 'doctrine' },
    { route: 'history', table: 'history_blocks' },
    { route: 'stats', table: 'site_stats' },
    { route: 'contacts', table: 'contact_details' },
    { route: 'social', table: 'social_links' },
    { route: 'donations', table: 'donation_methods' }
  ];

  for (var i = 0; i < getById.length; i++) {
    (function(cfg) {
      fastify.get('/api/admin/' + cfg.route + '/:id', { preHandler: [authMiddleware] }, async (req, reply) => {
        var item = db.prepare('SELECT * FROM ' + cfg.table + ' WHERE id = ?').get(req.params.id);
        if (!item) return reply.code(404).send({ error: 'Not found' });
        return item;
      });
    })(getById[i]);
  }
};
