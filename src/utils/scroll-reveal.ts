/**
 * SCROLL REVEAL ENGINE
 * Motor de detección de intersección de alto rendimiento para animaciones on-scroll.
 * Cero dependencias externas. Compatible con Astro View Transitions / ClientRouter.
 */

export interface ScrollRevealOptions {
  /** Umbral de visibilidad (0.0 a 1.0) para disparar la animación. Default: 0.06 */
  threshold?: number;
  /** Margen del viewport para anticipar la animación. Default: '0px 0px -30px 0px' */
  rootMargin?: string;
  /** Selector de los elementos a observar. Default: '[data-sr], [data-animate], .reveal' */
  selector?: string;
}

export class ScrollRevealEngine {
  private observer: IntersectionObserver | null = null;
  private options: Required<ScrollRevealOptions>;
  private mutationObserver: MutationObserver | null = null;

  constructor(options: ScrollRevealOptions = {}) {
    this.options = {
      threshold: options.threshold ?? 0.06,
      rootMargin: options.rootMargin ?? '0px 0px -30px 0px',
      selector: options.selector ?? '[data-sr], [data-animate], .reveal'
    };
  }

  /**
   * Inicializa el observador y procesa los elementos del DOM.
   */
  public init(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Fallback: Si el navegador no soporta IntersectionObserver, mostrar todo
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll<HTMLElement>(this.options.selector).forEach((el) => {
        el.classList.add('is-in-view', 'is-visible');
      });
      return;
    }

    // Destruir instancia previa si existe para evitar observadores duplicados
    this.destroy();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        const once = el.getAttribute('data-sr-once') !== 'false';

        if (entry.isIntersecting) {
          this.revealElement(el);
          if (once && this.observer) {
            this.observer.unobserve(el);
          }
        } else if (!once) {
          // Si once=false, se vuelve a ocultar al salir del viewport
          el.classList.remove('is-in-view', 'is-visible');
          el.style.setProperty('--sr-delay', '0s');
          el.style.transitionDelay = '0s';
        }
      });
    }, {
      threshold: this.options.threshold,
      rootMargin: this.options.rootMargin
    });

    // Registrar todos los elementos actuales
    this.observeElements();

    // Observar elementos dinámicos agregados por SPA o fetch
    this.observeMutations();
  }

  /**
   * Configura variables CSS inline según atributos data-sr-*
   */
  private applyCustomProperties(el: HTMLElement): void {
    const duration = el.getAttribute('data-sr-duration');
    const distance = el.getAttribute('data-sr-distance');
    const blur = el.getAttribute('data-sr-blur');
    const delay = el.getAttribute('data-sr-delay') || el.getAttribute('data-delay');

    if (duration) el.style.setProperty('--sr-duration', duration.endsWith('s') ? duration : `${duration}s`);
    if (distance) el.style.setProperty('--sr-distance', distance);
    if (blur) el.style.setProperty('--sr-blur', blur);
    if (delay) {
      const formattedDelay = delay.endsWith('s') ? delay : `${delay}s`;
      el.style.setProperty('--sr-delay', formattedDelay);
      el.style.transitionDelay = formattedDelay;
    }
  }

  /**
   * Aplica estilos personalizados inline y activa la animación
   */
  private revealElement(el: HTMLElement): void {
    this.applyCustomProperties(el);
    el.classList.add('is-in-view', 'is-visible');
  }

  /**
   * Asigna los observadores a cada elemento encontrado
   */
  public observeElements(): void {
    if (!this.observer) return;

    const elements = document.querySelectorAll<HTMLElement>(this.options.selector);

    elements.forEach((el) => {
      // Aplicar propiedades CSS personalizadas (ej. distance inicial y delay)
      this.applyCustomProperties(el);

      // Si el elemento ya fue animado con once=true, ignorar
      if (el.classList.contains('is-in-view') && el.getAttribute('data-sr-once') !== 'false') {
        return;
      }

      // Elementos del Hero o Above-The-Fold con data-sr-instant o data-instant
      if (el.hasAttribute('data-sr-instant') || el.hasAttribute('data-instant')) {
        const delayStr = el.getAttribute('data-sr-delay') || el.getAttribute('data-delay') || '0';
        const delay = Math.max(parseFloat(delayStr) * 1000, 40);
        setTimeout(() => this.revealElement(el), delay);
      } else {
        this.observer.observe(el);
      }
    });
  }

  /**
   * Detecta nuevos elementos inyectados dinámicamente en el DOM (SPAs)
   */
  private observeMutations(): void {
    if (typeof MutationObserver === 'undefined') return;

    this.mutationObserver = new MutationObserver((mutations) => {
      let hasNewElements = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasNewElements = true;
          break;
        }
      }
      if (hasNewElements) {
        this.observeElements();
      }
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Limpia observadores y previene fugas de memoria
   */
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  }
}

// Instancia singleton para uso rápido
let globalInstance: ScrollRevealEngine | null = null;

export function initScrollReveal(options?: ScrollRevealOptions): ScrollRevealEngine {
  if (!globalInstance) {
    globalInstance = new ScrollRevealEngine(options);
  }
  globalInstance.init();
  return globalInstance;
}
