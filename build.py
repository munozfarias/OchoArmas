#!/usr/bin/env python3
"""
============================================================
OCHO ARMAS — Build Script  (Fase 1)
build.py
============================================================
Lee data/products.json y regenera js/main.js con los datos
inyectados. Ejecutar cada vez que se modifique products.json
o las imágenes del catálogo.

Uso:
    python build.py              # build normal
    python build.py --watch      # reconstruye al detectar cambios
    python build.py --validate   # solo valida el JSON, no escribe

Estructura esperada del proyecto:
    /
    ├── build.py
    ├── data/
    │   └── products.json
    ├── js/
    │   ├── main.js          ← generado automáticamente
    │   └── main.template.js ← plantilla base (no editar main.js)
    ├── css/
    │   └── styles.css
    ├── images/
    │   └── products/
    └── index.html
============================================================
"""

import json
import sys
import os
import shutil
import time
import hashlib
from pathlib import Path
from datetime import datetime


# ── Rutas ──────────────────────────────────────────────────
ROOT        = Path(__file__).parent
DATA_FILE   = ROOT / "data" / "products.json"
TEMPLATE_JS = ROOT / "js" / "main.template.js"
OUTPUT_JS   = ROOT / "js" / "main.js"
IMAGES_DIR  = ROOT / "images" / "products"


# ── Colores para la terminal ───────────────────────────────
class C:
    OK    = "\033[92m"
    WARN  = "\033[93m"
    ERR   = "\033[91m"
    INFO  = "\033[94m"
    BOLD  = "\033[1m"
    RESET = "\033[0m"

def ok(msg):   print(f"{C.OK}  ✓  {C.RESET}{msg}")
def warn(msg): print(f"{C.WARN}  ⚠  {C.RESET}{msg}")
def err(msg):  print(f"{C.ERR}  ✗  {C.RESET}{msg}")
def info(msg): print(f"{C.INFO}  →  {C.RESET}{msg}")
def bold(msg): print(f"{C.BOLD}{msg}{C.RESET}")


# ══════════════════════════════════════════════════════════
# 1. VALIDACIÓN DEL JSON
# ══════════════════════════════════════════════════════════

REQUIRED_PRODUCT_FIELDS = [
    "id", "slug", "active", "name", "subtitle", "tag",
    "badge", "badge_class", "price", "stock", "tags",
    "images", "colors", "sizes", "material", "description",
    "meta", "wa_text"
]

REQUIRED_IMAGE_FIELDS = [
    "placeholder_bg", "icon_fill", "icon_top", "icon_stroke", "files"
]

def validate(data: dict) -> list[str]:
    """Retorna lista de errores encontrados. Lista vacía = OK."""
    errors = []

    # Meta global
    if "meta" not in data:
        errors.append("Falta clave raíz 'meta'")
    if "products" not in data:
        errors.append("Falta clave raíz 'products'")
        return errors  # sin productos no hay más que validar

    ids   = []
    slugs = []

    for i, p in enumerate(data["products"]):
        prefix = f"Producto [{i}] '{p.get('name','sin nombre')}'"

        # Campos requeridos
        for field in REQUIRED_PRODUCT_FIELDS:
            if field not in p:
                errors.append(f"{prefix}: falta campo '{field}'")

        # IDs y slugs únicos
        pid = p.get("id")
        slug = p.get("slug")
        if pid in ids:
            errors.append(f"{prefix}: id {pid} duplicado")
        else:
            ids.append(pid)
        if slug in slugs:
            errors.append(f"{prefix}: slug '{slug}' duplicado")
        else:
            slugs.append(slug)

        # Validar imágenes
        imgs = p.get("images", {})
        for field in REQUIRED_IMAGE_FIELDS:
            if field not in imgs:
                errors.append(f"{prefix}: falta images.{field}")

        # Precio y stock
        if "price" in p and not isinstance(p["price"], (int, float)):
            errors.append(f"{prefix}: 'price' debe ser número")
        if "stock" in p and not isinstance(p["stock"], int):
            errors.append(f"{prefix}: 'stock' debe ser entero")

        # Tags debe ser lista
        if "tags" in p and not isinstance(p["tags"], list):
            errors.append(f"{prefix}: 'tags' debe ser array")

        # Colors debe ser lista de 1-5 colores
        colors = p.get("colors", [])
        if not isinstance(colors, list) or len(colors) == 0:
            errors.append(f"{prefix}: 'colors' debe ser array no vacío")

        # Sizes debe ser lista
        if "sizes" in p and not isinstance(p["sizes"], list):
            errors.append(f"{prefix}: 'sizes' debe ser array")

    return errors


# ══════════════════════════════════════════════════════════
# 2. ADVERTENCIAS (no bloquean el build)
# ══════════════════════════════════════════════════════════

def check_warnings(data: dict) -> list[str]:
    warnings = []

    for p in data.get("products", []):
        name = p.get("name", "?")

        # Stock bajo
        stock = p.get("stock", 0)
        if stock == 0 and p.get("active"):
            warnings.append(f"'{name}': stock 0 pero está activo")
        elif stock <= 2 and stock > 0:
            warnings.append(f"'{name}': stock bajo ({stock} unidades)")

        # Imágenes declaradas pero sin archivo real
        for img_path in p.get("images", {}).get("files", []):
            full = ROOT / img_path
            if not full.exists():
                warnings.append(f"'{name}': imagen no encontrada → {img_path}")

        # Precio no definido
        if p.get("price", 0) == 0 and p.get("active"):
            warnings.append(f"'{name}': precio en 0")

    return warnings


# ══════════════════════════════════════════════════════════
# 3. GENERACIÓN DEL JS
# ══════════════════════════════════════════════════════════

def format_price(price: int, currency: str = "CLP") -> str:
    """Formatea precio para mostrar en el frontend."""
    if currency == "CLP":
        return f"${price:,.0f}".replace(",", ".")
    return f"{price}"


def build_js(data: dict) -> str:
    """Genera el contenido completo de main.js a partir del JSON."""

    meta      = data["meta"]
    products  = [p for p in data["products"] if p.get("active", True)]
    currency  = meta.get("currency", "CLP")
    whatsapp  = meta.get("whatsapp", "")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Serializar el array PRODUCTS para JS
    js_products = json.dumps(products, ensure_ascii=False, indent=2)

    # Leer la plantilla
    with open(TEMPLATE_JS, "r", encoding="utf-8") as f:
        template = f.read()

    # Inyectar los datos en la plantilla
    output = template.replace(
        "/* __PRODUCTS_DATA__ */",
        f"/* Auto-generado por build.py — {timestamp} */\n"
        f"const PRODUCTS = {js_products};\n"
        f"const SITE_META = {json.dumps(meta, ensure_ascii=False)};"
    )

    return output


# ══════════════════════════════════════════════════════════
# 4. REPORTE DE PRODUCTOS
# ══════════════════════════════════════════════════════════

def print_report(data: dict):
    currency = data["meta"].get("currency", "CLP")
    products = data["products"]
    active   = [p for p in products if p.get("active")]
    inactive = [p for p in products if not p.get("active")]

    print()
    bold("  CATÁLOGO OCHO ARMAS")
    print(f"  {'─'*46}")
    print(f"  {'NOMBRE':<28} {'PRECIO':>10} {'STOCK':>6}  TAGS")
    print(f"  {'─'*46}")

    for p in active:
        price_str = format_price(p.get("price", 0), currency)
        stock     = p.get("stock", "?")
        stock_str = f"{stock}" if stock > 2 else f"{C.WARN}{stock}{C.RESET}"
        tags      = ", ".join(p.get("tags", []))
        name      = p["name"][:26]
        print(f"  {name:<28} {price_str:>10} {stock_str:>6}  {tags}")

    print(f"  {'─'*46}")
    print(f"  {len(active)} activos  |  {len(inactive)} inactivos  |  "
          f"Total stock: {sum(p.get('stock',0) for p in active)}")
    print()


# ══════════════════════════════════════════════════════════
# 5. MAIN BUILD
# ══════════════════════════════════════════════════════════

def build(validate_only: bool = False) -> bool:
    bold("\n  OCHO ARMAS — BUILD")
    print(f"  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    # Verificar que existen los archivos necesarios
    if not DATA_FILE.exists():
        err(f"No se encontró {DATA_FILE}")
        return False
    if not TEMPLATE_JS.exists():
        err(f"No se encontró la plantilla {TEMPLATE_JS}")
        err("Ejecuta este script por primera vez para crearla.")
        return False

    # Cargar JSON
    info(f"Leyendo {DATA_FILE.relative_to(ROOT)}")
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        err(f"JSON inválido: {e}")
        return False
    ok("JSON cargado correctamente")

    # Validar
    info("Validando estructura del catálogo...")
    errors = validate(data)
    if errors:
        for e_msg in errors:
            err(e_msg)
        err(f"{len(errors)} error(es) encontrado(s). Build abortado.")
        return False
    ok(f"{len(data['products'])} productos validados")

    # Advertencias
    warnings = check_warnings(data)
    for w in warnings:
        warn(w)

    # Reporte
    print_report(data)

    if validate_only:
        ok("Validación completada (--validate, no se escribió nada)")
        return True

    # Generar JS
    info("Generando js/main.js...")
    js_content = build_js(data)

    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write(js_content)
    ok(f"js/main.js generado ({len(js_content.splitlines())} líneas)")

    if warnings:
        print(f"\n  {C.WARN}{len(warnings)} advertencia(s) — revisar arriba{C.RESET}")

    bold("\n  BUILD COMPLETADO ✓\n")
    return True


# ══════════════════════════════════════════════════════════
# 6. MODO WATCH
# ══════════════════════════════════════════════════════════

def watch():
    """Observa cambios en products.json y reconstruye automáticamente."""
    bold("\n  OCHO ARMAS — WATCH MODE")
    info(f"Observando {DATA_FILE.relative_to(ROOT)}")
    info("Presiona Ctrl+C para detener\n")

    last_hash = None

    while True:
        try:
            if DATA_FILE.exists():
                content = DATA_FILE.read_bytes()
                current_hash = hashlib.md5(content).hexdigest()

                if current_hash != last_hash:
                    if last_hash is not None:  # no en el primer ciclo
                        print(f"\n  [{datetime.now().strftime('%H:%M:%S')}] Cambio detectado → reconstruyendo...")
                    last_hash = current_hash
                    build()

            time.sleep(1.5)
        except KeyboardInterrupt:
            print("\n")
            bold("  Watch detenido.")
            break


# ══════════════════════════════════════════════════════════
# 7. ENTRYPOINT
# ══════════════════════════════════════════════════════════

if __name__ == "__main__":
    args = sys.argv[1:]

    if "--watch" in args:
        watch()
    elif "--validate" in args:
        # Cargar y solo validar
        if not DATA_FILE.exists():
            err(f"No se encontró {DATA_FILE}")
            sys.exit(1)
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        errors = validate(data)
        warnings = check_warnings(data)
        if errors:
            for e_msg in errors:
                err(e_msg)
            sys.exit(1)
        for w in warnings:
            warn(w)
        ok("JSON válido")
        print_report(data)
    else:
        success = build()
        sys.exit(0 if success else 1)
