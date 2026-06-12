import { useState, useEffect } from 'react';

let toastId = 0;

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    window.toast = {
      success: (message, messageAr = '') => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, type: 'success', message, messageAr, ar: true }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
      },
      error: (message, messageAr = '') => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, type: 'error', message, messageAr, ar: true }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
      },
      info: (message, messageAr = '') => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, type: 'info', message, messageAr, ar: true }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
      },
      warning: (message, messageAr = '') => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, type: 'warning', message, messageAr, ar: true }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
      }
    };
  }, []);

  const getToastStyles = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✗';
      case 'warning': return '⚠';
      case 'info': default: return 'ℹ';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg border-l-4 ${getToastStyles(toast.type)} shadow-md animate-toastIn`}
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getIcon(toast.type)}</span>
            <div>
              {toast.ar && toast.messageAr && (
                <p className="font-semibold">{toast.messageAr}</p>
              )}
              {toast.message && (
                <p className="text-sm">{toast.message}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes toastIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-toastIn { animation: toastIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}