# OCHO ARMAS — Guía del proyecto

## Estructura de archivos

```
/
├── build.py                  ← Script principal. Leer antes de todo.
├── README.md                 ← Este archivo
│
├── data/
│   └── products.json         ← ⭐ ÚNICA fuente de verdad del catálogo
│
├── js/
│   ├── main.template.js      ← Lógica JS (editar aquí, no en main.js)
│   └── main.js               ← ⚠️ AUTO-GENERADO por build.py
│
├── css/
│   └── styles.css            ← Estilos (editar libremente)
│
├── images/
│   └── products/             ← Imágenes de productos (ver convención)
│
└── index.html                ← HTML estructural (rara vez se edita)
```

---

## Flujo de trabajo

### Agregar o modificar un producto

1. Abre `data/products.json`
2. Edita o agrega el objeto del producto
3. Ejecuta el build:
   ```bash
   python build.py
   ```
4. Sube los cambios al servidor

### Desarrollo con auto-rebuild

```bash
python build.py --watch
```
Detecta cambios en `products.json` y reconstruye automáticamente.

### Solo validar sin generar archivos

```bash
python build.py --validate
```

---

## Esquema de products.json

```json
{
  "meta": {
    "currency": "CLP",
    "whatsapp": "56900000000",
    "instagram": "ochoarmas",
    "last_updated": "YYYY-MM-DD"
  },
  "products": [
    {
      "id": 0,                          ← Entero único, no cambiar una vez publicado
      "slug": "nombre-del-short",       ← URL-friendly, único
      "active": true,                   ← false = oculto del sitio sin borrar
      "name": "Nombre Visible",
      "subtitle": "Material · Técnica",
      "tag": "Etiqueta en detalle",
      "badge": "Destacado",             ← texto del badge, "" para ninguno
      "badge_class": "",                ← "custom" para estilo borde amarillo
      "price": 29990,                   ← en la moneda de meta.currency
      "stock": 8,                       ← 0 = agotado (muestra badge)
      "tags": ["bordado", "destacado"], ← usados en filtros del catálogo
      "images": {
        "placeholder_bg": "linear-gradient(...)",  ← fondo si no hay foto
        "icon_fill": "#c0272d",         ← color del ícono placeholder
        "icon_top": "#8a0000",
        "icon_stroke": "#ff6666",
        "files": [                      ← rutas relativas a la raíz
          "images/products/slug-frente.jpg",
          "images/products/slug-lado.jpg",
          "images/products/slug-detalle.jpg",
          "images/products/slug-espalda.jpg"
        ]
      },
      "colors": ["#c0272d", "#8a0000"],
      "sizes": ["S", "M", "L", "XL"],
      "material": "Descripción del material",
      "description": "Texto largo para la vista de detalle.",
      "meta": "Texto corto bajo el nombre en las cards",
      "wa_text": "Me%20interesa%20el%20short%20Nombre"
    }
  ]
}
```

---

## Convención de imágenes

- **Carpeta:** `images/products/`
- **Formato recomendado:** JPG o WebP
- **Tamaño:** 800×1067px (relación 3:4) para cards; 1200×1600px para detalle
- **Nombres:** `{slug}-frente.jpg`, `{slug}-lado.jpg`, `{slug}-detalle.jpg`, `{slug}-espalda.jpg`

Ejemplo para el producto con slug `chillattai-rojo`:
```
images/products/chillattai-rojo-frente.jpg
images/products/chillattai-rojo-lado.jpg
images/products/chillattai-rojo-detalle.jpg
images/products/chillattai-rojo-espalda.jpg
```

Mientras no existan las imágenes, el sitio muestra el placeholder de color automáticamente.

---

## Agregar un producto nuevo (paso a paso)

1. **Elige un `id` único** — el siguiente entero disponible
2. **Define el `slug`** — en minúsculas, sin espacios, con guiones
3. **Copia el bloque** de un producto existente en el JSON y adapta
4. **Agrega imágenes** a `images/products/` siguiendo la convención
5. **Ejecuta** `python build.py`
6. **Verifica** en el navegador abriendo `index.html`

---

## Desactivar un producto sin borrarlo

Cambia `"active": true` a `"active": false` en el JSON y ejecuta el build.
El producto desaparecerá del sitio pero quedará en el archivo para futuras referencias.

---

## Flags del build

| Comando                    | Efecto                                          |
|----------------------------|-------------------------------------------------|
| `python build.py`          | Build completo, genera `js/main.js`            |
| `python build.py --watch`  | Observa cambios y reconstruye automáticamente  |
| `python build.py --validate` | Solo valida el JSON, no escribe nada         |

---

## Fase 2 — Migración a Flask (cuando tengas servidor)

Cuando quieras migrar a una API real:

1. Crear `api/` con Flask y SQLite
2. Endpoint: `GET /api/products` → retorna el mismo JSON
3. En `main.template.js`, reemplazar la inyección estática por:
   ```js
   fetch('/api/products').then(r => r.json()).then(data => {
     PRODUCTS = data.products;
     SITE_META = data.meta;
     renderHomeProducts();
     renderCatalog();
   });
   ```
4. El HTML y CSS no cambian en absoluto

El diseño de `products.json` es compatible 1:1 con lo que retornaría Flask.
