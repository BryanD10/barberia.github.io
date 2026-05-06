import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Preloader from './Preloader'
import ScrollToTop from './ScrollToTop'
import Toast from './Toast'
import CartFloat from '../UI/CartFloat'

export default function Layout() {
  return (
    <>
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartFloat />
      <Toast />
    </>
  )
}