/* ============================================================
   OCHO ARMAS — Main JavaScript (Template)
   main.template.js
   ============================================================
   ⚠️  NO EDITAR main.js directamente.
       Editar este archivo (main.template.js) o products.json,
       luego ejecutar: python build.py

   Sections:
   01. Data        — Inyectado por build.py desde products.json
   02. Helpers     — Utilidades compartidas
   03. Navigation  — SPA routing entre páginas
   04. Product     — Render de vista detalle
   05. Catalog     — Render y filtros del catálogo
   06. Reveal      — Animaciones scroll-triggered
   ============================================================ */

/* ── 01. DATA — inyectado por build.py ── */
/* Auto-generado por build.py — 2026-03-08 00:20:19 */
const PRODUCTS = [
  {
    "id": 0,
    "slug": "chillattai-rojo",
    "active": true,
    "name": "Chillattai Rojo",
    "subtitle": "Satin Premium · Bordado Artesanal",
    "tag": "Bordado Destacado",
    "badge": "Destacado",
    "badge_class": "",
    "price": 29990,
    "stock": 8,
    "tags": [
      "bordado",
      "destacado"
    ],
    "images": {
      "placeholder_bg": "linear-gradient(145deg,#1a0a0a,#0d0505)",
      "icon_fill": "#c0272d",
      "icon_top": "#8a0000",
      "icon_stroke": "#ff6666",
      "files": [
        "images/products/chillattai-rojo-frente.jpg",
        "images/products/chillattai-rojo-lado.jpg",
        "images/products/chillattai-rojo-detalle.jpg",
        "images/products/chillattai-rojo-espalda.jpg"
      ]
    },
    "colors": [
      "#c0272d",
      "#8a0000",
      "#ff4444"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "material": "Satin Premium de alta densidad",
    "description": "Short de Muay Thai confeccionado en Satin Premium de alta densidad. Diseño bordado artesanalmente con inspiración en la cultura Chillattai. Corte amplio en caderas para máxima movilidad en patadas y clínch.",
    "meta": "Bordado · Satin Premium · S–XL",
    "wa_text": "Me%20interesa%20el%20short%20Chillattai%20Rojo"
  },
  {
    "id": 1,
    "slug": "muay-thai-azul",
    "active": true,
    "name": "มวยไทย Azul",
    "subtitle": "Satin · Bordado Thai",
    "tag": "Colección Clásica",
    "badge": "",
    "badge_class": "",
    "price": 24990,
    "stock": 12,
    "tags": [
      "bordado"
    ],
    "images": {
      "placeholder_bg": "linear-gradient(145deg,#0a0a1a,#060610)",
      "icon_fill": "#1a1a3a",
      "icon_top": "#0a0a22",
      "icon_stroke": "#4444aa",
      "files": [
        "images/products/muay-thai-azul-frente.jpg",
        "images/products/muay-thai-azul-lado.jpg",
        "images/products/muay-thai-azul-detalle.jpg",
        "images/products/muay-thai-azul-espalda.jpg"
      ]
    },
    "colors": [
      "#1a1a8a",
      "#4444aa",
      "#2222cc"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "material": "Satin estándar, resistente",
    "description": "Short inspirado en la tradición Muay Thai tailandesa. Letras thai bordadas en hilo plateado sobre satin azul profundo. Un clásico que nunca pasa de moda.",
    "meta": "Bordado · Satin · S–XL",
    "wa_text": "Me%20interesa%20el%20short%20Muay%20Thai%20Azul"
  },
  {
    "id": 2,
    "slug": "leopardo-morado",
    "active": true,
    "name": "Leopardo Morado",
    "subtitle": "Satin · Bordado Exclusivo",
    "tag": "Popular · Edición Limitada",
    "badge": "Popular",
    "badge_class": "",
    "price": 27990,
    "stock": 3,
    "tags": [
      "bordado",
      "destacado"
    ],
    "images": {
      "placeholder_bg": "linear-gradient(145deg,#1a0d1a,#100810)",
      "icon_fill": "#5a1a7a",
      "icon_top": "#3a0a5a",
      "icon_stroke": "#cc66ff",
      "files": [
        "images/products/leopardo-morado-frente.jpg",
        "images/products/leopardo-morado-lado.jpg",
        "images/products/leopardo-morado-detalle.jpg",
        "images/products/leopardo-morado-espalda.jpg"
      ]
    },
    "colors": [
      "#5a1a7a",
      "#8833aa",
      "#cc66ff"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "material": "Satin Premium, corte exclusivo",
    "description": "Diseño atrevido con estampado de leopardo bordado en tonos morado y lila. Uno de los modelos más solicitados de Ocho Armas. Disponible en cantidades limitadas.",
    "meta": "Bordado · Satin · S–XL",
    "wa_text": "Me%20interesa%20el%20short%20Leopardo%20Morado"
  },
  {
    "id": 3,
    "slug": "ocho-armas-negro",
    "active": true,
    "name": "Ocho Armas Negro",
    "subtitle": "Satin · Bordado Dorado",
    "tag": "Colección Signature",
    "badge": "",
    "badge_class": "",
    "price": 32990,
    "stock": 6,
    "tags": [
      "bordado"
    ],
    "images": {
      "placeholder_bg": "linear-gradient(145deg,#0a0a0a,#141414)",
      "icon_fill": "#1a1a1a",
      "icon_top": "#0a0a0a",
      "icon_stroke": "#f0c519",
      "files": [
        "images/products/ocho-armas-negro-frente.jpg",
        "images/products/ocho-armas-negro-lado.jpg",
        "images/products/ocho-armas-negro-detalle.jpg",
        "images/products/ocho-armas-negro-espalda.jpg"
      ]
    },
    "colors": [
      "#111111",
      "#222222",
      "#f0c519"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "material": "Satin Premium negro, hilo dorado",
    "description": "El short que define la identidad de Ocho Armas. Negro profundo con el logo bordado en hilo dorado. Elegancia y poder en el ring.",
    "meta": "Bordado Dorado · Satin · S–XL",
    "wa_text": "Me%20interesa%20el%20short%20Ocho%20Armas%20Negro"
  },
  {
    "id": 4,
    "slug": "vendetta",
    "active": true,
    "name": "Vendetta",
    "subtitle": "Custom · Diseño Personalizado",
    "tag": "Modelo Custom",
    "badge": "Custom",
    "badge_class": "custom",
    "price": 39990,
    "stock": 0,
    "tags": [
      "custom"
    ],
    "images": {
      "placeholder_bg": "linear-gradient(145deg,#1a1008,#100c04)",
      "icon_fill": "#cc3300",
      "icon_top": "#881100",
      "icon_stroke": "#ffaa44",
      "files": [
        "images/products/vendetta-frente.jpg",
        "images/products/vendetta-lado.jpg",
        "images/products/vendetta-detalle.jpg",
        "images/products/vendetta-espalda.jpg"
      ]
    },
    "colors": [
      "#cc3300",
      "#881100",
      "#ffaa44"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "material": "Satin premium, personalizado",
    "description": "Short personalizado con diseño Vendetta único. Rojo fuego con detalles en naranja, bordado artesanal premium. Cada unidad es irrepetible.",
    "meta": "Personalizado · Bordado · S–XL",
    "wa_text": "Me%20interesa%20el%20short%20Vendetta"
  },
  {
    "id": 5,
    "slug": "chelo-verde",
    "active": true,
    "name": "Chelo Verde",
    "subtitle": "Custom · Bordado Premium",
    "tag": "Modelo Custom",
    "badge": "Custom",
    "badge_class": "custom",
    "price": 37990,
    "stock": 2,
    "tags": [
      "custom"
    ],
    "images": {
      "placeholder_bg": "linear-gradient(145deg,#101a10,#080e08)",
      "icon_fill": "#1a5a1a",
      "icon_top": "#0a3a0a",
      "icon_stroke": "#88ee88",
      "files": [
        "images/products/chelo-verde-frente.jpg",
        "images/products/chelo-verde-lado.jpg",
        "images/products/chelo-verde-detalle.jpg",
        "images/products/chelo-verde-espalda.jpg"
      ]
    },
    "colors": [
      "#1a5a1a",
      "#2a8a2a",
      "#88ee88"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "material": "Satin premium, bordado artesanal",
    "description": "Verde selva con bordado artesanal premium. Diseño exclusivo pensado para destacar en el gym y en el ring. Personalizable con tu nombre o el de tu academia.",
    "meta": "Personalizado · Bordado · S–XL",
    "wa_text": "Me%20interesa%20el%20short%20Chelo%20Verde"
  }
];
const SITE_META = {"currency": "CLP", "whatsapp": "56900000000", "instagram": "ochoarmas", "last_updated": "2026-03-08"};


/* ── 02. HELPERS ── */

/**
 * Formatea precio CLP con separadores de miles.
 * Ej: 29990 → "$29.990"
 */
function formatPrice(price, currency) {
  currency = currency || (SITE_META && SITE_META.currency) || 'CLP';
  if (currency === 'CLP') {
    return '$' + Number(price).toLocaleString('es-CL');
  }
  return String(price);
}

/**
 * Retorna badge HTML o string vacío.
 */
function badgeHTML(badge, badgeClass) {
  if (!badge) return '';
  return `<span class="product-badge ${badgeClass || ''}">${badge}</span>`;
}

/**
 * Construye el SVG placeholder de un producto.
 * Usa images.icon_fill/top/stroke del JSON.
 */
function makeIcon(p, size, className) {
  size = size || 80;
  className = className || '';
  var imgs = p.images || {};
  var fill   = imgs.icon_fill   || '#444';
  var top    = imgs.icon_top    || '#222';
  var stroke = imgs.icon_stroke || '#888';
  var s = size;
  return '<svg class="' + className + '" viewBox="0 0 ' + s + ' ' + s + '" fill="none">'
    + '<rect x="' + (s*0.125) + '" y="' + (s*0.25) + '" width="' + (s*0.75) + '" height="' + (s*0.625) + '" rx="4" fill="' + fill + '" opacity=".6"/>'
    + '<rect x="' + (s*0.125) + '" y="' + (s*0.25) + '" width="' + (s*0.75) + '" height="' + (s*0.175) + '" rx="4" fill="' + top + '" opacity=".8"/>'
    + '<line x1="' + (s*0.5) + '" y1="' + (s*0.425) + '" x2="' + (s*0.5) + '" y2="' + (s*0.875) + '" stroke="' + stroke + '" stroke-width="2" opacity=".5"/>'
    + '</svg>';
}

/**
 * Renderiza la imagen de un producto.
 * Si hay archivos reales los usa; si no, muestra el placeholder SVG.
 */
function renderProductImage(p, className) {
  className = className || 'prod-placeholder';
  var imgs  = p.images || {};
  var files = imgs.files || [];
  var bg    = imgs.placeholder_bg || 'linear-gradient(145deg,#1a1a1a,#111)';

  // Si existe la primera imagen real, usarla
  if (files.length > 0) {
    return '<div class="prod-img-inner" style="background:' + bg + ';background-image:url(\'' + files[0] + '\');background-size:cover;background-position:center;width:100%;height:100%;"></div>';
  }

  // Fallback: placeholder con SVG
  return '<div class="' + className + '" style="background:' + bg + ';">'
    + makeIcon(p, 64, 'shorts-icon')
    + '<span>Foto producto</span>'
    + '</div>';
}

/**
 * Genera el bloque WA icon SVG (inline para evitar repetición).
 */
var WA_ICON = '<svg class="icon-wa" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

/**
 * Construye la URL de WhatsApp para un producto.
 */
function waUrl(p) {
  var phone = (SITE_META && SITE_META.whatsapp) || '56900000000';
  return 'https://wa.me/' + phone + '?text=' + (p.wa_text || encodeURIComponent('Me interesa el short ' + p.name));
}

/**
 * Genera una card de producto (usada en home, catálogo y relacionados).
 * @param {object}  p           - objeto producto
 * @param {boolean} featured    - si ocupa 2 filas (home grid)
 * @param {string}  detailCall  - función JS a llamar al click en "Ver detalle"
 */
function renderCard(p, featured, detailCall) {
  var featClass = featured ? ' featured' : '';
  var tags      = Array.isArray(p.tags) ? p.tags.join(' ') : (p.tags || '');
  var stockBadge = '';
  if (p.stock === 0) {
    stockBadge = '<span class="product-badge" style="background:#333;color:#888;border:1px solid #444;top:44px;">Agotado</span>';
  } else if (p.stock <= 2 && p.stock > 0) {
    stockBadge = '<span class="product-badge" style="background:transparent;border:1px solid var(--red);color:var(--red);top:44px;">\u00daLTIMAS ' + p.stock + '</span>';
  }

  return '<div class="product-card' + featClass + ' reveal" data-tags="' + tags + '">'
    + '<div class="product-img-wrap">'
    + renderProductImage(p)
    + '</div>'
    + '<div class="product-overlay">'
    + '<a href="' + waUrl(p) + '" class="overlay-btn" target="_blank">' + WA_ICON + ' Consultar precio</a>'
    + '<button class="overlay-detail-btn" onclick="' + (detailCall || 'showProduct(' + p.id + ')') + '">Ver detalle \u2192</button>'
    + '</div>'
    + badgeHTML(p.badge, p.badge_class)
    + stockBadge
    + '<div class="product-info">'
    + '<div class="product-name">' + p.name + '</div>'
    + '<div class="product-meta">' + p.meta + '</div>'
    + '</div>'
    + '</div>';
}


/* ── 03. NAVIGATION ── */

function showPage(page) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  document.getElementById('page-' + page).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'home') setTimeout(initReveal, 100);
}


/* ── 04. PRODUCT DETAIL ── */

function showProduct(idx) {
  var p    = PRODUCTS[idx];
  var imgs = p.images || {};
  var files = imgs.files || [];

  // Breadcrumb
  document.getElementById('detail-breadcrumb-name').textContent = p.name;

  // Fondo galería
  document.getElementById('detail-bg').style.cssText =
    'background:' + (imgs.placeholder_bg || '#111') + ';position:absolute;inset:0;';

  // Badge en galería
  document.getElementById('detail-gallery-badge').innerHTML =
    badgeHTML(p.badge, p.badge_class);

  // Imagen principal
  var mainImgWrap = document.querySelector('.detail-main-img');
  var placeholder  = document.getElementById('detail-main-placeholder');
  var bigIconEl    = document.getElementById('detail-big-icon');

  // Garantizar que .detail-main-img tenga posición relativa
  mainImgWrap.style.position = 'relative';

  // Obtener o crear el <img> con estilos críticos inline garantizados
  var realImg = document.getElementById('detail-real-img');
  if (!realImg) {
    realImg = document.createElement('img');
    realImg.id = 'detail-real-img';
    mainImgWrap.appendChild(realImg);
  }
  // Estilos inline como garantía (el CSS también los define, doble seguro)
  realImg.style.cssText = [
    'display:block',
    'position:absolute',
    'top:0', 'left:0',
    'width:100%', 'height:100%',
    'object-fit:cover',
    'object-position:center top',
    'opacity:1',
    'transition:opacity .25s ease'
  ].join(';');

  if (files.length > 0) {
    realImg.src   = files[0];
    realImg.alt   = p.name;
    realImg.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
  } else {
    realImg.style.display = 'none';
    if (placeholder) placeholder.style.display = '';
    if (bigIconEl) {
      bigIconEl.innerHTML =
        '<rect x="10" y="20" width="60" height="50" rx="4" fill="' + (imgs.icon_fill||'#444') + '" opacity=".5"/>'
        + '<rect x="10" y="20" width="60" height="14" rx="4" fill="' + (imgs.icon_top||'#222') + '" opacity=".8"/>'
        + '<line x1="40" y1="34" x2="40" y2="70" stroke="' + (imgs.icon_stroke||'#888') + '" stroke-width="2" opacity=".5"/>';
    }
  }

  // Miniaturas
  var labels = ['Frente', 'Lado', 'Detalle', 'Espalda'];
  var thumbCount = files.length > 0 ? Math.min(files.length, 4) : 4;
  document.getElementById('detail-thumbs').innerHTML = labels.slice(0, thumbCount).map(function(v, i) {
    var src = files[i] || '';
    var inner = src
      ? '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover;" alt="' + v + '">'
      : '<svg viewBox="0 0 80 80" fill="none"><rect x="10" y="20" width="60" height="50" rx="4" fill="' + (imgs.icon_fill||'#444') + '" opacity=".5"/><rect x="10" y="20" width="60" height="14" rx="4" fill="' + (imgs.icon_top||'#222') + '" opacity=".8"/></svg>';
    return '<div class="detail-thumb ' + (i === 0 ? 'active' : '') + '" onclick="selectThumb(this, ' + i + ', ' + idx + ')">' + inner + '</div>';
  }).join('');

  // Información
  document.getElementById('detail-tag').textContent      = p.tag || '';
  document.getElementById('detail-title').textContent    = p.name;
  document.getElementById('detail-subtitle').textContent = p.subtitle || '';
  document.getElementById('detail-desc').textContent     = p.description || '';
  document.getElementById('detail-feat-material').textContent = p.material || '';

  // Precio
  var priceEl = document.querySelector('.detail-price-val');
  if (priceEl) {
    priceEl.textContent = p.price ? formatPrice(p.price) : 'Consultar';
  }

  // Stock
  var stockNote = document.querySelector('.detail-price-note');
  if (stockNote) {
    if (p.stock === 0) {
      stockNote.innerHTML = '<span style="color:var(--red)">Agotado</span>';
    } else if (p.stock <= 2) {
      stockNote.innerHTML = '<span style="color:var(--yellow)">\u00daltimas ' + p.stock + ' unidades</span>';
    } else {
      stockNote.textContent = 'Disponible · Vía WhatsApp';
    }
  }

  // Tallas
  var sizeSel = document.querySelector('.size-selector');
  if (sizeSel && Array.isArray(p.sizes)) {
    sizeSel.innerHTML = p.sizes.map(function(sz, i) {
      return '<button class="size-opt ' + (i === 0 ? 'active' : '') + '" onclick="selectSize(this)">' + sz + '</button>';
    }).join('');
  }

  // Colores
  document.getElementById('detail-colors').innerHTML = (p.colors || []).map(function(c, i) {
    return '<div class="color-opt ' + (i === 0 ? 'active' : '') + '" style="background:' + c + '" onclick="selectColor(this)" title="' + c + '"></div>';
  }).join('');

  // Botón WhatsApp
  document.getElementById('detail-wa-btn').href = waUrl(p);

  // Productos relacionados
  var related = PRODUCTS.filter(function(r) { return r.id !== idx && r.active !== false; }).slice(0, 3);
  document.getElementById('related-grid').innerHTML = related.map(function(r) {
    return '<div class="product-card" style="cursor:pointer" onclick="showProduct(' + r.id + ')">'
      + '<div class="product-img-wrap">' + renderProductImage(r) + '</div>'
      + '<div class="product-overlay">'
      + '<button class="overlay-btn" onclick="event.stopPropagation();window.open(\'' + waUrl(r) + '\',\'_blank\')">' + WA_ICON + ' Ver en WhatsApp</button>'
      + '</div>'
      + badgeHTML(r.badge, r.badge_class)
      + '<div class="product-info">'
      + '<div class="product-name">' + r.name + '</div>'
      + '<div class="product-meta">' + r.meta + '</div>'
      + '</div>'
      + '</div>';
  }).join('');

  showPage('product');
}

function selectThumb(el, imgIdx, productIdx) {
  document.querySelectorAll('.detail-thumb').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');

  var p = PRODUCTS[productIdx];
  if (!p) return;
  var files = (p.images || {}).files || [];
  var realImg = document.getElementById('detail-real-img');

  if (files.length > imgIdx && realImg) {
    realImg.style.opacity = '0';
    realImg.style.transition = 'opacity .25s ease';
    realImg.src = files[imgIdx];
    realImg.onload = function() {
      realImg.style.opacity = '1';
    };
  }
}

function selectSize(el) {
  document.querySelectorAll('.size-opt').forEach(function(s) { s.classList.remove('active'); });
  el.classList.add('active');
}

function selectColor(el) {
  document.querySelectorAll('.color-opt').forEach(function(c) { c.classList.remove('active'); });
  el.classList.add('active');
}


/* ── 05. CATALOG ── */

/**
 * Renderiza el grid completo del catálogo desde PRODUCTS.
 * Se llama una vez al inicializar la página.
 */
function renderCatalog() {
  var grid = document.getElementById('catalog-grid');
  if (!grid) return;

  var active = PRODUCTS.filter(function(p) { return p.active !== false; });
  grid.innerHTML = active.map(function(p) {
    return renderCard(p, false);
  }).join('');

  updateCatalogCount(active.length);

  // Re-iniciar observers de reveal para las nuevas cards
  setTimeout(initReveal, 50);
}

function updateCatalogCount(n) {
  var el = document.getElementById('catalog-count');
  if (el) el.textContent = n + ' modelo' + (n !== 1 ? 's' : '') + ' disponible' + (n !== 1 ? 's' : '');
}

function filterCatalog(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');

  var cards = document.querySelectorAll('#catalog-grid .product-card');
  var visible = 0;
  cards.forEach(function(card) {
    var tags = (card.dataset.tags || '').split(' ');
    var show = tag === 'todos' || tags.indexOf(tag) !== -1;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  updateCatalogCount(visible);
}

/**
 * Renderiza el preview de productos en Home (primeros 6, primero featured).
 */
function renderHomeProducts() {
  var grid = document.getElementById('home-products-grid');
  if (!grid) return;

  var active = PRODUCTS.filter(function(p) { return p.active !== false; }).slice(0, 6);
  grid.innerHTML = active.map(function(p, i) {
    return renderCard(p, i === 0);
  }).join('');

  setTimeout(initReveal, 50);
}


/* ── 06. REVEAL ── */

function initReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        var delay = (i % 4) * 90;
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal, .stat').forEach(function(el) {
    observer.observe(el);
  });
}


/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  renderHomeProducts();
  renderCatalog();
  initReveal();
});
