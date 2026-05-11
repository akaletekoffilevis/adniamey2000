/* ===== AD Niamey 2000 - Pastors Page ===== */

const PagePastors = (() => {
  function init() {
    loadPastors();
    loadMinistries();
  }

  function loadPastors() {
    const container = document.querySelector('[data-content="pastors"]');
    if (!container) return;

    container.innerHTML = '<div class="empty-state"><p>' + LanguageEngine.t('loading') + '</p></div>';

    ApiClient.getPastors()
      .then(pastors => {
        if (!pastors || pastors.length === 0) {
          container.innerHTML = '';
          return;
        }

        const senior = pastors.filter(p => p.role === 'senior');
        const others = pastors.filter(p => p.role !== 'senior');

        container.innerHTML = senior.map(p => renderPastorCard(p, true)).join('') +
          '<div class="grid-3" style="margin-top:2rem">' +
          others.map(p => renderPastorCard(p, false)).join('') +
          '</div>';
      })
      .catch(() => {
        container.innerHTML = '<div class="empty-state"><p>' + LanguageEngine.t('error_network') + '</p></div>';
      });
  }

  function renderPastorCard(p, isSenior) {
    const l = CoreUtils.lang();
    const bg = CoreUtils.gradients(p.gradient);
    const initials = p.initials || '🙏';
    const bio = p['bio_' + l] || p.bio_fr || '';
    const bio2 = p['bio2_' + l] || p.bio2_fr || '';
    const bio3 = p['bio3_' + l] || p.bio3_fr || '';

    if (isSenior) {
      return '<div class="card lead-pastor anim-hidden" style="max-width:48rem;margin:0 auto">' +
        '<div class="card-img" style="background:' + bg + ';height:14rem;display:flex;align-items:center;justify-content:center;font-size:4rem">' +
        '<span style="font-size:3.5rem;font-weight:700;color:rgba(255,255,255,0.3)">' + CoreUtils.esc(initials) + '</span></div>' +
        '<div class="card-body" style="text-align:center;padding:2rem">' +
        '<h2 style="font-family:serif;font-size:1.75rem;font-weight:700;color:var(--blue-900);margin-bottom:0.25rem">' + CoreUtils.esc(p.name) + '</h2>' +
        '<p style="font-size:0.9rem;color:var(--blue-600);font-weight:500;margin-bottom:1rem">' + CoreUtils.esc(p.role) + '</p>' +
        (bio ? '<p style="color:var(--gray-600);max-width:36rem;margin:0 auto 0.75rem">' + CoreUtils.esc(bio) + '</p>' : '') +
        (bio2 ? '<p style="color:var(--gray-500);font-size:0.9rem;max-width:36rem;margin:0 auto 0.5rem">' + CoreUtils.esc(bio2) + '</p>' : '') +
        (bio3 ? '<p style="color:var(--gray-500);font-size:0.9rem;max-width:36rem;margin:0 auto">' + CoreUtils.esc(bio3) + '</p>' : '') +
        '</div></div>';
    }

    return '<div class="card anim-hidden">' +
      '<div class="card-img" style="background:' + bg + ';display:flex;align-items:center;justify-content:center">' +
      '<span style="font-size:2.5rem;font-weight:700;color:rgba(255,255,255,0.3)">' + CoreUtils.esc(initials) + '</span></div>' +
      '<div class="card-body" style="text-align:center">' +
      '<h3 style="font-family:serif;font-size:1.125rem;font-weight:600;color:var(--blue-900);margin-bottom:0.25rem">' + CoreUtils.esc(p.name) + '</h3>' +
      '<p style="font-size:0.8rem;color:var(--blue-600);font-weight:500;margin-bottom:0.75rem">' + CoreUtils.esc(p.role) + '</p>' +
      (bio ? '<p style="color:var(--gray-600);font-size:0.85rem">' + CoreUtils.esc(bio) + '</p>' : '') +
      '</div></div>';
  }

  function loadMinistries() {
    const grid = document.querySelector('[data-content="ministries"]');
    if (!grid) return;

    ApiClient.getSiteData()
      .then(data => {
        if (!data.ministries || data.ministries.length === 0) {
          grid.innerHTML = '';
          return;
        }
        grid.innerHTML = data.ministries.map(m => {
          const l = CoreUtils.lang();
          return '<div class="card anim-hidden">' +
            '<div class="card-body">' +
            '<h3 style="font-family:serif;font-size:1.125rem;font-weight:600;color:var(--blue-900);margin-bottom:0.5rem">' +
            CoreUtils.esc(m['name_' + l] || m.name_fr) + '</h3>' +
            '<p style="color:var(--gray-600);font-size:0.875rem;margin-bottom:0.75rem">' +
            CoreUtils.esc(m['description_' + l] || m.description_fr) + '</p>' +
            (m.leader ? '<p style="font-size:0.8rem;color:var(--gray-500)"><strong>Responsable:</strong> ' + CoreUtils.esc(m.leader) + '</p>' : '') +
            '</div></div>';
        }).join('');
      })
      .catch(() => {});
  }

  document.addEventListener('languageChanged', () => {
    loadPastors();
    loadMinistries();
  });

  document.addEventListener('dataChanged', () => {
    loadPastors();
    loadMinistries();
  });

  return { init };
})();

window.PagePastors = PagePastors;
