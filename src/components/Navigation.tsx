// Meridian Growth Advisory - Navigation Bar Component

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navigation() {
  const { currentLanguage, languages, setLanguage, contentOverrides } = useApp();
  const { gt } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const enabledLanguages = languages.filter(lang => lang.enabled);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const handleNavClick = (path: string, sectionId?: string) => {
    if (sectionId) {
      scrollToSection(sectionId);
    } else {
      navigate(path);
      setMobileOpen(false);
    }
  };

  const logoText = contentOverrides.logoText || 'Meridian';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      style={{ height: '70px' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-foreground">{logoText}</Link>

        <div className="hidden md:flex items-center gap-8">
          <button type="button" onClick={() => scrollToSection('industries')} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {gt('nav.industries')}
          </button>
          <button type="button" onClick={() => scrollToSection('domains')} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {gt('nav.expertise')}
          </button>
          <button type="button" onClick={() => handleNavClick('/about')} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {gt('nav.about')}
          </button>
        </div>

        <div className="flex items-center gap-4">
          {enabledLanguages.length > 1 && (
            <div className="flex items-center gap-1 bg-muted rounded-full p-1">
              {enabledLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    currentLanguage === lang.code
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          <Button onClick={() => handleNavClick('/contact')} className="hidden md:inline-flex">
            {gt('nav.cta')}
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={currentLanguage === 'ar' || currentLanguage === 'kr' ? 'left' : 'right'}>
              <div className="flex flex-col gap-6 mt-8">
                <button type="button" onClick={() => scrollToSection('industries')} className="text-lg font-medium text-foreground hover:text-primary transition-colors text-start">
                  {gt('nav.industries')}
                </button>
                <button type="button" onClick={() => scrollToSection('domains')} className="text-lg font-medium text-foreground hover:text-primary transition-colors text-start">
                  {gt('nav.expertise')}
                </button>
                <button type="button" onClick={() => handleNavClick('/about')} className="text-lg font-medium text-foreground hover:text-primary transition-colors text-start">
                  {gt('nav.about')}
                </button>
                <Button onClick={() => handleNavClick('/contact')} className="w-full">
                  {gt('nav.cta')}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
