# 007 - Especificação das Páginas

**Portal Emli O'Mago**

**Versão:** 1.0  
**Status:** Vigente

---

# 1. Objetivo

Este documento especifica todas as páginas oficiais do Portal Emli O'Mago, definindo:

- finalidade;
- responsabilidade;
- composição;
- comportamento;
- relação com os demais documentos da arquitetura.

Este documento não especifica componentes individuais (Documento 008), navegação detalhada (Documento 009) nem regras funcionais completas (Documento 010).

---

# 2. Princípios Gerais

Todas as páginas do Portal devem obedecer aos princípios definidos na arquitetura geral.

Em especial:

- arquitetura orientada a dados;
- conteúdo definido pelos arquivos JSON;
- baixo acoplamento;
- componentes reutilizáveis oficiais;
- layouts configurados por dados;
- compatibilidade com GitHub Pages;
- acessibilidade;
- desempenho;
- evolução incremental.

Nenhuma página deve possuir lógica específica para um tipo de conteúdo quando essa lógica puder ser compartilhada.

---

# 3. Estrutura Permanente da Interface

Independentemente da página exibida, a interface deve manter cinco regiões permanentes.

| Região                     | Persistência | Observações                                                                         |
| -------------------------- | ------------ | ----------------------------------------------------------------------------------- |
| Cabeçalho                  | Permanente   | Sempre visível                                                                      |
| Navegação lateral esquerda | Permanente   | Conteúdos relacionados e navegação contextual. Pode ser recolhida em telas pequenas |
| Conteúdo principal         | Variável     | Única região com rolagem                                                            |
| Navegação lateral direita  | Permanente   | Conteúdos relacionados e navegação contextual. Pode ser recolhida em telas pequenas |
| Player inferior            | Permanente   | Inicialmente controla apenas músicas                                                |

A troca de páginas não deve reconstruir visualmente essas regiões quando tecnicamente evitável.

---

# 4. Rolagem

Apenas o painel de conteúdo principal deve possuir rolagem.

O cabeçalho permanece fixo.

As barras laterais permanecem fixas.

O player permanece fixo.

Essa regra deve ser mantida em todas as páginas.

---

# 5. Organização Geral das Páginas

As páginas oficiais do Portal são:

| Página                | Finalidade                                    |
| --------------------- | --------------------------------------------- |
| Home                  | Exploração inicial do Portal                  |
| Perfil                | Apresentação completa do autor                |
| Bairro Mágico         | Exploração em cenário 3D HTML5 e lista de locais |
| Projeto               | Apresentação de um projeto específico         |
| Categoria             | Agrupamento de conteúdos                      |
| Coleção               | Agrupamento editorial                         |
| Série                 | Agrupamento sequencial                        |
| Tag                   | Conteúdos relacionados por tema               |
| Resultado de Pesquisa | Exibição dinâmica dos resultados              |
| Página de Erro        | Tratamento amigável de recursos indisponíveis |

Não existem páginas próprias para:

- imagens;
- vídeos;
- músicas;
- downloads;
- arquivos individuais de mídia.

Esses elementos existem apenas como recursos apresentados dentro de páginas agregadoras.

---

# 6. Home

## 6.1 Finalidade

A Home constitui o ponto principal de entrada do Portal.

Ela não possui caráter institucional.

Sua função é permitir que o visitante descubra conteúdos rapidamente.

---

## 6.2 Responsabilidades

A Home deve:

- destacar o perfil do autor;
- apresentar conteúdos recentes;
- apresentar conteúdos relevantes;
- apresentar coleções;
- apresentar projetos;
- apresentar categorias;
- apresentar recomendações;
- permitir exploração contínua.

---

## 6.3 Organização

As seções exibidas são definidas pelos dados.

O código não deve impor uma sequência fixa.

---

## 6.4 Conteúdos

As seções podem incluir:

- Projetos
- Jogos
- Ferramentas
- Artigos
- Tutoriais
- Vídeos
- Músicas
- Coleções
- Categorias
- Recomendações
- Novidades

Novas seções podem ser adicionadas sem alteração estrutural.

---

# 7. Página de Perfil

## 7.1 Finalidade

Apresentar o autor de forma completa.

---

## 7.2 Conteúdo

Pode conter:

- biografia;
- descrição;
- fotografia;
- redes sociais;
- histórico;
- tecnologias;
- áreas de atuação;
- projetos relacionados;
- conteúdos publicados.

A existência de cada seção depende exclusivamente dos dados.

---

# 8. Página de Projeto

## 8.1 Finalidade

Apresentar integralmente um projeto.

---

## 8.2 Estrutura

Projetos não possuem subpáginas.

Todo o conteúdo deve existir em uma única página. DIrecionando às páginas oficiais nas lojas externas.

---

## 8.3 Seções

As seções são determinadas pelo JSON.

Exemplos:

- descrição;
- imagens;
- vídeos;
- downloads;
- changelog;
- equipe;
- links;
- documentação;
- versões;
- músicas;
- artigos relacionados.

Nenhuma dessas seções é obrigatória.

---

## 8.4 Ordem

A ordem das seções é definida pelos dados.

Nunca pelo código.

---

# 9. Página de Categoria

Agrupa conteúdos pertencentes a uma mesma categoria.

Pode conter:

- descrição;
- conteúdos relacionados;
- subdivisões;
- estatísticas;
- recomendações.

---

# 10. Página de Coleção

Representa agrupamentos editoriais.

Exemplos:

- séries especiais;
- coleções históricas;
- conjuntos temáticos.

Pode apresentar qualquer tipo de conteúdo.

---

# 11. Página de Série

Representa conteúdos organizados em sequência lógica.

Pode conter:

- ordem oficial;
- progresso;
- navegação entre itens;
- conteúdos relacionados.

---

# 12. Página de Tag

Apresenta conteúdos relacionados por assunto.

Seu objetivo é facilitar descoberta.

Não representa hierarquia.

---

# 13. Página de Pesquisa

## 13.1 Natureza

A pesquisa não abre uma nova janela.

Ela substitui apenas o conteúdo do painel principal.

---

## 13.2 Conteúdo

Pode apresentar:

- resultados;
- filtros;
- ordenação;
- quantidade encontrada;
- paginação ou carregamento incremental.

---

## 13.3 Navegação

O usuário pode abrir qualquer resultado mantendo o contexto da pesquisa.

Ao retornar, devem ser restaurados:

- posição da rolagem;
- pesquisa;
- filtros;
- ordenação;
- seção aberta.

---

# 14. Página de Erro

Destina-se ao tratamento amigável de recursos inexistentes.

Exemplos:

- JSON indisponível;
- recurso removido;
- página inexistente;
- erro de carregamento.

Sempre deve preservar:

- cabeçalho;
- navegação;
- player;
- contexto geral do Portal.

---

# 15. Conteúdos Relacionados

Conteúdos relacionados aparecem prioritariamente na navegação lateral.

Opcionalmente podem aparecer também dentro da página.

A seleção deve considerar relevância e não agrupamentos rígidos.

Conteúdos de naturezas distintas podem aparecer simultaneamente.

---

# 16. Seções Vazias

Quando uma seção existir na estrutura da página, mas não possuir conteúdo, ela deve permanecer visível.

Deve ser apresentada a mensagem:

> Nenhum conteúdo disponível.

Essa política mantém consistência estrutural e evita alterações inesperadas no layout.

---

# 17. Conteúdos em Desenvolvimento

Conteúdos incompletos devem permanecer acessíveis.

Devem receber o selo:

> Em desenvolvimento

Nenhuma funcionalidade adicional deve depender desse estado.

---

# 18. Recursos Ausentes

Quando recursos não estiverem disponíveis, deve-se aplicar os comportamentos padronizados.

| Recurso       | Comportamento                           |
| ------------- | --------------------------------------- |
| Imagem        | Exibir imagem padrão                    |
| Vídeo         | Exibir miniatura padrão                 |
| Áudio         | Player desabilitado                     |
| Download      | Botão desabilitado                      |
| JSON inválido | Página amigável preservando a navegação |

---

# 19. Descoberta de Conteúdo

O Portal deve favorecer navegação contínua.

Sempre que possível:

- qualquer conteúdo deve conduzir a outros conteúdos relacionados;
- a Home deve permitir alcançar qualquer conteúdo em aproximadamente quatro cliques ou menos;
- os relacionamentos devem ser definidos pelos dados.

---

## Bairro Mágico e Arcade

A rota do Bairro abre a experiência HTML5 dentro do Portal e oferece uma lista acessível de locais e destinos. A navegação global continua disponível. O menu **Jogos** e o **Arcade** apontam para o catálogo oficial do 777 Minigames. Fichas de projetos podem oferecer um link de partida oficial.

# 20. Responsabilidades deste Documento

Este documento define exclusivamente:

- páginas existentes;
- finalidade de cada página;
- composição geral;
- responsabilidades;
- organização estrutural.
