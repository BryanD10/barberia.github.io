import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', hash: '#inicio' },
  { label: 'Servicios', hash: '#servicios' },
  { label: 'Galería', hash: '#galeria' },
  { label: 'Productos', hash: '#productos' },
  { label: 'Equipo', hash: '#equipo' },
  { label: 'Contacto', hash: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (hash) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      window.location.href = '/' + hash
      return
    }
    setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 px-4 sm:px-6 md:px-[5%] flex justify-between items-center ${
        scrolled || menuOpen
          ? 'bg-dark/95 backdrop-blur-md py-3.5 shadow-lg border-b border-white/5'
          : 'bg-transparent py-5'
      }`}>
        <Link to="/" className="text-xl sm:text-2xl font-black text-gold tracking-widest uppercase font-serif z-[1002]">
          Master <span className="text-white">Barber</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map(link => (
            <li key={link.hash}>
              <button
                onClick={() => handleNavClick(link.hash)}
                className="text-white/90 font-medium text-sm tracking-widest uppercase relative transition-colors duration-300 hover:text-gold group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link 
            to="/reservar" 
            className="hidden md:inline-flex btn btn-primary text-xs px-5 py-2.5"
          >
            Reservar Cita
          </Link>

          <button
            className="md:hidden text-gold p-2 -mr-2 z-[1002]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`fixed inset-0 z-[999] bg-dark-deeper/98 backdrop-blur-xl transition-all duration-300 md:hidden ${
        menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          {navLinks.map((link, i) => (
            <button
              key={link.hash}
              onClick={() => handleNavClick(link.hash)}
              className="text-2xl font-serif text-white hover:text-gold transition-colors tracking-wide"
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </button>
          ))}
          <Link 
            to="/reservar" 
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary mt-6 px-10 py-4 text-sm"
          >
            Reservar Cita
          </Link>
        </div>
      </div>
    </>
  )
}
