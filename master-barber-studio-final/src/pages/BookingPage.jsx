import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Calendar, Clock, User, Phone, Mail, Scissors, 
  CheckCircle, ArrowLeft, CreditCard, Gift, Star,
  MapPin, Info, ChevronRight
} from 'lucide-react'
import { servicesData } from '../data/servicesData'

const barbers = [
  { id: 1, name: 'Carlos Mendez', specialty: 'Master Barber', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', rating: 5.0, reviews: 234 },
  { id: 2, name: 'Alex Rivera', specialty: 'Especialista en Fades', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', rating: 4.9, reviews: 189 },
  { id: 3, name: 'Diego Torres', specialty: 'Colorista', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', rating: 4.8, reviews: 156 },
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
]

const steps = [
  { id: 1, label: 'Servicio', icon: Scissors },
  { id: 2, label: 'Barbero', icon: User },
  { id: 3, label: 'Fecha', icon: Calendar },
  { id: 4, label: 'Datos', icon: CreditCard },
  { id: 5, label: 'Confirmar', icon: CheckCircle },
]

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [booking, setBooking] = useState({
    service: null,
    barber: null,
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const updateBooking = (field, value) => {
    setBooking(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return booking.service !== null
      case 2: return booking.barber !== null
      case 3: return booking.date && booking.time
      case 4: return booking.name && booking.phone && booking.email
      default: return true
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-dark-deeper flex items-center justify-center px-5 pt-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-dark-card border border-dark-border p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-gold" size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Reserva Confirmada!</h2>
          <p className="text-text-gray mb-8">
            Hemos recibido tu solicitud de reserva. Te enviaremos un correo de confirmacion a <span className="text-gold">{booking.email}</span> con los detalles.
          </p>
          <div className="bg-dark p-6 rounded mb-8 text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-text-gray">Servicio:</span>
              <span className="text-white font-semibold">{servicesData[booking.service]?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-gray">Barbero:</span>
              <span className="text-white font-semibold">{barbers[booking.barber]?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-gray">Fecha:</span>
              <span className="text-white font-semibold">{booking.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-gray">Hora:</span>
              <span className="text-white font-semibold">{booking.time}</span>
            </div>
            <div className="border-t border-dark-border pt-3 flex justify-between">
              <span className="text-text-gray">Total:</span>
              <span className="text-gold font-bold text-xl">${servicesData[booking.service]?.price.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/" className="btn btn-primary inline-block">
            Volver al Inicio
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-deeper pt-24 pb-20 px-[5%]">
      <div className="max-w-4xl mx-auto mb-10">
        <Link to="/" className="inline-flex items-center gap-2 text-text-gray hover:text-gold transition-colors mb-6">
          <ArrowLeft size={18} />
          <span>Volver al inicio</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Reserva tu Cita</h1>
        <p className="text-text-gray">Completa los siguientes pasos para agendar tu proximo corte.</p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-gold text-dark' 
                    : 'bg-dark-card border border-dark-border text-text-gray'
                }`}>
                  <step.icon size={20} />
                </div>
                <span className={`text-xs mt-2 uppercase tracking-wider ${
                  currentStep >= step.id ? 'text-gold' : 'text-text-gray'
                }`}>{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                  currentStep > step.id ? 'bg-gold' : 'bg-dark-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Selecciona un Servicio</h2>
              {servicesData.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => updateBooking('service', index)}
                  className={`p-6 border cursor-pointer transition-all duration-300 flex items-center gap-6 ${
                    booking.service === index 
                      ? 'border-gold bg-gold/5' 
                      : 'border-dark-border bg-dark-card hover:border-gold/50'
                  }`}
                >
                  <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center text-gold shrink-0">
                    <Scissors size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-lg font-semibold mb-1">{service.name}</h3>
                    <p className="text-text-gray text-sm">{service.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-gold text-xl font-bold">${service.price.toFixed(2)}</div>
                    <div className="text-text-gray text-xs">~45 min</div>
                  </div>
                  {booking.service === index && (
                    <CheckCircle className="text-gold shrink-0" size={24} />
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Elige tu Barbero</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {barbers.map((barber, index) => (
                  <motion.div
                    key={barber.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => updateBooking('barber', index)}
                    className={`p-6 border cursor-pointer transition-all duration-300 text-center ${
                      booking.barber === index 
                        ? 'border-gold bg-gold/5' 
                        : 'border-dark-border bg-dark-card hover:border-gold/50'
                    }`}
                  >
                    <img src={barber.image} alt={barber.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                    <h3 className="text-white font-semibold mb-1">{barber.name}</h3>
                    <p className="text-gold text-sm mb-3">{barber.specialty}</p>
                    <div className="flex items-center justify-center gap-1 text-gold text-sm">
                      <Star size={14} fill="currentColor" />
                      <span>{barber.rating}</span>
                      <span className="text-text-gray">({barber.reviews} resenas)</span>
                    </div>
                    {booking.barber === index && (
                      <div className="mt-4">
                        <CheckCircle className="text-gold mx-auto" size={24} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Selecciona Fecha y Hora</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-dark-card border border-dark-border p-6">
                  <label className="block text-text-gray text-sm uppercase tracking-wider mb-3">Fecha</label>
                  <input
                    type="date"
                    required
                    value={booking.date}
                    onChange={e => updateBooking('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="bg-dark-card border border-dark-border p-6">
                  <label className="block text-text-gray text-sm uppercase tracking-wider mb-3">Hora</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => updateBooking('time', time)}
                        className={`py-2.5 text-sm border transition-all duration-200 ${
                          booking.time === time
                            ? 'bg-gold text-dark border-gold'
                            : 'bg-dark text-text-gray border-dark-border hover:border-gold/50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-dark-card border border-dark-border p-6 flex items-center gap-4">
                <Info className="text-gold shrink-0" size={24} />
                <div>
                  <h4 className="text-white font-semibold mb-1">Horario de Atencion</h4>
                  <p className="text-text-gray text-sm">Lunes a Sabado de 9:00 AM a 8:00 PM. Domingos cerrado.</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Tus Datos</h2>
              <div className="bg-dark-card border border-dark-border p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-text-gray text-sm uppercase tracking-wider mb-2">Nombre Completo *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray" size={18} />
                      <input
                        type="text"
                        required
                        value={booking.name}
                        onChange={e => updateBooking('name', e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full pl-12 pr-4 py-3.5 bg-dark border border-dark-border text-white placeholder-text-gray/50 focus:border-gold focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-text-gray text-sm uppercase tracking-wider mb-2">Telefono *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray" size={18} />
                      <input
                        type="tel"
                        required
                        value={booking.phone}
                        onChange={e => updateBooking('phone', e.target.value)}
                        placeholder="Tu telefono"
                        className="w-full pl-12 pr-4 py-3.5 bg-dark border border-dark-border text-white placeholder-text-gray/50 focus:border-gold focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-text-gray text-sm uppercase tracking-wider mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray" size={18} />
                    <input
                      type="email"
                      required
                      value={booking.email}
                      onChange={e => updateBooking('email', e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-dark border border-dark-border text-white placeholder-text-gray/50 focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-text-gray text-sm uppercase tracking-wider mb-2">Notas Adicionales</label>
                  <textarea
                    value={booking.notes}
                    onChange={e => updateBooking('notes', e.target.value)}
                    placeholder="Detalles especiales sobre tu corte..."
                    rows={4}
                    className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white placeholder-text-gray/50 focus:border-gold focus:outline-none transition-colors resize-y"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Confirma tu Reserva</h2>
              <div className="bg-dark-card border border-dark-border p-8 space-y-6">
                <div className="flex items-start gap-4 pb-6 border-b border-dark-border">
                  <Scissors className="text-gold shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-text-gray text-sm uppercase tracking-wider mb-1">Servicio</h4>
                    <p className="text-white text-lg font-semibold">{servicesData[booking.service]?.name}</p>
                    <p className="text-text-gray text-sm">{servicesData[booking.service]?.desc}</p>
                  </div>
                  <div className="ml-auto text-gold font-bold text-xl">${servicesData[booking.service]?.price.toFixed(2)}</div>
                </div>

                <div className="flex items-start gap-4 pb-6 border-b border-dark-border">
                  <User className="text-gold shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-text-gray text-sm uppercase tracking-wider mb-1">Barbero</h4>
                    <p className="text-white text-lg font-semibold">{barbers[booking.barber]?.name}</p>
                    <p className="text-text-gray text-sm">{barbers[booking.barber]?.specialty}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-6 border-b border-dark-border">
                  <Calendar className="text-gold shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-text-gray text-sm uppercase tracking-wider mb-1">Fecha y Hora</h4>
                    <p className="text-white text-lg font-semibold">{booking.date} a las {booking.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-6 border-b border-dark-border">
                  <MapPin className="text-gold shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-text-gray text-sm uppercase tracking-wider mb-1">Ubicacion</h4>
                    <p className="text-white">Av. Principal #123, Centro</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CreditCard className="text-gold shrink-0 mt-1" size={24} />
                  <div className="flex-1">
                    <h4 className="text-text-gray text-sm uppercase tracking-wider mb-3">Metodo de Pago</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {['Efectivo', 'Tarjeta', 'Transferencia'].map(method => (
                        <button key={method} className="py-3 border border-dark-border text-text-gray hover:border-gold hover:text-gold transition-all text-sm">
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-dark p-4 rounded flex items-center gap-3">
                  <Gift className="text-gold" size={20} />
                  <p className="text-text-gray text-sm">Tienes un codigo de descuento? <span className="text-gold cursor-pointer hover:underline">Aplicar</span></p>
                </div>

                <form onSubmit={handleSubmit}>
                  <button type="submit" className="w-full py-4 bg-gold text-dark font-bold uppercase tracking-widest hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <CheckCircle size={20} />
                    Confirmar Reserva
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>

        <div className="flex justify-between mt-10">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-8 py-3 border border-dark-border text-sm uppercase tracking-widest transition-all ${
              currentStep === 1 
                ? 'opacity-50 cursor-not-allowed text-text-gray' 
                : 'text-white hover:border-gold hover:text-gold'
            }`}
          >
            Anterior
          </button>

          {currentStep < 5 && (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`px-8 py-3 text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${
                canProceed()
                  ? 'bg-gold text-dark hover:bg-gold-light'
                  : 'bg-dark-card text-text-gray cursor-not-allowed'
              }`}
            >
              Siguiente
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
