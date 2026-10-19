const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const root = document.documentElement;
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get: k => { try { return localStorage.getItem(k) } catch {} },
  set: (k, v) => { try { localStorage.setItem(k, v) } catch {} }
};
root.classList.add('js');

/* ---------- Data (edit here) ---------- */
const skills = {
  Frontend: ['React.js', 'Redux Toolkit', 'RTK Query', 'Tailwind CSS',
    'React Bootstrap', 'React Toastify', 'HTML5', 'CSS3', 'JavaScript (ES6+)'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Payment Gateways'],
  Database: ['MongoDB', 'Schema Design', 'Query Optimization'],
  'Tools & Practice': ['Git & GitHub', 'Postman', 'API Testing', 'Code Reviews']
};

/* Screenshots: put images in images/projects/<id>/1.png, 2.png, 3.png ...
   s = number of screenshots (default 3). live / code = optional button links. */
const projects = [
  {
    id: 'Denstack', n: 'Denstack', k: 'Hospital management system', c: 'full',
    t: ['MongoDB', 'Express', 'React', 'Node'],
    d: 'Patient records, clinic scheduling and multi-facility operations with role-based access.',
    f: ['Secure patient records and appointment data',
      'Clinic scheduling across multiple facilities',
      'Analytics and reporting on operational metrics',
      'Permission hierarchies and role-based access policies']
  },
  {
    id: 'Mpact', n: 'Mpact', k: 'E-commerce platform', c: 'full',
    t: ['React', 'Redux Toolkit', 'JWT', 'RazorPay'],
    d: 'Catalogue, cart and JWT login with Redux state, live RazorPay payments and smooth animations.',
    f: ['Product catalogue and cart management',
      'JWT authentication with session management',
      'Redux Toolkit state shared across the app',
      'Live RazorPay payment authorization',
      'Scroll-based animations and page transitions']
  },
  {
    id: 'Nashyol', n: 'Nashyol', k: 'Full-stack e-commerce platform', c: 'full',
    t: ['Full stack', 'E-commerce', 'Payments'],
    d: 'Seamless online shopping with product management, order tracking and secure payments.',
    f: ['Seamless online shopping experience',
      'Product management',
      'Order tracking',
      'Secure payment options']
  },
  {
    id: 'Base-performance', n: 'Base Performance', k: 'Fitness and court booking', c: 'front',
    t: ['HTML', 'CSS', 'JavaScript'],
    d: 'Court and training bookings with live availability and a validated multi-step flow.',
    f: ['Live court and session availability',
      'Multi-step booking with confirmation and scheduling',
      'Data validation throughout the reservation',
      'Responsive on phone, tablet and desktop']
  },
  {
    id: 'Movie', n: 'MRS', k: 'Movie recommendation system', c: 'front',
    t: ['HTML', 'CSS', 'JavaScript'],
    d: 'Curated movie suggestions fetched from external sources with vanilla JavaScript.',
    f: ['Dynamic recommendation interface using the DOM API',
      'Data fetched from external sources',
      'Async patterns to render results with minimal delay']
  },
  {
    id: 'Carzone', n: 'Parallax Car Showcase', k: 'Interactive product display', c: 'front',
    t: ['HTML', 'CSS', 'JavaScript'],
    d: 'Scroll-triggered parallax with layered depth and smooth, optimised animation.',
    f: ['Scroll-triggered parallax with layered visual depth',
      'Optimised rendering across device types',
      'CSS animation optimisation and event delegation']
  },
  {
    id: 'KT', n: 'Kerala Tourism', k: 'Destination information portal', c: 'front',
    t: ['HTML', 'CSS', 'JavaScript'],
    d: 'Responsive multi-section tourism site with clear navigation and a mobile-first layout.',
    f: ['Multi-section responsive layout', 'Intuitive navigation', 'Mobile-first design']
  }
];
const words = ['MERN stack applications', 'responsive React interfaces',
  'secure REST APIs', 'payment-ready storefronts'];

/* ---------- Theme ---------- */
const themes = $$('[data-t]').map(b => b.dataset.t);
const setTheme = t => {
  root.dataset.theme = t;
  store.set('theme', t);
  $$('[data-t]').forEach(b => b.setAttribute('aria-pressed', b.dataset.t === t));
};
setTheme(themes.includes(store.get('theme')) ? store.get('theme') : 'ember');
$('#themeBtn').onclick = e => { e.stopPropagation(); $('#themes').classList.toggle('open') };
$('#themes').onclick = e => { const t = e.target.dataset.t; t && setTheme(t) };
document.addEventListener('click', e => !e.target.closest('.dock') && $('#themes').classList.remove('open'));

/* ---------- Render skills + project cards ---------- */
const chips = a => `<div class="chips">${a.map(x => `<span>${x}</span>`).join('')}</div>`;

$('#skillGrid').innerHTML = Object.entries(skills).map(([k, v]) =>
  `<div class="glass sk rv"><h3>${k}</h3>${chips(v)}</div>`).join('');

const draw = f => {
  $('#grid').innerHTML = projects.filter(p => f === 'all' || p.c === f).map((p, i) => `
    <a class="card glass tilt" href="#project/${p.id}" style="animation-delay:${i * 70}ms">
      <small>${p.k}</small><h3>${p.n}</h3><p>${p.d}</p>${chips(p.t)}
      <span class="more">View details</span>
    </a>`).join('');
};
draw('all');
$('.filters').onclick = e => {
  const f = e.target.dataset.f;
  if (!f) return;
  $$('.filters button').forEach(b => b.classList.toggle('on', b === e.target));
  draw(f);
};

/* ---------- Project detail view (#project/<id>) + lightbox ---------- */
const show = p => {
  const shots = Array.from({ length: p.s || 3 }, (_, i) => `
    <figure><img src="images/projects/${p.id}/${i + 1}.png" alt="${p.n} screenshot ${i + 1}" loading="lazy">
    <figcaption>Add images/projects/${p.id}/${i + 1}.png</figcaption></figure>`).join('');
  const btn = (u, t, c = '') => u ? `<a class="btn ${c}" href="${u}" target="_blank" rel="noopener">${t}</a>` : '';
  $('#detail').innerHTML = `<div class="dwrap">
    <a class="btn ghost" href="#projects">Back to projects</a>
    <small>${p.k}</small><h2 class="title">${p.n}</h2>
    <p class="lead">${p.d}</p>${chips(p.t)}
    <div class="cta">${btn(p.live, 'Live site')}${btn(p.code, 'Source code', 'ghost')}</div>
    <h3>Key features</h3><ul class="feat">${p.f.map(x => `<li>${x}</li>`).join('')}</ul>
    <h3>Screenshots</h3><div class="shots">${shots}</div></div>`;
};
const route = () => {
  const id = (location.hash.match(/^#project\/(.+)/) || [])[1];
  const p = projects.find(x => x.id === id), d = $('#detail');
  p && show(p);
  d.hidden = !p;
  d.scrollTop = 0;
  root.classList.toggle('lock', !!p);
};
addEventListener('hashchange', route);
route();

addEventListener('error', e => e.target.tagName === 'IMG' && e.target.parentNode.classList.add('empty'), true);
document.addEventListener('click', e => {
  const img = e.target.closest('.shots img');
  if (img) { $('#lb img').src = img.src; $('#lb').hidden = false }
  else if (e.target.closest('#lb')) $('#lb').hidden = true;
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  $('#themes').classList.remove('open');
  if (!$('#lb').hidden) $('#lb').hidden = true;
  else if (!$('#detail').hidden) location.hash = '#projects';
});

/* ---------- Card spotlight + tilt ---------- */
document.addEventListener('pointermove', e => {
  const c = e.target.closest('.card, .tilt');
  if (!c) return;
  const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
  c.style.setProperty('--x', x + 'px');
  c.style.setProperty('--y', y + 'px');
  if (calm || !c.classList.contains('tilt')) return;
  const rx = (.5 - y / r.height) * 7, ry = (x / r.width - .5) * 7;
  c.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
});
document.addEventListener('pointerout', e => {
  const c = e.target.closest('.tilt');
  if (c && !c.contains(e.relatedTarget)) c.style.transform = '';
});

/* ---------- Scroll: progress bar, reveal, active link, counters ---------- */
const bar = $('#bar');
addEventListener('scroll', () => {
  bar.style.transform = `scaleX(${scrollY / (document.body.scrollHeight - innerHeight)})`;
}, { passive: true });

const now = new Date();
$('#pc').dataset.n = projects.length;
$('#months').dataset.n = (now.getFullYear() - 2025) * 12 + now.getMonth() - 5; // since Jun 2025

const count = el => {
  const n = +el.dataset.n, t0 = performance.now();
  if (calm) return el.textContent = n;
  (function f(t) {
    const p = Math.min((t - t0) / 1200, 1);
    el.textContent = Math.round(n * (1 - (1 - p) ** 3));
    p < 1 && requestAnimationFrame(f);
  })(t0);
};
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  $$('[data-n]', e.target).forEach(count);
  io.unobserve(e.target);
}), { threshold: .15 });
$$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el) });

const links = $$('#menu a');
const so = new IntersectionObserver(es => es.forEach(e => e.isIntersecting &&
  links.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id))),
{ rootMargin: '-45% 0px -50% 0px' });
$$('section[id]').forEach(s => so.observe(s));

/* ---------- Mobile menu, typewriter, form, footer ---------- */
$('#burger').onclick = () => $('#menu').classList.toggle('open');
$('#menu').onclick = () => $('#menu').classList.remove('open');

let w = 0, c = 0, del = false;
(function type() {
  const s = words[w], el = $('#type');
  if (calm) return el.textContent = s;
  el.textContent = s.slice(0, c += del ? -1 : 1);
  let t = del ? 35 : 70;
  if (!del && c === s.length) { del = true; t = 1600 }
  else if (del && !c) { del = false; w = (w + 1) % words.length; t = 300 }
  setTimeout(type, t);
})();

const EMAILJS = { key: 'vqfWlRQpc7Z57eu4a', service: 'service_f9kcwge', template: 'template_5gyd4cj' };
const form = $('form'), note = $('#formStatus');
const say = (t, c = '') => { note.textContent = t; note.className = 'mu ' + c };
form.onsubmit = async e => {
  e.preventDefault();
  if (!window.emailjs) return say('Email service could not load. Check your connection.', 'err');
  const btn = $('button', form);
  btn.disabled = true;
  say('Sending...');
  try {
    await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form, EMAILJS.key);
    say('Message sent successfully!', 'ok');
    form.reset();
  } catch { say('Sending failed. Please try again.', 'err') }
  btn.disabled = false;
};
$('#yr').textContent = now.getFullYear();
