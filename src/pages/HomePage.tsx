// Meridian Growth Advisory - Home Page

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TickerBanner } from '@/components/TickerBanner';
import { CTABand } from '@/components/CTABand';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import {
  Building2, ShoppingCart, UtensilsCrossed, Radio, Truck,
  Search, BarChart3, Lightbulb, Rocket,
  Quote
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
  { icon: Search, title: 'Discover', desc: 'Deep-dive into your business landscape and challenges' },
  { icon: BarChart3, title: 'Analyze', desc: 'Data-driven assessment of opportunities and risks' },
  { icon: Lightbulb, title: 'Strategize', desc: 'Tailored roadmap aligned with your vision' },
  { icon: Rocket, title: 'Execute', desc: 'Hands-on implementation with measurable results' },
];

const testimonials = [
  {
    quote: 'Meridian transformed our market entry strategy. Their regional expertise was invaluable.',
    name: 'Sarah Al-Rashid',
    role: 'CEO, Gulf Properties',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
  },
  {
    quote: 'The team delivered actionable insights that drove 40% revenue growth in 18 months.',
    name: 'Ahmad Hassan',
    role: 'COO, Levant Distribution',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
  },
  {
    quote: 'Professional, thorough, and deeply committed to our success. A true strategic partner.',
    name: 'Layla Mahmoud',
    role: 'VP Strategy, TelcoConnect',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
  },
];

export function HomePage() {
  const { currentLanguage, contentOverrides } = useApp();
  const navigate = useNavigate();
  const t = translations[currentLanguage] || translations.en;
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

  const heroHeading = contentOverrides.heroHeading || getTranslation(t, 'hero.heading');
  const heroSubheading = contentOverrides.heroSubheading || getTranslation(t, 'hero.subheading');
  const heroPrimaryCta = contentOverrides.heroPrimaryCta || getTranslation(t, 'hero.primaryCta');
  const heroSecondaryCta = contentOverrides.heroSecondaryCta || getTranslation(t, 'hero.secondaryCta');
  const industriesLabel = contentOverrides.industriesLabel || getTranslation(t, 'industries.label');
  const industriesHeading = contentOverrides.industriesHeading || getTranslation(t, 'industries.heading');
  const domainsData = (t as any).domains || {};
  const domainsLabel = domainsData.label || 'Our Expertise';
  const domainsHeading = domainsData.heading || 'Our Domain Expertise';

  return (
    <div className="min-h-screen">
      {/* ─── Hero Section ─── */}
      <section className="navy-grid-bg min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full border border-primary/20 animate-float pointer-events-none" />
        <div className="absolute bottom-32 right-16 w-40 h-40 rounded-full bg-primary/5 animate-float-delayed pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rotate-45 border border-primary/10 animate-float-slow pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Hero text with staggered animations */}
            <div className="space-y-6">
              <div className="fade-up stagger-1">
                <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30">
                  {getTranslation(t, 'hero.eyebrow')}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight fade-up stagger-2">
                {heroHeading}
                <em className="gradient-text not-italic">{getTranslation(t, 'hero.headingEm')}</em>
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-xl fade-up stagger-3">{heroSubheading}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 fade-up stagger-4">
                <Button size="lg" className="glow-pulse" onClick={() => navigate('/contact')}>{heroPrimaryCta}</Button>
                <Button size="lg" variant="outline" onClick={scrollToDomains} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  {heroSecondaryCta}
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 fade-up stagger-5">
                <div>
                  <div className="text-3xl font-bold gradient-text">25+</div>
                  <div className="text-sm text-primary-foreground/70">{getTranslation(t, 'hero.stats.years')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">32+</div>
                  <div className="text-sm text-primary-foreground/70">{getTranslation(t, 'hero.stats.projects')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">4</div>
                  <div className="text-sm text-primary-foreground/70">{getTranslation(t, 'hero.stats.countries')}</div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="hidden md:block fade-up stagger-3">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="Modern business office"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                <Card className="absolute bottom-6 left-6 right-6 glass border-primary-foreground/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-primary-foreground mb-3">{getTranslation(t, 'hero.achievements.title')}</h3>
                    <ul className="space-y-2">
                      {['item1','item2','item3','item4'].map((key) => {
                        const val = getTranslation(t, `hero.achievements.${key}`);
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

      {/* ─── Why Meridian / Social Proof ─── */}
      <section className="py-20 gradient-mesh overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Why Us</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Built on Trust & Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
                title: 'Strategic Vision',
                stat: '25+ Years',
                desc: 'Of combined advisory experience across MENA markets',
              },
              {
                img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
                title: 'Proven Impact',
                stat: '32+ Projects',
                desc: 'Delivered with measurable business transformation',
              },
              {
                img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
                title: 'Regional Reach',
                stat: '4 Countries',
                desc: 'Deep local knowledge with international standards',
              },
            ].map((item, i) => (
              <Card key={item.title} className="overflow-hidden border-border/50 hover-lift fade-up bg-card/80 backdrop-blur-sm" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-2xl font-bold gradient-text">{item.stat}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process / Methodology ─── */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Our Approach</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">How We Deliver Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center fade-up relative" style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-6 card-glow">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">Step {i + 1}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
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
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">{industriesLabel}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{industriesHeading}</h2>
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
                  <h3 className="text-lg font-bold mb-2 text-foreground">{getTranslation(t, `industries.cards.${industry}.name`)}</h3>
                  <p className="text-xs text-muted-foreground">{getTranslation(t, `industries.cards.${industry}.description`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Domains Section ─── */}
      <section id="domains" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">{domainsLabel}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{domainsHeading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1,2,3,4,5,6,7,8].map((num, idx) => {
              const cards = domainsData.cards;
              if (!cards) return null;
              const card = cards[num];
              if (!card) return null;
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
                    <h3 className="text-xl font-bold mb-3 text-primary-foreground">{card.title}</h3>
                    <p className="text-primary-foreground/70 mb-6">{card.description}</p>
                    <div className="space-y-5">
                      <div className="border-l-2 border-primary/40 pl-4">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1.5">{card.detail1Title}</h4>
                        <p className="text-sm text-primary-foreground/60 leading-relaxed">{card.detail1}</p>
                      </div>
                      <div className="border-l-2 border-primary/40 pl-4">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1.5">{card.detail2Title}</h4>
                        <p className="text-sm text-primary-foreground/60 leading-relaxed">{card.detail2}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-up">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Testimonials</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, i) => (
              <Card
                key={item.name}
                className="hover-lift fade-up bg-card/60 backdrop-blur-sm border-border/50"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-primary/40 mb-4" />
                  <p className="text-foreground/80 mb-6 leading-relaxed italic">"{item.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" />
                    <div>
                      <div className="font-bold text-foreground">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.role}</div>
                    </div>
                  </div>
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
