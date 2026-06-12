import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

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

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: '',
    sector: '',
    businessAge: '',
    location: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.errorAr || 'حدث خطأ أثناء التسجيل');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-12">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">التسجيل</h1>
            <p className="text-gray-500 mt-2">أنشئ حسابك مجاناً</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.email}
                onChange={handleChange}
                required
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                كلمة المرور
              </label>
              <input
                type="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.password}
                onChange={handleChange}
                required
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                اسم العمل
              </label>
              <input
                type="text"
                name="businessName"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                القطاع
              </label>
              <select
                name="sector"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.sector}
                onChange={handleChange}
                required
              >
                <option value="">اختر القطاع</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                عمر العمل (سنوات)
              </label>
              <input
                type="number"
                name="businessAge"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.businessAge}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                الموقع
              </label>
              <input
                type="text"
                name="location"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                الهاتف
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.phone}
                onChange={handleChange}
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              className="w-full btn btn-primary"
              disabled={loading}
            >
              {loading ? 'جاري التسجيل...' : 'التسجيل'}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="text-primary-600 hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}