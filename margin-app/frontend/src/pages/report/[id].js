import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function ReportPage() {
  const router = useRouter();
  const { id } = router.query;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchReport();
    }
  }, [id]);

  const fetchReport = async () => {
    try {
      const res = await axios.get(`/api/reports/${id}`, { withCredentials: true });
      setReport(res.data.report);
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  if (!report) return <div className="min-h-screen flex items-center justify-center">التقرير غير موجود</div>;

  const axisNames = {
    revenue: 'الإيرادات',
    customers: 'العملاء',
    competition: 'التنافس',
    internal: 'العمليات الداخلية',
    marketing: 'التسويق'
  };

  const levelNames = {
    excellent: 'ممتاز',
    good: 'جيد',
    average: 'متوسط',
    below_average: 'أقل من المتوسط',
    poor: 'ضعيف'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="card">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">التقرير التشخيصي</h1>
              <p className="text-gray-500 mt-1">
                {new Date(report.createdAt).toLocaleDateString('ar-IQ')}
              </p>
            </div>
            <Link href="/dashboard" className="btn bg-gray-200 text-gray-700">
              العودة إلى لوحة التحكم
            </Link>
          </div>

          {/* Overall Score */}
          <section className="mb-8 p-6 bg-primary-50 rounded-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">الدرجة الإجمالية</h2>
            <div className="text-center">
              <div className="text-6xl font-bold text-primary-600 mb-2">
                {report.overallScore}/50
              </div>
              <div className="text-lg">
                مستوى المخاطر: 
                <span className="font-bold">
                  {report.riskLevelAr || report.riskLevel}
                </span>
              </div>
            </div>
          </section>

          {/* Axis Scores */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">الدرجات حسب المحاور</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(report.axisScores || {}).map(([axis, data]) => (
                <div key={axis} className="card text-center">
                  <h3 className="font-semibold text-gray-900">{axisNames[axis] || axis}</h3>
                  <div className="text-3xl font-bold text-primary-600 my-2">
                    {data.score.toFixed(1)}/10
                  </div>
                  <p className="text-sm text-gray-500">{levelNames[data.level] || data.level}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Diagnosis */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">التشخيص</h2>
            <div className="space-y-4">
              {Object.entries(report.diagnosis?.axes || {}).map(([axis, data]) => (
                <div key={axis} className="card">
                  <h3 className="font-semibold text-gray-900 mb-2">{axisNames[axis] || axis}</h3>
                  <p className="text-gray-700">{data.diagnosis}</p>
                  <ul className="mt-2 space-y-1">
                    {data.recommendations.map((rec, i) => (
                      <li key={i} className="text-sm text-gray-600">• {rec}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Actionable Decisions */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">قرارات قابلة للتنفيذ</h2>
            <div className="space-y-4">
              {report.actionableDecisions?.map((decision, index) => (
                <div key={index} className="card">
                  <h3 className="font-semibold text-gray-900">{decision.title}</h3>
                  <p className="text-gray-700 mt-2">{decision.description}</p>
                  <div className="mt-4 flex space-x-4 text-sm">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      أولوية: {decision.priority === 'high' ? 'عالية' : 'متوسطة'}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                      تأثير: {decision.impact}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                      جهد: {decision.effort}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 90-Day Plan */}
          <section className="mb-8 p-6 bg-gray-100 rounded-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">الخطة لمدة 90 يوم</h2>
            <p className="text-gray-700">{report.ninetyDayPlan?.description}</p>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900">الموارد المطلوبة:</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {report.ninetyDayPlan?.resourcesNeeded?.map((resource, i) => (
                  <li key={i}>{resource}</li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-gray-600">
              التكلفة التقديرية: {report.ninetyDayPlan?.estimatedCost}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}