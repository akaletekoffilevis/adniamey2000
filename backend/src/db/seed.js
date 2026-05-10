const bcrypt = require('bcryptjs');
const { initDB } = require('./schema');

const db = initDB();


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

// ===== SITE DATA SEEDS =====

const seedTestimonials = db.prepare(`
  INSERT INTO testimonials (author, content_fr, content_en, content_ha, content_it, role_fr, sort_order)
  VALUES (@author, @content_fr, @content_en, @content_ha, @content_it, @role_fr, @sort_order)
`);

const seedSchedules = db.prepare(`
  INSERT INTO schedules (day_fr, day_en, day_ha, day_it, time_start, time_end, label_fr, label_en, label_ha, label_it, sort_order)
  VALUES (@day_fr, @day_en, @day_ha, @day_it, @time_start, @time_end, @label_fr, @label_en, @label_ha, @label_it, @sort_order)
`);

const seedMinistries = db.prepare(`
  INSERT INTO ministries (name_fr, name_en, name_ha, name_it, description_fr, description_en, description_ha, description_it, leader, sort_order)
  VALUES (@name_fr, @name_en, @name_ha, @name_it, @description_fr, @description_en, @description_ha, @description_it, @leader, @sort_order)
`);

const seedDoctrine = db.prepare(`
  INSERT INTO doctrine (title_fr, title_en, title_ha, title_it, content_fr, content_en, content_ha, content_it, sort_order)
  VALUES (@title_fr, @title_en, @title_ha, @title_it, @content_fr, @content_en, @content_ha, @content_it, @sort_order)
`);

const seedHistory = db.prepare(`
  INSERT INTO history_blocks (section, content_fr, content_en, content_ha, content_it, sort_order)
  VALUES (@section, @content_fr, @content_en, @content_ha, @content_it, @sort_order)
`);

const seedStats = db.prepare(`
  INSERT INTO site_stats (label_fr, label_en, label_ha, label_it, value_text, suffix, sort_order)
  VALUES (@label_fr, @label_en, @label_ha, @label_it, @value_text, @suffix, @sort_order)
`);

const seedContacts = db.prepare(`
  INSERT INTO contact_details (type, value, label_fr, label_en, label_ha, label_it, sort_order)
  VALUES (@type, @value, @label_fr, @label_en, @label_ha, @label_it, @sort_order)
`);

const seedSocial = db.prepare(`
  INSERT INTO social_links (platform, url)
  VALUES (@platform, @url)
`);

const seedDonations = db.prepare(`
  INSERT INTO donation_methods (method, number)
  VALUES (@method, @number)
`);

const testimonials = [
  { author: 'Soeur Hadiza', content_fr: 'AD Niamey 2000 est ma famille spirituelle depuis 10 ans. J\'ai vu Dieu transformer des vies ici, y compris la mienne. La communauté est chaleureuse et l\'enseignement est fidèle à la Parole.', content_en: 'AD Niamey 2000 has been my spiritual family for 10 years. I have seen God transform lives here, including mine. The community is warm and the teaching is faithful to the Word.', content_ha: 'AD Niamey 2000 ta zama iyalina na ruhaniya tsawon shekaru 10. Na ga Allah yana canza rayuka a nan, gami da tawa. Al\'umma tana da dumi kuma koyarwar tana da aminci ga Maganar.', content_it: 'AD Niamey 2000 è la mia famiglia spirituale da 10 anni. Ho visto Dio trasformare vite qui, inclusa la mia. La comunità è calorosa e l\'insegnamento è fedele alla Parola.', role_fr: 'Membre depuis 2016', sort_order: 0 },
  { author: 'Frère Mamane', content_fr: 'Les enseignements du dimanche et les études bibliques m\'ont beaucoup aidé à grandir spirituellement. Je recommande cette église à tous ceux qui cherchent Dieu sincèrement.', content_en: 'Sunday teachings and Bible studies have helped me grow spiritually a lot. I recommend this church to all who sincerely seek God.', content_ha: 'Koyarwar Lahadi da nazarin Littafi Mai Tsarki sun taimake ni girma a ruhaniya sosai. Ina ba da shawarar wannan ikilisiya ga duk masu neman Allah da gaske.', content_it: 'Gli insegnamenti domenicali e gli studi biblici mi hanno aiutato molto a crescere spiritualmente. Raccomando questa chiesa a tutti coloro che cercano sinceramente Dio.', role_fr: 'Membre depuis 2019', sort_order: 1 },
  { author: 'Frère Adamou', content_fr: 'Le groupe de jeunes m\'a accueilli à bras ouverts quand je suis arrivé à Niamey. Aujourd\'hui, je sers dans l\'équipe de louange et je suis reconnaissant pour cette famille.', content_en: 'The youth group welcomed me with open arms when I arrived in Niamey. Today I serve on the worship team and I am grateful for this family.', content_ha: 'Ƙungiyar matasa ta karɓe ni da hannu biyu sa\'ad da na isa Niamey. Yau ina hidima a ƙungiyar yabo kuma ina godiya ga wannan iyali.', content_it: 'Il gruppo giovani mi ha accolto a braccia aperte quando sono arrivato a Niamey. Oggi servo nel team di lode e sono grato per questa famiglia.', role_fr: 'Membre depuis 2022', sort_order: 2 }
];

const schedules = [
  { day_fr: 'Dimanche', day_en: 'Sunday', day_ha: 'Lahadi', day_it: 'Domenica', time_start: '09h00', time_end: '12h00', label_fr: 'Culte Dominical', label_en: 'Sunday Worship', label_ha: 'Taron Lahadi', label_it: 'Culto Domenicale', sort_order: 0 },
  { day_fr: 'Mercredi', day_en: 'Wednesday', day_ha: 'Laraba', day_it: 'Mercoledì', time_start: '17h30', time_end: '19h00', label_fr: 'Étude Biblique', label_en: 'Bible Study', label_ha: 'Nazarin Littafi', label_it: 'Studio Biblico', sort_order: 1 },
  { day_fr: 'Vendredi', day_en: 'Friday', day_ha: 'Jumma\'a', day_it: 'Venerdì', time_start: '17h30', time_end: '19h00', label_fr: 'Intercession', label_en: 'Prayer Meeting', label_ha: 'Sallama', label_it: 'Intercessione', sort_order: 2 }
];

const ministries = [
  { name_fr: 'Louange & Adoration', name_en: 'Praise & Worship', name_ha: 'Yabo & Bauta', name_it: 'Lode & Adorazione', description_fr: 'Notre équipe de louange anime les cultes avec des chants inspirés et crée une atmosphère de présence de Dieu.', description_en: 'Our worship team leads services with inspired songs and creates an atmosphere of God\'s presence.', description_ha: 'Ƙungiyar yabonmu tana jagorantar taron gami da waƙoƙi masu wahayi kuma tana haifar da yanayin kasancewar Allah.', description_it: 'Il nostro team di lode guida i culti con canti ispirati e crea un\'atmosfera di presenza di Dio.', leader: 'Frère Elie Garba', sort_order: 0 },
  { name_fr: 'Enseignement', name_en: 'Teaching', name_ha: 'Koyarwa', name_it: 'Insegnamento', description_fr: 'Nous formons et équipons les membres à travers des études bibliques et des formations disciples.', description_en: 'We train and equip members through Bible studies and discipleship training.', description_ha: 'Muna horarwa da kuma ba da kayan aiki ga membobi ta hanyar nazarin Littafi Mai Tsarki da horar da almajirai.', description_it: 'Formiamo e equipaggiamo i membri attraverso studi biblici e formazione di discepolato.', leader: 'Frère Moise Moussa', sort_order: 1 },
  { name_fr: 'Intercession', name_en: 'Prayer', name_ha: 'Addu\'a', name_it: 'Intercessione', description_fr: 'Notre équipe d\'intercession prie régulièrement pour l\'église, la ville et les nations.', description_en: 'Our intercession team prays regularly for the church, the city, and the nations.', description_ha: 'Ƙungiyar mu na roƙo tana yin addu\'a akai-akai ga ikkilisiya, birni, da al\'ummai.', description_it: 'Il nostro team di intercessione prega regolarmente per la chiesa, la città e le nazioni.', leader: 'Soeur Esther Oumarou', sort_order: 2 },
  { name_fr: 'Jeunesse', name_en: 'Youth', name_ha: 'Matasa', name_it: 'Gioventù', description_fr: 'Un ministère dynamique pour les jeunes avec des activités, des retraites et des enseignements adaptés.', description_en: 'A dynamic youth ministry with activities, retreats, and adapted teachings.', description_ha: 'Ma\'aikatar matasa mai ƙarfi tare da ayyuka, gudun hijira, da koyarwar da ta dace.', description_it: 'Un ministero giovanile dinamico con attività, ritiri e insegnamenti adattati.', leader: 'Frère Jonas Boubacar', sort_order: 3 },
  { name_fr: 'Action Sociale', name_en: 'Social Action', name_ha: 'Aikin Jin Kai', name_it: 'Azione Sociale', description_fr: 'Nous servons notre communauté à travers des actions caritatives, des visites aux malades et de l\'aide aux démunis.', description_en: 'We serve our community through charitable actions, hospital visits, and help for the needy.', description_ha: 'Muna hidimar al\'ummarmu ta ayyukan agaji, ziyarar marasa lafiya, da taimakon mabukata.', description_it: 'Serviamo la nostra comunità attraverso azioni caritatevoli, visite agli ammalati e aiuto ai bisognosi.', leader: 'Soeur Marie Halidou', sort_order: 4 },
  { name_fr: 'Administration', name_en: 'Administration', name_ha: 'Gudanarwa', name_it: 'Amministrazione', description_fr: 'L\'administration gère les ressources de l\'église avec intégrité et transparence selon les principes bibliques.', description_en: 'The administration manages church resources with integrity and transparency according to biblical principles.', description_ha: 'Gudanarwa yana kula da albarkatun ikkilisiya da aminci da gaskiya bisa ga ka\'idojin Littafi Mai Tsarki.', description_it: 'L\'amministrazione gestisce le risorse della chiesa con integrità e trasparenza secondo i principi biblici.', leader: 'Frère Pierre Kalla', sort_order: 5 }
];

const doctrine = [
  { title_fr: 'La Bible', title_en: 'The Bible', title_ha: 'Littafi Mai Tsarki', title_it: 'La Bibbia', content_fr: 'Nous croyons que la Bible est la Parole inspirée de Dieu, infaillible et suffisante pour la foi et la conduite.', content_en: 'We believe the Bible is the inspired Word of God, inerrant and sufficient for faith and conduct.', content_ha: 'Mun gaskata Littafi Mai Tsarki Maganar Allah ne mai hure, marar kuskure kuma mai wadatar bangaskiya da hali.', content_it: 'Crediamo che la Bibbia sia la Parola ispirata di Dio, inerrante e sufficiente per la fede e la condotta.', sort_order: 0 },
  { title_fr: 'Le Salut', title_en: 'Salvation', title_ha: 'Ceto', title_it: 'La Salvezza', content_fr: 'Nous croyons que le salut est par grâce au moyen de la foi en Jésus-Christ seul, pour tous ceux qui se repentent et croient.', content_en: 'We believe salvation is by grace through faith in Jesus Christ alone, for all who repent and believe.', content_ha: 'Mun gaskata ceto ta wurin alheri ne ta wurin bangaskiya ga Yesu Kristi kaɗai, ga dukan waɗanda suka tuba kuma suka gaskata.', content_it: 'Crediamo che la salvezza sia per grazia mediante la fede in Gesù Cristo solo, per tutti coloro che si pentono e credono.', sort_order: 1 },
  { title_fr: 'Le Saint-Esprit', title_en: 'The Holy Spirit', title_ha: 'Ruhu Mai Tsarki', title_it: 'Lo Spirito Santo', content_fr: 'Nous croyons en la personne et l\'oeuvre du Saint-Esprit qui convainc, régénère, sanctifie et donne des dons spirituels.', content_en: 'We believe in the person and work of the Holy Spirit who convicts, regenerates, sanctifies, and gives spiritual gifts.', content_ha: 'Mun yi imani da mutum da aikin Ruhu Mai Tsarki wanda yake hukunta, sake haifuwa, tsarkakewa, da ba da kyautai na ruhaniya.', content_it: 'Crediamo nella persona e nell\'opera dello Spirito Santo che convince, rigenera, santifica e dona doni spirituali.', sort_order: 2 },
  { title_fr: 'L\'Église', title_en: 'The Church', title_ha: 'Ikilisiya', title_it: 'La Chiesa', content_fr: 'Nous croyons que l\'Église est le corps du Christ, une communauté de croyants appelée à l\'adoration, la communion, le service et l\'évangélisation.', content_en: 'We believe the Church is the body of Christ, a community of believers called to worship, fellowship, service, and evangelism.', content_ha: 'Mun gaskata Ikilisiya ita ce jikin Kristi, al\'umma ta masu bi da aka kira zuwa bauta, zumunci, hidima, da bishara.', content_it: 'Crediamo che la Chiesa sia il corpo di Cristo, una comunità di credenti chiamata all\'adorazione, comunione, servizio ed evangelizzazione.', sort_order: 3 }
];

const historyBlocks = [
  { section: 'Nos Débuts', content_fr: 'Fondée en 2008 par le Pasteur Amadou Issoufou, l\'AD Niamey 2000 a commencé avec seulement 15 membres se réunissant dans un petit local du quartier Yantala. Guidée par une vision d\'impact spirituel et social pour la ville de Niamey, l\'église a rapidement grandi.', content_en: 'Founded in 2008 by Pastor Amadou Issoufou, AD Niamey 2000 began with only 15 members meeting in a small room in the Yantala neighborhood. Guided by a vision of spiritual and social impact for the city of Niamey, the church quickly grew.', content_ha: 'An kafa ta a shekarar 2008 ta Fasto Amadou Issoufou, AD Niamey 2000 ta fara da membobi 15 kacal suna taruwa a wani karamin daki a unguwar Yantala. Da jagorancin hangen nesan tasiri na ruhaniya da zamantakewa ga birnin Niamey, ikkilisiya ta yi girma da sauri.', content_it: 'Fondata nel 2008 dal Pastore Amadou Issoufou, l\'AD Niamey 2000 è iniziata con solo 15 membri che si riunivano in una piccola stanza nel quartiere Yantala. Guidata da una visione di impatto spirituale e sociale per la città di Niamey, la chiesa è rapidamente cresciuta.', sort_order: 0 },
  { section: 'Notre Croissance', content_fr: 'Aujourd\'hui, AD Niamey 2000 compte plus de 120 membres actifs et continue de s\'étendre. Nous sommes affiliés aux Assemblées de Dieu du Niger (ADN) et nous nous engageons à prêcher l\'Évangile, former des disciples et servir notre communauté avec amour et compassion.', content_en: 'Today, AD Niamey 2000 has over 120 active members and continues to grow. We are affiliated with the Assemblies of God of Niger (ADN) and are committed to preaching the Gospel, making disciples, and serving our community with love and compassion.', content_ha: 'A yau, AD Niamey 2000 tana da membobi masu aiki sama da 120 kuma tana ci gaba da girma. Muna da alaƙa da Majalisun Allah na Nijar (ADN) kuma mun himmatu don wa\'azin Bishara, yin almajirai, da hidimar al\'ummarmu da ƙauna da tausayi.', content_it: 'Oggi, AD Niamey 2000 ha oltre 120 membri attivi e continua a crescere. Siamo affiliati alle Assemblee di Dio del Niger (ADN) e ci impegniamo a predicare il Vangelo, fare discepoli e servire la nostra comunità con amore e compassione.', sort_order: 1 }
];

const stats = [
  { label_fr: 'Membres actifs', label_en: 'Active Members', label_ha: 'Membobi Masu Aiki', label_it: 'Membri Attivi', value_text: '120', suffix: '+', sort_order: 0 },
  { label_fr: 'Années de service', label_en: 'Years of Service', label_ha: 'Shekarun Hidima', label_it: 'Anni di Servizio', value_text: '17', suffix: '+', sort_order: 1 },
  { label_fr: 'Cultes par semaine', label_en: 'Services per Week', label_ha: 'Taron a Mako', label_it: 'Culti a Settimana', value_text: '3', suffix: '', sort_order: 2 },
  { label_fr: 'Ministères', label_en: 'Ministries', label_ha: 'Ma\'aikata', label_it: 'Ministeri', value_text: '6', suffix: '', sort_order: 3 }
];

const contacts = [
  { type: 'address', value: 'Quartier Yantala Haut, Rue des Assemblées de Dieu, Niamey, Niger', label_fr: 'Adresse', label_en: 'Address', label_ha: 'Adireshi', label_it: 'Indirizzo', sort_order: 0 },
  { type: 'email', value: 'contact@adniamey2000.org', label_fr: 'Email', label_en: 'Email', label_ha: 'Imel', label_it: 'Email', sort_order: 1 },
  { type: 'phone', value: '+227 90 00 00 00', label_fr: 'Téléphone', label_en: 'Phone', label_ha: 'Waya', label_it: 'Telefono', sort_order: 2 }
];

const socialLinks = [
  { platform: 'Facebook', url: '#' },
  { platform: 'YouTube', url: '#' },
  { platform: 'WhatsApp', url: '#' }
];

const donationMethods = [
  { method: 'Orange Money', number: '+227 90 12 34 56' },
  { method: 'Wave', number: '+227 90 78 90 12' },
  { method: 'M-Pesa', number: '+227 90 45 67 89' }
];

const transaction = db.transaction(() => {
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

  const testimonialCount = db.prepare('SELECT COUNT(*) as count FROM testimonials').get();
  if (testimonialCount.count === 0) {
    for (const item of testimonials) seedTestimonials.run(item);
    console.log(`Seeded ${testimonials.length} testimonials`);
  } else {
    console.log('Testimonials table already has data, skipping');
  }

  const scheduleCount = db.prepare('SELECT COUNT(*) as count FROM schedules').get();
  if (scheduleCount.count === 0) {
    for (const item of schedules) seedSchedules.run(item);
    console.log(`Seeded ${schedules.length} schedules`);
  } else {
    console.log('Schedules table already has data, skipping');
  }

  const ministryCount = db.prepare('SELECT COUNT(*) as count FROM ministries').get();
  if (ministryCount.count === 0) {
    for (const item of ministries) seedMinistries.run(item);
    console.log(`Seeded ${ministries.length} ministries`);
  } else {
    console.log('Ministries table already has data, skipping');
  }

  const doctrineCount = db.prepare('SELECT COUNT(*) as count FROM doctrine').get();
  if (doctrineCount.count === 0) {
    for (const item of doctrine) seedDoctrine.run(item);
    console.log(`Seeded ${doctrine.length} doctrine items`);
  } else {
    console.log('Doctrine table already has data, skipping');
  }

  const historyCount = db.prepare('SELECT COUNT(*) as count FROM history_blocks').get();
  if (historyCount.count === 0) {
    for (const item of historyBlocks) seedHistory.run(item);
    console.log(`Seeded ${historyBlocks.length} history blocks`);
  } else {
    console.log('History blocks table already has data, skipping');
  }

  const statsCount = db.prepare('SELECT COUNT(*) as count FROM site_stats').get();
  if (statsCount.count === 0) {
    for (const item of stats) seedStats.run(item);
    console.log(`Seeded ${stats.length} stats`);
  } else {
    console.log('Site stats table already has data, skipping');
  }

  const contactCount = db.prepare('SELECT COUNT(*) as count FROM contact_details').get();
  if (contactCount.count === 0) {
    for (const item of contacts) seedContacts.run(item);
    console.log(`Seeded ${contacts.length} contacts`);
  } else {
    console.log('Contact details table already has data, skipping');
  }

  const socialCount = db.prepare('SELECT COUNT(*) as count FROM social_links').get();
  if (socialCount.count === 0) {
    for (const item of socialLinks) seedSocial.run(item);
    console.log(`Seeded ${socialLinks.length} social links`);
  } else {
    console.log('Social links table already has data, skipping');
  }

  const donationCount = db.prepare('SELECT COUNT(*) as count FROM donation_methods').get();
  if (donationCount.count === 0) {
    for (const item of donationMethods) seedDonations.run(item);
    console.log(`Seeded ${donationMethods.length} donation methods`);
  } else {
    console.log('Donation methods table already has data, skipping');
  }
});

transaction();
db.close();
console.log('Seed completed successfully');
