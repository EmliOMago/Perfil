# 003 - Arquitetura Geral

## Portal Emli O'Mago

Versão: 1.2  
Status: Em construção

---

# Objetivo

Este documento define a arquitetura geral do Portal Emli O'Mago.

Seu objetivo é registrar como os diferentes componentes do projeto se relacionam, permitindo evolução contínua sem necessidade de reestruturações frequentes.

Este documento descreve apenas a arquitetura geral do sistema.

Detalhes sobre a estrutura dos dados são documentados separadamente.

---

# Estrutura Geral

O Portal é composto por três partes independentes.

1. Dados

2. Interface Web (HTML)

3. Interface 3D (Unity)

Todas utilizizam a mesma base de dados pública.

A separação entre dados e interface é um princípio permanente da arquitetura.

---

# Dados

Os dados públicos permanecem armazenados separadamente das aplicações.

Objetivos:

- facilitar atualizações;

- evitar duplicação;

- permitir reutilização entre projetos;

- permitir evolução independente da interface;

- servir como fonte única de informação.

Sempre que possível, informações estruturadas deverão ser distribuídas em arquivos JSON.

Arquivos auxiliares de autoria poderão utilizar outros formatos, como CSV, desde que sejam convertidos para JSON antes da publicação.

---

# Interface HTML

A interface HTML constitui a principal porta de entrada do Portal.

Responsabilidades:

- apresentar Emli O'Mago;

- apresentar o Bairro Mágico;

- divulgar novidades;

- disponibilizar acesso rápido aos projetos;

- conduzir o visitante para a experiência 3D;

- funcionar em qualquer navegador moderno.

A versão HTML não deve reproduzir toda a experiência do Bairro Mágico.

Seu objetivo é despertar curiosidade e facilitar o acesso às informações.

---

# Interface Unity

A interface Unity representa o Bairro Mágico.

Responsabilidades:

- exploração espacial;

- interação com objetos;

- descoberta de conteúdos;

- reprodução musical;

- minijogos;

- acesso natural aos projetos.

Sempre que possível utilizará exatamente a mesma base de dados consumida pelo Portal HTML.

---

# Relação entre as Interfaces

As interfaces não competem entre si.

Cada uma possui objetivos distintos.

## HTML

- apresentação;

- leitura;

- navegação rápida;

- indexação por mecanismos de busca;

- compartilhamento de conteúdo.

## Unity

- exploração;

- imersão;

- descoberta;

- interação.

A experiência principal do Portal continua sendo o Bairro Mágico.

---

# Estrutura dos Repositórios

## Perfil

Responsável pela interface pública.

Contém:

- HTML;

- CSS;

- JavaScript;

- componentes;

- imagens exclusivas da interface;

- ícones;

- documentação.

Não deve armazenar grandes volumes de conteúdo sujeito a atualização frequente.

### Organização das mídias

As mídias exclusivas da interface permanecem organizadas por tipo.

Exemplo:

```text
img/
    jogos/
    musicas/
    eventos/
    moradores/
    locais/

audio/
    musicas/
    ambiente/

video/
    trailers/
    makingof/
```

---

## ArquivosNoGitHub

Responsável pelos dados públicos utilizados pelos projetos.

Contém:

- arquivos JSON;

- imagens compartilhadas;

- áudios próprios;

- vídeos próprios;

- demais mídias públicas.

Sempre que possível, conteúdos atualizáveis deverão permanecer neste repositório.

### Organização das mídias

A organização principal ocorre por projeto.

Cada projeto organiza internamente suas mídias por tipo.

Exemplo:

```text
ArquivosNoGitHub/

portal/
    img/
    audio/
    video/

ascensao-na-ruina/
    img/
    audio/
    video/

gatos-no-telhado/
    img/
    audio/
    video/
```

Sempre que uma mesma mídia puder ser reutilizada por diferentes projetos, deverá existir apenas uma cópia física.

Outros projetos deverão apenas referenciá-la.

---

# Plataformas Externas

Quando oferecerem vantagens técnicas ou de distribuição poderão ser utilizadas plataformas externas.

Exemplos:

- YouTube;

- SoundCloud;

- Bandcamp;

- Spotify;

- itch.io.

Sempre que possível o Portal utilizará incorporações (*embeds*) em vez de duplicação de arquivos.

---

# Organização do Código

A interface deve ser dividida em módulos.

Separar responsabilidades.

Exemplos:

- renderização;

- carregamento de dados;

- componentes;

- navegação;

- acessibilidade;

- animações.

---

# Organização do CSS

Evitar arquivos excessivamente grandes.

Separar estilos por responsabilidade.

Exemplos:

- base;

- layout;

- componentes;

- páginas;

- temas.

---

# Organização dos Dados

Todo conteúdo sujeito a atualização frequente deve permanecer separado da interface.

Alterações de conteúdo nunca deverão exigir alteração do HTML ou da Unity.

---

# Componentização

Elementos reutilizados devem ser tratados como componentes.

A primeira versão deverá possuir implementações básicas para:

- botões;

- cartões de projeto;

- cartões de notícia;

- galerias;

- carrosséis;

- player de música;

- player de vídeo;

- janelas modais;

- tooltips;

- linha do tempo;

- barra de pesquisa;

- menu superior;

- menu lateral;

- rodapé;

- breadcrumb.

Todos deverão permitir evolução contínua.

---

# Internacionalização

O Portal deverá suportar múltiplos idiomas.

Idioma oficial de origem:

- Português Brasileiro (`pt-BR`)

Idiomas adicionais poderão ser incorporados progressivamente.

As traduções serão mantidas em arquivos CSV separados por domínio de conteúdo e convertidas automaticamente para JSON durante o processo de publicação.

Caso uma tradução não exista, deverá ser utilizada automaticamente a versão em Português Brasileiro.

A ausência de tradução nunca deverá impedir o funcionamento da aplicação.

## Estrutura esperada de idiomas



```
portal/
│   ├── languages/
│   ├── pt-BR.json
│   ├── en-US.json
│   ├── es-ES.json
│   └── ...
```

---

# Estratégia de Carregamento

Cada interface poderá implementar sua própria estratégia de carregamento.

O único requisito obrigatório é consumir a mesma base de dados pública.

## Portal HTML

O Portal HTML deverá carregar apenas os arquivos necessários para cada página.

Arquivos especializados deverão ser carregados sob demanda.

Sempre que um arquivo já estiver disponível em memória, deverá ser reutilizado.

## Unity

A Unity poderá utilizar estratégias próprias de pré-carregamento e carregamento progressivo conforme a necessidade da experiência tridimensional.

---

# Cache

O Portal deverá priorizar desempenho sem comprometer a atualização dos dados.

## HTML

O arquivo de entrada deverá sempre verificar a existência de novas versões.

## Dados

Arquivos JSON, imagens, áudios e demais recursos poderão utilizar cache.

A invalidação do cache deverá ocorrer através da alteração do timestamp utilizado na requisição.

Sempre que possível apenas arquivos alterados deverão ser baixados novamente.

## Atualização

Após iniciar a aplicação:

1. utilizar imediatamente os dados disponíveis em cache;

2. verificar atualizações em segundo plano;

3. atualizar apenas os recursos modificados.

---

# Compatibilidade

Toda aplicação deverá seguir uma política de compatibilidade incremental.

Novos campos poderão ser adicionados aos arquivos de dados.

Campos desconhecidos deverão ser ignorados sempre que possível.

Sempre que ocorrer incompatibilidade deverá ser emitido apenas um aviso de manutenção.

A aplicação nunca deverá interromper seu funcionamento devido à existência de campos desconhecidos.

---

# Crescimento

O Portal deve permitir crescimento contínuo.

Adicionar novos projetos não deve exigir alteração estrutural.

Adicionar novos conteúdos não deve exigir duplicação de código.

---

# Tecnologias

A arquitetura prioriza:

- HTML5;

- CSS3;

- JavaScript puro.

Bibliotecas externas somente poderão ser utilizadas quando oferecerem vantagens claras.

Toda tecnologia adotada deverá ser:

- gratuita;

- compatível com GitHub Pages;

- leve;

- amplamente utilizada;

- bem documentada;

- independente de infraestrutura própria.

---

# Compatibilidade

O Portal deverá funcionar corretamente em:

- computadores;

- tablets;

- celulares.

Sempre priorizando navegadores modernos.

---

# Acessibilidade

O Portal deverá seguir boas práticas de acessibilidade.

Exemplos:

- navegação por teclado;

- contraste adequado;

- textos alternativos;

- foco visível;

- estrutura semântica.

---

# Desempenho

Prioridades:

1. carregamento rápido;

2. baixo consumo de memória;

3. baixo consumo de banda;

4. boa experiência em computadores comuns;

5. boa experiência em celulares comuns.

A simplicidade possui prioridade sobre efeitos visuais desnecessários.

---

# Publicação

O Portal deverá ser publicado utilizando infraestrutura estática.

Prioridade atual:

- GitHub Pages.

Nenhuma funcionalidade essencial deverá depender de servidor próprio.

---

# Versionamento

Todo desenvolvimento utilizará Git.

A evolução da arquitetura seguirá um modelo incremental.

Sempre que possível, alterações estruturais deverão preservar compatibilidade com versões anteriores.

Mudanças incompatíveis deverão ser evitadas.

---

# Documentação

A documentação faz parte da arquitetura.

Nenhuma mudança estrutural importante deverá ocorrer sem atualização dos documentos da pasta `docs`.

---

# Princípios

## 1.

Dados e interface permanecem separados.

## 2.

HTML e Unity compartilham a mesma base de dados.

## 3.

Conteúdo atualizável permanece fora do código.

## 4.

Todo código possui responsabilidade clara.

## 5.

O Portal deve permanecer simples de manter.

## 6.

A documentação possui prioridade sobre a implementação.

## 7.

Toda tecnologia adotada deve justificar sua existência.

## 8.

A arquitetura deve permitir evolução contínua sem reestruturações profundas.

## 9.

Compatibilidade incremental possui prioridade sobre mudanças incompatíveis.

## 10.

Cada interface pode otimizar seu carregamento desde que preserve a compatibilidade com a base de dados oficial.

---

# Questões Pendentes

- arquitetura completa da versão Unity;

- integração detalhada entre HTML e Unity;

- definição do processo automatizado de geração dos arquivos públicos (build pipeline) (Manifest).
