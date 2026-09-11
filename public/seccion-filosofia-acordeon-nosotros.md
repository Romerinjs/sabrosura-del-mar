# Documentación Técnica: Sección de Filosofía y Acordeón Horizontal Interactivo (`PhilosophySection.astro`)

> **Referencia de Arquitectura, Componente y UX:** Guía técnica completa sobre la sección de filosofía y principios de trabajo ubicada en la página de **Nosotros** (`/nosotros` y `/en/nosotros`), detallando su propósito estratégico, estructura HTML/Astro, física de animación CSS y comportamiento interactivo.

---

## 1. Propósito y Funcionalidad de la Sección

La sección **Filosofía de Trabajo** (`PhilosophySection.astro`) es un bloque estratégico de alta retención visual y persuasión que comunica la postura operativa y ética de **77 Studio** frente al desarrollo de software, marketing e inteligencia artificial.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        ENCABEZADO DE IMPACTO (Text Reveal)                             │
│       "La tecnología cambia. Nuestro enfoque sigue siendo resolver problemas."         │
│  "El objetivo no es acumular herramientas ni inflar métricas vanidosas. Es hacer..."  │
└────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│             ACORDEÓN HORIZONTAL EXPANDIBLE 1-FILA x 4-COLUMNAS (Flex Physics)          │
│ ┌───────────────────┬───────────────────┬───────────────────┬────────────────────────┐ │
│ │ 01. Cero Humo     │ 02. Creatividad + │ 03. Obsesión por  │ 04. Propiedad Total    │ │
│ │ Tecnológico       │ Código            │ la Ejecución      │ para el Cliente        │ │
│ │ [Foto + Zoom]     │ [Foto + Zoom]     │ [Foto + Zoom]     │ [Foto + Zoom]          │ │
│ └───────────────────┴───────────────────┴───────────────────┴────────────────────────┘ │
│   ◄─── Contraído ───► ◄────── EXPANDIDO (HOVER/TOUCH) ──────► ◄─── Contraído ───►      │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Objetivos Principales (CRO & Brand Authority):
1. **Diferenciación Anti-Hype:** Desmarca a la agencia de promesas vacías del mercado tech ("vender IA por moda"), anclando la propuesta en retorno de inversión comprobable.
2. **Gamificación / Retención Visual:** Sustituye las clásicas tarjetas estáticas por un **acordeón horizontal continuo con física elástica de expansión** que invita al usuario a interactuar con el cursor o en dispositivos móviles.
3. **Fusión de Fotografía Real y Contenido Contextual:** Las fotos de trabajo real en el estudio se revelan inicialmente limpias y, al hacer hover o clic, se oscurecen dinámicamente con un degradado y un halo púrpura (`#8d59ff`), desvelando la explicación detallada.
4. **Soporte Bilingüe Nativo (i18n):** Integra soporte directo para español e inglés según el contexto de ruta (`/nosotros` vs `/en/nosotros`).

---

## 2. Ubicación y Archivos Involucrados

| Tipo de Archivo | Ruta Relativa | Responsabilidad |
|---|---|---|
| **Componente Principal** | [`src/components/nosotros/PhilosophySection.astro`](file:///d:/Usuarios/ACER/Documentos/OIDUTS-88/projects/web-77-studio/src/components/nosotros/PhilosophySection.astro) | Estructura Astro, renderizado de datos, lógica i18n, CSS del acordeón y script touch |
| **Página (ES)** | [`src/pages/nosotros.astro`](file:///d:/Usuarios/ACER/Documentos/OIDUTS-88/projects/web-77-studio/src/pages/nosotros.astro) | Consumo e integración en la vista de Nosotros en español |
| **Página (EN)** | [`src/pages/en/nosotros.astro`](file:///d:/Usuarios/ACER/Documentos/OIDUTS-88/projects/web-77-studio/src/pages/en/nosotros.astro) | Consumo e integración en la vista de Nosotros en inglés |
| **Imágenes de Fondo** | `/public/img/cero-humo-tecnológico.jpg`<br/>`/public/img/codigo-creatividad.jpg`<br/>`/public/img/obsesion-agil.jpg`<br/>`/public/img/propiedad.jpg` | Fotografía de alta definición optimizada para los 4 principios |

---

## 3. Estructura de Datos y Principios

Cada tarjeta del acordeón se alimenta de una estructura de datos tipada que gestiona textos en español e inglés:

```ts
const principles = [
  {
    title: isEn ? "Zero Tech Hype & Fluff" : "Cero Humo Tecnológico",
    description: isEn
      ? "We never recommend artificial intelligence, custom software, or bloated ad campaigns just because they are trendy. We engineer strictly what delivers verifiable ROI."
      : "No recomendamos inteligencia artificial, software a medida o campañas complejas solo porque estén de moda. Proponemos únicamente lo que genera retorno comprobado.",
    image: "/img/cero-humo-tecnológico.jpg",
    alt: isEn ? "Zero Tech Hype & Real ROI" : "Cero Humo Tecnológico y Retorno Real"
  },
  {
    title: isEn ? "Creativity + Code at the Same Table" : "Creatividad + Código en la Misma Mesa",
    description: isEn
      ? "We eliminate the common friction between creative designers and software engineers. Aesthetics and functional performance are architected together from day one."
      : "Eliminamos la desconexión típica entre el equipo de diseño y el equipo de desarrollo. La estética y la funcionalidad se construyen juntas desde el día uno.",
    image: "/img/codigo-creatividad.jpg",
    alt: isEn ? "Creativity and Engineering Together" : "Creatividad y Código en la Misma Mesa"
  },
  {
    title: isEn ? "Obsession with Agile Execution" : "Obsesión por la Ejecución Ágil",
    description: isEn
      ? "We replace endless bureaucratic meetings with tangible deliverables, short high-velocity sprints, and continuous feedback loops driven by real analytics."
      : "Reemplazamos reuniones eternas y documentos burocráticos por entregables funcionales, sprints cortos y mejoras continuas sobre datos reales de uso.",
    image: "/img/obsesion-agil.jpg",
    alt: isEn ? "Agile Execution and Sprints" : "Obsesión por la Ejecución Ágil"
  },
  {
    title: isEn ? "100% Client Ownership" : "Propiedad Total para el Cliente",
    description: isEn
      ? "Your Meta/Google ad accounts, cloud hosting credentials, source code, and databases are 100% owned by your company. We believe in partnerships built on value, not hostage retainers."
      : "Tus cuentas de Meta, Google, accesos de hosting, código fuente y bases de datos son 100% de tu empresa. Creemos en relaciones por valor, no por retención forzada.",
    image: "/img/propiedad.jpg",
    alt: isEn ? "100% Client Ownership" : "Propiedad Total para el Cliente"
  }
];
```

---

## 4. Anatomía y Estructura del Marcado (HTML / Astro)

El componente consta de dos bloques clave:

### 4.1. Encabezado de Sección (`Section Header`)
- Título balanceado con soporte para el efecto de revelado `data-text-reveal`.
- Párrafo de bajada con animación escalonada `data-opai-animate data-delay="0.2"`.

```html
<div class="text-center max-w-4xl lg:max-w-5xl mx-auto mb-14 sm:mb-16">
  <h2 data-text-reveal class="font-sora text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-bold tracking-tight text-background-13 leading-[1.2] mb-4 text-balance">
    La tecnología cambia. Nuestro enfoque <br class="hidden sm:inline" />
    sigue siendo resolver problemas.
  </h2>
  <p data-opai-animate data-delay="0.2" class="font-inter-tight text-base sm:text-lg text-background-13/75 leading-relaxed max-w-3xl mx-auto text-balance">
    El objetivo no es acumular herramientas ni inflar métricas vanidosas. Es hacer que tu empresa se vea mejor, venda mejor y funcione mejor.
  </p>
</div>
```

### 4.2. Contenedor Maestro y Tarjetas del Acordeón (`.accordion-container` y `.accordion-card`)
- Marco contenedor continuo con borde suave (`border-black/10`), sombra y radio redondeado (`rounded-[32px]`).
- 4 tarjetas `article` con `tabindex="0"` y `role="region"` para máxima accesibilidad y soporte de navegación por teclado.
- 5 capas de renderizado superpuestas en cada tarjeta:
  1. **Fotografía de fondo:** `img` absoluta con zoom suave `group-hover:scale-105 transition-transform duration-700`.
  2. **Overlay base:** Capa oscura constante `bg-black/25` para equilibrar el brillo de las fotos.
  3. **Overlay de contraste interactivo:** Gradiente negro `from-black/95 via-black/60 to-black/20` con opacidad `0 -> 100`.
  4. **Resplandor púrpura de marca:** Capa `bg-opai-purple/10` con modo de fusión `mix-blend-overlay`.
  5. **Caja de contenido textual:** Título y descripción alineados al fondo (`justify-end`) que suben mediante `translate-y-6 -> translate-y-0` y pasan de `opacity-0` a `opacity-100`.

---

## 5. Física y Animación CSS (Flex Expansion Physics)

El comportamiento de expansión elástica está implementado en CSS puro acelerado por GPU:

```css
/* Configuración base de flexbox */
.accordion-container {
  display: flex;
}

.accordion-card {
  flex: 1 1 0%;
  min-width: 0;
  min-height: 0;
  transition: flex 0.55s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: flex;
}

/* Comportamiento en Pantallas Grandes (Desktop >= 1024px) */
@media (min-width: 1024px) {
  /* Cuando el cursor entra al contenedor, las tarjetas inactivas se contraen ligeramente */
  .accordion-container:hover .accordion-card {
    flex: 0.6 1 0%;
  }

  /* La tarjeta en hover, foco o activa se expande ampliamente */
  .accordion-container .accordion-card:hover,
  .accordion-container .accordion-card:focus-within,
  .accordion-container .accordion-card.is-active {
    flex: 2.6 1 0%;
  }
}

/* Comportamiento en Tablets y Móviles (< 1024px) */
@media (max-width: 1023px) {
  .accordion-container:hover .accordion-card {
    flex: 0.7 1 0%;
  }

  .accordion-container .accordion-card:hover,
  .accordion-container .accordion-card:focus-within,
  .accordion-container .accordion-card.is-active {
    flex: 2.2 1 0%;
  }
}

/* Estados activos en Mobile (clase .is-active via JS) */
.accordion-card.is-active .accordion-active-overlay {
  opacity: 1 !important;
}

.accordion-card.is-active .accordion-active-text {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
```

---

## 6. Soporte Interactivo Táctil (Mobile Touch Support)

Para garantizar la misma experiencia de usuario en dispositivos móviles y tablets (donde el evento `hover` no existe), se incluye un listener nativo de bajo peso:

```ts
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll<HTMLElement>('.accordion-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const wasActive = card.classList.contains('is-active');
      cards.forEach((c) => c.classList.remove('is-active'));
      if (!wasActive) {
        card.classList.add('is-active');
      }
    });
  });
});
```

---

## 7. Buenas Prácticas y Accesibilidad (a11y)

- **Focus Visible:** Cuenta con anillo de foco accesible `focus-visible:ring-2 focus-visible:ring-opai-purple` para usuarios que navegan mediante teclado (`Tab` / `Shift+Tab`).
- **Semántica HTML5:** Utiliza `<section>`, `<h2>`, `<article>`, y `<h3>` respetando la jerarquía de encabezados.
- **Rendimiento:** Las imágenes utilizan `loading="lazy"` y `decoding="async"` para no penalizar el Core Web Vitals (LCP/CLS).
