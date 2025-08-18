// Simplified tracking utilities for zuerich-nachhilfe
// Based on nachhilfeportal-zuerich implementation

interface TrackingParams {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

interface StoredTrackingData {
  params: TrackingParams;
  timestamp: number;
  landingPage: string;
}

/**
 * Extracts tracking parameters from current URL
 */
export function extractTrackingParams(): TrackingParams {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    gclid: urlParams.get('gclid') || undefined,
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
  };
}

/**
 * Stores tracking parameters in sessionStorage and localStorage
 */
export function storeTrackingParams(params: TrackingParams): void {
  if (typeof window === 'undefined') return;
  
  const data: StoredTrackingData = {
    params,
    timestamp: Date.now(),
    landingPage: window.location.pathname,
  };
  
  try {
    // Store in sessionStorage (priority for current session)
    sessionStorage.setItem('tracking_params_session', JSON.stringify(data));
    
    // Store in localStorage (backup for longer attribution)
    localStorage.setItem('tracking_params', JSON.stringify(data));
  } catch (error) {
    console.error('Error storing tracking parameters:', error);
  }
}

/**
 * Retrieves stored tracking parameters
 */
export function getStoredTrackingParams(): StoredTrackingData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    // Try sessionStorage first (current session)
    const sessionData = sessionStorage.getItem('tracking_params_session');
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    
    // Fallback to localStorage
    const localData = localStorage.getItem('tracking_params');
    if (localData) {
      return JSON.parse(localData);
    }
  } catch (error) {
    console.error('Error retrieving tracking parameters:', error);
  }
  
  return null;
}

/**
 * Gets the Google Click ID from stored parameters
 */
export function getGoogleClickId(): string | null {
  const stored = getStoredTrackingParams();
  return stored?.params?.gclid || null;
}

/**
 * Sends tracking parameters to Google Analytics when available
 */
export function sendTrackingToGoogleAnalytics(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  
  const trackingData = getStoredTrackingParams();
  if (!trackingData) return;
  
  try {
    // Update gtag config with stored parameters
    const config: Record<string, unknown> = {
      page_path: window.location.pathname,
      page_location: window.location.href,
    };
    
    if (trackingData.params.gclid) config.gclid = trackingData.params.gclid;
    if (trackingData.params.utm_source) config.campaign_source = trackingData.params.utm_source;
    if (trackingData.params.utm_medium) config.campaign_medium = trackingData.params.utm_medium;
    if (trackingData.params.utm_campaign) config.campaign_name = trackingData.params.utm_campaign;
    if (trackingData.params.utm_term) config.campaign_term = trackingData.params.utm_term;
    if (trackingData.params.utm_content) config.campaign_content = trackingData.params.utm_content;
    
    window.gtag('config', 'AW-16732398347', config);
    
    console.log('Tracking parameters sent to Google Analytics:', config);
  } catch (error) {
    console.error('Error sending tracking to Google Analytics:', error);
  }
}

/**
 * Initializes tracking on page load
 */
export function initializeTracking(): void {
  if (typeof window === 'undefined') return;
  
  // Extract and store current page parameters
  const params = extractTrackingParams();
  
  // Only store if we have relevant parameters
  if (Object.values(params).some(value => value !== undefined)) {
    storeTrackingParams(params);
    console.log('Tracking parameters extracted and stored:', params);
  }
  
  // Send stored parameters to Google Analytics
  sendTrackingToGoogleAnalytics();
}