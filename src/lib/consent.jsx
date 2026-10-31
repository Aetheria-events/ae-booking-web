import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'aetheria.consent.v1';
const ConsentContext = createContext(null);

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

function writeStored(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode / blocked) — choice lasts for the session */
  }
}

export function ConsentProvider({ children }) {
  // `undefined` means "we have not looked yet" so the dialog does not flash.
  const [choice, setChoice] = useState(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readStored();
    setChoice(stored);
    if (!stored) {
      const timer = window.setTimeout(() => setOpen(true), 1200);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (choice) {
      document.documentElement.dataset.consent = choice.analytics ? 'all' : 'essential';
    }
  }, [choice]);

  const save = useCallback((level) => {
    const value = {
      version: 1,
      essential: true,
      analytics: level === 'all',
      decidedAt: new Date().toISOString(),
    };
    writeStored(value);
    setChoice(value);
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      choice,
      open,
      openDialog: () => setOpen(true),
      // Closing or declining is a real choice: essential storage only.
      closeDialog: () => {
        setOpen(false);
        if (!choice) save('essential');
      },
      // Dismissing without choosing; the dialog will ask once more on a later visit.
      dismissDialog: () => setOpen(false),
      save,
      hasDecided: Boolean(choice),
      analyticsAllowed: Boolean(choice?.analytics),
    }),
    [choice, open, save],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider>');
  return ctx;
}

export { STORAGE_KEY };
