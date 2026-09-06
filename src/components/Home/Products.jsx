import SectionHeader from '../UI/SectionHeader'
import ProductCard from '../UI/ProductCard'
import { usePublicData } from '../../hooks/useAdminData'

export default function Products() {
  const { products } = usePublicData()

  return (
    <section id="productos" className="section-padding bg-dark-deeper">
      <SectionHeader 
        title="Catálogo de Productos" 
        subtitle="Los mejores productos para el cuidado de tu cabello y barba. Calidad profesional."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <ProductCard key={product.id || index} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}
