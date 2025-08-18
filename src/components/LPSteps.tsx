'use client'

import { useRouter } from 'next/navigation'

interface Step {
  number: number
  title: string
  description: string
}

interface LPStepsProps {
  title: string
  steps: Step[]
  ctaText?: string
  onCtaClick?: () => void
}

export default function LPSteps({ title, steps, ctaText, onCtaClick }: LPStepsProps) {
  const router = useRouter()
  
  const handleClick = () => {
    if (onCtaClick) {
      onCtaClick()
    } else if (ctaText) {
      router.push('/lehrer-finden')
    }
  }

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-width">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">
          {title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        {ctaText && (
          <div className="text-center">
            <button 
              onClick={handleClick}
              className="btn-primary"
            >
              {ctaText}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}