import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';

export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setLoading(true);
    };
    const handleRouteComplete = (url) => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);
    router.events.on('routeChangeError', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);
      router.events.off('routeChangeError', handleRouteComplete);
    };
  }, [router.events]);

  const noLayoutPages = ['/login', '/register'];
  const shouldShowLayout = !noLayoutPages.includes(router.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <LoadingScreen />}
      {shouldShowLayout && <Navbar />}
      <main className={shouldShowLayout ? "pt-16" : ""}>{children}</main>
      {shouldShowLayout && <Footer />}
    </div>
  );
}