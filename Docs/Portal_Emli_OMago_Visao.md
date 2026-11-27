# Portal Emli O'Mago --- Documento de Visão

*Data: 2026-07-05*

## Propósito

Este documento registra a visão arquitetural e conceitual do Portal Emli
O'Mago para servir como referência permanente durante o desenvolvimento.

## Ideia central

As páginas de leitura são a entrada para o Bairro Mágico, um cenário navegável em 3D executado no mesmo Portal HTML5.

As páginas de leitura existem para:

- aparecer em mecanismos de busca;
- carregar rapidamente;
- funcionar em qualquer dispositivo;
- apresentar o universo;
- conduzir o visitante ao Bairro Mágico.

A experiência principal acontece dentro do Bairro Mágico.

## Identidade

O nome **Emli O'Mago** (Emli Omini Mago) remete a uma figura mística.

Entretanto, o universo visual **não utiliza fantasia medieval como
linguagem principal**.

A identidade adota o **Solarpunk**, por representar:

- tecnologia integrada ao cotidiano;
- natureza convivendo com inovação;
- criatividade coletiva;
- esperança;
- comunidade;
- sustentabilidade;
- beleza acessível.

O misticismo aparece como elemento poético, nunca como religião ou ocultismo.

## Direção artística

O Bairro Mágico deve transmitir:

- acolhimento;
- curiosidade;
- descoberta;
- criatividade;
- produção artística;
- vida comunitária.

Não é um castelo nem um reino.

É um bairro vivo.

## Posicionamento

O universo dialoga com valores libertários, cooperativos, comunitários e realistas.

Esses valores aparecem pelas escolhas de arquitetura, convivência e
produção cultural, sem transformar o portal em espaço de  proselitismo político.

## Arquitetura

Repositórios:

- Perfil → interface pública.
- ArquivosNoGitHub → dados públicos (JSON, imagens, áudio, vídeo).

O HTML estrutura a interface, e os módulos JavaScript carregam os dados em JSON conforme a navegação. O Bairro é montado sob demanda em um contêiner de experiências inspirado no TigerGameHost do 777 Minigames. O menu Jogos e o Arcade apontam para o catálogo oficial do 777.

## Evolução

Toda nova funcionalidade deve preservar esta regra:

> As páginas de leitura apresentam o universo. O Bairro Mágico é a experiência
> principal.

O botão **Entrar no Cenário 3D** é permanente desde a primeira versão e representa o acesso principal ao universo.

## Linguagem

Evitar termos como "site" e "portfólio" quando houver alternativa
temática.

Preferir termos como:

- Portal
- Bairro
- Praça
- Biblioteca
- Teatro
- Ateliê
- Oficina
- Arcade
- Jardim
- Estação
- Observatório

## Objetivo de longo prazo

Manter um único ecossistema em que o mesmo conjunto de dados alimenta:

- Portal HTML;
- Bairro Mágico em HTML5;
- futuros aplicativos e experiências.
