"""Gera páginas e imagens de compartilhamento no artefato estático do Perfil."""
import argparse
import hashlib
import json
import re
from html import escape
from io import BytesIO
from pathlib import Path
from textwrap import shorten
from urllib.parse import urljoin, urlsplit
from urllib.request import urlopen

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
MIME = "image/jpeg"
SIZE = (1200, 630)
FONT_MONO = "DejaVuSansMono-Bold.ttf"
FONT_BODY = "DejaVuSans.ttf"
OLD_TAGS = re.compile(r'^[ \t]*<meta\b[^>]*(?:property="og:[^"]+"|name="(?:description|portal-share-pages)")[^>]*>[ \t]*\n', re.M)
ID = re.compile(r"^[A-Z]{3}[0-9]{3,}$")


def content_reader(base):
    origin = urlsplit(base)
    if origin.scheme:
        if origin.scheme != "https":
            raise ValueError("A base remota de conteúdos exige HTTPS.")

        def read(name):
            with urlopen(urljoin(base.rstrip("/") + "/", name), timeout=12) as response:
                return json.load(response)["conteudo"]
    else:
        directory = ROOT / base

        def read(name):
            return json.loads((directory / name).read_text(encoding="utf-8-sig"))["conteudo"]
    return read


def published_data(settings):
    errors = []
    for base in dict.fromkeys(filter(None, (settings["baseDados"], settings.get("baseReserva")))):
        try:
            read = content_reader(base)
            index = read("indice.json")
            home = read("home.json")
            files = {name: read(name) for name in {value["arquivo"] for value in index.values()}}
            return home, {
                uid: files[meta["arquivo"]][uid] for uid, meta in index.items()
                if ID.fullmatch(uid) and files[meta["arquivo"]][uid].get("ativo") is True
            }
        except (OSError, ValueError, KeyError) as error:
            errors.append(error)
    raise RuntimeError("A base do Portal não pôde ser lida para gerar os cards.") from errors[-1]


def paragraph(item):
    if item.get("resumo", "").strip():
        return item["resumo"].split("\n\n", 1)[0]
    for section in item.get("secoes", []):
        if section["tipo"] == "texto" and section.get("texto", "").strip():
            return section["texto"].lstrip().split("\n\n", 1)[0]
    return ""


def excerpt(text, limit=160):
    return shorten(text, width=limit, placeholder="…")


def artwork_template():
    canvas = Image.new("RGBA", SIZE, "#1c0b23")
    sky = Image.open(ROOT / "assets/ceu.webp").convert("RGBA").resize((790, 365), Image.Resampling.LANCZOS)
    fade = Image.new("L", sky.size)
    fade.putdata([
        int(237 * max(0, min(1, x / 210, (sky.width - 1 - x) / 85, (sky.height - 1 - y) / 118)))
        for y in range(sky.height) for x in range(sky.width)
    ])
    sky.putalpha(fade)
    canvas.alpha_composite(sky, (440, 0))
    street = Image.open(ROOT / "assets/rua.webp").convert("RGBA").resize((1200, 229), Image.Resampling.LANCZOS)
    canvas.alpha_composite(street, (0, 401))
    backdrop = Image.new("RGBA", SIZE, "#18091e")
    shade = Image.new("L", SIZE)
    shade.putdata([
        int(242 * max(0, min(1, (845 - x) / 190)) * max(0, min(1, (564 - y) / 93)))
        for y in range(SIZE[1]) for x in range(SIZE[0])
    ])
    backdrop.putalpha(shade)
    canvas.alpha_composite(backdrop)
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 0, 1199, 5), fill="#c92295")
    draw.rounded_rectangle((872, 99, 1145, 506), radius=9, fill="#321933", outline="#f299c5", width=2)
    portrait = ImageOps.fit(Image.open(ROOT / "data/media/emli.webp").convert("RGB"), (259, 393), Image.Resampling.LANCZOS)
    canvas.alpha_composite(portrait.convert("RGBA"), (879, 106))
    return canvas


def wrap(text, font, width):
    lines = [""]
    for word in text.split():
        merged = (lines[-1] + " " + word).strip()
        if not lines[-1] or font.getlength(merged) <= width:
            lines[-1] = merged
        else:
            lines.append(word)
    return lines


def fit(text, font, width):
    if font.getlength(text) <= width:
        return text
    while text and font.getlength(text + "…") > width:
        text = text[:-1]
    return text.rstrip() + "…"


def cover(template, title, description):
    image = template.copy()
    draw = ImageDraw.Draw(image)
    draw.text((66, 99), "PORTAL EMLI O’MAGO", font=ImageFont.truetype(FONT_MONO, 20), fill="#f5a5d4")
    draw.rectangle((67, 138, 114, 142), fill="#ffc86c")
    for size in (73, 64, 54, 46, 38):
        font = ImageFont.truetype(FONT_MONO, size)
        lines = wrap(title.upper(), font, 720)
        if len(lines) <= 3 and all(font.getlength(line) <= 720 for line in lines):
            break
    lines = lines[:3]
    if len(wrap(title.upper(), font, 720)) > len(lines):
        lines[-1] = lines[-1].rstrip() + "…"
    for i, line in enumerate(lines):
        y = 165 + i * (size + 6)
        line = fit(line, font, 720)
        draw.text((70, y + 5), line, font=font, fill="#96316c")
        draw.text((66, y), line, font=font, fill="#fff2f6")
    body = ImageFont.truetype(FONT_BODY, 25)
    start = 169 + len(lines) * (size + 6) + 15
    for i, line in enumerate(wrap(description, body, 675)[:3]):
        if i == 2 and len(wrap(description, body, 675)) > 3:
            line = fit(line + "…", body, 675)
        draw.text((68, start + i * 32), line, font=body, fill="#ffcf84")
    buffer = BytesIO()
    image.convert("RGB").save(buffer, "JPEG", quality=87, optimize=True)
    return buffer.getvalue()


def page_html(shell, title, description, public_url, image_url, base_path):
    tags = {
        "og:title": title, "og:description": description, "og:type": "website",
        "og:url": public_url, "og:locale": "pt_BR", "og:site_name": "Portal Emli O’Mago",
        "og:image": image_url, "og:image:type": MIME, "og:image:width": str(SIZE[0]),
        "og:image:height": str(SIZE[1]), "og:image:alt": title + " · Portal Emli O’Mago",
    }
    head = ['  <meta name="portal-share-pages" content="1">', f'  <base href="{escape(base_path)}">']
    head.extend((f'  <meta name="description" content="{escape(description)}">',
                 f'  <link rel="canonical" href="{escape(public_url)}">'))
    head.extend(f'  <meta property="{key}" content="{escape(value)}">' for key, value in tags.items())
    shell = re.sub(r'^[ \t]*(?:<link rel="canonical"|<base\b)[^>]*>[ \t]*\n', '', shell, flags=re.M)
    shell = re.sub(r"<title>.*?</title>", lambda _: f"<title>{escape(title)}</title>", shell, count=1)
    return shell.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n' + "\n".join(head), 1)


def build(base_url):
    if not base_url.startswith("https://"):
        raise ValueError("Informe o endereço HTTPS publicado do Perfil.")
    base_url = base_url.rstrip("/") + "/"
    base_path = urlsplit(base_url).path or "/"
    settings = json.loads((ROOT / "config.json").read_text(encoding="utf-8-sig"))
    home, items = published_data(settings)
    pages = {
        "jogos": ("Catálogo de jogos", "Explore os jogos do 777 Minigames aqui. Para entrar na sua conta, abra o 777 em outra aba."),
        "bairro": ("Bairro Mágico", "Cenário interativo para navegador"),
        "pesquisa": ("Pesquisar", "Encontre jogos, projetos e criações no Portal Emli O’Mago."),
        **{uid.lower(): (item["titulo"], paragraph(item)) for uid, item in items.items()},
    }
    index = ROOT / "index.html"
    shell = OLD_TAGS.sub("", index.read_text(encoding="utf-8-sig"))
    if '<meta charset="utf-8">' not in shell:
        raise ValueError("O HTML de entrada está sem a declaração de charset esperada.")
    template = artwork_template()
    for slug, (title, first) in pages.items():
        description = excerpt(first or "Explore esta página no Portal Emli O’Mago.")
        directory = ROOT / "p" / slug
        directory.mkdir(parents=True, exist_ok=True)
        jpeg = cover(template, title, description)
        filename = "capa-" + hashlib.sha256(jpeg).hexdigest()[:12] + ".jpg"
        (directory / filename).write_bytes(jpeg)
        path = f"p/{slug}/"
        (directory / "index.html").write_text(
            page_html(shell, title, description, urljoin(base_url, path), urljoin(base_url, path + filename), base_path),
            encoding="utf-8",
        )
    title = f"{home['titulo']} · {home['destaque']}"
    description = excerpt(home["subtitulo"])
    home_cover = ROOT / "assets/compartilhar-emli.jpg"
    if not home_cover.is_file():
        home_cover.write_bytes(cover(template, title, description))
    index.write_text(page_html(shell, title, description, base_url, urljoin(base_url, "assets/compartilhar-emli.jpg"), base_path), encoding="utf-8")
    print(f"Cards gerados para a página inicial e {len(pages)} páginas internas.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", required=True, help="URL publicada do Perfil")
    build(parser.parse_args().url)
