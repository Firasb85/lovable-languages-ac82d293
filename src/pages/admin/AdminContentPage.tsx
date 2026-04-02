// Meridian Growth Advisory - Admin Content Management Panel
// Per-language content editing for all website sections

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { useApp } from '@/contexts/AppContext';
import { translations, getTranslation } from '@/i18n/translations';
import { toast } from 'sonner';
import { Save, Globe, RotateCcw } from 'lucide-react';

// Define all editable content sections with their translation keys
const contentSections = [
  {
    id: 'brand',
    label: 'Brand & Navigation',
    fields: [
      { key: 'nav.industries', label: 'Nav: Industries', type: 'input' },
      { key: 'nav.expertise', label: 'Nav: Expertise', type: 'input' },
      { key: 'nav.about', label: 'Nav: About', type: 'input' },
      { key: 'nav.cta', label: 'Nav: CTA Button', type: 'input' },
    ],
  },
  {
    id: 'hero',
    label: 'Hero Section',
    fields: [
      { key: 'hero.eyebrow', label: 'Eyebrow Tag', type: 'input' },
      { key: 'hero.heading', label: 'Main Heading', type: 'input' },
      { key: 'hero.headingEm', label: 'Heading Emphasis', type: 'input' },
      { key: 'hero.subheading', label: 'Subheading', type: 'textarea' },
      { key: 'hero.primaryCta', label: 'Primary CTA Button', type: 'input' },
      { key: 'hero.secondaryCta', label: 'Secondary CTA Button', type: 'input' },
      { key: 'hero.stats.years', label: 'Stat: Years Label', type: 'input' },
      { key: 'hero.stats.projects', label: 'Stat: Projects Label', type: 'input' },
      { key: 'hero.stats.countries', label: 'Stat: Countries Label', type: 'input' },
      { key: 'hero.achievements.title', label: 'Achievements Title', type: 'input' },
      { key: 'hero.achievements.item1', label: 'Achievement 1', type: 'input' },
      { key: 'hero.achievements.item2', label: 'Achievement 2', type: 'input' },
      { key: 'hero.achievements.item3', label: 'Achievement 3', type: 'input' },
      { key: 'hero.achievements.item4', label: 'Achievement 4', type: 'input' },
    ],
  },
  {
    id: 'industries',
    label: 'Industries Section',
    fields: [
      { key: 'industries.label', label: 'Section Label', type: 'input' },
      { key: 'industries.heading', label: 'Section Heading', type: 'input' },
      { key: 'industries.cards.realestate.name', label: 'Real Estate: Name', type: 'input' },
      { key: 'industries.cards.realestate.description', label: 'Real Estate: Description', type: 'textarea' },
      { key: 'industries.cards.fmcg.name', label: 'FMCG: Name', type: 'input' },
      { key: 'industries.cards.fmcg.description', label: 'FMCG: Description', type: 'textarea' },
      { key: 'industries.cards.fnb.name', label: 'F&B: Name', type: 'input' },
      { key: 'industries.cards.fnb.description', label: 'F&B: Description', type: 'textarea' },
      { key: 'industries.cards.telecom.name', label: 'Telecom: Name', type: 'input' },
      { key: 'industries.cards.telecom.description', label: 'Telecom: Description', type: 'textarea' },
      { key: 'industries.cards.distribution.name', label: 'Distribution: Name', type: 'input' },
      { key: 'industries.cards.distribution.description', label: 'Distribution: Description', type: 'textarea' },
    ],
  },
  {
    id: 'domains',
    label: 'Expertise / Services',
    fields: [
      { key: 'domains.label', label: 'Section Label', type: 'input' },
      { key: 'domains.heading', label: 'Section Heading', type: 'input' },
      { key: 'domains.ctaText', label: 'CTA Text', type: 'input' },
      { key: 'domains.ctaButton', label: 'CTA Button', type: 'input' },
      ...([1,2,3,4,5,6,7,8].flatMap(num => [
        { key: `domains.cards.${num}.title`, label: `Domain ${num}: Title`, type: 'input' as const },
        { key: `domains.cards.${num}.description`, label: `Domain ${num}: Description`, type: 'textarea' as const },
        { key: `domains.cards.${num}.detail1Title`, label: `Domain ${num}: Detail 1 Title`, type: 'input' as const },
        { key: `domains.cards.${num}.detail1`, label: `Domain ${num}: Detail 1`, type: 'textarea' as const },
        { key: `domains.cards.${num}.detail2Title`, label: `Domain ${num}: Detail 2 Title`, type: 'input' as const },
        { key: `domains.cards.${num}.detail2`, label: `Domain ${num}: Detail 2`, type: 'textarea' as const },
      ])),
    ],
  },
  {
    id: 'about',
    label: 'About Page',
    fields: [
      { key: 'about.label', label: 'Section Label', type: 'input' },
      { key: 'about.heading', label: 'Main Heading', type: 'input' },
      { key: 'about.headingEm', label: 'Heading Emphasis', type: 'input' },
      { key: 'about.body1', label: 'Body Paragraph 1', type: 'textarea' },
      { key: 'about.body2', label: 'Body Paragraph 2', type: 'textarea' },
      { key: 'about.body3', label: 'Body Paragraph 3', type: 'textarea' },
      { key: 'about.values.1.name', label: 'Value 1: Name', type: 'input' },
      { key: 'about.values.1.description', label: 'Value 1: Description', type: 'textarea' },
      { key: 'about.values.2.name', label: 'Value 2: Name', type: 'input' },
      { key: 'about.values.2.description', label: 'Value 2: Description', type: 'textarea' },
      { key: 'about.values.3.name', label: 'Value 3: Name', type: 'input' },
      { key: 'about.values.3.description', label: 'Value 3: Description', type: 'textarea' },
      { key: 'about.values.4.name', label: 'Value 4: Name', type: 'input' },
      { key: 'about.values.4.description', label: 'Value 4: Description', type: 'textarea' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact Page',
    fields: [
      { key: 'contact.heading', label: 'Page Heading', type: 'input' },
      { key: 'contact.info.title', label: 'Info Panel Title', type: 'input' },
      { key: 'contact.info.subtitle', label: 'Info Panel Subtitle', type: 'textarea' },
      { key: 'contact.info.email', label: 'Email Label', type: 'input' },
      { key: 'contact.info.phone', label: 'Phone Label', type: 'input' },
      { key: 'contact.info.coverage', label: 'Coverage Label', type: 'input' },
      { key: 'contact.info.coverageValue', label: 'Coverage Value', type: 'input' },
      { key: 'contact.form.fullName', label: 'Form: Full Name Label', type: 'input' },
      { key: 'contact.form.fullNamePlaceholder', label: 'Form: Full Name Placeholder', type: 'input' },
      { key: 'contact.form.company', label: 'Form: Company Label', type: 'input' },
      { key: 'contact.form.companyPlaceholder', label: 'Form: Company Placeholder', type: 'input' },
      { key: 'contact.form.email', label: 'Form: Email Label', type: 'input' },
      { key: 'contact.form.emailPlaceholder', label: 'Form: Email Placeholder', type: 'input' },
      { key: 'contact.form.phone', label: 'Form: Phone Label', type: 'input' },
      { key: 'contact.form.phonePlaceholder', label: 'Form: Phone Placeholder', type: 'input' },
      { key: 'contact.form.objective', label: 'Form: Objective Label', type: 'input' },
      { key: 'contact.form.objectivePlaceholder', label: 'Form: Objective Placeholder', type: 'input' },
      { key: 'contact.form.attachments', label: 'Form: Attachments Label', type: 'input' },
      { key: 'contact.form.submit', label: 'Form: Submit Button', type: 'input' },
      { key: 'contact.success.title', label: 'Success: Title', type: 'input' },
      { key: 'contact.success.message', label: 'Success: Message', type: 'textarea' },
    ],
  },
  {
    id: 'cta',
    label: 'CTA Band',
    fields: [
      { key: 'cta.title', label: 'CTA Title', type: 'input' },
      { key: 'cta.subtitle', label: 'CTA Subtitle', type: 'textarea' },
      { key: 'cta.button', label: 'CTA Button Text', type: 'input' },
    ],
  },
  {
    id: 'footer',
    label: 'Footer',
    fields: [
      { key: 'footer.description', label: 'Footer Description', type: 'textarea' },
      { key: 'footer.services', label: 'Services Link', type: 'input' },
      { key: 'footer.about', label: 'About Link', type: 'input' },
      { key: 'footer.talkToAdvisor', label: 'Talk to Advisor Link', type: 'input' },
      { key: 'footer.copyright', label: 'Copyright Text', type: 'input' },
    ],
  },
];

export function AdminContentPage() {
  const {
    languages,
    languageTranslationOverrides,
    updateLanguageTranslation,
    updateContentOverrides,
    contentOverrides,
  } = useApp();

  const enabledLanguages = languages.filter(l => l.enabled);
  const [selectedLang, setSelectedLang] = useState(enabledLanguages[0]?.code || 'ar');
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [brandData, setBrandData] = useState({ logoText: '', contactEmail: '', contactPhone: '', contactWhatsapp: '' });

  // Load overrides when language changes
  useEffect(() => {
    setOverrides(languageTranslationOverrides[selectedLang] || {});
  }, [selectedLang, languageTranslationOverrides]);

  // Load brand data
  useEffect(() => {
    setBrandData({
      logoText: contentOverrides.logoText || '',
      contactEmail: contentOverrides.contactEmail || '',
      contactPhone: contentOverrides.contactPhone || '',
      contactWhatsapp: contentOverrides.contactWhatsapp || '',
    });
  }, [contentOverrides]);

  const getBaseValue = (key: string, langCode: string): string => {
    const langTranslations = translations[langCode] || translations.en;
    return getTranslation(langTranslations, key);
  };

  const handleChange = (key: string, value: string) => {
    setOverrides(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateLanguageTranslation(selectedLang, overrides);
    updateContentOverrides(brandData);
    toast.success(`Content saved for ${selectedLang.toUpperCase()}!`);
  };

  const handleReset = (sectionId: string) => {
    const section = contentSections.find(s => s.id === sectionId);
    if (!section) return;
    const newOverrides = { ...overrides };
    section.fields.forEach(f => { delete newOverrides[f.key]; });
    setOverrides(newOverrides);
    toast.info(`${section.label} reset to defaults for ${selectedLang.toUpperCase()}`);
  };

  return (
    <AdminLayout title="Content Management">
      <div className="max-w-5xl space-y-6">
        {/* Top bar: language selector + save */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-10 bg-background py-3 border-b border-border -mx-6 px-6">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Editing language:</span>
            <div className="flex items-center gap-1 bg-muted rounded-full p-1">
              {enabledLanguages.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setSelectedLang(lang.code)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedLang === lang.code
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang.nativeName} ({lang.code.toUpperCase()})
                </button>
              ))}
            </div>
          </div>
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {/* Brand settings (language-independent) */}
        <Card>
          <CardHeader>
            <CardTitle>Global Brand Settings</CardTitle>
            <CardDescription>These apply across all languages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Logo / Brand Name</Label>
                <Input
                  value={brandData.logoText}
                  onChange={e => setBrandData(prev => ({ ...prev, logoText: e.target.value }))}
                  placeholder="Meridian"
                />
              </div>
              <div>
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  value={brandData.contactEmail}
                  onChange={e => setBrandData(prev => ({ ...prev, contactEmail: e.target.value }))}
                  placeholder="contact@meridian.com"
                />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input
                  value={brandData.contactPhone}
                  onChange={e => setBrandData(prev => ({ ...prev, contactPhone: e.target.value }))}
                  placeholder="+966 XX XXX XXXX"
                />
              </div>
              <div>
                <Label>WhatsApp</Label>
                <Input
                  value={brandData.contactWhatsapp}
                  onChange={e => setBrandData(prev => ({ ...prev, contactWhatsapp: e.target.value }))}
                  placeholder="+966 XX XXX XXXX"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Per-language content sections */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Content for <Badge variant="default">{selectedLang.toUpperCase()}</Badge>
          </h2>
          <p className="text-sm text-muted-foreground">
            Edit text below. Leave empty to use default translation. Changes appear immediately on the website.
          </p>
        </div>

        <Accordion type="multiple" className="w-full space-y-2">
          {contentSections.map(section => (
            <AccordionItem key={section.id} value={section.id} className="border rounded-lg px-4">
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  {section.label}
                  <Badge variant="outline" className="text-xs">
                    {section.fields.filter(f => overrides[f.key]).length}/{section.fields.length} customized
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {section.fields.map(field => {
                    const baseValue = getBaseValue(field.key, selectedLang);
                    const overrideValue = overrides[field.key] || '';
                    return (
                      <div key={field.key} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">{field.label}</Label>
                          <code className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{field.key}</code>
                        </div>
                        {baseValue && (
                          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded line-clamp-2">
                            <strong>Default:</strong> {baseValue}
                          </div>
                        )}
                        {field.type === 'textarea' ? (
                          <Textarea
                            value={overrideValue}
                            onChange={e => handleChange(field.key, e.target.value)}
                            placeholder={baseValue || `Enter ${field.label}...`}
                            className="min-h-[80px]"
                          />
                        ) : (
                          <Input
                            value={overrideValue}
                            onChange={e => handleChange(field.key, e.target.value)}
                            placeholder={baseValue || `Enter ${field.label}...`}
                          />
                        )}
                      </div>
                    );
                  })}
                  <div className="flex justify-end pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReset(section.id)}
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Reset Section
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom save */}
        <div className="flex justify-end pb-8">
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
