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
    participation: 'تقديم ورقة بحثية أو عرض بحثي (بوستر علمي)؛ مراجعة شروط القبول والتسجيل قبل الدفع.',
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
    participation: 'جلسة تفاعلية: مستخلص 100–150 كلمة ومخطط حتى 1000 كلمة؛ مقترح البوستر العلمي حتى 250 كلمة. إخطار القبول 15 ديسمبر.',
    fit: 'ضمان جودة التعليم والحوكمة والأثر المجتمعي وأخلاقيات الذكاء الاصطناعي والثقة.',
    caution: 'التقديم هنا مقترح جلسة أو بوستر علمي؛ لا يعني تلقائيًا نشر مقال في مجلة. البث لا يساوي مشاركة بحثية افتراضية.',
    source: 'https://inqaahe2027-doha.org/call-for-proposals/', secondSource: 'https://www.inqaahe.org/events/inqaahe-conference-2027-doha-qatar/',
    action: 'اختيار محور في ضمان الجودة وتجهيز مقترح جلسة أو بوستر علمي'
  },
  {
    id: 'ichess-muscat-2026', title: 'ICHESS 2026 · العلوم الإنسانية والتربوية والاجتماعية',
    organizer: 'الكلية الحديثة للتجارة والعلوم', city: 'مسقط', country: 'عُمان', category: 'paper', format: 'حضوري وهجين',
    start: '2026-12-02', end: '2026-12-03', deadlines: [{ label: 'الورقة الكاملة', date: '2026-10-31' }],
    fee: 'الرسوم لم تُؤكد؛ مراجعة صفحة التسجيل.',
    participation: 'طلبة البكالوريوس والماجستير والدكتوراه؛ أوراق بحثية وبوسترات علمية وورش، مع عرض عبر Microsoft Teams.',
    fit: 'الدراسات التربوية والقيادة التعليمية واستخدام التقنيات في التعليم.',
    caution: 'مواعيد تسجيل المقدّمين تختلف بين صفحة الأسئلة والجدول؛ تأكيد الموعد والرسوم مع الجهة.',
    source: 'https://ichess.mcbs.edu.om/call-for-papers/', secondSource: 'https://ichess.mcbs.edu.om/important-dates/',
    action: 'مراجعة مسار التربية ومتطلبات الورقة الكاملة'
  },
  {
    id: 'kau-sustainability-2026', title: 'استدامة ثون · من التحدي إلى الأثر',
    organizer: 'جامعة الملك عبدالعزيز', city: 'جدة', country: 'السعودية', category: 'innovation', format: 'حضوري',
    start: '2026-11-15', end: '2026-11-16', deadlines: [{ label: 'التسجيل وفق الإعلان المصوّر المرفق', date: '2026-10-30' }],
    fee: 'لم تُؤكد رسوم مشاركة؛ إجمالي الجوائز 25 ألف ريال وفق الإعلان.',
    participation: 'هاكاثون ضمن المؤتمر الدولي الثاني للاستدامة وجودة الحياة، ومن مساراته التعليم والابتكار والحوكمة.',
    fit: 'تطوير أفكار في التعليم والابتكار والحوكمة تعزز الاستدامة وجودة الحياة.',
    caution: 'موعد التسجيل والجوائز وفق إعلان الهاكاثون المصوّر؛ رابط المصدر أدناه للمؤتمر. يجب مراجعة شروط الهاكاثون مباشرة، والتقديم لا يثبت القبول.',
    source: 'https://kau.edu.sa/faculty/en/human-sciences-design/page-legacy/International%20Conference%20on%20Sustainability%20and%20Quality%20of%20Life',
    action: 'تجهيز طلب المشاركة ونموذج أولي للفكرة المختارة وخطة لقياس الأثر'
  },
  {
    id: 'mec-student-2027', title: 'المؤتمر الثامن لأبحاث الطلبة',
    organizer: 'Middle East College', city: 'مسقط', country: 'عُمان', category: 'paper', format: 'حضوري وهجين',
    start: '2027-04-06', end: '2027-04-06',
    deadlines: [{ label: 'المستخلص', date: '2027-02-20' }, { label: 'الورقة الكاملة', date: '2027-03-26' }, { label: 'التسجيل المبكر بعد القبول', date: '2027-03-30', conditional: true }],
    fee: 'مقدّم خارجي: 20 ريالًا عُمانيًا مبكرًا و30 عاديًا؛ حضور خارجي: 5 و10 ريالات.',
    participation: 'مشروعات المقررات والأبحاث الجاري تنفيذها والبوسترات العلمية والنماذج الأولية؛ هوية طالب أو خطاب إثبات. التسجيل بعد القبول، والعرض الافتراضي 15 دقيقة.',
    fit: 'عرض بحوث طلبة في القيادة والسياسات التعليمية والتعلّم الإلكتروني وحوكمة المعرفة، أو مشروعات مقررات ونماذج أولية.',
    caution: 'إخطار القبول يبدأ 17 مارس. ترشيح أوراق مختارة لمجلة لا يضمن النشر أو الفهرسة.',
    source: 'https://mec.edu.om/8thsrc/CallforPapers.html', secondSource: 'https://mec.edu.om/8thsrc/Registration.html',
    action: 'تجهيز مستخلص بحث طلابي أو مقترح بوستر علمي للفكرة المختارة'
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
  },
  {
    id: 'effat-learning-2027', title: 'المؤتمر الرابع والعشرون للتعلّم والتقنية',
    organizer: 'جامعة عفت', city: 'جدة', country: 'السعودية', institutionType: 'أهلية', category: 'paper', format: 'حضوري',
    start: '2027-02-01', end: '2027-02-02',
    deadlines: [{ label: 'الورقة الكاملة', date: '2026-10-31' }, { label: 'النسخة النهائية', date: '2027-01-03', conditional: true }, { label: 'التسجيل المبكر', date: '2027-01-10', conditional: true }],
    availability: 'دعوة أوراق معلنة',
    fee: 'للطالب مقدّم الورقة: 200 ريال مبكرًا و300 لاحقًا. الحضور دون شهادة مجاني؛ شهادة حضور الطالب 50 ريالًا مبكرًا و75 لاحقًا. الرسوم تشمل الضريبة.',
    participation: 'ورقة كاملة بحد أقصى 6 صفحات وفق قالب IEEE وتحكيم مزدوج التعمية؛ التقديم عبر EasyChair. إخطار القبول 15 ديسمبر 2026.',
    fit: 'التحول الرقمي في التعليم العالي، حوكمة الذكاء الاصطناعي وأخلاقياته والنزاهة الأكاديمية، تقنيات التعلم المتمحورة حول الإنسان، والشمول وإتاحة التعلم.',
    caution: 'تُراجع ملاءمة الورقة للمسار وقالبه. اعتماد الإيداع في IEEE Xplore لا يزال قيد المراجعة؛ الفهرسة ليست مضمونة. تأكيد أهلية سعر الطالب قبل الدفع.',
    source: 'https://www.effatuniversity.edu.sa/English/conferences/LT/Pages/default.aspx',
    secondSource: 'https://www.effatuniversity.edu.sa/English/conferences/LT/Pages/Important_Dates.aspx',
    additionalSources: [{ label: 'الرسوم', url: 'https://www.effatuniversity.edu.sa/English/conferences/LT/Pages/Registration-and-Fees.aspx' }, { label: 'إرشادات الورقة', url: 'https://www.effatuniversity.edu.sa/English/conferences/LT/Pages/submission-guidelines.aspx' }],
    action: 'اختيار مسار في مؤتمر التعلّم والتقنية ومراجعة الورقة مع المشرفة'
  },
  {
    id: 'psau-icoet-2027', title: 'ICOET 2027 · المؤتمر الدولي للتقنيات الناشئة',
    organizer: 'جامعة الأمير سطام بن عبدالعزيز · كلية هندسة وعلوم الحاسب', city: 'الخرج', country: 'السعودية', institutionType: 'حكومية', category: 'paper', format: 'حضوري',
    start: '2027-03-23', end: '2027-03-24',
    deadlines: [{ label: 'الورقة الكاملة', date: '2027-01-01' }, { label: 'النسخة النهائية', date: '2027-03-10', conditional: true }, { label: 'تسجيل المؤلفين', date: '2027-03-17', conditional: true }],
    availability: 'دعوة معلنة؛ بوابة الإرسال لم تُعلن بعد',
    fee: 'رسوم التسجيل لم تُعلن في الصفحة الرسمية.',
    participation: 'أبحاث أصلية وتحكيم مزدوج التعمية؛ يشمل مسار الذكاء الاصطناعي تطبيقاته في التعليم، والتفاعل بين الإنسان والذكاء الاصطناعي. إخطار القبول 23 فبراير 2027.',
    fit: 'بحوث تطبيقات الذكاء الاصطناعي في التعليم ودعم القرار والتفاعل البشري مع التقنيات؛ الملاءمة أقوى لبحث ذي مساهمة تقنية أو تطبيقية واضحة.',
    caution: 'ليس مؤتمر قيادة تربوية عامًا. يجب تأكيد قبول منهج الورقة ومحورها قبل تجهيزها. بوابة التقديم لم تُعلن؛ النشر في IEEE Xplore والفهرسة في Scopus مشروطان بالموافقات وغير مضمونين.',
    source: 'https://events.psau.edu.sa/', action: 'مراجعة ملاءمة البحث لمسار الذكاء الاصطناعي في التعليم وانتظار بوابة الإرسال'
  },
  {
    id: 'effat-humanities-2027', title: 'المؤتمر الدولي الرابع للعلوم الإنسانية',
    organizer: 'جامعة عفت · كلية العلوم الإنسانية', city: 'جدة', country: 'السعودية', institutionType: 'أهلية', category: 'paper', format: 'حضوري',
    start: '2027-03-29', end: '2027-03-29',
    deadlines: [{ label: 'المستخلص', date: '2026-11-15' }, { label: 'الورقة الكاملة', date: '2027-01-28', conditional: true }, { label: 'التسجيل المبكر', date: '2027-02-08', conditional: true }],
    availability: 'دعوة بحثية معلنة؛ يلزم تأكيد الوصول للتقديم',
    fee: 'رسوم المشاركة غير مؤكدة؛ صفحة التسجيل تتطلب تسجيل الدخول.',
    participation: 'أوراق أصلية حول «300 عام من بناء الوطن والهوية والتراث والقيادة». إخطار قبول المستخلص 7 ديسمبر 2026.',
    fit: 'مناسب لبحث يربط التربية أو القيادة ببناء الوطن والهوية والتحولات الاجتماعية وجودة الحياة، ضمن محاور المؤتمر الفعلية.',
    caution: 'ليس مؤتمرًا تربويًا عامًا. بعض صفحات المواعيد والتسجيل أحالت إلى الدخول؛ المواعيد منشورة في نتائج الموقع الرسمي المفهرسة، ويجب تأكيدها مع الجامعة وإتاحة إرسال المستخلص.',
    source: 'https://www.effatuniversity.edu.sa/English/conferences/ecoh-conf/Pages/default.aspx',
    secondSource: 'https://www.effatuniversity.edu.sa/English/conferences/ecoh-conf/Pages/important-dates.aspx',
    action: 'تأكيد إتاحة تقديم المستخلص وملاءمة موضوعه لمحاور العلوم الإنسانية'
  },
  {
    id: 'tks-thrive-educators-2026', title: 'Thrive · مؤتمر التربويين: التعلّم بلا حدود',
    organizer: 'مدرسة جامعة الملك عبدالله للعلوم والتقنية · معهد Thrive', city: 'ثول', country: 'السعودية', institutionType: 'مستقلة', category: 'development', format: 'حضوري',
    start: '2026-12-05', end: '2026-12-05', deadlines: [], availability: 'تسجيل الحضور معلن في صفحة المعهد',
    fee: 'الرسوم وموعد إغلاق التسجيل لم يُؤكدا.',
    participation: 'مؤتمر مهني للتربويين بعنوان «التعلّم بلا حدود: بناء ثقافات الشمول والانتماء»، من 9 صباحًا إلى 4 مساءً.',
    fit: 'القيادة المدرسية، ثقافة المؤسسة التعليمية، الشمول والانتماء، ودعم المتعلمين المتنوعين.',
    caution: 'تأكيد أهلية طالبة الماجستير وتفاصيل الدخول إلى الحرم مع الجهة. صفحة المعهد تعلن فتح التسجيل، بينما صفحة التفاصيل ما زالت تعرض عبارة فتحه في أغسطس. لم تُثبت دعوة لنشر أوراق.',
    source: 'https://tks.kaust.edu.sa/thriveattks/supporting-diverse-learners-conference-december-5-2026',
    secondSource: 'https://tks.kaust.edu.sa/thriveattks', action: 'مراجعة التسجيل والأهلية لمؤتمر Thrive للتربويين'
  },
  {
    id: 'kfupm-rhe-2027', title: 'RHE · إعادة تعريف التعليم العالي',
    organizer: 'جامعة الملك فهد للبترول والمعادن · تنظيم جامعة IE', city: 'الظهران', country: 'السعودية', institutionType: 'حكومية', category: 'development', format: 'الاستضافة في السعودية؛ تفاصيل الحضور غير معلنة',
    start: '2027-02-02', end: '2027-02-04', deadlines: [], availability: 'فعالية معلنة؛ التسجيل والأهلية غير مؤكدين',
    fee: 'الرسوم وإجراءات التسجيل لم تُعلن في خبر الجامعة.',
    participation: 'ملتقى قيادات الجامعات وصنّاع السياسات والمبتكرين حول مستقبل التعليم العالي والذكاء الاصطناعي والابتكار.',
    fit: 'القيادة الجامعية، سياسات التعليم العالي، بناء مجتمع المعرفة والتحول المؤسسي.',
    caution: 'قد يقتصر الحضور على الدعوات أو فئات قيادية؛ أهلية الطلبة غير مؤكدة. لم تُثبت دعوة أوراق. الخبر يحدد 2–4 فبراير 2027 رغم احتواء رابط الصفحة على 2026؛ يلزم تأكيد التفاصيل عند صدور برنامج التسجيل.',
    source: 'https://news.kfupm.edu.sa/news/kfupm-to-host-global-higher-education-conference-in-2026/221/',
    action: 'الاستفسار عن أهلية الطلبة وإتاحة الحضور في مؤتمر RHE'
  },
  {
    id: 'dah-ccts-2026', title: 'CCTS 2026 · الإبداع والتقنية والاستدامة',
    organizer: 'جامعة دار الحكمة', city: 'جدة', country: 'السعودية', institutionType: 'أهلية', category: 'development', format: 'الحضور حضوري؛ عرض الورقة عن بُعد للمؤلفين فقط',
    start: '2026-12-09', end: '2026-12-10',
    deadlines: [{ label: 'تقديم الأوراق · الموعد الممدد', date: '2026-09-10' }, { label: 'النسخة النهائية', date: '2026-10-15', conditional: true }, { label: 'دفع رسوم الورقة المقبولة', date: '2026-10-29', conditional: true }],
    availability: 'الحضور متاح؛ تقديم أوراق جديدة أغلق',
    fee: 'الحضور دون شهادة مجاني؛ مع شهادة 250 ريالًا. رسوم الورقة المقبولة 1500 ريال، تُدفع بعد القبول الرسمي.',
    participation: 'مؤتمر للباحثين والأكاديميين والطلبة؛ يتضمن التعليم والتوعية بالاستدامة، وإدارة الاستدامة وسياساتها وأخلاقياتها.',
    fit: 'التعليم من أجل الاستدامة، السياسات والحوكمة والأثر المجتمعي والتحول الرقمي؛ يفيد في الحضور وبناء العلاقات البحثية.',
    caution: 'آخر موعد ممدد للأوراق كان 10 سبتمبر 2026. مواعيد أكتوبر تخص الأوراق المقبولة، ولا تفتح باب تقديم جديد. لا يتاح حضور افتراضي للجمهور.',
    source: 'https://www.dah.edu.sa/en/research/conferences/Pages/CCTS-2026-3rd-International-Conference-on-Creativity-Technology-and-Sustainability.aspx',
    secondSource: 'https://www.dah.edu.sa/en/research/conferences/Pages/Important-Dates-Creativity-Technology-and-Sustainability-2026.aspx',
    additionalSources: [{ label: 'الحضور والرسوم', url: 'https://www.dah.edu.sa/en/research/conferences/Pages/Registration-and-Submission-Creativity-Technology-and-Sustainability-2026.aspx' }],
    action: 'اختيار جلسات التعليم والاستدامة وتسجيل الحضور في مؤتمر دار الحكمة'
  }
].map(item => Object.freeze({ ...item, institutionType: item.institutionType || ({ 'pnu-hackathon-2026': 'حكومية', 'kau-sustainability-2026': 'حكومية' }[item.id] || ''), verifiedAt: PROGRAM.verifiedAt }));

export const UNIVERSITY_RESOURCES = [
  {
    id: 'psu-erl', title: 'مختبر البحوث التربوية ERL', organizer: 'جامعة الأمير سلطان', city: 'الرياض', country: 'السعودية', institutionType: 'أهلية', category: 'development',
    description: 'مختبر يدعم البحث التربوي القائم على الأدلة، ويقدم تدريبًا وإرشادًا وورشًا وندوات. تشمل مجالاته السياسات والقيادة التعليمية وضمان الجودة والأخلاقيات المهنية والتعلّم المدمج.',
    availability: 'مركز بحثي؛ لا يوجد موعد جديد مؤكد للملتقى',
    caution: 'أهلية الباحثة من خارج الجامعة ومواعيد البرامج والرسوم غير مؤكدة؛ تُراجع مع المختبر.',
    source: 'https://psu.edu.sa/en/CSH/ERL', contact: 'erl@psu.edu.sa'
  },
  {
    id: 'alfaisal-research-training', title: 'تدريب مهارات البحث والكتابة والتحليل', organizer: 'جامعة الفيصل · مركز الأمير خالد الفيصل للبحوث والدراسات الاستشارية', city: 'الرياض', country: 'السعودية', institutionType: 'أهلية', category: 'development',
    description: 'كتالوج التدريب يذكر البحث العلمي، والكتابة الأكاديمية والتقنية، والتفكير النقدي، ومقدمة في SPSS؛ وهي مهارات تدعم إعداد الرسالة والبحوث.',
    availability: 'كتالوج برامج؛ الدفعات والمواعيد والرسوم تحتاج تأكيدًا',
    caution: 'وجود اسم الدورة في الكتالوج لا يثبت فتح دفعة حاليًا. يُطلب جدول الدورات وأهلية الطلبة الخارجيين وطريقة التدريب قبل التسجيل.',
    source: 'https://center.alfaisal.edu/training', contact: 'center@alfaisal.edu'
  },
  {
    id: 'ksu-teaching-excellence', title: 'مركز التميز في التعلّم والتعليم', organizer: 'جامعة الملك سعود', city: 'الرياض', country: 'السعودية', institutionType: 'حكومية', category: 'development',
    description: 'مصادر ودراسات وتقارير عن السياسات والخطط الاستراتيجية للتعليم الجامعي، تقويم البرامج ومخرجات التعلّم، والممارسات التعليمية والتقييم.',
    availability: 'مصادر جامعية متاحة للاطلاع',
    caution: 'بعض البرامج موجه لأعضاء هيئة التدريس ومنسوبي الجامعة؛ لم يُثبت فتحها لطالبة خارجية. المؤتمرات المدرجة في دليل المركز ليست كلها من تنظيم الجامعة.',
    source: 'https://celt.ksu.edu.sa/ar'
  },
  {
    id: 'tks-thrive-programs', title: 'Thrive · ورش وزيارات للتطوير التربوي', organizer: 'مدرسة جامعة الملك عبدالله للعلوم والتقنية', city: 'ثول', country: 'السعودية', institutionType: 'مستقلة', category: 'development',
    description: 'ورش تربوية لمدة ساعتين، وزيارات دراسية لمدة خمس ساعات تشمل حوارًا مع قيادة المدرسة وزيارات للفصول؛ تعلن الجهة توفير ترجمة عربية.',
    availability: 'برامج مهنية؛ موعد الزيارة أو الورشة بالتنسيق مع الجهة',
    caution: 'تُؤكد أهلية الطالبة والرسوم ومتطلبات الدخول للحرم. الزيارة المهنية لا تمنح تلقائيًا إذن جمع بيانات بحثية أو موافقة أخلاقية.',
    source: 'https://tks.kaust.edu.sa/thriveattks', contact: 'Thriveconnect@thekaustschool.org'
  }
].map(item => Object.freeze({ ...item, verifiedAt: PROGRAM.verifiedAt }));

