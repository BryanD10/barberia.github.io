# Master Barber Studio

Sitio web premium de barbería construido con **React + Vite + Tailwind CSS + Framer Motion**.

## URL en vivo
https://bryand10.github.io/barberia.github.io/

## Estado actual
- Estructura del proyecto corregida (ya no está anidada).
- Configurado para GitHub Pages (`base` + `basename`).
- Deploy automático con GitHub Actions.
- Botón flotante de **WhatsApp** añadido.

## Cómo activar GitHub Pages (IMPORTANTE)
1. Ve a tu repositorio → **Settings** → **Pages**.
2. En **Source** elige **GitHub Actions**.
3. Guarda. El siguiente push (o el workflow) desplegará el sitio.

## Desarrollo local
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Mejoras implementadas / posibles
- ✅ Botón flotante WhatsApp (cambia el número en `src/components/UI/WhatsAppFloat.jsx`)
- ✅ Animaciones suaves con Framer Motion
- ✅ Carrito de productos (localStorage)
- ✅ Galería con filtros y lightbox
- ✅ Página de reserva de citas
- 🔜 Formulario real (Formspree / EmailJS)
- 🔜 Integración con Google Calendar o backend de citas
- 🔜 Panel admin simple
- 🔜 PWA (instalable en móvil)

## Contacto / personalización
Cambia los datos de la barbería (teléfono, dirección, horarios, número de WhatsApp) en los componentes correspondientes.
