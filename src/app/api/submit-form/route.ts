import { NextRequest, NextResponse } from 'next/server';
import { hubspotService, mapPortalDataToHubSpot } from '@/lib/hubspotService';

interface FormData {
  schueler: string;
  klasse: string;
  fach: string;
  plz: string;
  nachname: string;
  telefon: string;
  email: string;
  // Tracking parameters
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  trackingParams?: Record<string, string>;
}

interface SubmitFormResponse {
  success: boolean;
  message?: string;
  error?: string;
  hubspotContactId?: string;
}

// CORS headers for potential cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse<SubmitFormResponse>> {
  try {
    // Parse request body
    const formData: FormData = await request.json();
    
    // Validate required fields
    const requiredFields: (keyof FormData)[] = ['schueler', 'klasse', 'fach', 'plz', 'nachname', 'telefon', 'email'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        // Missing required field
        return NextResponse.json({
          success: false,
          error: `Bitte füllen Sie das Feld "${field}" aus.`,
        }, { 
          status: 400,
          headers: corsHeaders 
        });
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({
        success: false,
        error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      }, { 
        status: 400,
        headers: corsHeaders 
      });
    }

    // Map form data to HubSpot format, including tracking parameters
    const hubspotData = mapPortalDataToHubSpot(formData);
    
    // Create or update contact in HubSpot
    const hubspotResult = await hubspotService.createOrUpdateContact(hubspotData);
    
    if (hubspotResult.success) {
      // HubSpot contact created/updated successfully
      return NextResponse.json({ 
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich übermittelt.',
        hubspotContactId: hubspotResult.contactId
      }, {
        headers: corsHeaders
      });
    } else {
      // HubSpot API error - log for monitoring but still return success to user
      console.error('HubSpot API Error:', hubspotResult.error, hubspotResult.errorType);
      
      // Still return success to user but log the error
      return NextResponse.json({ 
        success: true,
        message: 'Ihre Anfrage wurde erfolgreich übermittelt.',
      }, {
        headers: corsHeaders
      });
    }

  } catch (error) {
    // API Route Error - log for monitoring
    console.error('Form submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}