// Meridian Growth Advisory - CTA Band Component

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';

export function CTABand() {
  const { currentLanguage, contentOverrides } = useApp();
  const navigate = useNavigate();
  const t = translations[currentLanguage] || translations.en;

  const title = contentOverrides.ctaTitle || getTranslation(t, 'cta.title');
  const subtitle = contentOverrides.ctaSubtext || getTranslation(t, 'cta.subtitle');
  const buttonText = contentOverrides.ctaButton || getTranslation(t, 'cta.button');

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=600&fit=crop)',
        }}
      />
      <div className="absolute inset-0 bg-primary/90" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
          {title}
        </h2>
        <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => navigate('/contact')}
          className="text-lg px-8 glow-pulse"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
