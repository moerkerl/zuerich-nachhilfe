
export default function FormLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}