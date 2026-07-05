# Portal Emli O'Mago --- Documento de Visão

*Data: 2026-07-05*

## Propósito

Este documento registra a visão arquitetural e conceitual do Portal Emli
O'Mago para servir como referência permanente durante o desenvolvimento.

## Ideia central

O projeto **não é um site tradicional**. O site 2D é o hall de entrada
para um universo navegável em 3D desenvolvido na Unity (WebGL).

A versão HTML existe para:

- ser encontrada por mecanismos de busca;
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

O HTML contém apenas estrutura.

O conteúdo é carregado dinamicamente por arquivos JSON.

## Evolução

Toda nova funcionalidade deve preservar esta regra:

> O perfil 2D apresenta o universo. O Bairro Mágico é a experiência
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
- Bairro Mágico em Unity;
- futuros aplicativos e experiências.
