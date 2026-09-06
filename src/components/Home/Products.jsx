import SectionHeader from '../UI/SectionHeader'
import ProductCard from '../UI/ProductCard'
import { productsData } from '../../data/productsData'

export default function Products() {
  return (
    <section id="productos" className="section-padding bg-dark-deeper">
      <SectionHeader 
        title="Catálogo de Productos" 
        subtitle="Los mejores productos para el cuidado de tu cabello y barba. Calidad profesional para uso diario."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {productsData.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}