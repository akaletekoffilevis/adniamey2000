const DICT = {
  'Culte Dominical': { en: 'Sunday Worship', ha: 'Taron Lahadi', it: 'Culto Domenicale' },
  'Étude Biblique': { en: 'Bible Study', ha: 'Nazarin Littafi', it: 'Studio Biblico' },
  'Intercession': { en: 'Prayer Meeting', ha: 'Sallama', it: 'Intercessione' },
  'Dimanche': { en: 'Sunday', ha: 'Lahadi', it: 'Domenica' },
  'Mercredi': { en: 'Wednesday', ha: 'Laraba', it: 'Mercoledì' },
  'Vendredi': { en: 'Friday', ha: 'Jumma\'a', it: 'Venerdì' },
  'Samedi': { en: 'Saturday', ha: 'Asabar', it: 'Sabato' },
  'Louange & Adoration': { en: 'Praise & Worship', ha: 'Yabo & Bauta', it: 'Lode & Adorazione' },
  'Enseignement': { en: 'Teaching', ha: 'Koyarwa', it: 'Insegnamento' },
  'Jeunesse': { en: 'Youth', ha: 'Matasa', it: 'Gioventù' },
  'Action Sociale': { en: 'Social Action', ha: 'Aikin Jin Kai', it: 'Azione Sociale' },
  'Administration': { en: 'Administration', ha: 'Gudanarwa', it: 'Amministrazione' },
  'Évangélisation': { en: 'Evangelism', ha: 'Bishara', it: 'Evangelizzazione' },
  'La Bible': { en: 'The Bible', ha: 'Littafi Mai Tsarki', it: 'La Bibbia' },
  'Le Salut': { en: 'Salvation', ha: 'Ceto', it: 'La Salvezza' },
  'Le Saint-Esprit': { en: 'The Holy Spirit', ha: 'Ruhu Mai Tsarki', it: 'Lo Spirito Santo' },
  "L'Église": { en: 'The Church', ha: 'Ikilisiya', it: 'La Chiesa' },
  'Notre Histoire': { en: 'Our History', ha: 'Tarihin Mu', it: 'La Nostra Storia' },
  'Notre Mission': { en: 'Our Mission', ha: 'Manufar Mu', it: 'La Nostra Missione' },
  "Notre Confession de Foi": { en: 'Our Statement of Faith', ha: 'Ikirarin Bangaskiyar Mu', it: 'La Nostra Confessione di Fede' },
  'Notre Équipe Pastorale': { en: 'Our Pastoral Team', ha: 'Tawagar Fastoci', it: 'Il Nostro Team Pastorale' },
  'Pasteur Principal': { en: 'Senior Pastor', ha: 'Babban Fasto', it: 'Pastore Principale' },
  'Pasteur Associé': { en: 'Associate Pastor', ha: 'Fasto Mataimaki', it: 'Pastore Associato' },
  'Pasteur': { en: 'Pastor', ha: 'Fasto', it: 'Pastore' },
  'des Jeunes': { en: 'Youth', ha: 'Matasa', it: 'dei Giovani' },
  'Frère': { en: 'Brother', ha: 'Dan\'uwa', it: 'Fratello' },
  'Soeur': { en: 'Sister', ha: '\'Yar\'uwa', it: 'Sorella' },
  'Cultes': { en: 'Worship Services', ha: 'Taron Bauta', it: 'Culti' },
  'Baptêmes': { en: 'Baptisms', ha: 'Baftisma', it: 'Battesimi' },
  'Événements': { en: 'Events', ha: 'Abubuwa', it: 'Eventi' },
  'Membres actifs': { en: 'Active Members', ha: 'Membobi Masu Aiki', it: 'Membri Attivi' },
  'Années de service': { en: 'Years of Service', ha: 'Shekarun Hidima', it: 'Anni di Servizio' },
  'Cultes par semaine': { en: 'Services per Week', ha: 'Taron a Mako', it: 'Culti a Settimana' },
  'Ministères': { en: 'Ministries', ha: 'Ma\'aikata', it: 'Ministeri' },
  'Orange Money': { en: 'Orange Money', ha: 'Orange Money', it: 'Orange Money' },
  'Wave': { en: 'Wave', ha: 'Wave', it: 'Wave' },
  'M-Pesa': { en: 'M-Pesa', ha: 'M-Pesa', it: 'M-Pesa' },
  'Information générale': { en: 'General Inquiry', ha: 'Tambaya Gabaɗaya', it: 'Informazione Generale' },
  'Demande de prière': { en: 'Prayer Request', ha: 'Bukatar Addu\'a', it: 'Richiesta di Preghiera' },
  'Inscription baptême': { en: 'Baptism Registration', ha: 'Rijistar Baftisma', it: 'Registrazione Battesimo' },
  'Don / Offrande': { en: 'Donation / Offering', ha: 'Kyauta / Sadaka', it: 'Donazione / Offerta' },
  'Autre': { en: 'Other', ha: 'Wani', it: 'Altro' },
  'Accueil': { en: 'Home', ha: 'Gida', it: 'Home' },
  'À propos': { en: 'About', ha: 'Game da', it: 'Chi siamo' },
  'Ministère': { en: 'Ministry', ha: 'Ma\'aiki', it: 'Ministero' },
  'Sermons': { en: 'Sermons', ha: 'Wa\'azi', it: 'Sermoni' },
  'Galerie': { en: 'Gallery', ha: 'Hotuna', it: 'Galleria' },
  'Blog': { en: 'Blog', ha: 'Bulogi', it: 'Blog' },
  'Contact': { en: 'Contact', ha: 'Tuntuɓi', it: 'Contatto' },
  'Faire un don': { en: 'Donate', ha: 'Bayar da Kyauta', it: 'Dona' },
  'Liens rapides': { en: 'Quick Links', ha: 'Hanyoyi Masu Sauri', it: 'Link Veloci' },
  'Horaires': { en: 'Schedule', ha: 'Lokaci', it: 'Orari' },
  'Mentions légales': { en: 'Legal Notice', ha: 'Bayanin Doka', it: 'Note Legali' },
  'Politique de confidentialité': { en: 'Privacy Policy', ha: 'Manufar Sirri', it: 'Politica sulla Privacy' },
  'Tous droits réservés': { en: 'All rights reserved', ha: 'Duk haƙƙi an kiyaye', it: 'Tutti i diritti riservati' },
};

function translateText(text, fromLang, toLang) {
  if (!text || fromLang === toLang) return text;
  if (DICT[text] && DICT[text][toLang]) return DICT[text][toLang];
  return text;
}

function translateObj(obj, fromLang, toLang) {
  if (!obj || typeof obj !== 'object') return obj;
  var result = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var suffix = '_' + toLang;
      var fromSuffix = '_' + fromLang;
      if (key.endsWith(fromSuffix)) {
        var baseKey = key.slice(0, -3);
        var translated = translateText(obj[key], fromLang, toLang);
        result[baseKey + suffix] = translated;
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

function fillAllLangs(obj) {
  var langs = ['fr', 'en', 'ha', 'it'];
  var fields = {};
  var rawFields = {};
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    var matched = false;
    for (var i = 0; i < langs.length; i++) {
      var suffix = '_' + langs[i];
      if (key.endsWith(suffix)) {
        var baseKey = key.slice(0, -3);
        if (!fields[baseKey]) fields[baseKey] = {};
        fields[baseKey][langs[i]] = obj[key];
        matched = true;
        break;
      }
    }
    if (!matched) {
      rawFields[key] = obj[key];
    }
  }
  var result = {};
  for (var baseKey in fields) {
    if (fields.hasOwnProperty(baseKey)) {
      var frVal = fields[baseKey]['fr'] || '';
      for (var j = 0; j < langs.length; j++) {
        var lang = langs[j];
        var val = fields[baseKey][lang];
        if (!val && frVal) {
          val = translateText(frVal, 'fr', lang);
        }
        result[baseKey + '_' + lang] = val || frVal || '';
      }
    }
  }
  for (var rawKey in rawFields) {
    if (rawFields.hasOwnProperty(rawKey)) {
      result[rawKey] = rawFields[rawKey];
    }
  }
  return result;
}

module.exports = { translateText, translateObj, fillAllLangs };
