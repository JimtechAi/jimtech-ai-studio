'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { closePreferences, openPreferences, setAnalyticsConsent, useConsentStatus, usePreferencesOpen } from '@/lib/consent';

// The native dialog restores focus itself; this covers a trigger (the banner) that has since been removed.
function restoreFocus(trigger: HTMLElement | null) {
  (trigger?.isConnected ? trigger : document.getElementById('main-content'))?.focus();
}

export default function ConsentManager() {
  const status = useConsentStatus();
  const preferencesOpen = usePreferencesOpen();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const pendingFocusRef = useRef(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (preferencesOpen && !dialog.open) {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    } else if (!preferencesOpen && dialog.open) {
      dialog.close();
    }
  }, [preferencesOpen, status]);

  // Runs after the dialog has closed and the banner (if any) has been removed, so the target is final.
  useEffect(() => {
    if (!pendingFocusRef.current || preferencesOpen) return;
    pendingFocusRef.current = false;
    restoreFocus(returnFocusRef.current);
  }, [preferencesOpen, status]);

  if (status === 'unknown') return null;

  function choose(granted: boolean) {
    setAnalyticsConsent(granted);
    setAnnouncement(granted ? 'Analytics enabled. Thank you.' : 'Analytics disabled. Your choice has been saved.');
    if (preferencesOpen) {
      pendingFocusRef.current = true;
      closePreferences();
    }
  }

  return (
    <>
      <div className="sr-only" role="status" aria-live="polite">{announcement}</div>
      {status === 'undecided' ? (
        <section className="consent-banner" aria-labelledby="consent-title" aria-describedby="consent-description">
          <h2 id="consent-title">Your privacy matters</h2>
          <p id="consent-description">
            Essential storage keeps this website working. With your permission, we also use Google Analytics to understand website traffic and improve the experience. Analytics stays off unless you accept.{' '}
            <Link href="/privacy">Read our Privacy Notice</Link>.
          </p>
          <div className="consent-actions">
            <button type="button" className="consent-button" onClick={() => choose(true)}>Accept analytics</button>
            <button type="button" className="consent-button" onClick={() => choose(false)}>Reject analytics</button>
          </div>
          <button type="button" className="consent-customize" onClick={openPreferences}>Customize</button>
        </section>
      ) : null}
      <dialog
        ref={dialogRef}
        className="consent-dialog"
        aria-labelledby="consent-dialog-title"
        onClose={() => {
          if (preferencesOpen) {
            closePreferences();
            restoreFocus(returnFocusRef.current);
          }
        }}
      >
        {preferencesOpen ? <PreferencesForm initialAnalytics={status === 'granted'} onChoose={choose} /> : null}
      </dialog>
    </>
  );
}

function PreferencesForm({ initialAnalytics, onChoose }: { initialAnalytics: boolean; onChoose: (granted: boolean) => void }) {
  const [analytics, setAnalytics] = useState(initialAnalytics);

  return (
    <form method="dialog" onSubmit={(event) => { event.preventDefault(); onChoose(analytics); }}>
      <div className="consent-dialog__head">
        <h2 id="consent-dialog-title">Privacy preferences</h2>
        <button type="button" className="consent-close" onClick={closePreferences} aria-label="Close without changing preferences">×</button>
      </div>
      <p className="consent-dialog__intro">Choose which optional storage you allow. You can change this at any time from the footer. See the <Link href="/privacy" onClick={closePreferences}>Privacy Notice</Link>.</p>
      <ul className="consent-options">
        <li>
          <div><strong>Necessary</strong><p>Keeps the website working and remembers your privacy choice on this device.</p></div>
          <span className="consent-status">Always active</span>
        </li>
        <li>
          <div><strong><label htmlFor="consent-analytics">Analytics (Google Analytics 4)</label></strong><p>Helps us understand website traffic and usage. Off unless you turn it on.</p></div>
          <input id="consent-analytics" type="checkbox" className="consent-checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
        </li>
        <li>
          <div><strong>Advertising</strong><p>We do not use advertising storage or ad personalisation.</p></div>
          <span className="consent-status">Not used</span>
        </li>
      </ul>
      <div className="consent-actions consent-actions--three">
        <button type="button" className="consent-button" onClick={() => onChoose(true)}>Accept analytics</button>
        <button type="button" className="consent-button" onClick={() => onChoose(false)}>Reject analytics</button>
        <button type="submit" className="consent-button consent-button--save">Save preferences</button>
      </div>
    </form>
  );
}
