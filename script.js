/**
 * PRANAV CHANDRA — PORTFOLIO | script.js
 * All interactive behavior: navbar, mobile menu, scroll animations,
 * contact form, hero scroll indicator
 */

(function () {
  'use strict';

  /* ======================================================
     1. STICKY NAVBAR
     Adds .scrolled class after 50px scroll for glass effect
  ====================================================== */
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run once on load

  /* ======================================================
     2. MOBILE HAMBURGER MENU
  ====================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navDrawer = document.getElementById('nav-drawer');
  const navOverlay = document.getElementById('nav-overlay');

  function openMenu() {
    navToggle?.classList.add('open');
    navDrawer?.classList.add('open');
    navOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    navToggle?.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navToggle?.classList.remove('open');
    navDrawer?.classList.remove('open');
    navOverlay?.classList.remove('open');
    document.body.style.overflow = '';
    navToggle?.setAttribute('aria-expanded', 'false');
  }

  navToggle?.addEventListener('click', () => {
    const isOpen = navDrawer?.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  navOverlay?.addEventListener('click', closeMenu);

  // Close drawer when a nav link is clicked
  navDrawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer?.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ======================================================
     3. HERO SCROLL INDICATOR
     Hides the scroll arrow after the hero is scrolled past
  ====================================================== */
  const heroScroll = document.querySelector('.hero-scroll');
  const hero = document.getElementById('hero');

  if (heroScroll && hero) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroScroll.classList.toggle('hidden', !entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    heroObserver.observe(hero);
  }

  /* ======================================================
     4. SCROLL FADE-IN ANIMATIONS
     Adds .visible class to .fade-in elements as they enter viewport
  ====================================================== */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    fadeEls.forEach((el) => fadeObserver.observe(el));
  }

  /* ======================================================
     5. CONTACT FORM (Web3Forms)
     Handles submission feedback without full page reload
  ====================================================== */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalText = submitBtn?.textContent ?? 'Send Message';

      try {
        if (submitBtn) {
          submitBtn.textContent = 'Sending…';
          submitBtn.disabled = true;
        }

        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (response.ok && result.success) {
          contactForm.style.display = 'none';
          if (formSuccess) formSuccess.style.display = 'block';
        } else {
          throw new Error(result.message || 'Network response was not ok');
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
        alert('Something went wrong. Please email me directly at pcpranavchandra@gmail.com');
      }
    });
  }

  /* ======================================================
     6. ACTIVE NAV LINK HIGHLIGHT
     Highlights the current section in the navbar
  ====================================================== */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links a');

  if (sections.length > 0 && desktopNavLinks.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            desktopNavLinks.forEach((link) => {
              link.style.color = link.getAttribute('href') === '#' + id
                ? 'var(--text)'
                : '';
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((sec) => sectionObserver.observe(sec));
  }

})();
