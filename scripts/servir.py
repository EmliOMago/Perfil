import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

parser = argparse.ArgumentParser(description="Servidor local do Portal Emli O’Mago")
parser.add_argument("--host", default="127.0.0.1")
parser.add_argument("--port", type=int, default=4173)
parser.add_argument("--strictPort", action="store_true", help=argparse.SUPPRESS)
options = parser.parse_args()
handler = partial(SimpleHTTPRequestHandler, directory=Path(__file__).resolve().parents[1])
with ThreadingHTTPServer((options.host, options.port), handler) as server:
    print(f"http://{options.host}:{options.port}/", flush=True)
    server.serve_forever()
