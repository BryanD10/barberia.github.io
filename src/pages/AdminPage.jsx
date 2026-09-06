import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Lock, LogOut, Scissors, ShoppingBag, Image, Tag, 
  Plus, Trash2, Upload, Save, Check, ArrowLeft, Eye, EyeOff
} from 'lucide-react'
import { useAdminData } from '../hooks/useAdminData'
import { uploadToCloudinary } from '../config/cloudinary'

const ADMIN_PASSWORD = 'admin123'
const AUTH_KEY = 'master_barber_admin_auth'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('services')
  const [uploading, setUploading] = useState(false)

  const {
    services, products, gallery, promotions, saved,
    updateServices, updateProducts, updateGallery, updatePromotions
  } = useAdminData()

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1')
      setAuthenticated(true)
      setError('')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthenticated(false)
  }

  const handleUpload = async (file, onSuccess) => {
    if (!file) return
    setUploading(true)
    try {
      const result = await uploadToCloudinary(file)
      onSuccess(result)
    } catch (err) {
      alert('Error al subir: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-dark-deeper flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-dark-card border border-dark-border p-8 w-full max-w-sm rounded-sm">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gold/15 rounded-full flex items-center justify-center">
              <Lock className="text-gold" size={24} />
            </div>
          </div>
          <h1 className="text-2xl font-serif font-bold text-center text-white mb-1">Admin Panel</h1>
          <p className="text-text-gray text-center text-sm mb-6">Master Barber Studio</p>

          <div className="relative mb-4">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none pr-12"
              autoFocus
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-gray">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <button type="submit" className="w-full btn btn-primary py-3.5">Entrar</button>

          <Link to="/" className="block text-center text-text-gray text-sm mt-6 hover:text-gold">
            ← Volver al sitio
          </Link>
        </form>
      </div>
    )
  }

  const tabs = [
    { id: 'services', label: 'Servicios', icon: Scissors },
    { id: 'products', label: 'Productos', icon: ShoppingBag },
    { id: 'gallery', label: 'Galería', icon: Image },
    { id: 'promotions', label: 'Promos', icon: Tag },
  ]

  return (
    <div className="min-h-screen bg-dark-deeper">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur border-b border-dark-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-text-gray hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-serif font-bold text-gold text-lg">Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-green-400 text-sm flex items-center gap-1">
              <Check size={16} /> Guardado
            </span>
          )}
          <button onClick={handleLogout} className="text-text-gray hover:text-white p-2" title="Cerrar sesión">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-dark-border bg-dark">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-3.5 text-sm whitespace-nowrap border-b-2 transition-colors ${
              tab === t.id ? 'border-gold text-gold' : 'border-transparent text-text-gray hover:text-white'
            }`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6 max-w-3xl mx-auto">
        {tab === 'services' && (
          <ServicesEditor services={services} onChange={updateServices} />
        )}
        {tab === 'products' && (
          <ProductsEditor products={products} onChange={updateProducts} onUpload={handleUpload} uploading={uploading} />
        )}
        {tab === 'gallery' && (
          <GalleryEditor gallery={gallery} onChange={updateGallery} onUpload={handleUpload} uploading={uploading} />
        )}
        {tab === 'promotions' && (
          <PromotionsEditor promotions={promotions} onChange={updatePromotions} />
        )}
      </div>
    </div>
  )
}

/* ========== SERVICES ========== */
function ServicesEditor({ services, onChange }) {
  const update = (index, field, value) => {
    const next = [...services]
    next[index] = { ...next[index], [field]: field === 'price' ? parseFloat(value) || 0 : value }
    onChange(next)
  }

  const add = () => {
    onChange([...services, { icon: 'Scissors', name: 'Nuevo servicio', desc: '', price: 0 }])
  }

  const remove = (index) => {
    if (confirm('¿Eliminar este servicio?')) {
      onChange(services.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif font-bold text-white">Servicios y Precios</h2>
        <button onClick={add} className="btn btn-primary text-xs px-4 py-2 flex items-center gap-1">
          <Plus size={14} /> Agregar
        </button>
      </div>

      {services.map((s, i) => (
        <div key={i} className="bg-dark-card border border-dark-border p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gold text-sm font-medium">#{i + 1}</span>
            <button onClick={() => remove(i)} className="text-text-gray hover:text-red-400">
              <Trash2 size={16} />
            </button>
          </div>
          <input
            value={s.name}
            onChange={e => update(i, 'name', e.target.value)}
            placeholder="Nombre"
            className="w-full px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm"
          />
          <textarea
            value={s.desc}
            onChange={e => update(i, 'desc', e.target.value)}
            placeholder="Descripción"
            rows={2}
            className="w-full px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm resize-none"
          />
          <div className="flex items-center gap-2">
            <span className="text-text-gray text-sm">$</span>
            <input
              type="number"
              step="0.01"
              value={s.price}
              onChange={e => update(i, 'price', e.target.value)}
              className="w-28 px-3 py-2.5 bg-dark border border-dark-border text-gold font-bold focus:border-gold focus:outline-none text-sm"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ========== PRODUCTS ========== */
function ProductsEditor({ products, onChange, onUpload, uploading }) {
  const update = (index, field, value) => {
    const next = [...products]
    next[index] = { ...next[index], [field]: field === 'price' || field === 'rating' ? parseFloat(value) || 0 : value }
    onChange(next)
  }

  const add = () => {
    onChange([...products, {
      id: Date.now(),
      name: 'Nuevo producto',
      category: 'Estilizado',
      price: 0,
      rating: 5,
      image: '',
      desc: '',
      badge: ''
    }])
  }

  const remove = (index) => {
    if (confirm('¿Eliminar este producto?')) {
      onChange(products.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif font-bold text-white">Productos</h2>
        <button onClick={add} className="btn btn-primary text-xs px-4 py-2 flex items-center gap-1">
          <Plus size={14} /> Agregar
        </button>
      </div>

      {products.map((p, i) => (
        <div key={p.id || i} className="bg-dark-card border border-dark-border p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-gold text-sm font-medium">#{i + 1}</span>
            <button onClick={() => remove(i)} className="text-text-gray hover:text-red-400">
              <Trash2 size={16} />
            </button>
          </div>

          {p.image && (
            <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded" />
          )}

          <label className="flex items-center justify-center gap-2 py-3 border border-dashed border-dark-border hover:border-gold cursor-pointer text-sm text-text-gray hover:text-gold transition-colors">
            <Upload size={16} />
            {uploading ? 'Subiendo...' : 'Subir imagen'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) onUpload(file, (res) => update(i, 'image', res.url))
              }}
            />
          </label>

          <input value={p.name} onChange={e => update(i, 'name', e.target.value)} placeholder="Nombre" className="w-full px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm" />
          <input value={p.category} onChange={e => update(i, 'category', e.target.value)} placeholder="Categoría" className="w-full px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm" />
          <textarea value={p.desc} onChange={e => update(i, 'desc', e.target.value)} placeholder="Descripción" rows={2} className="w-full px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm resize-none" />
          <div className="flex gap-3">
            <div className="flex items-center gap-1 flex-1">
              <span className="text-text-gray text-sm">$</span>
              <input type="number" step="0.01" value={p.price} onChange={e => update(i, 'price', e.target.value)} className="w-full px-3 py-2.5 bg-dark border border-dark-border text-gold font-bold focus:border-gold focus:outline-none text-sm" />
            </div>
            <input value={p.badge || ''} onChange={e => update(i, 'badge', e.target.value)} placeholder="Badge (Nuevo, Oferta...)" className="flex-1 px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm" />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ========== GALLERY ========== */
function GalleryEditor({ gallery, onChange, onUpload, uploading }) {
  const update = (index, field, value) => {
    const next = [...gallery]
    next[index] = { ...next[index], [field]: value }
    onChange(next)
  }

  const add = (type = 'image') => {
    onChange([...gallery, {
      type,
      category: type === 'video' ? 'video' : 'fade',
      src: '',
      title: type === 'video' ? 'Nuevo video' : 'Nueva imagen',
      desc: ''
    }])
  }

  const remove = (index) => {
    if (confirm('¿Eliminar este elemento?')) {
      onChange(gallery.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-serif font-bold text-white">Galería</h2>
        <div className="flex gap-2">
          <button onClick={() => add('image')} className="btn btn-primary text-xs px-3 py-2 flex items-center gap-1">
            <Plus size={14} /> Imagen
          </button>
          <button onClick={() => add('video')} className="btn text-xs px-3 py-2 flex items-center gap-1">
            <Plus size={14} /> Video
          </button>
        </div>
      </div>

      {gallery.map((item, i) => (
        <div key={i} className="bg-dark-card border border-dark-border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gold text-sm font-medium capitalize">{item.type} #{i + 1}</span>
            <button onClick={() => remove(i)} className="text-text-gray hover:text-red-400">
              <Trash2 size={16} />
            </button>
          </div>

          {item.src && (
            item.type === 'video' ? (
              <video src={item.src} controls className="w-full h-40 object-cover rounded bg-black" />
            ) : (
              <img src={item.src} alt={item.title} className="w-full h-40 object-cover rounded" />
            )
          )}

          <label className="flex items-center justify-center gap-2 py-3 border border-dashed border-dark-border hover:border-gold cursor-pointer text-sm text-text-gray hover:text-gold transition-colors">
            <Upload size={16} />
            {uploading ? 'Subiendo...' : `Subir ${item.type === 'video' ? 'video' : 'imagen'}`}
            <input
              type="file"
              accept={item.type === 'video' ? 'video/*' : 'image/*'}
              className="hidden"
              disabled={uploading}
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) onUpload(file, (res) => {
                  update(i, 'src', res.url)
                  if (res.resourceType) update(i, 'type', res.resourceType === 'video' ? 'video' : 'image')
                })
              }}
            />
          </label>

          <input value={item.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Título" className="w-full px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm" />
          <input value={item.desc} onChange={e => update(i, 'desc', e.target.value)} placeholder="Descripción" className="w-full px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm" />
          <select value={item.category} onChange={e => update(i, 'category', e.target.value)} className="w-full px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm">
            <option value="fade">Fade</option>
            <option value="clasico">Clásico</option>
            <option value="barba">Barba</option>
            <option value="video">Video</option>
          </select>
        </div>
      ))}
    </div>
  )
}

/* ========== PROMOTIONS ========== */
function PromotionsEditor({ promotions, onChange }) {
  const update = (index, field, value) => {
    const next = [...promotions]
    next[index] = { ...next[index], [field]: value }
    onChange(next)
  }

  const add = () => {
    onChange([...promotions, {
      id: Date.now(),
      title: 'Nueva promoción',
      description: '',
      discount: '',
      active: true
    }])
  }

  const remove = (index) => {
    if (confirm('¿Eliminar esta promoción?')) {
      onChange(promotions.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif font-bold text-white">Promociones</h2>
        <button onClick={add} className="btn btn-primary text-xs px-4 py-2 flex items-center gap-1">
          <Plus size={14} /> Agregar
        </button>
      </div>

      {promotions.length === 0 && (
        <p className="text-text-gray text-sm text-center py-8">No hay promociones aún. Crea la primera.</p>
      )}

      {promotions.map((p, i) => (
        <div key={p.id || i} className="bg-dark-card border border-dark-border p-4 space-y-3">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm text-text-gray">
              <input
                type="checkbox"
                checked={p.active}
                onChange={e => update(i, 'active', e.target.checked)}
                className="accent-gold"
              />
              Activa
            </label>
            <button onClick={() => remove(i)} className="text-text-gray hover:text-red-400">
              <Trash2 size={16} />
            </button>
          </div>
          <input value={p.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Título de la promo" className="w-full px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm" />
          <textarea value={p.description} onChange={e => update(i, 'description', e.target.value)} placeholder="Descripción" rows={2} className="w-full px-3 py-2.5 bg-dark border border-dark-border text-white focus:border-gold focus:outline-none text-sm resize-none" />
          <input value={p.discount} onChange={e => update(i, 'discount', e.target.value)} placeholder="Descuento (ej: 20% OFF)" className="w-full px-3 py-2.5 bg-dark border border-dark-border text-gold font-bold focus:border-gold focus:outline-none text-sm" />
        </div>
      ))}
    </div>
  )
}
