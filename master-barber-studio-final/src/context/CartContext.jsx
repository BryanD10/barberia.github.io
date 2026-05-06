import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [toast, setToast] = useState({ show: false, message: '' })

  const addToCart = useCallback((product) => {
    setCart(prev => [...prev, product])
    setToast({ show: true, message: `${product.name} agregado al carrito` })
    setTimeout(() => setToast({ show: false, message: '' }), 3000)
  }, [])

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(p => p.id !== productId))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const cartCount = cart.length
  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0)

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, clearCart, toast }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)