'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { useConsentStatus } from '@/lib/consent';

// Public GA4 Measurement ID; it is not a secret.
const MEASUREMENT_ID = 'G-XZV7C2T8ZN';
const DISABLE_FLAG = `ga-disable-${MEASUREMENT_ID}`;

type GtagWindow = { gtag?: (...args: unknown[]) => void } & Record<string, unknown>;

function clearAnalyticsCookies() {
  const names = ['_ga', `_ga_${MEASUREMENT_ID.replace('G-', '')}`];
  const labels = window.location.hostname.split('.');
  const domains = labels.map((_, index) => labels.slice(index).join('.'));
  for (const name of names) {
    for (const domain of [undefined, ...domains]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

// Applies a consent change once gtag exists; before that, the init script below sets the state itself.
function applyConsent(granted: boolean) {
  const win = window as unknown as GtagWindow;
  if (typeof win.gtag !== 'function') return;
  win[DISABLE_FLAG] = !granted;
  win.gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
  if (!granted) clearAnalyticsCookies();
}

// Strategy: gtag.js is not requested at all until the visitor grants analytics consent, so no
// Google request or cookie exists beforehand. When granted, defaults are set to denied first and
// then updated to granted in the same synchronous script, before 'config'. wait_for_update is
// unnecessary because the saved choice is already known when this script runs. The init script
// has a fixed id, so next/script never runs it twice; GA4 enhanced measurement sends page_view
// on client-side navigation, so there is no manual route tracking.
export default function GoogleAnalytics() {
  const status = useConsentStatus();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || status === 'unknown') return;
    applyConsent(status === 'granted');
  }, [status]);

  if (process.env.NODE_ENV !== 'production' || status !== 'granted') return null;

  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window['${DISABLE_FLAG}'] = false;
gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('consent', 'update', { analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${MEASUREMENT_ID}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} strategy="afterInteractive" />
    </>
  );
}
