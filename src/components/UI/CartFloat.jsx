import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { ShoppingBag, X, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartFloat() {
  const { cart, cartCount, cartTotal, removeFromCart, clearCart } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Botón flotante del carrito */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 sm:right-6 w-14 h-14 bg-gold rounded-full flex items-center justify-center text-dark shadow-lg z-[998] cursor-pointer safe-bottom"
        aria-label="Abrir carrito"
      >
        <ShoppingBag size={22} />
        {cartCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-white text-dark rounded-full text-xs font-bold flex items-center justify-center"
          >
            {cartCount}
          </motion.span>
        )}
      </motion.button>

      {/* Drawer del carrito */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-[1100]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-deeper border-l border-dark-border z-[1101] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-dark-border">
                <h3 className="text-xl font-serif font-bold text-white">Tu Carrito</h3>
                <button onClick={() => setOpen(false)} className="text-text-gray hover:text-white p-1">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-text-gray">
                    <ShoppingBag size={48} className="mb-4 opacity-40" />
                    <p>Tu carrito está vacío</p>
                    <p className="text-sm mt-1">Agrega productos desde el catálogo</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="flex gap-4 bg-dark-card border border-dark-border p-3 rounded">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                          <p className="text-gold font-semibold mt-1">${item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-text-gray hover:text-red-400 self-start p-1"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-dark-border space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-text-gray">Total</span>
                    <span className="text-gold font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {
                      // Aquí se podría conectar a WhatsApp o checkout
                      const msg = encodeURIComponent(`Hola, quiero comprar estos productos:\n${cart.map(p => `• ${p.name} - $${p.price}`).join('\n')}\nTotal: $${cartTotal.toFixed(2)}`)
                      window.open(`https://wa.me/15551234567?text=${msg}`, '_blank')
                    }}
                    className="w-full btn btn-primary py-3.5"
                  >
                    Pedir por WhatsApp
                  </button>
                  <button onClick={clearCart} className="w-full text-sm text-text-gray hover:text-white">
                    Vaciar carrito
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
