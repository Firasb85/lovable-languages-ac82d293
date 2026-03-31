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

// ─────────────────────────────────────────────────────────────────────────────
// Context shape (state + actions)
// ─────────────────────────────────────────────────────────────────────────────
interface AppContextValue extends AppState {
  // Language
  setLanguage: (code: LanguageCode) => void;

  // Auth
  login: (username: string, password: string) => boolean;
  logout: () => void;

  // Contact Requests
  addRequest: (data: Omit<ContactRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateRequestStatus: (id: string, status: ContactRequest['status']) => void;
  deleteRequest: (id: string) => void;
  convertRequestToCRM: (id: string) => void;

  // CRM
  addCRMEntry: (data: Omit<CRMEntry, 'id' | 'createdAt'>) => void;
  updateCRMEntry: (id: string, data: Partial<Omit<CRMEntry, 'id' | 'createdAt'>>) => void;
  deleteCRMEntry: (id: string) => void;

  // Content Overrides
  updateContentOverrides: (overrides: Partial<ContentOverrides>) => void;

  // Language management
  addLanguage: (lang: Omit<Language, 'default' | 'enabled'>) => void;
  updateLanguage: (code: LanguageCode, data: Partial<Language>) => void;
  deleteLanguage: (code: LanguageCode) => void;
  toggleLanguageEnabled: (code: LanguageCode) => void;
  setDefaultLanguage: (code: LanguageCode) => void;

  // Translation overrides (per-language string overrides)
  // Accepts either a single key+value, or a whole overrides object (bulk save)
  updateLanguageTranslation: (langCode: string, keyOrOverrides: string | Record<string, string>, value?: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Default languages (AR default, EN + KR available)
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_LANGUAGES: Language[] = [
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    enabled: true,
    default: true,
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    enabled: true,
    default: false,
  },
  {
    code: 'kr',
    name: 'Kurdish Sorani',
    nativeName: 'کوردی سۆرانی',
    direction: 'rtl',
    enabled: true,
    default: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Context creation
// ─────────────────────────────────────────────────────────────────────────────
const AppContext = createContext<AppContextValue | null>(null);

// ─────────────────────────────────────────────────────────────────────────────
// Helper: generate IDs
// ─────────────────────────────────────────────────────────────────────────────
function genId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('ar');
  const [languages, setLanguages] = useState<Language[]>(DEFAULT_LANGUAGES);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [crmEntries, setCrmEntries] = useState<CRMEntry[]>([]);
  const [contentOverrides, setContentOverrides] = useState<ContentOverrides>({});
  const [languageTranslationOverrides, setLanguageTranslationOverrides] =
    useState<LanguageTranslationOverrides>({});

  // Sync <html> lang + dir attributes whenever language changes
  useEffect(() => {
    const lang = languages.find((l) => l.code === currentLanguage);
    const dir = lang?.direction ?? 'rtl';
    document.documentElement.setAttribute('lang', currentLanguage);
    document.documentElement.setAttribute('dir', dir);
  }, [currentLanguage, languages]);

  // ── Language ──────────────────────────────────────────────────────────────
  const setLanguage = (code: LanguageCode) => {
    setCurrentLanguage(code);
  };

  // ── Auth ──────────────────────────────────────────────────────────────────
  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // ── Contact Requests ──────────────────────────────────────────────────────
  const addRequest = (data: Omit<ContactRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: ContactRequest = {
      ...data,
      id: genId(),
      status: 'new',
      createdAt: new Date(),
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  const updateRequestStatus = (id: string, status: ContactRequest['status']) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const deleteRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // Promote a contact request into a CRM entry (copies contact info, marks request done)
  const convertRequestToCRM = (id: string) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    const entry: CRMEntry = {
      id: genId(),
      fullName: req.fullName,
      company: req.company,
      email: req.email,
      phone: req.phone,
      notes: req.message,
      createdAt: new Date(),
    };
    setCrmEntries((prev) => [entry, ...prev]);
    // Mark the source request as done
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'done' } : r)));
  };

  // ── CRM ───────────────────────────────────────────────────────────────────
  const addCRMEntry = (data: Omit<CRMEntry, 'id' | 'createdAt'>) => {
    const entry: CRMEntry = {
      ...data,
      id: genId(),
      createdAt: new Date(),
    };
    setCrmEntries((prev) => [entry, ...prev]);
  };

  const updateCRMEntry = (id: string, data: Partial<Omit<CRMEntry, 'id' | 'createdAt'>>) => {
    setCrmEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
  };

  const deleteCRMEntry = (id: string) => {
    setCrmEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // ── Content Overrides ─────────────────────────────────────────────────────
  const updateContentOverrides = (overrides: Partial<ContentOverrides>) => {
    setContentOverrides((prev) => ({ ...prev, ...overrides }));
  };

  // ── Language Management ───────────────────────────────────────────────────
  const addLanguage = (lang: Omit<Language, 'default' | 'enabled'>) => {
    const newLang: Language = { ...lang, enabled: true, default: false };
    setLanguages((prev) => [...prev, newLang]);
  };

  const updateLanguage = (code: LanguageCode, data: Partial<Language>) => {
    setLanguages((prev) => prev.map((l) => (l.code === code ? { ...l, ...data } : l)));
  };

  const deleteLanguage = (code: LanguageCode) => {
    // Don't delete the current or default language
    setLanguages((prev) => prev.filter((l) => l.code !== code));
    if (currentLanguage === code) {
      const fallback = languages.find((l) => l.default && l.code !== code) ?? languages[0];
      if (fallback) setCurrentLanguage(fallback.code);
    }
  };

  const toggleLanguageEnabled = (code: LanguageCode) => {
    setLanguages((prev) =>
      prev.map((l) => (l.code === code ? { ...l, enabled: !l.enabled } : l))
    );
  };

  const setDefaultLanguage = (code: LanguageCode) => {
    setLanguages((prev) =>
      prev.map((l) => ({ ...l, default: l.code === code }))
    );
  };

  // ── Translation Overrides: single key or bulk map ─────────────────────────
  const updateLanguageTranslation = (
    langCode: string,
    keyOrOverrides: string | Record<string, string>,
    value?: string
  ) => {
    setLanguageTranslationOverrides((prev) => {
      if (typeof keyOrOverrides === 'string') {
        return { ...prev, [langCode]: { ...(prev[langCode] ?? {}), [keyOrOverrides]: value ?? '' } };
      }
      return { ...prev, [langCode]: { ...(prev[langCode] ?? {}), ...keyOrOverrides } };
    });
  };

  // ─────────────────────────────────────────────────────────────────────────
  const value: AppContextValue = {
    // State
    currentLanguage,
    languages,
    isAuthenticated,
    requests,
    crmEntries,
    contentOverrides,
    languageTranslationOverrides,
    // Actions
    setLanguage,
    login,
    logout,
    addRequest,
    updateRequestStatus,
    deleteRequest,
    convertRequestToCRM,
    addCRMEntry,
    updateCRMEntry,
    deleteCRMEntry,
    updateContentOverrides,
    addLanguage,
    updateLanguage,
    deleteLanguage,
    toggleLanguageEnabled,
    setDefaultLanguage,
    updateLanguageTranslation,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside <AppProvider>');
  }
  return ctx;
}
