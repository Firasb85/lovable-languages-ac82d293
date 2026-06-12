import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">م</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ربح</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/about" className="text-gray-600 hover:text-primary-600">من نحن</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-primary-600">الأسعار</Link>
              {user ? (
                <Link href="/dashboard" className="px-4 py-2 bg-primary-600 text-white rounded-lg">لوحة التحكم</Link>
              ) : (
                <>
                  <Link href="/login" className="text-gray-600 hover:text-primary-600">تسجيل الدخول</Link>
                  <Link href="/register" className="px-4 py-2 bg-primary-600 text-white rounded-lg">التسجيل</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            أداة تشخيص الأعمال الذكية
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            حدد نقاط القوة والضعف في عملك، احصل على توصيات ذكية، وطور استراتيجية نمو فعالة.
          </p>
          <Link
            href={user ? '/survey' : '/register'}
            className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg text-lg font-semibold hover:bg-primary-700"
          >
            ابدأ التشخيص المجاني
          </Link>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Margin. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}