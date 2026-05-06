import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section id="inicio" className="h-screen relative flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10,10,10,0.9), rgba(10,10,10,0.7)), url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          filter: 'brightness(0.6)'
        }}
      />

      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gold text-lg tracking-[6px] uppercase mb-5"
        >
          Estilo & Tradición
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 font-serif"
        >
          Donde el Estilo se Convierte en Arte
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-lg text-text-gray mb-10 max-w-2xl mx-auto"
        >
          Expertos en cortes clásicos y modernos. Transformamos tu look con precisión y dedicación desde 2015.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex gap-5 justify-center flex-wrap"
        >
          <Link to="/reservar" className="btn btn-primary">Reservar Cita</Link>
          <a href="#galeria" className="btn">Ver Trabajos</a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="text-gold text-2xl" size={28} />
      </motion.div>
    </section>
  )
}