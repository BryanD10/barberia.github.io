import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-deeper border-t border-dark-border pt-16 pb-8 px-[5%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto mb-10">
        <div>
          <Link to="/" className="text-2xl font-black text-gold tracking-widest uppercase font-serif inline-block mb-5">
            Master <span className="text-white">Barber</span>
          </Link>
          <p className="text-text-gray leading-relaxed">
            Transformando estilos y construyendo confianza desde 2015. Tu imagen es nuestra pasión.
          </p>
          <div className="flex gap-4 mt-5">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 border border-dark-border rounded-full flex items-center justify-center text-text-gray transition-all duration-300 hover:bg-gold hover:text-dark hover:border-gold">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white mb-5 text-lg uppercase tracking-widest font-semibold">Servicios</h4>
          <ul className="space-y-3">
            {['Corte Clásico', 'Degradados', 'Afeitado', 'Tratamientos'].map(item => (
              <li key={item}><a href="#servicios" className="text-text-gray hover:text-gold transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-5 text-lg uppercase tracking-widest font-semibold">Compañía</h4>
          <ul className="space-y-3">
            {['Sobre Nosotros', 'Nuestro Equipo', 'Galería', 'Contacto'].map(item => (
              <li key={item}><a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-text-gray hover:text-gold transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-5 text-lg uppercase tracking-widest font-semibold">Legal</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-text-gray hover:text-gold transition-colors">Política de Privacidad</a></li>
            <li><a href="#" className="text-text-gray hover:text-gold transition-colors">Términos de Servicio</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-dark-border text-text-gray text-sm">
        <p>&copy; 2026 Master Barber Studio. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}