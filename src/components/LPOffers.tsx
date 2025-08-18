interface Offer {
  icon: string
  title: string
  description: string
}

interface LPOffersProps {
  title: string
  offers: Offer[]
}

export default function LPOffers({ title, offers }: LPOffersProps) {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">{offer.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">
                {offer.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed text-center">
                {offer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}