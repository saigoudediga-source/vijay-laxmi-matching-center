/* ──────────────────────────────────────────
   Vijay Laxmi Matching Point — JavaScript
────────────────────────────────────────── */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
  toggleBackToTop();
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
  const scrollY = window.scrollY + 90;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

/* ── Back to top ── */
const backToTop = document.getElementById('backToTop');
function toggleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function setupReveal() {
  const revealTargets = [
    '.category-card',
    '.gallery-item',
    '.whyus-card',
    '.testimonial-card',
    '.contact-card',
    '.about-content',
    '.about-images',
    '.rating-summary',
    '.trust-item',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      if (i === 1) el.classList.add('reveal-delay-1');
      if (i === 2) el.classList.add('reveal-delay-2');
      if (i === 3) el.classList.add('reveal-delay-3');
      revealObserver.observe(el);
    });
  });
}
setupReveal();

/* ── Smooth anchor scrolling with offset ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

/* ── Typing animation for hero subtitle (optional shimmer) ── */
function addShimmer() {
  const heroHighlight = document.querySelector('.hero-highlight');
  if (!heroHighlight) return;
  heroHighlight.style.backgroundSize = '200% auto';
  let pos = 0;
  setInterval(() => {
    pos = (pos + 0.5) % 200;
    heroHighlight.style.backgroundPosition = `${pos}% center`;
  }, 30);
}
addShimmer();

/* ── Counter animation for stats ── */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const text = counter.textContent.trim();
    const match = text.match(/^(\d+\.?\d*)/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = text.replace(match[1], '');
    const isFloat = text.includes('.');
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start = Math.min(start + increment, target);
      counter.textContent = (isFloat
        ? start.toFixed(1)
        : Math.floor(start)) + suffix;
      if (start >= target) clearInterval(timer);
    }, step);
  });
}

/* Trigger counter when hero stats come into view */
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

/* ── Gallery lightbox (simple) ── */
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(10,0,28,0.93);
      z-index:9999;display:flex;align-items:center;justify-content:center;
      cursor:zoom-out;animation:fadeInUp 0.3s ease;
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.alt = img.alt;
    bigImg.style.cssText = `
      max-width:90vw;max-height:88vh;border-radius:12px;
      box-shadow:0 20px 80px rgba(0,0,0,0.5);
      object-fit:contain;
    `;
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    overlay.addEventListener('click', () => {
      overlay.remove();
      document.body.style.overflow = '';
    });
  });
});

/* ── Parallax subtle effect for hero ── */
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrolled * 0.25}px)`;
    }
  }, { passive: true });
}
