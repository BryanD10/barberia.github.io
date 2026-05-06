import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Inicio', hash: '#inicio' },
  { to: '/#servicios', label: 'Servicios', hash: '#servicios' },
  { to: '/#galeria', label: 'Galería', hash: '#galeria' },
  { to: '/#productos', label: 'Productos', hash: '#productos' },
  { to: '/#equipo', label: 'Equipo', hash: '#equipo' },
  { to: '/#contacto', label: 'Contacto', hash: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleNavClick = (hash) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      window.location.href = '/' + hash
      return
    }
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 w-full z-[1000] transition-all duration-300 px-[5%] py-5 flex justify-between items-center ${
      scrolled ? 'bg-dark/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent'
    }`}>
      <Link to="/" className="text-2xl font-black text-gold tracking-widest uppercase font-serif">
        Master <span className="text-white">Barber</span>
      </Link>

      <ul className={`flex gap-10 list-none transition-all duration-400 md:flex-row md:static md:w-auto md:h-auto md:bg-transparent md:flex ${
        menuOpen ? 'fixed top-0 right-0 w-4/5 h-screen bg-dark-deeper flex-col justify-center items-center' : 'hidden md:flex'
      }`}>
        {navLinks.map(link => (
          <li key={link.hash}>
            <button
              onClick={() => handleNavClick(link.hash)}
              className="text-white font-medium text-sm tracking-widest uppercase relative transition-colors duration-300 hover:text-gold group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          </li>
        ))}
        <li className="md:hidden">
          <Link to="/reservar" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Reservar
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <Link to="/reservar" className="hidden md:inline-block btn btn-primary text-xs px-6 py-3">
          Reservar Cita
        </Link>
        <button
          className="md:hidden text-gold text-2xl z-[1001]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}