// Meridian Growth Advisory - Contact Page
// UPDATED: Reframed as "Book a Discovery Session", real contact info added,
//          WhatsApp CTA, updated geographic coverage

import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';
import { useApp } from '@/contexts/AppContext';
import { Mail, Phone, Globe, MessageCircle, CheckCircle } from 'lucide-react';

export function ContactPage() {
  const { gt } = useTranslation();
  const { language, addRequest } = useApp();
  const isRTL = language === 'ar' || language === 'kr';
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [form, setForm] = useState({
    fullName: '', company: '', email: '', phone: '', objective: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    observerRef.current = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }); },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observerRef.current?.observe(el));
    return () => { observerRef.current?.disconnect(); };
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    if (!form.objective.trim()) errs.objective = 'Required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    addRequest?.({ ...form, files: files.map((f) => f.name), date: new Date().toISOString(), status: 'new' });
    setSubmitting(false);
    setSubmitted(true);
  };

  // Real contact details
  const contactEmail = 'rafi6630@aol.com';
  const contactPhone = '+964 750 677 7762';
  const whatsappLink = 'https://wa.me/9647506777762';

  return (
    <div className="min-h-screen">
      {/* ─── Header ─── */}
      <section className="navy-grid-bg pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30 mb-6">
            {gt('contact.heading')}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            {gt('contact.info.title')}
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto">
            {gt('contact.info.subtitle')}
          </p>
        </div>
      </section>

      {/* ─── Contact Info + Form ─── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* ─── Left: Info ─── */}
            <div className="space-y-8 fade-up">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{gt('contact.info.email')}</p>
                  <a href={`mailto:${contactEmail}`} className="text-foreground font-semibold hover:text-primary transition-colors">
                    {contactEmail}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{gt('contact.info.phone')}</p>
                  <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="text-foreground font-semibold hover:text-primary transition-colors">
                    {contactPhone}
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="w-full gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white border-0">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>

              {/* Coverage */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{gt('contact.info.coverage')}</p>
                  <p className="text-foreground font-semibold">{gt('contact.info.coverageValue')}</p>
                </div>
              </div>

              {/* What to expect */}
              <div className="bg-secondary rounded-xl p-6 space-y-3">
                <p className="font-semibold text-foreground text-sm">What happens next:</p>
                {[
                  'I review your submission within 24 hours',
                  'We schedule a free 30-minute discovery call',
                  'I outline a potential path forward — at no cost',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Right: Form ─── */}
            <div className="fade-up">
              {submitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{gt('contact.success.title')}</h3>
                  <p className="text-muted-foreground">{gt('contact.success.message')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 bg-secondary p-8 rounded-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{gt('contact.form.fullName')}</Label>
                      <Input
                        id="fullName"
                        placeholder={gt('contact.form.fullNamePlaceholder')}
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className={errors.fullName ? 'border-red-500' : ''}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">{gt('contact.form.company')}</Label>
                      <Input
                        id="company"
                        placeholder={gt('contact.form.companyPlaceholder')}
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{gt('contact.form.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={gt('contact.form.emailPlaceholder')}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={errors.email ? 'border-red-500' : ''}
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{gt('contact.form.phone')}</Label>
                      <Input
                        id="phone"
                        placeholder={gt('contact.form.phonePlaceholder')}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objective">{gt('contact.form.objective')}</Label>
                    <Textarea
                      id="objective"
                      placeholder={gt('contact.form.objectivePlaceholder')}
                      value={form.objective}
                      onChange={(e) => setForm({ ...form, objective: e.target.value })}
                      className={`min-h-[120px] ${errors.objective ? 'border-red-500' : ''}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attachments">{gt('contact.form.attachments')}</Label>
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    />
                    <p className="text-xs text-muted-foreground">{gt('contact.form.attachmentsHint')}</p>
                  </div>

                  <Button type="submit" size="lg" className="w-full glow-pulse" disabled={submitting}>
                    {submitting ? gt('contact.form.submitting') : gt('contact.form.submit')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
