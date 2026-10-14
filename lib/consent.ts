import { useSyncExternalStore } from 'react';

// Consent is kept in a small module-level store backed by localStorage. The server snapshot is
// 'unknown', so nothing consent-dependent renders or runs until the client has read the saved choice.
export const CONSENT_STORAGE_KEY = 'jimtech:consent';
export const CONSENT_VERSION = 1;

// 'unknown' = not yet read on the client; 'undecided' = no valid decision (analytics stays off).
export type ConsentStatus = 'unknown' | 'undecided' | 'granted' | 'denied';

type ConsentRecord = { v: number; analytics: boolean; ts: number };

let status: ConsentStatus = 'unknown';
let preferencesOpen = false;
let storageListening = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((listener) => listener());

// Missing, corrupt, outdated or unreadable data all fail closed to 'undecided'.
function readStoredStatus(): ConsentStatus {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return 'undecided';
    const record = JSON.parse(raw) as Partial<ConsentRecord> | null;
    if (!record || record.v !== CONSENT_VERSION || typeof record.analytics !== 'boolean' || !Number.isFinite(record.ts)) return 'undecided';
    return record.analytics ? 'granted' : 'denied';
  } catch {
    return 'undecided';
  }
}

export function setAnalyticsConsent(granted: boolean) {
  status = granted ? 'granted' : 'denied';
  try {
    const record: ConsentRecord = { v: CONSENT_VERSION, analytics: granted, ts: Date.now() };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage can be blocked; the choice then applies to this page session only.
  }
  emit();
}

export const openPreferences = () => {
  preferencesOpen = true;
  emit();
};

export const closePreferences = () => {
  preferencesOpen = false;
  emit();
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!storageListening) {
    storageListening = true;
    window.addEventListener('storage', (event) => {
      if (event.key !== CONSENT_STORAGE_KEY && event.key !== null) return;
      status = readStoredStatus();
      emit();
    });
  }
  return () => {
    listeners.delete(listener);
  };
}

function getStatusSnapshot(): ConsentStatus {
  if (status === 'unknown') status = readStoredStatus();
  return status;
}

export const useConsentStatus = () => useSyncExternalStore(subscribe, getStatusSnapshot, () => 'unknown' as ConsentStatus);
export const usePreferencesOpen = () => useSyncExternalStore(subscribe, () => preferencesOpen, () => false);
