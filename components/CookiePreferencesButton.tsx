'use client';

import { openPreferences } from '@/lib/consent';

export default function CookiePreferencesButton({ className = 'footer-legal__button' }: { className?: string }) {
  return <button type="button" className={className} onClick={openPreferences}>Cookie preferences</button>;
}
