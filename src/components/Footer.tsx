// Meridian Growth Advisory - Footer Component

import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';

export function Footer() {
  const { contentOverrides, isAuthenticated } = useApp();
  const { gt } = useTranslation();
  const navigate = useNavigate();

  const logoText = contentOverrides.logoText || 'Meridian';
  const contactEmail = contentOverrides.contactEmail || 'contact@meridian.com';

  const handleAdminClick = () => {
    navigate(isAuthenticated ? '/admin' : '/admin/login');
  };

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-3">{logoText}</h3>
            <p className="text-sm text-secondary-foreground/80">{gt('footer.description')}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">
              {gt('nav.expertise')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  {gt('nav.expertise')}
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  {gt('nav.industries')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider">
              {gt('footer.about')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  {gt('footer.talkToAdvisor')}
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  {contactEmail}
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors inline-flex items-center gap-1"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/60">
            {gt('footer.copyright')}
          </p>
          <button
            type="button"
            onClick={handleAdminClick}
            className="text-xs text-secondary-foreground/20 hover:text-secondary-foreground/40 transition-colors"
          >
            admin
          </button>
        </div>
      </div>
    </footer>
  );
}
