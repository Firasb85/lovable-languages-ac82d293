// Meridian Growth Advisory - Industries Page

import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TickerBanner } from '@/components/TickerBanner';
import { CTABand } from '@/components/CTABand';
import { useTranslation } from '@/hooks/useTranslation';
import { Building2, ShoppingCart, UtensilsCrossed, Radio, Truck } from 'lucide-react';

const industryKeys = ['realestate', 'fmcg', 'fnb', 'telecom', 'distribution'] as const;
const industryIcons: Record<string, React.ReactNode> = {
  realestate: <Building2 className="w-10 h-10" />,
  fmcg: <ShoppingCart className="w-10 h-10" />,
  fnb: <UtensilsCrossed className="w-10 h-10" />,
  telecom: <Radio className="w-10 h-10" />,
  distribution: <Truck className="w-10 h-10" />,
};

export function IndustriesPage() {
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
      <section className="navy-grid-bg pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30 mb-6">
            {gt('industries.label')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            {gt('industries.heading')}
          </h1>
        </div>
      </section>

      <TickerBanner />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {industryKeys.map((industry, index) => (
              <Card key={industry} className="card-glow hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                    {industryIcons[industry]}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{gt(`industries.cards.${industry}.name`)}</h3>
                  <p className="text-sm opacity-80">{gt(`industries.cards.${industry}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
