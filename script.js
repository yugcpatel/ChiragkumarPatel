const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => navList.classList.toggle('open'));
}

const backToTop = document.getElementById('backToTop');
backToTop?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      navList?.classList.remove('open');
    }
  });
});

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  note.textContent = "Thanks! Your message has been recorded. We'll call you within 24 hours.";
  form.reset();
  console.log('Form submission:', data);
});

document.getElementById('year').textContent = new Date().getFullYear();


/* === Scroll reveal for services timeline === */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  let lastY = window.scrollY;

  const io = new IntersectionObserver((entries) => {
    const goingUp = window.scrollY < lastY;
    lastY = window.scrollY;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Always reveal when entering the viewport
        entry.target.classList.add('visible');
      } else {
        // If user is scrolling UP, hide items again as they leave view
        if (goingUp) {
          entry.target.classList.remove('visible');
        }
      }
    });
  }, {
    root: null,
    threshold: 0.2,          // start reveal when ~20% visible
    rootMargin: '0px 0px -40px 0px'
  });

  items.forEach(el => io.observe(el));
})();

/* === Expand/collapse service cards (mobile + keyboard) === */
(function () {
  const cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  const collapseAll = () => {
    cards.forEach(c => { c.classList.remove('expanded'); c.setAttribute('aria-expanded', 'false'); });
  };

  cards.forEach(card => {
    // Click / touch toggles
    card.addEventListener('click', (e) => {
      // avoid double-trigger when clicking a link inside the extra section
      const isLink = e.target.closest('a');
      if (isLink) return;

      const makeOpen = !card.classList.contains('expanded');
      collapseAll();
      if (makeOpen) {
        card.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');
        // ensure it's fully in view after expanding
        card.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
    });

    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
      // Collapse with Escape
      if (e.key === 'Escape') {
        card.classList.remove('expanded');
        card.setAttribute('aria-expanded', 'false');
      }
    });

    // Optional: collapse when mouse leaves (desktop “auto-close” feel)
    card.addEventListener('mouseleave', () => {
      // comment this line if you want it to stay open after hover:
      card.classList.remove('expanded');
      card.setAttribute('aria-expanded', 'false');
    });
  });
})();
