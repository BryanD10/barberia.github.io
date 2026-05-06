import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react'
import SectionHeader from '../UI/SectionHeader'
import { servicesOptions } from '../../data/servicesData'
import { useCart } from '../../context/CartContext'

export default function Contact() {
  const { showToast } = useCart()
  const [formData, setFormData] = useState({
    name: '', phone: '', service: '', datetime: '', message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica de envío real
    showToast?.('¡Cita agendada con éxito! Te contactaremos pronto.')
    setFormData({ name: '', phone: '', service: '', datetime: '', message: '' })
  }

  const contactInfo = [
    { icon: MapPin, title: 'Dirección', text: 'Av. Principal #123, Centro' },
    { icon: Phone, title: 'Teléfono', text: '+1 (555) 123-4567' },
    { icon: Clock, title: 'Horario', text: 'Lun - Sáb: 9:00 AM - 8:00 PM' },
    { icon: Mail, title: 'Email', text: 'info@masterbarber.com' },
  ]

  return (
    <section id="contacto" className="section-padding bg-dark-deeper">
      <SectionHeader 
        title="Reserva tu Cita" 
        subtitle="Visítanos o contáctanos para agendar tu próximo corte."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl text-white mb-5 font-serif font-bold">Visítanos</h3>
          <p className="text-text-gray leading-relaxed mb-8">
            Estamos ubicados en el corazón de la ciudad, listos para brindarte la mejor experiencia de barbería.
          </p>

          <div className="flex flex-col gap-5">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-dark-card border border-dark-border rounded-full flex items-center justify-center text-gold shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-0.5">{item.title}</h4>
                  <p className="text-text-gray text-sm">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-dark-card border border-dark-border p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-text-gray text-sm uppercase tracking-wider mb-2">Nombre Completo</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Tu nombre"
                className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white placeholder-text-gray/50 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-text-gray text-sm uppercase tracking-wider mb-2">Teléfono</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="Tu teléfono"
                className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white placeholder-text-gray/50 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-text-gray text-sm uppercase tracking-wider mb-2">Servicio</label>
              <select 
                required
                value={formData.service}
                onChange={e => setFormData({...formData, service: e.target.value})}
                className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none transition-colors"
              >
                <option value="">Selecciona un servicio</option>
                {servicesOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-text-gray text-sm uppercase tracking-wider mb-2">Fecha y Hora</label>
              <input 
                type="datetime-local" 
                required
                value={formData.datetime}
                onChange={e => setFormData({...formData, datetime: e.target.value})}
                className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-text-gray text-sm uppercase tracking-wider mb-2">Mensaje (Opcional)</label>
              <textarea 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                placeholder="Detalles adicionales..."
                rows={4}
                className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white placeholder-text-gray/50 focus:border-gold focus:outline-none transition-colors resize-y"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-gold text-dark font-bold uppercase tracking-widest hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <Send size={18} />
              Agendar Cita
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}