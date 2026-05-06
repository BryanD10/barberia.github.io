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
        subtitle="Ofrecemos una experiencia completa de cuidado personal con los mejores productos y técnicas del mercado."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {servicesData.map((service, index) => {
          const Icon = iconMap[service.icon]
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-dark-card p-10 border border-dark-border text-center relative overflow-hidden group transition-all duration-400 hover:border-gold hover:shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div className="text-4xl text-gold mb-5 flex justify-center">
                <Icon size={40} />
              </div>
              <h3 className="text-xl mb-4 text-white font-serif font-bold">{service.name}</h3>
              <p className="text-text-gray leading-relaxed mb-5">{service.desc}</p>
              <div className="text-gold text-xl font-bold">${service.price.toFixed(2)}</div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}