# 004 - Direção de Arte

## Portal Emli O'Mago

Versão: 1.2  
Status: Em construção

---

# Objetivo

Este documento define a direção artística do Portal Emli O'Mago.

Seu propósito é garantir unidade visual entre as páginas do Portal e o Bairro Mágico em HTML5 e qualquer projeto derivado.

Toda decisão estética deve respeitar este documento.

---

# Identidade

A identidade visual do Portal é fundamentada no movimento Solarpunk.

O Solarpunk não é utilizado apenas como referência estética.

Ele representa uma forma de viver, produzir e compartilhar conhecimento.

Arte, tecnologia e natureza coexistem como partes da mesma comunidade.

---

# Sensações

O Portal deve transmitir:

- acolhimento;

- tranquilidade;

- criatividade;

- curiosidade;

- simplicidade;

- comunidade;

- esperança;

- liberdade;

- autonomia.

O visitante deve sentir que chegou a um lugar onde gostaria de permanecer.

---

# O que evitar

Evitar transmitir:

- decadência;

- distopia;

- excesso de tecnologia;

- excesso de fantasia medieval;

- excesso de neon;

- brutalismo;

- arquitetura opressiva;

- ambientes industriais;

- excesso de interface.

---

# O Misticismo

O nome "O'Mago" faz parte da identidade artística.

Entretanto, o universo não representa magia tradicional.

O misticismo aparece apenas como linguagem simbólica.

A transformação do mundo acontece através de:

- criatividade;

- conhecimento;

- trabalho;

- cooperação;

- arte;

- tecnologia.

---

# Arquitetura

A arquitetura do Bairro deve parecer construída pelos próprios moradores.

Os espaços devem transmitir:

- uso cotidiano;

- manutenção constante;

- adaptações ao longo do tempo;

- crescimento natural.

Evitar construções monumentais.

---

# Vegetação

A vegetação faz parte da arquitetura.

Não funciona apenas como decoração.

Plantas convivem naturalmente com:

- casas;

- oficinas;

- praças;

- estúdios;

- bibliotecas;

- caminhos.

A natureza nunca é separada da vida cotidiana.

---

# Tecnologia

A tecnologia deve parecer acessível.

Ferramentas fazem parte do cotidiano.

Computadores coexistem com madeira, plantas, vidro, pedra e metal.

A tecnologia nunca deve transmitir frieza.

---

# Paleta Oficial

A identidade visual utilizará **cinco cores principais**.

Essas cores deverão atender simultaneamente aos seguintes critérios:

- representar a identidade Solarpunk;

- harmonizar com vegetação abundante;

- valorizar tons de pele morena;

- harmonizar com roupas predominantemente pretas e vermelhas, presentes na identidade visual do autor;

- oferecer bom contraste para leitura;

- funcionar nas páginas de leitura e no cenário do Bairro Mágico.

### 1. Terracota Quente (Base Terrosa & Pele)

- **Hex:** `#D46A43`

- **Função:** Destaque / Conectora

- **Justificativa:** Inspirada na arquitetura de argila e cerâmica termorreguladora. Este tom terroso e quente valoriza imensamente os subtons de pele morena, além de criar uma transição perfeita e natural para o vermelho da identidade do autor.

### 2. Ouro Solar (Luz & Otimismo Solarpunk)

- **Hex:** `#E6B800`

- **Função:** Destaque / Detalhes de Interface (UI)

- **Justificativa:** Representa a energia solar e a tecnologia limpa. Em contraste com roupas pretas, ele vibra intensamente. É uma cor excelente para botões ou elementos de leitura que precisam saltar aos olhos tanto nos componentes HTML quanto nos elementos desenhados no cenário.

### 3. Verde Musgo Fechado (Harmonia Botânica & Contraste)

- **Hex:** `#2B4C3F`

- **Função:** Fundo / Texto de Alto Contraste

- **Justificativa:** A vegetação abundante precisa de uma base que não brigue com as plantas reais ou renderizadas. Esse verde profundo e sóbrio funciona como um "novo preto" ecológico. Ele harmoniza perfeitamente com o vermelho e serve de fundo escuro ideal para leitura acessível.

### 4. Areia Iluminada (Neutro Claro & Legibilidade)

- **Hex:** `#F4EFE6`

- **Função:** Fundo Claro / Texto Principal

- **Justificativa:** Substitui o branco puro por um tom off-white inspirado em materiais naturais e texturas arquitetônicas sustentáveis. Garante um contraste de leitura impecável com o Verde Musgo e o Preto, sem cansar a vista, mantendo a leitura clara sobre as superfícies do cenário.

### 5. Latão Tecnológico (O Link de Transição)

- **Hex:** `#8C7A5B`

- **Função:** Neutro de Suporte / Estrutura

- **Justificativa:** Um meio-tom que remete a metais reciclados e estruturas solarpunk. Ele faz o casamento perfeito entre o preto das roupas, o verde da vegetação e os tons de pele morena, servindo para bordas, divisores e elementos secundários de UI.

### Resumo da Paleta para desenvolvimento web

| **Cor**         | **Hex**   | **Perfil de Uso**                                    | Uso Principal                                         | Uso Secundário                             |
| --------------- | --------- | ---------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------ |
| **Terracota**   | `#D46A43` | Valorização de pele, links ativos e calor visual     | Destaques, links ativos e elementos autorais          | Hover, indicadores de seleção              |
| **Ouro Solar**  | `#E6B800` | Alertas, botões principais (Call to Action), energia | Botões principais (CTA), foco e elementos interativos | Badges, notificações positivas             |
| **Verde Musgo** | `#2B4C3F` | Textos sobre fundos claros ou fundo para Dark Mode   | Fundo do Dark Mode e textos escuros                   | Cabeçalhos, menus e rodapé                 |
| **Areia**       | `#F4EFE6` | Fundo principal (Light Mode) ou texto sobre o Verde  | Fundo do Light Mode                                   | Texto sobre Verde Musgo e áreas de leitura |
| **Latão**       | `#8C7A5B` | Bordas, ícones secundários e elementos estruturais   | Bordas, divisórias e elementos estruturais            | Ícones secundários e estados desabilitados |

> **Regra 1:** nenhuma cor deve dominar completamente a interface. O contraste entre natureza (Verde Musgo), calor humano (Terracota) e energia (Ouro Solar) faz parte da identidade visual do Portal.

> **Regra 2:** novas cores poderão ser adicionadas apenas como cores auxiliares e próximas as cores principais. As cinco cores oficiais permanecem como a base de toda a identidade visual.

**Aplicação na cena:** Use a paleta oficial como referência para os materiais e estados dos componentes. Se um renderizador usar espaço de cor linear, converta os valores na entrada e confira o contraste final na tela.

---

# Materiais

Priorizar materiais que transmitam:

- conforto;

- sustentabilidade;

- uso cotidiano;

- durabilidade.

Exemplos:

- madeira;

- pedra;

- vidro;

- cerâmica;

- metal pintado;

- tijolo.

---

# Iluminação

Durante o dia:

- iluminação natural;

- sombras suaves;

- céu limpo;

- sensação de ar livre.

Durante a noite:

- iluminação quente;

- postes discretos;

- janelas iluminadas;

- ambiente acolhedor.

Evitar contrastes extremos.

---

# Clima

O clima deve reforçar conforto.

Eventos climáticos extremos não fazem parte da identidade principal do Bairro.

Chuva pode existir.

Tempestades devem ser raras.

---

# Personagens

Os moradores devem parecer pessoas comuns.

Suas roupas devem refletir:

- conforto;

- funcionalidade;

- personalidade;

- diversidade.

Evitar uniformização.

---

# Emli O'Mago

Sua representação visual deve comunicar:

- proximidade;

- criatividade;

- simplicidade;

- autenticidade.

Evitar aparência de herói, líder político ou personagem místico.

---

# Interface

A interface deve ser discreta.

Menus devem ocupar o menor espaço possível.

O ambiente possui prioridade sobre a interface.

---

# Tipografia

O Portal utilizará exclusivamente fontes nativas do sistema operacional.

Objetivos:

- carregamento imediato;

- nenhuma dependência externa;

- maior privacidade;

- excelente desempenho;

- boa legibilidade em qualquer plataforma.

Não serão utilizadas fontes carregadas por serviços externos.

---

# Ícones

Todos os ícones do Portal serão autorais.

Princípios:

- desenhados especificamente para o Portal;

- linguagem visual consistente;

- formas simples;

- excelente legibilidade;

- reutilização entre páginas e experiências HTML5.

Não serão utilizadas bibliotecas de terceiros como Font Awesome, Material Icons ou similares.

---

# Componentes Visuais

A interface será construída a partir de componentes reutilizáveis.

A primeira versão deverá possuir implementações para:

- botão;

- cartão de projeto;

- cartão de notícia;

- galeria;

- carrossel;

- player de música;

- player de vídeo;

- janela modal;

- tooltip;

- linha do tempo;

- barra de pesquisa;

- menu superior;

- menu lateral;

- rodapé;

- breadcrumb.

Cada componente poderá evoluir ao longo do projeto, mantendo sua identidade visual e compatibilidade.

---

# Fotografia

As fotografias apresentadas no Portal devem manter unidade visual.

Priorizar:

- luz natural;

- pessoas reais;

- momentos espontâneos;

- produção artística;

- comunidade.

---

# Ilustrações

Quando utilizadas, devem complementar o universo.

Não devem competir visualmente com fotografias ou com o ambiente 3D.

---

# Música

A música possui papel estrutural.

Sempre que possível utilizar composições autorais.

Também poderão ser utilizados serviços externos através de incorporações (*embeds*) quando isso representar melhor distribuição ou experiência para o visitante.

A trilha sonora deve transmitir:

- contemplação;

- criatividade;

- descoberta;

- leveza.

Evitar excesso de tensão permanente.

---

# Som Ambiente

Os ambientes devem possuir sons naturais.

Exemplos:

- vento;

- pássaros;

- folhas;

- água;

- passos;

- atividades da comunidade.

O silêncio também faz parte da experiência.

---

# Animações

As animações devem ser suaves.

Priorizar:

- movimentos naturais;

- transições discretas;

- continuidade.

Evitar movimentos bruscos.

---

# Linguagem Visual

Toda comunicação visual deve transmitir que arte, tecnologia e natureza fazem parte do mesmo lugar.

Nenhum desses elementos deve dominar os demais.

---

# Consistência

Uma pessoa que conheça apenas:

- o Portal HTML;

ou

- o Bairro Mágico;

deve reconhecer imediatamente que ambos pertencem ao mesmo universo.

---

# Princípios

## 1.

O Solarpunk orienta toda a direção artística.

## 2.

A natureza faz parte da arquitetura.

## 3.

A tecnologia existe para aproximar pessoas.

## 4.

Todo ambiente deve parecer habitado.

## 5.

Conforto visual possui prioridade sobre espetáculo.

## 6.

A simplicidade possui prioridade sobre complexidade.

## 7.

O Portal deve transmitir autenticidade.

## 8.

A identidade visual deve permanecer consistente em qualquer plataforma.

---

# Questões Pendentes

- materiais e iluminação do renderizador web;

- iluminação definitiva;

- direção fotográfica completa;

- estilo das ilustrações;

- identidade sonora oficial;

- animações padrão;

- guia de identidade visual para futuras aplicações.
