import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const item = items[currentIndex]
  if (!item) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center p-5"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-[90%] max-h-[90%]"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute -top-12 right-0 text-white hover:text-gold transition-colors">
            <X size={32} />
          </button>

          {item.type === 'video' ? (
            <video src={item.src} controls autoPlay className="max-h-[85vh] rounded" />
          ) : (
            <img src={item.src} alt={item.title} className="max-h-[85vh] rounded" />
          )}
        </motion.div>

        <button 
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-dark text-white flex items-center justify-center transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-dark text-white flex items-center justify-center transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}