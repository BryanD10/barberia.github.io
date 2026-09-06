import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section id="inicio" className="min-h-[100svh] relative flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10,10,10,0.92), rgba(10,10,10,0.75)), url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-16">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-gold text-sm sm:text-base tracking-[4px] sm:tracking-[6px] uppercase mb-4 sm:mb-5"
        >
          Estilo & Tradición
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-5 sm:mb-6 font-serif"
        >
          Donde el Estilo se<br className="hidden sm:block" /> Convierte en Arte
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-base sm:text-lg text-text-gray mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Expertos en cortes clásicos y modernos. Transformamos tu look con precisión y dedicación desde 2015.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link to="/reservar" className="btn btn-primary w-full sm:w-auto min-w-[180px]">
            Reservar Cita
          </Link>
          <a href="#galeria" className="btn w-full sm:w-auto min-w-[180px]">
            Ver Trabajos
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <ChevronDown className="text-gold/80" size={28} />
      </motion.div>
    </section>
  )
}
