export const PROGRAM = Object.freeze({
  name: 'ماجستير القيادة التعليمية بالمقررات والرسالة',
  university: 'جامعة الملك عبدالعزيز', faculty: 'كلية التربية', units: 42,
  source: './assets/educational-leadership-study-plan.pdf', verifiedAt: '2026-10-06'
});

export const SEMESTERS = [
  { id: 's1', title: 'المستوى الأول · الفصل الأول', units: 9, courses: [
    { code: 'EDAD620', title: 'نظريات القيادة التعليمية', units: 3 },
    { code: 'EDAD611', title: 'اقتصاديات التعليم', units: 3 },
    { code: 'EDAD627', title: 'إدارة الموارد البشرية في المؤسسات التعليمية', units: 3 }
  ] },
  { id: 's2', title: 'المستوى الأول · الفصل الثاني', units: 9, courses: [
    { code: 'EDAD694', title: 'طرق البحث العلمي', units: 3 },
    { code: 'EDAD613', title: 'التخطيط التربوي', units: 3 },
    { code: 'elective-s2', title: 'مقرر اختياري من القسم', units: 3, elective: 'department' }
  ] },
  { id: 's3', title: 'المستوى الثاني · الفصل الأول', units: 7, courses: [
    { code: 'EDAD690', title: 'مدخل إلى مناهج البحوث الكمية', units: 2, prerequisites: ['EDAD694'] },
    { code: 'EDAD691', title: 'مدخل إلى مناهج البحوث النوعية', units: 2, prerequisites: ['EDAD694'] },
    { code: 'elective-s3', title: 'مقرر اختياري من القسم', units: 3, elective: 'department' }
  ] },
  { id: 's4', title: 'المستوى الثاني · الفصل الثاني', units: 7, courses: [
    { code: 'EDAD619', title: 'التطوير التنظيمي في المؤسسات التعليمية', units: 3 },
    { code: 'elective-s4-department', title: 'مقرر اختياري من القسم', units: 2, elective: 'department' },
    { code: 'elective-s4', title: 'مقرر اختياري', units: 2, elective: 'any' }
  ] },
  { id: 'thesis', title: 'الرسالة', units: 10, courses: [
    { code: 'EDAD699', title: 'الرسالة', units: 10, prerequisites: ['EDAD690', 'EDAD691'] }
  ] }
];

export const ELECTIVES = [
  { code: 'EDAD621', title: 'إدارة الجودة في المؤسسات التعليمية', units: 3 },
  { code: 'EDAD622', title: 'تحليل السياسات التعليمية', units: 2 },
  { code: 'EDAD623', title: 'مدخل إلى التعليم الدولي والمقارن', units: 3 },
  { code: 'EDAD624', title: 'تطبيقات الحوكمة في التعليم', units: 2 },
  { code: 'EDAD625', title: 'السلوك التنظيمي في المؤسسات التعليمية', units: 3 },
  { code: 'EDAD626', title: 'قضايا واتجاهات معاصرة في نظام التعليم', units: 2 },
  { code: 'BUS608', title: 'الريادة والابتكار', units: 2 },
  { code: 'FOU630', title: 'أصول التربية', units: 2 },
  { code: 'EDCG670', title: 'علم نفس الإبداع', units: 2 },
  { code: 'EDET640', title: 'تطبيقات تقنيات التعليم والمعلومات', units: 2 }
];

// A curated snapshot, not a live registration feed. Unknown costs and deadlines stay unknown.
export const OPPORTUNITIES = [
  {
    id: 'buid-leadership-2026', title: 'المؤتمر الدولي للإدارة والقيادة التعليمية',
    organizer: 'الجامعة البريطانية في دبي', city: 'دبي', country: 'الإمارات', category: 'paper', format: 'حضوري وهجين',
    start: '2026-11-07', end: '2026-11-07',
    deadlines: [{ label: 'تقديم المستخلص', date: '2026-10-10' }, { label: 'الورقة الكاملة', date: '2026-10-30' }],
    fee: 'الرسوم غير مؤكدة في المعلومات المتاحة.',
    participation: 'ورقة بحثية أو ملصق؛ مراجعة شروط القبول والتسجيل قبل الدفع.',
    fit: 'القيادة والإدارة التعليمية والحوكمة والتفاعل بين الإنسان والذكاء الاصطناعي والنزاهة الأكاديمية.',
    caution: 'اختيار المسار المناسب ومراجعة متطلبات الورقة مع المشرفة؛ القبول والنشر يخضعان لشروط الجهة.',
    source: 'https://www.buid.ac.ae/conferences/educational-management-leadership-conference/international-conference-on-educational-management-and-leadership-2026/',
    action: 'اختيار مسار بحثي وإعداد مستخلص الورقة'
  },
  {
    id: 'pnu-hackathon-2026', title: 'هاكاثون الحلول المبتكرة لجودة الحياة',
    organizer: 'جامعة الأميرة نورة بنت عبدالرحمن', city: 'الرياض', country: 'السعودية', category: 'innovation', format: 'معسكر عن بُعد وفعالية حضورية',
    start: '2026-11-08', end: '2026-11-10', deadlines: [{ label: 'التسجيل', date: '2026-10-11' }],
    fee: 'لم تُؤكد رسوم مشاركة.',
    participation: 'فريق من 3–5 أفراد؛ قائد سعودي من طلبة الجامعات السعودية، ومشرف أكاديمي أو إداري وعضو تقني. العمر 18+ وحضور فردين على الأقل؛ المشاركة بالعربية.',
    fit: 'تطوير أفكار تعليمية أو مجتمعية مبتكرة لتحسين جودة الحياة.',
    caution: 'تُشترط عدم مشاركة الفكرة سابقًا أو فوزها أو حصولها على تمويل في مسابقة أو هاكاثون. تُراجع أهلية الفكرة المختارة بحسب مشاركاتها السابقة. المعسكر 18–22 أكتوبر.',
    source: 'https://pnuhackathon.com/', secondSource: 'https://pnu.edu.sa/en/MediaCenter/News/Pages/NewsDetails.aspx?RequestID=1199',
    action: 'مراجعة أهلية الفكرة المختارة وتكوين الفريق وتجهيز نموذج أولي'
  },
  {
    id: 'smf-startups-2026', title: 'Saudi Makes Future · مسابقة الشركات الناشئة',
    organizer: 'Saudi Makes Future', city: 'الرياض', country: 'السعودية', category: 'innovation', format: 'حضوري',
    start: '2026-12-14', end: '2026-12-16',
    deadlines: [{ label: 'الجولة الأولى', date: '2026-10-15' }, { label: 'الجولة الثانية', date: '2026-12-10' }],
    fee: 'المسابقة مجانية وفق التعليمات؛ الجوائز خدمات وليست مبالغ نقدية.',
    participation: 'أفكار ومشروعات ريادية مبتكرة؛ قطاع التعليم والعمل مناسب للمشروع.',
    fit: 'تطوير فكرة ريادية وتحديد المستفيد والقيمة التطبيقية، بما يشمل قطاع التعليم والعمل.',
    caution: 'توجد عبارة قديمة تفيد إغلاق الدعوة إلى جانب الدعوة المفتوحة والنموذج والمواعيد؛ تأكيد التسجيل مع المنظم قبل الاعتماد على الموعد.',
    source: 'https://www.saudimakesfuture.com/startup-competition/instructions/', secondSource: 'https://www.saudimakesfuture.com/call/startup-competition/',
    action: 'تأكيد فتح المسابقة وتجهيز عرض للفكرة المختارة ونموذج القيمة'
  },
  {
    id: 'inqaahe-doha-2027', title: 'المؤتمر التاسع عشر لـ INQAAHE',
    organizer: 'INQAAHE واللجنة الوطنية للمؤهلات والاعتماد الأكاديمي', city: 'الدوحة', country: 'قطر', category: 'paper', format: 'حضوري',
    start: '2027-04-04', end: '2027-04-07', deadlines: [{ label: 'تقديم المقترح', date: '2026-10-31' }, { label: 'النسخة النهائية للمقبولين', date: '2027-02-28', conditional: true }],
    fee: 'التسجيل العادي: 525 دولارًا للعضو الفردي و575 دولارًا لغير العضو. البث بـ100 دولار للكلمات الرئيسة فقط.',
    participation: 'جلسة تفاعلية: مستخلص 100–150 كلمة ومخطط حتى 1000 كلمة؛ مقترح الملصق حتى 250 كلمة. إخطار القبول 15 ديسمبر.',
    fit: 'ضمان جودة التعليم والحوكمة والأثر المجتمعي وأخلاقيات الذكاء الاصطناعي والثقة.',
    caution: 'التقديم هنا مقترح جلسة أو ملصق؛ لا يعني تلقائيًا نشر مقال في مجلة. البث لا يساوي مشاركة بحثية افتراضية.',
    source: 'https://inqaahe2027-doha.org/call-for-proposals/', secondSource: 'https://www.inqaahe.org/events/inqaahe-conference-2027-doha-qatar/',
    action: 'اختيار محور في ضمان الجودة وتجهيز مقترح جلسة أو ملصق'
  },
  {
    id: 'ichess-muscat-2026', title: 'ICHESS 2026 · العلوم الإنسانية والتربوية والاجتماعية',
    organizer: 'الكلية الحديثة للتجارة والعلوم', city: 'مسقط', country: 'عُمان', category: 'paper', format: 'حضوري وهجين',
    start: '2026-12-02', end: '2026-12-03', deadlines: [{ label: 'الورقة الكاملة', date: '2026-10-31' }],
    fee: 'الرسوم لم تُؤكد؛ مراجعة صفحة التسجيل.',
    participation: 'طلبة البكالوريوس والماجستير والدكتوراه؛ أوراق وملصقات وورش، مع عرض عبر Microsoft Teams.',
    fit: 'الدراسات التربوية والقيادة التعليمية واستخدام التقنيات في التعليم.',
    caution: 'مواعيد تسجيل المقدّمين تختلف بين صفحة الأسئلة والجدول؛ تأكيد الموعد والرسوم مع الجهة.',
    source: 'https://ichess.mcbs.edu.om/call-for-papers/', secondSource: 'https://ichess.mcbs.edu.om/important-dates/',
    action: 'مراجعة مسار التربية ومتطلبات الورقة الكاملة'
  },
  {
    id: 'kau-sustainability-2026', title: 'استدامة ثون · من التحدي إلى الأثر',
    organizer: 'جامعة الملك عبدالعزيز', city: 'جدة', country: 'السعودية', category: 'innovation', format: 'حضوري',
    start: '2026-11-15', end: '2026-11-16', deadlines: [{ label: 'التسجيل وفق الملصق المرفق', date: '2026-10-30' }],
    fee: 'لم تُؤكد رسوم مشاركة؛ إجمالي الجوائز 25 ألف ريال وفق الملصق.',
    participation: 'هاكاثون ضمن المؤتمر الدولي الثاني للاستدامة وجودة الحياة، ومن مساراته التعليم والابتكار والحوكمة.',
    fit: 'تطوير أفكار في التعليم والابتكار والحوكمة تعزز الاستدامة وجودة الحياة.',
    caution: 'موعد التسجيل والجوائز من الملصق الذي أُرسل للمساحة؛ رابط المصدر أدناه للمؤتمر. يجب مراجعة شروط الهاكاثون مباشرة، والتقديم لا يثبت القبول.',
    source: 'https://kau.edu.sa/faculty/en/human-sciences-design/page-legacy/International%20Conference%20on%20Sustainability%20and%20Quality%20of%20Life',
    action: 'تجهيز طلب المشاركة ونموذج أولي للفكرة المختارة وخطة لقياس الأثر'
  },
  {
    id: 'mec-student-2027', title: 'المؤتمر الثامن لأبحاث الطلبة',
    organizer: 'Middle East College', city: 'مسقط', country: 'عُمان', category: 'paper', format: 'حضوري وهجين',
    start: '2027-04-06', end: '2027-04-06',
    deadlines: [{ label: 'المستخلص', date: '2027-02-20' }, { label: 'الورقة الكاملة', date: '2027-03-26' }, { label: 'التسجيل المبكر بعد القبول', date: '2027-03-30', conditional: true }],
    fee: 'مقدّم خارجي: 20 ريالًا عُمانيًا مبكرًا و30 عاديًا؛ حضور خارجي: 5 و10 ريالات.',
    participation: 'مشروعات المقررات والأبحاث الجاري تنفيذها والملصقات والنماذج الأولية؛ هوية طالب أو خطاب إثبات. التسجيل بعد القبول، والعرض الافتراضي 15 دقيقة.',
    fit: 'عرض بحوث طلبة في القيادة والسياسات التعليمية والتعلّم الإلكتروني وحوكمة المعرفة، أو مشروعات مقررات ونماذج أولية.',
    caution: 'إخطار القبول يبدأ 17 مارس. ترشيح أوراق مختارة لمجلة لا يضمن النشر أو الفهرسة.',
    source: 'https://mec.edu.om/8thsrc/CallforPapers.html', secondSource: 'https://mec.edu.om/8thsrc/Registration.html',
    action: 'تجهيز مستخلص بحث طلابي أو مقترح ملصق للفكرة المختارة'
  },
  {
    id: 'gess-dubai-2026', title: 'GESS Dubai · معرض ومؤتمر التعليم',
    organizer: 'GESS Dubai', city: 'دبي', country: 'الإمارات', category: 'development', format: 'حضوري',
    start: '2026-11-10', end: '2026-11-12', deadlines: [],
    fee: 'تصريح زيارة مجاني؛ العارض له مسار منفصل.',
    participation: 'زيارة وجلسات وتواصل مع جهات ومنتجات تقنيات التعليم.',
    fit: 'التعرف على منتجات تقنيات التعليم وبناء علاقات مع جهات تعليمية وموردي التقنيات.',
    caution: 'لم تُثبت دعوة لنشر ورقة بحثية؛ لا يوجد موعد إغلاق تسجيل مؤكد في النتائج.',
    source: 'https://www.gessdubai.com/', action: 'اختيار الجلسات والجهات وفق أهداف الحضور'
  },
  {
    id: 'north-star-2026', title: 'Expand North Star',
    organizer: 'Expand North Star', city: 'دبي', country: 'الإمارات', category: 'innovation', format: 'حضوري',
    start: '2026-12-08', end: '2026-12-10', deadlines: [],
    fee: 'تكلفة المشاركة أو العرض لم تُؤكد.',
    participation: 'تسجيل زائر أو استفسار عن عرض مشروع ناشئ والتواصل مع مستثمرين ومرشدين.',
    fit: 'عرض مشروع ريادي واستكشاف الشراكات والإرشاد والاستثمار بعد تجهيز نموذج قابل للعرض.',
    caution: 'لم تُؤكد رسوم أو موعد إغلاق مسابقة؛ المعرض لا يضمن التمويل أو القبول.',
    source: 'https://expandnorthstar.com/', secondSource: 'https://www.dubaiexhibitioncentre.com/en/whats-on/expand-north-star-2026',
    action: 'مراجعة مسار الشركات الناشئة وتجهيز عرض ونموذج للمشروع المختار'
  },
  {
    id: 'saudi-stem-2027', title: 'Saudi STEM Leadership Summit',
    organizer: 'Saudi STEM Leadership Summit', city: 'الرياض', country: 'السعودية', category: 'development', format: 'حضوري',
    start: '2027-01-20', end: '2027-01-21', deadlines: [],
    fee: 'الرسوم لم تُؤكد؛ المتاح تسجيل الاهتمام.',
    participation: 'قمة مهنية في قيادة تعليم العلوم والتقنية والهندسة والرياضيات؛ إنتركونتيننتال الرياض.',
    fit: 'تعزيز المعرفة بالقيادة التعليمية وبناء العلاقات المهنية.',
    caution: 'لم تُثبت دعوة أوراق أكاديمية أو موعد إغلاق؛ ليست فرصة نشر مؤكدة.',
    source: 'https://www.saudistem.com/', action: 'مراجعة البرنامج وتحديد أهداف الحضور في القيادة التعليمية'
  },
  {
    id: 'meslc-dubai-2027', title: 'مؤتمر القيادة المدرسية في الشرق الأوسط',
    organizer: 'Middle East School Leadership Conference', city: 'دبي', country: 'الإمارات', category: 'development', format: 'حضوري',
    start: '2027-01-27', end: '2027-01-28', deadlines: [],
    fee: 'تختلف حسب فئة التذكرة؛ أهلية الطالبة لسعر المدارس غير مؤكدة.',
    participation: 'قيادة إنسانية وممارسات مدرسية؛ نموذج تقديم متحدث متاح؛ Al Habtoor Grand في دبي مارينا.',
    fit: 'قريب من تخصص القيادة التعليمية ويصلح للتطوير أو عرض تجربة تطبيقية.',
    caution: 'لم يُعلن موعد إغلاق تقديم المتحدثين في النتائج؛ المشاركة المهنية لا تعني نشر ورقة محكّمة.',
    source: 'https://schoolleadersme.com/', secondSource: 'https://teachmiddleeast.formaloo.me/2027meslc',
    action: 'مراجعة أهلية تقديم جلسة وربطها بالقيادة التعليمية'
  },
  {
    id: 'web-summit-qatar-2027', title: 'Web Summit Qatar · برنامج الشركات الناشئة',
    organizer: 'Web Summit Qatar', city: 'الدوحة', country: 'قطر', category: 'innovation', format: 'حضوري',
    start: '2027-01-31', end: '2027-02-03', deadlines: [],
    fee: 'التكلفة لم تُؤكد؛ قبول المشروع لا يعني مجانية المشاركة.',
    participation: 'تقديم برنامج الشركات الناشئة لعام 2027؛ المختار يحصل على 3 تذاكر وأهلية برامج العرض والإرشاد والتواصل مع المستثمرين.',
    fit: 'عرض مشروع ناشئ واستكشاف الإرشاد والشراكات وفرص التواصل مع المستثمرين.',
    caution: 'موعد إغلاق الطلبات غير مؤكد؛ اختيار المشروع والبرامج الإضافية يخضع لشروط المنظم.',
    source: 'https://qatar.websummit.com/startups/', action: 'تجهيز ملف المشروع المختار ومراجعة شروط وتكلفة برنامج الشركات الناشئة'
  },
  {
    id: 'edgex-riyadh-2027', title: 'EDGEx · معرض ومؤتمر التعليم',
    organizer: 'EDGEx', city: 'الرياض', country: 'السعودية', category: 'development', format: 'حضوري',
    start: '2027-04-12', end: '2027-04-14', deadlines: [],
    fee: 'الرسوم لم تُؤكد؛ تسجيل اهتمام واستفسار عن التحدث.',
    participation: 'ريتز كارلتون الرياض؛ منطقة للتعليم العالي وتواصل مع جهات تعليمية.',
    fit: 'معرفة الاتجاهات الحديثة في التعليم والقيادة واستكشاف الشراكات التعليمية.',
    caution: 'لم تُثبت دعوة أوراق محكّمة أو موعد إغلاق تقديم المتحدثين.',
    source: 'https://edgexsa.com/', action: 'متابعة برنامج التعليم العالي ومراجعة فرص التحدث والشراكة'
  },
  {
    id: 'educonf-riyadh-2027', title: 'مؤتمر التطوير التعليمي',
    organizer: 'رؤية الغد للمؤتمرات', city: 'الرياض', country: 'السعودية', category: 'paper', format: 'حضوري',
    start: '2027-07-30', end: '2027-08-01', deadlines: [],
    fee: 'الباقة الأساسية 1200 ريال؛ توجد باقات أخرى. تأكيد ما تشمله الرسوم قبل التسجيل.',
    participation: 'أوراق بحثية وأوراق عمل في الإدارة والقيادة والتقنيات والتخطيط؛ Golden Tulip الرياض.',
    fit: 'قريب من التخصص؛ يحتاج تحديد قيمة المشاركة البحثية مقارنة بالتكلفة.',
    caution: 'لم يُعلن آخر موعد تقديم؛ القبول والدفع يتيحان كتاب المؤتمر، ولا توجد ضمانة نشر في مجلة مفهرسة. تُستخدم تواريخ موقع 2027 لا كتيب 2026 القديم.',
    source: 'https://www.educonf.sa/', action: 'مراجعة التحكيم والرسوم وموعد تقديم الورقة مع المنظم'
  }
].map(item => Object.freeze({ ...item, verifiedAt: PROGRAM.verifiedAt }));
