interface Benefit {
  icon: string
  title: string
  description: string
}

interface LPBenefitsProps {
  benefits: Benefit[]
}

export default function LPBenefits({ benefits }: LPBenefitsProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                <span className="text-3xl">{benefit.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-slate-600 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}