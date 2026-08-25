/* =========================================================
   DTC TECHNOLOGY SOLUTIONS — MAIN JS
   GSAP-driven interactions: preloader, nav, reveals, counters,
   marquee, smooth scroll, FAQ accordion, project filters, form.
   ========================================================= */
(function(){
  "use strict";

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }

  /* Recalculate trigger positions once webfonts (icons) and lazy images
     finish loading — both reflow the page after ScrollTrigger's initial
     measurement, which otherwise leaves later sections (e.g. the client
     grid) with stale offsets that never fire. */
  function refreshScrollTrigger(){ if (window.ScrollTrigger) ScrollTrigger.refresh(); }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refreshScrollTrigger);
  }
  window.addEventListener('load', refreshScrollTrigger);
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (!img.complete) img.addEventListener('load', refreshScrollTrigger, { once:true });
  });

  /* ---------- Preloader ---------- */
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    if (pre) {
      setTimeout(() => pre.classList.add('loaded'), 350);
    }
    runHeroIntro();
  });

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    const btt = document.getElementById('backToTop');
    if (btt) {
      if (window.scrollY > 600) btt.classList.add('show');
      else btt.classList.remove('show');
    }
  };
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('nav-open');
    }));
  }

  /* ---------- Back to top + smooth in-page scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        if (window.gsap && window.ScrollToPlugin) {
          gsap.to(window, { duration: 1, scrollTo: { y: id, offsetY: 90 }, ease: 'power3.inOut' });
        } else {
          document.querySelector(id).scrollIntoView({ behavior:'smooth' });
        }
      }
    });
  });
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      if (window.gsap && window.ScrollToPlugin) {
        gsap.to(window, { duration: 1.1, scrollTo: 0, ease:'power3.inOut' });
      } else {
        window.scrollTo({ top:0, behavior:'smooth' });
      }
    });
  }

  /* ---------- Hero intro timeline ---------- */
  function runHeroIntro(){
    if (!window.gsap) return;
    const hero = document.querySelector('[data-hero-intro]');
    if (!hero) return;
    const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });
    tl.from(hero.querySelector('.eyebrow'), { y:20, opacity:0, duration:.6 })
      .from(hero.querySelectorAll('h1 > *'), { y:40, opacity:0, duration:.8, stagger:.12 }, '-=.3')
      .from(hero.querySelector('p'), { y:20, opacity:0, duration:.6 }, '-=.4')
      .from(hero.querySelectorAll('.hero-actions .btn'), { y:20, opacity:0, duration:.5, stagger:.1 }, '-=.3')
      .from(hero.querySelectorAll('.hero-stats > *'), { y:20, opacity:0, duration:.5, stagger:.08 }, '-=.2');
  }

  /* ---------- Scroll reveals ----------
     Each item gets its own ScrollTrigger (rather than one batched,
     multi-target stagger tween per group) — more reliable across long
     grids and reveals items progressively as they individually enter
     view instead of all at once when the container top appears. */
  if (window.gsap && window.ScrollTrigger) {
    document.querySelectorAll('[data-reveal-group]').forEach(group => {
      const items = group.querySelectorAll('[data-reveal-item]');
      items.forEach((el, i) => {
        gsap.from(el, {
          y: 45, opacity: 0, duration: .7, ease:'power3.out', delay: (i % 6) * 0.08,
          scrollTrigger: { trigger: el, start:'top 92%' }
        });
      });
    });

    document.querySelectorAll('[data-reveal]').forEach(el => {
      gsap.from(el, {
        y: 50, opacity: 0, duration: .9, ease:'power3.out',
        scrollTrigger: { trigger: el, start:'top 85%' }
      });
    });

    /* Parallax backgrounds */
    document.querySelectorAll('[data-parallax]').forEach(el => {
      gsap.to(el, {
        backgroundPosition: '50% 30%',
        ease: 'none',
        scrollTrigger: { trigger: el, start:'top bottom', end:'bottom top', scrub: true }
      });
    });
  }

  /* ---------- Counters ---------- */
  function animateCounters(){
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    counters.forEach(el => {
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
      const obj = { val: 0 };
      const run = () => {
        gsap.to(obj, {
          val: target, duration: 2, ease:'power2.out',
          onUpdate(){ el.textContent = obj.val.toFixed(decimals) + suffix; }
        });
      };
      if (window.ScrollTrigger) {
        ScrollTrigger.create({ trigger: el, start:'top 90%', once:true, onEnter: run });
      } else {
        run();
      }
    });
  }
  animateCounters();

  /* ---------- Infinite marquee ---------- */
  document.querySelectorAll('[data-marquee]').forEach(track => {
    if (!window.gsap || reduceMotion) return;
    // duplicate content for seamless loop
    track.innerHTML += track.innerHTML;
    const totalWidth = track.scrollWidth / 2;
    gsap.to(track, {
      x: -totalWidth, duration: Math.max(20, totalWidth / 60), ease:'none', repeat:-1
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  /* ---------- Project filters ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        if (window.gsap) {
          gsap.to(card, {
            opacity: match ? 1 : 0, scale: match ? 1 : .9, duration:.35,
            onStart(){ if (match) card.style.display=''; },
            onComplete(){ if (!match) card.style.display='none'; }
          });
        } else {
          card.style.display = match ? '' : 'none';
        }
      });
    });
  });

  /* ---------- Contact form (static / mailto fallback) ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('formStatus');
      const name = form.querySelector('#name')?.value.trim();
      const email = form.querySelector('#email')?.value.trim();
      const message = form.querySelector('#message')?.value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please fill in all required fields.';
        status.style.color = '#c0392b';
        return;
      }
      const subject = encodeURIComponent(`Website enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:info@dtc-eg.net?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email client to send this message…';
      status.style.color = '#8C631E';
    });
  }

  /* ---------- Set active nav link ---------- */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });

})();
