'use client'

import { useEffect, useRef } from 'react'
import { getStoredTrackingParams, getGoogleClickId } from '@/lib/tracking'

const GA_ADS_ID = 'AW-16732398347'
const CONVERSION_LABEL = 'P44WCMav44gbEIvG0Ko-'

export default function ConversionTracker() {
  const hasInitialized = useRef(false)
  const timer = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (hasInitialized.current) {
      console.log('ConversionTracker already initialized');
      return;
    }
    
    // Check if conversion has already been tracked this session
    if (typeof window !== 'undefined' && window.sessionStorage.getItem('google_ads_conversion_tracked')) {
      console.log('Google Ads conversion already tracked this session');
      return;
    }
    
    // Mark as initialized immediately to prevent double execution
    hasInitialized.current = true;
    
    // Mark that we're starting execution
    if (typeof window !== 'undefined') {
      const executionId = `conversion_execution_${Date.now()}_${Math.random()}`;
      window.sessionStorage.setItem('conversion_in_progress', executionId);
      
      // Clear the flag after a short delay (in case of errors)
      setTimeout(() => {
        const currentExecution = window.sessionStorage.getItem('conversion_in_progress');
        if (currentExecution === executionId) {
          window.sessionStorage.removeItem('conversion_in_progress');
        }
      }, 5000);
    }
    
    // Wait until gtag is available
    timer.current = setTimeout(() => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        // Get stored tracking parameters
        const trackingData = getStoredTrackingParams();
        const gclid = getGoogleClickId();
        
        // Generate unique transaction ID to prevent duplicates
        const transactionId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Double-check that conversion hasn't been sent yet
        if (window.sessionStorage.getItem('google_ads_conversion_tracked')) {
          console.log('Conversion already tracked, skipping duplicate');
          window.sessionStorage.removeItem('conversion_in_progress');
          return;
        }
        
        // Mark as tracked BEFORE sending to prevent race conditions
        window.sessionStorage.setItem('google_ads_conversion_tracked', 'true');
        
        // Send Google Ads conversion event
        window.gtag('event', 'conversion', {
          'send_to': `${GA_ADS_ID}/${CONVERSION_LABEL}`,
          'value': 1.0,
          'currency': 'CHF',
          'transaction_id': transactionId,
          'custom_parameters': {
            'landing_page': trackingData?.landingPage || '/',
            'traffic_source': trackingData?.params?.utm_source || 'direct',
            'form_completion_time': Date.now() - (trackingData?.timestamp || Date.now())
          }
        });
        
        console.log('Google Ads conversion sent successfully', { transactionId });
        
        // Set Google Click ID globally if available (critical for conversion attribution)
        if (gclid) {
          window.gtag('set', { 'gclid': gclid });
        }
        
        // Mark that conversion tracking completed
        window.sessionStorage.setItem('conversion_tracked_client', 'true');
        window.sessionStorage.removeItem('conversion_in_progress');
        
        console.log('Google Ads conversion tracking completed:', {
          conversion_label: CONVERSION_LABEL,
          transaction_id: transactionId,
          page: '/dankesseite',
          gclid: gclid || 'none',
          utm_source: trackingData?.params?.utm_source || 'none',
          landing_page: trackingData?.landingPage || 'none'
        });
      }
    }, 2000); // 2 seconds wait to ensure gtag is fully loaded

    // Cleanup function
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return null; // This component renders nothing visible
}