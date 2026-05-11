/* ===== AD Niamey 2000 - Home Page ===== */

const PageHome = (() => {
  let siteData = null;

  function init() {
    loadSiteData();
  }

  function loadSiteData() {
    ApiClient.getSiteData()
      .then(data => {
        siteData = data;
        renderSchedules(data.schedules);
        renderTestimonials(data.testimonials);
        renderStats(data.stats);
        renderHistory(data.history);
        renderDoctrine(data.doctrine);
        renderMinistries(data.ministries);
        renderDonations(data.donations);
        updateSettings(data.settings);
        updateSocialLinks(data.social);
        updateContacts(data.contacts);
        updateJsonLd(data);
      })
      .catch(() => {
        // Handle error silently - skeleton loading handles it
      });
  }

  function renderSchedules(schedules) {
    const grid = document.querySelector('.grid-3[data-content="schedules"]');
    if (!grid || !schedules) return;
    grid.innerHTML = schedules.map(s => {
      const l = CoreUtils.lang();
      return '<div class="card card-horaire anim-hidden">' +
        '<div class="horaire-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg></div>' +
        '<div class="horaire-name">' + CoreUtils.esc(s['day_' + l] || s.day_fr) + '</div>' +
        '<div class="horaire-day">' + CoreUtils.esc(s['label_' + l] || s.label_fr) + '</div>' +
        '<div class="horaire-time">' + CoreUtils.esc(s.time_start) + ' — ' + CoreUtils.esc(s.time_end) + '</div>' +
        '</div>';
    }).join('');
  }

  function renderTestimonials(testimonials) {
    const grid = document.querySelector('[data-content="testimonials"]');
    if (!grid || !testimonials) return;
    if (testimonials.length === 0) {
      grid.innerHTML = '<div class="empty-state"><p>' + LanguageEngine.t('empty_testimonials') + '</p></div>';
      return;
    }
    grid.innerHTML = testimonials.map(t => {
      const l = CoreUtils.lang();
      return '<div class="card anim-hidden" style="padding:1.5rem;text-align:center">' +
        '<div style="font-size:2.5rem;color:var(--blue-200);margin-bottom:0.75rem">❝</div>' +
        '<p style="color:var(--gray-600);font-style:italic;margin-bottom:1rem;line-height:1.6">' + CoreUtils.esc(t['content_' + l] || t.content_fr) + '</p>' +
        '<div style="font-weight:600;color:var(--blue-900)">' + CoreUtils.esc(t.author) + '</div>' +
        '<div style="font-size:0.8rem;color:var(--gray-500)">' + CoreUtils.esc(t['role_' + l] || t.role_fr) + '</div>' +
        '</div>';
    }).join('');
  }

  function renderStats(stats) {
    const grid = document.querySelector('[data-content="stats"]');
    if (!grid || !stats) return;
    grid.innerHTML = stats.map(s => {
      const l = CoreUtils.lang();
      return '<div class="anim-hidden" style="text-align:center;padding:0.5rem">' +
        '<div class="stat-number" data-count="' + CoreUtils.esc(s.value_text) + '">' + CoreUtils.esc(s.value_text) + CoreUtils.esc(s.suffix || '') + '</div>' +
        '<div class="stat-label">' + CoreUtils.esc(s['label_' + l] || s.label_fr) + '</div>' +
        '</div>';
    }).join('');
  }

  function renderHistory(history) {
    const container = document.querySelector('[data-content="history"]');
    if (!container || !history) return;
    container.innerHTML = history.map(h => {
      const l = CoreUtils.lang();
      return '<div class="anim-hidden" style="margin-bottom:2rem">' +
        '<h3 style="font-family:serif;font-size:1.25rem;font-weight:600;color:var(--blue-900);margin-bottom:0.75rem">' + CoreUtils.esc(h.section) + '</h3>' +
        '<p style="color:var(--gray-600);line-height:1.7">' + CoreUtils.esc(h['content_' + l] || h.content_fr) + '</p>' +
        '</div>';
    }).join('');
  }

  function renderDoctrine(doctrine) {
    const grid = document.querySelector('[data-content="doctrine"]');
    if (!grid || !doctrine) return;
    grid.innerHTML = doctrine.map(d => {
      const l = CoreUtils.lang();
      return '<div class="doctrine-card anim-hidden">' +
        '<div class="doctrine-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg></div>' +
        '<h3>' + CoreUtils.esc(d['title_' + l] || d.title_fr) + '</h3>' +
        '<p>' + CoreUtils.esc(d['content_' + l] || d.content_fr) + '</p>' +
        '</div>';
    }).join('');
  }

  function renderMinistries(ministries) {
    const grid = document.querySelector('[data-content="ministries"]');
    if (!grid || !ministries) return;
    grid.innerHTML = ministries.map(m => {
      const l = CoreUtils.lang();
      return '<div class="card anim-hidden">' +
        '<div class="card-body">' +
        '<h3 style="font-family:serif;font-size:1.125rem;font-weight:600;color:var(--blue-900);margin-bottom:0.5rem">' + CoreUtils.esc(m['name_' + l] || m.name_fr) + '</h3>' +
        '<p style="color:var(--gray-600);font-size:0.875rem;margin-bottom:0.75rem">' + CoreUtils.esc(m['description_' + l] || m.description_fr) + '</p>' +
        (m.leader ? '<p style="font-size:0.8rem;color:var(--gray-500)"><strong>' + LanguageEngine.t('contact_form_name') + ':</strong> ' + CoreUtils.esc(m.leader) + '</p>' : '') +
        '</div></div>';
    }).join('');
  }

  function renderDonations(donations) {
    const grid = document.querySelector('[data-content="donations"]');
    if (!grid || !donations) return;
    grid.innerHTML = donations.map(d => {
      return '<div class="don-card anim-hidden">' +
        '<div class="don-icon"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg></div>' +
        '<h3>' + CoreUtils.esc(d.method) + '</h3>' +
        '<p>' + CoreUtils.esc(d.number) + '</p>' +
        '</div>';
    }).join('');
  }

  function updateSettings(settings) {
    if (!settings) return;
    Object.keys(settings).forEach(key => {
      const el = document.querySelector('[data-setting="' + key + '"]');
      if (el) {
        if (el.tagName === 'META') el.setAttribute('content', settings[key]);
        else el.textContent = settings[key];
      }
    });
  }

  function updateSocialLinks(social) {
    if (!social) return;
    document.querySelectorAll('[data-social]').forEach(el => {
      const platform = el.getAttribute('data-social');
      const found = social.find(s => s.platform && s.platform.toLowerCase() === platform.toLowerCase());
      if (found) {
        el.setAttribute('href', found.url);
        if (found.icon_svg && el.querySelector('.social-icon')) {
          el.querySelector('.social-icon').innerHTML = found.icon_svg;
        }
      }
    });
  }

  function updateContacts(contacts) {
    if (!contacts) return;
    contacts.forEach(c => {
      const el = document.querySelector('[data-contact="' + c.type + '"]');
      if (el) {
        if (c.type === 'email') el.setAttribute('href', 'mailto:' + c.value);
        else if (c.type === 'phone') el.setAttribute('href', 'tel:' + c.value);
        el.textContent = c.value;
      }
    });
  }

  function updateJsonLd(data) {
    const script = document.getElementById('dynamic-org-schema');
    if (!script) return;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Church',
      name: 'AD Niamey 2000',
      description: 'Assemblée de Dieu Temple de la Résurrection de Jésus-Christ',
      url: 'https://adniamey2000.org',
      foundingDate: '2008',
      founder: { '@type': 'Person', name: 'Pasteur Amadou Issoufou' },
      address: { '@type': 'PostalAddress', addressLocality: 'Niamey', addressCountry: 'NE' },
    });
  }

  // Re-load on language change
  document.addEventListener('languageChanged', () => {
    if (siteData) {
      renderSchedules(siteData.schedules);
      renderTestimonials(siteData.testimonials);
      renderStats(siteData.stats);
      renderHistory(siteData.history);
      renderDoctrine(siteData.doctrine);
      renderMinistries(siteData.ministries);
    }
  });

  // Re-load on data change
  document.addEventListener('dataChanged', () => {
    loadSiteData();
  });

  return { init, loadSiteData };
})();

window.PageHome = PageHome;
