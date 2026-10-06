import { PROGRAM, SEMESTERS, ELECTIVES, OPPORTUNITIES, UNIVERSITY_RESOURCES } from './nora-academic-data.mjs?v=4';

export const COURSE_STATUSES = ['غير محددة', 'لم تبدأ', 'أدرسها', 'اجتزتها'];
export const PARTICIPATION_STATUSES = ['', 'مهتمة', 'أجهز المشاركة', 'قدمت', 'مقبولة', 'اعتذرت'];
const CATEGORIES = { paper: 'ورقة بحثية أو بوستر علمي', innovation: 'ابتكار وريادة أعمال', development: 'تطوير مهني ومعارض' };
const INSTITUTION_FILTERS = { saudi: 'كل الجامعات السعودية', public: 'جامعات سعودية حكومية', private: 'جامعات سعودية أهلية', independent: 'جهات جامعية سعودية مستقلة' };
const courses = SEMESTERS.flatMap(s => s.courses);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dateText = date => date ? new Intl.DateTimeFormat('ar-SA-u-ca-gregory', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Riyadh' }).format(new Date(`${date}T12:00:00+03:00`)) : 'غير معلن';
export function todayKey(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Riyadh' }).formatToParts(now);
  const pick = type => parts.find(p => p.type === type).value;
  return `${pick('year')}-${pick('month')}-${pick('day')}`;
}

export function matchesInstitution(item, filter = '') {
  if (!filter) return true;
  if (item.country !== 'السعودية' || !item.institutionType) return false;
  return filter === 'saudi' || item.institutionType === ({ public: 'حكومية', private: 'أهلية', independent: 'مستقلة' }[filter]);
}

export function nextOpportunityDeadline(item, today = todayKey()) {
  return item.deadlines.filter(d => !d.conditional && d.date >= today).map(d => d.date).sort()[0] || '9999';
}

export function normalizeAcademic(raw = {}) {
  const value = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const progress = {}, selections = {}, participation = {};
  const used = new Set();
  courses.forEach(course => {
    const status = value.courseProgress?.[course.code];
    if (COURSE_STATUSES.includes(status)) progress[course.code] = status;
    const selection = value.courseSelections?.[course.code];
    if (course.elective && electiveOptions(course).some(item => item.code === selection) && !used.has(selection)) {
      selections[course.code] = selection; used.add(selection);
    }
  });
  OPPORTUNITIES.forEach(item => {
    const status = value.opportunityProgress?.[item.id];
    if (PARTICIPATION_STATUSES.includes(status) && status) participation[item.id] = status;
  });
  return { ...value, courseProgress: progress, courseSelections: selections, opportunityProgress: participation };
}

export function electiveOptions(slot) {
  return ELECTIVES.filter(course => course.units === slot.units && (slot.elective === 'any' || course.code.startsWith('EDAD')));
}

export function planProgress(raw) {
  const academic = normalizeAcademic(raw);
  const completed = courses.filter(c => academic.courseProgress[c.code] === 'اجتزتها' && (!c.elective || academic.courseSelections[c.code]));
  const units = completed.reduce((sum, c) => sum + c.units, 0);
  const studied = courses.filter(c => academic.courseProgress[c.code] === 'أدرسها' && (!c.elective || academic.courseSelections[c.code])).reduce((sum, c) => sum + c.units, 0);
  return { units, studied, percent: Math.round(units / PROGRAM.units * 100) };
}

export function allDayRange(start, end = start) {
  const endDate = new Date(`${end}T12:00:00Z`);
  endDate.setUTCDate(endDate.getUTCDate() + 1);
  return [start.replaceAll('-', ''), endDate.toISOString().slice(0, 10).replaceAll('-', '')];
}

export function allDayIcs(event, uid, stamp) {
  const [start, end] = allDayRange(event.date, event.endDate || event.date);
  const text = value => String(value || '').replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  return `BEGIN:VEVENT\nUID:${uid}@noura-master\nDTSTAMP:${stamp}\nDTSTART;VALUE=DATE:${start}\nDTEND;VALUE=DATE:${end}\nSUMMARY:${text(event.title)}\nDESCRIPTION:${text(event.notes)}\nURL:${event.link || ''}\nEND:VEVENT`;
}

// Append only: existing tasks, calendar events, edits, studies and profile are retained.
export function addOpportunityToState(state, opportunity, today = todayKey(), now = Date.now()) {
  const academic = normalizeAcademic(state.academic);
  state.academic = academic;
  state.tasks = Array.isArray(state.tasks) ? state.tasks : [];
  state.events = Array.isArray(state.events) ? state.events : [];
  const status = academic.opportunityProgress[opportunity.id] || '';
  const deadlines = opportunity.deadlines.filter(d => d.date >= today && (!d.conditional || status === 'مقبولة'));
  let events = 0, tasks = 0;
  const addEvent = (suffix, title, date, endDate, notes) => {
    const id = `academic-${opportunity.id}-${suffix}`;
    if (state.events.some(event => event.id === id)) return;
    state.events.push({ id, title, type: 'فرصة مشاركة', date, endDate, allDay: true, time: '', link: opportunity.source,
      notes: `${opportunity.city} · ${opportunity.format}\n${notes}\nالموعد مسجل ليوم كامل؛ راجعي البرنامج لتوقيت الجلسات.\nالمصدر: ${opportunity.source}\nآخر تحقق: ${opportunity.verifiedAt}`, createdAt: now, opportunityId: opportunity.id });
    events++;
  };
  deadlines.forEach(d => addEvent(d.date + '-deadline', `${d.label}: ${opportunity.title}`, d.date, d.date, d.conditional ? 'خاص بالمشاركات المقبولة.' : 'راجعي شروط الجهة قبل التقديم.'));
  if (opportunity.start >= today) addEvent('event', opportunity.title, opportunity.start, opportunity.end, `الفترة: ${dateText(opportunity.start)} — ${dateText(opportunity.end)}. ${opportunity.participation}`);
  if (events || deadlines.length || opportunity.end >= today) {
    const id = `academic-${opportunity.id}-prepare`;
    if (!state.tasks.some(task => task.id === id)) {
      state.tasks.push({ id, title: opportunity.action, stage: state.profile?.stage || 'إعداد الخطة', due: deadlines[0]?.date || '',
        priority: 'عالية', status: 'لم تبدأ', output: CATEGORIES[opportunity.category],
        notes: `${opportunity.title}\n${opportunity.caution}\n${opportunity.source}\nآخر تحقق: ${opportunity.verifiedAt}`, createdAt: now, updatedAt: now, opportunityId: opportunity.id });
      tasks++;
    }
    if (!status) academic.opportunityProgress[opportunity.id] = 'مهتمة';
  }
  return { events, tasks };
}

export function academicContext(state, today = todayKey()) {
  const academic = normalizeAcademic(state.academic);
  return {
    program: PROGRAM,
    evidence: {
      thesis: state.profile?.title || '',
      courseworkExamples: [{ type: 'عرض وترجمة ورقة منشورة لمقرر تقنيات وتطبيقات التعليم', paper: 'Cheng, Calhoun & Reedy (2025)', subject: 'الكتابة الأكاديمية وأخلاقيات الذكاء الاصطناعي' }],
      projectExamples: [{ name: 'جنى', description: 'فكرة منصة تحول نتائج الأبحاث إلى منتجات تطبيقية ومسار إرشادي ولوحة لقياس الأثر', verifiedStage: 'فكرة؛ النموذج العامل والقبول والفوز غير موثقين في المواد المتاحة' }],
      opportunitiesVerifiedAt: PROGRAM.verifiedAt
    },
    plan: SEMESTERS.map(s => ({ title: s.title, units: s.units, courses: s.courses.map(c => ({ ...c, selection: academic.courseSelections[c.code] || '', status: academic.courseProgress[c.code] || 'غير محددة' })) })),
    universityResources: UNIVERSITY_RESOURCES,
    opportunities: OPPORTUNITIES.filter(o => o.end >= today || academic.opportunityProgress[o.id]).map(o => ({ id: o.id, title: o.title, city: o.city, institutionType: o.institutionType, availability: o.availability,
      category: CATEGORIES[o.category], start: o.start, end: o.end, deadlines: o.deadlines, fee: o.fee, participation: o.participation,
      fit: o.fit, caution: o.caution, source: o.source, verifiedAt: o.verifiedAt, status: academic.opportunityProgress[o.id] || 'لم تُحدد مشاركة' }))
  };
}

export function setupAcademicUI({ getState, save, refresh, toast }) {
  const plan = document.getElementById('study-plan');
  const opportunities = document.getElementById('opportunities');
  if (!plan || !opportunities) return { render() {} };
  const filters = { city: '', category: '', institution: '', view: '', timing: 'upcoming', saved: false, text: '' };

  plan.innerHTML = `<div class="section-head"><div><h2>الخطة الدراسية</h2><p>مقررات البرنامج ومتطلباتها، مع متابعة تقدمك الدراسي.</p></div><a class="btn btn-soft btn-small" href="${PROGRAM.source}" target="_blank" rel="noopener">فتح الخطة الأصلية</a></div>
    <div class="academic-program panel"><div><span class="academic-eyebrow">${PROGRAM.university} · ${PROGRAM.faculty}</span><h3>${PROGRAM.name}</h3><p>أربعة فصول: 9 + 9 + 7 + 7 وحدات، والرسالة 10 وحدات.</p></div><div class="academic-unit-total"><strong>42</strong><span>وحدة معتمدة</span></div></div>
    <div id="academicProgress"></div>
    <p class="academic-note">سجّلي حالة المقررات وحددي المقررات الاختيارية لمتابعة الوحدات المجتازة.</p>
    <div class="academic-semesters" id="academicCourses"></div>
    <details class="academic-document"><summary>عرض الخطة الأصلية داخل المساحة</summary><p><a href="${PROGRAM.source}" download>تنزيل ملف الخطة الدراسية PDF</a></p><iframe src="${PROGRAM.source}" title="الخطة الدراسية الأصلية لبرنامج القيادة التعليمية" loading="lazy"></iframe></details>`;

  opportunities.innerHTML = `<div class="section-head"><div><h2>فرص النشر والمشاركة</h2><p>مؤتمرات ومعارض ومسابقات وفرص تطوير مهني.</p></div><span class="academic-verification">آخر تحقق: <bdi>${dateText(PROGRAM.verifiedAt)}</bdi></span></div>
    <div class="academic-opportunity-intro panel"><div><h3>مسارات المشاركة</h3><p>قدّمي ورقة بحثية أو عرضًا بحثيًا (بوسترًا علميًا)، أو شاركي بفكرة مبتكرة، أو اختاري فعالية للتطوير المهني.</p></div><a class="btn btn-soft btn-small" href="#calendar">التقويم</a></div>
    <div class="academic-filters panel"><div class="field"><label for="opportunityCity">المدينة</label><select id="opportunityCity"><option value="">كل المدن</option>${[...new Set([...OPPORTUNITIES, ...UNIVERSITY_RESOURCES].map(o => o.city))].map(city => `<option>${esc(city)}</option>`).join('')}</select></div>
    <div class="field"><label for="opportunityInstitution">الجهة</label><select id="opportunityInstitution"><option value="">كل الجهات</option>${Object.entries(INSTITUTION_FILTERS).map(([id,title]) => `<option value="${id}">${title}</option>`).join('')}</select></div>
    <div class="field"><label for="opportunityView">العرض</label><select id="opportunityView"><option value="">فعاليات ومصادر</option><option value="events">الفعاليات المؤرخة</option><option value="resources">المراكز ومصادر التطوير</option></select></div>
    <div class="field"><label for="opportunityCategory">نوع المشاركة</label><select id="opportunityCategory"><option value="">كل الأنواع</option>${Object.entries(CATEGORIES).map(([id, title]) => `<option value="${id}">${title}</option>`).join('')}</select></div>
    <div class="field"><label for="opportunityTiming">الفترة</label><select id="opportunityTiming"><option value="upcoming">فعاليات قادمة</option><option value="deadline">موعد تقديم قادم معلن</option><option value="all">كل الفرص</option></select></div>
    <div class="field"><label for="opportunitySearch">البحث</label><input id="opportunitySearch" type="search" placeholder="اسم الفرصة أو موضوعها"/></div>
    <label class="academic-saved-filter"><input type="checkbox" id="opportunitySaved"/>فرصي المختارة فقط</label></div>
    <p class="academic-note">تحققي من المواعيد والرسوم وشروط الجهة قبل التسجيل.</p>
    <div class="academic-result-heading"><strong id="opportunityResultCount" role="status" aria-live="polite"></strong><span>تُرتب حسب أقرب موعد تقديم معلن</span></div>
    <div class="academic-opportunity-grid" id="opportunityCards"></div>
    <div id="universityResourceSection"><div class="academic-resource-heading"><h3>مراكز ومصادر التطوير</h3><p>برامج ومصادر جامعية؛ مواعيد الدورات وأهلية التسجيل تُراجع مع الجهة.</p></div><div class="academic-opportunity-grid" id="universityResourceCards"></div></div>`;

  window.dispatchEvent(new Event('nora-academic-ready'));

  function renderPlan() {
    const academic = normalizeAcademic(getState().academic);
    const progress = planProgress(academic);
    document.getElementById('academicProgress').innerHTML = `<div class="academic-progress panel"><div><strong><bdi dir="ltr">${progress.units} / 42</bdi></strong><span>وحدة مجتازة بحسب تسجيلك</span></div><div class="academic-progress-track"><progress max="42" value="${progress.units}" aria-label="الوحدات المجتازة"></progress><span><bdi dir="ltr">${progress.percent}%</bdi></span></div><div><strong>${progress.studied}</strong><span>وحدات تدرسينها الآن</span></div></div>`;
    document.getElementById('academicCourses').innerHTML = SEMESTERS.map(semester => `<article class="academic-semester panel"><div class="academic-semester-head"><h3>${semester.title}</h3><span>${semester.units} وحدات</span></div><div class="academic-course-list">${semester.courses.map(course => {
      const chosen = academic.courseSelections[course.code] || '';
      const status = academic.courseProgress[course.code] || 'غير محددة';
      return `<div class="academic-course"><div class="academic-course-name">${course.elective ? `<span class="academic-course-kind">${course.title}</span><label class="visually-hidden" for="choice-${course.code}">اختيار ${course.title} في ${semester.title}</label><select id="choice-${course.code}" data-course-choice="${course.code}"><option value="">لم أحدد المقرر بعد</option>${electiveOptions(course).map(e => `<option value="${e.code}" ${chosen === e.code ? 'selected' : ''} ${Object.entries(academic.courseSelections).some(([key, val]) => key !== course.code && val === e.code) ? 'disabled' : ''}>${e.code} · ${e.title}</option>`).join('')}</select>` : `<bdi dir="ltr" class="academic-course-code">${course.code.replace('EDAD', 'EDAD ')}</bdi><h4>${course.title}</h4>`}
      ${course.prerequisites ? `<p class="academic-prerequisite">متطلب سابق: ${course.prerequisites.map(code => `<bdi dir="ltr">${code.replace('EDAD', 'EDAD ')}</bdi>`).join('، ')}</p>` : ''}</div><span class="academic-course-units">${course.units} وحدات</span><div class="academic-course-status"><label for="status-${course.code}">حالة ${course.elective ? 'المقرر الاختياري' : course.title}</label><select id="status-${course.code}" data-course-status="${course.code}">${COURSE_STATUSES.map(s => `<option ${status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div></div>`;
    }).join('')}</div></article>`).join('');
  }

  function renderOpportunities() {
    const academic = normalizeAcademic(getState().academic), today = todayKey();
    const text = filters.text.trim().toLocaleLowerCase('ar');
    const visible = OPPORTUNITIES.filter(o => filters.view !== 'resources' && matchesInstitution(o, filters.institution) && (!filters.city || o.city === filters.city) && (!filters.category || o.category === filters.category)
      && (!filters.saved || Boolean(academic.opportunityProgress[o.id])) && (filters.timing === 'all' || (filters.timing === 'upcoming' ? o.end >= today : nextOpportunityDeadline(o, today) !== '9999'))
      && (!text || `${o.title} ${o.organizer} ${o.city} ${o.fit} ${o.participation}`.toLocaleLowerCase('ar').includes(text)))
      .sort((a, b) => nextOpportunityDeadline(a, today).localeCompare(nextOpportunityDeadline(b, today)) || a.start.localeCompare(b.start));
    const resources = UNIVERSITY_RESOURCES.filter(o => filters.view !== 'events' && filters.timing !== 'deadline' && !filters.saved && matchesInstitution(o, filters.institution)
      && (!filters.city || o.city === filters.city) && (!filters.category || o.category === filters.category)
      && (!text || `${o.title} ${o.organizer} ${o.city} ${o.description}`.toLocaleLowerCase('ar').includes(text)));
    document.getElementById('opportunityResultCount').textContent = `الفعاليات: ${visible.length} · المصادر والمراكز: ${resources.length}`;
    document.getElementById('opportunityCards').hidden = filters.view === 'resources';
    document.getElementById('universityResourceSection').hidden = !resources.length;
    document.getElementById('universityResourceCards').innerHTML = resources.map(o => `<article class="academic-opportunity academic-resource" data-university-resource="${o.id}"><div class="academic-card-tags"><span>${esc(o.city)} · ${esc(o.institutionType)}</span><span>مصدر أو برنامج جامعي</span></div><h3>${esc(o.title)}</h3><p class="academic-organizer">${esc(o.organizer)}</p><span class="academic-deadline-badge">${esc(o.availability)}</span><p class="academic-fit">${esc(o.description)}</p><p class="academic-caution">${esc(o.caution)}</p>${o.contact ? `<p class="academic-resource-contact">للاستفسار: <a href="mailto:${esc(o.contact)}"><bdi dir="ltr">${esc(o.contact)}</bdi></a></p>` : ''}<div class="academic-source-links"><a href="${esc(o.source)}" target="_blank" rel="noopener">صفحة الجهة ↗</a></div><p class="academic-card-note">آخر تحقق: <bdi>${dateText(o.verifiedAt)}</bdi></p></article>`).join('');
    document.getElementById('opportunityCards').innerHTML = visible.length ? visible.map(o => {
      const next = nextOpportunityDeadline(o, today), ended = o.end < today;
      const status = academic.opportunityProgress[o.id] || '';
      const badge = ended ? 'انتهت الفعالية' : o.availability || (next !== '9999' ? 'موعد تقديم قادم' : o.deadlines.some(d => !d.conditional) ? 'انقضى موعد التقديم المعلن' : 'موعد التقديم غير معلن');
      const linked = getState().events.some(e => e.opportunityId === o.id) || getState().tasks.some(t => t.opportunityId === o.id);
      return `<article class="academic-opportunity" data-opportunity="${o.id}"><div class="academic-card-tags"><span>${o.city} · ${o.country}</span>${o.institutionType ? `<span>${esc(o.institutionType)}</span>` : ''}<span class="academic-category-${o.category}">${CATEGORIES[o.category]}</span></div>
      <h3>${esc(o.title)}</h3><p class="academic-organizer">${esc(o.organizer)}</p><div class="academic-event-date"><span>${esc(o.format)}</span><strong>${dateText(o.start)}${o.end !== o.start ? ` — ${dateText(o.end)}` : ''}</strong></div>
      <div class="academic-deadlines"><span class="academic-deadline-badge ${next !== '9999' ? 'is-open' : ''}">${badge}</span>${o.deadlines.length ? `<ul>${o.deadlines.map(d => `<li class="${d.date < today ? 'is-past' : ''}"><span>${esc(d.label)}${d.conditional ? ' · بعد القبول' : ''}</span><bdi>${dateText(d.date)}</bdi></li>`).join('')}</ul>` : '<p>راجعي الجهة لتأكيد فتح التسجيل وموعد إغلاقه.</p>'}</div>
      <p class="academic-fit"><strong>مجالات الاستفادة:</strong> ${esc(o.fit)}</p><p class="academic-fee"><strong>التكلفة:</strong> ${esc(o.fee)}</p>
      <details class="academic-opportunity-details"><summary>الشروط وملاحظات التقديم</summary><p>${esc(o.participation)}</p><p class="academic-caution">${esc(o.caution)}</p></details>
      <div class="academic-source-links"><a href="${esc(o.source)}" target="_blank" rel="noopener">المصدر الرسمي ↗</a>${o.secondSource ? `<a href="${esc(o.secondSource)}" target="_blank" rel="noopener">تفاصيل إضافية ↗</a>` : ''}${(o.additionalSources || []).map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}</div>
      <div class="academic-card-actions"><div class="field"><label for="participation-${o.id}">حالة مشاركتي</label><select id="participation-${o.id}" data-participation="${o.id}">${PARTICIPATION_STATUSES.map(s => `<option value="${s}" ${s === status ? 'selected' : ''}>${s || 'لم أحدد بعد'}</option>`).join('')}</select></div><button type="button" class="btn btn-soft btn-small" data-add-opportunity="${o.id}" ${ended ? 'disabled' : ''}>${linked ? 'استكمال المواعيد والمهام' : 'إضافة المواعيد ومهمة التحضير'}</button></div>
      <p class="academic-card-note">تُضاف المواعيد القادمة فقط؛ النسخة النهائية المشروطة تُضاف بعد اختيار «مقبولة». آخر تحقق: <bdi>${dateText(o.verifiedAt)}</bdi>.</p></article>`;
    }).join('') : resources.length ? '' : '<div class="empty-state">لا توجد نتائج تطابق هذه الخيارات. غيّري الجهة أو المدينة أو النوع أو الفترة.</div>';
    if (!visible.length && !resources.length) document.getElementById('opportunityCards').hidden = false;
  }

  plan.addEventListener('change', event => {
    const target = event.target, state = getState();
    if (!target.dataset.courseStatus && !target.dataset.courseChoice) return;
    state.academic = normalizeAcademic(state.academic);
    if (target.dataset.courseStatus) state.academic.courseProgress[target.dataset.courseStatus] = target.value;
    else {
      const slot = courses.find(c => c.code === target.dataset.courseChoice);
      if (target.value && (!electiveOptions(slot).some(c => c.code === target.value) || Object.entries(state.academic.courseSelections).some(([key, val]) => key !== slot.code && val === target.value))) {
        toast('اختاري مقررًا مناسبًا لوحدات الخطة ولم يُحدد في فصل آخر'); renderPlan(); return;
      }
      if (target.value) state.academic.courseSelections[slot.code] = target.value;
      else delete state.academic.courseSelections[slot.code];
    }
    const focusId = target.id; save('تم حفظ تقدم الخطة الدراسية'); renderPlan(); document.getElementById(focusId)?.focus();
  });

  opportunities.addEventListener('change', event => {
    const target = event.target;
    if (target.dataset.participation) {
      const state = getState(); state.academic = normalizeAcademic(state.academic);
      if (target.value) state.academic.opportunityProgress[target.dataset.participation] = target.value;
      else delete state.academic.opportunityProgress[target.dataset.participation];
      save('تم حفظ حالة المشاركة'); renderOpportunities(); document.getElementById(target.id)?.focus();
      return;
    }
    if (target.id === 'opportunityCity') filters.city = target.value;
    else if (target.id === 'opportunityInstitution') filters.institution = target.value;
    else if (target.id === 'opportunityView') filters.view = target.value;
    else if (target.id === 'opportunityCategory') filters.category = target.value;
    else if (target.id === 'opportunityTiming') filters.timing = target.value;
    else if (target.id === 'opportunitySaved') filters.saved = target.checked;
    else return;
    renderOpportunities();
  });
  document.getElementById('opportunitySearch').addEventListener('input', event => { filters.text = event.target.value; renderOpportunities(); });
  opportunities.addEventListener('click', event => {
    if (event.target.closest('a[href="#calendar"]')) {
      event.preventDefault(); document.querySelector('.sticky-nav a[data-target="calendar"]')?.click(); return;
    }
    const button = event.target.closest('[data-add-opportunity]');
    if (!button) return;
    const opportunity = OPPORTUNITIES.find(o => o.id === button.dataset.addOpportunity);
    if (!opportunity) return;
    const result = addOpportunityToState(getState(), opportunity);
    if (result.tasks || result.events) { save('تمت إضافة الفرصة للمهام والتقويم'); refresh(); toast(`أُضيفت ${result.events} مواعيد و${result.tasks} مهمة تحضير`); }
    else toast('المواعيد والمهام القادمة مضافة بالفعل');
    renderOpportunities(); document.getElementById(`participation-${opportunity.id}`)?.focus();
  });
  return { render() { renderPlan(); renderOpportunities(); } };
}

