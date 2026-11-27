"""Valida a cópia de publicação sem exigir dependências de terceiros."""
import json
import re
from pathlib import Path, PurePosixPath
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
ID = re.compile(r"[A-Z]{3}[0-9]{3,}")
SLUG = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")


def envelope(path):
    record = json.loads(path.read_text(encoding="utf-8"))
    assert {"id", "versaoSchema", "versaoDados", "tipo"} <= record.keys(), path
    for name in ("versaoSchema", "versaoDados"):
        assert re.fullmatch(r"\d+\.\d+\.\d+", record[name]), (path, name)
    assert record["versaoSchema"].startswith("1."), path
    return record


def asset(path):
    relative = PurePosixPath(path)
    assert not relative.is_absolute() and ".." not in relative.parts, path
    assert (DATA / path).is_file(), path


settings = envelope(ROOT / "config.json")
records = {path.relative_to(DATA).as_posix(): envelope(path)["conteudo"]
           for path in DATA.rglob("*.json") if "schemas" not in path.parts}
index = records["indice.json"]
links = records["links.json"]
for filename, entities in records.items():
    if filename in ("home.json", "indice.json") or filename.startswith("idiomas/"):
        continue
    for id, entity in entities.items():
        assert ID.fullmatch(id), id
        if filename == "projetos.json":
            assert entity["referencia"] in index, id
            continue
        assert entity["id"] == id and isinstance(entity["ativo"], bool), id
        if filename == "links.json":
            assert urlparse(entity["url"]).scheme in {"https", "mailto"}, id
            continue
        if filename == "musicas.json":
            asset(entity["arquivo"])
            continue
        assert index[id]["arquivo"] == filename, (id, filename)

for id, record in index.items():
    assert ID.fullmatch(id), id
    entity = records[record["arquivo"]][id]
    for field in ("tipo", "slug", "titulo", "resumo", "categorias"):
        assert entity[field] == record[field], (id, field)
    assert SLUG.fullmatch(entity["slug"]), id
    for field in ("relacionados", "itens"):
        assert all(reference in index for reference in entity.get(field, [])), (id, field)
    assert all(reference in links for reference in entity.get("links", [])), id
    assert entity.get("destino") in (index.keys() | links.keys() | {None}), id
    for block in [entity, *entity.get("secoes", [])]:
        for path in block.get("imagens", []):
            asset(path)

all_ids = list(index) + list(links) + list(records["projetos.json"]) + list(records["musicas.json"])
assert len(all_ids) == len(set(all_ids)), "IDs duplicados"
for section in records["home.json"]["secoes"]:
    assert all(id in index for id in section["itens"]), section
    assert section.get("mais") in (index.keys() | links.keys() | {None}), section
for item in settings["menu"]:
    assert "rota" in item or item["id"] in index.keys() | links.keys(), item
assert links[settings["catalogo"]]["url"] == "https://777minigames.com.br/games"
assert links["LNK002"]["url"] == "https://777minigames.com.br/play/tiger-forest-defense"
languages = [records[f"idiomas/{lang}.json"] for lang in settings["idiomas"]]
assert all(language.keys() == languages[0].keys() for language in languages), "Idiomas divergentes"
print(f"{len(index)} conteúdos navegáveis, {len(links)} links e {len(records)} arquivos de dados validados.")
