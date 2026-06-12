import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function PricingPage() {
  const { user } = useAuth();

  const pricingPlans = [
    {
      id: 'free',
      name: 'المجاني',
      nameEn: 'Free',
      price: '0',
      currency: 'IQD',
      period: 'دائم',
      features: [
        'تشخيص واحد شامل',
        'تقرير واحد قابل للتحميل',
        '3 تقارير مجانية',
        'وصول إلى لوحة التحكم',
        'دعم عبر البريد الإلكتروني'
      ],
      limitations: [
        'حد أقصى 3 تقارير',
        'لا يوجد تصدير إلى PDF'
      ],
      cta: user ? 'بدأ الآن' : 'سجل مجاناً',
      popular: false,
      disabled: user?.subscriptionTier === 'free'
    },
    {
      id: 'premium',
      name: 'المميز',
      nameEn: 'Premium',
      price: '25000',
      currency: 'IQD',
      period: 'شهرياً',
      features: [
        'تشخيصات غير محدودة',
        'تقارير غير محدودة قابلة للتحميل',
        'تصدير إلى PDF',
        'مقارنة مع متوسط القطاع',
        'وصول إلى جميع الميزات',
        'دعم أولوي'
      ],
      limitations: [],
      cta: user ? 'ترقية الآن' : 'اشترك الآن',
      popular: true,
      disabled: user?.subscriptionTier === 'premium'
    },
    {
      id: 'enterprise',
      name: 'المؤسسات',
      nameEn: 'Enterprise',
      price: '150000',
      currency: 'IQD',
      period: 'سنوياً',
      features: [
        'جميع ميزات الباقة المميزة',
        'دعم 24/7',
        'تدريب مخصص',
        'تكامل مع أنظمة أخرى',
        'تخصيص حسب الحاجة'
      ],
      limitations: [],
      cta: 'اتصل بنا',
      popular: false,
      disabled: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            باختيارك الباقة المناسبة
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر الباقة التي تناسب احتياجات عملك وابدأ في تحسين أدائك اليوم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`card ${plan.popular ? 'ring-2 ring-primary-600 ring-opacity-50' : ''}`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-semibold rounded-full">
                    الأكثر شعبية
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm">{plan.nameEn}</p>
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-xl text-gray-500 ml-1">{plan.currency}</span>
                <p className="text-gray-500 text-sm mt-1">{plan.period}</p>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">المميزات:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mb-4 mt-6">القيود:</h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center text-gray-400">
                          <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="text-center">
                {plan.disabled ? (
                  <button
                    disabled
                    className="w-full py-3 px-6 bg-gray-200 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                  >
                    لديك هذه الباقة
                  </button>
                ) : plan.id === 'enterprise' ? (
                  <Link
                    href="/#contact"
                    className="w-full inline-block py-3 px-6 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <Link
                    href={user ? '/dashboard' : '/register'}
                    className="w-full inline-block py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">طرق الدفع المحلية</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            ندعم طرق الدفع المحلية في العراق لتسهيل عملية الشراء
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <span className="font-semibold text-gray-700">ZainCash</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <span className="font-semibold text-gray-700">AsiaHawala</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}