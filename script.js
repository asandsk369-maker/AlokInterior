const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.getElementById('contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const service = String(data.get('projectType') || '').trim();
  const message = String(data.get('message') || '').trim();

  if (!name || !phone || !service) {
    document.getElementById('formStatus').textContent = 'Please fill in your name, phone number and project type.';
    return;
  }

  const text = [
    'Hello Alok Interior, I would like to discuss an interior design project.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Project: ${service}`,
    message ? `Details: ${message}` : ''
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/917379682425?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  document.getElementById('formStatus').textContent = 'WhatsApp opened in a new tab. Review your message and tap Send.';
});