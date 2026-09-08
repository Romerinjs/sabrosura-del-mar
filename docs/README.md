# 📚 Documentación Modular y Roadmap de Migración a Astro
**Proyecto:** La Sabrosura del Mar  
**Objetivo:** Guía técnica y visual para adaptar el frontend HTML/CSS/JS estático a una arquitectura de componentes moderna con **Astro**.

---

## 🗂️ Estructura de la Documentación

Esta documentación está organizada en subcarpetas para que el equipo de desarrollo pueda consultar los activos visuales, el catálogo de componentes y la estrategia de migración de forma independiente:

```
docs/
├── README.md                                 # Este índice central
├── 01-diseno-y-activos/
│   ├── identidad-visual.md                   # Paleta, tokens CSS, tipografías y logos
│   └── iconografia-svg.md                    # Catálogo completo de SVGs listos para Astro
├── 02-catalogo-componentes/
│   └── mapeo-html-a-astro.md                 # Deconstrucción del HTML en componentes .astro
└── 03-roadmap-migracion-astro/
    └── guia-paso-a-paso.md                   # Paso a paso técnico, tipado Zod y configuración
```

---

## 🚀 Resumen Rápido de las Secciones

### [1. Diseño y Activos (`01-diseno-y-activos/`)](file:///d:/Usuarios/ACER/Documentos/88/sabrosura-del-mar/sabrosura%202/docs/01-diseno-y-activos/identidad-visual.md)
- **Identidad Visual:** Todos los tokens de marca, variables en `:root`, tamaños de fuentes fluidas con `clamp()` y especificaciones de logotipos.
- **Iconografía SVG:** Catálogo de cada uno de los iconos vectoriales del sitio (horarios, ubicación, WhatsApp, redes sociales, cubiertos, olas, placeholders) para transformarlos fácilmente en componentes Astro reutilizables.

### [2. Catálogo de Componentes (`02-catalogo-componentes/`)](file:///d:/Usuarios/ACER/Documentos/88/sabrosura-del-mar/sabrosura%202/docs/02-catalogo-componentes/mapeo-html-a-astro.md)
- Deconstrucción de `index.html` y `carta.html` en bloques modulares:
  - **Layout:** `BaseLayout.astro`, `Header.astro`, `Footer.astro`, `MobileNav.astro`, `WhatsAppFloat.astro`.
  - **Secciones Landing:** `Hero.astro`, `DishCard.astro`, `WaveDivider.astro`, `Timeline.astro`, `VenueCard.astro`, `ContactCard.astro`.
  - **Carta Digital:** `MenuNav.astro`, `MenuSearch.astro`, `MenuSection.astro`, `MenuItem.astro`, `MenuFeature.astro`.

### [3. Roadmap de Migración a Astro (`03-roadmap-migracion-astro/`)](file:///d:/Usuarios/ACER/Documentos/88/sabrosura-del-mar/sabrosura%202/docs/03-roadmap-migracion-astro/guia-paso-a-paso.md)
- Roadmap estructurado en 5 etapas:
  1. Configuración inicial del entorno Astro.
  2. Tipado estricto del archivo `menu.json` con TypeScript / Zod.
  3. Creación de Layouts y Componentes.
  4. Migración de la interactividad en cliente (Buscador reactivo y drawer móvil).
  5. Despliegue estático y SEO.
