import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">م</span>
              </div>
              <span className="text-xl font-bold text-white">ربح</span>
            </Link>
            <p className="text-gray-400 text-sm">
              أداة تشخيص الأعمال الذكية للمؤسسات الصغيرة والمتوسطة في العراق والمنطقة العربية.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">روابط سريعة</h3>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors text-sm">
                الرئيسية
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors text-sm">
                من نحن
              </Link>
              <Link href="/pricing" className="block text-gray-400 hover:text-white transition-colors text-sm">
                الأسعار
              </Link>
              <Link href="/survey" className="block text-gray-400 hover:text-white transition-colors text-sm">
                التشخيص
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">الدعم</h3>
            <nav className="space-y-2">
              <Link href="/#faq" className="block text-gray-400 hover:text-white transition-colors text-sm">
                الأسئلة الشائعة
              </Link>
              <Link href="/#contact" className="block text-gray-400 hover:text-white transition-colors text-sm">
                تواصل معنا
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">طرق الدفع</h3>
            <div className="flex space-x-2">
              <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400">ZainCash</span>
              </div>
              <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400">AsiaHawala</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            © {currentYear} Margin. جميع الحقوق محفوظة. | تم تطويره في العراق
          </p>
        </div>
      </div>
    </footer>
  );
}