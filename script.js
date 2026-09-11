const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const video = document.querySelector('.hero-video');
const videoFrame = document.querySelector('.video-frame');
const videoToggle = document.querySelector('.video-toggle');

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 12);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

videoToggle?.addEventListener('click', async () => {
  if (!video) return;
  if (video.paused) {
    await video.play();
    videoFrame.classList.remove('is-paused');
    videoToggle.setAttribute('aria-label', 'Pause preview');
  } else {
    video.pause();
    videoFrame.classList.add('is-paused');
    videoToggle.setAttribute('aria-label', 'Play preview');
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('[data-year]')?.append(String(new Date().getFullYear()));
