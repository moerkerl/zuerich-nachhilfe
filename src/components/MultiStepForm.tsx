'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getStoredTrackingParams } from '@/lib/tracking'

const klassenOptions = [
  '1. Klasse Primar',
  '2. Klasse Primar',
  '3. Klasse Primar',
  '4. Klasse Primar',
  '5. Klasse Primar',
  '6. Klasse Primar',
  '1. Sek A',
  '1. Sek B', 
  '1. Sek C',
  '2. Sek A',
  '2. Sek B',
  '2. Sek C',
  '3. Sek A',
  '3. Sek B',
  '3. Sek C',
  '1. Klasse Gymnasium',
  '2. Klasse Gymnasium',
  '3. Klasse Gymnasium',
  '4. Klasse Gymnasium',
  '5. Klasse Gymnasium',
  '6. Klasse Gymnasium',
  'Lehre',
  'Studium',
  'Berufsschule',
  'Fachhochschule',
  'Universität'
]

const nachhilfeBeispiele = [
  'Mathematik',
  'Französisch',
  'Deutsch',
  'Englisch',
  'Hausaufgabenhilfe',
  'Prüfungsvorbereitung'
]

const initialState = {
  schueler: '',
  klasse: '',
  fach: '',
  plz: '',
  nachname: '',
  telefon: '',
  email: ''
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleChangeWithAutoAdvance = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    
    // Auto-advance for class selection
    if (name === 'klasse' && value && step === 2) {
      setTimeout(() => {
        setError('')
        setStep(step + 1)
      }, 300)
    }
    
    // Auto-advance for PLZ when 4 characters are entered
    if (name === 'plz' && value.length === 4 && step === 4) {
      setTimeout(() => {
        setError('')
        setStep(step + 1)
      }, 300)
    }
  }

  const handleSelectWithAutoAdvance = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
    setTimeout(() => {
      setError('')
      setStep(step + 1)
    }, 300)
  }

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError('')
    
    // Validierung je Schritt
    if (step === 1 && !form.schueler) return setError('Bitte wählen Sie eine Option.')
    if (step === 2 && !form.klasse) return setError('Bitte wählen oder geben Sie eine Klasse an.')
    if (step === 3 && !form.fach) return setError('Bitte geben Sie das Nachhilfefach an.')
    if (step === 4 && !form.plz) return setError('Bitte geben Sie Ihre Postleitzahl an.')
    
    setStep(step + 1)
  }

  const handleBack = () => {
    setError('')
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validierung
    if (!form.nachname || !form.telefon || !form.email) {
      setError('Bitte füllen Sie alle Felder aus.')
      return
    }

    setLoading(true)
    
    try {
      // Get stored tracking parameters
      const trackingData = getStoredTrackingParams();
      
      // Prepare form data with tracking parameters
      const submitData = {
        ...form,
        gclid: trackingData?.params?.gclid,
        utm_source: trackingData?.params?.utm_source,
        utm_medium: trackingData?.params?.utm_medium,
        utm_campaign: trackingData?.params?.utm_campaign,
        utm_term: trackingData?.params?.utm_term,
        utm_content: trackingData?.params?.utm_content,
      };
      
      // Send data to API endpoint
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten');
      }

      if (data.success) {
        // Redirect to thank you page
        router.push('/dankesseite');
      } else {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      {/* Progress indicator */}
      {step <= 5 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-primary font-semibold">Frage {step} von 5</div>
            <div className="text-gray-500 text-sm">{Math.round((step / 5) * 100)}% abgeschlossen</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 1: Wer braucht Nachhilfe */}
      {step === 1 && (
        <form onSubmit={handleNext}>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Wer braucht Nachhilfe?
          </h2>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {['Meine Tochter', 'Mein Sohn', 'Ich', 'Jemand anderes'].map((option, index) => (
              <button
                key={index}
                type="button"
                className={`border-2 rounded-lg px-6 py-4 text-left transition-all font-medium cursor-pointer ${
                  form.schueler === option.toLowerCase().replace(' ', '-')
                    ? 'border-primary bg-indigo-50 text-primary'
                    : 'border-gray-300 hover:border-primary text-gray-700'
                }`}
                onClick={() => handleSelectWithAutoAdvance('schueler', option.toLowerCase().replace(' ', '-'))}
              >
                {option}
              </button>
            ))}
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex justify-between mt-8">
            <div />
            <button 
              type="submit" 
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold cursor-pointer"
            >
              Weiter
            </button>
          </div>
        </form>
      )}

      {/* Step 2: Klasse */}
      {step === 2 && (
        <form onSubmit={handleNext}>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            In welcher Klasse ist {
              form.schueler === 'meine-tochter' ? 'Ihre Tochter' : 
              form.schueler === 'mein-sohn' ? 'Ihr Sohn' : 
              form.schueler === 'ich' ? 'Sie' : 'die Person'
            }?
          </h2>
          <select 
            name="klasse" 
            value={form.klasse} 
            onChange={handleChangeWithAutoAdvance}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-gray-700"
          >
            <option value="">Bitte wählen...</option>
            {klassenOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <div className="flex justify-between mt-8">
            <button 
              type="button" 
              className="text-primary hover:text-primary-600 font-medium cursor-pointer"
              onClick={handleBack}
            >
              ← Zurück
            </button>
            <button 
              type="submit" 
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold cursor-pointer"
            >
              Weiter
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Fach */}
      {step === 3 && (
        <form onSubmit={handleNext}>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Was für Nachhilfe wird benötigt?
          </h2>
          
          <input 
            name="fach" 
            value={form.fach} 
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-gray-700 mb-4"
            placeholder="Fach eingeben..."
          />
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">Oder wählen Sie aus beliebten Optionen:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {nachhilfeBeispiele.map(fach => (
                <button
                  key={fach}
                  type="button"
                  className={`border-2 rounded-lg px-4 py-2 text-sm transition-all cursor-pointer ${
                    form.fach === fach
                      ? 'border-primary bg-indigo-50 text-primary'
                      : 'border-gray-300 hover:border-primary text-gray-700'
                  }`}
                  onClick={() => setForm({ ...form, fach })}
                >
                  {fach}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="text-red-500 mt-2">{error}</div>}
          <div className="flex justify-between mt-8">
            <button 
              type="button" 
              className="text-primary hover:text-primary-600 font-medium cursor-pointer"
              onClick={handleBack}
            >
              ← Zurück
            </button>
            <button 
              type="submit" 
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold cursor-pointer"
            >
              Weiter
            </button>
          </div>
        </form>
      )}

      {/* Step 4: PLZ */}
      {step === 4 && (
        <form onSubmit={handleNext}>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Wo wohnen Sie?
          </h2>
          <label className="block text-gray-700 mb-2">Postleitzahl</label>
          <input 
            name="plz" 
            value={form.plz} 
            onChange={handleChangeWithAutoAdvance}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-gray-700"
            placeholder="PLZ eingeben..."
            maxLength={4}
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <div className="flex justify-between mt-8">
            <button 
              type="button" 
              className="text-primary hover:text-primary-600 font-medium cursor-pointer"
              onClick={handleBack}
            >
              ← Zurück
            </button>
            <button 
              type="submit" 
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold cursor-pointer"
            >
              Weiter
            </button>
          </div>
        </form>
      )}

      {/* Step 5: Kontaktdaten */}
      {step === 5 && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Ihre Kontaktdaten
          </h2>
          <p className="text-gray-600 mb-6">
            Damit wir Ihnen die passende Auswahl an Nachhilfelehrern in Zürich zusenden können.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Nachname *</label>
              <input 
                name="nachname" 
                value={form.nachname} 
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-gray-700"
                placeholder="Ihr Nachname"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Telefonnummer *</label>
              <input 
                name="telefon" 
                value={form.telefon} 
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-gray-700"
                placeholder="+41 79 XXX XX XX"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">E-Mail *</label>
              <input 
                name="email" 
                value={form.email} 
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-gray-700"
                placeholder="ihre@email.ch"
                type="email"
                required
              />
            </div>
          </div>

          {error && <div className="text-red-500 mt-4">{error}</div>}
          
          <div className="flex justify-between mt-8">
            <button 
              type="button" 
              className="text-primary hover:text-primary-600 font-medium cursor-pointer"
              onClick={handleBack}
              disabled={loading}
            >
              ← Zurück
            </button>
            <button 
              type="submit" 
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold disabled:opacity-50 cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Wird gesendet...' : 'Anfrage senden'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}