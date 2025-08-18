import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Zürich Nachhilfe',
  description: 'Datenschutzerklärung von Zürich Nachhilfe - Erfahren Sie, wie wir Ihre Daten schützen und verarbeiten.',
}

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <nav className="container-width py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo/logo.png"
              alt="Zürich Nachhilfe Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-slate-900">Zürich Nachhilfe</span>
          </Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="mb-6">
            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Mit dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung Ihrer personenbezogenen Daten beim Besuch unserer Website und bei der Nutzung unserer Dienstleistungen.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Verantwortliche Stelle</h2>
            <p className="mb-4">
              Bildungsinstitut Fokus AG<br />
              Staffelstr 8<br />
              8045 Zürich<br />
              Schweiz<br />
              E-Mail: dantico@fokus-nachhilfe.ch<br />
              Telefon: 078 314 62 65
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Datenschutzbeauftragte Person</h2>
            <p className="mb-4">
              Giuseppe D&apos;Antico<br />
              Telefon: 078 314 62 65<br />
              E-Mail: dantico@fokus-nachhilfe.ch
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Erhebung und Verarbeitung von Daten</h2>
            <p className="mb-4">
              Wir erheben und verarbeiten Ihre Daten ausschliesslich im Rahmen der gesetzlichen Bestimmungen des schweizerischen Datenschutzrechts. Beim Besuch unserer Website werden automatisch folgende Daten erfasst:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IP-Adresse</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name der abgerufenen Datei</li>
              <li>Übertragene Datenmenge</li>
              <li>Meldung über erfolgreichen Abruf</li>
              <li>Webbrowser und Browserversion</li>
              <li>Betriebssystem</li>
              <li>Referrer URL (die zuvor besuchte Seite)</li>
            </ul>
            <p className="mb-4">
              Diese Daten werden ausschliesslich zu statistischen Zwecken und zur Verbesserung unseres Angebots verwendet. Eine Zuordnung zu einzelnen Personen findet nicht statt.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Kontaktformular und E-Mail-Kontakt</h2>
            <p className="mb-4">
              Wenn Sie uns per Kontaktformular oder E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung der Anfrage und für mögliche Anschlussfragen gespeichert. Folgende Daten werden dabei erhoben:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Vor- und Nachname</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer (optional)</li>
              <li>Ihre Nachricht</li>
              <li>Informationen zum gewünschten Nachhilfefach und Schulstufe</li>
              <li>Postleitzahl für regionale Zuordnung</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Nutzung und Weitergabe personenbezogener Daten</h2>
            <p className="mb-4">
              Ihre personenbezogenen Daten werden nur für die Durchführung der Nachhilfevermittlung in Zürich und damit verbundener Dienstleistungen verwendet. Eine Weitergabe Ihrer Daten erfolgt ausschliesslich:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>An die von Ihnen ausgewählten oder für Sie passenden Nachhilfelehrer in Zürich</li>
              <li>An Dienstleister, die uns bei der Bereitstellung unserer Services unterstützen (z.B. IT-Dienstleister, Hosting-Provider)</li>
              <li>Wenn wir gesetzlich dazu verpflichtet sind</li>
              <li>Wenn Sie uns Ihre ausdrückliche Einwilligung erteilt haben</li>
            </ul>
            <p className="mb-4">
              Eine Weitergabe an Dritte zu Werbezwecken erfolgt nicht.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Cookies</h2>
            <p className="mb-4">
              Unsere Website verwendet Cookies, um die Benutzerfreundlichkeit zu verbessern. Cookies sind kleine Textdateien, die auf Ihrem Computer gespeichert werden. Sie können die Verwendung von Cookies durch entsprechende Einstellungen in Ihrem Browser verhindern, wodurch jedoch möglicherweise nicht alle Funktionen unserer Website vollumfänglich nutzbar sind.
            </p>
            <p className="mb-4">
              Wir verwenden folgende Arten von Cookies:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Technisch notwendige Cookies:</strong> Diese sind für den Betrieb der Website erforderlich</li>
              <li><strong>Analyse-Cookies:</strong> Diese helfen uns, die Nutzung unserer Website zu verstehen und zu verbessern</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Datensicherheit</h2>
            <p className="mb-4">
              Wir setzen technische und organisatorische Sicherheitsmassnahmen ein, um Ihre durch uns verwalteten Daten gegen Manipulation, Verlust, Zerstörung und gegen den Zugriff unberechtigter Personen zu schützen. Unsere Sicherheitsmassnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.
            </p>
            <p className="mb-4">
              Die Datenübertragung im Internet erfolgt über eine verschlüsselte SSL/TLS-Verbindung.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Ihre Rechte</h2>
            <p className="mb-4">
              Nach dem schweizerischen Datenschutzgesetz haben Sie folgende Rechte:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Auskunftsrecht:</strong> Sie können jederzeit Auskunft über Ihre bei uns gespeicherten Daten verlangen</li>
              <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen</li>
              <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen</li>
              <li><strong>Einschränkung der Verarbeitung:</strong> Sie können die Einschränkung der Datenverarbeitung verlangen</li>
              <li><strong>Datenübertragbarkeit:</strong> Sie können verlangen, dass wir Ihnen Ihre Daten in einem strukturierten Format zur Verfügung stellen</li>
              <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen</li>
              <li><strong>Widerruf der Einwilligung:</strong> Sie können eine erteilte Einwilligung jederzeit widerrufen</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Aufbewahrungsfristen</h2>
            <p className="mb-4">
              Wir speichern Ihre personenbezogenen Daten nur so lange, wie dies für die Erfüllung der jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Nach Ablauf dieser Fristen werden die Daten gelöscht oder anonymisiert.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Änderungen dieser Datenschutzerklärung</h2>
            <p className="mb-4">
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder bei Änderungen unserer Dienstleistungen sowie der Datenverarbeitung anzupassen. Die jeweils aktuelle Version finden Sie auf unserer Website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Kontakt</h2>
            <p className="mb-4">
              Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten sowie Widerruf erteilter Einwilligungen wenden Sie sich bitte an:
            </p>
            <p className="mb-4">
              Zürich Nachhilfe<br />
              Bildungsinstitut Fokus AG<br />
              Staffelstr 8<br />
              8045 Zürich<br />
              E-Mail: dantico@fokus-nachhilfe.ch<br />
              Telefon: 078 314 62 65
            </p>
          </section>

          <p className="mt-8 text-sm text-gray-600">
            Stand: Dezember 2024
          </p>
        </div>
      </div>
    </div>
  )
}