# La Sabrosura del Mar — Sitio web

Demo estático listo para producción o para tomarlo como base en WordPress / Next.js / Astro.
Preparado por **77 Studio** para La Sabrosura del Mar (Armenia, Quindío).

---

## 1. Estructura de archivos

```
/
├── index.html          Inicio + Nuestra historia + Sedes + Contacto (anclas)
├── carta.html          Carta digital (página propia, URL propia para SEO y QR)
├── build-carta.py      Regenera carta.html a partir de assets/menu.json
├── robots.txt
├── sitemap.xml
└── assets/
    ├── styles.css      Hoja de estilos única (design tokens en :root)
    ├── script.js       JS sin dependencias (~4 KB)
    ├── menu.json       ⭐ Fuente de verdad de la carta
    ├── fonts/          Fraunces + Inter, variables, self-hosted (SIL OFL 1.1)
    ├── logo.png        Logo a color, fondo transparente (640 px)
    ├── logo-sm.png     Logo a color (320 px) — usado en header y footer
    ├── logo-blanco.png Logo en blanco para fondos oscuros
    ├── favicon.png     180×180 (apple-touch-icon)
    ├── favicon-32.png  32×32
    ├── camarones-apanados.jpg / -sm.jpg / -sq.jpg
    └── mojarra-frita.jpg / -sm.jpg / -sq.jpg
```

No hay build step ni dependencias de terceros: se sube por FTP y funciona.

---

## 2. Sistema de diseño

Todos los valores están en `:root` dentro de `assets/styles.css`. Cambiar un token
cambia el sitio completo.

### Paleta (extraída del logo)

| Token | Hex | Uso |
|---|---|---|
| `--navy-950` | `#051423` | Footer, overlays del hero |
| `--navy-900` | `#0a2540` | Color primario, secciones oscuras, botones |
| `--navy-800` | `#123458` | Degradados |
| `--teal-700` | `#0e5a72` | Precios, enlaces, acentos |
| `--teal-600` | `#14738f` | Hover, eyebrows |
| `--teal-100` | `#d9edf3` | Fondos de píldoras |
| `--gold-500` | `#d99a3f` | CTA principal, badges |
| `--gold-300` | `#eec894` | Acentos sobre fondo oscuro |
| `--sand` | `#f8f4ed` | Fondo de secciones alternas |
| `--ink` | `#14202c` | Texto |

### Tipografía

- **Display:** Fraunces Variable (serif con carácter, hace juego con el lettering del logo)
- **Texto:** Inter Variable
- Escala fluida con `clamp()`: `--step--1` … `--step-4`. No hay tamaños fijos.
- **Self-hosted en `assets/fonts/`** — sin llamadas a Google Fonts (mejor LCP y sin
  dependencia de terceros). Subset latin, ~170 KB en total, precargadas en el `<head>`.

---

## 3. La carta: `assets/menu.json`

La carta **no se edita a mano en el HTML**. Se edita `assets/menu.json` y se regenera:

```bash
python3 build-carta.py
```

Estructura de un ítem:

```json
{
  "nombre": "Arroz a la marinera",
  "precio": 41000,          // se formatea automáticamente a $41.000
  "media": 29000,           // opcional → "media porción $29.000"
  "precioAlt": 45000,       // opcional → "$40.000 / $45.000"
  "notaPrecio": "normal / súper",
  "precioTexto": "Según temporada y peso",  // reemplaza al precio numérico
  "descripcion": "…",       // opcional
  "destacado": true         // pinta el badge "Favorito"
}
```

Cada categoría acepta además un bloque `destacado` que renderiza la tarjeta grande
con fotografía dentro de la sección.

> **Si el cliente va a administrar la carta él mismo**, este JSON es el modelo de datos
> a llevar a un CPT de WordPress / colección de CMS. Los campos ya están normalizados.

---

## 4. Fotografía — estado actual

Solo hay **2 fotos** disponibles hoy. Los platos destacados sin foto se muestran con un
placeholder azul marcado *"Foto pendiente"* (`.dish__media--placeholder`), a propósito:
sirve para que el cliente vea exactamente qué falta producir.

**Fotos entregadas**

| Archivo | Plato |
|---|---|
| `camarones-apanados.jpg` | Camarones apanados |
| `mojarra-frita.jpg` | Pescado frito (mojarra) |

**Pendientes de producción** (reemplazar el `<div class="dish__media dish__media--placeholder">`
por `<div class="dish__media"><img …></div>`):

1. Cazuela de mariscos
2. Ceviche de camarón
3. Bandeja caribeña
4. Chuleta de pescado
5. Trucha a la plancha
6. Viudo de pescado
7. Pasta a la marinera

**Especificaciones para el fotógrafo**

- Relación 4:3 horizontal, 1400×933 px mínimo, JPG progresivo, calidad 84, < 250 KB.
- Cuadrada 600×600 (`-sq.jpg`) para miniaturas de la carta.
- Luz cálida, fondo de madera oscura, coherente con las dos fotos ya existentes.
- Además: fachada de cada sede, salón de la sede Norte, parqueadero y equipo.

---

## 5. Pendientes antes de salir a producción

- [ ] **Dominio real.** Reemplazar `https://lasabrosuradelmar.com/` en `<link rel="canonical">`,
      Open Graph, `robots.txt`, `sitemap.xml` y en el JSON-LD de ambas páginas.
- [ ] **Google Maps.** Los botones "Cómo llegar" usan búsqueda por dirección. Cuando el
      Google Business Profile de cada sede esté verificado, cambiar a la URL corta del
      listing (mejor atribución de "solicitudes de cómo llegar" en Google Business).
- [ ] **Coordenadas.** Añadir `geo` (`latitude` / `longitude`) al JSON-LD de cada sede.
- [ ] **Redes sociales.** Confirmar las URLs reales de Instagram, TikTok y Facebook
      (hoy asumidas como `@lasabrosuradelmar`).
- [ ] **Analítica.** Instalar GA4 + Meta Pixel. Eventos recomendados:
      `click_whatsapp`, `click_llamar`, `click_como_llegar`, `ver_carta`.
      Los CTAs ya están aislados y son fáciles de instrumentar.
- [ ] **Fotos pendientes** (sección 4).
- [ ] **Bloque de historia.** El panel con el logo puede reemplazarse por una foto real de
      Candelaria o de la sede Centro cuando exista.
- [ ] **QR de mesa** apuntando a `/carta.html`.

---

## 6. Accesibilidad y rendimiento

- HTML semántico, `skip-link`, `aria-*` en el menú móvil y en la barra de categorías.
- Contraste AA en toda la paleta.
- `prefers-reduced-motion` respetado (desactiva animaciones y scroll suave).
- Imágenes con `width`/`height` explícitos (sin CLS), `loading="lazy"` salvo el hero
  (`fetchpriority="high"`).
- Sin frameworks, sin jQuery, sin CDNs externos. Todo el CSS y JS es local.
- La carta tiene estilos de impresión (`@media print`): imprime limpia, sin header ni footer.

---

## 7. SEO local

- `schema.org/Restaurant` para **cada sede** (dirección, horario, teléfono,
  `acceptsReservations: false`, parqueadero en la sede Norte).
- `schema.org/Menu` completo en `carta.html` con las 10 categorías y 62 ítems.
- Títulos y descripciones orientados a las búsquedas objetivo: *restaurante de mar en
  Armenia*, *comida de mar Armenia*, *pescado en Armenia*, *ceviche Armenia*.
- Open Graph configurado para que los enlaces compartidos en WhatsApp y redes muestren
  una foto de plato.

---

## 8. Correcciones de contenido aplicadas

Respecto al documento de estructura original:

1. Se reparó el párrafo final de *Nuestra historia*, que venía con texto corrupto.
2. La categoría "Especialidades" (17 ítems mezclados) se separó en cinco categorías
   coherentes: **Entradas y ceviches, Camarones y langostinos, Pastas, Salmón y
   Especialidades de la casa**. Navegar 62 platos en un solo bloque era inviable en móvil.
3. Los nombres de los platos destacados del Inicio se alinearon con los de la carta
   (p. ej. "Mojarra frita" → **Pescado frito (mojarra)**, que es como figura en la carta).
4. Se agruparon las bebidas en tres subgrupos: limonadas y sodas, gaseosas y agua, cervezas.
