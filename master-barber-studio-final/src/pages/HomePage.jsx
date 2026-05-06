import Hero from '../components/Home/Hero'
import Services from '../components/Home/Services'
import Gallery from '../components/Home/Gallery'
import Stats from '../components/Home/Stats'
import Products from '../components/Home/Products'
import Team from '../components/Home/Team'
import Contact from '../components/Home/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Stats />
      <Products />
      <Team />
      <Contact />
    </>
  )
}