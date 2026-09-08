# 🧩 Catálogo de Componentes: Mapeo de HTML a Astro

Este documento desglosa cada bloque del HTML actual (`index.html` y `carta.html`) y muestra cómo convertirlo en componentes `.astro` modulares, limpios y fuertemente tipados con TypeScript.

---

## 1. Componentes de Layout (`src/components/layout/`)

### 1.1. `Header.astro`
Reemplaza el `<header class="site-header">` presente en ambas páginas.
```astro
---
interface Props {
  activePage?: 'inicio' | 'carta';
}
const { activePage = 'inicio' } = Astro.props;
---

<header class="site-header">
  <div class="container">
    <a class="brand" href="/" aria-label="La Sabrosura del Mar — inicio">
      <img src="/assets/logo-sm.png" alt="La Sabrosura del Mar" width="160" height="166" />
      <span class="brand__text">La Sabrosura del Mar<span>Armenia, Quindío</span></span>
    </a>

    <nav class="nav" aria-label="Navegación principal">
      <a href="/" aria-current={activePage === 'inicio' ? 'page' : undefined}>Inicio</a>
      <a href="/carta" aria-current={activePage === 'carta' ? 'page' : undefined}>Carta</a>
      <a href="/#historia">Nuestra historia</a>
      <a href="/#sedes">Sedes</a>
      <a href="/#contacto">Contacto</a>
    </nav>

    <div class="header-actions">
      <a class="btn btn--primary btn--sm" href="/carta">Ver la carta</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Abrir menú">
        <span></span>
      </button>
    </div>
  </div>
</header>
```

---

### 1.2. `Footer.astro`
Reemplaza el bloque `<footer class="site-footer">` común.
- Recibe enlaces de navegación y datos de contacto de las sedes.
- Incluye el selector `[data-year]` para el año automático.

---

### 1.3. `WhatsAppFloat.astro`
Botón flotante en esquina inferior derecha.
```astro
---
interface Props {
  phone?: string;
  message?: string;
}
const { 
  phone = "573113093429", 
  message = "Hola, quiero hacer un pedido en La Sabrosura del Mar" 
} = Astro.props;

const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
---
<a class="wa-float" href={url} target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">
  <!-- SVG WhatsApp -->
</a>
```

---

## 2. Componentes de la Landing (`src/components/home/`)

### 2.1. `DishCard.astro` (Tarjeta de Plato Destacado)
Reemplaza los bloques `<article class="dish">` y `<article class="dish dish--wide">`.

```astro
---
interface Props {
  nombre: string;
  descripcion: string;
  precio: number;
  precioAlt?: number;
  notaPrecio?: string;
  imagen?: string | null;
  alt?: string;
  wide?: boolean;
}

const { nombre, descripcion, precio, precioAlt, notaPrecio, imagen, alt = "", wide = false } = Astro.props;
const formattedPrice = "$" + precio.toLocaleString('es-CO');
const formattedPriceAlt = precioAlt ? "$" + precioAlt.toLocaleString('es-CO') : null;
---

<article class:list={["dish", { "dish--wide": wide }]}>
  {imagen ? (
    <div class="dish__media">
      <img src={imagen} alt={alt || nombre} width="800" height="533" loading="lazy" />
    </div>
  ) : (
    <div class="dish__media dish__media--placeholder">
      <div class="ph-inner">
        <!-- SVG Camera -->
        <b>{nombre}</b>
        <small>Foto pendiente</small>
      </div>
    </div>
  )}

  <div class="dish__body">
    <h3>{nombre}</h3>
    <p>{descripcion}</p>
    <div class="dish__price">
      {formattedPrice}
      {formattedPriceAlt && (
        <span style="font-family:var(--font-body);font-size:.78rem;font-weight:500;color:var(--muted)">
          {notaPrecio ? ` · ${notaPrecio} ${formattedPriceAlt}` : ` / ${formattedPriceAlt}`}
        </span>
      )}
    </div>
  </div>
</article>
```

---

### 2.2. `VenueCard.astro` (Tarjeta de Sede)
Reemplaza cada una de las dos sedes en `index.html`.

```astro
---
interface Props {
  nombre: string;
  badge: { texto: string; tipo: 'gold' | 'teal' };
  descripcion: string;
  direccion: string;
  sector?: string;
  horario: string;
  telefono: string;
  domicilios?: string;
  parqueadero?: boolean;
  mapsUrl: string;
  waMensaje: string;
}

const { nombre, badge, descripcion, direccion, sector, horario, telefono, domicilios, parqueadero, mapsUrl, waMensaje } = Astro.props;
---
<article class="venue">
  <div class="venue__head">
    <span class={`venue__badge venue__badge--${badge.tipo}`}>{badge.texto}</span>
    <h3>{nombre}</h3>
  </div>
  <div class="venue__body">
    <p>{descripcion}</p>
    <ul class="info-list">
      <!-- Ítems de dirección, horario, teléfonos y parqueadero -->
    </ul>
    {domicilios ? (
      <div><span class="pill-note">Servicio a domicilio disponible</span></div>
    ) : (
      <div><span class="pill-note pill-note--muted">Domicilios no disponibles desde esta sede</span></div>
    )}
    <div class="btn-row">
      <a class="btn btn--navy btn--sm" href={mapsUrl} target="_blank" rel="noopener">Cómo llegar</a>
      <a class="btn btn--outline btn--sm" href={`tel:+${telefono.replace(/\s+/g, '')}`}>Llamar</a>
      <a class="btn btn--outline btn--sm" href={`https://wa.me/573113093429?text=${encodeURIComponent(waMensaje)}`} target="_blank" rel="noopener">
        {domicilios ? "Pedir a domicilio" : "WhatsApp"}
      </a>
    </div>
  </div>
</article>
```

---

## 3. Componentes de la Carta Digital (`src/components/menu/`)

### 3.1. `MenuItem.astro` (Fila de Plato Individual)
Reemplaza la función `item_html(it)` de Python:

```astro
---
interface Props {
  nombre: string;
  precio?: number;
  media?: number;
  precioAlt?: number;
  notaPrecio?: string;
  precioTexto?: string;
  descripcion?: string;
  destacado?: boolean;
}

const { nombre, precio, media, precioAlt, notaPrecio, precioTexto, descripcion, destacado } = Astro.props;

const money = (n: number) => "$" + n.toLocaleString('es-CO');
---

<li class="menu-item">
  <span class="menu-item__name">
    {nombre}
    {destacado && <span class="menu-item__badge">Favorito</span>}
  </span>

  <div class="menu-item__price" style={precioTexto ? "font-size:.9rem" : undefined}>
    {precioTexto ? (
      precioTexto
    ) : precioAlt && precio ? (
      <>
        {money(precio)} / {money(precioAlt)}
        {notaPrecio && <small>{notaPrecio}</small>}
      </>
    ) : media && precio ? (
      <>
        {money(precio)}
        <small>media porción {money(media)}</small>
      </>
    ) : precio ? (
      money(precio)
    ) : null}
  </div>

  {descripcion && <p class="menu-item__desc">{descripcion}</p>}
</li>
```

---

### 3.2. `MenuFeature.astro` (Recomendado de Sección)
Reemplaza la función `feature_html(f)` de Python.
- Renderiza la tarjeta destacada con fotografía o con placeholder.

---

### 3.3. `MenuSection.astro`
Agrupa el encabezado `<h2>` de la categoría, el plato recomendado si existe, y el bucle de ítems:

```astro
---
import MenuItem from './MenuItem.astro';
import MenuFeature from './MenuFeature.astro';

interface Props {
  categoria: any;
}
const { categoria: c } = Astro.props;
---

<section class="menu-section" id={c.id}>
  <div class="menu-section__head">
    <h2>{c.nombre}</h2>
    {c.resumen && <span>{c.resumen}</span>}
  </div>

  {c.destacado && <MenuFeature feature={c.destacado} />}

  {c.subgrupos ? (
    c.subgrupos.map((sg: any) => (
      <h3 style="font-size:1.12rem;margin:1.6rem 0 .4rem;color:var(--teal-700)">{sg.nombre}</h3>
      <ul class="menu-list">
        {sg.items.map((it: any) => <MenuItem {...it} />)}
      </ul>
    ))
  ) : (
    <ul class="menu-list">
      {c.items?.map((it: any) => <MenuItem {...it} />)}
    </ul>
  )}

  {c.notaFinal && (
    <p style="margin-top:1.1rem;font-size:.87rem;color:var(--muted);font-style:italic">
      Nota: {c.notaFinal}
    </p>
  )}
</section>
```
