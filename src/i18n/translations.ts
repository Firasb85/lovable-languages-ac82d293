// Meridian Growth Advisory — translations.ts
// UPDATED v3: 4 real domain areas added/replacing domains.cards
// Real Estate Dev · Family Business · Distressed Projects · FMCG/Distribution
// All three languages: AR (refined), EN, KR

import type { Translations, Translation } from '@/types/types';

export function getTranslation(t: Translation, key: string): string {
  const parts = key.split('.');
  let current: Translation | string | string[] = t;
  for (const part of parts) {
    if (typeof current !== 'object' || current === null || Array.isArray(current)) return key;
    current = (current as Translation)[part];
    if (current === undefined) return key;
  }
  if (typeof current === 'string') return current;
  if (Array.isArray(current)) return current.join(', ');
  return key;
}

export const translations: Translations = {
  ar: {
    nav: {
      industries: 'القطاعات',
      expertise: 'نتائجنا',
      about: 'من أنا',
      cta: 'احجز جلسة مجانية',
    },
    hero: {
      eyebrow: 'مستشار تجاري تنفيذي — منطقة الشرق الأوسط وشمال أفريقيا',
      heading: 'شركتك لا تعاني من نقص الاستراتيجية — ',
      headingEm: 'بل من غياب التنفيذ.',
      subheading: 'قضيت 25 عاماً داخل هذه الأعمال — كمدير تجاري ورئيس للعمليات ومدير عام — قبل أن أتحول إلى الاستشارات. أعرف كيف يبدو نموذج التوزيع المكسور من داخل قائمة الأرباح والخسائر، وليس من شريحة عرض.',
      primaryCta: 'احجز جلسة استكشافية مجانية',
      secondaryCta: 'اكتشف ما يمكنني تحقيقه',
      stats: {
        years: 'عاماً من الخبرة التشغيلية',
        projects: 'مشروع تحويل ناجح',
        countries: 'دول في المنطقة',
      },
      achievements: {
        title: 'نتائج حقيقية موثقة',
        item1: 'نمو إيرادات بنسبة 25% في 6 أشهر على محفظة بقيمة 15 مليون دولار',
        item2: 'خفض التكاليف التشغيلية بنسبة 33% مع زيادة الطاقة الإنتاجية 50%',
        item3: 'تقليص معدل إلغاء الاشتراكات بنسبة 35% عبر التحليلات التنبؤية',
        item4: 'أسهمت في توجيه قرارات استثمارية بقيمة تزيد عن 40 مليون دولار',
      },
    },
    whyUs: {
      badge: 'لماذا تختارني',
      heading: 'الفرق الذي أصنعه',
      cards: {
        1: {
          stat: '25+ عاماً',
          title: 'خبرة تشغيلية حقيقية',
          desc: 'لم أكن يوماً مستشاراً خارجياً — كنت المدير التنفيذي الذي يملك الأرقام ويتحمل مسؤولية النتائج',
        },
        2: {
          stat: '15+ مشروع',
          title: 'نتائج قابلة للقياس',
          desc: 'نمو متوسط 35% في الإيرادات عبر مشاريع التحول التجاري — مع مؤشرات أداء واضحة لكل مشاركة',
        },
        3: {
          stat: '4 دول',
          title: 'معرفة محلية عميقة',
          desc: 'العراق وكردستان والكويت والخليج — خبرة ميدانية بُنيت على 25 عاماً لا يمكن لأي مستشار قادم من الخارج ادعاءها',
        },
      },
    },
    outcomes: {
      badge: 'ما ستحصل عليه',
      heading: 'النتائج التي أضمنها',
      subheading: 'لا تقارير تُحفظ في الأدراج. أعمل داخل مؤسستك حتى تتحقق النتيجة فعلياً.',
      items: {
        1: {
          result: 'إيرادات أعلى',
          proof: 'نمو 25% في 6 أشهر على محفظة 15 مليون دولار',
          how: 'أعيد هندسة استراتيجية المبيعات والتسعير وهياكل القنوات لوقف تسرب الإيرادات',
        },
        2: {
          result: 'تكاليف أقل',
          proof: 'خفض 33% للتكاليف مع زيادة الطاقة 50% في اتصالات شمال العراق',
          how: 'أعيد هيكلة شبكات التوزيع والعمليات للحصول على أقصى كفاءة دون المساس بالجودة',
        },
        3: {
          result: 'احتفاظ أفضل بالعملاء',
          proof: 'تقليص معدل الإلغاء 35% عبر نماذج شجرة القرار والتحليلات التنبؤية',
          how: 'أبني أنظمة CRM وبرامج احتفاظ مدعومة بالبيانات تحوّل التسرب إلى ولاء',
        },
        4: {
          result: 'دخول سوق ناجح',
          proof: 'قدت 8 برامج دخول سوق ناجحة عبر 4 دول في المنطقة',
          how: 'أبني نماذج توزيع وتسعير محققة الجدوى قبل أن تستثمر دولاراً واحداً',
        },
      },
    },
    proof: {
      badge: 'نتائج موثقة',
      heading: 'أرقام حقيقية من مشاريع حقيقية',
      items: {
        1: { number: '$15M+', label: 'محفظة P&L يملكها ويديرها', context: 'تشكنت للاتصالات، شمال العراق' },
        2: { number: '25%', label: 'نمو في الإيرادات خلال 6 أشهر', context: 'إعادة هيكلة استراتيجية المبيعات والتسعير' },
        3: { number: '35%', label: 'تقليص معدل الإلغاء', context: 'عبر التحليلات التنبؤية ونمذجة شجرة القرار' },
        4: { number: '50%', label: 'زيادة الطاقة الإنتاجية', context: 'مع تخفيض التكاليف التشغيلية 33% في آنٍ واحد' },
        5: { number: '$5M+', label: 'أعمال جديدة تم تأمينها', context: 'مجموعة SITI — تداول وتوزيع وعقارات' },
        6: { number: '$40M+', label: 'قرار استثماري تم توجيهه', context: 'دراسة جدوى مصنع حلويات — تحليل منافسين وتسعير ومواصفات' },
      },
    },
    industries: {
      label: 'القطاعات',
      heading: 'المجالات التي أعمل فيها',
      cards: {
        realestate: {
          name: 'التطوير العقاري',
          description: 'من دراسة جدوى المشروع قبل البدء إلى إصلاح ضعف المبيعات بعد التنفيذ',
        },
        fmcg: {
          name: 'التوزيع والسلع الاستهلاكية',
          description: 'ضعف المبيعات وضعف الأرباح والمصاريف العالية — ثلاثة مشاكل بحلول هيكلية واضحة',
        },
        fnb: {
          name: 'الشركات العائلية',
          description: 'إعادة الهيكلة التي تحفظ سيطرة العائلة وتُطلق التشغيل للمختصين',
        },
        telecom: {
          name: 'الاتصالات',
          description: 'تحويل العملاء المتذبذبين إلى مشتركين وفيين وبناء محرك إيرادات B2B مستدام',
        },
        distribution: {
          name: 'المشاريع المتعثرة',
          description: 'نكتشف نقطة الاختناق الواحدة — نحلها — ثم ننتقل إلى التالية',
        },
      },
    },
    domains: {
      label: 'مجالات العمل',
      heading: 'المشاكل التي أحلها',
      ctaText: 'هل تعرف نفسك في إحدى هذه المشاكل؟',
      ctaButton: 'تحدث معي مجاناً',
      cards: {
        1: {
          title: 'التطوير العقاري — قبل البدء: الفكرة لا تزال على الورق',
          description: 'كثير من المشاريع العقارية تبدأ بحماس وتنتهي بخسارة — لأن الفكرة لم تُختبر على الواقع قبل ضخ رأس المال.',
          detail1Title: 'ما أفعله قبل أن تبدأ',
          detail1: 'أُقيّم فكرة مشروعك وأسقطها على واقع السوق. أحلل الربحية المتوقعة بأرقام لا بتوقعات. أقترح بدائل إذا كانت الفكرة الأصلية محفوفة بمخاطر. أقارن النتائج بين الخيارات المتاحة. وأضع نصائح موثقة تُمكّنك من اتخاذ القرار بثقة.',
          detail2Title: 'ما أفعله بعد التنفيذ إذا تعثرت المبيعات',
          detail2: 'أراجع استراتيجية التسويق العقاري من الأساس. أُعيد تسعير الوحدات بناءً على بيانات السوق الفعلي. أُحسّن العرض التسويقي. أدرس أسباب عزوف المشترين. أُعيد هيكلة عقود البيع وأُفعّل برامج الإحالة.',
        },
        2: {
          title: 'الشركات العائلية — الأب بنى الإمبراطورية، لكنه أصبح العائق',
          description: 'الشركة العائلية هي أصعب بيئة تشغيلية على الإطلاق — لأن العلاقات تتشابك مع القرارات، والهيبة تتقاطع مع الكفاءة.',
          detail1Title: 'المشكلة كما أراها',
          detail1: 'الأب هو المرجعية لكل قرار — حتى الصغيرة. الإخوة في الإدارة أحياناً وفي الصراع أحياناً أخرى. لا سياسات مكتوبة، لا توصيف وظائف واضح، لا نظام ترقية. كل قرار يحتاج توقيعات متعددة، والموظف لا يتحرك بدون إذن المدير المباشر.',
          detail2Title: 'ما أفعله',
          detail2: 'أُعيد الهيكلة بحيث تبقى السيطرة الاستراتيجية للعائلة لكن التشغيل اليومي للمختصين. أكتب السياسات والإجراءات التي تُوقف الفوضى بشكل دائم. أضع مؤشرات أداء واضحة لكل موظف دون المساس بهيبة القيادة العائلية. أفصل الملكية عن الإدارة تدريجياً. وأُحدد الصلاحيات والمسؤوليات بدقة لا تتيح مجالاً للتأويل.',
        },
        3: {
          title: 'المشاريع المتعثرة — غارق في التفاصيل وتنتظرك المشاكل من كل اتجاه',
          description: 'مبيعاتك نائمة، أو فريقك يائس، أو مصاريفك تأكل الإيراد قبل أن تراه. أنت تريد أن تكون الموجّه لكنك تجد نفسك المنفّذ.',
          detail1Title: 'ما تعيشه الآن',
          detail1: 'لا تعرف أين الخلل الحقيقي: التسويق؟ المنتج؟ الأسعار؟ الناس؟ أنت غارق في تفاصيل الرواتب والعقود وشكاوى العملاء وصغائر الأمور. طاقتك تتوزع على كل شيء فلا تُنجز أي شيء.',
          detail2Title: 'ما أفعله',
          detail2: 'أكتشف معك نقطة الاختناق الواحدة — أحلها — ثم ننتقل إلى التالية. أُعيد هندسة المبيعات من أول عميل إلى آخر عقد. أُخرجك من التفاصيل اليومية لأُعيد لك وقتك واهتمامك. أبني نظاماً يعمل بدونك في الصغائر. وأتولى تعقيدات الداخل لتتفرغ أنت لاكتساح الخارج.',
        },
        4: {
          title: 'التوزيع والسلع الاستهلاكية — ضعف المبيعات',
          description: 'المنتج موجود، الفريق موجود، التوزيع قائم — لكن المبيعات لا تعكس الإمكانيات الفعلية.',
          detail1Title: 'ما أكتشفه عادةً',
          detail1: 'مشكلة قد تكون في المنتج نفسه أو في السوق أو في المنافسين أو في التسعير أو في توزيع الجغرافيا أو في فريق المبيعات. لا تشخيص جادّ يعني لا حل صحيح.',
          detail2Title: 'ما أفعله',
          detail2: 'أجري دراسة شاملة: تحليل المنتج، دراسة السوق، تحليل المنافسة، مراجعة الأسعار، تقييم الجودة، مراجعة سياسة التوزيع، تقييم فريق المبيعات، تحليل سلوك المشتري. لا حلول جزئية — أقدم حلاً كاملاً وحقيقياً.',
        },
        5: {
          title: 'التوزيع والسلع الاستهلاكية — ضعف الأرباح والمصاريف العالية',
          description: 'الإيرادات موجودة لكن الأرباح تختفي — أو المصاريف تنمو أسرع من الإيرادات. هذا ليس مشكلة مبيعات، هذه مشكلة هيكل.',
          detail1Title: 'مشكلة الأرباح: ما أجده',
          detail1: 'هوامش ربح ضعيفة بسبب تسعير خاطئ أو مزيج منتجات غير محسّن. خسائر تشغيلية مخفية في التفاصيل. شروط سداد مع الموزعين تُضر بالتدفق النقدي. عقود مع موردين لم تُراجع منذ سنوات.',
          detail2Title: 'مشكلة المصاريف العالية: ما أفعله',
          detail2: 'أُدقق كل بند من بنود المصاريف. أُحدد أوجه الهدر الحقيقية. أراجع هيكل الرواتب وعقود الخدمات. أُحسّن كفاءة المستودعات وأُقلّص تكاليف النقل والتوزيع. وأضع خارطة أتمتة للعمليات اليدوية التي تستنزف الوقت والمال.',
        },
        6: {
          title: 'تحتاج شريكاً تجارياً موثوقاً في السوق المحلي',
          description: 'الدخول إلى أسواق العراق والخليج يتطلب معرفة بالشبكات المحلية لا يمكن اكتسابها من مكتب في الخارج.',
          detail1Title: 'ما أجده عادةً',
          detail1: 'الشركات الأجنبية تختار موزعين بناءً على التوافر لا الكفاءة. شراكات تبدو قوية على الورق تنهار في التنفيذ. فجوة ثقافية في التفاوض تُكلّف أكثر مما يُدرك أصحابها.',
          detail2Title: 'ما أفعله',
          detail2: 'أمتلك شبكة علاقات موثوقة في العراق وكردستان والخليج بُنيت على مدار 25 عاماً. أفحص الشركاء المحتملين وأبني هيكل الاتفاقية الذي يحمي مصالحك على المدى الطويل.',
        },
        7: {
          title: 'قرارات الاستثمار تحتاج تحقق ميداني',
          description: 'التحليلات المالية وحدها لا تكفي — السوق المحلي له منطقه الخاص الذي لا تراه النماذج الافتراضية.',
          detail1Title: 'ما أجده عادةً',
          detail1: 'مستثمرون يعتمدون على بيانات ثانوية لا تعكس الواقع المحلي. دراسات جدوى أُعدّت من مكاتب بعيدة دون اختبار ميداني. مخاطر تنظيمية وثقافية غير محسوبة تُفاجئ بعد الإطلاق.',
          detail2Title: 'ما أفعله',
          detail2: 'أجري تحققاً ميدانياً كاملاً — زيارات السوق، مقابلات الموزعين، تحليل تنافسي فعلي، نمذجة تسعير واقعية. قدّمت هذا مسبقاً لقرار استثمار بقيمة 40 مليون دولار في مصنع حلويات.',
        },
        8: {
          title: 'مؤسستك لم تُبنَ للنمو الذي تخطط له',
          description: 'النمو السريع يكشف الهشاشة الهيكلية. إذا كانت عملياتك مصممة لحجم أصغر، فالتوسع سيكسرها.',
          detail1Title: 'ما أجده عادةً',
          detail1: 'هياكل تنظيمية نشأت بشكل عشوائي لا مُصممة بقصد. إجراءات تشغيلية غير موثقة تعتمد على أفراد بعينهم. أقسام تعمل بمعزل عن بعضها دون تنسيق تجاري.',
          detail2Title: 'ما أفعله',
          detail2: 'أصمم الهيكل التنظيمي والأدلة الاستراتيجية وإجراءات التشغيل وخطط التوظيف التي تحول النمو الفوضوي إلى آلة تجارية منتظمة وقابلة للتوسع.',
        },
      },
    },
    about: {
      label: 'من أنا',
      heading: 'لم أبدأ في الاستشارات — ',
      headingEm: 'بدأت في التشغيل.',
      heading2: '',
      body1: 'قضيت 25 عاماً داخل هذه الأعمال — كرئيس تنفيذي للعمليات التجارية، ومدير تجاري، ومدير عام — في قطاعات الاتصالات والسلع الاستهلاكية والتصنيع والعقارات عبر العراق وكردستان والخليج. لم أكن أقدم تقارير عن الأداء، كنت مسؤولاً عنه.',
      body2: 'هذا هو الفرق الجوهري. أعرف كيف يبدو نموذج التوزيع المكسور من داخل قائمة الأرباح والخسائر. أعرف ما الذي يجعل موزعاً ما يتفوق على منافسه. أعرف لماذا تفشل استراتيجيات دخول الأسواق التي تبدو منطقية على الورق. حين أعمل معك، أحضر معي 25 عاماً من الندوب التشغيلية — لا مجرد إطار عمل آخر.',
      body3: 'النتائج فقط. لا تقارير تُحفظ في الأدراج.',
      values: {
        1: {
          name: 'مسؤولية النتيجة',
          description: 'كل مشاركة مرتبطة بمؤشرات أداء واضحة — أنا مسؤول عن النتائج التي تصل إلى رقم الأرباح الصافية.',
        },
        2: {
          name: 'تنفيذ داخل المؤسسة',
          description: 'لا أسلّم تقريراً وأنصرف — أعمل جنباً إلى جنب مع فريقك حتى يتحقق التغيير فعلياً.',
        },
        3: {
          name: 'معرفة السوق المحلي',
          description: 'العراق وكردستان والخليج — ليست مجرد أسواق أدرس عنها، بل أسواق عشت فيها وبنيت فيها على مدار 25 عاماً.',
        },
        4: {
          name: 'بيانات لا حدس',
          description: 'أستخدم التحليلات التنبؤية ونمذجة شجرة القرار وتتبع مؤشرات الأداء — لتحويل القرارات الغامضة إلى مسارات واضحة.',
        },
      },
    },
    contact: {
      heading: 'تحدث معي — مجاناً',
      info: {
        title: 'لنبدأ المحادثة',
        subtitle: 'جلسة استكشافية مجانية لمدة 30 دقيقة. نراجع تحديك التجاري الأساسي ونرسم مساراً محتملاً للحل — بلا التزام.',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف / واتساب',
        coverage: 'التغطية الجغرافية',
        coverageValue: 'العراق · كردستان · الكويت · دول الخليج · منطقة MENA',
      },
      form: {
        fullName: 'الاسم الكامل',
        fullNamePlaceholder: 'أدخل اسمك الكامل',
        company: 'الشركة',
        companyPlaceholder: 'اسم شركتك',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'your@email.com',
        phone: 'الهاتف',
        phonePlaceholder: '+964 7XX XXX XXXX',
        objective: 'التحدي التجاري الذي تواجهه',
        objectivePlaceholder: 'صف المشكلة التي تعيشها — ما الذي لا يعمل كما ينبغي؟',
        attachments: 'مستندات داعمة',
        attachmentsHint: 'اختياري — أي بيانات أو تقارير أو دراسات ذات صلة',
        submit: 'احجز جلستي المجانية',
        submitting: 'جاري الإرسال...',
      },
      success: {
        title: 'تم الاستلام',
        message: 'سأتواصل معك خلال 24 ساعة لتحديد موعد الجلسة الاستكشافية.',
      },
    },
    cta: {
      title: 'مشكلتك التجارية لها حل — وهو أقرب مما تعتقد',
      subtitle: 'معظم الشركات التي عملت معها لم تكن تحتاج استراتيجية جديدة — كانت تحتاج تنفيذاً صحيحاً لما لديها بالفعل. إذا كانت إيراداتك لا تعكس إمكانياتك الفعلية، فالمشكلة على الأرجح هيكلية — وهذا بالضبط ما أفعله.',
      button: 'احجز جلسة استكشافية مجانية',
    },
    footer: {
      description: 'مستشار تجاري تنفيذي — 25 عاماً من التشغيل الفعلي في أسواق الشرق الأوسط وشمال أفريقيا',
      services: 'نتائجنا',
      about: 'من أنا',
      talkToAdvisor: 'احجز جلسة مجانية',
      copyright: '© 2026 Meridian Growth Advisory. جميع الحقوق محفوظة.',
    },
    ticker: [
      'توقف تسرب الإيرادات',
      'اخفض التكاليف التشغيلية',
      'ابنِ شبكات توزيع تعمل',
      'ادخل الأسواق الجديدة بثقة',
      'حوّل العملاء المترددين إلى مخلصين',
      'أطلق أداء فريق المبيعات',
      'اتخذ قرارات استثمار مبنية على بيانات',
      'تنفيذ حقيقي — لا تقارير تُحفظ',
    ],
    admin: {
      login: { title: 'لوحة التحكم', username: 'اسم المستخدم', password: 'كلمة المرور', submit: 'تسجيل الدخول', error: 'بيانات غير صحيحة' },
      nav: { main: 'الرئيسية', overview: 'نظرة عامة', requests: 'الطلبات', crm: 'إدارة العملاء', website: 'الموقع', content: 'إدارة المحتوى', languages: 'إدارة اللغات', backToSite: 'العودة إلى الموقع' },
      overview: { title: 'نظرة عامة', newRequests: 'طلبات جديدة', customers: 'العملاء', languages: 'اللغات', contentAreas: 'مناطق المحتوى', recentRequests: 'الطلبات الأخيرة', allCustomers: 'جميع العملاء', contact: 'جهة الاتصال', date: 'التاريخ', status: 'الحالة' },
      requests: {
        title: 'الطلبات', total: 'الإجمالي', new: 'جديد', inProgress: 'قيد التنفيذ', done: 'مكتمل', all: 'الكل', message: 'الرسالة', files: 'ملفات', actions: 'الإجراءات', view: 'عرض', convertToCrm: 'تحويل إلى CRM', delete: 'حذف', empty: 'لا توجد طلبات',
        detail: { title: 'تفاصيل الطلب', fullName: 'الاسم الكامل', company: 'الشركة', email: 'البريد الإلكتروني', phone: 'الهاتف', message: 'الرسالة', attachedFiles: 'الملفات المرفقة', updateStatus: 'تحديث الحالة', close: 'إغلاق' },
      },
      crm: {
        title: 'إدارة العملاء', total: 'الإجمالي', thisMonth: 'هذا الشهر', withNotes: 'مع ملاحظات', search: 'البحث...', add: 'إضافة عميل', name: 'الاسم', contact: 'جهة الاتصال', company: 'الشركة', added: 'تمت الإضافة', notes: 'ملاحظات', actions: 'الإجراءات', edit: 'تعديل', delete: 'حذف', empty: 'لا يوجد عملاء',
        form: { title: 'إضافة عميل', editTitle: 'تعديل العميل', fullName: 'الاسم الكامل', company: 'الشركة', email: 'البريد الإلكتروني', phone: 'الهاتف', notes: 'ملاحظات', save: 'حفظ', cancel: 'إلغاء' },
      },
      content: {
        title: 'إدارة المحتوى', brand: 'هوية العلامة', hero: 'قسم البطل', cta: 'دعوة للعمل', contactInfo: 'معلومات الاتصال', footer: 'التذييل', logoText: 'نص الشعار', tagline: 'الشعار', heroHeading: 'عنوان البطل', heroSubheading: 'عنوان فرعي', ctaTitle: 'عنوان CTA', ctaSubtext: 'نص CTA', ctaButton: 'نص الزر', email: 'البريد', phone: 'الهاتف', whatsapp: 'واتساب', footerDesc: 'وصف التذييل', saveAll: 'حفظ الكل', saved: 'تم الحفظ',
      },
      languages: {
        title: 'إدارة اللغات', add: 'إضافة لغة', language: 'اللغة', code: 'الرمز', direction: 'الاتجاه', status: 'الحالة', default: 'افتراضي', enabled: 'مفعل', disabled: 'معطل', actions: 'الإجراءات', setDefault: 'تعيين افتراضي', edit: 'تعديل', delete: 'حذف', translations: 'الترجمات',
        form: { title: 'إضافة لغة', editTitle: 'تعديل اللغة', name: 'اسم اللغة', nativeName: 'الاسم الأصلي', code: 'رمز اللغة', direction: 'الاتجاه', ltr: 'من اليسار إلى اليمين', rtl: 'من اليمين إلى اليسار', save: 'حفظ', cancel: 'إلغاء' },
        translationEditor: { title: 'محرر الترجمة', heroHeading: 'عنوان البطل', heroSubheading: 'عنوان فرعي', ctaTitle: 'عنوان CTA', ctaButton: 'زر CTA', navCta: 'زر التنقل', footerDesc: 'وصف التذييل', save: 'حفظ', saveAll: 'حفظ الكل' },
      },
    },
  },

  en: {
    nav: {
      industries: 'Sectors',
      expertise: 'Results',
      about: 'About',
      cta: 'Book a Free Session',
    },
    hero: {
      eyebrow: 'Executive Commercial Advisor — MENA Region',
      heading: "Your business doesn't have a strategy problem — ",
      headingEm: 'it has an execution problem.',
      subheading: "I spent 25 years inside these businesses — as CCO, Commercial Director, and General Manager — before moving to consulting. I know what a broken distribution model looks like from inside a P&L, not from a slide deck.",
      primaryCta: 'Book a Free Discovery Session',
      secondaryCta: 'See What I Fix',
      stats: {
        years: 'Years of operational experience',
        projects: 'Commercial transformations delivered',
        countries: 'Countries in the region',
      },
      achievements: {
        title: 'Verified results',
        item1: '25% revenue growth in 6 months on a $15M+ P&L',
        item2: '33% cost reduction while increasing capacity 50%',
        item3: '35% churn reduction using predictive analytics',
        item4: 'Shaped $40M+ investment decisions with field-validated analysis',
      },
    },
    whyUs: {
      badge: 'Why work with me',
      heading: 'The difference that matters',
      cards: {
        1: {
          stat: '25+ Years',
          title: 'Real operational experience',
          desc: "I was never an outside advisor — I was the executive who owned the P&L, built the teams, and was accountable for the numbers.",
        },
        2: {
          stat: '15+ Projects',
          title: 'Measurable outcomes',
          desc: '35% average revenue growth across commercial transformation engagements — with clear KPIs tied to every engagement.',
        },
        3: {
          stat: '4 Countries',
          title: 'Deep local market knowledge',
          desc: "Iraq, Kurdistan, Kuwait, and the Gulf — 25 years on the ground, not from an office abroad.",
        },
      },
    },
    outcomes: {
      badge: 'What you get',
      heading: 'The outcomes I deliver',
      subheading: "No reports that sit on shelves. I work inside your business until the result is real.",
      items: {
        1: {
          result: 'Higher revenue',
          proof: '25% growth in 6 months on a $15M+ P&L',
          how: 'Re-engineer sales strategy, pricing architecture, and channel structures to stop revenue leakage.',
        },
        2: {
          result: 'Lower operating costs',
          proof: '33% cost reduction while increasing capacity 50% in Northern Iraq telecom',
          how: 'Restructure distribution networks and operations for maximum efficiency without cutting what matters.',
        },
        3: {
          result: 'Better customer retention',
          proof: '35% churn reduction using Decision Tree modelling and predictive analytics',
          how: 'Build data-driven CRM and retention systems that turn churn from a gut-feel problem into a solvable one.',
        },
        4: {
          result: 'Successful market entry',
          proof: 'Led 8 market entry programs across 4 countries in the region',
          how: 'Build validated pricing and distribution models before you invest a dollar.',
        },
      },
    },
    proof: {
      badge: 'Verified results',
      heading: 'Real numbers from real projects',
      items: {
        1: { number: '$15M+', label: 'P&L owned and managed', context: 'Tishknet Telecom, Northern Iraq' },
        2: { number: '25%', label: 'Revenue growth in 6 months', context: 'Sales strategy and pricing restructure' },
        3: { number: '35%', label: 'Churn reduction', context: 'Predictive analytics and Decision Tree modelling' },
        4: { number: '50%', label: 'Capacity increase', context: 'While cutting operating costs 33% simultaneously' },
        5: { number: '$5M+', label: 'New business secured', context: 'SITI GROUP — trading, distribution, real estate' },
        6: { number: '$40M+', label: 'Investment decision shaped', context: 'Confectionery factory feasibility study' },
      },
    },
    industries: {
      label: 'Sectors',
      heading: 'The sectors I work in',
      cards: {
        realestate: {
          name: 'Real Estate Development',
          description: 'From pre-launch feasibility to post-launch sales recovery — at every stage of a project',
        },
        fmcg: {
          name: 'FMCG & Distribution',
          description: 'Weak sales, weak margins, high costs — three problems with one structural root cause',
        },
        fnb: {
          name: 'Family Businesses',
          description: 'Restructuring that keeps family control while freeing operations to run professionally',
        },
        telecom: {
          name: 'Telecom',
          description: 'Turn churning subscribers into loyal ones and build a sustainable B2B revenue engine',
        },
        distribution: {
          name: 'Distressed Projects',
          description: 'Find the one bottleneck — fix it — then move to the next',
        },
      },
    },
    domains: {
      label: 'My Work',
      heading: 'The problems I solve',
      ctaText: 'Do you recognise your situation in one of these?',
      ctaButton: "Talk to me — it's free",
      cards: {
        1: {
          title: 'Real Estate Development — The idea is still on paper',
          description: "Many real estate projects start with excitement and end with losses — because the idea was never pressure-tested against market reality before capital was committed.",
          detail1Title: 'What I do before you start',
          detail1: "I evaluate your project idea against real market conditions. I analyse expected profitability with numbers, not assumptions. I propose alternatives if the original idea carries unacceptable risk. I compare outcomes across options. And I give you documented recommendations so you can make the decision with confidence — not with hope.",
          detail2Title: 'What I do if sales stall after launch',
          detail2: "I review the real estate marketing strategy from the ground up. I reprice units based on actual market data. I improve the marketing proposition and study why buyers are hesitating. I restructure sales contracts and activate referral programmes to reopen the pipeline.",
        },
        2: {
          title: 'Family Businesses — The founder built the empire but became the bottleneck',
          description: "The family business is the hardest operational environment — because relationships intersect with decisions, and authority intersects with capability.",
          detail1Title: 'The problem as I see it',
          detail1: "The founder is the reference point for every decision — even the small ones. Siblings are in management sometimes and in conflict sometimes. No written policies, no clear job descriptions, no promotion system. Every decision needs multiple approvals. Employees won't move without the manager's sign-off.",
          detail2Title: 'What I do',
          detail2: "I restructure so strategic control stays with the family but day-to-day operations run professionally. I write the policies and procedures that stop the chaos — permanently. I put performance metrics on every employee without undermining family leadership authority. I separate ownership from management gradually. And I define responsibilities and authority with a precision that leaves no room for ambiguity.",
        },
        3: {
          title: 'Distressed Projects — Drowning in details while problems multiply',
          description: "Sales are sleeping, your team is demoralised, or your costs are consuming revenue before you see it. You want to lead but you find yourself executing.",
          detail1Title: 'What you are living right now',
          detail1: "You don't know where the real problem is: marketing? product? pricing? people? You're buried in payroll details, contracts, customer complaints, and day-to-day trivia. Your energy is divided across everything — so nothing gets finished.",
          detail2Title: 'What I do',
          detail2: "I find the single bottleneck with you — fix it — then move to the next one. I re-engineer the sales process from first contact to final contract. I extract you from daily operations to give you back your time and focus. I build systems that run without you in the details. And I handle the internal complexity so you can focus on what only you can do — growing the business.",
        },
        4: {
          title: 'FMCG & Distribution — Weak sales',
          description: "Product exists, team exists, distribution is running — but sales don't reflect the real potential.",
          detail1Title: 'What I typically find',
          detail1: "The problem could be in the product itself, the market, the competition, the pricing, the geographic coverage, or the sales team. Without serious diagnosis, there is no correct solution.",
          detail2Title: 'What I do',
          detail2: "I conduct a comprehensive study: product analysis, market study, competitive analysis, pricing review, quality assessment, distribution policy review, sales team evaluation, buyer behaviour analysis. No partial solutions — I deliver a complete, real, actionable answer.",
        },
        5: {
          title: 'FMCG & Distribution — Weak margins and high costs',
          description: "Revenue exists but profit disappears — or costs grow faster than revenue. This is not a sales problem. It is a structural problem.",
          detail1Title: 'The margin problem: what I find',
          detail1: "Weak margins from incorrect pricing or an unoptimised product mix. Hidden operational losses buried in the details. Collection terms with distributors that damage cash flow. Supplier contracts not reviewed in years.",
          detail2Title: 'The cost problem: what I do',
          detail2: "I audit every line item of expenses. I identify the real sources of waste. I review salary structures and service contracts. I improve warehouse efficiency and cut transport and distribution costs. And I map out an automation roadmap for the manual processes that drain time and money.",
        },
        6: {
          title: 'You need a trusted commercial partner in the local market',
          description: "Entering Iraq and Gulf markets requires local network knowledge that cannot be acquired from an office abroad.",
          detail1Title: 'What I typically find',
          detail1: "Foreign companies choose distributors based on availability, not capability. Partnerships that look strong on paper collapse in execution. Cultural gaps in negotiation cost far more than the parties realise.",
          detail2Title: 'What I do',
          detail2: "I have a trusted network in Iraq, Kurdistan, and the Gulf built over 25 years. I screen potential partners and structure agreements that protect your interests for the long term.",
        },
        7: {
          title: 'Investment decisions need field-level validation',
          description: "Financial models alone are not enough — local markets have their own logic that standard models miss.",
          detail1Title: 'What I typically find',
          detail1: "Investors relying on secondary data that does not reflect local reality. Feasibility studies prepared from distant offices without field testing. Regulatory and cultural risks that surface only after launch.",
          detail2Title: 'What I do',
          detail2: "I conduct full field validation — market visits, distributor interviews, real competitive analysis, realistic pricing modelling. I delivered this for a $40M confectionery manufacturing investment decision.",
        },
        8: {
          title: "Your organisation isn't built for the growth you're planning",
          description: "Fast growth exposes structural fragility. If your operations were designed for a smaller scale, expansion will break them.",
          detail1Title: 'What I typically find',
          detail1: "Organisational structures that evolved accidentally rather than by design. Undocumented processes dependent on specific individuals. Departments operating in silos with no commercial coordination.",
          detail2Title: 'What I do',
          detail2: "I design the organisational structure, strategic playbooks, SOPs, and hiring plans that turn chaotic growth into a predictable, scalable commercial machine.",
        },
      },
    },
    about: {
      label: 'About',
      heading: "I didn't start in consulting — ",
      headingEm: 'I started in operations.',
      heading2: '',
      body1: "I spent 25 years inside these businesses — as CCO, Commercial Director, and General Manager — across Telecom, FMCG, Manufacturing, and Real Estate in Iraq, Kurdistan, and the Gulf. I wasn't reporting on performance. I was accountable for it.",
      body2: "That's the fundamental difference. I know what a broken distribution model looks like from inside a P&L. I know what makes one distributor outperform another. I know why market entry strategies that look logical on paper fail in execution. When I work with you, I bring 25 years of operational scar tissue — not another framework.",
      body3: 'Results only. No reports that sit on shelves.',
      values: {
        1: {
          name: 'Accountability for outcomes',
          description: 'Every engagement is tied to clear KPIs — I am accountable for results that reach your bottom line.',
        },
        2: {
          name: 'Execution inside the business',
          description: "I don't hand over a report and walk away — I work alongside your team until the change is real.",
        },
        3: {
          name: 'Local market knowledge',
          description: "Iraq, Kurdistan, and the Gulf — not markets I study from afar, but markets I've built in for 25 years.",
        },
        4: {
          name: 'Data, not instinct',
          description: 'Predictive analytics, Decision Tree modelling, KPI tracking — turning ambiguous decisions into clear paths forward.',
        },
      },
    },
    contact: {
      heading: "Talk to me — it's free",
      info: {
        title: "Let's start the conversation",
        subtitle: 'Free 30-minute discovery session. We review your core commercial challenge and map a potential path forward — no commitment required.',
        email: 'Email',
        phone: 'Phone / WhatsApp',
        coverage: 'Geographic coverage',
        coverageValue: 'Iraq · Kurdistan · Kuwait · Gulf States · MENA Region',
      },
      form: {
        fullName: 'Full Name',
        fullNamePlaceholder: 'Enter your full name',
        company: 'Company',
        companyPlaceholder: 'Your company name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        phone: 'Phone',
        phonePlaceholder: '+964 7XX XXX XXXX',
        objective: 'The commercial challenge you are facing',
        objectivePlaceholder: "Describe the problem — what isn't working as it should?",
        attachments: 'Supporting documents',
        attachmentsHint: 'Optional — any data, reports, or studies relevant to your situation',
        submit: 'Book my free session',
        submitting: 'Submitting...',
      },
      success: {
        title: 'Received',
        message: "I'll be in touch within 24 hours to schedule the discovery session.",
      },
    },
    cta: {
      title: "Your commercial problem has a solution — and it's closer than you think",
      subtitle: "Most businesses I work with didn't need a new strategy — they needed the right execution of what they already had. If your revenue doesn't reflect your actual potential, the problem is likely structural. That's exactly what I fix.",
      button: 'Book a free discovery session',
    },
    footer: {
      description: 'Executive Commercial Advisor — 25 years of hands-on operations across MENA markets',
      services: 'Results',
      about: 'About',
      talkToAdvisor: 'Book a free session',
      copyright: '© 2026 Meridian Growth Advisory. All rights reserved.',
    },
    ticker: [
      'Stop revenue leakage',
      'Cut operating costs',
      'Build distribution networks that work',
      'Enter new markets with confidence',
      'Turn hesitant buyers into loyal clients',
      'Unlock your sales team performance',
      'Make investment decisions on real data',
      'Execution — not reports',
    ],
    admin: {
      login: { title: 'Admin Console', username: 'Username', password: 'Password', submit: 'Sign In', error: 'Invalid credentials' },
      nav: { main: 'Main', overview: 'Overview', requests: 'Requests', crm: 'CRM', website: 'Website', content: 'Content Management', languages: 'Language Management', backToSite: 'Back to Site' },
      overview: { title: 'Overview', newRequests: 'New Requests', customers: 'Customers', languages: 'Languages', contentAreas: 'Content Areas', recentRequests: 'Recent Requests', allCustomers: 'All Customers', contact: 'Contact', date: 'Date', status: 'Status' },
      requests: {
        title: 'Requests', total: 'Total', new: 'New', inProgress: 'In Progress', done: 'Done', all: 'All', message: 'Message', files: 'Files', actions: 'Actions', view: 'View', convertToCrm: 'Convert to CRM', delete: 'Delete', empty: 'No requests found',
        detail: { title: 'Request Details', fullName: 'Full Name', company: 'Company', email: 'Email', phone: 'Phone', message: 'Message', attachedFiles: 'Attached Files', updateStatus: 'Update Status', close: 'Close' },
      },
      crm: {
        title: 'CRM', total: 'Total', thisMonth: 'This Month', withNotes: 'With Notes', search: 'Search customers...', add: 'Add Customer', name: 'Name', contact: 'Contact', company: 'Company', added: 'Added', notes: 'Notes', actions: 'Actions', edit: 'Edit', delete: 'Delete', empty: 'No customers found',
        form: { title: 'Add Customer', editTitle: 'Edit Customer', fullName: 'Full Name', company: 'Company', email: 'Email', phone: 'Phone', notes: 'Notes', save: 'Save', cancel: 'Cancel' },
      },
      content: {
        title: 'Content Management', brand: 'Brand Identity', hero: 'Hero Section', cta: 'Call to Action', contactInfo: 'Contact Information', footer: 'Footer', logoText: 'Logo Text', tagline: 'Tagline', heroHeading: 'Hero Heading', heroSubheading: 'Hero Sub-heading', ctaTitle: 'CTA Title', ctaSubtext: 'CTA Sub-text', ctaButton: 'CTA Button Text', email: 'Email', phone: 'Phone', whatsapp: 'WhatsApp', footerDesc: 'Footer Description', saveAll: 'Save All', saved: 'Changes saved successfully',
      },
      languages: {
        title: 'Language Management', add: 'Add Language', language: 'Language', code: 'Code', direction: 'Direction', status: 'Status', default: 'Default', enabled: 'Enabled', disabled: 'Disabled', actions: 'Actions', setDefault: 'Set Default', edit: 'Edit', delete: 'Delete', translations: 'Translations',
        form: { title: 'Add Language', editTitle: 'Edit Language', name: 'Language Name', nativeName: 'Native Name', code: 'Language Code', direction: 'Direction', ltr: 'Left to Right', rtl: 'Right to Left', save: 'Save', cancel: 'Cancel' },
        translationEditor: { title: 'Translation Editor', heroHeading: 'Hero Heading', heroSubheading: 'Hero Sub-heading', ctaTitle: 'CTA Title', ctaButton: 'CTA Button', navCta: 'Nav CTA Button', footerDesc: 'Footer Description', save: 'Save', saveAll: 'Save All' },
      },
    },
  },

  kr: {
    nav: {
      industries: 'کەرتەکان',
      expertise: 'ئەنجامەکان',
      about: 'دەربارەی ئێمە',
      cta: 'جلسەیەکی بەخۆڕایی بسپێرە',
    },
    hero: {
      eyebrow: 'ڕاوێژکاری تجاری تنفیذی — ناوچەی MENA',
      heading: 'کاروبارەکەت کێشەی ستراتیژی نییە — ',
      headingEm: 'کێشەی جێبەجێکردنە.',
      subheading: '25 ساڵ لەناو ئەم کاروبارانەدا — وەک CCO، بەرێوەبەری تجاری، و بەرێوەبەری گشتی — پێش ئەوەی بچمە ناو ڕاوێژکاری. دەزانم نموونەی دابەشکردنی شکستی چۆن لەناو P&L دا دیده دەکرێت.',
      primaryCta: 'جلسەیەکی بەخۆڕایی بسپێرە',
      secondaryCta: 'ببینە چی چارەسەر دەکەم',
      stats: {
        years: 'ساڵ شارەزایی کارگێڕی',
        projects: 'گۆڕانکاری تجاری گەیشتووە',
        countries: 'وڵات لە ناوچەکەدا',
      },
      achievements: {
        title: 'ئەنجامی پشتڕاستکراو',
        item1: 'گەشەی 25% لە داهات لە 6 مانگدا لەسەر $15M+ P&L',
        item2: 'کەمکردنەوەی تێچووی 33% لەکاتی زیادکردنی کاپاسیتەی 50%',
        item3: 'کەمکردنەوەی churn ی 35% لە ڕێگەی تحلیلی پێشبینیکاری',
        item4: 'هەڵسەنگاندنی وەبەرهێنانی 40+ ملیۆن دۆلار',
      },
    },
    whyUs: {
      badge: 'بۆچی لەگەڵم کار بکە',
      heading: 'جیاوازی کە گرنگە',
      cards: {
        1: {
          stat: '25+ ساڵ',
          title: 'شارەزایی کارگێڕی ڕاستەقینە',
          desc: 'هەرگیز ڕاوێژکاری دەرەوە نەبووم — بووم ئەو بەڕێوەبەرەی P&L دەگرتمەوە و بەرپرسیار بووم',
        },
        2: {
          stat: '15+ پڕۆژە',
          title: 'ئەنجامی پێوانەکراو',
          desc: 'گەشەی ناوەندی 35% لە داهات لە پڕۆژەکانی گۆڕانکاری تجاری — بە KPI ی ڕوون',
        },
        3: {
          stat: '4 وڵات',
          title: 'زانیاری قووڵ لە بازاڕی ناوخۆیی',
          desc: 'عێراق، کوردستان، کووەیت، و خەلیج — لە 25 ساڵ کاری بنەڕەتدا نا لە مەکتەبێکی دوور',
        },
      },
    },
    outcomes: {
      badge: 'چی دەگری',
      heading: 'ئەنجامەکانی کە دەگەیەنم',
      subheading: 'هیچ ڕاپۆرتێک لە درافتەکاندا نانیشێت. لەناو کاروبارەکەت کار دەکەم تا ئەنجامەکە ڕاستەقینە بێت.',
      items: {
        1: {
          result: 'داهاتی بەرز',
          proof: 'گەشەی 25% لە 6 مانگدا لەسەر $15M+ P&L',
          how: 'ستراتیژی فرۆشتن و نرخگذاری دووبارە ئەندازیاری دەکەم بۆ وەستاندنی چۆژینەوەی داهات',
        },
        2: {
          result: 'تێچووی کارگێڕی کەمتر',
          proof: 'کەمکردنەوەی تێچووی 33% لەکاتی زیادکردنی کاپاسیتەی 50%',
          how: 'تۆڕەکانی دابەشکردن دووبارە دیزاین دەکەم بۆ زۆرترین کارایی',
        },
        3: {
          result: 'گرتنەوەی باشتری کڕیار',
          proof: 'کەمکردنەوەی churn ی 35% لە ڕێگەی تحلیلی پێشبینیکاری',
          how: 'سیستەمی CRM و پرۆگرامی گرتنەوە دادەنێم کە بەرپایەی داتا',
        },
        4: {
          result: 'چوونەژوورەوەی بازاڕی سەرکەوتوو',
          proof: '8 پرۆگرامی چوونەژوورەوەی بازاڕ لە 4 وڵاتدا',
          how: 'نموونەی دابەشکردن و نرخگذاری پشتڕاستکراو پێش وەبەرهێنان',
        },
      },
    },
    proof: {
      badge: 'ئەنجامی پشتڕاستکراو',
      heading: 'ژمارەی ڕاستەقینە لە پڕۆژەی ڕاستەقینە',
      items: {
        1: { number: '$15M+', label: 'P&L خاوەنداریکرا و بەڕێوەبراوە', context: 'تشکنت تێلیکۆم، باکووری عێراق' },
        2: { number: '25%', label: 'گەشەی داهات لە 6 مانگدا', context: 'دووبارە ڕێکخستنی ستراتیژی فرۆشتن' },
        3: { number: '35%', label: 'کەمکردنەوەی churn', context: 'تحلیلی پێشبینیکاری و Decision Tree' },
        4: { number: '50%', label: 'زیادکردنی کاپاسیتە', context: 'لەکاتی بڕینی تێچووی 33% لەکاتی یەکدا' },
        5: { number: '$5M+', label: 'کاروباری نوێ پتەوکراوە', context: 'گروپی SITI — فرۆشتن، دابەشکردن، خانووبەرە' },
        6: { number: '$40M+', label: 'بڕیاری وەبەرهێنان شێوەدراوە', context: 'گونجاوی کارخانەی شیرینی' },
      },
    },
    industries: {
      label: 'کەرتەکان',
      heading: 'کەرتەکانی کە تێیاندا کار دەکەم',
      cards: {
        realestate: {
          name: 'گەشەپێدانی خانووبەرە',
          description: 'لە گونجاوی پڕۆژە پێش دەستپێکردن بۆ چارەسەری کەمی فرۆشتن پاش جێبەجێکردن',
        },
        fmcg: {
          name: 'FMCG و دابەشکردن',
          description: 'کەمی فرۆشتن، کەمی قازانج، و تێچووی بەرز — سێ کێشە بە یەک ڕەگی هیکەلی',
        },
        fnb: {
          name: 'بازرگانییە خێزانەکان',
          description: 'دووبارە ڕێکخستنێک کە کۆنترۆڵی خێزانە بەرپاری دەهێلێت و بەڕێوەبردنی ڕۆژانە بۆ پسپۆڕان دەبەخشێت',
        },
        telecom: {
          name: 'تەلیکۆم',
          description: 'بەشداربووانی گۆڕان بگۆڕە بۆ دڵسۆزان و مەکینەی داهاتی B2B ی بەردەوام بنیاد بنێ',
        },
        distribution: {
          name: 'پڕۆژەی سەختبوو',
          description: 'دۆزینەوەی تەک ئاستەنگی — چارەسەری — پاشان بچۆ بۆ دوایی',
        },
      },
    },
    domains: {
      label: 'کارەکانم',
      heading: 'کێشەکانی کە چارەسەریان دەکەم',
      ctaText: 'ئایا دۆخی خۆت لەیەکێک لەمانەدا دەناسیتەوە؟',
      ctaButton: 'قسەم لەگەڵ بکە — بەخۆڕاییە',
      cards: {
        1: {
          title: 'گەشەپێدانی خانووبەرە — ئێدیاکە هێشتا لەسەر کاغەزە',
          description: 'زۆرینەی پڕۆژەکانی خانووبەرە بە هەیەجان دەستیان پێ دەکات و بە زیان کۆتایی دێنن — چونکە ئێدیاکە پێش ئەوەی سەرمایە دابنرێت لەسەر ڕاستییی بازاڕ تاقی نەکراوەتەوە.',
          detail1Title: 'چی دەکەم پێش ئەوەی دەستت پێ بکەیت',
          detail1: 'ئێدیای پڕۆژەکەت دەسەنگێنم و لەسەر ڕاستییی بازاڕ دەیخەمەوە. ربحەوەری چاوەڕوانکراو بە ژمارە شیکاری دەکەم نەک بەوەهم. ئەگەر ئێدیای ئەسڵی مەترسی زۆری هەبێت بدیلی پێشنیار دەکەم. ئەنجامەکان نێوان هەڵبژاردنەکان بەراوردی دەکەم. و ڕاوێژی بەڵگەکراو دەدەمەوە بۆ ئەوەی بڕیار بدەیت بە متمانە.',
          detail2Title: 'چی دەکەم ئەگەر فرۆشتن پاش دەستپێکردن سستبوو',
          detail2: 'ستراتیژی بازارکردنی خانووبەرە لە بنەوە دەخوێنمەوە. یەکەکان بەپایەی داتای ڕاستەقینەی بازاڕ دووبارە نرخ دەدەمەوە. پێشکەشکردنی بازارکردن باشتر دەکەم و هۆکاری ڕووگێڕاوتی کڕیاران دەخوێنمەوە. گرێبەستەکانی فرۆشتن دووبارە دیزاین دەکەم و پرۆگرامەکانی ئارێزی چالاک دەکەمەوە.',
        },
        2: {
          title: 'بازرگانییە خێزانەکان — باوک ئیمپراتۆریەکەی بنیاد نا بەڵام ئاستەنگ بووە',
          description: 'بازرگانییە خێزانەکە قورتترین ژینگەی کارگێڕییە — چونکە پەیوەندییەکان بە بڕیارەکاندا تێکەڵ دەبن، و دەسەڵات بە ئەھلییەتدا.',
          detail1Title: 'کێشەکە وەکوو کە دەیبینم',
          detail1: 'باوک ئامانجگای هەر بڕیارێکە — تاوەکو بچووکەکانیش. براکان ئەوکاتێک لە بەڕێوەبردندا ئەوکاتێکیش لە کێشەدان. هیچ سیاسەتی نووسراو نییە، توصیفی کارێکی ڕوون نییە، سیستەمی ترقیە نییە. هەر بڕیارێک پێویستی بە مۆرکردنی زۆر هەیە.',
          detail2Title: 'چی دەکەم',
          detail2: 'دووبارە ڕێکدەخەم بەشێوەیەک کە کۆنترۆڵی ستراتیژی بۆ خێزانە دەمێنێتەوە بەڵام بەڕێوەبردنی ڕۆژانە بۆ پسپۆڕان دەچێت. سیاسەت و پرۆسیجەرەکانی دەنووسم کە شێواوییەکە بۆ هەمیشە دەوەستێنن. پێوەرەکانی ئەدا دادەنێم بۆ هەر کارمەندێک بەبێ لێخوڕینی سیمای سەرۆکایەتیی خێزانەکە. خاوەنداری لە بەڕێوەبردن هەمووکاتێک جیا دەکەمەوە.',
        },
        3: {
          title: 'پڕۆژەی سەختبوو — غەرق لە وردەکاریدا و کێشەکان لە هەر ئاراستەیەک دێن',
          description: 'فرۆشتنەکانت نیندیان، یان تیمەکەت بەئومێد، یان مەسرەفەکانت داهاتەکەت دەخۆن پێش ئەوەی ببینیتەوە.',
          detail1Title: 'ئەوەی ئێستا تێیدا دەژیتی',
          detail1: 'نازانیت کێشەی ڕاستەقینە لەکوێیە: بازارکردن؟ بەرهەم؟ نرخ؟ کەسانی؟ غەرقی لە وردەکاری مووچە و گرێبەست و گلەیی کڕیار و کارەکانی ڕۆژانەدایت. بزووتنەوەکەت لە سەر هەموو شتێک بەشێوە دەبێت بۆ ئەوەی هیچ شتێک تەواو نەکرێت.',
          detail2Title: 'چی دەکەم',
          detail2: 'تەک ئاستەنگی لەگەڵت دەدۆزمەوە — چارەسەری دەکەم — پاشان بچینە دواتری. پرۆسەی فرۆشتن لە یەکەم پەیوەندی بۆ کۆتا گرێبەست دووبارە ئەندازیاری دەکەم. لەم وردەکاریە ڕۆژانەیە دەردەکەیت بۆ ئەوەی کاتی خۆت و سەرنجت بگەڕێنمەوە. سیستەمێک دادەنێم کە بەبێ تۆ لە وردەکاریدا کار دەکات.',
        },
        4: {
          title: 'FMCG و دابەشکردن — کەمی فرۆشتن',
          description: 'بەرهەم هەیە، تیم هەیە، دابەشکردن بەڕێوەیە — بەڵام فرۆشتن توانای ڕاستەقینەکەی نییە.',
          detail1Title: 'ئەوەی بەردەوام دەیدۆزمەوە',
          detail1: 'کێشەکە لەوانەیە لە خودی بەرهەمدا بێت یان لە بازاڕدا یان لە کەڕابووکاندا یان لە نرخگذاریدا یان لە داپۆشینی جوگرافیدا یان لە تیمی فرۆشتندا. بەبێ تشخیصی جدی هیچ چارەسەری ڕاستی نییە.',
          detail2Title: 'چی دەکەم',
          detail2: 'خوێندنەوەیەکی گشتی ئەنجام دەدەم: شیکاری بەرهەم، خوێندنەوەی بازاڕ، شیکاری کەڕابووی، پێداچوونەوەی نرخ، هەڵسەنگاندنی کوالیتی، پێداچوونەوەی سیاسەتی دابەشکردن، هەڵسەنگاندنی تیمی فرۆشتن، شیکاری ڕەفتاری کڕیار. چارەسەری نیو نییە — وەڵامێکی تەواو و ڕاستەقینە دەدەم.',
        },
        5: {
          title: 'FMCG و دابەشکردن — کەمی قازانج و تێچووی بەرز',
          description: 'داهات هەیە بەڵام قازانج نەیده — یان تێچووەکان خێراتر لە داهات گەشە دەکەن. ئەمە کێشەی فرۆشتن نییە. کێشەی هیکەلییە.',
          detail1Title: 'کێشەی قازانج: ئەوەی دەیدۆزمەوە',
          detail1: 'هەڵەی کەم بەهۆی نرخگذاری هەڵەیی یان مزیجی بەرهەمی باشنەکراو. زیانی کارگێڕی شاراوە لە وردەکاریدا. مەرجی پارەوەرگرتن لەگەڵ دابەشکەران کە بە گەردونی پارەی نەقدی زیان دەگەیەنێت.',
          detail2Title: 'کێشەی تێچووی بەرز: چی دەکەم',
          detail2: 'هەر بەندێک لە بەندەکانی مەسرەف دەدیتەوە. سەرچاوەی ڕاستەقینەی ئیسراف دیاری دەکەم. هیکەلی مووچە و گرێبەستەکانی خزمەتگوزاری دەخوێنمەوە. کارایی کۆگا باشتر دەکەم و تێچووی گواستنەوە و دابەشکردن دەبڕم. و نەخشەی ئۆتۆماسیۆن دادەنێم بۆ پرۆسەکانی دەستی.',
        },
        6: {
          title: 'پێویستت بە هاوبەشێکی تجاری متمانەپێکراو هەیە',
          description: 'چوونەژوورەوەی بازاڕەکانی عێراق و خەلیج پێویستی بە زانیاری شبکەی ناوخۆیی هەیە.',
          detail1Title: 'ئەوەی بەردەوام دەیدۆزمەوە',
          detail1: 'کۆمپانیاکانی بیانی دابەشکەر هەڵدەبژێرن بەپایەی بەردەستی نەک ئەھلییەت. هاوبەشییەکان لە کاغەزدا بەهێز دیده دەکرێن بەڵام لە جێبەجێکردندا دەکەوێنە ژێر.',
          detail2Title: 'چی دەکەم',
          detail2: 'تۆڕی متمانەپێکراو لە عێراق، کوردستان، و خەلیج داریم کردووە لە 25 ساڵدا. هاوبەشی پتانتیاڵ دەپشکینم و ڕێکخراوەی گرێبەست دادەنێم کە بەرژەوەندییەکانت دەپارێزێت.',
        },
        7: {
          title: 'بڕیارەکانی وەبەرهێنان پێویستی بە پشتڕاستکردنەوەی مەیدانی هەیە',
          description: 'نموونەی دارایی بەتەنها بەس نییە — بازاڕی ناوخۆیی منطقی تایبەتی خۆی هەیە.',
          detail1Title: 'ئەوەی بەردەوام دەیدۆزمەوە',
          detail1: 'وەبەرهێنەران خوان دەدەن لەسەر داتای دووەم کە ڕاستییی ناوخۆیی نییە. خوێندنەوەکانی گونجاوی لە مەکتەبی دوور ئامادەدەکرێن بەبێ تاقیکردنەوەی مەیدانی.',
          detail2Title: 'چی دەکەم',
          detail2: 'پشتڕاستکردنەوەی مەیدانی تەواو ئەنجام دەدەم — سەردانی بازاڕ، چاوپێکەوتنی دابەشکەران، تحلیلی کەڕابووی ڕاستەقینە. ئەمەی گەیاندم بۆ بڕیاری وەبەرهێنانی 40 ملیۆن دۆلار لە کارخانەی شیرینی.',
        },
        8: {
          title: 'ڕێکخراوەکەت بۆ ئەو گەشەیەی پلانت دەکەی بنیادنراوە نییە',
          description: 'گەشەی خێرا شکنراوی هیکەلی ئاشکرا دەکات. ئەگەر کارەکانت بۆ قەبارەیەکی بچووکتر دیزاینکراون، فراوانکردن دەیشکێنن.',
          detail1Title: 'ئەوەی بەردەوام دەیدۆزمەوە',
          detail1: 'هیکەلی ڕێکخراوەیی کە بە بێ مەبەست گەشەی کرد نەک بە مەبەست دیزاینکرا. پرۆسەی بەڵگەنەکراو کە پشت دەبەستێن بە کەسانی دیاری.',
          detail2Title: 'چی دەکەم',
          detail2: 'هیکەلی ڕێکخراوەیی و کتێبچەی ستراتیژی و SOP و پلانی دامەزراندن دیزاین دەکەم کە گەشەی شڵەژاو دەگۆڕن بۆ ئامێرێکی تجاری ڕێکوپێک و فراوانبوون.',
        },
      },
    },
    about: {
      label: 'دەربارەی ئێمە',
      heading: 'لە ڕاوێژکاریدا دەستم نەکردووە — ',
      headingEm: 'لە کارگێڕیدا دەستم کردووە.',
      heading2: '',
      body1: '25 ساڵ لەناو ئەم کاروبارانەدا — وەک CCO، بەرێوەبەری تجاری، و بەرێوەبەری گشتی — لە تێلیکۆم، کاڵا بەکارهێنەرییەکان، پیشەسازی، و خانووبەرە لە عێراق، کوردستان، و خەلیجدا. ڕاپۆرتی ئەدا نەدەدامەوە. بەرپرسیار بووم لەبارێت.',
      body2: 'ئەمەیە جیاوازی بنەڕەتی. دەزانم نموونەی دابەشکردنی شکستی لەناو P&L دا چۆن دیده دەکرێت. کاتێک لەگەڵت کار دەکەم، 25 ساڵ زیانی کارگێڕی لەگەڵم دەهێنم — نەک فریمەوەرێکی تازەی دیکە.',
      body3: 'تەنها ئەنجام. هیچ ڕاپۆرتێک لە درافتەکاندا نانیشێت.',
      values: {
        1: {
          name: 'بەرپرسیاری ئەنجام',
          description: 'هەر مشارکەت بەستراوە بە KPI ی ڕوون — بەرپرسیارم لە ئەنجامەکانی کە دەگەن بۆ خاڵی ئارامی سەرمایەت.',
        },
        2: {
          name: 'جێبەجێکردن لەناو کاروبار',
          description: 'ڕاپۆرت تەسلیم ناکەم و ناچمەوە — لەگەڵ تیمەکەت کار دەکەم تا گۆڕانکارییەکە ڕاستەقینە بێت.',
        },
        3: {
          name: 'زانیاری بازاڕی ناوخۆیی',
          description: 'عێراق، کوردستان، و خەلیج — نەک بازاڕی لێی لێکۆڵینەوە دەکەم لە دووری، بلکو بازاڕی 25 ساڵ لەو بنیادم نراوە.',
        },
        4: {
          name: 'داتا نەک هەست',
          description: 'تحلیلی پێشبینیکاری، نموونەی Decision Tree، شوێنکەوتنی KPI — گۆڕینی بڕیارەکانی مشکووک بۆ ڕێگای ڕوون.',
        },
      },
    },
    contact: {
      heading: 'قسەم لەگەڵ بکە — بەخۆڕاییە',
      info: {
        title: 'با دەستپێبکەین',
        subtitle: 'جلسەی دۆزینەوەی بەخۆڕایی 30 خولەک. ئاستەنگی تجاری سەرەکیت دەخوێنینەوە و ڕێگای پتانتیاڵی چارەسەر دیاری دەکەین — بەبێ پابەندبوون.',
        email: 'ئیمەیڵ',
        phone: 'تەلەفۆن / واتساپ',
        coverage: 'داپۆشینی جوگرافی',
        coverageValue: 'عێراق · کوردستان · کووەیت · وڵاتەکانی خەلیج · ناوچەی MENA',
      },
      form: {
        fullName: 'ناوی تەواو',
        fullNamePlaceholder: 'ناوی تەواوت بنووسە',
        company: 'کۆمپانیا',
        companyPlaceholder: 'ناوی کۆمپانیاکەت',
        email: 'ئیمەیڵ',
        emailPlaceholder: 'ئیمەیڵەکەت',
        phone: 'تەلەفۆن',
        phonePlaceholder: '+964 7XX XXX XXXX',
        objective: 'ئاستەنگی تجاری کە ڕووبەڕووی دەبیتەوە',
        objectivePlaceholder: 'کێشەکە وەسف بکە — چی ئەوەی دەبێ کار ناکات؟',
        attachments: 'بەڵگەی پشتیوانی',
        attachmentsHint: 'ئارەزووی — هیچ داتا، ڕاپۆرت، یان خوێندنەوەی پەیوەندیدار',
        submit: 'جلسەی بەخۆڕاییم بسپێرە',
        submitting: 'ناردن...',
      },
      success: {
        title: 'وەرگیراوە',
        message: 'لە ماوەی 24 کاتژمێردا پەیوەندیت پێوە دەکەم.',
      },
    },
    cta: {
      title: 'کێشەی تجاریەکەت چارەسەری هەیە — و لە ئەوەی فکر دەکەیت نزیکترە',
      subtitle: 'زۆرینەی بازرگانییەکانی لەگەڵیان کار دەکەم پێویستیان بە ستراتیژیی نوێ نەبوو — پێویستیان بە جێبەجێکردنی ڕاستی ئەوەی بوون بووە.',
      button: 'جلسەی دۆزینەوەی بەخۆڕایی بسپێرە',
    },
    footer: {
      description: 'ڕاوێژکاری تجاری تنفیذی — 25 ساڵ کارگێڕی دەستی لە بازاڕەکانی MENA',
      services: 'ئەنجامەکان',
      about: 'دەربارەی ئێمە',
      talkToAdvisor: 'جلسەی بەخۆڕایی بسپێرە',
      copyright: '© 2026 Meridian Growth Advisory. هەموو مافێک پارێزراوە.',
    },
    ticker: [
      'وەستاندنی چۆژینەوەی داهات',
      'بڕینی تێچووی کارگێڕی',
      'بنیاتنانی تۆڕەکانی دابەشکردن',
      'چوونەژوورەوەی بازاڕی نوێ بە متمانە',
      'گۆڕینی کڕیاری دوودڵ بۆ دڵسۆز',
      'ئەدای تیمی فرۆشتن ئازادکردن',
      'بڕیاری وەبەرهێنان لەسەر بنەمای داتا',
      'جێبەجێکردن — نەک ڕاپۆرت',
    ],
    admin: {
      login: { title: 'پانێڵی بەڕێوەبەر', username: 'ناوی بەکارهێنەر', password: 'وشەی نهێنی', submit: 'چوونەژوورەوە', error: 'زانیاری چوونەژوورەوە هەڵەیە' },
      nav: { main: 'سەرەکی', overview: 'سەرنج', requests: 'داواکارییەکان', crm: 'بەڕێوەبردنی کڕیار', website: 'ماڵپەڕ', content: 'بەڕێوەبردنی ناوەڕۆک', languages: 'بەڕێوەبردنی زمانەکان', backToSite: 'گەڕانەوە بۆ ماڵپەڕ' },
      overview: { title: 'سەرنج', newRequests: 'داواکاری نوێ', customers: 'کڕیارەکان', languages: 'زمانەکان', contentAreas: 'ناوچەکانی ناوەڕۆک', recentRequests: 'داواکاری دوایی', allCustomers: 'هەموو کڕیارەکان', contact: 'پەیوەندی', date: 'بەروار', status: 'دۆخ' },
      requests: {
        title: 'داواکارییەکان', total: 'کۆی گشتی', new: 'نوێ', inProgress: 'لە پێشڕەوتندا', done: 'تەواو', all: 'هەموو', message: 'پەیام', files: 'فایلەکان', actions: 'کردارەکان', view: 'بینین', convertToCrm: 'گۆڕین بۆ CRM', delete: 'سڕینەوە', empty: 'داواکاری نەدۆزرایەوە',
        detail: { title: 'وردەکاری داواکاری', fullName: 'ناوی تەواو', company: 'کۆمپانیا', email: 'ئیمەیڵ', phone: 'تەلەفۆن', message: 'پەیام', attachedFiles: 'فایلەکانی هاوپێچ', updateStatus: 'نوێکردنەوەی دۆخ', close: 'داخستن' },
      },
      crm: {
        title: 'CRM', total: 'کۆی گشتی', thisMonth: 'ئەم مانگە', withNotes: 'بە تێبینی', search: 'گەڕان...', add: 'زیادکردنی کڕیار', name: 'ناو', contact: 'پەیوەندی', company: 'کۆمپانیا', added: 'زیادکراوە', notes: 'تێبینییەکان', actions: 'کردارەکان', edit: 'دەستکاری', delete: 'سڕینەوە', empty: 'کڕیار نەدۆزرایەوە',
        form: { title: 'زیادکردنی کڕیار', editTitle: 'دەستکاریکردنی کڕیار', fullName: 'ناوی تەواو', company: 'کۆمپانیا', email: 'ئیمەیڵ', phone: 'تەلەفۆن', notes: 'تێبینییەکان', save: 'پاشەکەوتکردن', cancel: 'پاشگەزبوونەوە' },
      },
      content: {
        title: 'بەڕێوەبردنی ناوەڕۆک', brand: 'ناسنامەی براند', hero: 'بەشی هیرۆ', cta: 'بانگهێشتنامە', contactInfo: 'زانیاری پەیوەندی', footer: 'پێپەڕ', logoText: 'نووسینی لۆگۆ', tagline: 'شیعار', heroHeading: 'سەردێڕی هیرۆ', heroSubheading: 'ژێرسەردێڕی هیرۆ', ctaTitle: 'سەردێڕی CTA', ctaSubtext: 'ژێرنووسی CTA', ctaButton: 'نووسینی دوگمەی CTA', email: 'ئیمەیڵ', phone: 'تەلەفۆن', whatsapp: 'واتساپ', footerDesc: 'وەسفی پێپەڕ', saveAll: 'پاشەکەوتکردنی هەموو', saved: 'گۆڕانکارییەکان پاشەکەوتکران',
      },
      languages: {
        title: 'بەڕێوەبردنی زمانەکان', add: 'زیادکردنی زمان', language: 'زمان', code: 'کۆد', direction: 'ئاراستە', status: 'دۆخ', default: 'بنەڕەتی', enabled: 'چالاككراوە', disabled: 'ناچالاككراوە', actions: 'کردارەکان', setDefault: 'دانانی وەک بنەڕەتی', edit: 'دەستکاری', delete: 'سڕینەوە', translations: 'وەرگێڕانەکان',
        form: { title: 'زیادکردنی زمان', editTitle: 'دەستکاریکردنی زمان', name: 'ناوی زمان', nativeName: 'ناوی ناوخۆیی', code: 'کۆدی زمان', direction: 'ئاراستە', ltr: 'لە چەپەوە بۆ ڕاست', rtl: 'لە ڕاستەوە بۆ چەپ', save: 'پاشەکەوتکردن', cancel: 'پاشگەزبوونەوە' },
        translationEditor: { title: 'دەستکاری وەرگێڕان', heroHeading: 'سەردێڕی هیرۆ', heroSubheading: 'ژێرسەردێڕی هیرۆ', ctaTitle: 'سەردێڕی CTA', ctaButton: 'دوگمەی CTA', navCta: 'دوگمەی ناڤیگەیشنی CTA', footerDesc: 'وەسفی پێپەڕ', save: 'پاشەکەوتکردن', saveAll: 'پاشەکەوتکردنی هەموو' },
      },
    },
  },
};
