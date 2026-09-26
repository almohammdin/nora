(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  document.documentElement.classList.add('nora-v3');

  const sectionTitles = {
    'ai-assistant': 'مساعد نورة',
    tasks: 'المهام',
    calendar: 'التقويم',
    meetings: 'اجتماعات المشرف',
    workspace: 'تعريف البحث',
    stages: 'مراحل الرسالة',
    'research-discovery': 'اكتشاف الدراسات',
    matrix: 'مصفوفة الدراسات',
    question: 'فحص السؤال',
    university: 'جامعة الملك عبدالعزيز',
    tools: 'الأدوات'
  };

  const navItems = [
    ['dashboard', 'اليوم', '#e44778'],
    ['tasks', 'المهام', '#7c3aed'],
    ['research-discovery', 'الدراسات', '#0ea5e9'],
    ['workspace', 'الرسالة', '#14b8a6'],
    ['meetings', 'المشرف', '#f59e0b'],
    ['calendar', 'المواعيد', '#fb7185'],
    ['ai-assistant', 'مساعد نورة', '#8b5cf6'],
    ['tools', 'الأدوات', '#0f9f8f']
  ];

  let activeSection = 'dashboard';
  const nav = $('.sticky-nav');

  function setNavCurrent(id) {
    activeSection = id;
    $$('.nora-nav-link').forEach(link => {
      link.setAttribute('aria-current', String(link.dataset.target === id));
    });
  }

  function buildNav() {
    if (!nav) return;
    nav.innerHTML = navItems.map(([id, label, color]) =>
      `<a class="nora-nav-link" data-target="${id}" href="#${id}" style="--nav-accent:${color}" aria-current="${id === 'dashboard'}">${label}</a>`
    ).join('');

    nav.addEventListener('click', event => {
      const link = event.target.closest('.nora-nav-link');
      if (!link) return;
      const id = link.dataset.target;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      if (id !== 'dashboard') openSection(id, true);
      else target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
      setNavCurrent(id);
      history.replaceState(null, '', `#${id}`);
    });
  }

  function ensureHeader(section, id) {
    let head = section.querySelector(':scope > .section-head');
    if (!head) {
      head = document.createElement('div');
      head.className = 'nora-section-topbar';
      head.innerHTML = `<h2>${sectionTitles[id] || 'القسم'}</h2>`;
      section.prepend(head);
    }
    if (!head.querySelector('.nora-section-toggle')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'nora-section-toggle';
      button.textContent = 'فتح';
      button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', event => {
        event.stopPropagation();
        if (section.classList.contains('nora-collapsed')) openSection(id, false);
        else closeSection(section);
      });
      head.append(button);
      head.addEventListener('click', event => {
        if (!section.classList.contains('nora-collapsed')) return;
        if (event.target.closest('a,button,input,select,textarea,label')) return;
        openSection(id, false);
      });
    }
    return head;
  }

  function closeSection(section) {
    if (!section || section.id === 'dashboard') return;
    section.classList.add('nora-collapsed');
    const button = section.querySelector(':scope > .section-head .nora-section-toggle, :scope > .nora-section-topbar .nora-section-toggle');
    if (button) {
      button.textContent = 'فتح';
      button.setAttribute('aria-expanded', 'false');
    }
  }

  function openSection(id, shouldScroll) {
    const section = document.getElementById(id);
    if (!section || id === 'dashboard') return;
    $$('.nora-foldable').forEach(other => {
      if (other !== section) closeSection(other);
    });
    section.classList.remove('nora-collapsed');
    const button = section.querySelector(':scope > .section-head .nora-section-toggle, :scope > .nora-section-topbar .nora-section-toggle');
    if (button) {
      button.textContent = 'إغلاق';
      button.setAttribute('aria-expanded', 'true');
    }
    setNavCurrent(navItems.some(item => item[0] === id) ? id : activeSection);
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
      if (shouldScroll) section.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
    });
  }

  function makeSectionsFocusMode() {
    Object.keys(sectionTitles).forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;
      section.classList.add('nora-foldable', 'nora-collapsed');
      ensureHeader(section, id);
    });
  }

  function buildJourney() {
    const dashboard = $('#dashboard');
    if (!dashboard || dashboard.querySelector('.nora-journey')) return;

    const progressNode = $('#heroProgress');
    const labels = ['الفكرة', 'الخطة', 'المراجعة', 'التنفيذ', 'الكتابة', 'المناقشة'];
    const colors = ['#e44778', '#8b5cf6', '#38bdf8', '#2dd4bf', '#fbbf24', '#fb7185'];
    const journey = document.createElement('div');
    journey.className = 'nora-journey';
    journey.innerHTML = `
      <div class="nora-journey-head">
        <div><h3>مسار الرسالة</h3></div>
        <button class="nora-journey-replay" type="button">إعادة الحركة</button>
      </div>
      <div class="nora-journey-track" aria-label="مسار تقدم الرسالة">
        ${labels.map((label, index) => `<div class="nora-journey-stage" data-stage="${index}" style="--stage-color:${colors[index]}"><i></i><span>${label}</span></div>`).join('')}
        <span class="nora-flow-dot" aria-hidden="true"></span>
      </div>
      <p class="nora-journey-status" role="status"></p>`;

    const firstPanel = dashboard.querySelector('.panel');
    if (firstPanel) dashboard.insertBefore(journey, firstPanel);
    else dashboard.append(journey);

    const track = $('.nora-journey-track', journey);
    const dot = $('.nora-flow-dot', journey);
    const status = $('.nora-journey-status', journey);
    const replay = $('.nora-journey-replay', journey);
    let player = null;

    function readProgress() {
      const match = String(progressNode?.textContent || '0').match(/[\d.]+/);
      return Math.max(0, Math.min(100, Number(match?.[0] || 0)));
    }

    function paint() {
      const progress = readProgress();
      const stage = Math.min(5, Math.floor(progress / 20));
      $$('.nora-journey-stage', journey).forEach((node, index) => {
        node.classList.toggle('is-done', index < stage);
        node.classList.toggle('is-current', index === stage);
      });
      track.style.setProperty('--journey-progress', String(progress / 100));
      status.textContent = progress >= 100 ? 'اكتملت مراحل المسار المسجلة.' : `التقدم المسجل حاليا ${Math.round(progress)}%.`;
      if (window.innerWidth > 560) {
        const max = Math.max(0, track.clientWidth * .83334 - 11);
        dot.style.transform = `translateX(${-max * (progress / 100)}px)`;
      }
    }

    function replayMotion() {
      paint();
      if (reduceMotion.matches || window.innerWidth <= 560 || !dot.animate) return;
      if (player) player.cancel();
      const progress = readProgress();
      const max = Math.max(0, track.clientWidth * .83334 - 11);
      const end = -max * (progress / 100);
      player = dot.animate(
        [{ transform: 'translateX(0)' }, { transform: `translateX(${end}px)` }],
        { duration: 950, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'forwards' }
      );
      player.onfinish = () => { dot.style.transform = `translateX(${end}px)`; player = null; };
    }

    replay.addEventListener('click', replayMotion);
    window.addEventListener('resize', paint, { passive: true });
    if (progressNode && 'MutationObserver' in window) new MutationObserver(paint).observe(progressNode, { childList: true, subtree: true, characterData: true });
    requestAnimationFrame(() => { paint(); setTimeout(replayMotion, 220); });
  }

  function addReveal() {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    const targets = $$('.nora-journey, .nora-foldable.nora-collapsed');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('nora-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    targets.forEach((node, index) => {
      node.classList.add('nora-reveal-ready');
      node.style.transitionDelay = `${Math.min(index * 35, 140)}ms`;
      observer.observe(node);
    });
  }

  function enhanceDateFields(root = document) {
    const inputs = [...root.querySelectorAll('input[type="date"]:not([data-nora-date-enhanced])')];
    inputs.forEach(input => {
      input.dataset.noraDateEnhanced = '1';

      const shell = document.createElement('span');
      shell.className = 'nora-date-shell';
      input.parentNode.insertBefore(shell, input);
      shell.appendChild(input);

      const display = document.createElement('span');
      display.className = 'nora-date-display';
      display.setAttribute('aria-hidden', 'true');

      const icon = document.createElement('span');
      icon.className = 'nora-date-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 3v3m12-3v3M4 9h16M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2Z"/></svg>';

      shell.append(display, icon);

      const update = () => {
        const value = input.value;
        if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          const [year, month, day] = value.split('-');
          display.textContent = `${day} / ${month} / ${year}`;
          display.dir = 'ltr';
          display.dataset.hasValue = 'true';
        } else {
          display.textContent = 'يوم / شهر / سنة';
          display.dir = 'rtl';
          display.dataset.hasValue = 'false';
        }
      };

      input.addEventListener('input', update);
      input.addEventListener('change', update);
      input.addEventListener('focus', update);
      input.addEventListener('blur', update);
      update();
    });
  }

  function observeDateFields() {
    enhanceDateFields();
    if (!('MutationObserver' in window)) return;
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        record.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;
          if (node.matches?.('input[type="date"]')) enhanceDateFields(node.parentElement || document);
          else if (node.querySelector?.('input[type="date"]')) enhanceDateFields(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function openFromHash() {
    const id = location.hash.replace('#', '');
    if (!id || id === 'dashboard') return;
    if (sectionTitles[id]) {
      openSection(id, false);
      setNavCurrent(navItems.some(item => item[0] === id) ? id : 'dashboard');
    }
  }

  buildNav();
  makeSectionsFocusMode();
  buildJourney();
  addReveal();
  observeDateFields();
  openFromHash();
})();
