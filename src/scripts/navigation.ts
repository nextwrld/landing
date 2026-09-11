function initNavigation(): void {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mmenu');
  if (!burger || !menu) return;

  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'mmenu');

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  const close = () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) close();
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavigation);
} else {
  initNavigation();
}
