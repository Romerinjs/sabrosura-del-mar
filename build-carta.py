# -*- coding: utf-8 -*-
import json, html, io

data = json.load(open('assets/menu.json', encoding='utf-8'))
cats = data['categorias']

def money(n):
    return "$" + f"{n:,}".replace(",", ".")

def item_html(it):
    name = html.escape(it['nombre'])
    badge = ' <span class="menu-item__badge">Favorito</span>' if it.get('destacado') else ''
    # precio
    if it.get('precioTexto'):
        price = f'<div class="menu-item__price" style="font-size:.9rem">{html.escape(it["precioTexto"])}</div>'
    elif it.get('precioAlt'):
        price = (f'<div class="menu-item__price">{money(it["precio"])} / {money(it["precioAlt"])}'
                 f'<small>{html.escape(it.get("notaPrecio",""))}</small></div>')
    elif it.get('media'):
        price = (f'<div class="menu-item__price">{money(it["precio"])}'
                 f'<small>media porción {money(it["media"])}</small></div>')
    else:
        price = f'<div class="menu-item__price">{money(it["precio"])}</div>'
    desc = f'\n            <p class="menu-item__desc">{html.escape(it["descripcion"])}</p>' if it.get('descripcion') else ''
    return (f'          <li class="menu-item">\n'
            f'            <span class="menu-item__name">{name}{badge}</span>\n'
            f'            {price}{desc}\n'
            f'          </li>')

def feature_html(f):
    if f.get('imagen'):
        img = f'<img src="{f["imagen"]}" alt="{html.escape(f.get("alt",""))}" width="480" height="320" loading="lazy">'
    else:
        img = ('<div class="dish__media dish__media--placeholder" style="min-height:180px;position:relative">'
               '<div class="ph-inner"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" '
               'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z"/>'
               '<circle cx="12" cy="13" r="4"/></svg><small>Foto pendiente</small></div></div>')
    nota = f' <span style="font-family:var(--font-body);font-size:.8rem;font-weight:500;color:var(--muted)">{html.escape(f["precioNota"])}</span>' if f.get('precioNota') else ''
    return f'''        <div class="menu-feature">
          {img}
          <div class="menu-feature__body">
            <span class="eyebrow" style="margin-bottom:.5rem">Recomendado de la casa</span>
            <h3>{html.escape(f["nombre"])}</h3>
            <p>{html.escape(f["descripcion"])}</p>
            <div class="menu-feature__price">{money(f["precio"])}{nota}</div>
          </div>
        </div>'''

# --- barra de navegación ---
nav = "\n".join(
    f'          <a href="#{c["id"]}">{html.escape(c["nombre"])}</a>' for c in cats
)

# --- secciones ---
secs = []
for c in cats:
    body = []
    if c.get('destacado'):
        body.append(feature_html(c['destacado']))
    if c.get('subgrupos'):
        for sg in c['subgrupos']:
            body.append(f'        <h3 style="font-size:1.12rem;margin:1.6rem 0 .4rem;color:var(--teal-700)">{html.escape(sg["nombre"])}</h3>')
            body.append('        <ul class="menu-list">')
            body += [item_html(i) for i in sg['items']]
            body.append('        </ul>')
    else:
        body.append('        <ul class="menu-list">')
        body += [item_html(i) for i in c['items']]
        body.append('        </ul>')
    if c.get('notaFinal'):
        body.append(f'        <p style="margin-top:1.1rem;font-size:.87rem;color:var(--muted);font-style:italic">Nota: {html.escape(c["notaFinal"])}</p>')

    secs.append(f'''      <section class="menu-section" id="{c["id"]}">
        <div class="menu-section__head">
          <h2>{html.escape(c["nombre"])}</h2>
          <span>{html.escape(c.get("resumen",""))}</span>
        </div>
{chr(10).join(body)}
      </section>''')

sections = "\n\n".join(secs)

HEAD = '''<!DOCTYPE html>
<html lang="es-CO">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Carta digital | La Sabrosura del Mar — Armenia, Quindío</title>
<meta name="description" content="Carta digital de La Sabrosura del Mar en Armenia: arroces marineros, cazuelas, ceviches, pescados, salmón, camarones, langostinos, pastas, especialidades y bebidas. Precios en pesos colombianos.">
<meta name="theme-color" content="#0a2540">
<link rel="canonical" href="https://lasabrosuradelmar.com/carta.html">

<meta property="og:type" content="website">
<meta property="og:locale" content="es_CO">
<meta property="og:site_name" content="La Sabrosura del Mar">
<meta property="og:title" content="Carta digital | La Sabrosura del Mar">
<meta property="og:description" content="Arroces, cazuelas, ceviches, pescados, camarones y langostinos preparados con ingredientes de calidad y porciones generosas.">
<meta property="og:image" content="https://lasabrosuradelmar.com/assets/camarones-apanados.jpg">
<meta property="og:url" content="https://lasabrosuradelmar.com/carta.html">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="assets/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="assets/favicon.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/styles.css">
</head>
<body>

<a class="skip-link" href="#carta">Saltar a la carta</a>

<header class="site-header">
  <div class="container">
    <a class="brand" href="index.html" aria-label="La Sabrosura del Mar — inicio">
      <img src="assets/logo-sm.png" alt="La Sabrosura del Mar" width="160" height="166">
      <span class="brand__text">La Sabrosura del Mar<span>Armenia, Quind&iacute;o</span></span>
    </a>

    <nav class="nav" aria-label="Navegaci&oacute;n principal">
      <a href="index.html">Inicio</a>
      <a href="carta.html" aria-current="page">Carta</a>
      <a href="index.html#historia">Nuestra historia</a>
      <a href="index.html#sedes">Sedes</a>
      <a href="index.html#contacto">Contacto</a>
    </nav>

    <div class="header-actions">
      <a class="btn btn--primary btn--sm" href="https://wa.me/573113093429?text=Hola%2C%20quiero%20hacer%20un%20pedido" target="_blank" rel="noopener">Pedir a domicilio</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Abrir men&uacute;">
        <span></span>
      </button>
    </div>
  </div>
</header>

<div class="mobile-nav" id="mobile-nav">
  <a href="index.html">Inicio</a>
  <a href="carta.html">Carta</a>
  <a href="index.html#historia">Nuestra historia</a>
  <a href="index.html#sedes">Sedes</a>
  <a href="index.html#contacto">Contacto</a>
  <a class="btn btn--primary btn--block" href="https://wa.me/573113093429?text=Hola%2C%20quiero%20hacer%20un%20pedido" target="_blank" rel="noopener">Pedir a domicilio</a>
</div>

<main>

<section class="page-hero">
  <div class="container">
    <span class="eyebrow">Carta digital</span>
    <h1>Nuestra carta</h1>
    <p>Arroces, cazuelas, ceviches, pescados, camarones, langostinos y especialidades preparadas con ingredientes de calidad, porciones generosas y aut&eacute;ntico sabor coste&ntilde;o.</p>
    <p style="font-size:.88rem;color:rgba(255,255,255,.62);margin-top:.6rem">Los precios se expresan en pesos colombianos (COP).</p>
  </div>
</section>

<nav class="menu-nav" aria-label="Categor&iacute;as de la carta">
  <div class="container">
    <div class="menu-nav__inner">
      <div class="menu-nav__scroll">
__NAV__
      </div>
      <div class="menu-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <label class="skip-link" for="menu-search">Buscar en la carta</label>
        <input type="search" id="menu-search" placeholder="Buscar un plato&hellip;" autocomplete="off">
      </div>
    </div>
  </div>
</nav>

<div class="container" id="carta">
__SECTIONS__

      <p class="menu-empty">No encontramos platos con ese nombre. Prueba con &laquo;ceviche&raquo;, &laquo;arroz&raquo; o &laquo;camarones&raquo;.</p>

      <div class="menu-legal">
        <p><strong>Los productos y precios pueden variar seg&uacute;n disponibilidad o temporada.</strong></p>
        <p>Carta actualizada en septiembre de 2026. Atendemos todos los d&iacute;as, incluidos domingos y festivos, de 11:00&nbsp;a.&nbsp;m. a 5:00&nbsp;p.&nbsp;m. No manejamos reservas.</p>
      </div>
  </div>

<section class="cta-band" style="margin-top:3rem">
  <div class="cta-band__media">
    <img src="assets/mojarra-frita.jpg" alt="" role="presentation" width="1400" height="933" loading="lazy">
  </div>
  <div class="container">
    <span class="eyebrow" style="color:var(--gold-300)">&iquest;Se te antoj&oacute;?</span>
    <h2>Te esperamos en Armenia</h2>
    <p>Pide a domicilio desde la sede Centro o vis&iacute;tanos en cualquiera de nuestras dos sedes.</p>
    <div class="btn-row btn-row--center">
      <a class="btn btn--primary" href="https://wa.me/573113093429?text=Hola%2C%20quiero%20hacer%20un%20pedido" target="_blank" rel="noopener">Pedir por WhatsApp</a>
      <a class="btn btn--ghost-light" href="index.html#sedes">Ver las sedes</a>
    </div>
  </div>
</section>

</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <img class="footer-logo" src="assets/logo-sm.png" alt="La Sabrosura del Mar" width="168" height="174" loading="lazy">
        <p>La frescura del mar, el sabor de la Costa y la calidez de Armenia. Vis&iacute;tanos y descubre por qu&eacute; cada vez m&aacute;s personas eligen La Sabrosura del Mar.</p>
        <div class="social-row">
          <a href="https://www.instagram.com/lasabrosuradelmar" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://www.tiktok.com/@lasabrosuradelmar" target="_blank" rel="noopener" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 2h-3v13.2a2.6 2.6 0 1 1-2-2.53V9.6a5.7 5.7 0 1 0 5 5.66V8.9a6.4 6.4 0 0 0 3.7 1.17V7.03A3.6 3.6 0 0 1 16.5 3.4Z"/></svg>
          </a>
          <a href="https://www.facebook.com/lasabrosuradelmar" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9V7.2c0-.8.2-1.2 1.4-1.2H17V3h-2.6C11.5 3 10.5 4.5 10.5 7v2H8.5v3h2V21h3.5v-9h2.5l.4-3H14Z"/></svg>
          </a>
        </div>
      </div>

      <div>
        <h4>Navegaci&oacute;n</h4>
        <ul>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="carta.html">Carta digital</a></li>
          <li><a href="index.html#historia">Nuestra historia</a></li>
          <li><a href="index.html#sedes">Sedes</a></li>
          <li><a href="index.html#contacto">Contacto</a></li>
        </ul>
      </div>

      <div>
        <h4>Nuestras sedes</h4>
        <address>
          <strong style="color:#fff">Sede Centro</strong><br>
          Cra. 13 #21-32, Armenia<br>
          <a href="tel:+573113093429">311 309 3429</a><br><br>
          <strong style="color:#fff">Sede Norte</strong><br>
          Cra. 19 #15 Norte-40<br>
          Sector Proviteq, Armenia<br>
          <a href="tel:+573113093429">311 309 3429</a><br><br>
          Todos los d&iacute;as &middot; 11:00 a.&nbsp;m. &ndash; 5:00 p.&nbsp;m.
        </address>
      </div>
    </div>

    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> La Sabrosura del Mar. Todos los derechos reservados.</span>
      <span>Desarrollado por <a href="https://77studio.co" target="_blank" rel="noopener">77 Studio</a></span>
    </div>
  </div>
</footer>

<a class="wa-float" href="https://wa.me/573113093429?text=Hola%2C%20quiero%20hacer%20un%20pedido%20en%20La%20Sabrosura%20del%20Mar" target="_blank" rel="noopener" aria-label="Escr&iacute;benos por WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.85c0 1.9.5 3.7 1.45 5.3L2 22l4.98-1.6a9.8 9.8 0 0 0 5.06 1.4h.01c5.44 0 9.85-4.4 9.85-9.85C21.9 6.4 17.5 2 12.04 2Zm5.77 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-.95.24-3.2-.67-2.7-1.06-4.4-3.8-4.53-3.98-.13-.18-1.08-1.43-1.08-2.73 0-1.3.68-1.94.92-2.2.24-.27.53-.33.7-.33h.5c.16 0 .38-.06.6.46.23.55.78 1.9.85 2.03.07.14.11.3.02.48-.09.18-.14.29-.27.45-.14.16-.29.35-.41.47-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.6-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.65-.17 1.32Z"/></svg>
</a>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Menu",
  "name": "Carta de La Sabrosura del Mar",
  "inLanguage": "es-CO",
  "url": "https://lasabrosuradelmar.com/carta.html",
  "hasMenuSection": __MENUJSONLD__
}
</script>

<script src="assets/script.js" defer></script>
</body>
</html>
'''

# JSON-LD de secciones
def flat_items(c):
    out = []
    src = []
    if c.get('subgrupos'):
        for sg in c['subgrupos']: src += sg['items']
    else:
        src = c['items']
    for i in src:
        entry = {"@type": "MenuItem", "name": i['nombre']}
        if i.get('precio'):
            entry["offers"] = {"@type": "Offer", "price": str(i['precio']), "priceCurrency": "COP"}
        out.append(entry)
    return out

ld = [{"@type": "MenuSection", "name": c['nombre'], "hasMenuItem": flat_items(c)} for c in cats]

out = (HEAD.replace('__NAV__', nav)
           .replace('__SECTIONS__', sections)
           .replace('__MENUJSONLD__', json.dumps(ld, ensure_ascii=False, indent=2)))

open('carta.html', 'w', encoding='utf-8').write(out)
print('carta.html generado —', len(out), 'bytes')

total = sum(len(flat_items(c)) for c in cats)
print('categorías:', len(cats), '| platos:', total)
