/**
 * HubSpot Service for Zürich Nachhilfe
 * Handles all HubSpot API interactions for contact management.
 */

interface HubSpotContactData {
  email: string;
  lastname: string;
  phone: string;
  plz: string;
  funktion?: string;
  kontakt_hat_lead_formular_ausgefullt?: string;
  was_fur_nachhilfe_benotigt_ihr_sohn_?: string;
  sucht_nachhilfe_fur?: string;
  schulstufe_kind?: string;
  utm_website_contact?: string;
  // Tracking parameters - HubSpot specific fields
  hs_google_click_id?: string;
  utm_campaign_contact?: string;
  utm_source_contact?: string;
}

interface HubSpotAPIResponse {
  success: boolean;
  contactId?: string;
  error?: string;
  errorType?: string;
  statusCode?: number;
  data?: unknown;
}

interface PortalFormData {
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

class HubSpotService {
  private static instance: HubSpotService;
  private readonly baseUrl = 'https://api.hubapi.com';
  private readonly accessToken: string;
  
  // Rate limiting properties
  private lastRequestTime = 0;
  private readonly minRequestInterval = 150; // 150ms = max 6.6 req/sec

  private constructor() {
    this.accessToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN || '';
    
    if (!this.accessToken) {
      console.warn('HUBSPOT_PRIVATE_APP_TOKEN environment variable is not set');
    }
  }

  public static getInstance(): HubSpotService {
    if (!HubSpotService.instance) {
      HubSpotService.instance = new HubSpotService();
    }
    return HubSpotService.instance;
  }

  /**
   * Throttle requests to stay within HubSpot API rate limits
   */
  private async throttleRequest(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }

  /**
   * Create or update a HubSpot contact
   */
  async createOrUpdateContact(contactData: HubSpotContactData): Promise<HubSpotAPIResponse> {
    // Check if access token is available
    if (!this.accessToken) {
      return {
        success: false,
        error: 'HubSpot access token is not configured',
        errorType: 'configuration'
      };
    }
    
    try {
      // First, check if contact exists by email
      const existingContact = await this.findContactByEmail(contactData.email);
      
      if (existingContact) {
        // Update existing contact
        return await this.updateContact(existingContact.id, contactData);
      } else {
        // Create new contact
        return await this.createContact(contactData);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        success: false,
        error: errorMessage,
        errorType: 'network'
      };
    }
  }

  /**
   * Create a new HubSpot contact
   */
  private async createContact(contactData: HubSpotContactData): Promise<HubSpotAPIResponse> {
    try {
      await this.throttleRequest();
      
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: contactData,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: responseData.message || 'Failed to create contact',
          errorType: 'api',
          statusCode: response.status,
          data: responseData,
        };
      }

      return {
        success: true,
        contactId: responseData.id,
        data: responseData,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        success: false,
        error: errorMessage,
        errorType: 'network'
      };
    }
  }

  /**
   * Update an existing HubSpot contact
   */
  private async updateContact(contactId: string, contactData: HubSpotContactData): Promise<HubSpotAPIResponse> {
    try {
      await this.throttleRequest();
      
      const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: contactData,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: responseData.message || 'Failed to update contact',
          errorType: 'api',
          statusCode: response.status,
          data: responseData,
        };
      }

      return {
        success: true,
        contactId: contactId,
        data: responseData,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return {
        success: false,
        error: errorMessage,
        errorType: 'network'
      };
    }
  }

  /**
   * Find contact by email address
   */
  private async findContactByEmail(email: string): Promise<{ id: string } | null> {
    try {
      await this.throttleRequest();
      
      const response = await fetch(
        `${this.baseUrl}/crm/v3/objects/contacts/search`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'email',
                    operator: 'EQ',
                    value: email,
                  },
                ],
              },
            ],
            properties: ['email'],
            limit: 1,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        return null;
      }

      if (responseData.results && responseData.results.length > 0) {
        return { id: responseData.results[0].id };
      }

      return null;
    } catch {
      return null;
    }
  }
}

// Singleton export
export const hubspotService = HubSpotService.getInstance();

/**
 * Convert Portal form data to HubSpot contact format
 */
export function mapPortalDataToHubSpot(data: PortalFormData): HubSpotContactData {
  const hubspotData: HubSpotContactData = {
    email: data.email,
    lastname: data.nachname,
    phone: data.telefon,
    plz: data.plz,
    funktion: 'Kunde / Schüler',
    
    // Custom Properties für Lead Formular
    kontakt_hat_lead_formular_ausgefullt: 'Ja',
    was_fur_nachhilfe_benotigt_ihr_sohn_: data.fach,
    sucht_nachhilfe_fur: mapWerBrauchtNachhilfe(data.schueler),
    schulstufe_kind: data.klasse,
    utm_website_contact: 'zuerich-nachhilfe.ch',
  };
  
  // Add only the specific HubSpot tracking fields
  if (data.gclid) {
    hubspotData.hs_google_click_id = data.gclid;
  }
  
  if (data.utm_campaign) {
    hubspotData.utm_campaign_contact = data.utm_campaign;
  }
  
  if (data.utm_source) {
    hubspotData.utm_source_contact = data.utm_source;
  }
  
  return hubspotData;
}

/**
 * Map schueler field to HubSpot format
 */
function mapWerBrauchtNachhilfe(schueler: string): string {
  const mappings: Record<string, string> = {
    'meine-tochter': 'Meine Tochter',
    'mein-sohn': 'Mein Sohn',
    'ich': 'Ich',
    'jemand-anderes': 'Jemand anderes',
  };
  
  return mappings[schueler] || 'Jemand anderes';
}