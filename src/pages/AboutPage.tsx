// Meridian Growth Advisory - About Page
// UPDATED: Value-first personal narrative, 4 updated values, corrected metrics

import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CTABand } from '@/components/CTABand';
import { useTranslation } from '@/hooks/useTranslation';
import { Target, Wrench, MapPin, BarChart3 } from 'lucide-react';

const valueIcons = [Target, Wrench, MapPin, BarChart3];

export function AboutPage() {
  const { gt } = useTranslation();
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
      {/* ─── Hero ─── */}
      <section className="navy-grid-bg pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30 mb-6">
            {gt('about.label')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            {gt('about.heading')}
            <em className="gradient-text not-italic">{gt('about.headingEm')}</em>
          </h1>
        </div>
      </section>

      {/* ─── Story + Values ─── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 fade-up">
              <p className="text-lg text-foreground/80 leading-relaxed">{gt('about.body1')}</p>
              <p className="text-lg text-foreground/80 leading-relaxed">{gt('about.body2')}</p>
              <p className="text-xl font-bold text-primary leading-relaxed">{gt('about.body3')}</p>

              {/* ─── Real metrics inline ─── */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { number: '$15M+', label: 'P&L owned' },
                  { number: '25%', label: 'Revenue growth in 6 months' },
                  { number: '35%', label: 'Churn reduction' },
                  { number: '33%', label: 'Cost reduction' },
                ].map((m) => (
                  <div key={m.number} className="bg-secondary rounded-xl p-4">
                    <div className="text-2xl font-bold gradient-text">{m.number}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 fade-up">
              {[1, 2, 3, 4].map((num, idx) => {
                const Icon = valueIcons[idx];
                return (
                  <Card key={num} className="border-border/50 hover-lift">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 text-foreground">{gt(`about.values.${num}.name`)}</h3>
                        <p className="text-muted-foreground text-sm">{gt(`about.values.${num}.description`)}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
