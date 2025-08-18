import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Vielen Dank für Ihre Anfrage | Zürich Nachhilfe',
  description: 'Vielen Dank für Ihr Interesse an unserer Nachhilfe in Zürich. Wir melden uns bald bei Ihnen.',
}

export default function Dankesseite() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Vielen Dank für Ihre Anfrage!
          </h1>
          <p className="text-xl text-slate-600">
            Wir haben Ihre Anfrage erhalten und melden uns bald bei Ihnen.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - What happens next */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                So geht es weiter:
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Kontaktaufnahme innerhalb von 24 Stunden
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Einer unserer Lernstrategen meldet sich bei Ihnen, um Ihre Bedürfnisse zu besprechen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Kostenloses Strategiegespräch
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Gemeinsam erstellen wir einen individuellen Lernplan für optimale Ergebnisse.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Passenden Tutor finden
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Wir vermitteln Ihnen den idealen Nachhilfelehrer für Ihre Anforderungen.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Kostenlose Probelektion
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Lernen Sie Ihren Tutor kennen und testen Sie unser Angebot unverbindlich.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">
                Haben Sie Fragen?
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Zögern Sie nicht, uns zu kontaktieren. Wir sind gerne für Sie da.
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <span className="mr-2">📞</span>
                  <span>078 314 62 65</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-2">✉️</span>
                  <span>dantico@fokus-nachhilfe.ch</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[500px]">
            <Image
              src="/images/Geschäftsmeeting_mit_positiver_Atmosphäre_20250318_192548.jpg"
              alt="Professionelle Beratung für Nachhilfe in Zürich"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Entdecken Sie mehr über uns
            </h3>
            <p className="text-slate-600 mb-6">
              Erfahren Sie mehr über unsere Philosophie und wie wir Schüler in Zürich zum Erfolg führen.
            </p>
            <Link href="/" className="btn-primary inline-block">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}