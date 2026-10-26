/* =====================================================================
   app.js  -  the PROGRAM that builds every page of the website
   ---------------------------------------------------------------------
   What this file does:
     1. Knows the list of all 26 chapters.
     2. Builds the home page, chapter pages, calculators and favorites page.
     3. Runs the search box.
     4. Remembers your favorites (saved inside your Chrome browser).
   The chapter TEXT is NOT in this file. It is in ch01.js, ch02.js ...
   ===================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. THE CHAPTER LIST
     "group" is a number that points to the GROUPS list below.
     A chapter shows "Ready" once its file (chNN.js) exists and is
     linked in index.html. Otherwise it shows "Coming soon".
     ------------------------------------------------------------------ */
  var GROUPS = ['Foundations', 'Strength of Materials', 'Machine Elements', 'Design Practice', 'Specialised Topics'];

  var CHAPTER_LIST = [
    { n: 1,  group: 0, title: 'Engineering Mathematics and Unit Conversion' },
    { n: 2,  group: 0, title: 'Engineering Mechanics and Statics' },
    { n: 3,  group: 1, title: 'Strength of Materials' },
    { n: 4,  group: 1, title: 'Stress, Strain, and Elasticity' },
    { n: 5,  group: 1, title: 'Bending Moment and Shear Force' },
    { n: 6,  group: 1, title: 'Torsion and Shaft Design' },
    { n: 7,  group: 1, title: 'Beam Design and Deflection' },
    { n: 8,  group: 2, title: 'Mechanical Power Transmission' },
    { n: 9,  group: 2, title: 'Spur, Helical, Bevel, and Worm Gears' },
    { n: 10, group: 2, title: 'Belt, Chain, and Pulley Design' },
    { n: 11, group: 2, title: 'Bearings and Bearing Life' },
    { n: 12, group: 2, title: 'Keys, Splines, Couplings, and Shafts' },
    { n: 13, group: 2, title: 'Bolts, Nuts, Screws, and Thread Design' },
    { n: 14, group: 2, title: 'Springs and Spring Design' },
    { n: 15, group: 2, title: 'Welded and Riveted Joints' },
    { n: 16, group: 3, title: 'Fits, Tolerances, and GD&T' },
    { n: 17, group: 3, title: 'Sheet Metal Design' },
    { n: 18, group: 3, title: 'Material Selection and Mechanical Properties' },
    { n: 19, group: 3, title: 'Fatigue, Failure Theories, and Factor of Safety' },
    { n: 20, group: 3, title: 'Fasteners and Joint Strength' },
    { n: 21, group: 4, title: 'Pressure Vessels and Thin-Walled Cylinders' },
    { n: 22, group: 4, title: 'Thermal Expansion and Heat Transfer Basics' },
    { n: 23, group: 4, title: 'Flywheels, Brakes, Clutches, and Mechanisms' },
    { n: 24, group: 3, title: 'Design for Manufacturing and Assembly (DFM/DFA)' },
    { n: 25, group: 3, title: 'Engineering Drawing and Manufacturing Calculations' },
    { n: 26, group: 4, title: 'SolidWorks Design Applications and Practical Case Studies' }
  ];

  /* Chapter files add themselves to window.CHAPTERS (see ch01.js) */
  var CHAPTERS = window.CHAPTERS || {};

  /* ------------------------------------------------------------------
     2. SMALL HELPER FUNCTIONS
     ------------------------------------------------------------------ */
  var main = document.getElementById('main');
  var sidebar = document.getElementById('sidebar');
  var searchBox = document.getElementById('searchBox');
  var searchResults = document.getElementById('searchResults');
  var menuBtn = document.getElementById('menuBtn');
  var scrim = document.getElementById('scrim');
  var printBtn = document.getElementById('printBtn');

  /* Make text safe to place inside HTML */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /* Remove HTML tags (used for search text) */
  function stripTags(s) {
    return String(s).replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ');
  }
  function pad(n) { return n < 10 ? '0' + n : String(n); }

  /* Turn an array of strings into <ul><li>..</li></ul> */
  function list(items, cls) {
    if (!items || !items.length) return '';
    return '<ul' + (cls ? ' class="' + cls + '"' : '') + '>' +
      items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>';
  }
  function olist(items) {
    return '<ol>' + items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ol>';
  }

  /* Number formatting for calculators */
  function fmt(x, digits) {
    if (!isFinite(x)) { return '-'; }
    var a = Math.abs(x);
    if (a !== 0 && (a >= 1e7 || a < 1e-3)) { return x.toExponential(3); }
    return String(Number(x.toPrecision(digits || 5)));
  }

  /* ------------------------------------------------------------------
     3. FAVORITES (bookmarks) - stored in the browser with localStorage
     ids look like  "ch:3"  (a chapter)  or  "f:3:0"  (formula 0 of chapter 3)
     ------------------------------------------------------------------ */
  var favs = [];
  try { favs = JSON.parse(localStorage.getItem('mdk_favs') || '[]'); } catch (e) { favs = []; }

  function saveFavs() {
    try { localStorage.setItem('mdk_favs', JSON.stringify(favs)); } catch (e) { /* ignore */ }
  }
  function isFav(id) { return favs.indexOf(id) > -1; }
  function toggleFav(id) {
    var i = favs.indexOf(id);
    if (i > -1) { favs.splice(i, 1); } else { favs.push(id); }
    saveFavs();
  }
  function starBtn(id, label) {
    return '<button type="button" class="star" data-fav="' + id + '" aria-pressed="false" ' +
      'aria-label="Favorite: ' + esc(label) + '" title="Add or remove favorite">&#9734;</button>';
  }
  /* Update every star on the page to match the saved list */
  function refreshStars() {
    var stars = document.querySelectorAll('[data-fav]');
    for (var i = 0; i < stars.length; i++) {
      var on = isFav(stars[i].getAttribute('data-fav'));
      stars[i].classList.toggle('on', on);
      stars[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      stars[i].innerHTML = on ? '&#9733;' : '&#9734;';
    }
  }

  /* ------------------------------------------------------------------
     4. SIDEBAR (chapter list)
     ------------------------------------------------------------------ */
  function renderSidebar(activeKey) {
    var h = '<div class="side-inner">';
    h += '<ul>';
    h += '<li><a class="side-link' + (activeKey === 'home' ? ' active' : '') + '" href="#/"><span class="num">&#8962;</span><span class="ttl">Home / All chapters</span></a></li>';
    h += '<li><a class="side-link' + (activeKey === 'calc' ? ' active' : '') + '" href="#/calc"><span class="num">&#8801;</span><span class="ttl">Calculators</span></a></li>';
    h += '<li><a class="side-link' + (activeKey === 'fav' ? ' active' : '') + '" href="#/fav"><span class="num">&#9733;</span><span class="ttl">My favorites</span></a></li>';
    h += '</ul>';
    GROUPS.forEach(function (g, gi) {
      h += '<h2 class="side-group">' + g + '</h2><ul>';
      CHAPTER_LIST.forEach(function (c) {
        if (c.group !== gi) { return; }
        var ready = !!CHAPTERS[c.n];
        h += '<li><a class="side-link' + (activeKey === 'ch:' + c.n ? ' active' : '') + (ready ? '' : ' soon') +
          '" href="#/ch/' + c.n + '"><span class="num">' + c.n + '</span><span class="ttl">' + esc(c.title) + '</span>' +
          (ready ? '' : '<em>Soon</em>') + '</a></li>';
      });
      h += '</ul>';
    });
    h += '</div>';
    sidebar.innerHTML = h;
  }

  function openSidebar(open) {
    sidebar.classList.toggle('open', open);
    scrim.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  menuBtn.addEventListener('click', function () { openSidebar(!sidebar.classList.contains('open')); });
  scrim.addEventListener('click', function () { openSidebar(false); });

  /* ------------------------------------------------------------------
     5. HOME PAGE  (hero + filter chips + chapter cards)
     ------------------------------------------------------------------ */
  var homeFilter = 'all';

  function readyCount() {
    var n = 0;
    CHAPTER_LIST.forEach(function (c) { if (CHAPTERS[c.n]) { n++; } });
    return n;
  }
  function formulaCount() {
    var n = 0;
    CHAPTER_LIST.forEach(function (c) { if (CHAPTERS[c.n]) { n += (CHAPTERS[c.n].formulas || []).length; } });
    return n;
  }

  function renderHome() {
    var h = '';
    h += '<section class="hero"><h1>Mechanical design notes you can <span>calculate with</span></h1>' +
      '<p>A handbook-style knowledge platform for CAD designers, design engineers, diploma students and interview candidates. ' +
      'Every chapter has formulas with units, solved examples, interview questions and practice problems.</p>' +
      '<div class="hero-actions"><a class="btn btn-or" href="#/ch/1">Start with Chapter 1</a>' +
      '<a class="btn btn-ghost" href="#/calc">Open calculators</a></div>' +
      '<ul class="stats"><li><strong>' + readyCount() + ' / ' + CHAPTER_LIST.length + '</strong>chapters ready</li>' +
      '<li><strong>' + formulaCount() + '</strong>formula cards</li>' +
      '<li><strong>SI</strong>units throughout</li></ul></section>';

    h += '<div class="section-title"><h2>Browse chapters</h2></div>';
    h += '<div class="chips" id="chips" role="group" aria-label="Filter chapters"></div>';
    h += '<div class="grid" id="cardGrid"></div>';
    main.innerHTML = h;
    renderChips();
    renderCards();
  }

  function renderChips() {
    var items = [['all', 'All'], ['ready', 'Ready to study'], ['fav', '★ Favorites']];
    GROUPS.forEach(function (g, i) { items.push(['g' + i, g]); });
    var box = document.getElementById('chips');
    box.innerHTML = items.map(function (it) {
      return '<button type="button" class="chip" data-filter="' + it[0] + '" aria-pressed="' + (homeFilter === it[0]) + '">' + esc(it[1]) + '</button>';
    }).join('');
  }

  function renderCards() {
    var grid = document.getElementById('cardGrid');
    var shown = CHAPTER_LIST.filter(function (c) {
      if (homeFilter === 'all') { return true; }
      if (homeFilter === 'ready') { return !!CHAPTERS[c.n]; }
      if (homeFilter === 'fav') { return isFav('ch:' + c.n); }
      return ('g' + c.group) === homeFilter;
    });
    if (!shown.length) {
      grid.innerHTML = '<p class="empty-note">Nothing here yet. Open a chapter and press the star to add it to your favorites.</p>';
      return;
    }
    grid.innerHTML = shown.map(function (c) {
      var ready = !!CHAPTERS[c.n];
      return '<div style="position:relative">' + starBtnCard(c) +
        '<a class="ch-card' + (ready ? '' : ' is-soon') + '" href="#/ch/' + c.n + '">' +
        '<span class="big">' + pad(c.n) + '</span><h3>' + esc(c.title) + '</h3>' +
        '<span class="grp">' + GROUPS[c.group] + '</span>' +
        '<span class="tag ' + (ready ? 'ready' : 'soon') + '">' + (ready ? 'Ready' : 'Coming soon') + '</span></a></div>';
    }).join('');
    refreshStars();
  }
  /* star placed on top of a card (positioned by inline style) */
  function starBtnCard(c) {
    return '<span style="position:absolute;top:12px;right:12px;z-index:2">' + starBtn('ch:' + c.n, 'Chapter ' + c.n + ' ' + c.title) + '</span>';
  }

  /* ------------------------------------------------------------------
     6. CHAPTER PAGE
     Builds the 12 headings from the data in chNN.js.
     (They cover all 16 required items - see the guide.)
     ------------------------------------------------------------------ */
  function renderChapter(n) {
    var c = CHAPTER_LIST[n - 1];
    if (!c) { renderNotFound(); return; }
    var d = CHAPTERS[n];

    var h = '<article class="chapter">';
    h += '<p class="crumb"><a href="#/">Home</a> &rsaquo; ' + GROUPS[c.group] + ' &rsaquo; Chapter ' + n + '</p>';
    h += '<div class="chap-title-row"><span class="chap-num">' + pad(n) + '</span><h1>' + esc(c.title) + '</h1></div>';
    h += '<div class="chap-actions">' + starBtn('ch:' + n, 'Chapter ' + n + ' ' + c.title) +
      '<span>Save chapter</span> <button type="button" class="btn-sm" data-print="1">Print / Save as PDF</button></div>';

    if (!d) {
      h += '<div class="soon-box"><h2>Coming soon</h2><p>This chapter has not been written yet. ' +
        'It will follow the same format as the finished chapters: definition, formulas, solved examples, interview questions and practice problems.</p>' +
        '<a class="btn btn-or" href="#/">Back to all chapters</a></div>';
      h += pager(n) + '</article>';
      main.innerHTML = h;
      return;
    }

    /* ---- build the sections one by one ---- */
    var sections = [];   /* each item: [id, title, bodyHTML] */

    sections.push(['sec-def', 'Topic definition', '<p>' + d.def + '</p>']);
    sections.push(['sec-purpose', 'Engineering purpose and applications', list(d.purpose, 'bullets')]);

    /* terminology */
    var termHTML = '<dl class="terms">' + (d.terms || []).map(function (t) {
      return '<div><dt>' + t[0] + '</dt><dd>' + t[1] + '</dd></div>';
    }).join('') + '</dl>';
    sections.push(['sec-terms', 'Important terminology', termHTML]);

    /* units */
    if (d.units) {
      var u = d.units, uh = '';
      if (u.intro) { uh += '<p>' + u.intro + '</p>'; }
      uh += '<div class="table-wrap"><table><thead><tr>' + u.head.map(function (x) { return '<th>' + x + '</th>'; }).join('') +
        '</tr></thead><tbody>' + u.rows.map(function (r) {
          return '<tr>' + r.map(function (x) { return '<td>' + x + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>';
      if (u.notes) { uh += list(u.notes, 'bullets'); }
      sections.push(['sec-units', 'SI units and unit conversions', uh]);
    }

    /* formula cards */
    var fh = '';
    (d.formulas || []).forEach(function (f, i) {
      var fid = 'f-' + n + '-' + i;
      fh += '<div class="formula-card" id="' + fid + '"><div class="fc-head"><h3>' + f.name + '</h3>' +
        starBtn('f:' + n + ':' + i, f.name) + '</div>' +
        '<div class="eq">' + f.eq + '</div>' + (f.note ? '<p class="eq-note">' + f.note + '</p>' : '') +
        '<div class="table-wrap"><table class="sym"><thead><tr><th>Symbol</th><th>Meaning</th><th>SI unit</th></tr></thead><tbody>' +
        f.symbols.map(function (s) { return '<tr><td>' + s[0] + '</td><td>' + s[1] + '</td><td>' + s[2] + '</td></tr>'; }).join('') +
        '</tbody></table></div>' +
        '<p class="assume">Assumptions and limitations</p>' + list(f.assumptions) + '</div>';
    });
    sections.push(['sec-formulas', 'Formulas, symbols, units and assumptions', fh]);

    /* diagram */
    if (d.diagram) {
      sections.push(['sec-diagram', 'Engineering diagram',
        '<figure class="diagram">' + d.diagram.svg + '<figcaption>' + d.diagram.caption + '</figcaption></figure>']);
    }
    /* reference table */
    if (d.reference) {
      var r = d.reference;
      sections.push(['sec-ref', r.title || 'Reference data',
        (r.intro ? '<p>' + r.intro + '</p>' : '') +
        '<div class="table-wrap"><table><thead><tr>' + r.head.map(function (x) { return '<th>' + x + '</th>'; }).join('') +
        '</tr></thead><tbody>' + r.rows.map(function (row) {
          return '<tr>' + row.map(function (x) { return '<td>' + x + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>' + (r.note ? '<p class="eq-note">' + r.note + '</p>' : '')]);
    }
    /* derivation */
    if (d.derivation) {
      sections.push(['sec-derivation', 'Step-by-step derivation: ' + d.derivation.title,
        '<div class="derivation">' + olist(d.derivation.steps) + '</div>']);
    }

    /* worked examples */
    var eh = '';
    (d.examples || []).forEach(function (e, i) {
      eh += '<article class="example" id="ex-' + n + '-' + i + '"><h3><span class="badge">Example ' + (i + 1) + '</span>' + e.title + '</h3>' +
        '<div class="ex-row"><h4>1. Given data</h4>' + list(e.given) + '</div>' +
        '<div class="ex-row"><h4>2. Convert to consistent units</h4>' + list(e.convert) + '</div>' +
        '<div class="ex-row"><h4>3. Required result</h4><p>' + e.find + '</p></div>' +
        '<div class="ex-row"><h4>4. Formula selected</h4><div class="eq small">' + e.formula + '</div></div>' +
        '<div class="ex-row"><h4>5. Substitution and calculation</h4>' + olist(e.steps) + '</div>' +
        '<div class="ex-row result"><h4>6. Final answer</h4><p>' + e.result + '</p></div>' +
        '<div class="ex-row"><h4>7. Engineering interpretation</h4><p>' + e.interpretation + '</p></div></article>';
    });
    sections.push(['sec-examples', 'Solved numerical examples', eh]);

    sections.push(['sec-application', 'Practical industrial application', list(d.application, 'bullets')]);
    sections.push(['sec-mistakes', 'Common mistakes and design warnings', list(d.mistakes, 'warn')]);
    sections.push(['sec-interview', 'Interview questions with answers', qaList(d.interview)]);
    sections.push(['sec-practice', 'Practice problems with answers', '<p class="eq-note">Try each problem on paper first, then click it to reveal the answer.</p>' + qaList(d.practice)]);

    /* ---- assemble: table of contents first, then the sections ---- */
    var toc = '<nav class="toc" aria-label="Table of contents"><h2>In this chapter</h2><ol>';
    sections.forEach(function (s, i) {
      toc += '<li><a href="#/ch/' + n + '/' + s[0] + '">' + (i + 1) + '. ' + s[1] + '</a></li>';
    });
    toc += '</ol></nav>';
    h += toc;

    sections.forEach(function (s, i) {
      h += '<section class="chap-section" id="' + s[0] + '"><h2><span class="sn">' + (i + 1) + '</span>' + s[1] + '</h2>' + s[2] + '</section>';
    });
    h += pager(n) + '</article>';
    main.innerHTML = h;
  }

  /* question / answer list using <details> (click to reveal) */
  function qaList(items) {
    if (!items || !items.length) { return ''; }
    return items.map(function (qa) {
      return '<details class="qa"><summary>' + qa[0] + '</summary><div class="ans"><p>' + qa[1] + '</p></div></details>';
    }).join('');
  }

  /* Previous / Next chapter buttons */
  function pager(n) {
    var h = '<nav class="pager" aria-label="Chapter navigation">';
    if (n > 1) {
      var p = CHAPTER_LIST[n - 2];
      h += '<a class="prev" href="#/ch/' + p.n + '"><small>&larr; Previous chapter</small>' + p.n + '. ' + esc(p.title) + '</a>';
    }
    if (n < CHAPTER_LIST.length) {
      var x = CHAPTER_LIST[n];
      h += '<a class="next" href="#/ch/' + x.n + '"><small>Next chapter &rarr;</small>' + x.n + '. ' + esc(x.title) + '</a>';
    }
    return h + '</nav>';
  }

  function renderNotFound() {
    main.innerHTML = '<section class="page"><h1>Page not found</h1><p><a href="#/">Go back to the home page</a></p></section>';
  }

  /* ------------------------------------------------------------------
     7. FAVORITES PAGE
     ------------------------------------------------------------------ */
  function renderFavs() {
    var chItems = '', fItems = '';
    favs.forEach(function (id) {
      var p = id.split(':');
      if (p[0] === 'ch') {
        var c = CHAPTER_LIST[parseInt(p[1], 10) - 1];
        if (c) {
          chItems += '<li><a href="#/ch/' + c.n + '">Chapter ' + c.n + ': ' + esc(c.title) + '</a>' + starBtn(id, c.title) + '</li>';
        }
      } else if (p[0] === 'f') {
        var d = CHAPTERS[parseInt(p[1], 10)];
        var f = d && d.formulas ? d.formulas[parseInt(p[2], 10)] : null;
        if (f) {
          fItems += '<li><a href="#/ch/' + p[1] + '/f-' + p[1] + '-' + p[2] + '">' + stripTags(f.name) + ' <small>(Chapter ' + p[1] + ')</small></a>' + starBtn(id, stripTags(f.name)) + '</li>';
        }
      }
    });
    var h = '<section class="page"><h1>My favorites</h1><p class="lead">Chapters and formulas you starred. They are saved in this browser on this computer.</p>';
    h += '<h2>Chapters</h2>' + (chItems ? '<ul class="fav-list">' + chItems + '</ul>' : '<p class="empty-note">No favorite chapters yet.</p>');
    h += '<h2 style="margin-top:28px">Formulas</h2>' + (fItems ? '<ul class="fav-list">' + fItems + '</ul>' : '<p class="empty-note">No favorite formulas yet. Press the star on any formula card.</p>');
    h += '</section>';
    main.innerHTML = h;
  }

  /* ------------------------------------------------------------------
     8. CALCULATORS
     To add a calculator: copy one block in CALCS and change it.
     compute() receives an object v with the input values and returns
     a list of [label, number, unit].
     ------------------------------------------------------------------ */
  var UNIT_SETS = {
    'Length': { 'm': 1, 'mm': 0.001, 'cm': 0.01, 'in': 0.0254, 'ft': 0.3048 },
    'Force': { 'N': 1, 'kN': 1000, 'kgf': 9.80665, 'lbf': 4.4482216 },
    'Stress / pressure': { 'Pa': 1, 'kPa': 1000, 'MPa (N/mm²)': 1e6, 'GPa': 1e9, 'bar': 1e5, 'psi': 6894.757, 'kgf/cm²': 98066.5 },
    'Torque / moment': { 'N·m': 1, 'N·mm': 0.001, 'kN·m': 1000, 'kgf·m': 9.80665, 'lbf·ft': 1.3558179, 'lbf·in': 0.1129848 },
    'Power': { 'W': 1, 'kW': 1000, 'hp (mechanical)': 745.6999, 'PS (metric hp)': 735.49875 },
    'Rotational speed': { 'rad/s': 1, 'rpm': 0.10471976, 'rev/s': 6.2831853 },
    'Mass': { 'kg': 1, 'g': 0.001, 'lb': 0.45359237 }
  };

  var CALCS = [
    {
      id: 'axial', title: 'Axial stress, strain and elongation (round bar)',
      inputs: [
        { id: 'F', label: 'Axial force F', unit: 'N', value: 50000 },
        { id: 'd', label: 'Diameter d', unit: 'mm', value: 20 },
        { id: 'L', label: 'Length L', unit: 'mm', value: 2000 },
        { id: 'E', label: "Young's modulus E", unit: 'GPa', value: 200 }
      ],
      compute: function (v) {
        var A = Math.PI * v.d * v.d / 4;
        var sigma = v.F / A;
        var eps = sigma / (v.E * 1000);
        return [['Area A', A, 'mm²'], ['Stress σ = F/A', sigma, 'MPa'], ['Strain ε = σ/E', eps, '(no unit)'], ['Elongation δ = εL', eps * v.L, 'mm']];
      },
      note: 'Valid only while the stress is below the yield strength and the bar has a uniform section (Chapters 3 and 4).'
    },
    {
      id: 'bend', title: 'Bending stress in a rectangular section',
      inputs: [
        { id: 'M', label: 'Bending moment M', unit: 'N·m', value: 2000 },
        { id: 'b', label: 'Width b', unit: 'mm', value: 40 },
        { id: 'h', label: 'Depth h (in the load direction)', unit: 'mm', value: 80 }
      ],
      compute: function (v) {
        var I = v.b * Math.pow(v.h, 3) / 12;
        var Z = v.b * v.h * v.h / 6;
        return [['Second moment of area I', I, 'mm⁴'], ['Section modulus Z', Z, 'mm³'], ['Max bending stress σ = M/Z', v.M * 1000 / Z, 'MPa']];
      },
      note: 'Uses σ = M/Z with M converted from N·m to N·mm. Ignores stress concentration and shear.'
    },
    {
      id: 'shaft', title: 'Shaft torque and shear stress (solid round shaft)',
      inputs: [
        { id: 'P', label: 'Power P', unit: 'kW', value: 7.5 },
        { id: 'N', label: 'Speed N', unit: 'rpm', value: 1440 },
        { id: 'd', label: 'Shaft diameter d', unit: 'mm', value: 25 },
        { id: 'tau', label: 'Allowable shear stress', unit: 'MPa', value: 40 }
      ],
      compute: function (v) {
        var T = v.P * 1000 * 60 / (2 * Math.PI * v.N);       /* N.m */
        var Tmm = T * 1000;                                   /* N.mm */
        var tau = 16 * Tmm / (Math.PI * Math.pow(v.d, 3));
        var dmin = Math.cbrt(16 * Tmm / (Math.PI * v.tau));
        return [['Torque T', T, 'N·m'], ['Shear stress τ = 16T/(πd³)', tau, 'MPa'], ['Minimum diameter for allowable stress', dmin, 'mm']];
      },
      note: 'Pure torsion only. Real shafts also carry bending, keyways and shock loads, so apply a service factor and see the shaft design chapters.'
    }
  ];

  function renderCalcs() {
    var h = '<section class="page"><h1>Engineering calculators</h1>' +
      '<p class="lead">Quick tools that use the same formulas as the chapters. Change a value and the results update instantly. Always check the answer by hand once.</p>';

    /* unit converter card */
    h += '<div class="calc" id="calc-units"><h2>Unit converter</h2><div class="calc-grid">' +
      '<label>Quantity<select id="uc-cat"></select></label>' +
      '<label>Value<input type="number" step="any" id="uc-val" value="1"></label>' +
      '<label>From<select id="uc-from"></select></label>' +
      '<label>To<select id="uc-to"></select></label></div>' +
      '<div class="calc-out" id="uc-out"></div>' +
      '<p class="calc-note">Factors are standard values (1 in = 25.4 mm exactly; 1 kgf = 9.80665 N).</p></div>';

    CALCS.forEach(function (c) {
      h += '<div class="calc" id="calc-' + c.id + '"><h2>' + c.title + '</h2><div class="calc-grid">' +
        c.inputs.map(function (i) {
          return '<label>' + i.label + ' <span class="u">(' + i.unit + ')</span><input type="number" step="any" data-in="' + i.id + '" value="' + i.value + '"></label>';
        }).join('') + '</div><div class="calc-out" data-out="' + c.id + '"></div><p class="calc-note">' + c.note + '</p></div>';
    });
    h += '</section>';
    main.innerHTML = h;

    /* --- unit converter logic --- */
    var cat = document.getElementById('uc-cat');
    var from = document.getElementById('uc-from');
    var to = document.getElementById('uc-to');
    var val = document.getElementById('uc-val');
    var out = document.getElementById('uc-out');

    cat.innerHTML = Object.keys(UNIT_SETS).map(function (k) { return '<option>' + esc(k) + '</option>'; }).join('');

    function fillUnits() {
      var names = Object.keys(UNIT_SETS[cat.value]);
      var opts = names.map(function (k) { return '<option>' + esc(k) + '</option>'; }).join('');
      from.innerHTML = opts; to.innerHTML = opts;
      if (names.length > 1) { to.selectedIndex = 1; }
      convert();
    }
    function convert() {
      var set = UNIT_SETS[cat.value];
      var x = parseFloat(val.value);
      if (!isFinite(x)) { out.innerHTML = '<div class="out-box"><span>Result</span><strong>Enter a number</strong></div>'; return; }
      var r = x * set[from.value] / set[to.value];
      out.innerHTML = '<div class="out-box"><span>' + esc(x + ' ' + from.value + ' =') + '</span><strong>' + fmt(r, 7) + ' ' + esc(to.value) + '</strong></div>';
    }
    cat.addEventListener('change', fillUnits);
    from.addEventListener('change', convert);
    to.addEventListener('change', convert);
    val.addEventListener('input', convert);
    fillUnits();

    /* --- other calculators --- */
    CALCS.forEach(function (c) {
      var box = document.getElementById('calc-' + c.id);
      var outBox = box.querySelector('[data-out]');
      function update() {
        var v = {}, ok = true;
        c.inputs.forEach(function (i) {
          var x = parseFloat(box.querySelector('[data-in="' + i.id + '"]').value);
          if (!(x > 0)) { ok = false; }
          v[i.id] = x;
        });
        if (!ok) { outBox.innerHTML = '<div class="out-box"><span>Check inputs</span><strong>Enter numbers above zero</strong></div>'; return; }
        outBox.innerHTML = c.compute(v).map(function (r) {
          return '<div class="out-box"><span>' + r[0] + '</span><strong>' + fmt(r[1], 5) + ' ' + r[2] + '</strong></div>';
        }).join('');
      }
      box.addEventListener('input', update);
      update();
    });
  }

  /* ------------------------------------------------------------------
     9. SEARCH
     Builds a list of everything searchable (chapter titles, formulas,
     terms, examples, interview questions, calculators) and filters it
     as you type.
     ------------------------------------------------------------------ */
  var searchIndex = [];

  function buildIndex() {
    searchIndex = [];
    CHAPTER_LIST.forEach(function (c) {
      var d = CHAPTERS[c.n];
      searchIndex.push({ type: 'Chapter', title: 'Chapter ' + c.n + ': ' + c.title, sub: GROUPS[c.group] + (d ? '' : ' (coming soon)'),
        url: '#/ch/' + c.n, text: c.title + ' ' + GROUPS[c.group] + (d ? ' ' + stripTags(d.def) : '') });
      if (!d) { return; }
      (d.formulas || []).forEach(function (f, i) {
        searchIndex.push({ type: 'Formula', title: stripTags(f.name), sub: 'Chapter ' + c.n + ': ' + c.title,
          url: '#/ch/' + c.n + '/f-' + c.n + '-' + i,
          text: stripTags(f.eq + ' ' + f.symbols.map(function (s) { return s.join(' '); }).join(' ')) });
      });
      (d.terms || []).forEach(function (t) {
        searchIndex.push({ type: 'Term', title: stripTags(t[0]), sub: 'Chapter ' + c.n, url: '#/ch/' + c.n + '/sec-terms', text: stripTags(t[1]) });
      });
      (d.examples || []).forEach(function (e, i) {
        searchIndex.push({ type: 'Example', title: stripTags(e.title), sub: 'Chapter ' + c.n, url: '#/ch/' + c.n + '/ex-' + c.n + '-' + i, text: stripTags(e.find + ' ' + e.formula) });
      });
      (d.interview || []).forEach(function (qa) {
        searchIndex.push({ type: 'Interview', title: stripTags(qa[0]), sub: 'Chapter ' + c.n, url: '#/ch/' + c.n + '/sec-interview', text: stripTags(qa[1]) });
      });
    });
    searchIndex.push({ type: 'Calculator', title: 'Unit converter', sub: 'Calculators', url: '#/calc', text: 'unit conversion length force pressure torque power speed mass' });
    CALCS.forEach(function (c) {
      searchIndex.push({ type: 'Calculator', title: c.title, sub: 'Calculators', url: '#/calc', text: c.note });
    });
  }

  var lastResults = [];

  function runSearch() {
    var q = searchBox.value.trim().toLowerCase();
    if (q.length < 2) { searchResults.hidden = true; lastResults = []; return; }
    var words = q.split(/\s+/);
    var scored = [];
    searchIndex.forEach(function (item) {
      var hay = (item.title + ' ' + item.text).toLowerCase();
      for (var i = 0; i < words.length; i++) { if (hay.indexOf(words[i]) === -1) { return; } }
      var t = item.title.toLowerCase(), score = 0;
      words.forEach(function (w) { if (t.indexOf(w) > -1) { score += 3; } });
      if (item.type === 'Formula') { score += 2; }
      if (item.type === 'Chapter') { score += 1; }
      scored.push({ item: item, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    lastResults = scored.slice(0, 12).map(function (s) { return s.item; });

    if (!lastResults.length) {
      searchResults.innerHTML = '<p class="sr-empty">No match for "' + esc(q) + '". Try a simpler word such as "torque", "stress" or "friction".</p>';
    } else {
      searchResults.innerHTML = lastResults.map(function (r) {
        return '<a class="sr" href="' + r.url + '"><span class="sr-type ' + r.type + '">' + r.type + '</span>' +
          '<span class="sr-title">' + esc(r.title) + '</span><span class="sr-sub">' + esc(r.sub) + '</span></a>';
      }).join('');
    }
    searchResults.hidden = false;
  }

  searchBox.addEventListener('input', runSearch);
  searchBox.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { searchResults.hidden = true; searchBox.blur(); }
    if (e.key === 'Enter' && lastResults.length) {
      location.hash = lastResults[0].url;
      searchResults.hidden = true;
      searchBox.blur();
    }
  });
  searchResults.addEventListener('click', function () { searchResults.hidden = true; searchBox.value = ''; });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.search')) { searchResults.hidden = true; }
  });

  /* ------------------------------------------------------------------
     10. ROUTER: decides which page to show from the address (#/...)
         #/            home
         #/ch/3        chapter 3
         #/ch/3/sec-terms   chapter 3, scrolled to a section
         #/calc        calculators
         #/fav         favorites
     ------------------------------------------------------------------ */
  var currentKey = '';

  function scrollToId(id) {
    var el = id ? document.getElementById(id) : null;
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    else { window.scrollTo(0, 0); }
  }

  function route() {
    var parts = (location.hash || '#/').replace(/^#\/?/, '').split('/');
    var view = parts[0] || 'home';
    var key = view, anchor = '';

    if (view === 'ch') {
      var n = parseInt(parts[1], 10);
      key = 'ch:' + n;
      anchor = parts[2] || '';
      if (key !== currentKey) {
        renderChapter(n);
        refreshStars();
        var c = CHAPTER_LIST[n - 1];
        document.title = (c ? 'Ch ' + n + ': ' + c.title : 'Not found') + ' | MechDesign Notes';
        window.scrollTo(0, 0);
      }
      if (anchor) { setTimeout(function () { scrollToId(anchor); }, 30); }
    } else if (view === 'calc') {
      renderCalcs(); document.title = 'Calculators | MechDesign Notes'; window.scrollTo(0, 0);
    } else if (view === 'fav') {
      renderFavs(); refreshStars(); document.title = 'My favorites | MechDesign Notes'; window.scrollTo(0, 0);
    } else {
      key = 'home';
      renderHome(); refreshStars(); document.title = 'MechDesign Notes | Mechanical Design Engineering Handbook'; window.scrollTo(0, 0);
    }
    currentKey = key;
    renderSidebar(key);
    openSidebar(false);
  }

  /* ------------------------------------------------------------------
     11. CLICK HANDLING (stars, filter chips, print buttons)
     ------------------------------------------------------------------ */
  document.addEventListener('click', function (e) {
    var star = e.target.closest('[data-fav]');
    if (star) {
      e.preventDefault();
      toggleFav(star.getAttribute('data-fav'));
      refreshStars();
      if (currentKey === 'fav') { renderFavs(); refreshStars(); }
      if (currentKey === 'home' && homeFilter === 'fav') { renderCards(); }
      return;
    }
    var chip = e.target.closest('[data-filter]');
    if (chip) {
      homeFilter = chip.getAttribute('data-filter');
      renderChips();
      renderCards();
      return;
    }
    if (e.target.closest('[data-print]')) { doPrint(); }
  });

  /* Open every answer before printing so the PDF shows them all */
  function openAllDetails(open) {
    var all = document.querySelectorAll('details.qa');
    for (var i = 0; i < all.length; i++) { all[i].open = open; }
  }
  function doPrint() { openAllDetails(true); window.print(); }
  printBtn.addEventListener('click', doPrint);
  window.addEventListener('beforeprint', function () { openAllDetails(true); });

  /* ------------------------------------------------------------------
     12. START
     ------------------------------------------------------------------ */
  window.addEventListener('hashchange', route);
  buildIndex();
  route();

})();
