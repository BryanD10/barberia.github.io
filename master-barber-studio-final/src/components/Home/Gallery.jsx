import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import SectionHeader from '../UI/SectionHeader'
import Lightbox from '../UI/Lightbox'
import { galleryData, galleryFilters } from '../../data/galleryData'

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filtered = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter)

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

      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {galleryFilters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2.5 border text-sm tracking-widest uppercase transition-all duration-300 ${
              filter === f 
                ? 'bg-gold text-dark border-gold' 
                : 'bg-transparent text-text-gray border-dark-border hover:text-gold hover:border-gold'
            }`}
          >
            {f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {filtered.map((item, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden aspect-[4/5] rounded cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            {item.type === 'video' ? (
              <>
                <video src={item.src} muted loop preload="metadata" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gold/90 rounded-full flex items-center justify-center text-dark transition-transform duration-300 group-hover:scale-110">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
              </>
            ) : (
              <img src={item.src} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <h3 className="text-gold text-xl font-serif font-bold mb-1">{item.title}</h3>
              <p className="text-text-gray text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

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