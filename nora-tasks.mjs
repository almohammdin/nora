import { OPPORTUNITIES } from './nora-academic-data.mjs?v=5';

export const TASK_GROUPS = { thesis: 'الرسالة', assignments: 'تكاليف', participations: 'مشاركات' };
export const TASK_SUBJECTS = { issues: 'قضايا', technology: 'تقنيات', organizational: 'تطوير تنظيمي' };

export function taskGroup(task) {
  return Object.hasOwn(TASK_GROUPS, task.group) ? task.group : 'thesis';
}

export function normalizeTaskGrouping(task) {
  const group = taskGroup(task);
  return { ...task, group, subject: group === 'assignments' ? (Object.hasOwn(TASK_SUBJECTS, task.subject) ? task.subject : 'issues') : '', participation: group === 'participations' ? String(task.participation || '').trim() : '' };
}

export function taskContext(task) {
  const group = taskGroup(task);
  if (group === 'assignments') return TASK_SUBJECTS[task.subject] || 'قضايا';
  if (group === 'participations') return task.participation || 'مشاركات';
  return task.stage || 'الرسالة';
}

export function tasksInView(tasks, view) {
  return tasks.filter(task => taskGroup(task) === view.group && (view.group !== 'assignments' || (task.subject || 'issues') === view.subject) && (view.group !== 'participations' || !view.participation || task.participation === view.participation));
}

export function setupTaskUI({ getState, newTask, save, toast, formatDate, todayKey }) {
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const view = { group: 'thesis', subject: 'issues', participation: '' };
  const drafts = new Map();
  const fields = ['taskEditId', 'taskTitle', 'taskStage', 'taskDue', 'taskPriority', 'taskStatus', 'taskOutput', 'taskNotes', 'taskParticipation'];
  const statuses = ['لم تبدأ', 'قيد التنفيذ', 'بانتظار المشرف', 'تحتاج تعديل', 'معتمدة', 'مكتملة'];
  const key = () => view.group + (view.group === 'assignments' ? ':' + view.subject : '');

  function capture() { return Object.fromEntries(fields.map(id => [id, $(id).value])); }
  function blank() { return { taskEditId: '', taskTitle: '', taskStage: $('taskStage').value, taskDue: '', taskPriority: 'متوسطة', taskStatus: 'لم تبدأ', taskOutput: '', taskNotes: '', taskParticipation: '' }; }
  function restore(draft) { fields.forEach(id => { $(id).value = draft[id] || ''; }); }

  function reset() {
    drafts.delete(key()); restore(blank()); syncContext();
  }

  function show(group, subject = view.subject) {
    if (!Object.hasOwn(TASK_GROUPS, group)) return;
    drafts.set(key(), capture());
    view.group = group; view.subject = Object.hasOwn(TASK_SUBJECTS, subject) ? subject : 'issues';
    restore(drafts.get(key()) || blank());
    render();
  }

  function syncContext() {
    const assignment = view.group === 'assignments', participation = view.group === 'participations';
    $('taskSubjectNavigation').hidden = !assignment;
    $('taskParticipationFilters').hidden = !participation;
    $('taskStageField').hidden = view.group !== 'thesis';
    $('taskParticipationField').hidden = !participation;
    $('taskContextHeading').textContent = assignment ? `تكاليف مادة ${TASK_SUBJECTS[view.subject]}` : participation ? 'مهام المشاركات' : 'مهام الرسالة';
    $('taskSectionDescription').textContent = assignment ? 'تكاليف المواد ومواعيد تسليمها.' : participation ? 'مهام الاستعداد للهاكاثونات والمؤتمرات.' : 'كل مهمة مرتبطة بمرحلة ومخرج وموعد وحالة تنفيذ واضحة.';
    $('taskTitleLabel').textContent = assignment ? 'اسم التكليف' : 'اسم المهمة';
    $('taskDueLabel').textContent = assignment ? 'موعد التسليم' : 'تاريخ الاستحقاق';
    $('taskTitle').placeholder = assignment ? 'مثال: إعداد عرض أو تسليم ورقة' : participation ? 'مثال: تجهيز العرض أو متابعة التسجيل' : 'مثال: مراجعة صياغة مشكلة الدراسة';
    $('saveTaskBtn').textContent = $('taskEditId').value ? 'حفظ التعديل' : assignment ? 'إضافة التكليف' : 'إضافة المهمة';
    $('cancelTaskEditBtn').classList.toggle('hidden', !$('taskEditId').value);
  }

  function renderNavigation() {
    const tasks = getState().tasks;
    $('taskGroupNavigation').innerHTML = Object.entries(TASK_GROUPS).map(([id, label]) => `<button type="button" class="task-group-button ${id === view.group ? 'is-active' : ''}" data-task-group="${id}" aria-label="${label}" aria-pressed="${id === view.group}"><span>${label}</span><span class="task-group-count">${tasks.filter(t => taskGroup(t) === id).length}</span></button>`).join('');
    $('taskSubjectNavigation').innerHTML = Object.entries(TASK_SUBJECTS).map(([id, label]) => {
      const items = tasksInView(tasks, { group: 'assignments', subject: id }), open = items.filter(t => t.status !== 'مكتملة');
      const next = open.filter(t => t.due).sort((a,b) => a.due.localeCompare(b.due))[0];
      return `<button type="button" class="task-subject-button ${id === view.subject ? 'is-active' : ''}" data-task-subject="${id}" aria-label="${label}" aria-pressed="${id === view.subject}"><strong>${label}</strong><span>${items.length} تكليف · ${open.length} غير مكتمل</span><small>${next ? `أقرب تسليم: ${formatDate(next.due, { year: 'numeric' })}` : 'أضيفي التكليف وموعد تسليمه'}</small></button>`;
    }).join('');
    const names = [...new Set(tasks.filter(t => taskGroup(t) === 'participations' && t.participation).map(t => t.participation))].sort((a,b) => a.localeCompare(b,'ar'));
    if (view.participation && !names.includes(view.participation)) view.participation = '';
    $('taskParticipationFilter').innerHTML = '<option value="">كل المشاركات</option>' + names.map(name => `<option value="${esc(name)}" ${view.participation === name ? 'selected' : ''}>${esc(name)}</option>`).join('');
    $('taskParticipationSuggestions').innerHTML = [...new Set([...names, ...OPPORTUNITIES.map(o => o.title)])].map(name => `<option value="${esc(name)}"></option>`).join('');
    syncContext();
  }

  function render() {
    renderNavigation();
    const search = $('taskSearch').value.trim().toLocaleLowerCase('ar'), filter = $('taskFilter').value, today = todayKey();
    const filtered = tasksInView(getState().tasks, view).filter(task => (filter === 'all' || (filter === 'open' ? task.status !== 'مكتملة' : task.status === filter)) && (!search || `${task.title} ${taskContext(task)} ${task.output} ${task.notes}`.toLocaleLowerCase('ar').includes(search)))
      .sort((a,b) => (a.status === 'مكتملة') - (b.status === 'مكتملة') || (a.due || '9999').localeCompare(b.due || '9999'));
    $('taskCount').textContent = filtered.length;
    $('taskCountLabel').textContent = view.group === 'assignments' ? 'تكليف' : 'مهمة';
    $('taskList').innerHTML = filtered.length ? filtered.map(task => {
      const overdue = task.due && task.due < today && task.status !== 'مكتملة';
      return `<article class="task-card ${task.status === 'مكتملة' ? 'done' : ''}" data-id="${esc(task.id)}"><div><div class="task-title-row"><h3>${esc(task.title || 'مهمة بلا عنوان')}</h3><span class="meta-pill ${task.priority === 'عالية' ? 'high' : ''}">${esc(task.priority)}</span>${overdue ? '<span class="meta-pill overdue">متأخرة</span>' : ''}</div><div class="task-meta"><span class="meta-pill">${esc(taskContext(task))}</span>${task.due ? `<span class="meta-pill">${view.group === 'assignments' ? 'التسليم: ' : ''}${formatDate(task.due, { year: 'numeric' })}</span>` : ''}</div>${task.output ? `<div class="task-output"><strong>المخرج:</strong> ${esc(task.output)}</div>` : ''}${task.notes ? `<div class="task-notes">${esc(task.notes)}</div>` : ''}</div><div class="task-actions"><select class="inline-status" data-action="status" aria-label="حالة ${esc(task.title)}">${statuses.map(s => `<option ${task.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select><button class="btn btn-outline btn-small" data-action="edit" type="button">تعديل</button><button class="btn btn-danger btn-small" data-action="delete" type="button">حذف</button></div></article>`;
    }).join('') : `<div class="empty-state">${view.group === 'assignments' ? 'لا توجد تكاليف مطابقة لهذه المادة. أضيفي التكليف وموعد تسليمه من النموذج أعلاه.' : 'لا توجد مهام مطابقة. أضيفي أول مهمة من النموذج أعلاه.'}</div>`;
  }

  function values() {
    return { title: $('taskTitle').value.trim(), group: view.group, subject: view.group === 'assignments' ? view.subject : '', participation: view.group === 'participations' ? $('taskParticipation').value.trim() : '', stage: view.group === 'thesis' ? $('taskStage').value : '', due: $('taskDue').value, priority: $('taskPriority').value, status: $('taskStatus').value, output: $('taskOutput').value.trim(), notes: $('taskNotes').value.trim() };
  }

  function saveTask() {
    const entry = values(), state = getState(), id = $('taskEditId').value;
    if (!entry.title) { toast(view.group === 'assignments' ? 'اكتبي اسم التكليف' : 'اكتبي اسم المهمة'); $('taskTitle').focus(); return; }
    if (id) {
      const task = state.tasks.find(t => t.id === id);
      if (!task) { toast('المهمة لم تعد موجودة'); reset(); render(); return; }
      Object.assign(task, entry, { updatedAt: Date.now() });
    } else state.tasks.push({ ...newTask(), ...entry });
    save(view.group === 'assignments' ? 'تم حفظ التكليف' : 'تم حفظ المهمة');
    reset(); render();
  }

  $('taskGroupNavigation').addEventListener('click', event => { const button = event.target.closest('[data-task-group]'); if (button && button.dataset.taskGroup !== view.group) show(button.dataset.taskGroup); });
  $('taskSubjectNavigation').addEventListener('click', event => { const button = event.target.closest('[data-task-subject]'); if (button && button.dataset.taskSubject !== view.subject) show('assignments', button.dataset.taskSubject); });
  $('taskParticipationFilter').addEventListener('change', event => { view.participation = event.target.value; render(); });
  $('taskList').addEventListener('change', event => {
    if (event.target.dataset.action !== 'status') return;
    const task = getState().tasks.find(t => t.id === event.target.closest('[data-id]').dataset.id);
    if (!task) return;
    task.status = event.target.value; task.updatedAt = Date.now(); save('تم تحديث حالة المهمة'); render();
  });
  $('taskList').addEventListener('click', event => {
    const button = event.target.closest('[data-action]'); if (!button) return;
    const state = getState(), task = state.tasks.find(t => t.id === button.closest('[data-id]').dataset.id); if (!task) return;
    if (button.dataset.action === 'edit') {
      drafts.set(key(), capture());
      restore({ taskEditId: task.id, taskTitle: task.title, taskStage: task.stage, taskDue: task.due, taskPriority: task.priority, taskStatus: task.status, taskOutput: task.output, taskNotes: task.notes, taskParticipation: task.participation });
      syncContext(); $('taskTitle').focus();
    } else if (button.dataset.action === 'delete' && confirm(view.group === 'assignments' ? 'حذف هذا التكليف؟' : 'حذف هذه المهمة؟')) {
      state.tasks = state.tasks.filter(t => t.id !== task.id);
      for (const [key, draft] of drafts) if (draft.taskEditId === task.id) drafts.delete(key);
      if ($('taskEditId').value === task.id) reset();
      save('تم حذف المهمة'); render();
    }
  });
  return { render, reset, values, saveTask, show };
}
