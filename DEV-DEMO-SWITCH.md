# 🛠️ Documentación: Switch de Pruebas Demo de WhatsApp (Desarrollo)

Este documento detalla el funcionamiento del **Switch de Modo Demo de WhatsApp** agregado para realizar pruebas de pedidos sin molestar la línea comercial activa del restaurante, y describe **exactamente cómo eliminarlo antes del despliegue a producción** sin afectar ningún componente.

---

## 🎯 ¿Qué hace este switch?

- **Ubicación:** Pie del cajón de pedidos (`OrderBag.astro`), justo arriba del botón *"Enviar pedido a WhatsApp"*.
- **Estado por defecto en desarrollo:** Marcado como **Activo** (`checked`).
- **Comportamiento:**
  - **Activado (`checked`):** El pedido se envía a tu número personal de pruebas: **`+57 312 444 8768`**.
  - **Desactivado:** El pedido se envía al número comercial oficial del restaurante: **`+57 311 309 3429`**.

---

## 🧹 Guía de Eliminación para Producción

Cuando el cliente apruebe todo el flujo y se vaya a subir a producción final, solo debes remover **2 bloques pequeños** en el archivo:
[`src/components/menu/OrderBag.astro`](file:///d:/Usuarios/ACER/Documentos/88/sabrosura-del-mar/sabrosura%202/src/components/menu/OrderBag.astro)

### Paso 1: Eliminar el HTML del Switch
En `src/components/menu/OrderBag.astro`, elimina este bloque HTML (aproximadamente líneas 75 a 85):

```html
<!-- ELIMINAR ESTE BLOQUE: -->
<div class="dev-demo-switch-box" id="dev-demo-switch-box" title="Switch de desarrollo para probar pedidos con WhatsApp">
  <label class="dev-demo-switch" for="dev-demo-toggle">
    <input type="checkbox" id="dev-demo-toggle" class="dev-demo-checkbox" checked />
    <span class="dev-demo-slider" aria-hidden="true"></span>
    <span class="dev-demo-text">
      <span class="dev-demo-badge">MODO PRUEBA ACTIVO</span>
      <span class="dev-demo-desc">Enviar a mi WhatsApp (+57 312 444 8768)</span>
    </span>
  </label>
</div>
```

### Paso 2: Ajustar la función `sendWhatsAppOrder()`
En la etiqueta `<script>` de `src/components/menu/OrderBag.astro`, busca la lectura del switch:

```typescript
// BUSCAR Y REEMPLAZAR ESTAS LÍNEAS:
const demoToggle = document.getElementById('dev-demo-toggle') as HTMLInputElement | null;
const isDemo = demoToggle ? demoToggle.checked : false;
const phone = isDemo ? '573124448768' : '573113093429';

// REEMPLAZAR POR LA LÍNEA DIRECTA OFICIAL:
const phone = '573113093429';
```

### Paso 3: (Opcional) Limpieza de estilos CSS
En la sección `<style>` de `OrderBag.astro`, puedes eliminar las clases que inician con `.dev-demo-` (`.dev-demo-switch-box`, `.dev-demo-switch`, `.dev-demo-slider`, etc.), aunque al ser estilos locales acotados por Astro, no afectarán al resto del sitio si permanecen.

---

## ✅ Verificación Posterior
Una vez hechas estas dos modificaciones, ejecuta:
```bash
npm run check
npm run build
```
Ambos comandos deben terminar con **0 errores**, y los pedidos de WhatsApp irán directa y exclusivamente a la línea comercial de La Sabrosura del Mar (`+57 311 309 3429`).
