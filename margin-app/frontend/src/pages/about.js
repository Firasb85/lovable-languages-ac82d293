import Link from 'next/link';

export default function AboutPage() {
  const teamMembers = [
    { name: 'أحمد محمد', role: 'مؤسس وCEO', description: 'خبير في تطوير الأعمال مع 15 عاماً من الخبرة' },
    { name: 'فاطمة علي', role: 'مديرة العمليات', description: 'متخصصة في إدارة المشاريع والتحليل المالي' },
    { name: 'محمود حسن', role: 'مطور رئيسي', description: 'مهندس برمجيات مع 10 سنوات خبرة' },
    { name: 'نور محمد', role: 'مصممة UX/UI', description: 'تصميم تجربة مستخدم مميزة' }
  ];

  const features = [
    {
      title: 'تشخيص شامل',
      description: 'تحليل شامل لأعمالك عبر 5 محاور رئيسية: الإيرادات، العملاء، المنافسة، العمليات الداخلية، والتسويق',
      icon: '📊'
    },
    {
      title: 'نظام تسجيل ذكي',
      description: '12-15 سؤالاً مصممة خصيصاً لقياس أداء أعمالك بدقة',
      icon: '🎯'
    },
    {
      title: 'توصيات عملية',
      description: 'حصول على 3 قرارات قابلة للتنفيذ فوراً لتحسين أداء عملك',
      icon: '✅'
    },
    {
      title: 'خطة 90 يوم',
      description: 'خطة استراتيجية مفصلة مع أهداف واضحة ومقاييس نجاح',
      icon: '📅'
    },
    {
      title: 'مقارنة مع القطاع',
      description: 'مقارنة أدائك مع متوسط قطاعك في العراق',
      icon: '📈'
    },
    {
      title: 'دعم محلي',
      description: 'فريق دعم متخصص يفهم احتياجات السوق العراقي',
      icon: '🇮🇶'
    }
  ];

  const sectors = [
    'مواد غذائية وبقالة',
    'ملابس وأزياء',
    'إلكترونيات',
    'أثاث ومنزلي',
    'صحة وجمال',
    'خدمات',
    'بناء وتشييد',
    'تجارة عامة'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            من نحن
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            ربح هي منصة ذكية لتشخيص الأعمال مصممة خصيصاً للمؤسسات الصغيرة والمتوسطة في العراق والمنطقة العربية.
            نهدف إلى تمكين رواد الأعمال من خلال توفير أداة سهلة الاستخدام وفعالة لتقييم أداء أعمالهم
            والحصول على توصيات عملية ومخصصة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">رسالتنا</h2>
            <p className="text-gray-600">
              تمكين المؤسسات الصغيرة والمتوسطة في العراق والمنطقة العربية من خلال توفير أدوات ذكية
              تساعدهم على فهم أداء أعمالهم واتخاذ قرارات أفضل لتطويرها ونموها.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">رؤيتنا</h2>
            <p className="text-gray-600">
              أن نكون المنصة الرائدة لتشخيص وتحليل الأعمال في المنطقة العربية، مساهمين في نمو
              واقتصاد المنطقة من خلال تمكين رواد الأعمال.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            ما يميز منصة ربح
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            فريق العمل
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍💼</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-8 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            القطاعات التي نخدمها
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {sectors.map((sector, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            قصتنا
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-600">
            <p>
              بدأت رحلة منصة ربح عندما لاحظنا أن معظم رواد الأعمال في العراق والمنطقة العربية
              يواجهون صعوبة في تقييم أداء أعمالهم بشكل موضوعي. كان هناك نقص في الأدوات
              المحلية التي تفهم احتياجات السوق العربي.
            </p>
            <p>
              لذلك، قررنا إنشاء منصة ربح لتقديم حل ذكي وسهل الاستخدام يساعد رواد الأعمال
              على تشخيص أعمالهم والحصول على توصيات عملية ومخصصة لتحسين أدائهم.
            </p>
            <p>
              اليوم، نفتخر بخدمة مئات المؤسسات الصغيرة والمتوسطة في المنطقة، ونساعدهم
              على تحقيق نمو مستدام من خلال بيانات دقيقة وتوصيات ذكية.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            انضم إلى الآلاف من رواد الأعمال
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            جرب منصة ربح مجاناً اليوم وابدأ في تحسين أداء عملك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
            >
              سجل مجاناً
            </Link>
            <Link
              href="/survey"
              className="inline-block px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors"
            >
              جرب التشخيص
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}