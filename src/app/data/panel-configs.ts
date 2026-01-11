
import { PanelConfig } from '../types';

export const PANEL_CONFIGS: Record<string, PanelConfig> = {
  diagnosis: {
    title: 'التشخيص الذكي', subtitle: 'تحليل الأعراض السريرية', icon: 'stethoscope', color: 'indigo',
    fields: [
      { key: 'age', type: 'number', label: 'العمر', placeholder: '45', cols: 1 },
      { key: 'gender', type: 'select', label: 'الجنس', options: [{label:'ذكر', value:'male'}, {label:'أنثى', value:'female'}], cols: 1 },
      { key: 'complaint', type: 'textarea', label: 'الشكوى الرئيسية', placeholder: 'وصف الأعراض...' }
    ],
    submitLabel: 'بدء التحليل', submitIcon: 'activity',
    promptTemplate: v => `**Clinical Diagnosis Request**\nPatient: ${v.gender}, ${v.age}yo.\nComplaint: ${v.complaint}\nProvide differential diagnosis and workup.`
  },
  drugs: {
    title: 'دليل الأدوية', subtitle: 'Pharmacology Guide', icon: 'pill', color: 'emerald',
    fields: [{ key: 'drug', type: 'text', label: 'اسم الدواء', placeholder: 'Paracetamol, Amoxicillin...' }],
    submitLabel: 'بحث عن الدواء', submitIcon: 'search',
    promptTemplate: v => `Drug Monograph Request: ${v.drug}`,
    systemInstruction: () => `Provide comprehensive drug monograph: Indications, Dosing, Side Effects, Contraindications.`
  },
  library: {
    title: 'المكتبة الطبية', subtitle: 'Academic Search', icon: 'book-open', color: 'blue',
    fields: [{ key: 'topic', type: 'text', label: 'الموضوع البحثي', placeholder: 'DKA Management...' }],
    submitLabel: 'بحث في المصادر', submitIcon: 'globe',
    promptTemplate: v => `Academic Research: ${v.topic}`,
    systemInstruction: () => `Summarize recent medical literature (2020-2025) with references.`
  },
  scribe: {
    title: 'الموثق الطبي', subtitle: 'SOAP Note Generator', icon: 'file-text', color: 'pink',
    fields: [{ key: 'notes', type: 'textarea', label: 'الملاحظات الخام', placeholder: 'Patient 40yo male, abd pain...' }],
    submitLabel: 'توليد تقرير SOAP', submitIcon: 'clipboard-check',
    promptTemplate: v => `Convert to SOAP Note:\n"${v.notes}"`,
    systemInstruction: () => `Convert raw notes to professional SOAP format.`
  },
  radiology: {
    title: 'مركز الأشعة', subtitle: 'Radiology Reporting', icon: 'scan-eye', color: 'blue',
    fields: [
       { key: 'modality', type: 'select', label: 'Modality', options: [{label:'X-Ray', value:'X-Ray'}, {label:'CT', value:'CT'}, {label:'MRI', value:'MRI'}], cols: 1 },
       { key: 'region', type: 'text', label: 'Region', placeholder: 'Chest, Knee...', cols: 1 },
       { key: 'image', type: 'file', label: 'Image', placeholder: 'Upload Scan' }
    ],
    submitLabel: 'تحليل الصورة', submitIcon: 'scan-eye',
    promptTemplate: v => `Radiology Report Request (${v.modality} - ${v.region}). Analyze the attached image.`,
    systemInstruction: () => `Act as a Consultant Radiologist. Provide Findings, Impression, and Recommendations.`
  },
  derma: {
    title: 'المحلل الجلدي', subtitle: 'Dermatology Consult', icon: 'fingerprint', color: 'rose',
    fields: [
      { key: 'desc', type: 'text', label: 'وصف الأعراض', placeholder: 'Itchy rash...' },
      { key: 'image', type: 'file', label: 'صورة الآفة', placeholder: 'Upload Skin Image' }
    ],
    submitLabel: 'تشخيص الآفة', submitIcon: 'search',
    promptTemplate: v => `Dermatology Consult: ${v.desc}. Analyze the image.`,
    systemInstruction: () => `Act as a Dermatologist. Describe lesion, provide differential diagnosis and management.`
  },
  lab: {
    title: 'محلل المختبر', subtitle: 'Lab Interpretation', icon: 'test-tube-2', color: 'green',
    fields: [{ key: 'results', type: 'textarea', label: 'نتائج التحاليل', placeholder: 'WBC 15, Hb 10, Cr 150...' }],
    submitLabel: 'تحليل النتائج', submitIcon: 'activity',
    promptTemplate: v => `Lab Interpretation:\n${v.results}`,
    systemInstruction: () => `Correlate these lab results and suggest pathophysiology/diagnosis.`
  },
  procedure: {
    title: 'مُرشد الإجراءات', subtitle: 'Procedure Safety Guide', icon: 'syringe', color: 'fuchsia',
    fields: [{ key: 'proc', type: 'text', label: 'اسم الإجراء', placeholder: 'Central Line...' }],
    submitLabel: 'توليد الدليل', submitIcon: 'check-square',
    promptTemplate: v => `Procedure Guide: ${v.proc}`,
    systemInstruction: () => `Provide Indications, Contraindications, Equipment Checklist, and Steps.`
  },
  ecg: {
    title: 'مايسترو التخطيط', subtitle: 'ECG Analysis', icon: 'heart-pulse', color: 'pink',
    fields: [{ key: 'desc', type: 'textarea', label: 'وصف التخطيط / تحميل', placeholder: 'Describe findings or upload in main chat...' }],
    submitLabel: 'تحليل ECG', submitIcon: 'activity',
    promptTemplate: v => `ECG Analysis: ${v.desc}`,
    systemInstruction: () => `Act as Electrophysiologist. Analyze ECG findings.`
  },
  pediatric: {
    title: 'منقذ الأطفال', subtitle: 'Pedi-Save Resuscitation', icon: 'baby', color: 'cyan',
    fields: [
      { key: 'weight', type: 'number', label: 'الوزن (kg)', placeholder: '10', cols: 1 },
      { key: 'age', type: 'text', label: 'العمر', placeholder: '1 year', cols: 1 }
    ],
    submitLabel: 'بروتوكول الإنعاش', submitIcon: 'zap',
    promptTemplate: v => `Pediatric Stat: Weight ${v.weight}kg, Age ${v.age}`,
    systemInstruction: () => `Provide precise airway size, defib joules, adrenaline dose, and fluid bolus.`
  },
  // ... (Mapping remaining simple panels)
  triage: {
    title: 'فرز الطوارئ', subtitle: 'Triage Protocol', icon: 'siren', color: 'red',
    fields: [{ key: 'complaint', type: 'textarea', label: 'الشكوى والعلامات الحيوية', placeholder: 'Chest pain, BP 90/60...' }],
    submitLabel: 'تحديد الخطورة', submitIcon: 'clock',
    promptTemplate: v => `Triage Request: ${v.complaint}`,
    systemInstruction: () => `Assign Triage Level (Red/Orange/Yellow/Green) and immediate actions.`
  },
  research: {
    title: 'صانع الأبحاث', subtitle: 'PICO Framework', icon: 'microscope', color: 'cyan',
    fields: [{ key: 'pico', type: 'textarea', label: 'سؤال البحث (PICO)', placeholder: 'Population, Intervention...' }],
    submitLabel: 'توليد استراتيجية', submitIcon: 'database',
    promptTemplate: v => `Research Strategy PICO: ${v.pico}`,
    systemInstruction: () => `Create search strategy and keywords for database search.`
  },
  surgery: {
    title: 'تصريح العمليات', subtitle: 'Pre-op Clearance', icon: 'scissors', color: 'teal',
    fields: [{ key: 'details', type: 'textarea', label: 'العملية والمريض', placeholder: 'Cholecystectomy, HTN, DM...' }],
    submitLabel: 'تقييم المخاطر', submitIcon: 'check-circle',
    promptTemplate: v => `Pre-op Clearance: ${v.details}`,
    systemInstruction: () => `Assess surgical risk (RCRI), medication management (bridging), and post-op care.`
  },
  toxicology: {
    title: 'معالج السموم', subtitle: 'Overdose Management', icon: 'skull', color: 'orange',
    fields: [
       { key: 'substance', type: 'text', label: 'المادة', placeholder: 'Paracetamol', cols: 1 },
       { key: 'amount', type: 'text', label: 'الكمية/الوقت', placeholder: '20 tabs, 2h ago', cols: 1 }
    ],
    submitLabel: 'إدارة التسمم', submitIcon: 'alert-triangle',
    promptTemplate: v => `Toxicology Consult: ${v.substance}, ${v.amount}`,
    systemInstruction: () => `Provide antidote, decontamination, and monitoring plan.`
  },
  antibiotic: {
    title: 'حارس المضادات', subtitle: 'Antibiotic Stewardship', icon: 'shield-check', color: 'yellow',
    fields: [{ key: 'case', type: 'textarea', label: 'الحالة السريرية', placeholder: 'Pneumonia, Penicillin allergy...' }],
    submitLabel: 'وصف المضاد', submitIcon: 'pill',
    promptTemplate: v => `Antibiotic Recommendation: ${v.case}`,
    systemInstruction: () => `Recommend empiric antibiotic therapy with dosing and duration.`
  },
  // Add other simple panels similarly mapped to GenericPanel
  board: { title: 'المجلس الطبي', subtitle: 'Consultant Board', icon: 'users', color: 'orange', fields: [{key:'case', type:'textarea', label:'الحالة', placeholder:'...'}], submitLabel:'نقاش المجلس', promptTemplate: v=>`Board: ${v.case}`},
  simplifier: { title: 'تبسيط التقارير', subtitle: 'Patient Education', icon: 'heart-handshake', color: 'teal', fields: [{key:'text', type:'textarea', label:'النص الطبي', placeholder:'...'}], submitLabel:'شرح مبسط', promptTemplate: v=>`Explain simply: ${v.text}`},
  osce: { title: 'محاكي OSCE', subtitle: 'Virtual Patient', icon: 'graduation-cap', color: 'violet', fields: [{key:'topic', type:'text', label:'التخصص', placeholder:'Internal Medicine'}], submitLabel:'بدء المحاكاة', promptTemplate: v=>`Start OSCE: ${v.topic}`},
  sbar: { title: 'نظام SBAR', subtitle: 'Handover Tool', icon: 'radio', color: 'amber', fields: [{key:'info', type:'textarea', label:'معلومات الحالة', placeholder:'Situation, Background...'}], submitLabel:'توليد SBAR', promptTemplate: v=>`Generate SBAR: ${v.info}`},
  algorithm: { title: 'المسارات', subtitle: 'Clinical Pathways', icon: 'git-merge', color: 'indigo', fields: [{key:'cond', type:'text', label:'الحالة', placeholder:'Asthma'}], submitLabel:'رسم المسار', promptTemplate: v=>`Algorithm for: ${v.cond}`},
  lifestyle: { title: 'نمط الحياة', subtitle: 'Lifestyle Rx', icon: 'apple', color: 'lime', fields: [{key:'pt', type:'textarea', label:'بيانات المريض', placeholder:'Obese, Diabetic...'}], submitLabel:'وصفة الحياة', promptTemplate: v=>`Lifestyle Rx: ${v.pt}`},
  translator: { title: 'المترجم الطبي', subtitle: 'Cultural Broker', icon: 'languages', color: 'rose', fields: [{key:'txt', type:'textarea', label:'النص', placeholder:'...'}], submitLabel:'ترجمة', promptTemplate: v=>`Translate/Simplify: ${v.txt}`},
  evidence: { title: 'حارس الدليل', subtitle: 'EBM Evaluator', icon: 'scale', color: 'slate', fields: [{key:'q', type:'textarea', label:'السؤال', placeholder:'...'}], submitLabel:'تقييم الدليل', promptTemplate: v=>`EBM Check: ${v.q}`},
  calc: { title: 'مقياس المخاطر', subtitle: 'Risk Stratifier', icon: 'calculator', color: 'slate', fields: [{key:'data', type:'textarea', label:'البيانات', placeholder:'...'}], submitLabel:'حساب', promptTemplate: v=>`Calculate Score: ${v.data}`},
  psych: { title: 'بصيرة النفس', subtitle: 'MSE & Risk', icon: 'brain', color: 'violet', fields: [{key:'obs', type:'textarea', label:'الملاحظات', placeholder:'...'}], submitLabel:'تقييم', promptTemplate: v=>`Psych Eval: ${v.obs}`},
  quiz: { title: 'المنافسة', subtitle: 'Medi-Quiz', icon: 'trophy', color: 'amber', fields: [{key:'topic', type:'text', label:'الموضوع', placeholder:'Cardio'}], submitLabel:'تحدي', promptTemplate: v=>`Quiz me on: ${v.topic}`},
  surg_strategy: { title: 'المخطط الجراحي', subtitle: 'Surgical Strategy', icon: 'crosshair', color: 'emerald', fields: [{key:'proc', type:'text', label:'العملية', placeholder:'Whipple'}], submitLabel:'التخطيط', promptTemplate: v=>`Surgery Strategy: ${v.proc}`},
  mnm: { title: 'محاكي M&M', subtitle: 'Root Cause Analysis', icon: 'alert-octagon', color: 'rose', fields: [{key:'err', type:'textarea', label:'الخطأ', placeholder:'...'}], submitLabel:'تحليل', promptTemplate: v=>`M&M Analysis: ${v.err}`},
  op_note: { title: 'الموثق الجراحي', subtitle: 'Op-Note Generator', icon: 'clipboard-check', color: 'teal', fields: [{key:'info', type:'textarea', label:'تفاصيل العملية', placeholder:'...'}], submitLabel:'كتابة التقرير', promptTemplate: v=>`Op Note: ${v.info}`},
  detective: { title: 'المحقق الطبي', subtitle: 'Rare Diseases', icon: 'search', color: 'purple', fields: [{key:'sym', type:'textarea', label:'الأعراض الغريبة', placeholder:'...'}], submitLabel:'تحقيق', promptTemplate: v=>`Detective Case: ${v.sym}`},
  ventilator: { title: 'طيار العناية', subtitle: 'Ventilator Mgmt', icon: 'wind', color: 'cyan', fields: [{key:'abg', type:'textarea', label:'ABG & Settings', placeholder:'...'}], submitLabel:'تعديل', promptTemplate: v=>`Ventilator Consult: ${v.abg}`},
  ortho: { title: 'المهندس العظمي', subtitle: 'Ortho Consult', icon: 'hammer', color: 'orange', fields: [{key:'fx', type:'textarea', label:'الكسر', placeholder:'...'}], submitLabel:'خطة', promptTemplate: v=>`Ortho Plan: ${v.fx}`},
  neuro: { title: 'المحدد العصبي', subtitle: 'Neuro Localization', icon: 'brain', color: 'pink', fields: [{key:'sym', type:'textarea', label:'الأعراض', placeholder:'...'}], submitLabel:'تحديد', promptTemplate: v=>`Neuro Localize: ${v.sym}`},
  onco: { title: 'مجلس الأورام', subtitle: 'Tumor Board', icon: 'binary', color: 'rose', fields: [{key:'ca', type:'textarea', label:'الورم', placeholder:'...'}], submitLabel:'بروتوكول', promptTemplate: v=>`Onco Plan: ${v.ca}`},
  heme: { title: 'هيمي-باث', subtitle: 'Hematology', icon: 'droplets', color: 'red', fields: [{key:'labs', type:'textarea', label:'الدم', placeholder:'...'}], submitLabel:'تحليل', promptTemplate: v=>`Heme Consult: ${v.labs}`},
  fluids: { title: 'خبير السوائل', subtitle: 'Fluids & TPN', icon: 'droplet', color: 'blue', fields: [{key:'data', type:'textarea', label:'الوزن والحالة', placeholder:'...'}], submitLabel:'حساب', promptTemplate: v=>`Fluids Calc: ${v.data}`},
  ophtha: { title: 'منظار العيون', subtitle: 'Ophthalmology', icon: 'eye', color: 'sky', fields: [{key:'eye', type:'textarea', label:'فحص العين', placeholder:'...'}], submitLabel:'تشخيص', promptTemplate: v=>`Eye Consult: ${v.eye}`},
  dental: { title: 'الوجه والفكين', subtitle: 'Dental Trauma', icon: 'smile', color: 'yellow', fields: [{key:'inj', type:'textarea', label:'الإصابة', placeholder:'...'}], submitLabel:'علاج', promptTemplate: v=>`Dental Consult: ${v.inj}`},
  ethics: { title: 'المستشار الأخلاقي', subtitle: 'Bio-Ethics', icon: 'scale', color: 'slate', fields: [{key:'dil', type:'textarea', label:'المعضلة', placeholder:'...'}], submitLabel:'فتوى', promptTemplate: v=>`Ethics Consult: ${v.dil}`},
  stats: { title: 'الساحر الإحصائي', subtitle: 'Medical Stats', icon: 'line-chart', color: 'green', fields: [{key:'dat', type:'textarea', label:'البيانات', placeholder:'...'}], submitLabel:'تحليل', promptTemplate: v=>`Stats Help: ${v.dat}`},
  gene: { title: 'المستشار الجيني', subtitle: 'Genetics', icon: 'dna', color: 'fuchsia', fields: [{key:'hist', type:'textarea', label:'التاريخ العائلي', placeholder:'...'}], submitLabel:'تحليل', promptTemplate: v=>`Gene Consult: ${v.hist}`},
  trauma: { title: 'قائد الصدمات', subtitle: 'ATLS Protocol', icon: 'ambulance', color: 'red', fields: [{key:'mec', type:'textarea', label:'آلية الإصابة', placeholder:'...'}], submitLabel:'كود صدمة', promptTemplate: v=>`Trauma Code: ${v.mec}`},
  obgyn: { title: 'حارس الأمومة', subtitle: 'OB/GYN', icon: 'baby', color: 'rose', fields: [{key:'dat', type:'textarea', label:'بيانات الحمل', placeholder:'...'}], submitLabel:'استشارة', promptTemplate: v=>`OBGYN Consult: ${v.dat}`},
  rehab: { title: 'مهندس التأهيل', subtitle: 'Rehab Protocol', icon: 'person-standing', color: 'lime', fields: [{key:'cond', type:'text', label:'الحالة', placeholder:'ACL...'}], submitLabel:'برنامج', promptTemplate: v=>`Rehab Plan: ${v.cond}`},
  vax: { title: 'استراتيجي اللقاحات', subtitle: 'Immunization', icon: 'shield-plus', color: 'emerald', fields: [{key:'hist', type:'textarea', label:'العمر واللقاحات', placeholder:'...'}], submitLabel:'جدول', promptTemplate: v=>`Vaccine Schedule: ${v.hist}`},
  burn: { title: 'وحدة الحروق', subtitle: 'Burn Mgmt', icon: 'flame', color: 'orange', fields: [{key:'burn', type:'text', label:'TBSA & Weight', placeholder:'20%, 70kg'}], submitLabel:'باركلاند', promptTemplate: v=>`Burn Calc: ${v.burn}`},
  nephro: { title: 'طيار الكلى', subtitle: 'Renal Dosing', icon: 'droplet', color: 'blue', fields: [{key:'kid', type:'text', label:'GFR & Drug', placeholder:'...'}], submitLabel:'تعديل', promptTemplate: v=>`Renal Dose: ${v.kid}`},
  forensic: { title: 'المحلل الجنائي', subtitle: 'Forensics', icon: 'gavel', color: 'slate', fields: [{key:'find', type:'textarea', label:'الموجودات', placeholder:'...'}], submitLabel:'تقرير', promptTemplate: v=>`Forensic Report: ${v.find}`},
  travel: { title: 'طب السفر', subtitle: 'Travel Medicine', icon: 'plane', color: 'sky', fields: [{key:'trip', type:'text', label:'الوجهة', placeholder:'Thailand'}], submitLabel:'وقاية', promptTemplate: v=>`Travel Advice: ${v.trip}`},
};
