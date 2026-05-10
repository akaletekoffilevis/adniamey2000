const bcrypt = require('bcryptjs');
const { initDB } = require('./schema');

const db = initDB();

const sermons = [
  {
    title_fr: 'La Puissance de la Foi',
    title_en: 'The Power of Faith',
    title_ha: 'Ƙarfin Bangaskiya',
    pastor_fr: 'Pasteur Jean-Marc',
    pastor_en: 'Pastor Jean-Marc',
    pastor_ha: 'Fasto Jean-Marc',
    category: 'culte',
    duration: '45:32',
    video_id: 'sermon_001',
    date: '2026-03-15'
  },
  {
    title_fr: 'Vivre dans la Paix de Dieu',
    title_en: 'Living in God\'s Peace',
    title_ha: 'Rayuwa cikin Salama ta Allah',
    pastor_fr: 'Pasteur Samuel',
    pastor_en: 'Pastor Samuel',
    pastor_ha: 'Fasto Samuel',
    category: 'enseignement',
    duration: '38:15',
    video_id: 'sermon_002',
    date: '2026-03-08'
  },
  {
    title_fr: 'L\'Espérance qui ne Déçoit Pas',
    title_en: 'Hope That Does Not Disappoint',
    title_ha: 'Bege da Ba Ya Ba da Kunya',
    pastor_fr: 'Pasteur David',
    pastor_en: 'Pastor David',
    pastor_ha: 'Fasto David',
    category: 'culte',
    duration: '42:00',
    video_id: 'sermon_003',
    date: '2026-03-01'
  },
  {
    title_fr: 'La Sagesse dans la Prise de Décision',
    title_en: 'Wisdom in Decision Making',
    title_ha: 'Hikima a cikin Yanke Shawara',
    pastor_fr: 'Pasteur Jean-Marc',
    pastor_en: 'Pastor Jean-Marc',
    pastor_ha: 'Fasto Jean-Marc',
    category: 'enseignement',
    duration: '50:20',
    video_id: 'sermon_004',
    date: '2026-02-22'
  },
  {
    title_fr: 'Le Combat Spirituel',
    title_en: 'The Spiritual Battle',
    title_ha: 'Yaƙin Ruhaniya',
    pastor_fr: 'Pasteur Samuel',
    pastor_en: 'Pastor Samuel',
    pastor_ha: 'Fasto Samuel',
    category: 'culte',
    duration: '47:10',
    video_id: 'sermon_005',
    date: '2026-02-15'
  },
  {
    title_fr: 'La Grâce Abondante',
    title_en: 'Abundant Grace',
    title_ha: 'Alheri Mai Yawa',
    pastor_fr: 'Pasteur David',
    pastor_en: 'Pastor David',
    pastor_ha: 'Fasto David',
    category: 'culte',
    duration: '41:45',
    video_id: 'sermon_006',
    date: '2026-02-08'
  }
];

const articles = [
  {
    title_fr: 'Conférence de la Jeunesse 2025',
    title_en: 'Youth Conference 2025',
    title_ha: 'Taron Matasa 2025',
    content_fr: 'La conférence de la jeunesse 2025 a été un grand succès avec plus de 200 participants. Les jeunes ont été inspirés par des messages puissants et des ateliers pratiques sur la vie chrétienne. Nous avons eu la présence de plusieurs orateurs internationaux qui ont partagé leurs expériences et leur sagesse avec notre jeunesse.',
    content_en: 'The 2025 youth conference was a great success with over 200 participants. Young people were inspired by powerful messages and practical workshops on Christian living. We had the presence of several international speakers who shared their experiences and wisdom with our youth.',
    content_ha: 'Taron matasa na 2025 ya yi nasara sosai tare da mahalarta sama da 200. An ƙarfafa matasa da saƙonni masu ƙarfi da taron karawa juna sani kan rayuwar Kirista. Mun sami halartar masu magana da yawa na duniya waɗanda suka raba gogewarsu da hikimarsu tare da matasanmu.',
    author_fr: 'Comité Jeunesse',
    author_en: 'Youth Committee',
    author_ha: 'Kwamitin Matasa',
    category: 'jeunesse',
    status: 'published',
    date: '2025-12-15'
  },
  {
    title_fr: 'Méditation du Matin',
    title_en: 'Morning Meditation',
    title_ha: 'Tunani na Safiya',
    content_fr: 'Commencer chaque journée par la méditation de la Parole de Dieu transforme notre perspective et nous prépare à affronter les défis quotidiens avec foi et courage. La méditation du matin nous permet de nous recentrer sur Dieu et de recevoir sa direction pour la journée à venir.',
    content_en: 'Starting each day with meditation on God\'s Word transforms our perspective and prepares us to face daily challenges with faith and courage. Morning meditation allows us to refocus on God and receive His direction for the day ahead.',
    content_ha: 'Fara kowace rana da tunani akan Maganar Allah yana canza hangen nesanmu kuma yana shirye mu fuskanci ƙalubalen yau da kullum da bangaskiya da ƙarfin zuciya. Tunani na safiya yana ba mu damar sake mayar da hankali ga Allah da karɓar jagorancinsa na gaba.',
    author_fr: 'Pasteur Jean-Marc',
    author_en: 'Pastor Jean-Marc',
    author_ha: 'Fasto Jean-Marc',
    category: 'spiritualite',
    status: 'published',
    date: '2026-02-01'
  },
  {
    title_fr: 'Baptême du Mois de Février',
    title_en: 'February Baptism',
    title_ha: 'Baftisma na Watan Fabrairu',
    content_fr: 'Nous célébrons le baptême de 15 nouvelles âmes qui ont décidé de suivre Jésus-Christ. Ce fut un moment de joie et de célébration pour toute la communauté. Chaque candidat a partagé son témoignage touchant de la façon dont Dieu a transformé sa vie.',
    content_en: 'We celebrate the baptism of 15 new souls who decided to follow Jesus Christ. It was a moment of joy and celebration for the entire community. Each candidate shared their touching testimony of how God transformed their life.',
    content_ha: 'Muna bikin baftisma na sababbin rayuka 15 waɗanda suka yanke shawarar bin Yesu Kiristi. Lokaci ne na farin ciki da biki ga dukan al\'umma. Kowane ɗan takara ya ba da shaidarsa mai taɓa rai na yadda Allah ya canza rayuwarsa.',
    author_fr: 'Pasteur Samuel',
    author_en: 'Pastor Samuel',
    author_ha: 'Fasto Samuel',
    category: 'bapteme',
    status: 'published',
    date: '2026-02-28'
  }
];

const events = [
  {
    title_fr: 'Conférence de la Jeunesse',
    title_en: 'Youth Conference',
    title_ha: 'Taron Matasa',
    description_fr: 'Une conférence annuelle dédiée aux jeunes avec des enseignements inspirants, des ateliers interactifs et des moments de louange. Venez nombreux pour vivre une expérience transformatrice avec Dieu.',
    description_en: 'An annual conference dedicated to youth with inspiring teachings, interactive workshops, and times of praise. Come in large numbers to experience a transformative encounter with God.',
    description_ha: 'Taron shekara-shekara da aka keɓe ga matasa tare da koyarwa masu ƙarfafawa, taron karawa juna sani, da lokutan yabo. Ku zo da yawa don samun gogewa mai canzawa tare da Allah.',
    location_fr: 'Temple Principal, Niamey',
    location_en: 'Main Temple, Niamey',
    location_ha: 'Babban Haikali, Niamey',
    date: '2026-06-15',
    status: 'upcoming'
  },
  {
    title_fr: 'Baptême Communautaire',
    title_en: 'Community Baptism',
    title_ha: 'Baftisma na Al\'umma',
    description_fr: 'Cérémonie de baptême pour tous ceux qui ont décidé de donner leur vie à Christ. Un moment de joie et de célébration pour toute la famille de Dieu.',
    description_en: 'Baptism ceremony for all those who have decided to give their lives to Christ. A moment of joy and celebration for the whole family of God.',
    description_ha: 'Bikin baftisma ga duk waɗanda suka yanke shawarar ba da rayukansu ga Kristi. Lokacin farin ciki da biki ga dukan iyalin Allah.',
    location_fr: 'Rivière du Niger, Niamey',
    location_en: 'Niger River, Niamey',
    location_ha: 'Kogin Nijar, Niamey',
    date: '2026-04-20',
    status: 'upcoming'
  },
  {
    title_fr: 'Séminaire sur la Famille',
    title_en: 'Family Seminar',
    title_ha: 'Taron Karawa Juna Sani kan Iyali',
    description_fr: 'Un séminaire complet sur les principes bibliques pour une famille épanouie. Thèmes abordés : communication conjugale, éducation des enfants, gestion financière selon la Bible.',
    description_en: 'A comprehensive seminar on biblical principles for a thriving family. Topics covered: marital communication, child education, financial management according to the Bible.',
    description_ha: 'Taron karawa juna sani kan ka\'idojin Littafi Mai Tsarki don iyali mai wadata. Batutuwan da aka tattauna: sadarwa tsakanin ma\'aurata, ilmantar da yara, gudanar da kuɗi bisa ga Littafi Mai Tsarki.',
    location_fr: 'Salle Polyvalente, AdNiamey 2000',
    location_en: 'Multipurpose Hall, AdNiamey 2000',
    location_ha: 'Zauren Taro, AdNiamey 2000',
    date: '2026-05-10',
    status: 'upcoming'
  },
  {
    title_fr: 'Concert de Louange',
    title_en: 'Praise Concert',
    title_ha: 'Waƙar Yabo',
    description_fr: 'Une soirée exceptionnelle de louange et d\'adoration avec la chorale d\'AdNiamey 2000 et des invités spéciaux. Venez passer un moment unique en présence de Dieu.',
    description_en: 'An exceptional evening of praise and worship with the AdNiamey 2000 choir and special guests. Come spend a unique moment in God\'s presence.',
    description_ha: 'Wani maraice na musamman na yabo da bauta tare da ƙungiyar mawaƙa ta AdNiamey 2000 da baƙi na musamman. Ku zo ku yi wani lokaci na musamman a gaban Allah.',
    location_fr: 'Temple Principal, Niamey',
    location_en: 'Main Temple, Niamey',
    location_ha: 'Babban Haikali, Niamey',
    date: '2026-07-25',
    status: 'upcoming'
  }
];

const galleryItems = [
  {
    caption_fr: 'Culte dominical - Mars 2026',
    caption_en: 'Sunday Service - March 2026',
    caption_ha: 'Taron Lahadi - Maris 2026',
    category: 'cultes',
    gradient: 'from-purple-600 to-blue-600',
    date: '2026-03-15'
  },
  {
    caption_fr: 'Conférence jeunesse - Décembre 2025',
    caption_en: 'Youth Conference - December 2025',
    caption_ha: 'Taron Matasa - Disamba 2025',
    category: 'jeunesse',
    gradient: 'from-green-500 to-teal-600',
    date: '2025-12-15'
  },
  {
    caption_fr: 'Baptême communautaire - Février 2026',
    caption_en: 'Community Baptism - February 2026',
    caption_ha: 'Baftisma na Al\'umma - Fabrairu 2026',
    category: 'baptemes',
    gradient: 'from-blue-500 to-cyan-600',
    date: '2026-02-28'
  },
  {
    caption_fr: 'Louange et adoration - Soirée spéciale',
    caption_en: 'Praise and Worship - Special Evening',
    caption_ha: 'Yabo da Bauta - Maraice na Musamman',
    category: 'evenements',
    gradient: 'from-orange-500 to-red-600',
    date: '2026-01-20'
  },
  {
    caption_fr: 'Séminaire biblique - Janvier 2026',
    caption_en: 'Bible Seminar - January 2026',
    caption_ha: 'Taron Littafi Mai Tsarki - Janairu 2026',
    category: 'evenements',
    gradient: 'from-yellow-500 to-orange-600',
    date: '2026-01-10'
  },
  {
    caption_fr: 'Groupe de jeunes - Activité sportive',
    caption_en: 'Youth Group - Sports Activity',
    caption_ha: 'Ƙungiyar Matasa - Ayyukan Wasanni',
    category: 'jeunesse',
    gradient: 'from-red-500 to-pink-600',
    date: '2026-02-14'
  },
  {
    caption_fr: 'Culte de réveil - Février 2026',
    caption_en: 'Revival Service - February 2026',
    caption_ha: 'Taron Farkawa - Fabrairu 2026',
    category: 'cultes',
    gradient: 'from-indigo-500 to-purple-600',
    date: '2026-02-22'
  },
  {
    caption_fr: 'Célébration de Pâques - Avril 2026',
    caption_en: 'Easter Celebration - April 2026',
    caption_ha: 'Bikin Ista - Afrilu 2026',
    category: 'evenements',
    gradient: 'from-pink-500 to-rose-600',
    date: '2026-04-05'
  }
];

const seedSermons = db.prepare(`
  INSERT INTO sermons (title_fr, title_en, title_ha, pastor_fr, pastor_en, pastor_ha, category, duration, video_id, date)
  VALUES (@title_fr, @title_en, @title_ha, @pastor_fr, @pastor_en, @pastor_ha, @category, @duration, @video_id, @date)
`);

const seedArticles = db.prepare(`
  INSERT INTO articles (title_fr, title_en, title_ha, content_fr, content_en, content_ha, author_fr, author_en, author_ha, category, status, date)
  VALUES (@title_fr, @title_en, @title_ha, @content_fr, @content_en, @content_ha, @author_fr, @author_en, @author_ha, @category, @status, @date)
`);

const seedEvents = db.prepare(`
  INSERT INTO events (title_fr, title_en, title_ha, description_fr, description_en, description_ha, location_fr, location_en, location_ha, date, status)
  VALUES (@title_fr, @title_en, @title_ha, @description_fr, @description_en, @description_ha, @location_fr, @location_en, @location_ha, @date, @status)
`);

const seedGallery = db.prepare(`
  INSERT INTO gallery (caption_fr, caption_en, caption_ha, category, gradient, date)
  VALUES (@caption_fr, @caption_en, @caption_ha, @category, @gradient, @date)
`);

const seedUser = db.prepare(`
  INSERT INTO users (email, password_hash, name, role)
  VALUES (@email, @password_hash, @name, @role)
`);

const transaction = db.transaction(() => {
  const sermonCount = db.prepare('SELECT COUNT(*) as count FROM sermons').get();
  if (sermonCount.count === 0) {
    for (const sermon of sermons) seedSermons.run(sermon);
    console.log(`Seeded ${sermons.length} sermons`);
  } else {
    console.log('Sermons table already has data, skipping');
  }

  const articleCount = db.prepare('SELECT COUNT(*) as count FROM articles').get();
  if (articleCount.count === 0) {
    for (const article of articles) seedArticles.run(article);
    console.log(`Seeded ${articles.length} articles`);
  } else {
    console.log('Articles table already has data, skipping');
  }

  const eventCount = db.prepare('SELECT COUNT(*) as count FROM events').get();
  if (eventCount.count === 0) {
    for (const event of events) seedEvents.run(event);
    console.log(`Seeded ${events.length} events`);
  } else {
    console.log('Events table already has data, skipping');
  }

  const galleryCount = db.prepare('SELECT COUNT(*) as count FROM gallery').get();
  if (galleryCount.count === 0) {
    for (const item of galleryItems) seedGallery.run(item);
    console.log(`Seeded ${galleryItems.length} gallery items`);
  } else {
    console.log('Gallery table already has data, skipping');
  }

  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (userCount.count === 0) {
    const password_hash = bcrypt.hashSync('admin123', 10);
    seedUser.run({
      email: 'contact@adniamey2000.org',
      password_hash,
      name: 'Administrateur',
      role: 'admin'
    });
    console.log('Seeded 1 admin user');
  } else {
    console.log('Users table already has data, skipping');
  }
});

transaction();
db.close();
console.log('Seed completed successfully');
