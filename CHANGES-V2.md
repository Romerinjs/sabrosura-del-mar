Para llevar **La Sabrosura del Mar** al siguiente nivel de robustez técnica, diseño *anti-slop* y conversión comercial, te propongo las siguientes mejoras de alto impacto que podemos implementar paso a paso:

---

### 1. 🛒 Generador de Pedidos a WhatsApp (Conversión Comercial Máxima)
> **Problema actual:** El cliente ve la carta y al hacer clic en "Pedir a domicilio", va a WhatsApp con un mensaje vacío: *"Hola, quiero hacer un pedido"*.  
> **Solución:**
- Añadir un botón `+` discreto y táctil en cada plato de la carta.
- Una **bolsa flotante de pedido** en la esquina inferior que calcula el total en COP en tiempo real. Pero sin precio. El precio en la carta y en la función web si, pero para convertir ese pedido en un mensaje de whatsapp si que no tenga precio, solo la cantidad de cada plato. ya el usuario que atiende por whatsapp se encargará de pasar el precio y factura.

- Al pulsar *"Pedir por WhatsApp"*, genera automáticamente el mensaje desglosado:
  ```text
  ¡Hola! Quiero hacer el siguiente pedido en La Sabrosura del Mar:
  • 2x Cazuela de mariscos 
  • 1x Limonada de coco
  Sede / Domicilio para: [Nombre / Dirección]
  ```
- *Tecnología:* Vanilla JS / Web Component nativo, sin React, sin librerías pesadas, 0 KB de sobrecarga. 

---

### 2. 📸 Fotografías Reales para los Platos con "Foto Pendiente"
> **Regla de la skill `design-taste-frontend`:** *"Landing pages live on visual appetite. Priority order: Use image-generation tool first to avoid placeholders."*  
> **Acción:**
- Actualmente hay 7 platos estrella con el recuadro *"Foto pendiente"* (Cazuela de mariscos, Ceviche de camarón, Bandeja caribeña, Chuleta de pescado, Trucha a la plancha, Viudo de pescado, Pasta a la marinera).
- Podemos utilizar la herramienta de generación de imágenes para crear fotografías gastronómicas de alta resolución, con iluminación natural y presentación auténtica de comida de mar colombiana, eliminando los placeholders.

---

### 3. ⚡ Transiciones de Página Suaves (`ClientRouter` de Astro)
> **Sensación de App Nativa:**
- Integrar el módulo `ClientRouter` nativo de Astro 5.
- La navegación entre `/` (Inicio) y `/carta` se realiza de forma instantánea sin parpadeos de pantalla blanca, manteniendo el encabezado y el estado visual con animaciones de fundido suaves respetando `prefers-reduced-motion`.

---

### 4. 🕒 Widget en Vivo de Estado del Restaurante ("Abierto Ahora" / "Cerrado")
> **Experiencia de usuario móvil:**
- Un indicador dinámico con punto pulsante en el Header y en las tarjetas de sede:
  - De 11:00 a. m. a 5:00 p. m. (hora Colombia UTC-5): `Abierto hoy hasta las 5:00 p. m.`
  - Fuera de ese horario: `Cerrado · Abre hoy/mañana a las 11:00 a. m.`
- Reduce llamadas innecesarias fuera de horario y da confianza inmediata al comensal.

---

### 5. 🚀 Optimización de Imágenes con `astro:assets` (`<Image />`)
> **Core Web Vitals y LCP:**
- Migrar las imágenes a la etiqueta `<Image />` de Astro:
  - Generación automática de formatos modernos **AVIF y WebP**.
  - Cálculo automático de dimensiones intrínsecas para **cero saltos de diseño (CLS = 0)**.
  - Compresión y redimensionado responsivo para móviles.

---

### 6. 🗺️ Automatización de SEO con `@astrojs/sitemap`
- Integrar la extensión oficial de Astro para que cada compilación (`npm run build`) regenere automáticamente el `sitemap.xml` con fechas de modificación reales (`lastmod`) y cabeceras canónicas.

---
