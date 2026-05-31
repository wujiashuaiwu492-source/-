/* NovaMind AI — Shared JS for new.aihub.luxe */
(function(){
  // ---- Navbar scroll ----
  const nav = document.getElementById('navbar');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));

  // ---- Hamburger ----
  const burger = document.getElementById('hamburger'), menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    let open = false;
    burger.addEventListener('click', () => {
      open = !open;
      burger.classList.toggle('open', open);
      menu.style.maxHeight = open ? menu.scrollHeight + 'px' : '0';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      open = false; burger.classList.remove('open'); menu.style.maxHeight = '0';
    }));
  }

  // ---- Scroll reveal ----
  const observer = new IntersectionObserver(entries => {
    for (const e of entries) { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ---- Toast ----
  window.showToast = function(msg, isError) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'toast show' + (isError ? ' error' : '');
    clearTimeout(t._tid);
    t._tid = setTimeout(() => t.classList.remove('show'), 2800);
  };

  // ---- Copy buttons ----
  document.addEventListener('click', e => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    navigator.clipboard.writeText(btn.dataset.copy).then(
      () => showToast('✓ 已复制: ' + btn.dataset.copy),
      () => showToast('复制失败，请手动复制', true)
    );
  });

  // ---- Modal close ----
  document.querySelectorAll('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  });

  // ---- Smooth anchor ----
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href') === '#') return;
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();
