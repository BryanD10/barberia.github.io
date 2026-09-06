import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, User, Scissors, CheckCircle, ArrowLeft, Phone, Mail } from 'lucide-react'
import { servicesData } from '../data/servicesData'

const barbers = [
  { id: 0, name: 'Carlos Mendez', specialty: 'Master Barber' },
  { id: 1, name: 'Alex Rivera', specialty: 'Especialista en Fades' },
  { id: 2, name: 'Diego Torres', specialty: 'Colorista' },
]

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState({ service: null, barber: null, date: '', time: '', name: '', phone: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const update = (field, value) => setBooking(prev => ({ ...prev, [field]: value }))

  if (submitted) {
    return (
      <div className="min-h-[100svh] bg-dark-deeper flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-dark-card border border-dark-border p-8 sm:p-12 max-w-md w-full text-center rounded-sm"
        >
          <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="text-gold" size={36} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">¡Reserva Confirmada!</h2>
          <p className="text-text-gray mb-8 text-sm sm:text-base">
            Te contactaremos pronto para confirmar tu cita.
          </p>
          <Link to="/" className="btn btn-primary w-full sm:w-auto">Volver al inicio</Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-[100svh] bg-dark-deeper pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-text-gray hover:text-gold mb-6 sm:mb-8 transition-colors text-sm">
          <ArrowLeft size={16} /> Volver
        </Link>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1">Reservar Cita</h1>
        <p className="text-text-gray mb-8 text-sm">Paso {step} de 4</p>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-gold' : 'bg-dark-border'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-3">
            <h2 className="text-lg text-gold mb-4 flex items-center gap-2 font-medium">
              <Scissors size={18} /> Elige tu servicio
            </h2>
            {servicesData.map((s, i) => (
              <button 
                key={i} 
                onClick={() => { update('service', i); setStep(2) }} 
                className={`w-full text-left p-4 sm:p-5 border transition-all rounded-sm ${
                  booking.service === i ? 'border-gold bg-gold/10' : 'border-dark-border hover:border-gold/50'
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="text-white font-semibold">{s.name}</h3>
                    <p className="text-text-gray text-sm mt-1 line-clamp-2">{s.desc}</p>
                  </div>
                  <span className="text-gold font-bold whitespace-nowrap">${s.price}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <h2 className="text-lg text-gold mb-4 flex items-center gap-2 font-medium">
              <User size={18} /> Elige barbero
            </h2>
            {barbers.map(b => (
              <button 
                key={b.id} 
                onClick={() => { update('barber', b.id); setStep(3) }} 
                className={`w-full text-left p-4 sm:p-5 border transition-all rounded-sm ${
                  booking.barber === b.id ? 'border-gold bg-gold/10' : 'border-dark-border hover:border-gold/50'
                }`}
              >
                <h3 className="text-white font-semibold">{b.name}</h3>
                <p className="text-text-gray text-sm mt-0.5">{b.specialty}</p>
              </button>
            ))}
            <button onClick={() => setStep(1)} className="text-text-gray hover:text-gold text-sm mt-4">← Atrás</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg text-gold mb-2 flex items-center gap-2 font-medium">
              <Calendar size={18} /> Fecha y hora
            </h2>
            <input 
              type="date" 
              value={booking.date} 
              onChange={e => update('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none rounded-sm"
            />
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {timeSlots.map(t => (
                <button 
                  key={t} 
                  onClick={() => update('time', t)} 
                  className={`py-3 border text-sm rounded-sm transition-all ${
                    booking.time === t 
                      ? 'border-gold bg-gold text-dark font-semibold' 
                      : 'border-dark-border text-white hover:border-gold/50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-4 pt-2">
              <button onClick={() => setStep(2)} className="text-text-gray hover:text-gold text-sm">← Atrás</button>
              <button 
                onClick={() => booking.date && booking.time && setStep(4)} 
                disabled={!booking.date || !booking.time} 
                className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-4">
            <h2 className="text-lg text-gold mb-2 flex items-center gap-2 font-medium">
              <Mail size={18} /> Tus datos
            </h2>
            <input 
              required 
              placeholder="Nombre completo" 
              value={booking.name} 
              onChange={e => update('name', e.target.value)} 
              className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white placeholder-text-gray/50 focus:border-gold focus:outline-none rounded-sm" 
            />
            <input 
              required 
              type="tel" 
              placeholder="Teléfono" 
              value={booking.phone} 
              onChange={e => update('phone', e.target.value)} 
              className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white placeholder-text-gray/50 focus:border-gold focus:outline-none rounded-sm" 
            />
            <input 
              required 
              type="email" 
              placeholder="Email" 
              value={booking.email} 
              onChange={e => update('email', e.target.value)} 
              className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white placeholder-text-gray/50 focus:border-gold focus:outline-none rounded-sm" 
            />
            <div className="flex gap-4 pt-2">
              <button type="button" onClick={() => setStep(3)} className="text-text-gray hover:text-gold text-sm">← Atrás</button>
              <button type="submit" className="btn btn-primary">Confirmar Reserva</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
