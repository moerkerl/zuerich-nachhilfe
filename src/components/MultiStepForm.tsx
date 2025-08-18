'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormData {
  schueler: string
  klasse: string
  fach: string
  plz: string
  nachname: string
  telefon: string
  email: string
}

const initialFormData: FormData = {
  schueler: '',
  klasse: '',
  fach: '',
  plz: '',
  nachname: '',
  telefon: '',
  email: ''
}

const steps = [
  { id: 1, title: 'Wer braucht Nachhilfe?', field: 'schueler' },
  { id: 2, title: 'In welcher Klasse/Stufe?', field: 'klasse' },
  { id: 3, title: 'In welchem Fach?', field: 'fach' },
  { id: 4, title: 'In welcher Region?', field: 'plz' },
  { id: 5, title: 'Ihre Kontaktdaten', field: 'contact' }
]

export default function MultiStepForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Navigate to thank you page
    router.push('/dankesseite')
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1: return formData.schueler !== ''
      case 2: return formData.klasse !== ''
      case 3: return formData.fach !== ''
      case 4: return formData.plz !== ''
      case 5: return formData.nachname !== '' && formData.telefon !== '' && formData.email !== ''
      default: return false
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step.id <= currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.id}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-900">
            {steps[currentStep - 1].title}
          </h2>

          {/* Step 1: Wer braucht Nachhilfe? */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {[
                { value: 'meine-tochter', label: 'Meine Tochter' },
                { value: 'mein-sohn', label: 'Mein Sohn' },
                { value: 'ich', label: 'Ich selbst' },
                { value: 'jemand-anderes', label: 'Jemand anderes' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    updateFormData('schueler', option.value)
                    setTimeout(handleNext, 300)
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    formData.schueler === option.value
                      ? 'border-primary bg-indigo-50 text-primary'
                      : 'border-gray-200 hover:border-primary hover:bg-indigo-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Klasse/Stufe */}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 gap-4">
              {[
                'Primarschule (1.-6.)',
                'Sekundarstufe I (7.-9.)',
                'Gymnasium/Mittelschule',
                'Berufsschule/Lehre',
                'Fachhochschule',
                'Universität',
                'Erwachsenenbildung',
                'Andere'
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    updateFormData('klasse', option)
                    setTimeout(handleNext, 300)
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-sm ${
                    formData.klasse === option
                      ? 'border-primary bg-indigo-50 text-primary'
                      : 'border-gray-200 hover:border-primary hover:bg-indigo-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Fach */}
          {currentStep === 3 && (
            <div className="grid grid-cols-2 gap-4">
              {[
                'Mathematik',
                'Deutsch',
                'Englisch',
                'Französisch',
                'Physik',
                'Chemie',
                'Biologie',
                'Geschichte',
                'Geographie',
                'Italienisch',
                'Latein',
                'Andere'
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    updateFormData('fach', option)
                    setTimeout(handleNext, 300)
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-sm ${
                    formData.fach === option
                      ? 'border-primary bg-indigo-50 text-primary'
                      : 'border-gray-200 hover:border-primary hover:bg-indigo-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Step 4: PLZ */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="plz" className="block text-sm font-medium text-gray-700 mb-2">
                  Postleitzahl
                </label>
                <input
                  type="text"
                  id="plz"
                  value={formData.plz}
                  onChange={(e) => updateFormData('plz', e.target.value)}
                  placeholder="z.B. 8001"
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 outline-none"
                  maxLength={4}
                />
              </div>
              <button
                onClick={handleNext}
                disabled={!isStepValid(4)}
                className={`w-full p-4 rounded-lg font-semibold transition-all ${
                  isStepValid(4)
                    ? 'btn-primary'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Weiter
              </button>
            </div>
          )}

          {/* Step 5: Kontaktdaten */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="nachname" className="block text-sm font-medium text-gray-700 mb-2">
                  Nachname *
                </label>
                <input
                  type="text"
                  id="nachname"
                  value={formData.nachname}
                  onChange={(e) => updateFormData('nachname', e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefonnummer *
                </label>
                <input
                  type="tel"
                  id="telefon"
                  value={formData.telefon}
                  onChange={(e) => updateFormData('telefon', e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 outline-none"
                />
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={!isStepValid(5) || isSubmitting}
                className={`w-full p-4 rounded-lg font-semibold transition-all ${
                  isStepValid(5) && !isSubmitting
                    ? 'btn-primary'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Wird gesendet...</span>
                  </div>
                ) : (
                  'Anfrage senden'
                )}
              </button>
            </div>
          )}

          {/* Navigation */}
          {currentStep > 1 && currentStep < 5 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="btn-secondary"
              >
                Zurück
              </button>
              
              {currentStep < 4 && (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    isStepValid(currentStep)
                      ? 'btn-primary'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Weiter
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}