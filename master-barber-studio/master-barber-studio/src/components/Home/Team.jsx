import { motion } from 'framer-motion'
import { Instagram, Facebook } from 'lucide-react'
import SectionHeader from '../UI/SectionHeader'

const teamData = [
  { name: 'Carlos Mendez', role: 'Master Barber & Fundador', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', socials: ['instagram', 'facebook'] },
  { name: 'Alex Rivera', role: 'Especialista en Fades', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', socials: ['instagram', 'tiktok'] },
  { name: 'Diego Torres', role: 'Barbero & Colorista', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', socials: ['instagram'] },
]

export default function Team() {
  return (
    <section id="equipo" className="section-padding bg-dark">
      <SectionHeader 
        title="Nuestro Equipo" 
        subtitle="Profesionales apasionados por el arte de la barbería."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {teamData.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="relative overflow-hidden rounded group"
          >
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent translate-y-5 group-hover:translate-y-0 transition-transform duration-400">
              <h3 className="text-gold text-xl font-serif font-bold mb-1">{member.name}</h3>
              <p className="text-text-gray mb-4">{member.role}</p>
              <div className="flex gap-4">
                {member.socials.includes('instagram') && (
                  <a href="#" className="text-white hover:text-gold transition-colors"><Instagram size={18} /></a>
                )}
                {member.socials.includes('facebook') && (
                  <a href="#" className="text-white hover:text-gold transition-colors"><Facebook size={18} /></a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}