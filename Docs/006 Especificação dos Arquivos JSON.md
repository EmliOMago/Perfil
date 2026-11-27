# 006 - Especificação dos Arquivos JSON

## Portal Emli O'Mago

Versão: 1.1  
Status: Em construção

---

# Objetivo

Este documento define a estrutura técnica dos arquivos JSON utilizados pelo Portal Emli O'Mago.

Enquanto o documento **005 - Estrutura de Dados** define a arquitetura da base de dados, este documento especifica como cada arquivo deverá ser organizado.

Seu objetivo é permitir que qualquer desenvolvedor, ferramenta ou assistente de IA implemente novos arquivos mantendo total compatibilidade com a arquitetura oficial.

---

# Princípios Gerais

Todos os arquivos JSON seguem as mesmas regras.

- Um arquivo representa um único domínio de informação.

- Um arquivo nunca duplica informações pertencentes a outro domínio.

- Todos os registros são indexados pelo próprio identificador.

- Toda referência utiliza IDs.

- Todo campo novo deve preservar compatibilidade com versões anteriores.

- Campos desconhecidos devem ser ignorados pelos consumidores.

---

# Estrutura Geral

Todos os arquivos especializados seguem a estrutura:

```json
{
    "<ID>": {
        ...
    },

    "<ID>": {
        ...
    }
}
```

Exemplo:

```json
{
    "JOG001": { ... },
    "JOG002": { ... }
}
```

---

# Estrutura Base das Entidades

Toda entidade deverá possuir, sempre que aplicável:

| Campo        | Obrigatório | Descrição                              |
| ------------ | ----------- | -------------------------------------- |
| id           | Sim         | Identificador permanente               |
| ativo        | Sim         | Permite ocultar conteúdo sem removê-lo |
| categorias   | Sim         | Lista de categorias                    |
| tags         | Não         | Lista de palavras-chave                |
| imagens      | Não         | IDs ou caminhos das imagens            |
| audios       | Não         | IDs ou caminhos dos áudios             |
| videos       | Não         | IDs ou caminhos dos vídeos             |
| relacionados | Não         | Lista de IDs relacionados              |
| links        | Não         | Lista de IDs de links externos         |

Campos específicos pertencem ao respectivo domínio.

---

# Identificadores

## Regras

Todo identificador deve ser:

- permanente;

- globalmente único;

- imutável;

- legível;

- curto;

- baseado em prefixos oficiais.

---

## Prefixos Oficiais

| Prefixo | Entidade   |
| ------- | ---------- |
| PER     | Perfil     |
| PRJ     | Projeto    |
| JOG     | Jogo       |
| SOF     | Software   |
| APL     | Aplicativo |
| MSC     | Música     |
| VID     | Vídeo      |
| FOT     | Fotografia |
| EVT     | Evento     |
| MOR     | Morador    |
| LOC     | Local      |
| LNK     | Link       |
| NOT     | Notícia    |

Novos prefixos poderão ser adicionados conforme necessário.

---

# projetos.json

Função:

Índice geral dos projetos.

Responsabilidades:

- listar todos os projetos;

- informar o tipo da entidade;

- informar o ID correspondente.

Exemplo:

```json
{
    "PRJ001": {
        "referencia": "JOG001",
        "tipo": "jogo"
    },

    "PRJ002": {
        "referencia": "MSC004",
        "tipo": "musica"
    }
}
```

Nenhuma informação descritiva deve permanecer neste arquivo.

---

# Arquivos Especializados

Cada domínio possui seu próprio arquivo.

Exemplos:

```
jogos.json

musicas.json

videos.json

eventos.json

moradores.json

locais.json
```

Cada registro contém todas as informações necessárias daquela entidade.

Nenhum outro JSON é necessário para interpretá-la.

---

# Relacionamentos

Sempre realizados por ID.

Exemplo:

```json
{
    "local": "LOC004",

    "autor": "PER001",

    "musicas": [
        "MSC001",
        "MSC002"
    ]
}
```

Nunca duplicar:

- nomes;

- descrições;

- imagens;

- miniaturas.

---

# Categorias

Formato:

```json
"categorias": [
    "jogo",
    "aventura",
    "destaque"
]
```

Uma entidade pode pertencer simultaneamente a várias categorias.

---

# Tags

Formato:

```json
"tags": [
    "pixel art",
    "fantasia",
    "exploração"
]
```

Uso destinado à pesquisa e recomendação.

---

# Idiomas

As traduções não permanecem embutidas nos arquivos especializados.

São produzidas a partir de arquivos CSV organizados por domínio.

Exemplos:

```
menus.csv

jogos.csv

artigos.csv

noticias.csv

moradores.csv
```

Durante a publicação esses arquivos são convertidos automaticamente para JSON.

---

# Mídias

Os arquivos especializados armazenam apenas referências.

Nunca armazenam a mídia.

Exemplo:

```json
"imagens": [

    "JOG001_capa",

    "JOG001_banner"

]
```

A resolução da mídia pertence ao sistema responsável pelo carregamento.

---

# Organização Física das Mídias

No repositório ArquivosNoGitHub:

```
projeto/

    img/

        JOG001/

    audio/

        MSC001/

    video/

        VID001/
```

Sempre que possível cada entidade possui sua própria pasta.

---

# Nomenclatura das Mídias

Padrão:

```
<ID>_<descricao>.<extensao>
```

Exemplos:

```
JOG001_capa.webp

JOG001_banner.webp

JOG001_tela01.webp

MSC004_album.webp

LOC003_fachada.webp

VID014_thumbnail.webp
```

---

# Cache

Os JSON podem utilizar cache.

A atualização ocorre através de timestamp na URL.

Exemplo:

```
jogos.json?t=202607061830
```

O HTML permanece responsável por descobrir alterações.

---

# Compatibilidade

Aplicações consumidoras devem:

- ignorar campos desconhecidos;

- ignorar categorias desconhecidas;

- aceitar novos campos;

- continuar funcionando diante de versões futuras.

---

# Avisos de Validação

As seguintes situações geram apenas avisos:

- IDs duplicados;

- referência inexistente;

- categoria desconhecida;

- mídia inexistente;

- tradução ausente;

- arquivo esperado não encontrado.

Esses avisos destinam-se exclusivamente ao desenvolvimento.

Nunca devem ser apresentados ao visitante.

---

# Carregamento

Portal HTML:

- carregar apenas arquivos necessários;

- reutilizar cache;

- carregar categorias sob demanda.

Bairro Mágico em HTML5:

- dados e recursos da cena carregados sob demanda;

- mesma base do Portal, com IDs e relacionamentos compartilhados;

- destinos externos referenciados pelo ID do link.

---

# Convenções de Campos

## Booleanos

Sempre:

```json
true

false
```

---

## Datas

Formato ISO 8601.

Exemplo:

```
2026-07-06

2026-07-06T18:30:00Z
```

---

## Arrays

Mesmo quando existir apenas um elemento.

Exemplo:

```json
"categorias": [
    "jogo"
]
```

Nunca substituir arrays por valores simples.

---

## Objetos

Utilizados apenas quando representarem uma estrutura própria.

Evitar níveis excessivos de aninhamento.

---

# Ordem Recomendada dos Campos

Para facilitar leitura e manutenção:

```
id

ativo

categorias

tags

nome

descricao

datas

relacionamentos

midias

links

campos específicos
```

A ordem não possui significado técnico, mas deve ser mantida por consistência.

---

# Evolução

Novos campos podem ser adicionados.

Campos existentes não devem mudar de significado.

Sempre que possível:

- adicionar;

- nunca substituir;

- nunca remover.

---

# Arquivos Futuros

A arquitetura permite criação de novos arquivos como:

```
personagens.json

objetos.json

colecoes.json

livros.json

podcasts.json

quadrinhos.json

conquistas.json
```

Sem necessidade de alteração estrutural da base.

---

# Processo de Publicação

Fluxo recomendado:

```
Arquivos de autoria
        ↓

Validação automática
        ↓

Conversão CSV → JSON
        ↓

Geração do manifest
        ↓

Publicação no GitHub
```

Todo esse processo deverá ser automatizado sempre que possível.

---

# Objetivo Final

A especificação deve permanecer suficientemente estável para que novas aplicações possam consumir a base de dados oficial sem necessidade de adaptações específicas para cada projeto.

Toda evolução da estrutura deve preservar:

- simplicidade;

- legibilidade;

- compatibilidade;

- reutilização;

- baixo acoplamento;

- manutenção de longo prazo.
