import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Impressum | Zürich Nachhilfe',
  description: 'Impressum von Zürich Nachhilfe - Kontaktinformationen und rechtliche Hinweise.',
}

export default function Impressum() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-4">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Zürich Nachhilfe" 
                width={240}
                height={80}
                className="h-20 w-auto"
              />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Betreiber der Website</h2>
            <p className="mb-4">
              <strong>Zürich Nachhilfe</strong><br />
              Bildungsinstitut Fokus AG<br />
              Staffelstr 8<br />
              8045 Zürich<br />
              Schweiz
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontakt</h2>
            <p className="mb-4">
              <strong>E-Mail:</strong> dantico@fokus-nachhilfe.ch<br />
              <strong>Support-Hotline:</strong> 078 314 62 65
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vertretungsberechtigte Personen</h2>
            <p className="mb-4">
              <strong>Geschäftsführung:</strong><br />
              Giuseppe D&apos;Antico<br />
              Liam Mörker<br />
              Ciril Bullinger
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Handelsregistereintrag</h2>
            <p className="mb-4">
              <strong>Firma:</strong> Bildungsinstitut Fokus AG<br />
              <strong>Rechtsform:</strong> Aktiengesellschaft (AG)<br />
              <strong>Handelsregister:</strong> Handelsregister des Kantons Zürich<br />
              <strong>Handelsregisternummer:</strong> CHE-XXX.XXX.XXX<br />
              <strong>Sitz:</strong> Zürich
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Mehrwertsteuer</h2>
            <p className="mb-4">
              <strong>UID-Nummer:</strong> CHE-123.456.789 MWST
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Verantwortlich für den Inhalt</h2>
            <p className="mb-4">
              Giuseppe D&apos;Antico<br />
              Bildungsinstitut Fokus AG<br />
              Staffelstr 8<br />
              8045 Zürich<br />
              E-Mail: dantico@fokus-nachhilfe.ch
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Haftungsausschluss</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Haftung für Inhalte</h3>
            <p className="mb-4">
              Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Haftung für Links</h3>
            <p className="mb-4">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Urheberrecht</h2>
            <p className="mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mb-4">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Datenschutz</h2>
            <p className="mb-4">
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>
            <p className="mb-4">
              Weitere Informationen zum Datenschutz finden Sie in unserer <Link href="/datenschutz" className="text-primary hover:text-primary-600 underline">Datenschutzerklärung</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Anwendbares Recht und Gerichtsstand</h2>
            <p className="mb-4">
              Es gilt ausschliesslich schweizerisches Recht. Gerichtsstand ist Zürich, Schweiz.
            </p>
          </section>

          <p className="mt-8 text-sm text-gray-600">
            Stand: Dezember 2024
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 Zürich Nachhilfe. Alle Rechte vorbehalten.</p>
            <div className="mt-2 space-x-4">
              <Link href="/datenschutz" className="hover:text-primary">Datenschutz</Link>
              <Link href="/impressum" className="hover:text-primary">Impressum</Link>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Ein Service der Bildungsinstitut Fokus AG
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}