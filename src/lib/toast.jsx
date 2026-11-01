import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Check, Close } from '../components/Icons';

const ToastContext = createContext(null);

/**
 * Small, calm confirmations for actions that finish without leaving the page:
 * a download, a copy, a saved contact, a sent RSVP. One stack, bottom centre,
 * announced politely to screen readers.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (message, options = {}) => {
      const id = (nextId.current += 1);
      const duration = options.duration ?? 4600;
      setToasts((previous) => [...previous.slice(-1), { id, message, detail: options.detail }]);
      window.setTimeout(() => {
        setToasts((previous) => previous.filter((toast) => toast.id !== id));
      }, duration);
      return id;
    },
    [],
  );

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" role="status" aria-live="polite" aria-atomic="false">
        {toasts.map((toast) => (
          <div className="toast" key={toast.id}>
            <span className="toast__icon" aria-hidden="true">
              <Check />
            </span>
            <span className="toast__text">
              <strong>{toast.message}</strong>
              {toast.detail ? <span>{toast.detail}</span> : null}
            </span>
            <button
              type="button"
              className="toast__close"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
            >
              <Close />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  return context ?? { notify: () => {}, dismiss: () => {} };
}
