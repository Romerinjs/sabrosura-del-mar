# 🌊 Dossier de Diseño & Arquitectura Web: La Sabrosura del Mar
> **Prompt & Context Specification Document para Generación de Mockups UI/UX en Stitch / Herramientas de IA Visual**

---

## 1. Identidad de Marca y Concepto Visual (Brand Core)

* **Nombre de la Marca:** La Sabrosura del Mar
* **Ubicación / Contexto:** Armenia, Quindío, Colombia (Restaurante de comida de mar tradicional y fusión caribeña/costeña en la zona cafetera).
* **Fundadora / Esencia:** Tradición culinaria de Candelaria, 14 años de historia. Comida abundante, pesca fresca, recetas auténticas de la costa colombiana.
* **Tono de Comunicación:** Cálido, costeño refinado, apetitoso, confiable, artesanal, acogedor y contemporáneo.
* **Modelo de Interacción:** 
  * **Landing comercial + Menú Virtual interactivo tipo catálogo/carta consultiva**.
  * **Cero carritos engorrosos ni pasarelas de pago**. Conversión centralizada directa a **WhatsApp** (`https://wa.me/573113093429?text=Hola%2C%20estoy%20interesado%20en%20pedir%20al%20restaurante`).

---

## 2. Sistema de Diseño (Design Tokens & Styles)

### 2.1. Paleta de Colores (Color Palette)

| Nombre Token | HEX Code | Uso Semántico e Interfaz |
|---|---|---|
| **Navy 950 (Abisal)** | `#051423` | Footers, fondos oscuros de alto contraste, contrastes extremos. |
| **Navy 900 (Mar Profundo)** | `#0a2540` | Color corporativo primario, Hero principal, cards oscuras, barras de navegación. |
| **Navy 800 (Azul Marino)** | `#123458` | Degradados marinos, hover en estados oscuros. |
| **Navy 700 (Océano)** | `#1b476f` | Bordes activos, acentos en dark mode. |
| **Teal 700 (Costero)** | `#0e5a72` | Subtítulos de categorías, tags secundarios, precios destacados. |
| **Teal 600 (Turquesa Marino)** | `#14738f` | Hover de enlaces, detalles interactivos. |
| **Teal 100 (Bruma Costera)** | `#d9edf3` | Fondos de pills, badges informativos suaves, acentos de frescura. |
| **Gold 500 (Sol y Arena)** | `#d99a3f` | **Acento de conversión (CTA primario)**, botones "Pedir al restaurante", badges de recomendados, estrellas. |
| **Gold 600 (Dorado Tostado)** | `#c0862f` | Hover y bordes de botones dorados. |
| **Gold 300 (Arena Clara)** | `#eec894` | Acentos de tipografía sobre fondos oscuros, subtítulos cálidos. |
| **Sand (Fondo Arena Cálido)**| `#f8f4ed` | Fondo alterno de secciones (`section--sand`) para evitar fatiga visual del blanco plano. |
| **Paper (Blanco Puro)** | `#ffffff` | Superficie de tarjetas, acordiones de la carta, fondo general. |
| **Ink (Tinta Carbón)** | `#14202c` | Tipografía principal de lectura (alto contraste, descanso visual). |
| **Ink Soft (Gris Textil)** | `#3d4c5a` | Texto de descripciones de platos, notas de historia. |
| **Muted (Gris Niebla)** | `#6c7c8a` | Metadatos, etiquetas secundarias, placeholders. |

---

### 2.2. Tipografía (Typography System)

* **Display / Títulos (`--font-display`):**
  * **Fuente:** `Fraunces` (Serif editorial, cálida, con serifas suaves y orgánicas, aspecto culinario artesanal).
  * **Alternativas:** `Playfair Display`, `Recolta`, `IvyMode`, `Georgia`.
  * **Uso:** `<h1>`, `<h2>`, `<h3>`, números destacados (estadísticas "14 años"), citas y nombres de platos en acordeón.
* **Cuerpo / Texto y UI (`--font-body`):**
  * **Fuente:** `Inter` (Sans-serif geométrica, moderna, limpia, ultra legible en pantallas pequeñas).
  * **Alternativas:** `Plus Jakarta Sans`, `DM Sans`, `Outfit`.
  * **Uso:** Párrafos, descripciones de ingredientes, filtros, precios, botones y menús de navegación.

#### Escala Tipográfica Fluida:
* **Hero Display (`clamp` 37px → 70px):** `font-weight: 700`, `letter-spacing: -0.02em`.
* **Títulos de Sección (`clamp` 30px → 45px):** `font-weight: 600`.
* **Nombres de Platos / Subtítulos (`clamp` 19px → 23px):** `font-weight: 600`.
* **Cuerpo de texto / Precios (`clamp` 16px → 18px):** Precios en negrita con tono `Teal 700` o `Gold 500`.

---

### 2.3. Estilo Visual, Texturas y Sombras (Visual Aesthetics)

* **Bordes & Radios:** Suaves y amigables (`border-radius: 12px` a `16px` para tarjetas; `9999px` para píldoras/chips).
* **Sombras (Elevation):**
  * Sombra suave: `0 4px 12px rgba(5, 20, 35, 0.07)`
  * Sombra flotante (Hover / Floating WhatsApp): `0 10px 24px rgba(5, 20, 35, 0.12), 0 30px 70px rgba(5, 20, 35, 0.16)`
* **Separadores y Texturas:**
  * **Separador de olas marinas SVG (`WaveDivider`):** Transiciones orgánicas entre bloques blancos y secciones azul marino oscuro (`#0a2540`).
  * Texturas sutiles de grano o degradados radiales marítimos suaves.
* **Estilo Fotográfico:** Fotografía gastronómica de ángulo 45° y cenital, iluminación natural cálida, platos abundantes, vapor/humedad visible en cazuelas, frescura en pescados enteros fritos y camarones dorados crujientes con limón y patacón.

---

## 3. Arquitectura de Páginas y Componentes Clave

### 📄 Página 1: Landing Page Comercial (`/` - Inicio)

1. **Header / Navbar:**
   * Logo a color (barco/pescador con olas), nombre *"La Sabrosura del Mar — Armenia, Quindío"*.
   * Enlaces: *Inicio*, *Carta*, *Nuestra historia*, *Sedes*, *Contacto*.
   * CTA de cabecera: Botón píldora dorado *"Ver la carta"*.
2. **Hero Section:**
   * Fondo azul marino abisal (`#0a2540`) con acentos dorados y olas estilizadas.
   * *Eyebrow:* `"Armenia, Quindío · Comida de Mar"`.
   * *Título Display:* `"El auténtico sabor del mar en el corazón del Eje Cafetero"`.
   * *Badges de Confianza:* `"14 Años de tradición"`, `"Pesca fresca diaria"`, `"2 Sedes en Armenia"`.
   * *CTAs duales:* Botón primario dorado `"Explorar la carta"` + Botón secundario `"Nuestra historia"`.
   * *Visual:* Mockup flotante con fotografía estelar (ej. Cazuela de Mariscos o Pescado Frito con patacones crocantes).
3. **Sección Intro & Estadísticas:**
   * Grilla editorial sobre fondo arena (`#f8f4ed`) explicando la herencia caribeña de Candelaria.
   * Cifras de impacto: Años de experiencia, platos servidos, sedes activas.
4. **Platos Destacados (Signature Dishes Carousel / Grid):**
   * Tarjetas con fotografía 3:2, badge de *"Favorito"*, nombre en serif (`Fraunces`), descripción corta de ingredientes y precio en COP.
   * Botón inferior: *"Ver todos los platos en la carta"*.
5. **Diferenciales de Marca (Wave Section):**
   * Enmarcado entre divisores de olas marinas SVG.
   * 4 pilares: Pesca seleccionada, recetas tradicionales de la costa, porciones generosas y atención cercana.
6. **Línea de Tiempo / Historia:**
   * Recorrido gráfico desde los inicios artesanales hasta la consolidación de sus 2 sedes.
7. **Showcase de Sedes (Sede Centro vs. Sede Norte):**
   * **Sede Centro (Cra. 13 #21-32):** Ambiente tradicional, salón amplio, almuerzos ejecutivos y familiares.
   * **Sede Norte (Cra. 19 #15 Norte-40, Proviteq):** Zona gastronómica, fácil acceso, parqueadero.
   * Horarios, teléfonos, enlaces directos a Google Maps y fotos de fachada/salón.
8. **CTA Band de Cierre:**
   * Franja fotográfica inmersiva: *"¿Se te antojó? Descubre nuestra carta o pide directamente al restaurante"*.
   * Botón destacado verde/dorado de WhatsApp.
9. **Footer:**
   * Enlaces legales, redes sociales (Instagram, Facebook, TikTok), horarios (Lunes a Domingo 11:00 am - 5:00 pm).

---

### 📄 Página 2: Menú Virtual / Carta Digital (`/carta`)

* **Enfoque de diseño:** Menú virtual **100% consultivo** (diseñado para abrirse en el restaurante escaneando QR o desde Instagram en el móvil).
* **Header de la Carta:**
  * Fondo marino limpio, buscador en tiempo real (`<input>` con icono de lupa) para filtrar platos por ingrediente o nombre (ej. "camarón", "mojarra", "cazuela").
* **Barra de Navegación de Categorías (Pills Sticky / Horizontally Scrollable):**
  * Chips con efecto active: *Arroces, Cazuelas, Ceviches, Pescados Enteros, Salmón, Camarones y Langostinos, Pastas, Especialidades, Bebidas*.
* **Estructura de Acordeón por Plato (`MenuItem`):**
  * **Vista compacta:** Miniatura cuadrada (1:1), nombre del plato en negrita, ingredientes clave resumidos, precio en COP grande y legible, icono chevron desplegable.
  * **Vista expandida (Al tocar el plato):** Despliega suavemente una foto de alta resolución a sangre, descripción gastronómica completa, guarniciones incluidas (arroz con coco, patacón, ensalada).
  * **Regla clave:** No existen botones de compra individuales en cada plato; el menú es fluido, limpio y libre de saturación comercial.
* **Banner Comercial Inferior (Bottom Conversion Bar):**
  * Caja flotante / final de alta gama invitando a realizar el pedido o resolver dudas vía WhatsApp:
  * Texto: *"¿Deseas pedir al restaurante? Comunícate con nuestra línea directa. Te asesoramos con la carta, disponibilidad y toma de tu pedido."*
  * Botón con icono oficial de WhatsApp.

---

### 📄 Elementos Globales Siempre Visibles

1. **Botón Flotante de WhatsApp (`WhatsAppFloat`):**
   * Botón flotante circular verde esmeralda (`#25d366`) con halo pulsante en la esquina inferior derecha.
   * Micro-badge: *"¿Tienes dudas o quieres pedir? Escríbenos"*.
   * Dispara el mensaje oficial preconfigurado:
     > `"Hola, estoy interesado en pedir al restaurante"`

---

## 4. Ideas y Fuentes Creativas para el Mockup (Creative Prompts para Stitch)

Pasa las siguientes direcciones de diseño a la IA / Stitch para explorar diferentes rutas estéticas:

1. **Ruta A — "Editorial Costa Caribe & Brisa Marina" (Recomendada):**
   * Contrastes profundos entre Azul Marino Abisal (`#0a2540`) y Arena Cálida (`#f8f4ed`).
   * Tipografías Serif majestuosas para encabezados (`Fraunces`), combinadas con acentos dorados (`#d99a3f`) que evocan sol, atardecer costero y patacones dorados.
   * Divisores fluidos de olas vectoriales y microinteracciones suaves tipo boutique.
2. **Ruta B — "Modern Coastal Bistro / Neo-Marino Minimalista":**
   * Fondo blanco papel (`#ffffff`) ultramoderno con marcos en gris tenue (`--line`).
   * Píldoras de color turquesa suave (`#d9edf3`), tipografía sans-serif pulida (`Inter`), fotos de platos en círculos y cuadrículas simétricas de restaurante contemporáneo de alta gastronomía de mar.
3. **Ruta C — "Dark Seafood Luxury Lounge":**
   * Modo oscuro elegante con fondos en `--navy-950` (`#051423`), tarjetas en acrílico glassmorphism con desenfoque de fondo (`backdrop-filter: blur(12px)`), tipografías en blanco y oro radiante, y fotos iluminadas con luz lateral dramática para realzar el brillo de mariscos frescos y arroces.
