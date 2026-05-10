module.exports = async function (fastify) {
  const { db } = fastify;

  fastify.get('/api/site', { schema: { tags: ['Site'] } }, async (req, reply) => {
    const version = db.prepare('SELECT version FROM cache_version WHERE id = 1').get();
    const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC').all();
    const schedules = db.prepare('SELECT * FROM schedules ORDER BY sort_order ASC, id ASC').all();
    const ministries = db.prepare('SELECT * FROM ministries ORDER BY sort_order ASC, id ASC').all();
    const doctrine = db.prepare('SELECT * FROM doctrine ORDER BY sort_order ASC, id ASC').all();
    const history = db.prepare('SELECT * FROM history_blocks ORDER BY sort_order ASC, id ASC').all();
    const stats = db.prepare('SELECT * FROM site_stats ORDER BY sort_order ASC, id ASC').all();
    const contacts = db.prepare('SELECT * FROM contact_details ORDER BY sort_order ASC, id ASC').all();
    const events = db.prepare('SELECT * FROM events ORDER BY date ASC').all();
    const social = db.prepare('SELECT * FROM social_links ORDER BY sort_order ASC, id ASC').all();
    const donations = db.prepare('SELECT * FROM donation_methods ORDER BY sort_order ASC, id ASC').all();
    const settings = db.prepare('SELECT key, value FROM settings').all();
    const settingsObj = {};
    for (let i = 0; i < settings.length; i++) {
      settingsObj[settings[i].key] = settings[i].value;
    }
    return {
      version: version ? version.version : 1,
      testimonials,
      events,
      schedules,
      ministries,
      doctrine,
      history,
      stats,
      contacts,
      social,
      donations,
      settings: settingsObj,
    };
  });

  fastify.get('/api/site/version', { schema: { tags: ['Site'] } }, async (req, reply) => {
    const v = db.prepare('SELECT version FROM cache_version WHERE id = 1').get();
    return { version: v ? v.version : 1 };
  });
};
