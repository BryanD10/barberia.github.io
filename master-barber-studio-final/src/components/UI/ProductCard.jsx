import { useCart } from '../../context/CartContext'
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductCard({ product, index }) {
  const { addToCart } = useCart()
  const stars = Array(5).fill(0).map((_, i) => i < Math.floor(product.rating))

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-dark-card border border-dark-border overflow-hidden transition-all duration-400 hover:border-gold hover:shadow-xl group"
    >
      {product.badge && (
        <span className="absolute top-4 left-4 bg-gold text-dark px-4 py-1 text-xs font-bold uppercase tracking-wider z-10">
          {product.badge}
        </span>
      )}

      <div className="relative overflow-hidden aspect-square bg-dark-border">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
          <button onClick={() => addToCart(product)} className="w-10 h-10 rounded-full bg-white text-dark flex items-center justify-center hover:bg-gold transition-all hover:scale-110" title="Agregar al carrito">
            <ShoppingCart size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white text-dark flex items-center justify-center hover:bg-gold transition-all hover:scale-110" title="Ver detalles">
            <Eye size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white text-dark flex items-center justify-center hover:bg-gold transition-all hover:scale-110" title="Favoritos">
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="text-gold text-xs uppercase tracking-widest mb-2">{product.category}</div>
        <h3 className="text-white text-lg mb-3 font-semibold">{product.name}</h3>
        <p className="text-text-gray text-sm leading-relaxed mb-4">{product.desc}</p>
        <div className="flex justify-between items-center pt-4 border-t border-dark-border">
          <span className="text-gold text-xl font-bold">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1 text-gold text-sm">
            {stars.map((filled, i) => (
              <Star key={i} size={14} fill={filled ? 'currentColor' : 'none'} />
            ))}
            <span className="ml-1">{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}