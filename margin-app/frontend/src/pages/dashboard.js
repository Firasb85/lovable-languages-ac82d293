import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    try {
      const res = await axios.get('/api/reports', { withCredentials: true });
      setReports(res.data.reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-500">مرحباً, {user.businessName || user.email}</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/survey" className="btn btn-primary">إنشاء تقرير جديد</Link>
            <button onClick={logout} className="btn bg-gray-200 text-gray-700">
              تسجيل الخروج
            </button>
          </div>
        </div>

        {/* User Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">الباقة الحالية</h2>
            <p className="text-2xl font-bold">
              {user.subscriptionTier === 'premium' ? 'المميزة' : user.subscriptionTier === 'enterprise' ? 'المؤسسات' : 'المجانية'}
            </p>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">عدد التقارير</h2>
            <p className="text-2xl font-bold">{reports.length} / {user.maxReports}</p>
            <progress 
              className="w-full h-2 rounded-full mt-2" 
              value={(reports.length / user.maxReports) * 100}
              max="100"
            />
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">القطاع</h2>
            <p className="text-xl">{user.sector}</p>
            <p className="text-sm text-gray-500">عمر العمل: {user.businessAge} سنوات</p>
          </div>
        </div>

        {/* Reports List */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">التقارير السابقة</h2>
            <Link href="/pricing" className="text-primary-600 hover:underline">
              ترقية الباقة
            </Link>
          </div>
          
          {loading ? (
            <p>جاري تحميل التقارير...</p>
          ) : reports.length === 0 ? (
            <p className="text-gray-500">لا يوجد تقارير بعد. <Link href="/survey" className="text-primary-600">أنشئ أول تقرير</Link></p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-4 font-semibold text-gray-900">العنوان</th>
                    <th className="text-right p-4 font-semibold text-gray-900">الدرجة</th>
                    <th className="text-right p-4 font-semibold text-gray-900">مستوى المخاطر</th>
                    <th className="text-right p-4 font-semibold text-gray-900">التاريخ</th>
                    <th className="text-right p-4 font-semibold text-gray-900">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b">
                      <td className="p-4">{report.title}</td>
                      <td className="p-4">{report.overallScore}/50</td>
                      <td className="p-4">{report.riskLevelAr || report.riskLevel}</td>
                      <td className="p-4">{new Date(report.createdAt).toLocaleDateString('ar-IQ')}</td>
                      <td className="p-4">
                        <Link 
                          href={`/report/${report.id}`} 
                          className="text-primary-600 hover:underline"
                        >
                          عرض
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}