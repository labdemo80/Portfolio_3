const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

const fadeEls = document.querySelectorAll('.fade-up');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
fadeEls.forEach(el => fadeObs.observe(el));

const progresses = document.querySelectorAll('.progress');
let barsAnimated = false;
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !barsAnimated) {
      progresses.forEach(p => { p.style.width = p.dataset.w + '%'; });
      barsAnimated = true;
    }
  });
}, { threshold: 0.2 });
const skillsEl = document.getElementById('skills');
if (skillsEl) barObs.observe(skillsEl);

function countUp(el, target, duration = 1500) {
  let current = 0;
  const step = target / (duration / 16);
  const tick = () => {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  };
  tick();
}

let counted = false;
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !counted) {
      document.querySelectorAll('[data-to]').forEach(el => {
        countUp(el, +el.dataset.to);
      });
      counted = true;
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.meta-item, .gh-stat').forEach(el => countObs.observe(el));

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const status = document.getElementById('form-status');
  status.textContent = 'Sending…';
  setTimeout(() => {
    status.textContent = 'Message sent. Thank you for reaching out.';
    e.target.reset();
    setTimeout(() => { status.textContent = ''; }, 3500);
  }, 900);
});
