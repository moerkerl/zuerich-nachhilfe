'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { initializeTracking } from '@/lib/tracking';

const GA_ADS_ID = 'AW-16732398347'; // Google Ads ID für zuerich-nachhilfe

export default function GoogleAnalytics() {
  useEffect(() => {
    // Initialize tracking after gtag is loaded (delayed)
    const timeoutId = setTimeout(() => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        initializeTracking();
      }
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <>
      {/* Load gtag script for Google Ads */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Set default consent state (simplified - no consent management yet)
          gtag('consent', 'default', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted', 
            'ad_personalization': 'granted',
            'analytics_storage': 'granted',
            'wait_for_update': 500,
            'region': ['CH'],
            'url_passthrough': true
          });
          
          // Configure Google Ads with basic settings
          gtag('config', '${GA_ADS_ID}', {
            'page_path': window.location.pathname,
            'page_location': window.location.href,
            'page_referrer': document.referrer,
            'conversion_linker': true,
            'allow_enhanced_conversions': true
          });
        `}
      </Script>
    </>
  );
}