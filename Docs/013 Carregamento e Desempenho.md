# 013 — Carregamento e Desempenho

**Portal Emli O'Mago**

**Versão:** 1.0  
**Status:** Vigente

---

# 1. Objetivo

Este documento define as estratégias oficiais de carregamento da base de dados, gerenciamento de cache, atualização da interface e otimização de desempenho do Portal Emli O'Mago.

O objetivo é garantir uma navegação rápida, consistente e escalável, mantendo compatibilidade com GitHub Pages e com a arquitetura orientada a dados.

---

# 2. Princípios

O sistema de carregamento deve obedecer aos seguintes princípios:

- carregamento sob demanda;
- reutilização máxima dos dados carregados;
- baixo consumo de memória;
- independência entre código e dados;
- simplicidade de implementação;
- atualização incremental sempre que vantajosa;
- degradação graciosa em caso de falhas.

---

# 3. Estratégia Geral de Carregamento

O Portal não deve carregar toda a base de dados durante a inicialização.

Os dados devem ser carregados progressivamente conforme forem necessários para a navegação.

A implementação deve minimizar requisições desnecessárias.

---

# 4. Ordem de Carregamento

A sequência recomendada é:

1. configuração global;
2. idioma;
3. índices necessários para a rota atual;
4. conteúdo solicitado;
5. relacionamentos;
6. conteúdos relacionados;
7. recursos complementares.

Cada etapa deve ser independente das seguintes sempre que possível.

---

# 5. Carregamento Assíncrono

O carregamento de arquivos deve ocorrer de forma assíncrona sempre que suportado pela plataforma.

Enquanto os dados estiverem sendo carregados:

- a interface deve permanecer responsiva;
- componentes já disponíveis podem ser utilizados;
- indicadores discretos de carregamento podem ser apresentados.

A aplicação não deve bloquear toda a interface aguardando recursos secundários.

---

# 6. Lazy Loading

Recursos de maior tamanho devem ser carregados apenas quando necessários.

Incluem-se, entre outros:

- imagens;
- galerias;
- áudios;
- vídeos;
- listas extensas.

O carregamento antecipado desses recursos deve ocorrer apenas quando houver benefício comprovado para a navegação.

---

# 7. Pré-Carregamento

O Portal pode realizar pré-carregamento de recursos com alta probabilidade de uso.

Exemplos:

- próximo conteúdo;
- conteúdo anterior;
- itens relacionados;
- miniaturas imediatamente visíveis.

O pré-carregamento nunca deve comprometer a navegação atual.

---

# 8. Sistema de Cache

A utilização de cache é obrigatória.

Seu objetivo é reduzir:

- tempo de carregamento;
- quantidade de requisições;
- consumo de banda;
- processamento redundante.

A estratégia de cache deve permanecer transparente para o usuário.

---

# 9. Política de Cache

Arquivos podem permanecer em cache enquanto permanecerem válidos.

A invalidação deve considerar:

- alteração da versão dos dados;
- alteração da versão do schema;
- atualização explícita da aplicação;
- limpeza manual do cache pelo navegador.

O código não deve assumir que determinado arquivo permanecerá indefinidamente em cache.

---

# 10. Reutilização de Dados

Quando um arquivo já estiver carregado e válido, ele deve ser reutilizado.

Não devem ocorrer novas requisições para dados já disponíveis, salvo quando houver necessidade de atualização.

---

# 11. Atualização da Interface

Sempre que possível, apenas os componentes afetados por uma alteração de dados devem ser atualizados.

Entretanto, a arquitetura admite recarga completa da página quando isso representar uma solução:

- mais simples;
- mais confiável;
- mais fácil de manter.

---

# 12. Recuperação de Falhas

Caso um arquivo não possa ser carregado:

- a navegação deve permanecer funcional;
- conteúdos já disponíveis devem continuar acessíveis;
- deve ser apresentada mensagem amigável ao usuário;
- componentes dependentes devem assumir seu estado de indisponibilidade.

Uma falha localizada não deve impedir o funcionamento do restante do Portal.

---

# 13. Recursos Ausentes

Devem ser utilizados os seguintes comportamentos padronizados:

| Recurso  | Comportamento                           |
| -------- | --------------------------------------- |
| Imagem   | Imagem padrão                           |
| Vídeo    | Miniatura padrão                        |
| Áudio    | Player desabilitado                     |
| Download | Botão desabilitado                      |
| JSON     | Página amigável preservando a navegação |

---

# 14. Consumo de Memória

A implementação deve minimizar o uso de memória.

Sempre que apropriado:

- recursos não utilizados podem ser descartados;
- objetos temporários devem ser reutilizados;
- grandes coleções podem ser carregadas parcialmente.

A estratégia adotada não deve alterar o comportamento funcional definido pelos demais documentos.

---

# 15. Desempenho

Toda implementação deve priorizar:

- baixa latência de navegação;
- poucas requisições;
- carregamento progressivo;
- reutilização de recursos;
- redução de processamento redundante.

O desempenho deve ser considerado requisito arquitetural, e não apenas uma otimização.

---

# 16. Compatibilidade

As estratégias definidas neste documento devem produzir comportamento equivalente nas implementações:

- HTML;
- Unity.

Diferenças internas de implementação são permitidas desde que o comportamento observado pelo usuário permaneça equivalente.

---

# 17. Evolução

Novos mecanismos de carregamento, cache ou otimização podem ser incorporados futuramente desde que:

- preservem os contratos definidos pela base de dados;
- não alterem a arquitetura orientada a dados;
- mantenham compatibilidade com as implementações existentes;
- não exijam modificações estruturais na documentação anterior.

---

# 18. Responsabilidades deste Documento

Este documento define:

- estratégia de carregamento;
- carregamento assíncrono;
- lazy loading;
- pré-carregamento;
- sistema de cache;
- política de cache;
- atualização incremental;
- recuperação de falhas;
- requisitos de desempenho;
- gerenciamento de memória.
