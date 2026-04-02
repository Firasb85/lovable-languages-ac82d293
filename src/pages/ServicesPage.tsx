// Meridian Growth Advisory - Services / Domains Page

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CTABand } from '@/components/CTABand';
import { useTranslation } from '@/hooks/useTranslation';

export function ServicesPage() {
  const { gt } = useTranslation();
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => { observerRef.current?.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen">
      <section className="navy-grid-bg pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30 mb-6">
            {gt('domains.label')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            {gt('domains.heading')}
          </h1>
        </div>
      </section>

      <section className="navy-grid-bg py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1,2,3,4,5,6,7,8].map((num) => {
              const title = gt(`domains.cards.${num}.title`);
              if (!title) return null;
              return (
                <Card key={num} className="hover-lift fade-up group overflow-hidden" style={{ backgroundColor:'rgb(14,54,95)', borderColor:'rgb(51,60,77)', borderWidth:'1px', borderStyle:'solid', borderRadius:'16px', animationDelay: `${num * 50}ms` }}>
                  <CardContent className="p-8" style={{ backgroundColor:'rgb(14,54,95)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl font-bold text-primary/20">0{num}</div>
                      <div className="h-px flex-1 bg-primary/10" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-primary-foreground">{title}</h3>
                    <p className="text-primary-foreground/70 mb-6">{gt(`domains.cards.${num}.description`)}</p>
                    <div className="space-y-5">
                      <div className="border-l-2 border-primary/40 pl-4">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1.5">{gt(`domains.cards.${num}.detail1Title`)}</h4>
                        <p className="text-sm text-primary-foreground/60 leading-relaxed">{gt(`domains.cards.${num}.detail1`)}</p>
                      </div>
                      <div className="border-l-2 border-primary/40 pl-4">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1.5">{gt(`domains.cards.${num}.detail2Title`)}</h4>
                        <p className="text-sm text-primary-foreground/60 leading-relaxed">{gt(`domains.cards.${num}.detail2`)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-16 fade-up">
            <p className="text-lg text-primary-foreground/80 mb-6">{gt('domains.ctaText')}</p>
            <Button size="lg" onClick={() => navigate('/contact')}>{gt('domains.ctaButton')}</Button>
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
