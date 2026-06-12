import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
        <span className="text-white text-4xl font-bold">م</span>
      </div>
      <p className="text-xl text-gray-700 font-semibold">
        جاري التحميل{dots}
      </p>
      <div className="mt-6 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-primary-600 rounded-full animate-loadingBar"></div>
      </div>
      <style jsx>{`
        @keyframes loadingBar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-loadingBar {
          animation: loadingBar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}