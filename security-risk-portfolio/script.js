const unitsToggle = document.getElementById('unitsToggle');
const unitLinks = document.getElementById('unitLinks');
const sidebar = document.getElementById('sidebar');
const mobileMenu = document.getElementById('mobileMenu');

unitsToggle.addEventListener('click', () => {
  const expanded = unitsToggle.getAttribute('aria-expanded') === 'true';
  unitsToggle.setAttribute('aria-expanded', String(!expanded));
  unitLinks.classList.toggle('collapsed', expanded);
});

mobileMenu.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  mobileMenu.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.sidebar a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.sidebar a.active').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    if (link.closest('.unit-links')) {
      unitLinks.classList.remove('collapsed');
      unitsToggle.setAttribute('aria-expanded', 'true');
    }
    sidebar.classList.remove('open');
    mobileMenu.setAttribute('aria-expanded', 'false');
  });
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.sidebar a[href^="#"]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-25% 0px -65% 0px' });
sections.forEach(section => observer.observe(section));
