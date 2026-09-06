import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, User, Phone, Mail, Scissors, CheckCircle, ArrowLeft } from 'lucide-react'
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
      <div className="min-h-screen bg-dark-deeper flex items-center justify-center px-5 pt-24">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-dark-card border border-dark-border p-12 max-w-lg w-full text-center">
          <CheckCircle className="text-gold mx-auto mb-6" size={48} />
          <h2 className="text-3xl font-serif font-bold text-white mb-4">¡Reserva Confirmada!</h2>
          <p className="text-text-gray mb-8">Te contactaremos pronto para confirmar tu cita.</p>
          <Link to="/" className="btn btn-primary">Volver al inicio</Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-deeper pt-28 pb-16 px-5">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-text-gray hover:text-gold mb-8 transition-colors">
          <ArrowLeft size={18} /> Volver
        </Link>
        <h1 className="text-4xl font-serif font-bold text-white mb-2">Reservar Cita</h1>
        <p className="text-text-gray mb-10">Paso {step} de 4</p>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl text-gold mb-4 flex items-center gap-2"><Scissors size={20} /> Elige tu servicio</h2>
            {servicesData.map((s, i) => (
              <button key={i} onClick={() => { update('service', i); setStep(2) }} className={`w-full text-left p-5 border transition-all ${booking.service === i ? 'border-gold bg-gold/10' : 'border-dark-border hover:border-gold'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-semibold">{s.name}</h3>
                    <p className="text-text-gray text-sm">{s.desc}</p>
                  </div>
                  <span className="text-gold font-bold">${s.price}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl text-gold mb-4 flex items-center gap-2"><User size={20} /> Elige barbero</h2>
            {barbers.map(b => (
              <button key={b.id} onClick={() => { update('barber', b.id); setStep(3) }} className={`w-full text-left p-5 border transition-all ${booking.barber === b.id ? 'border-gold bg-gold/10' : 'border-dark-border hover:border-gold'}`}>
                <h3 className="text-white font-semibold">{b.name}</h3>
                <p className="text-text-gray text-sm">{b.specialty}</p>
              </button>
            ))}
            <button onClick={() => setStep(1)} className="text-text-gray hover:text-gold text-sm">← Atrás</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl text-gold mb-4 flex items-center gap-2"><Calendar size={20} /> Fecha y hora</h2>
            <input type="date" value={booking.date} onChange={e => update('date', e.target.value)} className="w-full px-4 py-3 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none" />
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map(t => (
                <button key={t} onClick={() => update('time', t)} className={`py-3 border text-sm ${booking.time === t ? 'border-gold bg-gold text-dark' : 'border-dark-border text-white hover:border-gold'}`}>{t}</button>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="text-text-gray hover:text-gold text-sm">← Atrás</button>
              <button onClick={() => booking.date && booking.time && setStep(4)} disabled={!booking.date || !booking.time} className="btn btn-primary disabled:opacity-50">Continuar</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-5">
            <h2 className="text-xl text-gold mb-4 flex items-center gap-2"><Mail size={20} /> Tus datos</h2>
            <input required placeholder="Nombre completo" value={booking.name} onChange={e => update('name', e.target.value)} className="w-full px-4 py-3 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none" />
            <input required type="tel" placeholder="Teléfono" value={booking.phone} onChange={e => update('phone', e.target.value)} className="w-full px-4 py-3 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none" />
            <input required type="email" placeholder="Email" value={booking.email} onChange={e => update('email', e.target.value)} className="w-full px-4 py-3 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none" />
            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(3)} className="text-text-gray hover:text-gold text-sm">← Atrás</button>
              <button type="submit" className="btn btn-primary">Confirmar Reserva</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
