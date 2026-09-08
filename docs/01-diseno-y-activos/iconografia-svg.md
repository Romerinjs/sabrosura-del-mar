# 📐 Catálogo de Iconografía SVG y Divisores

Este catálogo reúne todos los vectores SVG utilizados en el sitio web. Al migrar a **Astro**, estos SVGs pueden convertirse en componentes reutilizables (por ejemplo, dentro de `src/components/icons/` o utilizando `astro-icon`).

---

## 1. Iconos de Interfaz y Navegación

### `IconSearch` (Buscador de la Carta)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
  <circle cx="11" cy="11" r="7"/>
  <path d="m20 20-3.5-3.5"/>
</svg>
```

### `IconMenuBook` (Ver la carta / Menú)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M4 3h13a2 2 0 0 1 2 2v16l-7-3.5L5 21V5a2 2 0 0 1 2-2Z"/>
</svg>
```

### `IconLocation` (Sedes / Cómo llegar)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>
```

### `IconClock` (Horario de Atención)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="9"/>
  <path d="M12 7v5l3 2"/>
</svg>
```

### `IconPhone` (Teléfono y Llamadas)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>
</svg>
```

### `IconParking` (Parqueadero Sede Norte)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="3" y="3" width="18" height="18" rx="4"/>
  <path d="M9 17V8h3.4a2.8 2.8 0 0 1 0 5.6H9"/>
</svg>
```

### `IconDelivery` (Domicilios / Vehículo)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M3 17h1.5a2 2 0 0 0 4 0h7a2 2 0 0 0 4 0H21v-4l-2.5-4H15V7H3Z"/>
  <circle cx="6.5" cy="17" r="2"/>
  <circle cx="17.5" cy="17" r="2"/>
</svg>
```

### `IconNotice` (Información / No reservas)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="9"/>
  <path d="M12 16v-4M12 8h.01"/>
</svg>
```

### `IconCamera` (Placeholder "Foto pendiente")
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"/>
  <circle cx="12" cy="13" r="4"/>
</svg>
```

---

## 2. Iconos de Diferenciales de Marca

### `IconFish` (Pescado fresco)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M2 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"/>
  <circle cx="15" cy="11" r="1.1" fill="currentColor" stroke="none"/>
  <path d="M22 8l-3 4 3 4"/>
</svg>
```

### `IconWaves` (Auténtico sabor costeño)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M2 15c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 5-2.5 5-2.5"/>
  <path d="M2 20c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 5-2.5 5-2.5"/>
  <path d="M12 3v5M9.5 5.5 12 3l2.5 2.5"/>
</svg>
```

### `IconPlate` (Porciones generosas)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M3 11a9 9 0 0 0 18 0Z"/>
  <path d="M2 11h20M12 11V6M9 6h6"/>
  <path d="M12 2v2"/>
</svg>
```

---

## 3. Canales y Redes Sociales

### `IconWhatsApp` (CTA y Botón Flotante)
```html
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.85c0 1.9.5 3.7 1.45 5.3L2 22l4.98-1.6a9.8 9.8 0 0 0 5.06 1.4h.01c5.44 0 9.85-4.4 9.85-9.85C21.9 6.4 17.5 2 12.04 2Zm5.77 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-.95.24-3.2-.67-2.7-1.06-4.4-3.8-4.53-3.98-.13-.18-1.08-1.43-1.08-2.73 0-1.3.68-1.94.92-2.2.24-.27.53-.33.7-.33h.5c.16 0 .38-.06.6.46.23.55.78 1.9.85 2.03.07.14.11.3.02.48-.09.18-.14.29-.27.45-.14.16-.29.35-.41.47-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.6-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.65-.17 1.32Z"/>
</svg>
```

### `IconInstagram`
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="3" y="3" width="18" height="18" rx="5"/>
  <circle cx="12" cy="12" r="4"/>
  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>
</svg>
```

### `IconTikTok`
```html
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M16.5 2h-3v13.2a2.6 2.6 0 1 1-2-2.53V9.6a5.7 5.7 0 1 0 5 5.66V8.9a6.4 6.4 0 0 0 3.7 1.17V7.03A3.6 3.6 0 0 1 16.5 3.4Z"/>
</svg>
```

### `IconFacebook`
```html
<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M14 9V7.2c0-.8.2-1.2 1.4-1.2H17V3h-2.6C11.5 3 10.5 4.5 10.5 7v2H8.5v3h2V21h3.5v-9h2.5l.4-3H14Z"/>
</svg>
```

---

## 4. Divisores Ondulados SVG (Wave Dividers)

Separadores decorativos orgánicos que enmarcan la sección azul marina `#0a2540`:

### `WaveDividerTop` (Transición superior)
```html
<svg class="wave-divider wave-divider--top" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" style="height:70px">
  <path fill="#0a2540" d="M0,45 C240,95 480,0 720,25 C960,50 1200,95 1440,55 L1440,90 L0,90 Z"></path>
</svg>
```

### `WaveDividerBottom` (Transición inferior)
```html
<svg class="wave-divider wave-divider--bottom" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" style="height:70px">
  <path fill="#0a2540" d="M0,0 L1440,0 L1440,35 C1200,-5 960,60 720,45 C480,30 240,0 0,45 Z"></path>
</svg>
```
