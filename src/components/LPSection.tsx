'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface LPSectionProps {
  title: string
  content: string
  bulletPoints?: string[]
  buttonText?: string
  imageSrc?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  backgroundColor?: 'white' | 'gray'
  onButtonClick?: () => void
}

export default function LPSection({ 
  title, 
  content, 
  bulletPoints = [], 
  buttonText, 
  imageSrc, 
  imageAlt, 
  imagePosition = 'right',
  backgroundColor = 'white',
  onButtonClick
}: LPSectionProps) {
  const router = useRouter()
  
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick()
    } else if (buttonText) {
      router.push('/lehrer-finden')
    }
  }

  const bgClass = backgroundColor === 'gray' ? 'bg-slate-50' : 'bg-white'

  return (
    <section className={`section-padding ${bgClass}`}>
      <div className="container-width">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Content */}
          <div className={imagePosition === 'left' ? 'lg:col-start-2' : ''}>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                {title}
              </h2>
              {content && (
                <p className="text-lg text-slate-600">
                  {content}
                </p>
              )}
              {bulletPoints.length > 0 && (
                <ul className="space-y-3">
                  {bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">•</span>
                      <span className="text-slate-700">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              {buttonText && (
                <button 
                  onClick={handleClick}
                  className="btn-primary"
                >
                  {buttonText}
                </button>
              )}
            </div>
          </div>

          {/* Image */}
          {imageSrc && (
            <div className={imagePosition === 'left' ? 'lg:col-start-1' : ''}>
              <div className="relative h-[400px] lg:h-[500px]">
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}