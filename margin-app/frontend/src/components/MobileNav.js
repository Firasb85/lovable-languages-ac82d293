import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function MobileNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (pathname) => {
    return router.pathname === pathname ? 'bg-primary-50 text-primary-600 font-bold' : 'text-gray-600';
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}>
          <div
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl p-6 transform translate-x-0 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center space-x-2" onClick={toggleMenu}>
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">م</span>
                </div>
                <span className="text-xl font-bold text-gray-900">ربح</span>
              </Link>
              <button onClick={toggleMenu} className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-4">
              <Link className={`block py-2 px-4 rounded-lg ${isActive('/')}`} onClick={toggleMenu} href="/">الرئيسية</Link>
              <Link className={`block py-2 px-4 rounded-lg ${isActive('/about')}`} onClick={toggleMenu} href="/about">من نحن</Link>
              <Link className={`block py-2 px-4 rounded-lg ${isActive('/pricing')}`} onClick={toggleMenu} href="/pricing">الأسعار</Link>
              {user && <Link className={`block py-2 px-4 rounded-lg ${isActive('/survey')}`} onClick={toggleMenu} href="/survey">التشخيص</Link>}
              {user && <Link className={`block py-2 px-4 rounded-lg ${isActive('/dashboard')}`} onClick={toggleMenu} href="/dashboard">لوحة التحكم</Link>}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.businessName ? user.businessName.charAt(0) : user.email.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{user.businessName || user.email}</p>
                      <p className="text-sm text-gray-500">{user.subscriptionTier === 'premium' ? 'باقة مميزة' : 'باقة مجانية'}</p>
                    </div>
                  </div>
                  <button onClick={() => { logout(); toggleMenu(); }} className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <Link className="block w-full py-2 px-4 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" onClick={toggleMenu} href="/login">تسجيل الدخول</Link>
                  <Link className="block w-full py-2 px-4 text-center bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors" onClick={toggleMenu} href="/register">التسجيل</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}