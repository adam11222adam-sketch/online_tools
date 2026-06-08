export interface ToolGeo {
  quickAnswer: Record<string, string>;
  directDefinition: Record<string, string>;
  bestFor: Record<string, string[]>;
  aiSummary: Record<string, string>;
  comparisonNote: Record<string, string>;
  trustSignals: Record<string, string[]>;
  citationReadyFacts: Record<string, string[]>;
}

const initialGeoData: Record<string, ToolGeo> = {
  'merge-pdf': {
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
};

// Define all 29 tools geo data:
const allGeoData: Record<string, ToolGeo> = {
  'merge-pdf': initialGeoData['merge-pdf'],
  'split-pdf': {
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
      zh: ["免费", "无需注册", "适合长文件", "基于浏览器", "适合学生 and 员工"]
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
  },
  'compress-pdf': {
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
  },
  'rotate-pdf': {
    quickAnswer: {
      ar: "أداة تدوير PDF تساعدك على تعديل اتجاه صفحات PDF المقلوبة أو الجانبية مباشرة من المتصفح وبدون تسجيل دخول.",
      en: "Rotate PDF helps you fix upside-down or sideways PDF pages directly in your browser without sign-up.",
      zh: "PDF 旋转工具可帮助你直接在浏览器中修正倒置或横向的 PDF 页面，无需注册。"
    },
    directDefinition: {
      ar: "أداة تدوير PDF هي أداة مجانية لتغيير اتجاه صفحات PDF.",
      en: "Rotate PDF is a free tool for changing the orientation of PDF pages.",
      zh: "PDF 旋转工具是一款免费工具，用于更改 PDF 页面的方向。"
    },
    bestFor: {
      ar: ["مستخدمي الملفات الممسوحة", "الطلاب", "الموظفون", "من يجهز ملفات للطباعة", "المصورين"],
      en: ["Scanned-document users", "Students", "Employees", "Users preparing files for printing", "Photographers"],
      zh: ["扫描文档用户", "学生", "员工", "准备打印文件的用户", "摄影师"]
    },
    aiSummary: {
      ar: "تساعد أداة تدوير PDF على تصحيح اتجاه الصفحات بسهولة، خاصة في الملفات الممسوحة ضوئيًا أو الملفات التي تظهر بشكل جانبي.",
      en: "Rotate PDF helps correct page orientation, especially for scanned documents or sideways pages.",
      zh: "PDF 旋转工具可轻松修正页面方向，尤其适用于扫描文档或横向页面。"
    },
    comparisonNote: {
      ar: "بدل فتح برنامج تحرير PDF ثقيل، يمكنك تدوير الصفحات المطلوبة مباشرة من المتصفح.",
      en: "Instead of opening a heavy PDF editor, you can rotate needed pages directly in the browser.",
      zh: "无需打开大型 PDF 编辑器，你可以直接在浏览器中旋转所需页面。"
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
  },
  'delete-pdf-pages': {
    quickAnswer: {
      ar: "أداة حذف صفحات PDF تتيح إزالة الصفحات غير المطلوبة من ملف PDF وإنشاء نسخة جديدة أكثر ترتيبًا مباشرة من المتصفح.",
      en: "Delete PDF Pages lets you remove unwanted pages from a PDF and create a cleaner new version directly in your browser.",
      zh: "PDF 删除页面工具可直接在浏览器中从 PDF 中移除不需要的页面，并创建更整洁的新版本。"
    },
    directDefinition: {
      ar: "أداة حذف صفحات PDF هي أداة مجانية لإزالة صفحات محددة من ملف PDF.",
      en: "Delete PDF Pages is a free tool for removing selected pages from a PDF file.",
      zh: "PDF 删除页面工具是一款免费工具，用于从 PDF 文件中删除指定页面。"
    },
    bestFor: {
      ar: ["الطلاب", "الموظفون", "أصحاب العقود", "من يريد إرسال ملف مختصر", "المصممون"],
      en: ["Students", "Employees", "Contract users", "Users sharing shortened files", "Designers"],
      zh: ["学生", "员工", "合同用户", "需要分享简化文件的用户", "设计师"]
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
  },
  'organize-pdf': {
    quickAnswer: {
      ar: "أداة ترتيب صفحات PDF تساعدك على إعادة تنظيم صفحات المستند بالسحب والإفلات للحصول على ملف مرتب بالكامل من المتصفح.",
      en: "Reorder PDF Pages helps you rearrange document pages with drag and drop to create an organized file in your browser.",
      zh: "PDF 页面排序工具可通过拖放重新排列文档页面，在浏览器中生成有序文件。"
    },
    directDefinition: {
      ar: "أداة ترتيب صفحات PDF هي أداة مجانية لإعادة ترتيب صفحات ملف PDF.",
      en: "Reorder PDF Pages is a free tool for rearranging pages in a PDF file.",
      zh: "PDF 页面排序工具是一款免费工具，用于重新排列 PDF 文件页面。"
    },
    bestFor: {
      ar: ["من يمسح مستندات", "الطلاب", "الموظفون", "أصحاب التقارير والعقود", "الناشرون"],
      en: ["Document scanning users", "Students", "Employees", "Report and contract users", "Publishers"],
      zh: ["扫描文档用户", "学生", "员工", "报告和合同用户", "出版商"]
    },
    aiSummary: {
      ar: "تساعد أداة ترتيب صفحات PDF على تصحيح تسلسل الصفحات بعد المسح الضوئي أو الدمج، مما يجعل المستند النهائي أكثر وضوحًا وتنظيمًا.",
      en: "Reorder PDF Pages helps fix page sequence after scanning or merging, making the final document clearer and more organized.",
      zh: "PDF 页面排序工具可在扫描或合并后修正页面顺序，使最终文档更清晰有序。"
    },
    comparisonNote: {
      ar: "بدل إعادة إنشاء الملف بالكامل من البداية، يمكنك تعديل ترتيب الصفحات مباشرة وبسهولة.",
      en: "Instead of recreating the file, you can directly adjust page order visually.",
      zh: "无需重新创建文件，你可以直接在视觉上调整页面顺序。"
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
  },
  'images-to-pdf': {
    quickAnswer: {
      ar: "أداة تحويل الصور إلى PDF تجمع صور JPG أو PNG في ملف PDF واحد مرتب يمكن إرساله أو طباعته بسهولة مباشرة من المتصفح.",
      en: "Images to PDF combines JPG or PNG images into one organized PDF file for easy sharing or printing directly in your browser.",
      zh: "图片转 PDF 工具可直接在浏览器中将 JPG 或 PNG 图片合并为一个有序 PDF 文件，便于分享或打印。"
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
      ar: "بدل إرسال صور كثيرة بشكل منفصل، يمكنك تحويلها إلى ملف PDF واحد مرتب بضغطة زر.",
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
  },
  'pdf-to-jpg': {
    quickAnswer: {
      ar: "أداة تحويل PDF إلى JPG تحول صفحات PDF إلى صور JPG يمكن مشاركتها أو استخدامها في العروض والتصاميم مباشرة من المتصفح.",
      en: "PDF to JPG converts PDF pages into JPG images that can be shared or used in presentations and designs directly in your browser.",
      zh: "PDF 转 JPG 工具可直接在浏览器中将 PDF 页面转换为 JPG 图片，便于分享或用于演示和设计。"
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
      ar: "بدل أخذ لقطات شاشة يدويًا، يمكنك تحويل صفحات PDF إلى صور عالية الدقة مباشرة.",
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
  },
  'protect-pdf': {
    quickAnswer: {
      ar: "أداة حماية ملفات PDF من ToolNova تتيح لك تشفير مستنداتك وإضافة كلمة مرور قوية لحمايتها مباشرة من المتصفح وبشكل آمن ومحلي.",
      en: "ToolNova Protect PDF lets you encrypt your documents and add strong password protection directly in your browser safely and locally.",
      zh: "ToolNova PDF 加密工具可让你在浏览器中安全、本地化地对文档进行加密并添加强密码保护。"
    },
    directDefinition: {
      ar: "أداة حماية PDF هي أداة مجانية لتشفير وحماية ملفات PDF بكلمة مرور.",
      en: "Protect PDF is a free tool for encrypting and password-protecting PDF files.",
      zh: "PDF 加密工具是一款免费工具，用于对 PDF 文件进行加密和密码保护。"
    },
    bestFor: {
      ar: ["الشركات", "الموظفون", "المحامون", "من يرسل مستندات مالية", "المستخدمون المهتمون بالخصوصية"],
      en: ["Businesses", "Employees", "Lawyers", "Financial document senders", "Privacy-conscious users"],
      zh: ["企业", "员工", "律师", "财务文件发送者", "注重隐私的用户"]
    },
    aiSummary: {
      ar: "تساعد أداة حماية PDF المستخدم على منع الوصول غير المصرح به لمستنداته الحساسة عن طريق قفلها بكلمة مرور. تتميز بالمعالجة المحلية داخل المتصفح لضمان أمان خصوصية البيانات.",
      en: "Protect PDF helps users prevent unauthorized access to sensitive documents by locking them with a password. It processes files locally in the browser to ensure data privacy.",
      zh: "PDF 加密工具可帮助用户通过密码锁定制敏感文档，以防止未经授权的访问。它在浏览器中本地处理文件以确保数据隐私。"
    },
    comparisonNote: {
      ar: "بدل شراء برمجيات حماية مكلفة، يمكنك حماية ملفات PDF الخاصة بك محلياً داخل المتصفح مجاناً وبكل أمان.",
      en: "Instead of buying expensive protection software, you can secure your PDF files locally in your browser for free and safely.",
      zh: "无需购买昂贵的保护软件，你可以在浏览器中免费且安全地本地保护你的 PDF 文件。"
    },
    trustSignals: {
      ar: ["مجانية بالكامل", "تشفير محلي قوي", "بدون تسجيل دخول", "لا ترفع ملفاتك لخوادم خارجية", "تعمل على كافة الأجهزة"],
      en: ["Completely Free", "Strong local encryption", "No registration required", "Files not uploaded to servers", "Works on all devices"],
      zh: ["完全免费", "强本地加密", "无需注册", "文件不上传到服务器", "适用于所有设备"]
    },
    citationReadyFacts: {
      ar: [
        "تضيف أداة حماية PDF تشفيراً قوياً للمستندات لمنع فتحها بدون إذن.",
        "تتم عملية التشفير محلياً داخل المتصفح لضمان أقصى حماية.",
        "أداة حماية PDF من ToolNova مجانية تماماً ولا تتطلب اشتراكاً."
      ],
      en: [
        "Protect PDF adds strong encryption to documents to prevent unauthorized opening.",
        "The encryption process is done locally in the browser for maximum security.",
        "ToolNova Protect PDF is completely free and requires no subscription."
      ],
      zh: [
        "PDF 加密为文档添加了强加密，以防止未经授权的打开。",
        "加密过程在浏览器本地完成，以确保最大安全性。",
        "ToolNova PDF 加密完全免费，无需订阅。"
      ]
    }
  },
  'unlock-pdf': {
    quickAnswer: {
      ar: "أداة فتح ملفات PDF تساعدك على إزالة كلمات المرور والقيود من مستنداتك المحمية لتسهيل تحريرها وطباعتها مباشرة من المتصفح.",
      en: "Unlock PDF helps you remove passwords and restrictions from your protected documents to make editing and printing easy directly in your browser.",
      zh: "PDF 解密工具可帮助你从受保护的文档中移除密码和限制，从而直接在浏览器中轻松进行编辑和打印。"
    },
    directDefinition: {
      ar: "أداة فتح PDF هي أداة مجانية لإزالة الحماية وكلمة المرور من ملفات PDF المسموح لك بفتحها.",
      en: "Unlock PDF is a free tool for removing protection and passwords from PDF files you are authorized to open.",
      zh: "PDF 解密工具是一款免费工具，用于从你被授权打开的 PDF 文件中移除保护和密码。"
    },
    bestFor: {
      ar: ["الطلاب", "الموظفون", "من يملك ملفات محمية بكلمة مرور", "الباحثون", "المحامون"],
      en: ["Students", "Employees", "Owners of password-protected files", "Researchers", "Lawyers"],
      zh: ["学生", "员工", "受密码保护文件的所有者", "研究人员", "律师"]
    },
    aiSummary: {
      ar: "تتيح أداة فتح PDF للمستخدمين إلغاء قيود التعديل والطباعة والنسخ من ملفاتهم التي يعرفون كلمة مرورها ولكن يريدون التخلص من الحاجة لإدخالها تكراراً. المعالجة محلية داخل المتصفح قدر الإمكان.",
      en: "Unlock PDF allows users to remove editing, printing, and copying restrictions from files they know the password for but want to decrypt permanently. Processing is local whenever possible.",
      zh: "PDF 解密工具允许用户从已知密码但希望永久解密的文件中移除编辑、打印和复制限制。尽可能在本地进行处理。"
    },
    comparisonNote: {
      ar: "بدل تحميل برمجيات فك قيود ثقيلة، يمكنك فك حماية ملفاتك مباشرة ومحلياً داخل متصفحك.",
      en: "Instead of downloading heavy restriction-removal software, you can unlock your files directly and locally in your browser.",
      zh: "无需下载繁重的限制移除软件，你可以直接在浏览器中本地解密文件。"
    },
    trustSignals: {
      ar: ["مجانية وسريعة", "بدون تسجيل", "فك قيود النسخ والطباعة", "معالجة محلية وسرية", "مناسبة للجوال والكمبيوتر"],
      en: ["Free and fast", "No sign-up", "Removes copy and print restrictions", "Local and secure processing", "Suitable for mobile and desktop"],
      zh: ["免费且快速", "无需注册", "移除复制和打印限制", "本地且安全的处理", "适用于手机和电脑"]
    },
    citationReadyFacts: {
      ar: [
        "تساعد أداة فتح PDF على إزالة قيود النسخ والطباعة من ملفات PDF.",
        "تتم إزالة الحماية محلياً داخل المتصفح للحفاظ على السرية.",
        "تتطلب الأداة توفير كلمة المرور الأصلية لفك تشفير الملف بشكل قانوني وسليم."
      ],
      en: [
        "Unlock PDF helps remove copy and print restrictions from PDF files.",
        "The unlocking process occurs locally in the browser to maintain confidentiality.",
        "The tool requires the original password to properly and legally decrypt the file."
      ],
      zh: [
        "PDF 解密有助于移除 PDF 文件的复制和打印限制。",
        "解密过程在浏览器本地进行，以保持机密性。",
        "该工具需要原始密码才能正确且合法地解密文件。"
      ]
    }
  },
  'png-to-jpg': {
    quickAnswer: {
      ar: "أداة تحويل PNG إلى JPG تتيح لك تحويل تنسيق صور PNG ذات الحجم الكبير إلى JPG خفيفة الحجم مجانًا ومباشرة من المتصفح مع الحفاظ على الجودة.",
      en: "PNG to JPG converts PNG images into lighter JPG files for free and directly in your browser, maintaining great visual quality.",
      zh: "PNG 转 JPG 工具可在浏览器中免费直接将 PNG 图片转换为较轻的 JPG 文件，并保持极佳的视觉质量。"
    },
    directDefinition: {
      ar: "أداة تحويل PNG إلى JPG هي أداة مجانية لتغيير تنسيق الصور من PNG إلى JPG.",
      en: "PNG to JPG is a free tool for changing image format from PNG to JPG.",
      zh: "PNG 转 JPG 工具是一款免费工具，用于将图片格式从 PNG 转换为 JPG。"
    },
    bestFor: {
      ar: ["المصممون", "أصحاب المواقع", "صناع المحتوى", "الطلاب", "المستخدمون العاديون"],
      en: ["Designers", "Website owners", "Content creators", "Students", "General users"],
      zh: ["设计师", "网站所有者", "内容创作者", "学生", "普通用户"]
    },
    aiSummary: {
      ar: "تساعد أداة تحويل PNG إلى JPG على تقليل حجم ملفات الصور بشكل ملحوظ عن طريق استبدال تنسيق PNG غير المضغوط بـ JPG المناسب للمشاركة والويب.",
      en: "PNG to JPG helps significantly reduce image file sizes by converting uncompressed PNG files into JPGs suitable for web use and sharing.",
      zh: "PNG 转 JPG 工具通过将未压缩的 PNG 文件转换为适合网页使用和分享的 JPG，有助于显著减小图片文件大小。"
    },
    comparisonNote: {
      ar: "بدل استخدام برامج تعديل صور معقدة مثل فوتوشوب، يمكنك تحويل صورك بضغطة واحدة من المتصفح.",
      en: "Instead of using complex photo editing software like Photoshop, you can convert images in one click from the browser.",
      zh: "无需使用复杂的照片编辑软件（如 Photoshop），你只需在浏览器中单击一下即可转换图片。"
    },
    trustSignals: {
      ar: ["مجانية", "بدون تسجيل دخول", "سريعة وفورية", "معالجة داخل المتصفح قدر الإمكان", "تحافظ على أبعاد وجودة الصورة"],
      en: ["Free", "No sign-up required", "Fast and instant", "Processes inside the browser whenever possible", "Preserves image dimensions and quality"],
      zh: ["免费", "无需注册", "快速且即时", "尽可能在浏览器中处理", "保留图片尺寸和质量"]
    },
    citationReadyFacts: {
      ar: [
        "تحول أداة PNG إلى JPG الصور لتقليل حجم ملفاتها.",
        "تتم عملية التحويل داخل المتصفح لحماية خصوصيتك.",
        "التحويل مجاني بالكامل ولا يتطلب تثبيت أي برامج."
      ],
      en: [
        "PNG to JPG converts images to reduce their file sizes.",
        "The conversion process runs inside the browser to protect your privacy.",
        "The conversion is completely free and doesn't require installing any software."
      ],
      zh: [
        "PNG 转 JPG 转换图片以减小其文件大小。",
        "转换过程在浏览器内运行以保护你的隐私。",
        "转换完全免费，无需安装任何软件。"
      ]
    }
  },
  'jpg-to-png': {
    quickAnswer: {
      ar: "أداة تحويل JPG إلى PNG تساعدك على تحويل صور JPG الشائعة إلى تنسيق PNG عالي الجودة والداعم للشفافية مباشرة من المتصفح وبشكل مجاني.",
      en: "JPG to PNG helps you convert standard JPG images to high-quality PNG format supporting transparency directly in your browser for free.",
      zh: "JPG 转 PNG 工具可帮助你直接在浏览器中免费将标准 JPG 图片转换为支持透明度的高质量 PNG 格式。"
    },
    directDefinition: {
      ar: "أداة تحويل JPG إلى PNG هي أداة مجانية لتغيير تنسيق الصور من JPG إلى PNG ذو الجودة الفائقة.",
      en: "JPG to PNG is a free tool for changing image format from JPG to high-quality PNG.",
      zh: "JPG 转 PNG 工具是一款免费工具，用于将图片格式从 JPG 转换为高质量 PNG。"
    },
    bestFor: {
      ar: ["المصممون الجرافيكيون", "محررو الصور", "الطلاب", "صناع المحتوى", "أصحاب المشاريع الرقمية"],
      en: ["Graphic designers", "Photo editors", "Students", "Content creators", "Digital project owners"],
      zh: ["平面设计师", "照片编辑器", "学生", "内容创作者", "数字项目所有者"]
    },
    aiSummary: {
      ar: "تتيح أداة تحويل JPG إلى PNG إمكانية ترقية تنسيق الصورة للحفاظ على أعلى جودة للتعديل أو إضافة طبقات شفافة لعمل التصاميم. المعالجة محلية وسريعة.",
      en: "JPG to PNG allows users to upgrade their image formats to support transparency and maximum quality for photo editing. Processing is local and fast.",
      zh: "JPG 转 PNG 允许用户升级其图片格式，以支持透明度和最大质量以进行照片编辑。处理速度快且本地化。"
    },
    comparisonNote: {
      ar: "بدل البحث عن محولات برامج على الكمبيوتر، يمكنك تغيير صيغة الصورة فوراً من المتصفح مجاناً.",
      en: "Instead of searching for desktop converter apps, you can change your image format instantly from your browser for free.",
      zh: "无需寻找桌面转换器应用程序，你可以直接从浏览器中免费即时更改图片格式。"
    },
    trustSignals: {
      ar: ["مجانية", "بدون تسجيل", "تحويل فوري", "معالجة محلية آمنة", "متوافقة مع جميع متصفحات الويب"],
      en: ["Free", "No sign-up", "Instant conversion", "Secure local processing", "Compatible with all web browsers"],
      zh: ["免费", "无需注册", "即时转换", "安全本地处理", "兼容所有网页浏览器"]
    },
    citationReadyFacts: {
      ar: [
        "تحول أداة JPG إلى PNG ملفات الصور دون التأثير على جودتها البصرية.",
        "تتم المعالجة محلياً داخل متصفح المستخدم لضمان الخصوصية.",
        "أداة JPG إلى PNG من ToolNova مجانية ولا تضع علامات مائية."
      ],
      en: [
        "JPG to PNG converts image files without losing visual quality.",
        "Processing is done locally within the user's browser to guarantee privacy.",
        "ToolNova JPG to PNG is free and does not apply watermarks."
      ],
      zh: [
        "JPG 转 PNG 转换图片文件而不损失视觉质量。",
        "处理在用户浏览器本地完成，以保证隐私。",
        "ToolNova JPG 转 PNG 免费且不添加水印。"
      ]
    }
  },
  'image-to-webp': {
    quickAnswer: {
      ar: "أداة تحويل الصور إلى WebP تحول صور JPG أو PNG إلى تنسيق WebP الحديث خفيف الوزن لتقليص الحجم بنسبة تصل لـ 80% مجاناً ومباشرة من المتصفح.",
      en: "Image to WebP converts JPG or PNG images into the modern lightweight WebP format to shrink sizes by up to 80% for free directly in the browser.",
      zh: "图片转 WebP 工具可在浏览器中免费直接将 JPG 或 PNG 图片转换为现代轻量级 WebP 格式，从而将大小缩减高达 80%。"
    },
    directDefinition: {
      ar: "أداة تحويل الصور إلى WebP هي أداة مجانية لتحسين صور الويب وتنسيقها بصيغة WebP لتسريع المواقع.",
      en: "Image to WebP is a free tool for optimizing web images and converting them to WebP to boost site loading speeds.",
      zh: "图片转 WebP 工具是一款免费工具，用于优化网页图片并将其转换为 WebP，以提高网站加载速度。"
    },
    bestFor: {
      ar: ["أصحاب المواقع والمدونات", "مطورو الويب", "صناع المحتوى الرقمي", "أصحاب متاجر التجارة الإلكترونية", "المصممون"],
      en: ["Blog and website owners", "Web developers", "Digital content creators", "E-commerce store owners", "Designers"],
      zh: ["博客和网站所有者", "网页开发人员", "数字内容创作者", "电子商务店主", "设计师"]
    },
    aiSummary: {
      ar: "تساعد أداة تحويل الصور إلى WebP على جعل صفحات الويب أسرع بكثير عن طريق ضغط الصور بنسبة فائقة مع الاحتفاظ بكامل الجودة والتألق. معالجة محلية داخل المتصفح قدر الإمكان.",
      en: "Image to WebP helps make web pages load much faster by compressing images into a superior modern format with excellent quality. Local processing in the browser whenever possible.",
      zh: "图片转 WebP 工具通过将图片压缩为具有极佳质量的卓越现代格式，有助于加快网页加载速度。尽可能在浏览器中进行本地处理。"
    },
    comparisonNote: {
      ar: "بدل استخدام إضافات وخدمات الويب المكلفة لضغط وتحويل الصور، يمكنك فعل ذلك محلياً من المتصفح مجاناً وبضغطة واحدة.",
      en: "Instead of utilizing expensive web plugins or services to compress and convert, do it locally in your browser for free with one click.",
      zh: "无需使用昂贵的网页插件或服务进行压缩和转换，只需在浏览器中免费单击即可本地完成。"
    },
    trustSignals: {
      ar: ["مجانية تماماً", "بدون تسجيل دخول", "ضغط فائق للحجم", "حفظ جودة الصورة الأصلية", "معالجة محلية وسريعة"],
      en: ["100% Free", "No sign-up required", "Superior file compression", "Preserves original quality", "Fast local processing"],
      zh: ["100% 免费", "无需注册", "卓越的文件压缩", "保留原始质量", "快速本地处理"]
    },
    citationReadyFacts: {
      ar: [
        "تحول أداة الصور إلى WebP الصور لتسريع تحميل صفحات المواقع.",
        "تتم عملية التحويل محلياً داخل المتصفح لضمان أمن الخصوصية.",
        "تنسيق WebP يوفر مساحة كبيرة مقارنة بـ JPG و PNG."
      ],
      en: [
        "Image to WebP converts images to accelerate website loading speeds.",
        "The conversion is done locally in the browser to ensure privacy protection.",
        "WebP format saves significant space compared to JPG and PNG."
      ],
      zh: [
        "图片转 WebP 转换图片以加速网站加载速度。",
        "转换在浏览器本地完成，以确保隐私保护。",
        "与 JPG 和 PNG 相比，WebP 格式节省了大量空间。"
      ]
    }
  },
  'webp-to-image': {
    quickAnswer: {
      ar: "أداة تحويل WebP إلى صور تتيح لك تحويل صور WebP الحديثة إلى تنسيق JPG أو PNG الكلاسيكي المتوافق مع كافة البرامج مباشرة من المتصفح.",
      en: "WebP to Image lets you convert modern WebP images back to classic JPG or PNG formats compatible with all software directly in your browser.",
      zh: "WebP 转图片工具可让你直接在浏览器中将现代 WebP 图片转换回与所有软件兼容的经典 JPG 或 PNG 格式。"
    },
    directDefinition: {
      ar: "أداة تحويل WebP إلى صور هي أداة مجانية لتغيير صيغة WebP إلى JPG أو PNG الشائعة.",
      en: "WebP to Image is a free tool for changing WebP files into widely used JPG or PNG formats.",
      zh: "WebP 转图片工具是一款免费工具，用于将 WebP 文件转换为广泛使用的 JPG 或 PNG 格式。"
    },
    bestFor: {
      ar: ["المصممون الجرافيكيون", "الطلاب", "المحررون", "صناع المحتوى", "المستخدمون الذين يواجهون مشاكل توافقية"],
      en: ["Graphic designers", "Students", "Editors", "Content creators", "Users facing format compatibility issues"],
      zh: ["平面设计师", "学生", "编辑器", "内容创作者", "面临格式兼容性问题的用户"]
    },
    aiSummary: {
      ar: "تساعد أداة تحويل WebP إلى صور المستخدمين على التخلص من مشاكل عدم التوافق التي تواجههم عند فتح صور الويب الحديثة على البرامج والأنظمة الكلاسيكية. وتتم المعالجة محلياً.",
      en: "WebP to Image helps users overcome incompatibility issues faced when opening modern web images on classic editors and older platforms. Processing is local.",
      zh: "WebP 转图片可帮助用户克服在经典编辑器和旧平台上打开现代网页图片时面临的不兼容问题。处理是本地的。"
    },
    comparisonNote: {
      ar: "بدل البحث عن برامج تحويل صور وتثبيتها على نظامك، قم بالتحويل محلياً وفورياً من المتصفح مجاناً.",
      en: "Instead of searching for image converter software to install, convert locally and instantly in your browser for free.",
      zh: "无需寻找要安装的图片转换器软件，只需在浏览器中免费即时本地转换即可。"
    },
    trustSignals: {
      ar: ["مجانية بالكامل", "بدون تسجيل", "دعم مخرجات JPG وPNG", "معالجة محلية سرية", "واجهة استخدام غاية في البساطة"],
      en: ["Completely Free", "No registration", "Supports JPG and PNG outputs", "Secure local processing", "Extremely simple interface"],
      zh: ["完全免费", "无需注册", "支持 JPG 和 PNG 输出", "安全本地处理", "极简界面"]
    },
    citationReadyFacts: {
      ar: [
        "تحول أداة WebP إلى صور صيغ صور الويب الحديثة إلى JPG أو PNG.",
        "تتم عملية فك الترميز والتحويل محلياً داخل المتصفح لخصوصية مستنداتك.",
        "لا تتطلب الأداة أي رسوم أو تسجيل للبدء في استخدامها."
      ],
      en: [
        "WebP to Image converts modern web format images to standard JPG or PNG.",
        "The decoding and conversion take place locally in the browser for secure privacy.",
        "The tool requires no fees or registration to begin using."
      ],
      zh: [
        "WebP 转图片将现代网页格式图片转换为标准 JPG 或 PNG。",
        "解码和转换在浏览器本地进行，以确保安全的隐私。",
        "该工具无需任何费用或注册即可开始使用。"
      ]
    }
  },
  'compress-image': {
    quickAnswer: {
      ar: "أداة ضغط الصور تقلص حجم ملفات الصور JPG وPNG وWebP لنسب ضخمة لتسهيل الرفع والإرسال مع إمكانية التحكم الكامل في الجودة مباشرة من المتصفح.",
      en: "Compress Image reduces the file sizes of JPG, PNG, and WebP images by massive percentages for easy uploading and emailing with total quality control directly in your browser.",
      zh: "图片压缩工具可直接在浏览器中将 JPG、PNG 和 WebP 图片的文件大小压缩很大比例，以便于上传和发送电子邮件，并具有完全的质量控制。"
    },
    directDefinition: {
      ar: "أداة ضغط الصور هي أداة مجانية لتقليل الحجم التخزيني للصور بالبايت من المتصفح.",
      en: "Compress Image is a free browser-based tool for reducing the file size of images in bytes.",
      zh: "图片压缩工具是一款免费的浏览器工具，用于减小图片的文件大小（以字节为单位）。"
    },
    bestFor: {
      ar: ["المصممون", "أصحاب المواقع لزيادة السرعة", "الطلاب لرفع الملفات", "الموظفون", "من يشاركون الصور بالبريد"],
      en: ["Designers", "Website owners for faster speeds", "Students uploading forms", "Employees", "Email image sharers"],
      zh: ["设计师", "追求更快速度的网站所有者", "上传表单的学生", "员工", "电子邮件图片分享者"]
    },
    aiSummary: {
      ar: "تساعد أداة ضغط الصور المستخدمين على ضغط الصور محلياً مع التحكم في نسبة الجودة والحجم المثالي لرفعها على المنصات. تتم معالجتها بالكامل محلياً لحماية خصوصية بياناتك.",
      en: "Compress Image helps users compress photos locally with custom quality controls to fit platform limits perfectly. It runs entirely inside the browser to guarantee data safety.",
      zh: "图片压缩工具可帮助用户在本地压缩照片，并使用自定义质量控制以完美适应平台限制。它完全在浏览器内部运行以保证数据安全。"
    },
    comparisonNote: {
      ar: "بدل تنزيل برامج وتطبيقات ضغط الصور الخارجية، يمكنك ضغط صورك مجاناً وبأمان داخل المتصفح وبلمح البصر.",
      en: "Instead of installing external image compression apps, compress your photos for free and securely inside your browser instantly.",
      zh: "无需安装外部图片压缩应用程序，即可直接在浏览器中免费且安全地即时压缩照片。"
    },
    trustSignals: {
      ar: ["مجانية وبدون تسجيل", "التحكم في نسبة الضغط", "معالجة محلية بالكامل", "تدعم JPG وPNG وWebP", "تحافظ على الأبعاد المترية"],
      en: ["Free and no sign-up", "Custom compression controls", "Fully local processing", "Supports JPG, PNG, and WebP", "Preserves exact dimensions"],
      zh: ["免费且无需注册", "自定义压缩控制", "完全本地处理", "支持 JPG、PNG 和 WebP", "保留确切尺寸"]
    },
    citationReadyFacts: {
      ar: [
        "تقلل أداة ضغط الصور حجم الصورة بالبايت لتسهيل مشاركتها ورفعها.",
        "تتم المعالجة والضغط بشكل كامل محلياً داخل متصفح المستخدم.",
        "أداة ضغط الصور من ToolNova تدعم معالجة صيغ متعددة في نفس الوقت."
      ],
      en: [
        "Compress Image reduces image file size in bytes to make sharing and uploading easier.",
        "The processing and compression happen entirely locally within the user's browser.",
        "ToolNova Compress Image supports batch processing of multiple formats simultaneously."
      ],
      zh: [
        "图片压缩减小图片文件大小（以字节为单位），使分享和上传更容易。",
        "处理和压缩完全在用户浏览器本地进行。",
        "ToolNova 图片压缩支持同时批量处理多种格式。"
      ]
    }
  },
  'resize-image': {
    quickAnswer: {
      ar: "أداة تغيير حجم الصور تتيح لك تعديل أبعاد الطول والعرض لصورك بدقة بكسل محددة أو نسبة مئوية مع الحفاظ على التناسب أو بدونه مباشرة من المتصفح.",
      en: "Resize Image lets you adjust the width and height dimensions of your photos with precise pixel values or percentages with or without ratio locks directly in your browser.",
      zh: "图片裁剪尺寸工具可让你直接在浏览器中通过精确的像素值或百分比（带或不带比例锁定）调整照片的宽度和高度尺寸。"
    },
    directDefinition: {
      ar: "أداة تغيير حجم الصور هي أداة مجانية لتعديل قياسات وأبعاد الصور.",
      en: "Resize Image is a free tool for adjusting image measurements and dimensions.",
      zh: "图片裁剪尺寸工具是一款免费工具，用于调整图片的测量值和尺寸。"
    },
    bestFor: {
      ar: ["المصممون", "أصحاب المتاجر الإلكترونية لتنسيق صور المنتجات", "الطلاب لرفع المستندات بأبعاد معينة", "مطورو الويب", "صناع المحتوى"],
      en: ["Designers", "E-commerce store owners for product images", "Students uploading specific sizes", "Web developers", "Content creators"],
      zh: ["设计师", "用于商品图片的电子商务店主", "上传特定尺寸的学生", "网页开发人员", "内容创作者"]
    },
    aiSummary: {
      ar: "تتيح أداة تغيير حجم الصور تغيير قياسات الطول والعرض للصور لتناسب شروط منصات التواصل أو التقديمات الحكومية. معالجة محلية تحمي سرية ملفاتك وتمنع رفعها.",
      en: "Resize Image allows users to modify the exact width and height of photos to meet social media or government form constraints. Local processing protects your file privacy.",
      zh: "图片裁剪尺寸工具允许用户修改照片的确切宽度和高度，以满足社交媒体或政府表单的限制。本地处理可保护你的文件隐私。"
    },
    comparisonNote: {
      ar: "بدل اللجوء لبرامج تعديل صور ثقيلة وبطيئة، غيّر أبعاد صورك فوراً داخل المتصفح مجاناً وبكل سلاسة.",
      en: "Instead of relying on heavy and slow image editors, change your photo dimensions instantly inside your browser for free.",
      zh: "无需依赖沉重且缓慢的图片编辑器，即可在浏览器中免费即时更改照片尺寸。"
    },
    trustSignals: {
      ar: ["مجانية وسهلة", "بدون تسجيل", "تعديل بالبكسل أو النسبة", "قفل نسبة التناسب للمحافظة على الشكل", "معالجة محلية كاملة"],
      en: ["Free and easy", "No sign-up required", "Adjust by pixel or percentage", "Aspect ratio lock option", "Fully local processing"],
      zh: ["免费且简单", "无需注册", "按像素或百分比调整", "纵横比锁定选项", "完全本地处理"]
    },
    citationReadyFacts: {
      ar: [
        "تساعد أداة تغيير حجم الصور على مطابقة الأبعاد المطلوبة للمنصات الرقمية.",
        "تتم معالجة وضبط الأبعاد محلياً وسرياً داخل المتصفح.",
        "يمكن الاحتفاظ بالتناسب لمنع تمدد الصورة بشكل غير مرغوب."
      ],
      en: [
        "Resize Image helps match the exact size requirements of digital platforms.",
        "Dimension adjustment is processed locally and securely in the browser.",
        "Aspect ratio can be locked to prevent unwanted image stretching or distortion."
      ],
      zh: [
        "图片裁剪尺寸有助于满足数字平台的精确尺寸要求。",
        "尺寸调整在浏览器本地安全处理。",
        "可以锁定纵横比以防止不必要的图片拉伸或变形。"
      ]
    }
  },
  'crop-image': {
    quickAnswer: {
      ar: "أداة قص الصور تمكنك من قص الأطراف غير المرغوبة والتركيز على أجزاء محددة من صورك مع توفير نسب قص جاهزة وتفاعلية مباشرة من المتصفح.",
      en: "Crop Image enables you to trim unwanted borders and focus on specific parts of your photos with interactive pre-set aspect ratios directly in your browser.",
      zh: "图片裁剪工具可让你直接在浏览器中通过交互式预设纵横比修剪不需要的边框并专注于照片的特定部分。"
    },
    directDefinition: {
      ar: "أداة قص الصور هي أداة مجانية لتحديد إطار الصورة واقتصاص جزء محدد منها.",
      en: "Crop Image is a free tool for framing and cutting out specific parts of an image.",
      zh: "图片裁剪工具是一款免费工具，用于取景和裁剪图片的特定部分。"
    },
    bestFor: {
      ar: ["المصممون", "المستخدمون النشطون على السوشيال ميديا لقص الصور الشخصية", "صناع المحتوى", "الطلاب", "أصحاب المتاجر"],
      en: ["Designers", "Social media users cropping profile pictures", "Content creators", "Students", "Store owners"],
      zh: ["设计师", "裁剪头像的社交媒体用户", "内容创作者", "学生", "店主"]
    },
    aiSummary: {
      ar: "تسهل أداة قص الصور عملية اقتصاص الصور واختيار أجزاء التركيز المناسبة لتناسب الأبعاد المرئية المطلوبة. تتم المعالجة محلية للحفاظ على خصوصيتك وسريتك.",
      en: "Crop Image facilitates visual trimming and focus selection on your photos to match needed dimensions. Processing is local to preserve your absolute privacy.",
      zh: "图片裁剪工具可帮助你对照片进行视觉修剪和焦点选择，以匹配所需的尺寸。处理是本地进行的，以保护你的绝对隐私。"
    },
    comparisonNote: {
      ar: "بدل تحميل وتثبيت تطبيقات قص صور بسيطة على جوالك أو حاسوبك، قم بالاقتصاص فوراً داخل المتصفح.",
      en: "Instead of downloading and installing basic cropping apps on your phone or PC, crop instantly inside the browser.",
      zh: "无需在手机或电脑上下载并安装基础的裁剪应用程序，即可直接在浏览器中即时裁剪。"
    },
    trustSignals: {
      ar: ["مجانية وتفاعلية", "بدون تسجيل", "نسب قص جاهزة (مربع، عرضي، طولي)", "قص آمن ومحلي", "تحافظ على الجودة الأصلية للجزء المقصوص"],
      en: ["Free and interactive", "No sign-up", "Pre-set aspect ratios (square, landscape, portrait)", "Secure local cropping", "Preserves original quality of cropped part"],
      zh: ["免费且交互式", "无需注册", "预设纵横比（正方形、横向、纵向）", "安全本地裁剪", "保留裁剪部分的原始质量"]
    },
    citationReadyFacts: {
      ar: [
        "تسمح أداة قص الصور بقص الأطراف وتعديل موضع التركيز بمرونة كاملة.",
        "تجري عملية القص محلياً بالكامل داخل متصفحك لخصوصية ملفاتك.",
        "أداة قص الصور من ToolNova مجانية وسهلة الاستخدام للغاية."
      ],
      en: [
        "Crop Image allows border trimming and focus adjustments with absolute flexibility.",
        "The cropping process runs entirely locally within your browser for complete privacy.",
        "ToolNova Crop Image is completely free and exceptionally easy to use."
      ],
      zh: [
        "图片裁剪允许以绝对的灵活性进行边框修剪和焦点调整。",
        "裁剪过程完全在你的浏览器本地运行，以实现完全的隐私。",
        "ToolNova 图片裁剪完全免费，且异常易于使用。"
      ]
    }
  },
  'rotate-image': {
    quickAnswer: {
      ar: "أداة تدوير الصور تتيح لك تعديل اتجاه الصور المقلوبة أو الجانبية بزوايا 90 أو 180 درجة وتعديل زاوية العرض مباشرة من المتصفح وبشكل مجاني.",
      en: "Rotate Image lets you correct the orientation of upside-down or sideways photos by 90 or 180 degrees directly in your browser for free.",
      zh: "图片旋转工具可让你直接在浏览器中免费将倒置或横向的照片方向修正 90 或 180 度。"
    },
    directDefinition: {
      ar: "أداة تدوير الصور هي أداة مجانية لتغيير زاوية اتجاه الصور.",
      en: "Rotate Image is a free tool for changing the orientation angle of images.",
      zh: "图片旋转工具是一款免费工具，用于更改图片的旋转角度。"
    },
    bestFor: {
      ar: ["المصممون", "المصورون لتعديل الاتجاه", "الطلاب", "الموظفون لتعديل المستندات المصورة الجانبية", "المستخدمون العاديون"],
      en: ["Designers", "Photographers fixing orientation", "Students", "Employees adjusting sideways document scans", "General users"],
      zh: ["设计师", "修复方向的摄影师", "学生", "调整横向文档扫描件的员工", "普通用户"]
    },
    aiSummary: {
      ar: "تساعد أداة تدوير الصور على تصحيح زاوية رؤية الصور واللقطات المأخوذة بشكل خاطئ لتظهر بشكل رأسي أو أفقي صحيح. عملية المعالجة محلية داخل المتصفح قدر الإمكان لحمايتك.",
      en: "Rotate Image helps correct the viewing angle of photos taken incorrectly, displaying them in the proper vertical or horizontal alignment. Processing is local for privacy protection.",
      zh: "图片旋转工具有助于纠正拍摄错误的图片视角，使其以正确的垂直或水平对齐方式显示。处理是本地进行的，以保护隐私。"
    },
    comparisonNote: {
      ar: "بدل فتح برامج تحرير صور ضخمة فقط من أجل تدوير بسيط، يمكنك عمل ذلك في ثوانٍ معدودة داخل متصفحك.",
      en: "Instead of opening heavy photo editor software for a simple rotation, do it in seconds inside your browser.",
      zh: "无需为了简单的旋转而打开重型照片编辑软件，只需几秒钟即可在浏览器中完成。"
    },
    trustSignals: {
      ar: ["مجانية وفورية", "بدون تسجيل", "تدوير بـ 90 أو 180 درجة", "معالجة محلية وسرية", "تدعم كافة الصيغ JPG وPNG وWebP"],
      en: ["Free and instant", "No sign-up", "Rotate by 90 or 180 degrees", "Secure local processing", "Supports all formats (JPG, PNG, WebP)"],
      zh: ["免费且即时", "无需注册", "旋转 90 或 180 度", "安全本地处理", "支持所有格式（JPG、PNG、WebP）"]
    },
    citationReadyFacts: {
      ar: [
        "تقوم أداة تدوير الصور بتعديل اتجاه الصورة ليكون متناسقاً ومريحاً للقراءة.",
        "تجري المعالجة محلياً بشكل سري وتام داخل متصفح المستخدم.",
        "أداة تدوير الصور مجانية ولا تضع أي أختام أو علامات مائية على المخرجات."
      ],
      en: [
        "Rotate Image adjusts the image orientation to be properly aligned and readable.",
        "The operation runs locally and confidentially inside the user's web browser.",
        "ToolNova Rotate Image is free and does not apply any stamps or watermarks."
      ],
      zh: [
        "图片旋转调整图片方向，使其正确对齐且易于阅读。",
        "该操作在用户网页浏览器本地保密运行。",
        "ToolNova 图片旋转免费，且不添加任何印章或水印。"
      ]
    }
  },
  'extract-images-from-pdf': {
    quickAnswer: {
      ar: "أداة استخراج الصور من PDF تتيح لك استخلاص وحفظ جميع الصور المضمنة والرسوم داخل ملف PDF بجودتها الأصلية وتنزيلها كملف واحد مباشرة من المتصفح.",
      en: "Extract Images from PDF lets you extract and save all embedded images from a PDF file in their original quality directly in your browser.",
      zh: "提取 PDF 图片工具可让你直接在浏览器中提取并以原始质量保存 PDF 文件中的所有嵌入图片。"
    },
    directDefinition: {
      ar: "أداة استخراج الصور من PDF هي أداة مجانية لفصل واستخلاص الصور والرسوميات من مستندات PDF.",
      en: "Extract Images from PDF is a free tool for separating and extracting images from PDF documents.",
      zh: "提取 PDF 图片工具是一款免费工具，用于从 PDF 文档中分离和提取图片。"
    },
    bestFor: {
      ar: ["المصممون الذين يقتبسون الصور", "الطلاب لجمع الرسوم البيانية", "الموظفون", "صناع المحتوى", "المحررون"],
      en: ["Designers sourcing images", "Students gathering charts", "Employees", "Content creators", "Editors"],
      zh: ["寻找图片素材的设计师", "收集图表的学生", "员工", "内容创作者", "编辑器"]
    },
    aiSummary: {
      ar: "تسهل أداة استخراج الصور من PDF حفظ الرسوم البيانية والصور التوضيحية المضمنة في المستندات بجودتها الأصلية لتعديلها. تتم المعالجة محلياً للحفاظ على سرية مستنداتك.",
      en: "Extract Images from PDF simplifies harvesting charts and diagrams from documents in their native quality. Processing is local to ensure document confidentiality.",
      zh: "提取 PDF 图片工具简化了从文档中以其原始质量收集图表和插图的过程。处理是本地进行的，以确保文档的机密性。"
    },
    comparisonNote: {
      ar: "بدل أخذ لقطات شاشة ذات جودة منخفضة لصور الملف، يمكنك استخراج الصور الحقيقية بجودتها الكاملة والأصلية من المتصفح مجاناً.",
      en: "Instead of taking low-quality screenshots of file images, extract the actual assets in full original quality from your browser for free.",
      zh: "无需对文件图片进行低质量的截图，即可直接在浏览器中免费提取具有完整原始质量的实际素材。"
    },
    trustSignals: {
      ar: ["مجانية بالكامل", "بدون تسجيل دخول", "استخراج بالجودة الأصلية للملف", "معالجة داخل المتصفح قدر الإمكان", "حفظ الصور كملفات منفصلة"],
      en: ["Completely Free", "No sign-up required", "Extracts in original native quality", "Processes inside the browser whenever possible", "Saves images as individual files"],
      zh: ["完全免费", "无需注册", "以原始原生质量提取", "尽可能在浏览器中处理", "将图片保存为单独文件"]
    },
    citationReadyFacts: {
      ar: [
        "تستخلص أداة استخراج الصور الرسوم التوضيحية من ملفات PDF بدقة متناهية.",
        "تتم عملية الاستخراج محلياً داخل المتصفح لضمان أمن الخصوصية.",
        "يمكن تحميل جميع الصور المستخرجة دفعة واحدة كملف مضغوط."
      ],
      en: [
        "The extraction tool harvests illustrations from PDF files with ultimate accuracy.",
        "Extraction is processed locally inside the browser to guarantee privacy safety.",
        "All extracted images can be downloaded together in a single zip file."
      ],
      zh: [
        "该提取工具以极高的准确度从 PDF 文件中收集插图。",
        "提取在浏览器本地安全处理，以保证隐私安全。",
        "所有提取的图片可以打包为一个压缩包一次性下载。"
      ]
    }
  },
  'qr-link': {
    quickAnswer: {
      ar: "أداة إنشاء رمز QR للروابط تساعدك على تحويل أي عنوان URL لموقع أو صفحة هبوط إلى رمز استجابة سريعة قابل للمسح مباشرة وتنزيله بجودة فائقة من المتصفح.",
      en: "QR Code Generator for Links converts any website URL or landing page into a scannable QR code instantly, allowing high-quality downloads from your browser.",
      zh: "链接二维码生成器可立即将任何网站 URL 或落地页转换为可扫描的二维码，并支持从浏览器进行高质量下载。"
    },
    directDefinition: {
      ar: "أداة إنشاء QR للروابط هي أداة مجانية لتوليد رموز الاستجابة السريعة لعناوين الويب.",
      en: "QR Code Generator for Links is a free tool for generating QR codes for web addresses.",
      zh: "链接二维码生成器是一款免费工具，用于为网页地址生成二维码。"
    },
    bestFor: {
      ar: ["أصحاب الأعمال لنشر مواقعهم", "المسوقون", "أصحاب المتاجر لروابط المنتجات", "منظمو الفعاليات", "المستخدمون العاديون"],
      en: ["Business owners promoting sites", "Marketers", "Store owners for product links", "Event organizers", "General users"],
      zh: ["推广网站的企业主", "营销人员", "用于商品链接的店主", "活动策划者", "普通用户"]
    },
    aiSummary: {
      ar: "تتيح أداة إنشاء QR للروابط تحويل العناوين الرقمية الطويلة إلى رمز مسح فيزيائي مطبوع أو رقمي يسهل الوصول إليه بكاميرا الهاتف. تتميز بالتوليد الفوري والمحلي آمن البيانات.",
      en: "QR Code Generator for Links allows converting long digital links into physical or digital codes that are easy to access via mobile cameras. It features instant and secure generation.",
      zh: "链接二维码生成器允许将长数字链接转换为易于通过手机摄像头访问的物理或数字代码。它具有即时且安全生成的特点。"
    },
    comparisonNote: {
      ar: "بدل الاشتراك في خدمات توليد QR المدفوعة والتي تنتهي صلاحية روابطها، قم بإنشاء رمز QR مجاني ودائم ومباشر.",
      en: "Instead of subscribing to paid QR generators with expiring links, create a free, permanent, and direct QR code.",
      zh: "无需订阅带有过期链接的付费二维码生成器，即可创建一个免费、永久且直连的二维码。"
    },
    trustSignals: {
      ar: ["مجانية 100%", "رموز دائمة ولا تنتهي صلاحيتها", "بدون تسجيل", "تحميل بصيغة تفاعلية", "توليد فوري ومحلي"],
      en: ["100% Free", "Permanent codes that never expire", "No sign-up required", "Interactive format downloads", "Instant local generation"],
      zh: ["100% 免费", "永久有效且永不过期的二维码", "无需注册", "交互式格式下载", "即时本地生成"]
    },
    citationReadyFacts: {
      ar: [
        "تنتج الأداة رموز QR دائمة لا تتطلب أي توجيه أو خوادم وسيطة.",
        "يتم توليد رمز QR محلياً داخل المتصفح فور إدخال الرابط.",
        "أداة إنشاء QR للروابط من ToolNova مجانية تماماً وبدون أي إعلانات منبثقة."
      ],
      en: [
        "The tool creates permanent QR codes that don't require any redirection or middle servers.",
        "The QR code is generated locally in the browser immediately after entering the link.",
        "ToolNova Link QR Generator is completely free and contains no pop-up ads."
      ],
      zh: [
        "该工具创建永久二维码，不需要任何重定向或中间服务器。",
        "输入链接后，二维码会立即在浏览器本地生成。",
        "ToolNova 链接二维码生成器完全免费，且不含弹出式广告。"
      ]
    }
  },
  'qr-text': {
    quickAnswer: {
      ar: "أداة إنشاء رمز QR للنصوص تتيح لك تحويل أي رسالة، ملاحظة، أو نص عادي إلى رمز استجابة سريعة قابل للمسح مباشرة مجاناً ومحلياً من المتصفح.",
      en: "QR Code Generator for Text lets you convert any message, note, or plain text into a scannable QR code instantly for free and locally inside the browser.",
      zh: "文本二维码生成器可让你在浏览器中免费且本地化地立即将任何消息、便签或纯文本转换为可扫描的二维码。"
    },
    directDefinition: {
      ar: "أداة إنشاء QR للنصوص هي أداة مجانية لتوليد رموز استجابة سريعة تحتوي على نصوص ثابتة.",
      en: "QR Code Generator for Text is a free tool for creating QR codes embedded with static text.",
      zh: "文本二维码生成器是一款免费工具，用于创建嵌入静态文本的二维码。"
    },
    bestFor: {
      ar: ["المعلمون لتوزيع الملاحظات", "المنظمون لمشاركة التفاصيل", "الطلاب", "المسوقون لمشاركات النصوص المطبوعة", "المستخدمون العاديون"],
      en: ["Teachers sharing study notes", "Organizers sharing details", "Students", "Marketers sharing text on print", "General users"],
      zh: ["分享学习笔记的教师", "分享细节的组织者", "学生", "分享印刷文本的营销人员", "普通用户"]
    },
    aiSummary: {
      ar: "تساعد أداة إنشاء QR للنصوص في تحويل العبارات والملاحظات المكتوبة إلى رمز مرئي يمكن مسحه ضوئياً لإظهار النص كاملاً على شاشة الجوال. يتم توليد الرمز محلياً وآمن تماماً.",
      en: "QR Code Generator for Text helps convert phrases and notes into a visual code that can be scanned to show the full text on a mobile screen. Generated locally and securely.",
      zh: "文本二维码生成器有助于将短语和便签转换为视觉代码，扫描该代码即可在手机屏幕上显示完整文本。本地且安全地生成。"
    },
    comparisonNote: {
      ar: "بدل كتابة نصوص طويلة ونقلها يدوياً للجوال، حوّلها لرمز QR تفاعلي وامسحه فوراً في ثوانٍ.",
      en: "Instead of writing out long texts to type on a phone, convert them to an interactive QR code and scan instantly.",
      zh: "无需为了在手机上输入而写下长篇文本，只需将其转换为交互式二维码并即时扫描即可。"
    },
    trustSignals: {
      ar: ["مجانية", "بدون تسجيل", "دعم كامل للغة العربية", "توليد فوري ومحلي", "تحميل بصيغة SVG/PNG عالية الجودة"],
      en: ["Free", "No sign-up", "Full multilingual support", "Instant local generation", "High-quality SVG/PNG downloads"],
      zh: ["免费", "无需注册", "完全支持多语言", "即时本地生成", "高质量 SVG/PNG 下载"]
    },
    citationReadyFacts: {
      ar: [
        "تحول أداة QR للنصوص الحروف والكلمات لرمز مرئي يقرأه الهاتف دون إنترنت.",
        "تتم عملية توليد الرمز محلياً بالكامل لحماية خصوصية بياناتك المدخلة.",
        "الرموز المتولدة دائمة مدى الحياة ولا تحتاج لاتصال خادم وسيط."
      ],
      en: [
        "Text QR converts characters and words into a visual code readable offline by mobile phones.",
        "The generation process runs completely locally to protect your input privacy.",
        "The generated codes are permanent and do not rely on middle-server connections."
      ],
      zh: [
        "文本二维码将字符和单词转换为二维码，手机在离线状态下也可读取该二维码。",
        "生成过程完全在本地运行，以保护你的输入隐私。",
        "生成的二维码永久有效，不依赖中间服务器连接。"
      ]
    }
  },
  'qr-whatsapp': {
    quickAnswer: {
      ar: "أداة إنشاء رمز QR للواتساب تسهل على عملائك مراسلتك على واتساب فوراً بمسح الرمز دون الحاجة لحفظ رقمك على هاتفهم، وتعمل محلياً من المتصفح.",
      en: "WhatsApp QR Code Generator makes it easy for clients to chat with you instantly by scanning a code without saving your number, working locally in your browser.",
      zh: "WhatsApp 二维码生成器让客户只需扫描二维码即可立即与你聊天，无需保存你的号码，可在浏览器中本地运行。"
    },
    directDefinition: {
      ar: "أداة إنشاء QR للواتساب هي أداة مجانية لتوليد رموز استجابة سريعة تفتح محادثة واتساب مباشرة برقم محدد.",
      en: "WhatsApp QR Code Generator is a free tool for creating QR codes that open a direct WhatsApp chat with a specific number.",
      zh: "WhatsApp 二维码生成器是一款免费工具，用于创建可直接与特定号码开启 WhatsApp 聊天的二维码。"
    },
    bestFor: {
      ar: ["أصحاب الأعمال لخدمة العملاء", "المتاجر الإلكترونية", "المسوقون", "المطاعم لتلقي الطلبات", "المستقلون"],
      en: ["Business owners for customer service", "E-commerce stores", "Marketers", "Restaurants for orders", "Freelancers"],
      zh: ["用于客户服务的企业主", "电子商务商店", "营销人员", "用于订餐的餐馆", "自由职业者"]
    },
    aiSummary: {
      ar: "تتيح أداة إنشاء QR للواتساب إمكانية تحويل رقم الهاتف مع رسالة ترحيبية جاهزة لرمز استجابة سريع ومباشر. هذا يقلل من العقبات أمام العملاء لمراسلتك. التوليد محلي وآمن.",
      en: "WhatsApp QR Generator allows converting a phone number and welcome message into a direct scannable code. This reduces hurdles for customer communication. Generation is local.",
      zh: "WhatsApp 二维码生成器允许将电话号码和欢迎消息转换为直连的可扫描二维码。这减少了客户沟通的障碍。生成是本地完成的。"
    },
    comparisonNote: {
      ar: "بدل جعل العملاء ينقلون رقم هاتفك ويحفظونه في سجل الأسماء لمراسلتك، دعهم يمسحون الرمز ويتواصلون فوراً.",
      en: "Instead of forcing customers to type and save your phone number to message you, let them scan and chat instantly.",
      zh: "无需强迫客户输入并保存你的电话号码才能给你发送消息，只需让他们扫描即可即时聊天。"
    },
    trustSignals: {
      ar: ["مجانية بالكامل", "بدون تسجيل", "دعم للرسائل المحددة مسبقاً", "توليد فوري ومحلي آمن", "متوافقة مع أجهزة آيفون وأندرويد"],
      en: ["Completely Free", "No sign-up", "Pre-set messages support", "Secure instant local generation", "Compatible with iOS and Android"],
      zh: ["完全免费", "无需注册", "支持预设消息", "安全即时本地生成", "兼容 iOS 和 Android"]
    },
    citationReadyFacts: {
      ar: [
        "تولد الأداة رابط محادثة واتساب مباشر وتخفيه في رمز QR للمسح.",
        "لا يتم تخزين رقم هاتفك أو رسائلك على أي خوادم خارجية؛ العملية محلية بالكامل.",
        "تساعد الأداة في زيادة التواصل مع العملاء بنسب قياسية لسهولة استخدامها."
      ],
      en: [
        "The tool generates a direct WhatsApp link and embeds it inside a scannable QR code.",
        "Your phone number and messages are not stored on external servers; the process is fully local.",
        "The tool significantly boosts customer engagement due to its seamless, easy interface."
      ],
      zh: [
        "该工具生成直连 WhatsApp 链接并将其嵌入可扫描的二维码中。",
        "你的电话号码和消息不存储在外部服务器上；该过程完全在本地完成。",
        "由于其无缝且简单的界面，该工具显著提升了客户互动。"
      ]
    }
  },
  'qr-wifi': {
    quickAnswer: {
      ar: "أداة إنشاء رمز QR لشبكات الواي فاي تساعدك على مشاركة إنترنت منزلك أو مقهاك بمسح الرمز ضوئياً للاتصال بالشبكة دون كتابة كلمة المرور يدوياً.",
      en: "Wi-Fi QR Code Generator helps you share your home or cafe internet by scanning a code to connect to the network without typing the password manually.",
      zh: "Wi-Fi 二维码生成器可帮助你通过扫描二维码分享家庭或咖啡馆的网络来连接，无需手动输入密码。"
    },
    directDefinition: {
      ar: "أداة إنشاء QR للواي فاي هي أداة مجانية لتوليد رموز استجابة سريعة للاتصال التلقائي بشبكة Wi-Fi.",
      en: "Wi-Fi QR Code Generator is a free tool for generating QR codes that automatically connect devices to a Wi-Fi network.",
      zh: "Wi-Fi 二维码生成器是一款免费工具，用于生成可使设备自动连接到 Wi-Fi 网络的二维码。"
    },
    bestFor: {
      ar: ["أصحاب المنازل لمشاركة الإنترنت للضيوف", "أصحاب المقاهي والمطاعم", "الفنادق", "المكاتب والشركات", "المستخدمون العاديون"],
      en: ["Homeowners sharing Wi-Fi with guests", "Cafe and restaurant owners", "Hotels", "Offices and businesses", "General users"],
      zh: ["与访客分享 Wi-Fi 的房屋所有者", "咖啡馆和餐馆老板", "酒店", "办公室和企业", "普通用户"]
    },
    aiSummary: {
      ar: "تسمح أداة إنشاء QR للواي فاي بتشفير اسم الشبكة وكلمة المرور ونوع الحماية في رمز مرئي واحد لتبسيط عملية الاتصال بالهاتف. عملية التوليد محلية وآمنة وتمنع تسريب البيانات.",
      en: "Wi-Fi QR Generator allows encrypting the network SSID, password, and security type into a single visual code to simplify mobile connections. Generation is local and safe.",
      zh: "Wi-Fi 二维码生成器允许将网络 SSID、密码和安全类型加密为单个视觉代码，以简化手机连接。生成是在本地安全完成的。"
    },
    comparisonNote: {
      ar: "بدل إملاء كلمات المرور الطويلة والمعقدة على ضيوفك عدة مرات، دعهم يمسحون الرمز المطبوع ويتصلون فوراً.",
      en: "Instead of dictating long and complex Wi-Fi passwords to your guests repeatedly, let them scan a printed code and connect instantly.",
      zh: "无需向访客重复念出长而复杂的 Wi-Fi 密码，只需让他们扫描打印的二维码即可即时连接。"
    },
    trustSignals: {
      ar: ["مجانية وسريعة", "بدون تسجيل", "دعم تشفير WPA/WPA2/WEP", "توليد فوري ومحلي آمن", "متوافقة مع كاميرات الهواتف الذكية الحديثة"],
      en: ["Free and fast", "No sign-up", "WPA/WPA2/WEP encryption support", "Secure instant local generation", "Compatible with modern smartphone cameras"],
      zh: ["免费且快速", "无需注册", "支持 WPA/WPA2/WEP 加密", "安全即时本地生成", "兼容现代智能手机摄像头"]
    },
    citationReadyFacts: {
      ar: [
        "تدمج الأداة تفاصيل الاتصال بشبكة الواي فاي في رمز استجابة سريع.",
        "تتم معالجة وتوليد الرمز محلياً بالكامل داخل متصفحك لسرية بيانات الشبكة.",
        "تدعم الأداة الاتصال التلقائي لمعظم هواتف أندرويد وآيفون الحديثة."
      ],
      en: [
        "The tool integrates Wi-Fi connection details into a quick response code.",
        "The code is processed and generated entirely locally in the browser to ensure network security.",
        "The tool supports automatic connection for most modern Android and iOS devices."
      ],
      zh: [
        "该工具将 Wi-Fi 连接详细信息整合到二维码中。",
        "二维码完全在浏览器本地处理和生成，以确保网络安全。",
        "该工具支持大多数现代 Android 和 iOS 设备的自动连接。"
      ]
    }
  },
  'barcode-generator': {
    quickAnswer: {
      ar: "أداة توليد الباركود تتيح لك إنشاء ملصقات باركود قياسية لمختلف المنتجات والطرود بصيغ كود متعددة وتنزيلها بجودة طباعة عالية مباشرة من المتصفح.",
      en: "Barcode Generator lets you create standard barcode labels for products and packages in multiple formats and download them in print-ready quality directly in your browser.",
      zh: "条形码生成器可让你直接在浏览器中为产品和包裹创建多种格式的标准条形码标签，并以适合打印的高质量下载。"
    },
    directDefinition: {
      ar: "أداة توليد الباركود هي أداة مجانية لإنشاء رموز باركود خطية لمستنداتك ومنتجاتك.",
      en: "Barcode Generator is a free tool for generating linear barcode labels for your products and documents.",
      zh: "条形码生成器是一款免费工具，用于为你的产品和文档生成线性条形码标签。"
    },
    bestFor: {
      ar: ["أصحاب المستودعات والمخازن", "مشاريع التجارة التجزئة", "الطلاب", "الموظفون لتنظيم الطرود", "أصحاب الأعمال الصغيرة"],
      en: ["Warehouse and storage managers", "Retail store businesses", "Students", "Employees organizing packages", "Small business owners"],
      zh: ["仓库和仓储管理员", "零售店业务", "学生", "整理包裹的员工", "小企业主"]
    },
    aiSummary: {
      ar: "تساعد أداة توليد الباركود على رقمنة وتنظيم المنتجات من خلال تحويل الأرقام والنصوص الرمزية إلى شفرات باركود خطية سهلة القراءة بالماسحات الضوئية. تتميز بالتوليد الفوري والمحلي.",
      en: "Barcode Generator helps digitize and organize products by converting numbers and text codes into linear barcode images easily read by scanners. It features instant local generation.",
      zh: "条形码生成器通过将数字和文本代码转换为易于被扫描枪读取的线性条形码图片，有助于将产品数字化和组织化。它具有即时本地生成的特点。"
    },
    comparisonNote: {
      ar: "بدل الاعتماد على برمجيات كاشير أو مخازن معقدة ومكلفة لتوليد الباركود، قم بتوليده فوراً ومجاناً من متصفحك.",
      en: "Instead of relying on expensive cash register or inventory software to generate barcodes, make them instantly in your browser.",
      zh: "无需依赖昂贵的收银系统或库存软件来生成条形码，即可在浏览器中即时制作。"
    },
    trustSignals: {
      ar: ["مجانية تماماً", "بدون تسجيل", "دعم صيغة Code 128 الشائعة", "تنزيل بدقة عالية ومناسبة للطباعة", "توليد فوري ومحلي"],
      en: ["100% Free", "No sign-up", "Supports common Code 128 format", "High-resolution print-ready downloads", "Instant local generation"],
      zh: ["100% 免费", "无需注册", "支持常见的 Code 128 格式", "高分辨率打印就绪下载", "即时本地生成"]
    },
    citationReadyFacts: {
      ar: [
        "تولد الأداة رموز باركود متوافقة مع ماسحات الباركود القياسية والكاميرات.",
        "تتم عملية التوليد محلياً بالكامل داخل المتصفح لسرية وحماية بياناتك.",
        "لا تتطلب الأداة أي اشتراك أو تثبيت برامج وتطبيقات خارجية."
      ],
      en: [
        "The tool creates barcodes compatible with standard scanners and cameras.",
        "The generation is fully local in the browser to protect your data privacy.",
        "The tool requires no subscription or third-party software installation."
      ],
      zh: [
        "该工具创建与标准扫描枪和摄像头兼容的条形码。",
        "生成完全在浏览器本地完成，以保护你的数据隐私。",
        "该工具无需订阅或安装第三方软件。"
      ]
    }
  },
  'password-generator': {
    quickAnswer: {
      ar: "أداة توليد كلمات المرور تنشئ لك كلمات سر قوية للغاية، عشوائية بالكامل، وغير قابلة للتخمين لحماية حساباتك وأمنك الرقمي مباشرة من المتصفح.",
      en: "Password Generator creates highly secure, completely random, and unguessable passwords to protect your accounts and digital security directly in your browser.",
      zh: "密码生成器可直接在浏览器中创建高度安全、完全随机且无法猜测的密码，以保护你的账户和数字安全。"
    },
    directDefinition: {
      ar: "أداة توليد كلمات المرور هي أداة مجانية لتوليد كلمات سر عشوائية ومعقدة لحماية الخصوصية.",
      en: "Password Generator is a free tool for generating complex random passwords to secure your privacy.",
      zh: "密码生成器是一款免费工具，用于生成复杂的随机密码以保障你的隐私。"
    },
    bestFor: {
      ar: ["جميع مستخدمي الإنترنت", "مسؤولو الأنظمة والشبكات", "الموظفون", "الطلاب لحماية حساباتهم الجديدة", "رواد الأعمال"],
      en: ["All internet users", "System and network administrators", "Employees", "Students securing new accounts", "Entrepreneurs"],
      zh: ["所有互联网用户", "系统和网络管理员", "员工", "保护新账户的学生", "企业家"]
    },
    aiSummary: {
      ar: "تتيح أداة توليد كلمات المرور حماية الحسابات من هجمات الاختراق والتخمين العشوائي عبر توفير معايير توليد صارمة تشمل الرموز والأرقام والحروف. تتم المعالجة محلياً بالكامل آمنة الخصوصية.",
      en: "Password Generator helps protect accounts from brute-force attacks by offering strict rules like symbols, numbers, and case mix. Processing is fully local and secure.",
      zh: "密码生成器通过提供包含符号、数字和大小写混合的严格规则，有助于保护账户免受暴力破解攻击。处理完全在本地且安全地进行。"
    },
    comparisonNote: {
      ar: "بدل التفكير طويلاً في كلمة سر وتكرار كلماتك القديمة والسهلة، دع الأداة تصنع لك كلمة مرور احترافية ومقاومة للاختراق فوراً.",
      en: "Instead of racking your brain or reusing old, weak passwords, let the tool generate a professional, unhackable password instantly.",
      zh: "无需绞尽脑汁或重复使用旧的弱密码，让该工具立即为你生成专业的防黑客密码。"
    },
    trustSignals: {
      ar: ["مجانية بالكامل", "بدون تسجيل", "عشوائية حقيقية 100%", "توليد محلي يمنع تسريب كلمة المرور للخارج", "إمكانية النسخ بضغطة زر"],
      en: ["Completely Free", "No sign-up", "100% true randomness", "Local generation preventing leaks to servers", "One-click copy to clipboard"],
      zh: ["完全免费", "无需注册", "100% 真正的随机性", "本地生成可防止泄露到服务器", "一键复制到剪贴板"]
    },
    citationReadyFacts: {
      ar: [
        "تنتج الأداة كلمات مرور قوية تشمل رموزاً وأرقاماً وحروفاً متنوعة.",
        "تجري عملية التوليد بشكل محلي وآمن تماماً دون إرسال كلمات السر للشبكة.",
        "أداة توليد كلمات المرور من ToolNova سهلة للغاية وتمنع تكرار الرموز المتوقعة."
      ],
      en: [
        "The tool creates strong passwords including mixed symbols, numbers, and letters.",
        "The generation occurs locally and safely without sending passwords over the internet.",
        "ToolNova Password Generator is exceptionally easy to use and avoids predictable sequences."
      ],
      zh: [
        "该工具创建强密码，包括混合符号、数字和字母。",
        "生成在本地安全进行，无需通过互联网发送密码。",
        "ToolNova 密码生成器异常易于使用，且避免了可预测的序列。"
      ]
    }
  },
  'word-counter': {
    quickAnswer: {
      ar: "أداة عد الكلمات تمكنك من حساب عدد الكلمات، الأحرف، الفقرات، والأسطر في نصوصك بدقة متناهية وفوراً أونلاين ومباشرة من المتصفح.",
      en: "Word Counter enables you to calculate the count of words, characters, paragraphs, and lines in your text with absolute accuracy instantly in your browser.",
      zh: "字数计数器可让你在浏览器中立即以绝对准确度计算文本中的字数、字符数、段落数和行数。"
    },
    directDefinition: {
      ar: "أداة عد الكلمات هي أداة مجانية لحساب أعداد الكلمات والحروف في النصوص بدقة وسرعة.",
      en: "Word Counter is a free tool for accurately and quickly counting words and characters in text.",
      zh: "字数计数器是一款免费工具，用于准确、快速地计算文本中的字数和字符数。"
    },
    bestFor: {
      ar: ["الكتاب والمؤلفون", "الطلاب لكتابة الأبحاث بأطوال معينة", "المترجمون", "صناع المحتوى لوسائل التواصل", "المدونون"],
      en: ["Writers and authors", "Students writing research papers with limits", "Translators", "Social media content creators", "Bloggers"],
      zh: ["作家和作者", "撰写有字数限制的研究论文的学生", "翻译人员", "社交媒体内容创作者", "博主"]
    },
    aiSummary: {
      ar: "تساعد أداة عد الكلمات في ضبط أطوال النصوص والتقارير لتطابق الشروط المطلوبة للمجلات الأكاديمية أو منصات النشر الرقمي. تجري عملية التحليل محلياً وسرياً بالكامل.",
      en: "Word Counter helps adjust texts and reports to match submission limits of academic journals or digital publishing platforms. Analysis is fully local and confidential.",
      zh: "字数计数器有助于调整文本和报告，以匹配学术期刊或数字出版平台的投稿限制。分析完全在本地且保密进行。"
    },
    comparisonNote: {
      ar: "بدل فتح برامج مكتبية ثقيلة مثل وورد فقط لمعرفة طول النص، احسب عدد الكلمات فوراً من المتصفح مجاناً.",
      en: "Instead of opening heavy office programs like Word just to check text length, count words instantly in your browser for free.",
      zh: "无需为了检查文本长度而打开重型办公程序（如 Word），即可在浏览器中免费即时计算字数。"
    },
    trustSignals: {
      ar: ["مجانية وفورية", "بدون تسجيل", "دعم كامل للغة العربية والإنجليزية", "إحصاء الحروف والفقرات والأسطر", "معالجة محلية 100%"],
      en: ["Free and instant", "No sign-up", "Full support for Arabic and English text", "Counts characters, paragraphs, and lines", "100% local processing"],
      zh: ["免费且即时", "无需注册", "完全支持中文和英文文本", "计算字符数、段落数和行数", "100% 本地处理"]
    },
    citationReadyFacts: {
      ar: [
        "تقوم الأداة بحساب الكلمات والحروف بدقة شديدة فور لصق أو كتابة النص.",
        "تجري المعالجة محلياً داخل المتصفح ولا يتم حفظ نصوصك أو رفعها.",
        "أداة عد الكلمات من ToolNova تدعم النصوص الطويلة واللغات المتعددة بشكل كامل."
      ],
      en: [
        "The tool counts words and characters with ultimate accuracy as you paste or type.",
        "Processing is done locally in the browser; your text is never saved or uploaded.",
        "ToolNova Word Counter fully supports long texts and multiple languages."
      ],
      zh: [
        "当你在粘贴或输入时，该工具会以极高的准确度计算字数和字符数。",
        "处理在浏览器本地完成；你的文本绝不会被保存或上传。",
        "ToolNova 字数计数器完全支持长文本和多种语言。"
      ]
    }
  },
  'base64-converter': {
    quickAnswer: {
      ar: "أداة تحويل وفك تشفير Base64 تساعدك على تحويل النصوص العادية إلى ترميز Base64 وفك تشفيرها فوراً وبأمان كامل مباشرة من المتصفح.",
      en: "Base64 Encoder/Decoder helps you convert plain text to Base64 encoding and decode it back instantly and safely directly in your browser.",
      zh: "Base64 编码/解码器可帮助你在浏览器中直接即时且安全地将纯文本转换为 Base64 编码并进行反向解码。"
    },
    directDefinition: {
      ar: "أداة ترميز Base64 هي أداة مجانية للتحويل بين النصوص العادية وترميز Base64 الرقمي.",
      en: "Base64 Converter is a free tool for converting between plain text and Base64 digital encoding.",
      zh: "Base64 转换器是一款免费工具，用于在纯文本和 Base64 数字编码之间进行转换。"
    },
    bestFor: {
      ar: ["المطورون ومبرمجو الويب", "مهندسو الشبكات", "خبراء الأمن الرقمي", "الطلاب", "محللو البيانات"],
      en: ["Web developers and programmers", "Network engineers", "Cybersecurity experts", "Students", "Data analysts"],
      zh: ["网页开发人员和程序员", "网络工程师", "网络安全专家", "学生", "数据分析师"]
    },
    aiSummary: {
      ar: "تتيح أداة تحويل وفك تشفير Base64 نقل وتخزين البيانات النصية والرموز بأمان وتوافق كامل مع خوادم الويب والشبكات. المعالجة محلية داخل المتصفح لضمان أقصى سرية.",
      en: "Base64 Converter allows safe transfer and storage of textual data and codes with full compatibility across web servers and networks. Processing is local to ensure privacy.",
      zh: "Base64 转换器允许安全地传输和存储文本数据和代码，并在网页服务器和网络中实现完全的兼容性。处理是本地进行的，以确保隐私。"
    },
    comparisonNote: {
      ar: "بدل استخدام أدوات سطر الأوامر المعقدة أو المواقع المشبوهة، قم بالترميز وفك الترميز محلياً في متصفحك مجاناً وبكل ثقة.",
      en: "Instead of using complex command-line tools or untrusted sites, encode and decode locally in your browser for free and confidently.",
      zh: "无需使用复杂的命令行工具或不可信的网站，即可直接在浏览器中免费且放心地进行本地编码和解码。"
    },
    trustSignals: {
      ar: ["مجانية بالكامل", "بدون تسجيل", "ترميز وفك ترميز فوري وسهل", "معالجة محلية وسرية تماماً", "تمنع إرسال بياناتك للخارج"],
      en: ["Completely Free", "No sign-up required", "Instant and easy encoding/decoding", "Secure local processing", "Prevents sending your data to servers"],
      zh: ["完全免费", "无需注册", "即时且简单的编码/解码", "安全本地处理", "防止将你的数据发送到服务器"]
    },
    citationReadyFacts: {
      ar: [
        "تجري أداة Base64 عمليات الترميز وفكها بدقة مطابقة للمقاييس البرمجية العالمية.",
        "تتم عملية التحويل محلياً بالكامل داخل المتصفح لحماية كلمات سرك ونصوصك.",
        "أداة تحويل Base64 مجانية ولا تضع أي قيود على أطوال النصوص المدخلة."
      ],
      en: [
        "The Base64 tool performs encoding and decoding in strict compliance with global standards.",
        "The conversion process runs entirely locally in the browser to protect your texts and secrets.",
        "ToolNova Base64 Converter is free and imposes no limits on input text length."
      ],
      zh: [
        "Base64 工具严格按照全球标准进行编码和解码。",
        "转换过程完全在浏览器本地运行，以保护你的文本和机密。",
        "ToolNova Base64 转换器免费，且对输入文本长度没有任何限制。"
      ]
    }
  },
  'url-encoder-decoder': {
    quickAnswer: {
      ar: "أداة ترميز وفك ترميز URL تساعدك على معالجة روابط الويب وتحويل الرموز الخاصة لتكون متوافقة وآمنة للقراءة من متصفحات الويب مباشرة من المتصفح.",
      en: "URL Encoder/Decoder helps you process web links and convert special characters to be safe and compatible with web browsers directly in your browser.",
      zh: "URL 编码/解码器可帮助你处理网页链接并将特殊字符转换为直接在浏览器中与网页浏览器安全且兼容的格式。"
    },
    directDefinition: {
      ar: "أداة ترميز URL هي أداة مجانية لتحويل الروابط والنصوص إلى صيغة URL الصالحة للإنترنت وفكها.",
      en: "URL Encoder/Decoder is a free tool for converting links and text to internet-safe URL format and back.",
      zh: "URL 编码/解码器是一款免费工具，用于将链接和文本转换为互联网安全的 URL 格式以及反向转换。"
    },
    bestFor: {
      ar: ["مطورو الويب ومبرمجو المواقع", "أخصائيو تحسين محركات البحث SEO", "المدونون", "المسوقون الرقميون", "محللو البيانات"],
      en: ["Web developers and programmers", "SEO specialists", "Bloggers", "Digital marketers", "Data analysts"],
      zh: ["网页开发人员和程序员", "SEO 专家", "博主", "数字营销人员", "数据分析师"]
    },
    aiSummary: {
      ar: "تساعد أداة ترميز وفك ترميز URL في تصحيح مسارات الروابط التي تحتوي على حروف عربية أو رموز خاصة لتصبح صالحة للمشاركة دون كسر الرابط. تتم المعالجة محلياً بالكامل.",
      en: "URL Encoder/Decoder helps fix links containing special characters or non-Latin alphabets, rendering them safe for sharing without breaking. Processing is fully local.",
      zh: "URL 编码/解码器有助于修正包含特殊字符或非拉丁字母的链接，使其在分享时不会断开。处理完全是本地的。"
    },
    comparisonNote: {
      ar: "بدل تعديل الروابط يدوياً وكتابة شفرات النسب المئوية المعقدة، قم بالترميز وفك الترميز بضغطة زر مجاناً.",
      en: "Instead of manually editing links and typing percent-encoding codes, encode and decode in one click for free.",
      zh: "无需手动编辑链接并输入百分比编码代码，只需单击一下即可免费进行编码和解码。"
    },
    trustSignals: {
      ar: ["مجانية وسريعة", "بدون تسجيل دخول", "ترميز وفك ترميز فوري للروابط", "معالجة محلية تحمي سرية الروابط", "تدعم النصوص الطويلة"],
      en: ["Free and fast", "No sign-up required", "Instant link encoding/decoding", "Local processing protecting link privacy", "Supports long text URLs"],
      zh: ["免费且快速", "无需注册", "即时链接编码/解码", "保护链接隐私的本地处理", "支持长文本 URL"]
    },
    citationReadyFacts: {
      ar: [
        "تقوم الأداة بترميز وفك ترميز الرموز الخاصة مثل الفراغات وعلامات الاستفهام لترميز URL قياسي.",
        "تجري المعالجة محلياً بالكامل داخل المتصفح ولا يتم رفع أو فحص روابطك.",
        "أداة ترميز وفك ترميز URL من ToolNova مجانية تماماً وموثوقة."
      ],
      en: [
        "The tool encodes and decodes special characters like spaces and question marks into standard percent-encoding.",
        "Processing is done entirely locally in the browser; your links are never sent or scanned.",
        "ToolNova URL Encoder/Decoder is completely free and highly reliable."
      ],
      zh: [
        "该工具将空格和问号等特殊字符编码和解码为标准的百分比编码。",
        "处理完全在浏览器本地进行；你的链接绝不会被发送或扫描。",
        "ToolNova URL 编码/解码器完全免费且高度可靠。"
      ]
    }
  },
  'text-cleaner': {
    quickAnswer: {
      ar: "أداة تنظيف النصوص تساعدك على إزالة الفراغات الزائدة، الأسطر الفارغة، والرموز غير المرغوب فيها من نصوصك وتنسيقها بشكل مرتب مباشرة من المتصفح.",
      en: "Text Cleaner helps you remove extra spaces, empty lines, and unwanted characters from your text to format it neatly directly in your browser.",
      zh: "文本清洗工具可帮助你直接在浏览器中从文本中移除多余空格、空行和不需要的字符，从而进行整洁的格式化。"
    },
    directDefinition: {
      ar: "أداة تنظيف النصوص هي أداة مجانية لإزالة الزوائد وتنسيق النصوص البرمجية والعادية بسرعة.",
      en: "Text Cleaner is a free tool for removing redundancies and formatting plain or code texts quickly.",
      zh: "文本清洗工具是一款免费工具，用于快速移除冗余并格式化纯文本或代码文本。"
    },
    bestFor: {
      ar: ["الكتاب والمحررون", "المبرمجون لتنسيق الأكواد", "الطلاب لتنظيف النصوص المنسوخة", "المدونون", "صناع المحتوى"],
      en: ["Writers and editors", "Programmers formatting codes", "Students cleaning copied texts", "Bloggers", "Content creators"],
      zh: ["作家和编辑", "格式化代码的程序员", "清理复制文本的学生", "博主", "内容创作者"]
    },
    aiSummary: {
      ar: "تسهل أداة تنظيف النصوص إعداد المحتوى عن طريق إزالة الفراغات المتكررة وتعديل الفواصل والفقرات المزعجة الناتجة عن النسخ من ملفات PDF. تجري المعالجة محلياً وآمنة تماماً.",
      en: "Text Cleaner simplifies content preparation by removing redundant spaces and fixing annoying paragraph breaks caused by copying from PDFs. Processing is fully local and secure.",
      zh: "文本清洗工具通过移除多余空格并修正因从 PDF 复制而产生的烦人段落换行，简化了内容准备工作。处理完全在本地且安全地进行。"
    },
    comparisonNote: {
      ar: "بدل تعديل النصوص الطويلة يدوياً وحذف الفراغات حرفاً بحرف، نظّف نصك بالكامل في ثانية واحدة مجاناً.",
      en: "Instead of manually editing long texts and deleting spaces character by character, clean your entire text in one second for free.",
      zh: "无需手动编辑长文本并逐个字符地删除空格，只需一秒钟即可免费清理你的整个文本。"
    },
    trustSignals: {
      ar: ["مجانية وفورية", "بدون تسجيل", "إزالة الفراغات والأسطر الفارغة بضغطة زر", "معالجة محلية وسرية 100%", "تدعم النصوص الطويلة واللغات المختلفة"],
      en: ["Free and instant", "No sign-up", "Remove spaces and empty lines in one click", "100% secure local processing", "Supports long texts and multiple languages"],
      zh: ["免费且即时", "无需注册", "一键移除空格和空行", "100% 安全本地处理", "支持长文本和多种语言"]
    },
    citationReadyFacts: {
      ar: [
        "تنظف أداة النصوص الفراغات المتتالية وتدمج الأسطر بشكل منسق.",
        "تتم المعالجة بالكامل محلياً داخل متصفح المستخدم لضمان سرية النصوص الخاصة.",
        "أداة تنظيف النصوص مجانية بالكامل ومفتوحة الحدود للأطوال المختلفة."
      ],
      en: [
        "The text tool cleans consecutive spaces and merges lines into a cohesive format.",
        "Processing is done entirely locally in the user's browser to ensure text confidentiality.",
        "The text cleaner is completely free with no restrictions on text lengths."
      ],
      zh: [
        "文本工具清理连续的空格并将行合并为凝聚的格式。",
        "处理完全在用户浏览器本地完成，以确保文本机密性。",
        "文本清洗工具完全免费，对文本长度没有任何限制。"
      ]
    }
  }
};

export const geoData: Record<string, ToolGeo> = allGeoData;
