// Global gtag types for Google Analytics/Ads
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set' | 'consent',
      targetId?: string | Record<string, unknown>,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

export {};