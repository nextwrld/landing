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

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavigation);
} else {
  initNavigation();
}
