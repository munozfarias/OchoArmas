#!/usr/bin/env python3
"""
OCHO ARMAS — Servidor del Panel de Administración
admin-server.py

Uso:
    python admin-server.py

Luego abrir: http://localhost:8000/admin.html
"""

import json, os, shutil
from datetime import datetime
from http.server import HTTPServer, SimpleHTTPRequestHandler

DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "products.json")
PORT = 8000


class AdminHandler(SimpleHTTPRequestHandler):

    def log_message(self, format, *args):
        # Silenciar logs de archivos estáticos, solo mostrar API
        if "/api/" in args[0]:
            print(f"  [{datetime.now().strftime('%H:%M:%S')}] {args[0]}")

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _json(self, code, data):
        body = json.dumps(data, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", len(body))
        self._cors()
        self.end_headers()
        self.wfile.write(body)

    # ── GET /api/products ──────────────────────────────────
    def do_GET(self):
        if self.path == "/api/products":
            try:
                with open(DATA_FILE, "r", encoding="utf-8") as f:
                    data = json.load(f)
                self._json(200, data)
            except Exception as e:
                self._json(500, {"error": str(e)})
        else:
            super().do_GET()

    # ── POST /api/products ─────────────────────────────────
    def do_POST(self):
        if self.path == "/api/products":
            try:
                length = int(self.headers.get("Content-Length", 0))
                body   = self.rfile.read(length)
                data   = json.loads(body.decode("utf-8"))

                # Backup antes de guardar
                backup = DATA_FILE + ".bak"
                shutil.copy2(DATA_FILE, backup)

                # Actualizar fecha
                data["meta"]["last_updated"] = datetime.now().strftime("%Y-%m-%d")

                with open(DATA_FILE, "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)

                # Ejecutar build.py automáticamente si existe
                build_path = os.path.join(os.path.dirname(__file__), "build.py")
                if os.path.exists(build_path):
                    os.system(f'python "{build_path}" > nul 2>&1')

                self._json(200, {"ok": True, "saved": DATA_FILE})
                print(f"  ✓  products.json guardado ({len(data['products'])} productos)")

            except Exception as e:
                self._json(500, {"error": str(e)})
        else:
            self._json(404, {"error": "Not found"})


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print(f"""
  ╔══════════════════════════════════════╗
  ║   OCHO ARMAS — Panel Admin           ║
  ║   http://localhost:{PORT}/admin.html   ║
  ╚══════════════════════════════════════╝

  Ctrl+C para detener el servidor
""")
    server = HTTPServer(("localhost", PORT), AdminHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Servidor detenido.\n")
