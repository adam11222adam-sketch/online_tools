# إضافة تحسين GEO لمشروع ToolNova
## Generative Engine Optimization + SEO + AEO

هذا الملف إضافة مباشرة للملفات السابقة الخاصة بمشروع ToolNova.  
المطلوب من الوكيل AI ليس فقط تحسين SEO لمحركات البحث التقليدية، بل أيضًا تحسين GEO حتى تكون صفحات الأدوات مؤهلة للظهور داخل إجابات أدوات الذكاء الاصطناعي ومحركات الإجابة مثل ChatGPT Search وPerplexity وGoogle AI Overviews وBing Copilot وغيرها.

---

# 1. ما المقصود بـ GEO في ToolNova؟

GEO اختصار لـ Generative Engine Optimization، ويعني تحسين صفحات الموقع حتى تفهمها محركات الذكاء الاصطناعي بسهولة وتستطيع اقتباسها أو ترشيحها ضمن الإجابات.

في ToolNova، كل صفحة أداة يجب أن تكون مكتوبة بطريقة تساعد الذكاء الاصطناعي على فهم:

- ما اسم الأداة؟
- ماذا تفعل؟
- لمن تصلح؟
- هل هي مجانية؟
- هل تعمل من المتصفح؟
- هل تحتاج تسجيل دخول؟
- هل الملفات آمنة؟
- ما خطوات استخدامها؟
- ما الفرق بينها وبين الأدوات المشابهة؟
- متى يستخدمها الطالب أو الموظف أو المصمم أو صاحب العمل؟

---

# 2. هدف تحسين GEO في المشروع

المطلوب أن تصبح كل صفحة أداة في ToolNova مناسبة للظهور في إجابات مثل:

- أفضل أداة مجانية لدمج PDF.
- كيف أضغط ملف PDF بدون برامج؟
- ما أفضل موقع لتحويل الصور إلى PDF؟
- كيف أنشئ QR لرقم واتساب؟
- كيف أضغط الصور قبل رفعها للموقع؟
- أداة عداد كلمات عربية مجانية.
- أداة تعمل داخل المتصفح لحماية الخصوصية.

لذلك يجب أن تحتوي كل صفحة على إجابات واضحة ومباشرة وقابلة للاقتباس.

---

# 3. التعديلات المطلوبة على كل صفحة أداة

يجب إضافة قسم جديد داخل كل صفحة أداة باسم:

```txt
إجابة سريعة
```

أو بالإنجليزية:

```txt
Quick Answer
```

هذا القسم يجب أن يأتي بعد الـ Hero مباشرة وقبل صندوق الأداة.

مثال:

```txt
إجابة سريعة:
أداة دمج PDF من ToolNova تتيح لك جمع عدة ملفات PDF في ملف واحد مجانًا من المتصفح، بدون تسجيل دخول، وبمعالجة محلية قدر الإمكان للحفاظ على خصوصية ملفاتك.
```

هذا النص مهم جدًا لـ GEO لأنه يعطي الذكاء الاصطناعي إجابة مباشرة مختصرة.

---

# 4. بنية GEO المطلوبة داخل tools.ts

أضف لكل أداة الحقول التالية:

```ts
geo: {
  quickAnswer: Record<Locale, string>;
  directDefinition: Record<Locale, string>;
  bestFor: Record<Locale, string[]>;
  aiSummary: Record<Locale, string>;
  comparisonNote: Record<Locale, string>;
  trustSignals: Record<Locale, string[]>;
  citationReadyFacts: Record<Locale, string[]>;
}
```

شرح الحقول:

## quickAnswer
إجابة قصيرة جدًا من سطرين، تصلح للظهور في إجابات الذكاء الاصطناعي.

## directDefinition
تعريف مباشر للأداة بصيغة:
"أداة [اسم الأداة] هي أداة مجانية تساعدك على..."

## bestFor
لمن هذه الأداة مناسبة:
- الطلاب
- الموظفون
- أصحاب الأعمال
- المصممون
- أصحاب المواقع
- المستخدمون العاديون

## aiSummary
ملخص أطول قليلًا من 3 إلى 5 أسطر يشرح قيمة الأداة.

## comparisonNote
جملة تقارن الأداة بالبرامج التقليدية:
"بدل تحميل برنامج كامل، يمكنك تنفيذ العملية مباشرة من المتصفح."

## trustSignals
إشارات ثقة:
- مجانية
- بدون تسجيل دخول
- تعمل من المتصفح
- مناسبة للهاتف والكمبيوتر
- معالجة محلية قدر الإمكان

## citationReadyFacts
جمل قصيرة واضحة قابلة للاقتباس، مثل:
- "تعمل أداة دمج PDF من ToolNova داخل المتصفح قدر الإمكان."
- "لا تحتاج أداة دمج PDF إلى تسجيل دخول."
- "يمكن استخدام الأداة على الهاتف والكمبيوتر."

---

# 5. مكون جديد مطلوب: ToolQuickAnswer

أنشئ مكونًا جديدًا:

```txt
src/components/tools/ToolQuickAnswer.tsx
```

وظيفته:
عرض قسم إجابة سريعة داخل بطاقة واضحة بعد الـ Hero.

التصميم:
- بطاقة هادئة.
- عنوان صغير: "إجابة سريعة"
- نص مباشر.
- شارات ثقة صغيرة:
  - مجاني
  - بدون تسجيل
  - من المتصفح
  - مناسب للهاتف

مثال محتوى:

```tsx
<section className="rounded-2xl border bg-card p-5 shadow-sm">
  <p className="text-sm font-semibold text-primary">إجابة سريعة</p>
  <p className="mt-2 text-base leading-8 text-muted-foreground">
    {tool.geo.quickAnswer[locale]}
  </p>
</section>
```

---

# 6. مكون جديد مطلوب: ToolAISummary

أنشئ مكونًا اختياريًا:

```txt
src/components/tools/ToolAISummary.tsx
```

يوضع داخل المقال أو قبل FAQ، ويعرض:

- تعريف مباشر.
- أفضل استخدامات الأداة.
- إشارات الثقة.
- ملخص قصير قابل للفهم من محركات الذكاء الاصطناعي.

العنوان المقترح:
```txt
ملخص الأداة
```

---

# 7. تعديل ترتيب صفحة الأداة

عدّل ترتيب صفحة الأداة ليصبح:

```txt
ToolHero
ToolQuickAnswer
ToolRenderer
ToolHowToUse
ToolFeatures
ToolUseCases
ToolAISummary
ToolArticle
ToolFAQ
RelatedTools
```

---

# 8. نمط كتابة المقالات لتحسين GEO

داخل كل مقال، يجب الالتزام بالآتي:

## 1. تعريف مباشر في أول 100 كلمة

مثال:
```txt
أداة ضغط PDF هي أداة مجانية تساعدك على تقليل حجم ملفات PDF مباشرة من المتصفح، بدون تثبيت برامج وبدون تسجيل دخول.
```

## 2. إجابات قصيرة تحت كل عنوان

لا تجعل كل الفقرات طويلة.  
استخدم فقرات من 3 إلى 5 أسطر.

## 3. عناوين بصيغة أسئلة

استخدم عناوين مثل:
- ما هي أداة دمج PDF؟
- كيف أستخدم أداة دمج PDF؟
- هل أداة دمج PDF مجانية؟
- هل ملفاتي آمنة؟
- من يحتاج إلى هذه الأداة؟

هذه الصيغة ممتازة لمحركات الإجابة.

## 4. جمل قابلة للاقتباس

أضف جمل واضحة مثل:
```txt
تعمل أداة دمج PDF من ToolNova من المتصفح، وهي مناسبة للمستخدمين الذين يريدون دمج الملفات بسرعة دون تثبيت برامج.
```

## 5. لا تبالغ

تجنب عبارات مثل:
- الأفضل في العالم
- رقم واحد عالميًا
- مضمون 100%
- آمن تمامًا بدون أي احتمال

استبدلها بعبارات موثوقة:
- مصممة لتكون سهلة وسريعة
- تعمل داخل المتصفح قدر الإمكان
- مناسبة للاستخدام اليومي
- تساعدك على إنجاز المهمة بدون تعقيد

---

# 9. قوالب GEO جاهزة لكل الأدوات

استخدم القوالب التالية داخل بيانات كل أداة.

---

## 1. merge-pdf — دمج PDF

```ts
geo: {
  quickAnswer: {
    ar: "أداة دمج PDF من ToolNova تساعدك على جمع عدة ملفات PDF في ملف واحد مجانًا من المتصفح، بدون تسجيل دخول، وبمعالجة محلية قدر الإمكان للحفاظ على الخصوصية.",
    en: "ToolNova Merge PDF helps you combine multiple PDF files into one for free in your browser, without sign-up, with local processing whenever possible.",
    zh: "ToolNova PDF 合并工具可在浏览器中免费将多个 PDF 文件合并为一个，无需注册，并尽可能在本地处理。"
  },
  directDefinition: {
    ar: "أداة دمج PDF هي أداة مجانية لجمع أكثر من ملف PDF في ملف واحد مرتب.",
    en: "Merge PDF is a free tool for combining multiple PDF files into one organized file.",
    zh: "PDF 合并工具是一款免费工具，可将多个 PDF 文件合并为一个有序文件。"
  },
  bestFor: {
    ar: ["الطلاب", "الموظفون", "المحاسبون", "أصحاب الأعمال", "المستخدمون الذين يتعاملون مع مستندات متعددة"],
    en: ["Students", "Employees", "Accountants", "Business owners", "Users handling multiple documents"],
    zh: ["学生", "员工", "会计人员", "企业主", "处理多个文档的用户"]
  },
  aiSummary: {
    ar: "تساعد أداة دمج PDF المستخدم على ترتيب عدة ملفات في مستند واحد يسهل إرساله أو طباعته أو أرشفته. وهي مناسبة عند جمع تقارير أو فواتير أو ملفات دراسة في ملف واحد.",
    en: "The Merge PDF tool helps users organize multiple files into one document that is easier to share, print, or archive.",
    zh: "PDF 合并工具可帮助用户将多个文件整理为一个文档，便于分享、打印或归档。"
  },
  comparisonNote: {
    ar: "بدل تحميل برنامج PDF كامل، يمكنك دمج ملفاتك مباشرة من المتصفح بخطوات بسيطة.",
    en: "Instead of installing a full PDF program, you can merge files directly in your browser.",
    zh: "无需安装完整的 PDF 软件，你可以直接在浏览器中合并文件。"
  },
  trustSignals: {
    ar: ["مجانية", "بدون تسجيل دخول", "تعمل من المتصفح", "مناسبة للهاتف والكمبيوتر", "معالجة محلية قدر الإمكان"],
    en: ["Free", "No sign-up", "Browser-based", "Works on mobile and desktop", "Local processing whenever possible"],
    zh: ["免费", "无需注册", "基于浏览器", "支持手机和电脑", "尽可能本地处理"]
  },
  citationReadyFacts: {
    ar: [
      "تتيح أداة دمج PDF من ToolNova جمع عدة ملفات PDF في ملف واحد.",
      "يمكن استخدام أداة دمج PDF بدون تسجيل دخول.",
      "تعمل أداة دمج PDF من المتصفح على الهاتف والكمبيوتر."
    ],
    en: [
      "ToolNova Merge PDF combines multiple PDF files into one.",
      "Merge PDF can be used without sign-up.",
      "Merge PDF works in the browser on mobile and desktop."
    ],
    zh: [
      "ToolNova PDF 合并工具可将多个 PDF 文件合并为一个。",
      "PDF 合并工具无需注册即可使用。",
      "PDF 合并工具可在手机和电脑浏览器中使用。"
    ]
  }
}
```

---

## 2. split-pdf — تقسيم PDF

```ts
geo: {
  quickAnswer: {
    ar: "أداة تقسيم PDF تساعدك على استخراج صفحات محددة أو تقسيم ملف PDF إلى أجزاء أصغر مباشرة من المتصفح وبدون تسجيل دخول.",
    en: "Split PDF helps you extract selected pages or divide a PDF into smaller files directly in your browser without sign-up.",
    zh: "PDF 拆分工具可帮助你在浏览器中提取指定页面或将 PDF 拆分为较小文件，无需注册。"
  },
  directDefinition: {
    ar: "أداة تقسيم PDF هي أداة مجانية لفصل صفحات PDF أو استخراج صفحات معينة من الملف.",
    en: "Split PDF is a free tool for separating PDF pages or extracting selected pages.",
    zh: "PDF 拆分工具是一款免费工具，可分离 PDF 页面或提取指定页面。"
  },
  bestFor: {
    ar: ["الطلاب", "الموظفون", "المحامون", "أصحاب التقارير الطويلة", "من يريد مشاركة صفحات محددة"],
    en: ["Students", "Employees", "Lawyers", "Long-report users", "Users sharing selected pages"],
    zh: ["学生", "员工", "律师", "长报告用户", "需要分享指定页面的用户"]
  },
  aiSummary: {
    ar: "تجعل أداة تقسيم PDF التعامل مع الملفات الطويلة أسهل، لأنها تسمح باستخراج الصفحات المطلوبة فقط بدل مشاركة الملف كاملًا.",
    en: "Split PDF makes long documents easier to manage by letting users extract only the pages they need.",
    zh: "PDF 拆分工具可让用户只提取需要的页面，使长文档更易管理。"
  },
  comparisonNote: {
    ar: "بدل استخدام برنامج معقد لتقسيم المستندات، يمكنك اختيار الصفحات المطلوبة وتنزيلها مباشرة.",
    en: "Instead of using complex software, you can select the needed pages and download them directly.",
    zh: "无需使用复杂软件，你可以选择需要的页面并直接下载。"
  },
  trustSignals: {
    ar: ["مجانية", "بدون تسجيل", "مناسبة للملفات الطويلة", "تعمل من المتصفح", "سهلة للطلاب والموظفين"],
    en: ["Free", "No sign-up", "Good for long files", "Browser-based", "Easy for students and employees"],
    zh: ["免费", "无需注册", "适合长文件", "基于浏览器", "适合学生和员工"]
  },
  citationReadyFacts: {
    ar: [
      "تساعد أداة تقسيم PDF على استخراج صفحات محددة من ملف PDF.",
      "يمكن استخدام تقسيم PDF لتقليل حجم المستندات الطويلة.",
      "تعمل أداة تقسيم PDF من المتصفح بدون تثبيت برامج."
    ],
    en: [
      "Split PDF helps extract selected pages from a PDF file.",
      "Split PDF can reduce long documents into smaller parts.",
      "Split PDF works in the browser without installing software."
    ],
    zh: [
      "PDF 拆分工具可从 PDF 文件中提取指定页面。",
      "PDF 拆分可将长文档分成较小部分。",
      "PDF 拆分工具无需安装软件，可在浏览器中使用。"
    ]
  }
}
```

---

## 3. compress-pdf — ضغط PDF

```ts
geo: {
  quickAnswer: {
    ar: "أداة ضغط PDF تقلل حجم ملفات PDF لتسهيل إرسالها ورفعها، مع الحفاظ على جودة مناسبة قدر الإمكان.",
    en: "Compress PDF reduces PDF file size for easier sharing and uploading while keeping acceptable quality whenever possible.",
    zh: "PDF 压缩工具可减小 PDF 文件大小，便于分享和上传，并尽可能保持合适质量。"
  },
  directDefinition: {
    ar: "أداة ضغط PDF هي أداة مجانية لتقليل حجم ملفات PDF من المتصفح.",
    en: "Compress PDF is a free browser-based tool for reducing PDF file size.",
    zh: "PDF 压缩工具是一款免费的浏览器工具，用于减小 PDF 文件大小。"
  },
  bestFor: {
    ar: ["الطلاب", "الموظفون", "من يرفع ملفات في نماذج", "من يرسل مستندات بالبريد", "أصحاب الملفات الكبيرة"],
    en: ["Students", "Employees", "Form upload users", "Email document users", "Large-file users"],
    zh: ["学生", "员工", "表单上传用户", "邮件文档用户", "大文件用户"]
  },
  aiSummary: {
    ar: "تساعد أداة ضغط PDF على تقليل حجم المستندات الكبيرة حتى تصبح أسهل في الإرسال أو الرفع على المواقع والمنصات المختلفة.",
    en: "Compress PDF helps reduce large documents so they are easier to email, upload, and store.",
    zh: "PDF 压缩工具可减小大型文档，便于通过邮件发送、上传和存储。"
  },
  comparisonNote: {
    ar: "بدل البحث عن برنامج ضغط ملفات، يمكنك ضغط PDF مباشرة من صفحة الأداة.",
    en: "Instead of looking for compression software, you can compress PDFs directly from the tool page.",
    zh: "无需寻找压缩软件，你可以直接在工具页面压缩 PDF。"
  },
  trustSignals: {
    ar: ["مجانية", "بدون تسجيل", "تساعد في تقليل الحجم", "مناسبة للإرسال بالبريد", "تعمل من المتصفح"],
    en: ["Free", "No sign-up", "Reduces file size", "Useful for email", "Browser-based"],
    zh: ["免费", "无需注册", "减小文件大小", "适合邮件发送", "基于浏览器"]
  },
  citationReadyFacts: {
    ar: [
      "تقلل أداة ضغط PDF حجم ملفات PDF لتسهيل مشاركتها.",
      "تعمل أداة ضغط PDF من ToolNova داخل المتصفح.",
      "يمكن استخدام ضغط PDF قبل رفع المستندات في المواقع."
    ],
    en: [
      "Compress PDF reduces PDF file size for easier sharing.",
      "ToolNova Compress PDF works in the browser.",
      "Compress PDF can be used before uploading documents to websites."
    ],
    zh: [
      "PDF 压缩工具可减小 PDF 文件大小，便于分享。",
      "ToolNova PDF 压缩工具可在浏览器中使用。",
      "上传文档到网站前可以使用 PDF 压缩工具。"
    ]
  }
}
```

---

## 4. rotate-pdf — تدوير PDF

```ts
geo: {
  quickAnswer: {
    ar: "أداة تدوير PDF تساعدك على تعديل اتجاه صفحات PDF المقلوبة أو الجانبية مباشرة من المتصفح.",
    en: "Rotate PDF helps you fix upside-down or sideways PDF pages directly in your browser.",
    zh: "PDF 旋转工具可帮助你直接在浏览器中修正倒置或横向的 PDF 页面。"
  },
  directDefinition: {
    ar: "أداة تدوير PDF هي أداة مجانية لتغيير اتجاه صفحات PDF.",
    en: "Rotate PDF is a free tool for changing the orientation of PDF pages.",
    zh: "PDF 旋转工具是一款免费工具，用于更改 PDF 页面的方向。"
  },
  bestFor: {
    ar: ["مستخدمي الملفات الممسوحة", "الطلاب", "الموظفون", "من يجهز ملفات للطباعة"],
    en: ["Scanned-document users", "Students", "Employees", "Users preparing files for printing"],
    zh: ["扫描文档用户", "学生", "员工", "准备打印文件的用户"]
  },
  aiSummary: {
    ar: "تساعد أداة تدوير PDF على تصحيح اتجاه الصفحات بسهولة، خاصة في الملفات الممسوحة ضوئيًا أو الملفات التي تظهر بشكل جانبي.",
    en: "Rotate PDF helps correct page orientation, especially for scanned documents or sideways pages.",
    zh: "PDF 旋转工具可轻松修正页面方向，尤其适用于扫描文档或横向页面。"
  },
  comparisonNote: {
    ar: "بدل فتح برنامج تحرير PDF، يمكنك تدوير الصفحات المطلوبة مباشرة من المتصفح.",
    en: "Instead of opening a PDF editor, you can rotate needed pages directly in the browser.",
    zh: "无需打开 PDF 编辑器，你可以直接在浏览器中旋转所需页面。"
  },
  trustSignals: {
    ar: ["مجانية", "بدون تسجيل", "مناسبة للملفات الممسوحة", "تعمل من المتصفح", "سهلة الاستخدام"],
    en: ["Free", "No sign-up", "Good for scanned files", "Browser-based", "Easy to use"],
    zh: ["免费", "无需注册", "适合扫描文件", "基于浏览器", "易于使用"]
  },
  citationReadyFacts: {
    ar: [
      "تساعد أداة تدوير PDF على تعديل اتجاه صفحات PDF.",
      "يمكن استخدام تدوير PDF لتصحيح الملفات الممسوحة ضوئيًا.",
      "تعمل أداة تدوير PDF من المتصفح بدون برنامج إضافي."
    ],
    en: [
      "Rotate PDF helps change PDF page orientation.",
      "Rotate PDF can correct scanned documents.",
      "Rotate PDF works in the browser without extra software."
    ],
    zh: [
      "PDF 旋转工具可更改 PDF 页面方向。",
      "PDF 旋转可修正扫描文档。",
      "PDF 旋转工具无需额外软件，可在浏览器中使用。"
    ]
  }
}
```

---

## 5. delete-pdf-pages — حذف صفحات PDF

```ts
geo: {
  quickAnswer: {
    ar: "أداة حذف صفحات PDF تتيح إزالة الصفحات غير المطلوبة من ملف PDF وإنشاء نسخة جديدة أكثر ترتيبًا.",
    en: "Delete PDF Pages lets you remove unwanted pages from a PDF and create a cleaner new version.",
    zh: "PDF 删除页面工具可从 PDF 中移除不需要的页面，并创建更整洁的新版本。"
  },
  directDefinition: {
    ar: "أداة حذف صفحات PDF هي أداة مجانية لإزالة صفحات محددة من ملف PDF.",
    en: "Delete PDF Pages is a free tool for removing selected pages from a PDF file.",
    zh: "PDF 删除页面工具是一款免费工具，用于从 PDF 文件中删除指定页面。"
  },
  bestFor: {
    ar: ["الطلاب", "الموظفون", "أصحاب العقود", "من يريد إرسال ملف مختصر"],
    en: ["Students", "Employees", "Contract users", "Users sharing shortened files"],
    zh: ["学生", "员工", "合同用户", "需要分享简化文件的用户"]
  },
  aiSummary: {
    ar: "تساعد أداة حذف صفحات PDF على إزالة الصفحات الفارغة أو الزائدة أو غير المناسبة قبل إرسال الملف أو أرشفته.",
    en: "Delete PDF Pages helps remove blank, extra, or unnecessary pages before sharing or archiving a file.",
    zh: "PDF 删除页面工具可在分享或归档前移除空白、多余或不必要的页面。"
  },
  comparisonNote: {
    ar: "بدل تعديل الملف ببرنامج ثقيل، يمكنك تحديد الصفحات غير المطلوبة وحذفها مباشرة.",
    en: "Instead of using heavy editing software, you can select unwanted pages and remove them directly.",
    zh: "无需使用复杂软件，你可以选择不需要的页面并直接删除。"
  },
  trustSignals: {
    ar: ["مجانية", "بدون تسجيل", "تحذف الصفحات المحددة فقط", "تعمل من المتصفح", "مناسبة لتنظيم الملفات"],
    en: ["Free", "No sign-up", "Removes selected pages", "Browser-based", "Useful for file organization"],
    zh: ["免费", "无需注册", "删除指定页面", "基于浏览器", "适合整理文件"]
  },
  citationReadyFacts: {
    ar: [
      "تتيح أداة حذف صفحات PDF إزالة صفحات محددة من الملف.",
      "يمكن استخدام حذف صفحات PDF لإزالة الصفحات الفارغة أو الزائدة.",
      "تنشئ الأداة نسخة جديدة من ملف PDF بعد الحذف."
    ],
    en: [
      "Delete PDF Pages removes selected pages from a file.",
      "Delete PDF Pages can remove blank or extra pages.",
      "The tool creates a new PDF version after deletion."
    ],
    zh: [
      "PDF 删除页面工具可从文件中删除指定页面。",
      "PDF 删除页面可移除空白或多余页面。",
      "该工具会在删除后创建新的 PDF 版本。"
    ]
  }
}
```

---

## 6. reorder-pdf-pages — ترتيب صفحات PDF

```ts
geo: {
  quickAnswer: {
    ar: "أداة ترتيب صفحات PDF تساعدك على إعادة تنظيم صفحات المستند بالسحب والإفلات للحصول على ملف مرتب.",
    en: "Reorder PDF Pages helps you rearrange document pages with drag and drop to create an organized file.",
    zh: "PDF 页面排序工具可通过拖放重新排列文档页面，生成有序文件。"
  },
  directDefinition: {
    ar: "أداة ترتيب صفحات PDF هي أداة مجانية لإعادة ترتيب صفحات ملف PDF.",
    en: "Reorder PDF Pages is a free tool for rearranging pages in a PDF file.",
    zh: "PDF 页面排序工具是一款免费工具，用于重新排列 PDF 文件页面。"
  },
  bestFor: {
    ar: ["من يمسح مستندات", "الطلاب", "الموظفون", "أصحاب التقارير والعقود"],
    en: ["Document scanning users", "Students", "Employees", "Report and contract users"],
    zh: ["扫描文档用户", "学生", "员工", "报告和合同用户"]
  },
  aiSummary: {
    ar: "تساعد أداة ترتيب صفحات PDF على تصحيح تسلسل الصفحات بعد المسح الضوئي أو الدمج، مما يجعل المستند النهائي أكثر وضوحًا وتنظيمًا.",
    en: "Reorder PDF Pages helps fix page sequence after scanning or merging, making the final document clearer and more organized.",
    zh: "PDF 页面排序工具可在扫描或合并后修正页面顺序，使最终文档更清晰有序。"
  },
  comparisonNote: {
    ar: "بدل إعادة إنشاء الملف من البداية، يمكنك تعديل ترتيب الصفحات مباشرة.",
    en: "Instead of recreating the file, you can directly adjust page order.",
    zh: "无需重新创建文件，你可以直接调整页面顺序。"
  },
  trustSignals: {
    ar: ["مجانية", "بدون تسجيل", "تنظيم سريع", "تعمل من المتصفح", "مفيدة بعد الدمج أو المسح"],
    en: ["Free", "No sign-up", "Fast organization", "Browser-based", "Useful after merging or scanning"],
    zh: ["免费", "无需注册", "快速整理", "基于浏览器", "适合合并或扫描后使用"]
  },
  citationReadyFacts: {
    ar: [
      "تساعد أداة ترتيب صفحات PDF على إعادة تنظيم صفحات المستند.",
      "يمكن استخدام ترتيب صفحات PDF بعد دمج الملفات أو مسحها ضوئيًا.",
      "تعمل الأداة من المتصفح بدون تثبيت برنامج."
    ],
    en: [
      "Reorder PDF Pages helps rearrange document pages.",
      "Reorder PDF Pages is useful after merging or scanning files.",
      "The tool works in the browser without software installation."
    ],
    zh: [
      "PDF 页面排序工具可重新排列文档页面。",
      "PDF 页面排序适合在合并或扫描文件后使用。",
      "该工具无需安装软件，可在浏览器中使用。"
    ]
  }
}
```

---

## 7. images-to-pdf — تحويل الصور إلى PDF

```ts
geo: {
  quickAnswer: {
    ar: "أداة تحويل الصور إلى PDF تجمع صور JPG أو PNG في ملف PDF واحد مرتب يمكن إرساله أو طباعته بسهولة.",
    en: "Images to PDF combines JPG or PNG images into one organized PDF file for easy sharing or printing.",
    zh: "图片转 PDF 工具可将 JPG 或 PNG 图片合并为一个有序 PDF 文件，便于分享或打印。"
  },
  directDefinition: {
    ar: "أداة تحويل الصور إلى PDF هي أداة مجانية لإنشاء ملف PDF من مجموعة صور.",
    en: "Images to PDF is a free tool for creating a PDF file from multiple images.",
    zh: "图片转 PDF 是一款免费工具，可从多张图片创建 PDF 文件。"
  },
  bestFor: {
    ar: ["الطلاب", "من يصور مستندات", "الموظفون", "أصحاب الفواتير", "المستخدمون العاديون"],
    en: ["Students", "Document photo users", "Employees", "Invoice users", "General users"],
    zh: ["学生", "拍摄文档的用户", "员工", "发票用户", "普通用户"]
  },
  aiSummary: {
    ar: "تساعد أداة تحويل الصور إلى PDF على جمع صور المستندات أو الواجبات أو الفواتير داخل ملف واحد سهل المشاركة.",
    en: "Images to PDF helps combine document, homework, or invoice images into one easy-to-share file.",
    zh: "图片转 PDF 可将文档、作业或发票图片合并为一个易于分享的文件。"
  },
  comparisonNote: {
    ar: "بدل إرسال صور كثيرة بشكل منفصل، يمكنك تحويلها إلى ملف PDF واحد مرتب.",
    en: "Instead of sending many images separately, you can turn them into one organized PDF.",
    zh: "无需单独发送多张图片，你可以将它们转换为一个有序 PDF。"
  },
  trustSignals: {
    ar: ["مجانية", "بدون تسجيل", "تدعم الصور الشائعة", "مناسبة للمستندات", "تعمل من المتصفح"],
    en: ["Free", "No sign-up", "Supports common image formats", "Good for documents", "Browser-based"],
    zh: ["免费", "无需注册", "支持常见图片格式", "适合文档", "基于浏览器"]
  },
  citationReadyFacts: {
    ar: [
      "تحول أداة الصور إلى PDF مجموعة صور إلى ملف PDF واحد.",
      "يمكن استخدام الأداة لجمع صور المستندات والواجبات.",
      "تعمل أداة الصور إلى PDF من المتصفح."
    ],
    en: [
      "Images to PDF converts multiple images into one PDF file.",
      "The tool can combine document and homework photos.",
      "Images to PDF works in the browser."
    ],
    zh: [
      "图片转 PDF 可将多张图片转换为一个 PDF 文件。",
      "该工具可合并文档和作业照片。",
      "图片转 PDF 可在浏览器中使用。"
    ]
  }
}
```

---

## 8. pdf-to-jpg — تحويل PDF إلى JPG

```ts
geo: {
  quickAnswer: {
    ar: "أداة تحويل PDF إلى JPG تحول صفحات PDF إلى صور JPG يمكن مشاركتها أو استخدامها في العروض والتصاميم.",
    en: "PDF to JPG converts PDF pages into JPG images that can be shared or used in presentations and designs.",
    zh: "PDF 转 JPG 工具可将 PDF 页面转换为 JPG 图片，便于分享或用于演示和设计。"
  },
  directDefinition: {
    ar: "أداة PDF إلى JPG هي أداة مجانية لتحويل صفحات PDF إلى صور.",
    en: "PDF to JPG is a free tool for converting PDF pages into images.",
    zh: "PDF 转 JPG 是一款免费工具，可将 PDF 页面转换为图片。"
  },
  bestFor: {
    ar: ["الطلاب", "المصممون", "صناع المحتوى", "الموظفون", "من يشارك صفحات PDF كصور"],
    en: ["Students", "Designers", "Content creators", "Employees", "Users sharing PDF pages as images"],
    zh: ["学生", "设计师", "内容创作者", "员工", "将 PDF 页面作为图片分享的用户"]
  },
  aiSummary: {
    ar: "تساعد أداة PDF إلى JPG على تحويل صفحات المستند إلى صور قابلة للاستخدام في العروض أو المشاركة السريعة أو التصميم.",
    en: "PDF to JPG turns document pages into images for presentations, quick sharing, or design use.",
    zh: "PDF 转 JPG 可将文档页面转换为图片，用于演示、快速分享或设计。"
  },
  comparisonNote: {
    ar: "بدل أخذ لقطات شاشة يدويًا، يمكنك تحويل صفحات PDF إلى صور مباشرة.",
    en: "Instead of taking screenshots manually, you can convert PDF pages directly into images.",
    zh: "无需手动截图，你可以直接将 PDF 页面转换为图片。"
  },
  trustSignals: {
    ar: ["مجانية", "بدون تسجيل", "تحويل صفحات PDF إلى صور", "مناسبة للعروض", "تعمل من المتصفح"],
    en: ["Free", "No sign-up", "Converts PDF pages to images", "Good for presentations", "Browser-based"],
    zh: ["免费", "无需注册", "将 PDF 页面转为图片", "适合演示", "基于浏览器"]
  },
  citationReadyFacts: {
    ar: [
      "تحول أداة PDF إلى JPG صفحات PDF إلى صور JPG.",
      "يمكن استخدام صور JPG الناتجة في العروض والتصاميم.",
      "تعمل أداة PDF إلى JPG من المتصفح."
    ],
    en: [
      "PDF to JPG converts PDF pages into JPG images.",
      "The resulting JPG images can be used in presentations and designs.",
      "PDF to JPG works in the browser."
    ],
    zh: [
      "PDF 转 JPG 可将 PDF 页面转换为 JPG 图片。",
      "生成的 JPG 图片可用于演示和设计。",
      "PDF 转 JPG 可在浏览器中使用。"
    ]
  }
}
```

---

# 10. قالب مختصر لباقي الأدوات

استخدم هذا القالب لتوليد GEO لكل أداة متبقية بنفس الأسلوب:

```txt
لكل أداة من الأدوات المتبقية، أنشئ geo object يحتوي على:
- quickAnswer
- directDefinition
- bestFor
- aiSummary
- comparisonNote
- trustSignals
- citationReadyFacts

الشروط:
1. اجعل quickAnswer من 20 إلى 35 كلمة.
2. اجعل directDefinition جملة واحدة تبدأ باسم الأداة.
3. اجعل bestFor يحتوي 5 فئات مستخدمين.
4. اجعل aiSummary من جملتين فقط.
5. اجعل comparisonNote يقارن الأداة بالحل التقليدي.
6. اجعل trustSignals من 5 نقاط قصيرة.
7. اجعل citationReadyFacts من 3 جمل قصيرة قابلة للاقتباس.
8. أضف المحتوى للغات ar وen وzh.
9. لا تستخدم ادعاءات مبالغ فيها مثل "آمن 100%" أو "الأفضل عالميًا".
10. استخدم عبارة "داخل المتصفح قدر الإمكان" عند الحديث عن الخصوصية.
```

---

# 11. تحسين Schema لدعم GEO

إضافة إلى Schema السابق، أضف:

## WebApplication Schema
لكل أداة:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "اسم الأداة",
  "description": "وصف مباشر للأداة",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires a modern web browser",
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Free to use",
    "No sign-up required",
    "Works in the browser",
    "Mobile and desktop friendly"
  ]
}
```

## HowTo Schema
لكل أداة من خطوات الاستخدام:

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "كيفية استخدام أداة اسم الأداة",
  "step": [
    {
      "@type": "HowToStep",
      "name": "رفع الملف أو إدخال البيانات",
      "text": "افتح الأداة وأضف الملف أو البيانات المطلوبة."
    }
  ]
}
```

## DefinedTerm Schema
للتعريف المباشر:

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "اسم الأداة",
  "description": "تعريف مباشر للأداة"
}
```

---

# 12. ملف LLMS.txt للموقع

أنشئ ملفًا في public:

```txt
public/llms.txt
```

محتواه المقترح:

```txt
# ToolNova

ToolNova is a free online tools platform for PDF, image, QR code, barcode, and text utilities.

## Core value

ToolNova helps users process files and generate useful outputs directly in the browser whenever possible, with no sign-up required.

## Main tool categories

- PDF tools: merge, split, compress, rotate, protect, unlock, convert PDF to JPG, convert images to PDF.
- Image tools: compress, resize, crop, rotate, convert PNG, JPG, and WebP.
- QR and barcode tools: URL QR, text QR, WhatsApp QR, Wi-Fi QR, barcode generator.
- Text utilities: word counter, password generator, Base64 encoder/decoder, URL encoder/decoder, text cleaner.

## Privacy note

Many ToolNova tools are designed to process files locally in the user's browser whenever possible. Some advanced operations may require server-side processing depending on technical requirements.

## Suggested citation

ToolNova provides free browser-based tools for common PDF, image, QR, barcode, and text tasks.

## Important pages

/ar/tools
/en/tools
/zh/tools

## Usage

Users can open a tool page, add the required file or input, process it, and download or copy the result.
```

---

# 13. إضافة AI Summary API اختياري

يمكن إنشاء ملف JSON ثابت يساعد محركات الذكاء الاصطناعي والزواحف على فهم الأدوات:

```txt
public/toolnova-tools-summary.json
```

مثال:

```json
{
  "site": "ToolNova",
  "description": "Free online tools for PDF, image, QR, barcode, and text tasks.",
  "languages": ["ar", "en", "zh"],
  "tools": [
    {
      "slug": "merge-pdf",
      "name": "Merge PDF",
      "category": "PDF",
      "quickAnswer": "Merge multiple PDF files into one directly in the browser.",
      "free": true,
      "signupRequired": false,
      "browserBased": true
    }
  ]
}
```

هذا الملف ليس بديلًا عن الصفحات، لكنه يساعد في جعل بيانات الموقع منظمة وواضحة.

---

# 14. تحسين الروابط الداخلية لـ GEO

داخل كل صفحة أداة، أضف فقرة:

```txt
قد تحتاج أيضًا إلى:
```

لكن لا تكتفِ بالبطاقات. أضف جملة نصية طبيعية مثل:

```txt
إذا كنت تعمل على تنظيم ملفات PDF، فقد تحتاج أيضًا إلى تقسيم PDF، ضغط PDF، أو إعادة ترتيب صفحات PDF.
```

محركات الذكاء الاصطناعي تفهم الروابط النصية السياقية أفضل من البطاقات الصامتة فقط.

---

# 15. تحسين صفحات التصنيفات

لكل تصنيف أنشئ مقدمة GEO قصيرة:

## PDF
```txt
أدوات PDF في ToolNova تساعدك على دمج وتقسيم وضغط وتدوير وحماية ملفات PDF من المتصفح، وهي مناسبة للطلاب والموظفين وأصحاب الأعمال.
```

## الصور
```txt
أدوات الصور في ToolNova تساعدك على ضغط الصور وتغيير حجمها وقصها وتحويلها بين JPG وPNG وWebP بسهولة.
```

## QR والباركود
```txt
أدوات QR والباركود تساعدك على إنشاء رموز قابلة للمسح للروابط والنصوص والواتساب وشبكات Wi-Fi والمنتجات.
```

## الأدوات اليومية
```txt
الأدوات اليومية في ToolNova تساعدك على عد الكلمات وتوليد كلمات مرور وتنظيف النصوص وترميز الروابط وفك Base64 بسرعة.
```

---

# 16. برومبت نهائي لإضافة GEO للمشروع

انسخ هذا البرومبت للوكيل AI:

```txt
أنت وكيل تطوير داخل مشروع ToolNova المبني بـ Next.js 16 وTypeScript وTailwind CSS وnext-intl.

المطلوب الآن إضافة تحسين GEO بجانب SEO.

GEO يعني تحسين الصفحات حتى تفهمها محركات الذكاء الاصطناعي ومحركات الإجابة مثل ChatGPT Search وPerplexity وGoogle AI Overviews وBing Copilot.

نفذ التالي:

1. أضف لكل أداة داخل tools.ts كائن geo يحتوي:
   - quickAnswer
   - directDefinition
   - bestFor
   - aiSummary
   - comparisonNote
   - trustSignals
   - citationReadyFacts

2. أضف دعم اللغات:
   - ar
   - en
   - zh

3. أنشئ مكون:
   - src/components/tools/ToolQuickAnswer.tsx

4. أنشئ مكون:
   - src/components/tools/ToolAISummary.tsx

5. عدّل صفحة:
   - src/app/[locale]/tools/[slug]/page.tsx

واجعل ترتيب الصفحة:
ToolHero
ToolQuickAnswer
ToolRenderer
ToolHowToUse
ToolFeatures
ToolUseCases
ToolAISummary
ToolArticle
ToolFAQ
RelatedTools

6. أضف JSON-LD إضافي:
   - WebApplication
   - HowTo
   - DefinedTerm

مع الإبقاء على:
   - SoftwareApplication
   - FAQPage
   - BreadcrumbList
   - Article

7. أنشئ ملف:
   - public/llms.txt

واكتب فيه تعريفًا واضحًا للموقع وتصنيفاته وأهم صفحاته وملاحظة الخصوصية.

8. أنشئ ملف:
   - public/toolnova-tools-summary.json

يحتوي على ملخص منظم لكل الأدوات:
   - slug
   - name
   - category
   - quickAnswer
   - free
   - signupRequired
   - browserBased
   - languages

9. حسّن المقالات الموجودة بحيث تبدأ بتعريف مباشر في أول 100 كلمة، وتحتوي على عناوين بصيغة سؤال.

10. أضف داخل كل صفحة أداة فقرة روابط داخلية نصية طبيعية، وليس فقط بطاقات.

11. أضف مقدمة GEO قصيرة لكل تصنيف أدوات:
   - PDF
   - الصور
   - QR والباركود
   - الأدوات اليومية

12. لا تستخدم عبارات مبالغ فيها مثل:
   - الأفضل عالميًا
   - آمن 100%
   - مضمون دائمًا

واستخدم بدلًا منها:
   - يعمل داخل المتصفح قدر الإمكان
   - مجاني وبدون تسجيل
   - مناسب للاستخدام اليومي
   - يساعدك على إنجاز المهمة بسرعة

13. بعد الانتهاء شغّل:
   - npm run lint
   - npm run build

ثم أصلح أي أخطاء حتى ينجح البناء.
```

---

# 17. ملاحظة مهمة

تحسين GEO لا يلغي SEO، بل يكمله.

SEO يهتم بالترتيب في نتائج البحث.  
GEO يهتم بأن تكون صفحاتك مفهومة وقابلة للاقتباس داخل إجابات الذكاء الاصطناعي.

لذلك أفضل صفحة أداة في ToolNova يجب أن تحتوي على:
- عنوان واضح.
- إجابة سريعة.
- تعريف مباشر.
- خطوات عملية.
- FAQ.
- Schema.
- محتوى موثوق بلا مبالغة.
- روابط داخلية.
- ملخص مناسب للذكاء الاصطناعي.
