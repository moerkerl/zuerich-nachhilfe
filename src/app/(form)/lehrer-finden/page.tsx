import { Metadata } from 'next'
import MultiStepForm from '@/components/MultiStepForm'

export const metadata: Metadata = {
  title: 'Tutor finden | Zürich Nachhilfe',
  description: 'Finden Sie den perfekten Nachhilfelehrer in Zürich. Beantworten Sie einige Fragen und wir vermitteln Ihnen qualifizierte Tutoren.',
}

export default function LehrerFinden() {
  return (
    <MultiStepForm />
  )
}