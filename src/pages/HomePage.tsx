// Meridian Growth Advisory - Home Page
// UPDATED: Value-first content, fixed hardcoded EN strings, corrected metrics,
//          replaced fake testimonials with real outcomes, added proof section

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TickerBanner } from '@/components/TickerBanner';
import { CTABand } from '@/components/CTABand';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Building2, ShoppingCart, UtensilsCrossed, Radio, Truck,
  Search, BarChart3, Lightbulb, Rocket,
  TrendingUp, DollarSign, Users, Globe, BarChart2
} from 'lucide-react';

const industryKeys = ['realestate', 'fmcg', 'fnb', 'telecom', 'distribution'] as const;
const industryIcons: Record<string, React.ReactNode> = {
  realestate: <Building2 className="w-8 h-8" />,
  fmcg: <ShoppingCart className="w-8 h-8" />,
  fnb: <UtensilsCrossed className="w-8 h-8" />,
  telecom: <Radio className="w-8 h-8" />,
  distribution: <Truck className="w-8 h-8" />,
};

const processSteps = [
  { icon: Search, titleKey: 'process.step1.title', descKey: 'process.step1.desc', fallbackTitle: 'Discover', fallbackDesc: 'Deep-dive into your business landscape and challenges' },
  { icon: BarChart3, titleKey: 'process.step2.title', descKey: 'process.step2.desc', fallbackTitle: 'Analyze', fallbackDesc: 'Data-driven assessment of opportunities and risks' },
  { icon: Lightbulb, titleKey: 'process.step3.title', descKey: 'process.step3.desc', fallbackTitle: 'Strategize', fallbackDesc: 'Tailored roadmap aligned with your vision' },
  { icon: Rocket, titleKey: 'process.step4.title', descKey: 'process.step4.desc', fallbackTitle: 'Execute', fallbackDesc: 'Hands-on implementation with measurable results' },
];

const proofIcons = [DollarSign, TrendingUp, Users, BarChart2, Globe, BarChart3];

export function HomePage() {
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

  const scrollToDomains = () => {
    document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">

      {/* ─── Hero Section ─── */}
      <section className="navy-grid-bg min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full border border-primary/20 animate-float pointer-events-none" />
        <div className="absolute bottom-32 right-16 w-40 h-40 rounded-full bg-primary/5 animate-float-delayed pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rotate-45 border border-primary/10 animate-float-slow pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="fade-up stagger-1">
                <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30">
                  {gt('hero.eyebrow')}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight fade-up stagger-2">
                {gt('hero.heading')}
                <em className="gradient-text not-italic">{gt('hero.headingEm')}</em>
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-xl fade-up stagger-3">{gt('hero.subheading')}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 fade-up stagger-4">
                <Button size="lg" className="glow-pulse" onClick={() => navigate('/contact')}>{gt('hero.primaryCta')}</Button>
                <Button size="lg" variant="outline" onClick={scrollToDomains} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  {gt('hero.secondaryCta')}
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 fade-up stagger-5">
                <div>
                  <div className="text-3xl font-bold gradient-text">25+</div>
                  <div className="text-sm text-primary-foreground/70">{gt('hero.stats.years')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">15+</div>
                  <div className="text-sm text-primary-foreground/70">{gt('hero.stats.projects')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">4</div>
                  <div className="text-sm text-primary-foreground/70">{gt('hero.stats.countries')}</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block fade-up stagger-3">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
                  alt="Modern business district"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                <Card className="absolute bottom-6 left-6 right-6 glass border-primary-foreground/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary-foreground mb-3">{gt('hero.achievements.title')}</h3>
                    <ul className="space-y-2">
                      {['item1','item2','item3','item4'].map((key) => {
                        const val = gt(`hero.achievements.${key}`);
                        return val ? (
                          <li key={key} className="flex items-start gap-2 text-sm">
                            <span className="text-primary">✓</span>
                            <span className="text-primary-foreground/90">{val}</span>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TickerBanner />

      {/* ─── Why Us / Social Proof — ALL STRINGS VIA gt() ─── */}
      <section className="py-20 gradient-mesh overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">{gt('whyUs.badge')}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{gt('whyUs.heading')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
                statKey: 'whyUs.cards.1.stat',
                titleKey: 'whyUs.cards.1.title',
                descKey: 'whyUs.cards.1.desc',
              },
              {
                img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
                statKey: 'whyUs.cards.2.stat',
                titleKey: 'whyUs.cards.2.title',
                descKey: 'whyUs.cards.2.desc',
              },
              {
                img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop',
                statKey: 'whyUs.cards.3.stat',
                titleKey: 'whyUs.cards.3.title',
                descKey: 'whyUs.cards.3.desc',
              },
            ].map((item, i) => (
              <Card key={i} className="overflow-hidden border-border/50 hover-lift fade-up bg-card/80 backdrop-blur-sm" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={item.img} alt={gt(item.titleKey)} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-2xl font-bold gradient-text">{gt(item.statKey)}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{gt(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{gt(item.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Proof / Real Numbers Section ─── */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">{gt('proof.badge')}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{gt('proof.heading')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((num, idx) => {
              const number = gt(`proof.items.${num}.number`);
              const label = gt(`proof.items.${num}.label`);
              const context = gt(`proof.items.${num}.context`);
              const Icon = proofIcons[idx];
              if (!number) return null;
              return (
                <Card key={num} className="hover-lift fade-up border-border/50 bg-card/60 backdrop-blur-sm" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-3xl font-bold gradient-text">{number}</span>
                    </div>
                    <p className="font-semibold text-foreground text-sm mb-1">{label}</p>
                    <p className="text-xs text-muted-foreground">{context}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Process / Methodology ─── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">{gt('outcomes.badge')}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{gt('outcomes.heading')}</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">{gt('outcomes.subheading')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
            {[1,2,3,4,5].slice(0,4).map((num, i) => {
              const result = gt(`outcomes.items.${num}.result`);
              const proof = gt(`outcomes.items.${num}.proof`);
              const how = gt(`outcomes.items.${num}.how`);
              const Icon = processSteps[i]?.icon || Rocket;
              if (!result) return null;
              return (
                <div key={num} className="text-center fade-up relative" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-6 card-glow">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{result}</h3>
                  <p className="text-sm font-medium text-primary mb-2">{proof}</p>
                  <p className="text-xs text-muted-foreground">{how}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Industries Section ─── */}
      <section id="industries" className="py-20 gradient-mesh">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">{gt('industries.label')}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{gt('industries.heading')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {industryKeys.map((industry, index) => (
              <Card
                key={industry}
                className="card-glow fade-up bg-card/50 backdrop-blur-sm border-border/50"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                    {industryIcons[industry]}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{gt(`industries.cards.${industry}.name`)}</h3>
                  <p className="text-xs text-muted-foreground">{gt(`industries.cards.${industry}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Domains / Problems We Solve Section ─── */}
      <section id="domains" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">{gt('domains.label')}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{gt('domains.heading')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1,2,3,4,5,6,7,8].map((num, idx) => {
              const title = gt(`domains.cards.${num}.title`);
              if (!title) return null;
              return (
                <Card
                  key={num}
                  className="hover-lift shimmer fade-up group overflow-hidden border-border/50"
                  style={{
                    backgroundColor: 'hsl(var(--secondary))',
                    borderRadius: '16px',
                    transitionDelay: `${idx * 100}ms`,
                  }}
                >
                  <CardContent className="p-8" style={{ backgroundColor: 'hsl(var(--secondary))' }}>
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
        </div>
      </section>

      <CTABand />
    </div>
  );
}
