import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useConsent } from '../lib/consent';
import { useLockBody } from '../lib/hooks';
import { Close, Shield } from './Icons';

export default function PrivacyDialog() {
  const { open, save, closeDialog, dismissDialog } = useConsent();
  const dialogRef = useRef(null);
  useLockBody(open);

  useEffect(() => {
    if (!open) return undefined;
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const previouslyFocused = document.activeElement;
    dialog.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialog.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, closeDialog]);

  if (!open) return null;

  return (
    <div className="modal-root">
      <button
        type="button"
        className="modal-scrim"
        aria-label="Close privacy notice"
        tabIndex={-1}
        onClick={dismissDialog}
      />
      <div
        className="consent"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-dialog-title"
        aria-describedby="privacy-dialog-desc"
        ref={dialogRef}
        tabIndex={-1}
      >
        <button
          type="button"
          className="consent__close"
          onClick={dismissDialog}
          aria-label="Close without choosing"
        >
          <Close style={{ width: 14, height: 14 }} />
        </button>

        <div className="consent__icon" aria-hidden="true">
          <Shield />
        </div>

        <div className="consent__body">
          <h2 className="consent__title" id="privacy-dialog-title">
            Your privacy
          </h2>
          <p className="consent__copy" id="privacy-dialog-desc">
            We store only what keeps this site working, including this choice. If you allow it, we
            also collect anonymous, aggregated analytics to improve the site. No advertising
            cookies, no data sold, ever. {' '}
            <Link to="/privacy" onClick={closeDialog}>
              Read the privacy notice
            </Link>
            .
          </p>
        </div>

        <div className="consent__actions">
          <button type="button" className="btn btn--gold" onClick={() => save('all')}>
            Accept all
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => save('essential')}>
            Essential only
          </button>
        </div>

        <div className="consent__foot">
          <button type="button" className="consent__link" onClick={closeDialog}>
            Decline non-essential
          </button>
          <p className="consent__fine">
            Change this anytime under “Privacy settings” in the footer.
          </p>
        </div>
      </div>
    </div>
  );
}
