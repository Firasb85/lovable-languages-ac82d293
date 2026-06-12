import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SideMenu({ items }) {
  const router = useRouter();

  const isActive = (pathname) => {
    return router.pathname === pathname ? 'bg-primary-50 text-primary-600 font-bold' : 'text-gray-600 hover:bg-gray-50';
  };

  return (
    <div className="w-64 bg-white shadow-sm rounded-lg p-4">
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block py-3 px-4 rounded-lg transition-colors ${isActive(item.path)}`}
          >
            <div className="flex items-center space-x-3">
              {item.icon && <span className="text-lg">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}