import { useCart } from '../../context/CartContext'
import { ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CartFloat() {
  const { cartCount } = useCart()

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 w-16 h-16 bg-gold rounded-full flex items-center justify-center text-dark text-xl shadow-lg z-[999] cursor-pointer"
    >
      <ShoppingBag size={24} />
      {cartCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-6 h-6 bg-white text-dark rounded-full text-xs font-bold flex items-center justify-center"
        >
          {cartCount}
        </motion.span>
      )}
    </motion.button>
  )
}