import { motion } from 'framer-motion'
import { Scissors, Sparkles, Brush, Hand, Paintbrush, Crown } from 'lucide-react'
import SectionHeader from '../UI/SectionHeader'
import { servicesData } from '../../data/servicesData'

const iconMap = { Scissors, Sparkles, Brush, Hand, Paintbrush, Crown }

export default function Services() {
  return (
    <section id="servicios" className="section-padding bg-dark-deeper">
      <SectionHeader 
        title="Nuestros Servicios" 
        subtitle="Experiencia completa de cuidado personal con las mejores técnicas y productos."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
        {servicesData.map((service, index) => {
          const Icon = iconMap[service.icon]
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="card-premium p-6 sm:p-8 text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div className="text-gold mb-4 flex justify-center">
                <Icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg sm:text-xl mb-3 text-white font-serif font-bold">{service.name}</h3>
              <p className="text-text-gray text-sm leading-relaxed mb-5">{service.desc}</p>
              <div className="text-gold text-xl font-bold">${service.price.toFixed(2)}</div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
