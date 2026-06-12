import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const isActive = (pathname) => {
    return router.pathname === pathname ? 'text-primary-600 font-bold' : 'text-gray-600 hover:text-primary-600';
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">م</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ربح</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={isActive('/')}>الرئيسية</Link>
            <Link href="/about" className={isActive('/about')}>من نحن</Link>
            <Link href="/pricing" className={isActive('/pricing')}>الأسعار</Link>
            {user && <Link href="/survey" className={isActive('/survey')}>التشخيص</Link>}
            {user && <Link href="/dashboard" className={isActive('/dashboard')}>لوحة التحكم</Link>}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  تسجيل الخروج
                </button>
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user.businessName ? user.businessName.charAt(0) : user.email.charAt(0)}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                  تسجيل الدخول
                </Link>
                <Link href="/register" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  التسجيل
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}