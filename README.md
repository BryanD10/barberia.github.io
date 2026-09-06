# Master Barber Studio

Sitio web premium de barbería construido con **React + Vite + Tailwind CSS + Framer Motion**.

## Despliegue recomendado: Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Click en **Add New Project**.
3. Importa el repositorio `BryanD10/barberia.github.io`.
4. Vercel detectará automáticamente Vite. Deja la configuración por defecto:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**.

En menos de 1 minuto tendrás una URL limpia tipo:
`https://barberia-github-io.vercel.app` (o el nombre que elijas).

### Dominio personalizado (opcional)
Después del deploy puedes agregar tu propio dominio desde el panel de Vercel.

## Desarrollo local
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Características
- Diseño premium dark + gold
- Animaciones con Framer Motion
- Galería con filtros y lightbox
- Catálogo de productos + carrito
- Página de reserva de citas (multi-paso)
- Botón flotante de WhatsApp
- Totalmente responsive

## Personalización rápida
- Número de WhatsApp → `src/components/UI/WhatsAppFloat.jsx`
- Datos de contacto → `src/components/Home/Contact.jsx`
- Servicios y precios → `src/data/servicesData.js`
- Productos → `src/data/productsData.js`
