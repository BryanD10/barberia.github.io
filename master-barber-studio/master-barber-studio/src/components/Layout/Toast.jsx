import { useCart } from '../../context/CartContext'
import { CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Toast() {
  const { toast } = useCart()

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-24 right-8 bg-dark-card border border-gold px-6 py-4 rounded flex items-center gap-3 z-[1001] shadow-xl"
        >
          <CheckCircle className="text-gold" size={20} />
          <span className="text-white">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}