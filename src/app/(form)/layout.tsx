import Link from 'next/link'
import Image from 'next/image'

export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container-width py-4">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}