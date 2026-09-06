import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import SectionHeader from '../UI/SectionHeader'
import Lightbox from '../UI/Lightbox'
import { usePublicData } from '../../hooks/useAdminData'

const defaultFilters = ['all', 'fade', 'clasico', 'barba', 'video']

export default function Gallery() {
  const { gallery } = usePublicData()
  const [filter, setFilter] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filters = defaultFilters
  const filtered = filter === 'all' ? gallery : gallery.filter(item => item.category === filter)

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section id="galeria" className="section-padding bg-dark">
      <SectionHeader 
        title="Galería de Cortes" 
        subtitle="Explora nuestros trabajos. Desde cortes clásicos hasta los más modernos diseños."
      />

      <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 sm:px-5 py-2 border text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 ${
              filter === f 
                ? 'bg-gold text-dark border-gold' 
                : 'bg-transparent text-text-gray border-dark-border hover:text-gold hover:border-gold'
            }`}
          >
            {f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-7xl mx-auto">
        {filtered.map((item, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden aspect-[4/5] rounded cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            {item.type === 'video' ? (
              <>
                <video src={item.src} muted loop preload="metadata" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-gold/90 rounded-full flex items-center justify-center text-dark">
                    <Play size={18} fill="currentColor" />
                  </div>
                </div>
              </>
            ) : (
              <img src={item.src} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-5 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-gold text-lg font-serif font-bold mb-0.5">{item.title}</h3>
              <p className="text-text-gray text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-gray py-12">No hay elementos en esta categoría.</p>
      )}

      {lightboxOpen && (
        <Lightbox
          items={filtered}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length)}
          onNext={() => setCurrentIndex((prev) => (prev + 1) % filtered.length)}
        />
      )}
    </section>
  )
}
