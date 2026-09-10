# Guía Maestra de Animaciones Web Reutilizables & Scroll-Reveal Engine

> **Documento técnico de referencia** para entender, implementar y reutilizar efectos de animación modernos en cualquier proyecto web (Vanilla HTML/CSS/JS, Astro, React, Next.js, Vue o Vite con Tailwind CSS o CSS puro).

---

## Índice de Contenidos

1. [¿Cómo funciona el efecto On-Scroll Fade (Scroll Reveal)?](#1-cómo-funciona-el-efecto-on-scroll-fade-scroll-reveal)
   - [El ciclo de vida de la animación](#el-ciclo-de-vida-de-la-animación)
   - [¿Por qué IntersectionObserver y no `window.onscroll`?](#por-qué-intersectionobserver-y-no-windowonscroll)
   - [El secreto visual premium: Curvas Bézier y Blur progresivo](#el-secreto-visual-premium-curvas-bézier-y-blur-progresivo)
   - [Optimizaciones de GPU (`will-change` y `transform3d`)](#optimizaciones-de-gpu-will-change-y-transform3d)
2. [Efecto 1: Motor Scroll Reveal Completo (On-Scroll Fade, Direcciones y Delays)](#2-efecto-1-motor-scroll-reveal-completo)
3. [Efecto 2: Revelación Suave de Texto (Text Reveal)](#3-efecto-2-revelación-suave-de-texto-text-reveal)
4. [Efecto 3: Contador Numérico Animado On-Scroll](#4-efecto-3-contador-numérico-animado-on-scroll)
5. [Efecto 4: Parallax Ligero al Hacer Scroll](#5-efecto-4-parallax-ligero-al-hacer-scroll)
6. [Efecto 5: Header Dinámico con Glassmorphism en Scroll](#6-efecto-5-header-dinámico-con-glassmorphism-en-scroll)
7. [Efecto 6: Marquee / Carrusel Infinito Continuo (Logos y Banners)](#7-efecto-6-marquee--carrusel-infinito-continuo)
8. [Efecto 7: Tarjeta 3D Flip Card ("Moneda / Reto vs Solución")](#8-efecto-7-tarjeta-3d-flip-card)
9. [Efecto 8: Botón Píldora Interactivo con Desplazamiento Dinámico](#9-efecto-8-botón-píldora-interactivo)
10. [Efecto 9: Resplandor Ambiental Pulsante (Ambient Pulse Glow)](#10-efecto-9-resplandor-ambiental-pulsante)
11. [Buenas Prácticas, Rendimiento y Accesibilidad](#11-buenas-prácticas-rendimiento-y-accesibilidad)

---

## 1. ¿Cómo funciona el efecto On-Scroll Fade (Scroll Reveal)?

El efecto de aparición al hacer scroll (comúnmente llamado **Scroll Reveal**, **Fade-in-up** u **On-Scroll Fade**) es la técnica mediante la cual los elementos permanecen invisibles y ligeramente desplazados fuera de su posición final hasta que el usuario se desplaza y el elemento entra en el área visible de la pantalla (el **Viewport**).

### El ciclo de vida de la animación

El proceso se compone de **4 estados clave**:

```
[1. ESTADO INICIAL (CSS)]
  opacity: 0;
  transform: translateY(35px);
  filter: blur(10px);
       │
       ▼ (El usuario hace scroll)
[2. DETECCIÓN (IntersectionObserver en JS)]
  ¿El elemento entró un 15% en pantalla? ──► SI
       │
       ▼
[3. DISPARADOR (Trigger)]
  Se inyecta la clase CSS: .is-in-view (con delay opcional)
       │
       ▼
[4. TRANSICIÓN FLUIDA (Acelerada por GPU)]
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
```

### ¿Por qué `IntersectionObserver` y no `window.onscroll`?

* ❌ **Enfoque antiguo (`window.addEventListener('scroll')`)**:
  Ejecuta código JavaScript en cada milímetro de scroll. Si consultas posiciones con `getBoundingClientRect()`, obligas al navegador a recalcular la geometría de la página completa constantemente (**Layout Thrashing** o Reflow masivo), provocando caídas de FPS y saltos ("jank").

* ✅ **Enfoque moderno (`IntersectionObserver`)**:
  Es una API nativa del navegador optimizada en C++. El navegador delega la vigilancia a un hilo de bajo nivel y solo notifica a tu código JavaScript cuando un elemento realmente cruza el umbral visual deseado. Consume casi 0% de CPU en reposo.

### El secreto visual premium: Curvas Bézier y Blur progresivo

Muchos sitios usan `transition: all 0.3s ease;`, lo cual se ve tieso y genérico. Para lograr ese acabado elegante estilo *Apple*, *Linear* o *Vercel*, se combinan tres factores:

1. **Curva Quintic Out**: `cubic-bezier(0.16, 1, 0.3, 1)`
   Arranca a máxima velocidad y desacelera de forma orgánica y suave al llegar a su destino.
2. **Duración calibrada**: `0.8s` (permite apreciar el movimiento sin retrasar al usuario).
3. **Desenfoque cinemático (Blur)**: `filter: blur(10px)` a `blur(0)`.
   Da la ilusión de que el elemento entra en foco de una cámara fotográfica.

---

## 2. Efecto 1: Motor Scroll Reveal Completo

Este es el sistema modular que puedes copiar y pegar en cualquier proyecto. Soporta:
- Animación desde **Abajo** (default), **Arriba**, **Izquierda** o **Derecha**.
- Desbloqueo inmediato para elementos visibles en el Hero (`data-instant`).
- Retardo escalonado para listas o tarjetas (`data-delay="0.1"`, `data-delay="0.2"`).

### El Código CSS

```css
/* ==========================================================
   SCROLL REVEAL ENGINE
   ========================================================== */

/* Estado inicial: Oculto, desplazado y desenfocado */
[data-animate] {
  opacity: 0;
  transform: translateY(35px);
  filter: blur(8px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform, filter;
}

/* Variantes direccionales opcionales */
[data-animate][data-direction="left"] {
  transform: translateX(-40px);
}

[data-animate][data-direction="right"] {
  transform: translateX(40px);
}

[data-animate][data-direction="down"] {
  transform: translateY(-35px);
}

[data-animate][data-direction="zoom"] {
  transform: scale(0.92);
}

/* Estado final cuando entra al viewport */
[data-animate].is-in-view {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  filter: blur(0);
}
```

### El Código JavaScript (`animations.js`)

```javascript
export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || '0';
        
        // Aplica el retardo escalonado configurado
        el.style.transitionDelay = `${delay}s`;
        el.classList.add('is-in-view');
        
        // Dejar de observar para que no vuelva a parpadear
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.15, // Dispara cuando el 15% del elemento es visible
    rootMargin: '0px 0px -40px 0px' // Offset de anticipación
  });

  elements.forEach((el) => {
    // Si tiene data-instant, se anima inmediatamente (útil para el Hero)
    if (el.hasAttribute('data-instant')) {
      const delay = el.getAttribute('data-delay') || '0';
      setTimeout(() => {
        el.classList.add('is-in-view');
      }, parseFloat(delay) * 1000);
    } else {
      observer.observe(el);
    }
  });
}

// Inicialización automática
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
}
```

### Ejemplo de Uso en HTML

```html
<!-- Elemento que entra hacia arriba de forma estándar -->
<div data-animate>
  <h2>Soluciones a tu Medida</h2>
</div>

<!-- Tarjetas escalonadas (Stagger) con dirección y retardo -->
<div class="grid grid-cols-3 gap-6">
  <div data-animate data-delay="0.1">Tarjeta 1</div>
  <div data-animate data-delay="0.2">Tarjeta 2</div>
  <div data-animate data-delay="0.3">Tarjeta 3</div>
</div>

<!-- Entrada lateral desde la izquierda -->
<div data-animate data-direction="left" data-delay="0.15">
  <img src="foto.jpg" alt="Showcase" />
</div>

<!-- Elemento del Hero que arranca solo al cargar -->
<h1 data-animate data-instant data-delay="0.05">Bienvenido</h1>
```

---

## 3. Efecto 2: Revelación Suave de Texto (Text Reveal)

Ideal para títulos principales, subtítulos o citas textuales que necesitan un énfasis tipográfico más ligero y nítido.

### CSS

```css
[data-text-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

[data-text-reveal].is-revealed {
  opacity: 1;
  transform: translateY(0);
}
```

### JS

```javascript
export function initTextReveal() {
  const textElements = document.querySelectorAll('[data-text-reveal]');
  
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || '0';
        el.style.transitionDelay = `${delay}s`;
        el.classList.add('is-revealed');
        textObserver.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  textElements.forEach((el) => textObserver.observe(el));
}
```

---

## 4. Efecto 3: Contador Numérico Animado On-Scroll

Cuenta números de forma dinámica cuando el usuario llega a la sección de estadísticas (ej. de 0 a 310 en 1.4 segundos).

### HTML

```html
<div class="stat-card">
  <!-- data-number: número objetivo | data-speed: duración en ms -->
  <span class="number" data-counter data-number="310" data-speed="1500">0</span>
  <span>% de Aumento en Leads</span>
</div>
```

### JS

```javascript
export function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNum = parseInt(el.getAttribute('data-number') || '0', 10);
        const duration = parseInt(el.getAttribute('data-speed') || '1400', 10);
        
        if (!el.classList.contains('counted')) {
          el.classList.add('counted');
          let startTimestamp = null;
          
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Curva de desaceleración suave (easeOutQuad)
            const easeOutProgress = 1 - (1 - progress) * (1 - progress);
            const currentNum = Math.floor(easeOutProgress * targetNum);
            
            el.innerText = currentNum.toString();
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              el.innerText = targetNum.toString();
            }
          };
          
          window.requestAnimationFrame(step);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counterElements.forEach((el) => counterObserver.observe(el));
}
```

---

## 5. Efecto 4: Parallax Ligero al Hacer Scroll

Crea sensación de profundidad y capas 3D moviendo fondos, imágenes o tarjetas flotantes a una velocidad diferente que el resto del documento.

### HTML

```html
<!-- data-parallax-speed define la intensidad del movimiento -->
<img 
  src="mockup-flotante.png" 
  alt="Mockup" 
  data-parallax 
  data-parallax-speed="25"
/>
```

### JS (Optimizado a 60fps con `requestAnimationFrame` y evento pasivo)

```javascript
export function initParallax() {
  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        elements.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-parallax-speed') || '15');
          const translateY = -(scrollY * (speed / 1000));
          el.style.transform = `translate3d(0, ${translateY}px, 0)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
```

---

## 6. Efecto 5: Header Dinámico con Glassmorphism en Scroll

El navbar arranca transparente o flotante, y al hacer más de 80px de scroll se transforma en una barra compacta con fondo translúcido y desenfoque (`backdrop-filter`).

### CSS

```css
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  padding: 1.5rem 2rem;
  background: transparent;
  transition: padding 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
}

#navbar.scrolled {
  padding: 0.8rem 2rem;
  background-color: rgba(255, 255, 255, 0.85); /* o rgba(15, 15, 20, 0.85) en dark mode */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
```

### JS

```javascript
export function initStickyHeader() {
  const header = document.querySelector('#navbar');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}
```

---

## 7. Efecto 6: Marquee / Carrusel Infinito Continuo

Ideal para franjas de logos de clientes, partners o métricas que se desplazan infinitamente sin cortes.

### HTML

```html
<div class="marquee-container">
  <div class="marquee-track">
    <!-- Bloque 1 de logos -->
    <div class="marquee-content">
      <img src="logo1.svg" alt="Logo 1">
      <img src="logo2.svg" alt="Logo 2">
      <img src="logo3.svg" alt="Logo 3">
      <img src="logo4.svg" alt="Logo 4">
    </div>
    <!-- Bloque 2 idéntico (para ciclo continuo sin salto) -->
    <div class="marquee-content" aria-hidden="true">
      <img src="logo1.svg" alt="Logo 1">
      <img src="logo2.svg" alt="Logo 2">
      <img src="logo3.svg" alt="Logo 3">
      <img src="logo4.svg" alt="Logo 4">
    </div>
  </div>
</div>
```

### CSS (100% puro, sin JS pesado)

```css
.marquee-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  /* Gradientes de desvanecimiento lateral */
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
}

/* Pausa suave al pasar el cursor */
.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding-right: 3rem;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

---

## 8. Efecto 7: Tarjeta 3D Flip Card ("Moneda / Reto vs Solución")

Permite voltear una tarjeta en 3D para mostrar el frente (El Problema / El Reto en tono oscuro) y el reverso (La Solución / Resultado en tono claro o de acento).

### HTML

```html
<div class="flip-card-wrapper" tabindex="0">
  <div class="flip-card-inner">
    <!-- Cara Frontal (Frente) -->
    <div class="flip-card-face flip-card-front">
      <span class="badge">El Reto</span>
      <h3>Pérdida de prospectos</h3>
      <p>El 70% de los leads se pierden por falta de respuesta rápida.</p>
      <span class="flip-hint">Toca o pasa el cursor para voltear ↺</span>
    </div>

    <!-- Cara Trasera (Reverso) -->
    <div class="flip-card-face flip-card-back">
      <span class="badge-success">Nuestra Solución</span>
      <h3>Agente IA 24/7</h3>
      <p>Respuesta inmediata en menos de 45 segundos conectada a WhatsApp.</p>
      <p class="metric">+310% de conversión</p>
    </div>
  </div>
</div>
```

### CSS

```css
.flip-card-wrapper {
  perspective: 1200px;
  width: 100%;
  min-height: 280px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.34, 1.25, 0.64, 1);
  transform-style: preserve-3d;
}

/* Volteo al hacer hover o al estar enfocado */
.flip-card-wrapper:hover .flip-card-inner,
.flip-card-wrapper:focus .flip-card-inner,
.flip-card-wrapper.is-flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-face {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Frente: Oscuro */
.flip-card-front {
  background: #0f111a;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Reverso: Claro / Destacado rotado a 180° */
.flip-card-back {
  background: #ffffff;
  color: #0f111a;
  transform: rotateY(180deg);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.12);
}
```

---

## 9. Efecto 8: Botón Píldora Interactivo con Desplazamiento Dinámico

Micro-interacción de alta gama para botones con icono donde, al hacer hover, el icono se traslada dinámicamente de izquierda a derecha y el texto se desplaza suavemente en sentido contrario.

### HTML

```html
<a href="#contacto" class="pill-btn">
  <span class="btn-icon">→</span>
  <span class="btn-text">Iniciar Proyecto</span>
</a>
```

### CSS

```css
.pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.75rem 0.75rem 1rem;
  border-radius: 9999px;
  background: #111;
  color: #fff;
  text-decoration: none;
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s ease;
}

.pill-btn .btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: #7952f5;
  color: #fff;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.pill-btn .btn-text {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  font-weight: 600;
}
```

### JS (Cálculo geométrico relativo de límites)

```javascript
export function initPillButtons() {
  const buttons = document.querySelectorAll('.pill-btn');

  buttons.forEach((btn) => {
    const icon = btn.querySelector('.btn-icon');
    const text = btn.querySelector('.btn-text');
    if (!icon || !text) return;

    btn.addEventListener('mouseenter', () => {
      const btnRect = btn.getBoundingClientRect();
      const iconRect = icon.getBoundingClientRect();
      const textRect = text.getBoundingClientRect();

      const paddingLeft = parseFloat(getComputedStyle(btn).paddingLeft) || 0;
      const paddingRight = parseFloat(getComputedStyle(btn).paddingRight) || 0;

      // Distancia máxima que el icono puede viajar hacia la derecha
      const iconTravel = btnRect.width - paddingRight - icon.offsetWidth - (iconRect.left - btnRect.left);
      // Distancia que el texto cede hacia la izquierda
      const textTravel = Math.max(0, textRect.left - btnRect.left - paddingLeft);

      icon.style.transform = `translateX(${iconTravel}px)`;
      text.style.transform = `translateX(-${textTravel}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      icon.style.transform = 'translateX(0)';
      text.style.transform = 'translateX(0)';
    });
  });
}
```

---

## 10. Efecto 9: Resplandor Ambiental Pulsante (Ambient Pulse Glow)

Un aura brillante orgánica ideal para colocar detrás de imágenes de productos, logotipos o tarjetas centrales del Hero.

```css
@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.08);
  }
}

.ambient-glow {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(121, 82, 245, 0.35) 0%, rgba(121, 82, 245, 0) 70%);
  filter: blur(40px);
  pointer-events: none;
  animation: pulseGlow 5s infinite ease-in-out;
}
```

---

## 11. Buenas Prácticas, Rendimiento y Accesibilidad

1. **Anima solo propiedades compuestas (`transform` y `opacity`)**:
   Nunca animes `top`, `left`, `width`, `height` ni `margin` durante scroll o transiciones frecuentes. `transform` y `opacity` se procesan directamente en la GPU sin activar las fases de Layout y Paint del navegador.
2. **Usa `will-change` con moderación**:
   Aplica `will-change: transform, opacity;` únicamente a elementos que van a animarse de inmediato para que el navegador cree una capa de composición (**Compositing Layer**).
3. **Respeta la preferencia de reducción de movimiento (`prefers-reduced-motion`)**:
   Por accesibilidad para personas propensas a mareos por cinetosis:

```css
@media (prefers-reduced-motion: reduce) {
  [data-animate],
  [data-text-reveal],
  .marquee-track,
  .pill-btn .btn-icon,
  .pill-btn .btn-text {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    filter: none !important;
    opacity: 1 !important;
  }
}
```

---

## Archivo Maestro Integrado listo para copiar

Crea un archivo `motion.js` en tu nuevo proyecto y compila todo con:

```javascript
import { initScrollAnimations } from './animations';
import { initTextReveal } from './animations';
import { initCounters } from './animations';
import { initParallax } from './animations';
import { initStickyHeader } from './animations';
import { initPillButtons } from './animations';

export function initGlobalMotionEngine() {
  initScrollAnimations();
  initTextReveal();
  initCounters();
  initParallax();
  initStickyHeader();
  initPillButtons();
}

// Soporte para Astro View Transitions, SPA o carga estática
document.addEventListener('astro:page-load', initGlobalMotionEngine);
document.addEventListener('DOMContentLoaded', initGlobalMotionEngine);
```
