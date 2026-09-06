import { useState, useEffect, useCallback } from 'react'
import { servicesData as defaultServices } from '../data/servicesData'
import { productsData as defaultProducts } from '../data/productsData'
import { galleryData as defaultGallery } from '../data/galleryData'

const STORAGE_KEY = 'master_barber_cms'

const defaultData = {
  services: defaultServices,
  products: defaultProducts,
  gallery: defaultGallery,
  promotions: [],
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    const parsed = JSON.parse(raw)
    return {
      services: parsed.services?.length ? parsed.services : defaultServices,
      products: parsed.products?.length ? parsed.products : defaultProducts,
      gallery: parsed.gallery?.length ? parsed.gallery : defaultGallery,
      promotions: parsed.promotions || [],
    }
  } catch {
    return defaultData
  }
}

export function useAdminData() {
  const [data, setData] = useState(loadData)
  const [saved, setSaved] = useState(false)

  const save = useCallback((newData) => {
    setData(newData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // Notificar a otras pestañas
    window.dispatchEvent(new Event('barber-cms-update'))
  }, [])

  const updateServices = (services) => save({ ...data, services })
  const updateProducts = (products) => save({ ...data, products })
  const updateGallery = (gallery) => save({ ...data, gallery })
  const updatePromotions = (promotions) => save({ ...data, promotions })

  return {
    ...data,
    saved,
    updateServices,
    updateProducts,
    updateGallery,
    updatePromotions,
    resetToDefault: () => {
      localStorage.removeItem(STORAGE_KEY)
      setData(defaultData)
    },
  }
}

// Hook para la página pública (lee los datos del CMS)
export function usePublicData() {
  const [data, setData] = useState(loadData)

  useEffect(() => {
    const handler = () => setData(loadData())
    window.addEventListener('storage', handler)
    window.addEventListener('barber-cms-update', handler)
    return () => {
      window.removeEventListener('storage', handler)
      window.removeEventListener('barber-cms-update', handler)
    }
  }, [])

  return data
}
