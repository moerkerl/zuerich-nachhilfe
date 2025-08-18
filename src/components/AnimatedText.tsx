'use client'

import { useState, useEffect } from 'react'

interface AnimatedTextProps {
  text: string
  onAnimationComplete?: () => void
}

export default function AnimatedText({ text, onAnimationComplete }: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, 100)
      return () => clearTimeout(timer)
    } else if (!isComplete) {
      setIsComplete(true)
      setTimeout(() => {
        onAnimationComplete?.()
      }, 300)
    }
  }, [displayedText, text, isComplete, onAnimationComplete])

  return (
    <span className="relative">
      <span className={`transition-all duration-300 ${isComplete ? 'text-primary' : ''}`}>
        {displayedText}
      </span>
      <span 
        className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300 ${
          isComplete ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`}
        style={{ transform: 'translateY(4px)' }}
      />
      {!isComplete && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </span>
  )
}