// Meridian Growth Advisory - Application Context
// Provides global state: language, auth, requests, CRM, content overrides, translation overrides

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  AppState,
  Language,
  LanguageCode,
  ContactRequest,
  CRMEntry,
  ContentOverrides,
  LanguageTranslationOverrides,
} from '@/types/types';

interface AppContextValue extends AppState {
  setLanguage: (code: LanguageCode) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addRequest: (data: Omit<ContactRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateRequestStatus: (id: string, status: ContactRequest['status']) => void;
  deleteRequest: (id: string) => void;
  convertRequestToCRM: (id: string) => void;
  addCRMEntry: (data: Omit<CRMEntry, 'id' | 'createdAt'>) => void;
  updateCRMEntry: (id: string, data: Partial<Omit<CRMEntry, 'id' | 'createdAt'>>) => void;
  deleteCRMEntry: (id: string) => void;
  updateContentOverrides: (overrides: Partial<ContentOverrides>) => void;
  addLanguage: (lang: Omit<Language, 'default' | 'enabled'>) => void;
  updateLanguage: (code: LanguageCode, data: Partial<Language>) => void;
  deleteLanguage: (code: LanguageCode) => void;
  toggleLanguageEnabled: (code: LanguageCode) => void;
  setDefaultLanguage: (code: LanguageCode) => void;
  updateLanguageTranslation: (langCode: string, keyOrOverrides: string | Record<string, string>, value?: string) => void;
}

const DEFAULT_LANGUAGES: Language[] = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', enabled: true, default: true },
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr', enabled: true, default: false },
  { code: 'kr', name: 'Kurdish Sorani', nativeName: 'کوردی سۆرانی', direction: 'rtl', enabled: true, default: false },
];

const AppContext = createContext<AppContextValue | null>(null);

function genId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('ar');
  const [languages, setLanguages] = useState<Language[]>(DEFAULT_LANGUAGES);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [crmEntries, setCrmEntries] = useState<CRMEntry[]>([]);
  const [contentOverrides, setContentOverrides] = useState<ContentOverrides>({});
  const [languageTranslationOverrides, setLanguageTranslationOverrides] = useState<LanguageTranslationOverrides>({});

  useEffect(() => {
    const lang = languages.find((l) => l.code === currentLanguage);
    const dir = lang?.direction ?? 'rtl';
    document.documentElement.setAttribute('lang', currentLanguage);
    document.documentElement.setAttribute('dir', dir);
  }, [currentLanguage, languages]);

  const setLanguage = (code: LanguageCode) => setCurrentLanguage(code);
  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') { setIsAuthenticated(true); return true; }
    return false;
  };
  const logout = () => setIsAuthenticated(false);

  const addRequest = (data: Omit<ContactRequest, 'id' | 'status' | 'createdAt'>) => {
    setRequests((prev) => [{ ...data, id: genId(), status: 'new', createdAt: new Date() }, ...prev]);
  };
  const updateRequestStatus = (id: string, status: ContactRequest['status']) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };
  const deleteRequest = (id: string) => setRequests((prev) => prev.filter((r) => r.id !== id));
  const convertRequestToCRM = (id: string) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    setCrmEntries((prev) => [{ id: genId(), fullName: req.fullName, company: req.company, email: req.email, phone: req.phone, notes: req.message, createdAt: new Date() }, ...prev]);
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'done' } : r)));
  };

  const addCRMEntry = (data: Omit<CRMEntry, 'id' | 'createdAt'>) => {
    setCrmEntries((prev) => [{ ...data, id: genId(), createdAt: new Date() }, ...prev]);
  };
  const updateCRMEntry = (id: string, data: Partial<Omit<CRMEntry, 'id' | 'createdAt'>>) => {
    setCrmEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
  };
  const deleteCRMEntry = (id: string) => setCrmEntries((prev) => prev.filter((e) => e.id !== id));

  const updateContentOverrides = (overrides: Partial<ContentOverrides>) => {
    setContentOverrides((prev) => ({ ...prev, ...overrides }));
  };

  const addLanguage = (lang: Omit<Language, 'default' | 'enabled'>) => {
    setLanguages((prev) => [...prev, { ...lang, enabled: true, default: false }]);
  };
  const updateLanguage = (code: LanguageCode, data: Partial<Language>) => {
    setLanguages((prev) => prev.map((l) => (l.code === code ? { ...l, ...data } : l)));
  };
  const deleteLanguage = (code: LanguageCode) => {
    setLanguages((prev) => prev.filter((l) => l.code !== code));
    if (currentLanguage === code) {
      const fallback = languages.find((l) => l.default && l.code !== code) ?? languages[0];
      if (fallback) setCurrentLanguage(fallback.code);
    }
  };
  const toggleLanguageEnabled = (code: LanguageCode) => {
    setLanguages((prev) => prev.map((l) => (l.code === code ? { ...l, enabled: !l.enabled } : l)));
  };
  const setDefaultLanguage = (code: LanguageCode) => {
    setLanguages((prev) => prev.map((l) => ({ ...l, default: l.code === code })));
  };

  const updateLanguageTranslation = (langCode: string, keyOrOverrides: string | Record<string, string>, value?: string) => {
    setLanguageTranslationOverrides((prev) => {
      if (typeof keyOrOverrides === 'string') {
        return { ...prev, [langCode]: { ...(prev[langCode] ?? {}), [keyOrOverrides]: value ?? '' } };
      }
      return { ...prev, [langCode]: { ...(prev[langCode] ?? {}), ...keyOrOverrides } };
    });
  };

  const value: AppContextValue = {
    currentLanguage, languages, isAuthenticated, requests, crmEntries, contentOverrides, languageTranslationOverrides,
    setLanguage, login, logout, addRequest, updateRequestStatus, deleteRequest, convertRequestToCRM,
    addCRMEntry, updateCRMEntry, deleteCRMEntry, updateContentOverrides,
    addLanguage, updateLanguage, deleteLanguage, toggleLanguageEnabled, setDefaultLanguage, updateLanguageTranslation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
