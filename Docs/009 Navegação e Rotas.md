# 009 - Navegação e Rotas

**Portal Emli O'Mago**

**Versão:** 1.0  
**Status:** Vigente

---

# 1. Objetivo

Este documento define a arquitetura de navegação do Portal Emli O'Mago, estabelecendo as regras para identificação de páginas, estrutura das URLs, preservação de contexto, transições entre conteúdos e comportamento da navegação em diferentes dispositivos.

Não faz parte deste documento a especificação das páginas (Documento 007), dos componentes (Documento 008) ou das regras funcionais detalhadas (Documento 010).

---

# 2. Princípios da Navegação

Toda navegação do Portal deve obedecer aos seguintes princípios:

- arquitetura orientada a dados;
- navegação baseada em relacionamentos;
- preservação do contexto do usuário;
- baixo acoplamento;
- simplicidade;
- previsibilidade;
- acessibilidade;
- compatibilidade com GitHub Pages.

O usuário deve conseguir localizar, compreender e acessar qualquer conteúdo sem depender de conhecimento prévio da estrutura interna do Portal.

---

# 3. Modelo Geral

A navegação do Portal é composta por três níveis complementares:

| Nível      | Finalidade                                      |
| ---------- | ----------------------------------------------- |
| Global     | Acesso às principais áreas do Portal            |
| Contextual | Navegação relacionada ao conteúdo atual         |
| Relacional | Descoberta automática de conteúdos relacionados |

Esses níveis podem coexistir na mesma página.

---

# 4. Home

A Home constitui o ponto inicial da navegação.

Sua função é permitir exploração contínua dos conteúdos.

Ela não representa uma página institucional.

Todos os demais conteúdos devem ser alcançáveis a partir dela.

Idealmente, qualquer conteúdo deve ser acessado em até quatro cliques a partir da home.

---

# 5. Navegação Global

A navegação global é composta principalmente por:

- cabeçalho;
- navegação lateral;
- pesquisa;
- acesso ao perfil;
- botão do Bairro Mágico.

Ela permanece disponível durante toda a navegação.

---

# 6. Navegação Contextual

A navegação contextual depende do conteúdo atualmente exibido.

Pode incluir:

- conteúdos relacionados;
- próximo;
- anterior;
- série;
- coleção;
- categoria;
- tags;
- recomendações.

A composição é determinada pelos dados.

---

# 7. Navegação Relacional

O Portal deve favorecer a descoberta de conteúdos.

Os relacionamentos podem conectar conteúdos de naturezas diferentes.

Exemplos:

- projeto → música;
- artigo → ferramenta;
- vídeo → projeto;
- categoria → coleção;
- série → jogo.

A relação entre conteúdos é definida exclusivamente pelos dados.

O código não deve conter listas fixas de relacionamentos.

---

# 8. Pesquisa

## 8.1 Funcionamento

A pesquisa não abre uma nova página física.

Ela substitui apenas o conteúdo do painel principal.

As demais regiões da interface permanecem inalteradas.

---

## 8.2 Contexto

Ao sair dos resultados e retornar, devem ser restaurados:

- termo pesquisado;
- filtros;
- ordenação;
- posição da rolagem;
- seção aberta.

---

# 9. Filtros

Os filtros refinam a lista atualmente apresentada.

Eles não alteram a estrutura geral da navegação.

Os filtros disponíveis dependem dos dados carregados.

---

# 10. Ordenação

A ordenação modifica apenas a sequência de exibição.

Ela deve ser preservada enquanto o usuário permanecer no mesmo contexto de navegação.

---

# 11. Próximo e Anterior

Os comandos "Próximo" e "Anterior" devem seguir exatamente a sequência atualmente exibida.

A sequência considera:

- pesquisa ativa;
- filtros ativos;
- ordenação aplicada.

Nunca devem utilizar a ordem física dos arquivos JSON ou qualquer sequência fixa.

---

# 12. Breadcrumb

O breadcrumb representa o caminho lógico percorrido pelo usuário.

## Regras

Deve:

- utilizar separador consistente;
- representar apenas a hierarquia lógica;
- não substituir o menu principal;
- não aparecer em páginas rasas;
- tratar títulos longos adequadamente;
- nunca transformar a página atual em link.

---

# 13. URLs

## 13.1 Princípios

As URLs devem ser:

- permanentes;
- estáveis;
- previsíveis;
- independentes do título exibido.

---

## 13.2 Identificador Permanente

Cada conteúdo deve possuir um identificador permanente.

Esse identificador constitui a referência oficial do conteúdo.

Mudanças de nome não devem alterar esse identificador.

---

## 13.3 Slug

O slug existe exclusivamente para melhorar a legibilidade da URL.

Ele não deve ser utilizado como identificador interno.

Mudanças no slug não devem alterar a identidade do conteúdo.

---

## 13.4 Estrutura Geral

A estrutura lógica das URLs deve seguir o padrão:

```
/tipo/id/slug
```

Onde:

- tipo identifica o agrupamento lógico;
- id representa o identificador permanente;
- slug melhora a legibilidade.

---

# 14. Histórico de Navegação

O histórico deve permitir retorno consistente ao estado anterior.

Sempre que possível devem ser preservados:

- conteúdo visitado;
- pesquisa;
- filtros;
- ordenação;
- rolagem;
- seção aberta.

Essa restauração deve ocorrer mesmo quando houver recarga completa da página, desde que as informações necessárias estejam disponíveis.

---

# 15. Navegação em Dispositivos Móveis

Nos dispositivos móveis:

- as barras laterais podem permanecer ocultas;
- controles laterais aparecem temporariamente por aproximadamente dois segundos;
- após esse período desaparecem automaticamente;
- a navegação ocorre prioritariamente por gestos.

A funcionalidade disponível deve ser equivalente à versão para desktop.

---

# 16. Transições

As transições entre páginas devem ser:

- rápidas;
- discretas;
- consistentes.

Animações existem apenas para suavizar mudanças de estado.

Elas nunca devem prejudicar desempenho ou acessibilidade.

---

# 17. Atualização da Interface

Sempre que tecnicamente vantajoso, a atualização deve ocorrer sem recarga completa da página.

Entretanto, recargas completas são permitidas quando:

- simplificarem significativamente a implementação;
- melhorarem confiabilidade;
- reduzirem complexidade;
- preservarem corretamente o estado da navegação.

A arquitetura não depende obrigatoriamente de navegação do tipo SPA.

---

# 18. Navegação diante de Recursos Ausentes

Quando um recurso não estiver disponível, a navegação deve permanecer funcional.

Os seguintes comportamentos devem ser adotados:

| Situação              | Comportamento                             |
| --------------------- | ----------------------------------------- |
| Página inexistente    | Página amigável de erro                   |
| JSON indisponível     | Mensagem informativa mantendo a navegação |
| Download indisponível | Botão desabilitado                        |
| Imagem inexistente    | Imagem padrão                             |
| Vídeo inexistente     | Miniatura padrão                          |
| Áudio inexistente     | Player desabilitado                       |

O usuário nunca deve perder acesso ao restante do Portal devido à ausência de um recurso específico.

---

# 19. Preferências Persistentes

O Portal deve persistir apenas as preferências necessárias para continuidade da navegação.

Incluem-se:

- idioma;
- informações necessárias para restauração do contexto.

Outras preferências podem ser adicionadas futuramente desde que não contrariem os princípios arquiteturais.

---

# 20. Evolução da Navegação

Novos tipos de conteúdo devem integrar-se automaticamente ao sistema de navegação.

A inclusão de novos tipos não deve exigir alterações estruturais nas rotas existentes.

Os mecanismos de descoberta, relacionamento e apresentação devem continuar funcionando utilizando exclusivamente os dados disponíveis.

---

# 21. Responsabilidades deste Documento

Este documento define exclusivamente:

- arquitetura de navegação;
- estrutura das rotas;
- comportamento das URLs;
- preservação de contexto;
- histórico;
- navegação contextual;
- navegação relacional;
- funcionamento em dispositivos móveis.
