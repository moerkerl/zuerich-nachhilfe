interface Testimonial {
  name: string
  text: string
  rating: number
}

interface LPTestimonialProps {
  title: string
  testimonials: Testimonial[]
}

export default function LPTestimonial({ title, testimonials }: LPTestimonialProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">
          {title}
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <blockquote className="text-slate-700 mb-6 italic text-lg leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <cite className="text-slate-900 font-semibold not-italic">
                {testimonial.name}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}