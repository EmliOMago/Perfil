# 008 - Componentes da Interface

**Portal Emli O'Mago**

**Versão:** 1.0  
**Status:** Vigente

---

# 1. Objetivo

Este documento especifica a biblioteca oficial de componentes reutilizáveis do Portal Emli O'Mago.

Todos os elementos visuais utilizados pelas páginas devem ser compostos exclusivamente a partir destes componentes ou de suas futuras extensões compatíveis.

Este documento não define páginas (Documento 007), navegação (Documento 009) nem regras funcionais completas (Documento 010).

---

# 2. Princípios Gerais

A biblioteca de componentes deve obedecer aos seguintes princípios:

- reutilização máxima;
- baixo acoplamento;
- arquitetura orientada a dados;
- independência de tipo de conteúdo;
- acessibilidade;
- desempenho;
- consistência visual;
- evolução incremental.

Nenhuma página deve implementar componentes próprios quando existir equivalente na biblioteca oficial.

---

# 3. Arquitetura dos Componentes

Todo componente deve ser:

- reutilizável;
- configurável por dados;
- independente da página onde é utilizado;
- desacoplado da origem dos dados.

Os componentes não devem conter regras específicas de projetos, categorias ou qualquer outro tipo de conteúdo.

---

# 4. Classificação

A biblioteca é organizada em quatro grupos.

| Grupo       | Finalidade               |
| ----------- | ------------------------ |
| Estruturais | Organização da interface |
| Navegação   | Controle da navegação    |
| Conteúdo    | Apresentação dos dados   |
| Utilitários | Apoio à interação        |

---

# 5. Componentes Estruturais

## 5.1 Cabeçalho

### Finalidade

Apresentar identidade do Portal e disponibilizar comandos globais.

### Conteúdo

Deve conter:

- logotipo;
- título;
- pesquisa;
- botão do Bairro Mágico;
- seleção de idioma;
- acesso às preferências.

### Regras

Permanece sempre visível.

Não acompanha a rolagem.

---

## 5.2 Navegação Lateral Esquerda

### Finalidade

Navegação Anterior

Servir para a navegação principal para o próximo conteúdo, como um botão que ocupa toda a lateral.

### Conteúdo

Deve conter:

- Uma imagem transparente do tipo seta para a esquerda

### Regras

Permanece fixa.

Deve ser recolhida após alguns segundos sem interação e reaparecer quando em interação..

---

## 5.3 Navegação Lateral Direita

### Finalidade

Navegação Próximo

Servir para a navegação principal para o próximo conteúdo, como um botão que ocupa toda a lateral. 

### Conteúdo

Deve conter:

- Uma imagem transparente do tipo seta para a direita

### Regras

Permanece fixa.

Deve ser recolhida após alguns segundos sem interação e reaparecer quando em interação..

---

## 5.4 Painel Principal

Área destinada ao conteúdo da página.

É a única região com rolagem.

---

## 5.5 Player

### Finalidade

Controlar reprodução de mídia.

Na primeira versão controla apenas músicas.

A arquitetura deve permitir novos tipos futuramente.

---

# 6. Componentes de Conteúdo

## 6.1 Card de Conteúdo

### Finalidade

Representar qualquer conteúdo do Portal.

Existe apenas um componente oficial para representação de conteúdos.

O comportamento é configurado pelos dados.

---

### Pode representar

- projeto;
- jogo;
- artigo;
- vídeo;
- música;
- download;
- coleção;
- categoria;
- série;
- qualquer tipo futuro.

---

### Conteúdo possível

- imagem;
- título;
- subtítulo;
- descrição;
- etiquetas;
- indicadores;
- status;
- metadados.

Todos os elementos são opcionais.

---

### Estados

- normal;
- foco;
- selecionado;
- indisponível;
- em desenvolvimento.

---

## 6.2 Cabeçalho de Seção

Apresenta:

- título;
- descrição;
- ações opcionais.

---

## 6.3 Lista

Exibe elementos em sequência.

Pode assumir:

- vertical;
- horizontal.

---

## 6.4 Grade

Organiza múltiplos Cards.

A quantidade de colunas depende do espaço disponível.

---

## 6.5 Carrossel

Permite navegação horizontal.

Deve ser utilizado em:

- Home;
- projetos;
- categorias;
- coleções.

---

## 6.6 Galeria

Exibe imagens relacionadas.

Pode utilizar:

- miniaturas;
- visualização ampliada;
- navegação entre imagens.

---

## 6.7 Player Embutido

Utilizado para reprodução local da mídia apresentada pela página.

Na versão inicial é destinado apenas à música.

---

## 6.8 Visualizador de Texto

Responsável pela apresentação de textos longos.

Deve suportar:

- títulos;
- listas;
- tabelas;
- citações;
- imagens incorporadas.

---

## 6.9 Bloco de Metadados

Apresenta informações estruturadas.

Exemplos:

- autor;
- versão;
- licença;
- plataforma;
- idioma;
- data.

---

## 6.10 Lista de Links

Agrupa referências externas ou internas.

Cada item pode conter:

- título;
- descrição;
- ícone;
- destino.

---

# 7. Componentes de Navegação

## 7.1 Breadcrumb

Representa o caminho lógico da navegação.

### Regras

Deve:

- utilizar separador consistente;
- não substituir o menu principal;
- não aparecer em páginas rasas;
- tratar títulos longos;
- nunca transformar a página atual em link.

---

## 7.2 Paginação

Quando utilizada deve permitir:

- página anterior;
- próxima página;
- indicação da posição atual.

---

## 7.3 Navegação Próximo/Anterior

Segue exatamente a sequência produzida pela combinação de:

- pesquisa;
- filtros;
- ordenação.

Nunca utiliza ordem fixa.

---

## 7.4 Barra de Pesquisa

Permite localizar conteúdos.

Sua utilização substitui apenas o conteúdo do painel principal.

---

## 7.5 Barra de Filtros

Permite restringir resultados.

Pode conter:

- categorias;
- tipos;
- plataformas;
- estados;
- demais filtros definidos pelos dados.

---

## 7.6 Ordenação

Permite alterar a ordem de exibição.

A lista disponível é definida pelos dados.

---

# 8. Componentes Utilitários

## 8.1 Botão

Pode representar:

- ação;
- navegação;
- confirmação.

---

## 8.2 Ícone

Representa visualmente uma ação ou categoria.

Nunca deve ser a única forma de comunicação.

---

## 8.3 Etiqueta

Apresenta pequenas classificações.

Exemplos:

- Novo
- Atualizado
- Destaque

---

## 8.4 Selo

Indica estados especiais.

Exemplo:

> Em desenvolvimento

---

## 8.5 Indicador de Carregamento

Utilizado durante carregamentos assíncronos.

Deve ser discreto.

---

## 8.6 Mensagem

Apresenta informações ao usuário.

Categorias:

- informação;
- sucesso;
- aviso;
- erro.

---

## 8.7 Estado Vazio

Quando uma seção não possuir conteúdo deve apresentar:

> Nenhum conteúdo disponível.

A estrutura visual da seção deve ser preservada.

---

# 9. Layouts

Os componentes não possuem layout único.

Os layouts são definidos pelos dados.

Um mesmo Card pode ser apresentado em diferentes formatos sem alteração do componente.

---

# 10. Responsividade

Todos os componentes devem adaptar-se ao espaço disponível.

Em dispositivos móveis:

- menus laterais podem ser ocultados;
- controles laterais aparecem temporariamente;
- a navegação ocorre prioritariamente por gestos.

---

# 11. Acessibilidade

Todos os componentes devem:

- ser utilizáveis por teclado quando aplicável;
- possuir identificação textual;
- respeitar contraste mínimo;
- funcionar com leitores de tela;
- possuir foco visível.

Ícones nunca devem transmitir informação sozinhos.

---

# 12. Estados Gerais

Todo componente pode assumir os seguintes estados quando aplicáveis:

| Estado       | Descrição                            |
| ------------ | ------------------------------------ |
| Normal       | Funcionamento padrão                 |
| Foco         | Recebe interação atual               |
| Hover        | Cursor sobre o componente            |
| Selecionado  | Elemento ativo                       |
| Desabilitado | Não disponível                       |
| Carregando   | Aguarda dados                        |
| Erro         | Não foi possível concluir a operação |

---

# 13. Recursos Ausentes

Os componentes devem aplicar automaticamente os comportamentos padronizados.

| Recurso               | Comportamento             |
| --------------------- | ------------------------- |
| Imagem inexistente    | Imagem padrão             |
| Vídeo inexistente     | Miniatura padrão          |
| Áudio inexistente     | Player desabilitado       |
| Download indisponível | Botão desabilitado        |
| Conteúdo incompleto   | Selo "Em desenvolvimento" |

---

# 14. Extensibilidade

O contêiner de experiências usa os mesmos componentes de carregamento, erro, acessibilidade e navegação definidos para o Portal. O catálogo de desenvolvimento em Storybook documenta os componentes compartilhados e seus estados. A interface do visitante consome esses componentes diretamente.

Novos componentes podem ser adicionados à biblioteca desde que:

- não quebrem compatibilidade com os existentes;
- mantenham arquitetura orientada a dados;
- permaneçam reutilizáveis;
- possam ser utilizados nas páginas e experiências HTML5;
- preservem baixo acoplamento.

---

# 15. Responsabilidades deste Documento

Este documento define exclusivamente:

- componentes oficiais da interface;
- responsabilidades de cada componente;
- composição;
- estados;
- comportamento visual geral;
- regras de reutilização.
