import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function SectionHeader({ title, subtitle }) {
  const ref = useScrollReveal()

  return (
    <div ref={ref} className="text-center mb-16 reveal">
      <h2 className="text-3xl md:text-5xl text-white mb-4 font-serif font-bold relative inline-block">
        {title}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gold" />
      </h2>
      <p className="text-text-gray text-lg mt-8 max-w-xl mx-auto">{subtitle}</p>
    </div>
  )
}