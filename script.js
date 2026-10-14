/* ===== Header scroll ===== */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== Mobile menu ===== */
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');

menuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  menuBtn.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
});

/* ===== Fade-up on scroll ===== */
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => fadeObserver.observe(el));

/* ===== Skill bars ===== */
const fills = document.querySelectorAll('.fill');
let barsDone = false;

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !barsDone) {
        fills.forEach(fill => {
          fill.style.width = fill.dataset.w + '%';
        });
        barsDone = true;
      }
    });
  },
  { threshold: 0.25 }
);

const skillsSection = document.getElementById('skills');
if (skillsSection) barObserver.observe(skillsSection);

/* ===== Counters ===== */
function animateNumber(el, target, duration = 1600) {
  let start = 0;
  const step = target / (duration / 16);
  const tick = () => {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  };
  tick();
}

let counted = false;
const factObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        document.querySelectorAll('[data-to]').forEach(el => {
          animateNumber(el, +el.dataset.to);
        });
        counted = true;
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('.fact').forEach(f => factObserver.observe(f));

/* ===== Contact form ===== */
const form = document.getElementById('form');
const formNote = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Sending…';
  setTimeout(() => {
    formNote.textContent = 'Message sent. Thank you.';
    form.reset();
    setTimeout(() => {
      formNote.textContent = '';
    }, 3500);
  }, 900);
})
