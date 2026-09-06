import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const statsData = [
  { value: 8, suffix: '', label: 'Años de Experiencia' },
  { value: 15000, suffix: '+', label: 'Cortes Realizados' },
  { value: 2500, suffix: '+', label: 'Clientes Felices' },
  { value: 12, suffix: '', label: 'Premios Ganados' },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, value])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function Stats() {
  return (
    <section 
      className="py-20 px-[5%] relative"
      style={{
        backgroundImage: `linear-gradient(rgba(10,10,10,0.9), rgba(10,10,10,0.9)), url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto text-center">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <h3 className="text-4xl md:text-5xl text-gold mb-3 font-serif font-bold">
              <Counter value={stat.value} suffix={stat.suffix} />
            </h3>
            <p className="text-text-gray uppercase tracking-widest text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}