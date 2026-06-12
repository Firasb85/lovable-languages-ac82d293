import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.errorAr || 'حدث خطأ أثناء تسجيل الدخول');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-12">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">تسجيل الدخول</h1>
            <p className="text-gray-500 mt-2">سجل دخولك لحسابك</p>
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
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              className="w-full btn btn-primary"
              disabled={loading}
            >
              {loading ? 'جاري التسجيل...' : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500">
            ليس لديك حساب؟{' '}
            <Link href="/register" className="text-primary-600 hover:underline">
              سجل الآن
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}