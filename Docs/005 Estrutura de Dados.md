# 005 - Estrutura de Dados

## Portal Emli O'Mago

Versão: 1.2  
Status: Em construção

---

# Objetivo

Este documento define a arquitetura da base de dados utilizada pelo Portal Emli O'Mago.

Seu objetivo é garantir que todas as aplicações consumam exatamente a mesma fonte de informação, permitindo evolução contínua, baixo acoplamento e manutenção simplificada.

A estrutura detalhada de cada arquivo JSON é documentada separadamente.

---

# Princípios

## 1.

Todo conteúdo público permanece separado da interface.

## 2.

Os dados representam a única fonte oficial de informação.

## 3.

HTML, Unity e futuras aplicações utilizam exatamente a mesma base de dados.

## 4.

Uma informação deve existir apenas uma vez.

## 5.

Alterações de conteúdo nunca devem exigir alteração da interface.

## 6.

Compatibilidade incremental possui prioridade sobre reestruturações.

## 7.

Todo relacionamento entre entidades deve ocorrer através de identificadores permanentes.

## 8.

A estrutura deve permanecer simples de compreender e evoluir.

---

# Organização Geral

Todos os dados públicos permanecem armazenados no repositório **ArquivosNoGitHub**.

A estrutura deverá permitir crescimento contínuo sem reorganizações frequentes.

Estrutura inicial:

```text
ArquivosNoGitHub/

portal/

    perfil.json

    projetos.json

    noticias.json

    jogos.json

    softwares.json

    aplicativos.json

    musicas.json

    videos.json

    fotografias.json

    teatro.json

    eventos.json

    moradores.json

    locais.json

    links.json

    idiomas/

    manifest.json (opcional)
```

Novos arquivos poderão ser adicionados sempre que representarem um novo domínio de dados.

---

# Organização dos Arquivos

Cada arquivo JSON representa um único domínio de informação.

Exemplos:

- jogos

- músicas

- vídeos

- moradores

- locais

Os arquivos devem permanecer independentes.

Cada arquivo especializado contém todas as informações necessárias para representar suas próprias entidades.

---

# Índice Geral de Projetos

O arquivo `projetos.json` possui função exclusivamente estrutural.

Ele não duplica informações existentes em outros arquivos.

Sua responsabilidade é funcionar como catálogo geral dos projetos disponíveis, indicando o tipo da entidade e o identificador correspondente.

Toda informação específica permanece armazenada no respectivo arquivo especializado.

---

# Estrutura Interna

Todos os arquivos JSON deverão utilizar dicionários indexados pelo identificador da entidade.

Exemplo conceitual:

```json
{
    "JOG001": { ... },
    "JOG002": { ... }
}
```

Essa organização permite:

- acesso direto;

- menor custo de busca;

- validação simplificada;

- melhor desempenho;

- menor complexidade de implementação.

---

# Identificadores

Toda entidade pública deverá possuir um identificador único.

Características obrigatórias:

- globalmente único;

- permanente;

- imutável;

- independente do nome apresentado ao visitante;

- legível por humanos;

- curto;

- baseado em prefixos padronizados em português.

Exemplos:

```
PER001
PRJ001
JOG001
SOF001
APL001
MSC001
VID001
FOT001
EVT001
MOR001
LOC001
LNK001
```

Entidades cronológicas poderão utilizar identificadores baseados em data quando isso representar melhor sua natureza.

Exemplo:

```
NOT20260706_001
```

Os identificadores nunca deverão ser reutilizados.

---

# Relacionamentos

Todo relacionamento entre arquivos deverá utilizar exclusivamente identificadores.

Exemplo:

```json
{
    "projeto": "PRJ001",
    "local": "LOC003",
    "morador": "MOR004"
}
```

Nunca deverão ser duplicadas informações apenas para facilitar consultas.

---

# Categorias

Uma entidade poderá pertencer simultaneamente a diversas categorias.

As categorias deverão utilizar nomenclatura padronizada.

Evitar categorias livres sempre que possível.

---

# Tags

Tags poderão ser utilizadas para:

- pesquisas;

- agrupamentos;

- filtros;

- recomendações.

Seu uso não substitui categorias.

---

# Internacionalização

Toda informação textual deverá permitir tradução.

O idioma oficial da base de dados é:

```
pt-BR
```

Idiomas adicionais poderão ser incorporados progressivamente.

As traduções serão produzidas em arquivos CSV organizados por domínio de conteúdo e convertidas automaticamente para JSON durante a publicação.

Quando uma tradução não existir, a aplicação deverá utilizar automaticamente o conteúdo em Português Brasileiro.

---

# Organização das Mídias

## ArquivosNoGitHub

As mídias públicas deverão ser organizadas inicialmente por projeto.

Cada projeto organiza internamente seus arquivos por tipo.

Exemplo:

```text
ascensao-na-ruina/

    img/

    audio/

    video/
```

Sempre que possível cada entidade deverá possuir sua própria subpasta.

Exemplo:

```text
img/

    JOG001/

        JOG001_capa.webp

        JOG001_banner.webp

        JOG001_tela01.webp
```

---

# Compartilhamento de Mídias

Quando uma mesma mídia puder ser utilizada por diferentes projetos, deverá existir apenas uma cópia física.

Os demais projetos deverão apenas referenciá-la.

---

# Nomenclatura das Mídias

Os nomes dos arquivos deverão ser derivados do identificador da entidade e permanecer legíveis.

Exemplo:

```
JOG001_capa.webp

JOG001_banner.webp

JOG001_tela01.webp

LOC004_fachada.webp

MSC002_capa.webp
```

---

# Versionamento

A evolução da base de dados seguirá um modelo incremental.

Sempre que possível:

- novos campos poderão ser adicionados;

- campos existentes deverão ser preservados;

- alterações incompatíveis deverão ser evitadas.

Os arquivos JSON não possuem campo interno de versão.

A compatibilidade é definida pela documentação oficial e pelas regras de evolução incremental.

---

# Categorias Oficiais

## Objetivo

Categorias são classificações estruturadas utilizadas para organizar, filtrar e agrupar conteúdos do Portal.

Ao contrário das tags, as categorias pertencem a um conjunto controlado e padronizado.

Uma entidade pode pertencer simultaneamente a várias categorias.

---

# Tipos de Entidade

Os tipos de entidade representam a natureza principal do conteúdo e normalmente correspondem a um arquivo JSON específico.

## Projetos

- jogo
- software
- aplicativo
- música
- vídeo
- fotografia
- peça_teatral
- livro *(futuro)*
- quadrinho *(futuro)*
- podcast *(futuro)*

## Universo

- morador
- local
- evento
- organização *(futuro)*
- objeto *(futuro)*

## Conteúdo

- notícia
- artigo
- nota_atualizacao
- tutorial
- documentação

---

# Categorias Temáticas

Estas categorias descrevem o conteúdo, independentemente do seu tipo.

## Desenvolvimento

- desenvolvimento
- protótipo
- conceito
- cancelado
- em_desenvolvimento
- concluído
- publicado
- arquivado

---

## Conteúdo

- making_of
- bastidores
- curiosidade
- entrevista
- apresentação
- demonstração
- trailer

---

## Universo

- história
- personagem
- cultura
- magia
- tecnologia
- cotidiano
- exploração

---

## Produção Artística

- pixel_art
- ilustração
- fotografia
- música_original
- remix
- cover
- animação

---

## Portal

- destaque
- novidade
- recomendado
- popular
- recente

---

# Categorias Técnicas

Utilizadas principalmente para filtros.

- desktop
- web
- mobile
- windows
- linux
- android
- ios

---

# Gêneros de Jogos

- aventura
- plataforma
- puzzle
- estratégia
- simulação
- visual_novel
- terror
- ação
- rpg
- sandbox
- educacional

---

# Gêneros Musicais

- orquestral
- eletrônico
- ambiente
- rock
- pop
- folk
- instrumental
- experimental

---

# Categorias de Vídeo

- trailer
- gameplay
- making_of
- teaser
- apresentação
- tutorial
- livestream

---

# Estado do Conteúdo

- rascunho
- revisão
- publicado
- oculto
- arquivado

---

# Tags

As tags **não são padronizadas**.

São livres.

Servem apenas para:

- pesquisa;
- SEO;
- recomendações;
- agrupamentos específicos.

Exemplo:

```
"tags": [    "gato",    "chuva",    "castelo",    "pixel art",    "steam"]
```

S**eparar "tipo" de "categoria"**.

Hoje, por exemplo, um jogo poderia ter:

```
{    "id": "JOG001",    "tipo": "jogo",    "categorias": [        "aventura",        "pixel_art",        "destaque",        "publicado"    ],    "tags": [        "fantasia",        "gatos",        "exploração"    ]}
```

Ou seja:

- **tipo** → exatamente um (define qual é a entidade e, na prática, o JSON ao qual ela pertence).
- **categorias** → várias, mas escolhidas de uma lista oficial controlada.
- **tags** → ilimitadas e livres.

---

# Compatibilidade

As aplicações deverão ser tolerantes à evolução dos arquivos.

Campos desconhecidos deverão ser ignorados sempre que possível.

Situações como:

- campos desconhecidos;

- referências inexistentes;

- identificadores duplicados;

- categorias desconhecidas;

- traduções ausentes;

não deverão interromper o funcionamento da aplicação.

Essas situações deverão gerar apenas avisos discretos destinados à manutenção.

---

# Cache

A base de dados deverá utilizar cache para reduzir tráfego e melhorar desempenho.

O HTML de entrada permanece responsável por verificar novas versões da aplicação.

Os arquivos JSON poderão utilizar cache invalidado por timestamp.

Sempre que possível apenas arquivos alterados deverão ser baixados novamente.

---

# Carregamento

Cada aplicação poderá implementar sua própria estratégia de carregamento.

No Portal HTML:

- carregar apenas os arquivos necessários para cada página;

- reutilizar dados já presentes em memória;

- carregar arquivos especializados sob demanda.

Na Unity:

- permitir pré-carregamento conforme necessidade da experiência.

---

# Evolução

Novos arquivos poderão ser adicionados.

Novas entidades poderão surgir.

Novos campos poderão ser incorporados.

A estrutura deverá crescer preservando compatibilidade com versões anteriores sempre que possível.

---

# Documentação Complementar

Este documento define apenas a arquitetura da base de dados.

A definição detalhada de cada arquivo JSON encontra-se no documento:

**006 - Especificação dos Arquivos JSON**

---

# Questões Pendentes

- processo automatizado de geração dos JSON públicos;

- ferramenta oficial de validação da base de dados.
