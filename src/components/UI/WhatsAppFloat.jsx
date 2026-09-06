import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  const phone = '15551234567' // Cambia por el número real de la barbería
  const message = encodeURIComponent('¡Hola! Quiero reservar una cita en Master Barber Studio.')
  const url = `https://wa.me/${phone}?text=${message}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl"
      title="Escribir por WhatsApp"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
    </a>
  )
}
