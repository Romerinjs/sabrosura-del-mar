# 🎨 Identidad Visual, Tipografía y Tokens de Diseño

Este documento reúne todas las especificaciones visuales de la marca **La Sabrosura del Mar**, preparado para ser implementado en un sistema de diseño con **Astro** o CSS moderno.

---

## 1. Paleta Cromática y Design Tokens

Todos los colores se encuentran declarados como variables CSS nativas (`:root`) en [assets/styles.css](file:///d:/Usuarios/ACER/Documentos/88/sabrosura-del-mar/sabrosura%202/assets/styles.css):

```css
:root {
  /* Tonos Marinos (Marca Principal) */
  --navy-950: #051423;  /* Footers y fondos oscuros profundos */
  --navy-900: #0a2540;  /* Color primario corporativo, secciones oscuras */
  --navy-800: #123458;  /* Degradados marinos y estados hover oscuros */
  --navy-700: #1b476f;  /* Bordes activos y acentos sobre fondos oscuros */

  /* Tonos Costeros (Teal / Acentos Marinos) */
  --teal-700: #0e5a72;  /* Precios, enlaces, subtítulos de subgrupos */
  --teal-600: #14738f;  /* Hover de enlaces y elementos interactivos */
  --teal-500: #2b90ad;  /* Acentos vibrantes */
  --teal-100: #d9edf3;  /* Fondos de píldoras y badges secundarios */

  /* Tonos Cálidos (Sol y Arena) */
  --gold-600: #c0862f;  /* Borde de botones dorados */
  --gold-500: #d99a3f;  /* Color de acento primario (CTAs, botones, badges) */
  --gold-300: #eec894;  /* Acentos sobre fondos oscuros y estrellas */
  --sand:     #f8f4ed;  /* Fondo de secciones alternas (sensación cálida) */
  --sand-deep:#efe7da;  /* Bordes y separadores sobre fondo arena */

  /* Neutros y Superficies */
  --paper:    #ffffff;  /* Fondo de tarjetas e interfaz clara */
  --ink:      #14202c;  /* Texto principal de alto contraste */
  --ink-soft: #3d4c5a;  /* Texto descriptivo secundario */
  --muted:    #6c7c8a;  /* Notas al pie, metadatos y placeholders */
  --line:     rgba(10, 37, 64, 0.12); /* Divisores sutiles */
}
```

### Usos Semánticos de Color
| Token | Muestra | Uso Recomendado en Componentes |
|---|:---:|---|
| `--navy-900` | `#0a2540` | Encabezados principales, fondo del Hero, botones oscuros. |
| `--gold-500` | `#d99a3f` | Botón principal de pedido ("Pedir a domicilio"), badge "Favorito". |
| `--teal-700` | `#0e5a72` | Resaltado de precios en cartas y tarjetas de plato. |
| `--sand` | `#f8f4ed` | Secciones alternas (`section--sand`) para descanso visual. |
| `--teal-100` | `#d9edf3` | Cápsulas de notas (`.pill-note`). |

---

## 2. Tipografía Fluida

El proyecto utiliza **dos tipografías variables autoalojadas** (*self-hosted* en `assets/fonts/` con licencia SIL OFL 1.1) para garantizar 100% de independencia de Google Fonts y velocidad LCP óptima:

1. **`Fraunces` (Variable opsz 9-144, wght 100-900):**
   - Tipografía *serif* editorial con terminaciones clásicas y cálidas.
   - **Uso:** Títulos `<h1>`, `<h2>`, `<h3>` y nombres de marca (`--font-display`).
2. **`Inter` (Variable wght 100-900):**
   - Tipografía *sans-serif* moderna, neutral y de máxima legibilidad en móviles.
   - **Uso:** Cuerpo de texto, descripciones, precios y botones (`--font-body`).

### Escala Tipográfica Fluida (`clamp()`)
No se utilizan tamaños estáticos en píxeles. La escala calcula automáticamente el tamaño relativo según el ancho del viewport (`vw`):

| Token | Cálculo CSS | Tamaño aproximado (Móvil $\rightarrow$ Desktop) | Uso |
|---|---|---|---|
| `--step--1` | `clamp(0.82rem, 0.79rem + 0.14vw, 0.9rem)` | ~13px $\rightarrow$ ~14.5px | Notas legales, captions |
| `--step-0` | `clamp(1rem, 0.96rem + 0.2vw, 1.08rem)` | ~16px $\rightarrow$ ~17.5px | Texto base de párrafos |
| `--step-1` | `clamp(1.18rem, 1.1rem + 0.4vw, 1.4rem)` | ~19px $\rightarrow$ ~22.5px | Subtítulos, nombres de platos |
| `--step-2` | `clamp(1.45rem, 1.28rem + 0.85vw, 1.95rem)` | ~23px $\rightarrow$ ~31px | Títulos de secciones |
| `--step-3` | `clamp(1.85rem, 1.5rem + 1.7vw, 2.85rem)` | ~30px $\rightarrow$ ~45px | Encabezados de sección grande |
| `--step-4` | `clamp(2.3rem, 1.6rem + 3.3vw, 4.4rem)` | ~37px $\rightarrow$ ~70px | Título principal Hero (`<h1>`) |

---

## 3. Activos de Marca (Logos y Favicons)

Todos los archivos de imagen de marca se encuentran en `assets/`:

| Archivo | Dimensiones | Formato | Uso en el Sistema |
|---|:---:|:---:|---|
| `logo.png` | 640 × 664 px | PNG Transparente | Versión completa a color. Usado en la sección "Historia". |
| `logo-sm.png` | 320 × 332 px | PNG Transparente | Versión optimizada para Navbar (`Header`) y `Footer`. |
| `logo-blanco.png` | 640 × 664 px | PNG Transparente | Versión monocromática blanca para fondos marinos oscuros. |
| `favicon.png` | 180 × 180 px | PNG | Icono táctil de alta resolución (`apple-touch-icon`). |
| `favicon-32.png` | 32 × 32 px | PNG | Favicon estándar de navegador. |

---

## 4. Especificaciones Fotográficas

### Relaciones de Aspecto
- **Hero & Fondos de Sección:** Relación `16:9` o `3:2`, resolución recomendada 1400×933 px.
- **Tarjetas de Platos:** Relación `3:2` o `4:3`, resolución recomendada 800×533 px.
- **Miniaturas de Carta Cuadrada:** Relación `1:1` (`-sq.jpg`), resolución 600×600 px.

### Estado Actual de Fotos de Platos
- **Disponibles:**
  - `camarones-apanados.jpg` (y sus variantes `-sm.jpg`, `-sq.jpg`)
  - `mojarra-frita.jpg` (y sus variantes `-sm.jpg`, `-sq.jpg`)
- **Pendientes de Producción:** (Muestran el placeholder con icono SVG):
  - Cazuela de mariscos, Ceviche de camarón, Bandeja caribeña, Chuleta de pescado, Trucha a la plancha, Viudo de pescado, Pasta a la marinera.
