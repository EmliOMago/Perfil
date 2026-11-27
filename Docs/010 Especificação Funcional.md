# 010 - Especificação Funcional

**Portal Emli O'Mago**

**Versão:** 1.0  
**Status:** Vigente

---

# 1. Objetivo

Este documento define o comportamento funcional do Portal Emli O'Mago, estabelecendo as regras de operação da aplicação, a interação entre interface e dados, o comportamento esperado diante de diferentes estados do sistema e os requisitos funcionais que devem ser observados por qualquer implementação.

Este documento não define a estrutura das páginas (Documento 007), a biblioteca de componentes (Documento 008) nem a arquitetura de navegação (Documento 009).

---

# 2. Princípios Funcionais

Toda funcionalidade do Portal deve respeitar os princípios arquiteturais do projeto.

Em especial:

- arquitetura orientada a dados;
- páginas e experiências HTML5 compartilham a mesma base de dados;
- componentes reutilizáveis;
- layouts definidos pelos dados;
- baixo acoplamento;
- simplicidade;
- desempenho;
- acessibilidade;
- compatibilidade com GitHub Pages.

As funcionalidades devem ser implementadas de forma genérica, evitando dependências de tipos específicos de conteúdo.

---

# 3. Inicialização

Ao ser carregado, o Portal deve:

1. carregar a configuração inicial;
2. restaurar preferências persistidas;
3. identificar a rota solicitada;
4. carregar os dados necessários;
5. montar a interface correspondente;
6. restaurar o contexto da navegação, quando disponível.

A interface deve tornar-se utilizável assim que houver dados suficientes para interação.

---

# 4. Carregamento de Dados

Todo carregamento deve ocorrer a partir da base de dados oficial do Portal.

Os dados devem ser interpretados como a fonte de verdade da aplicação.

O código da interface não deve conter conteúdo fixo que possa ser representado pelos arquivos de dados.

---

# 5. Construção da Interface

A interface deve ser construída dinamicamente a partir dos dados carregados.

Em especial, os seguintes elementos devem ser determinados pelos dados:

- seções;
- ordem das seções;
- relacionamentos;
- layouts;
- componentes utilizados;
- conteúdos apresentados.

A ausência de determinado conteúdo não deve exigir tratamento específico no código.

---

# 6. Construção das Páginas

Cada página deve ser composta pela combinação de:

- estrutura permanente da interface;
- componentes oficiais;
- dados do conteúdo atual;
- relacionamentos disponíveis.

Nenhuma página deve depender de implementação exclusiva quando puder utilizar componentes reutilizáveis.

---

# 7. Pesquisa

A pesquisa deve localizar conteúdos disponíveis na base de dados.

Os resultados devem substituir apenas o conteúdo do painel principal.

Durante a pesquisa devem permanecer preservados:

- cabeçalho;
- navegação lateral;
- player;
- contexto geral da aplicação.

---

# 8. Filtros

Filtros restringem os conteúdos apresentados.

A aplicação dos filtros não deve alterar:

- a arquitetura da página;
- os componentes utilizados;
- o contexto geral da navegação.

---

# 9. Ordenação

A ordenação modifica apenas a sequência de apresentação.

Ela deve ser aplicada após os filtros e antes da renderização da lista correspondente.

---

# 10. Navegação Contextual

Sempre que existirem relacionamentos suficientes, o Portal deve oferecer navegação contextual.

Podem ser apresentados:

- conteúdos relacionados;
- conteúdos da mesma coleção;
- conteúdos da mesma série;
- conteúdos da mesma categoria;
- recomendações.

A escolha é determinada pelos dados.

---

# 11. Navegação Próximo/Anterior

As ações "Próximo" e "Anterior" devem respeitar exatamente a lista atualmente exibida.

Devem considerar:

- pesquisa;
- filtros;
- ordenação.

Nunca devem utilizar uma sequência fixa baseada na estrutura dos arquivos.

---

# 12. Preservação do Contexto

Sempre que possível, o Portal deve preservar:

- página atual;
- posição da rolagem;
- pesquisa;
- filtros;
- ordenação;
- seção expandida.

O retorno a uma página anteriormente visitada deve restaurar esse contexto.

---

# 13. Conteúdos Relacionados

Os conteúdos relacionados devem ser determinados pelos relacionamentos existentes na base de dados.

A interface não deve impor regras específicas para determinados tipos de conteúdo.

Relacionamentos entre tipos diferentes são permitidos.

---

# 14. Estado das Seções

Quando uma seção estiver prevista na estrutura da página, mas não possuir elementos, ela deve permanecer visível.

A mensagem apresentada deve ser:

> Nenhum conteúdo disponível.

Essa regra preserva consistência visual e estrutural.

---

# 15. Conteúdos em Desenvolvimento

Conteúdos incompletos permanecem acessíveis.

Sempre que aplicável deve ser apresentado o selo:

> Em desenvolvimento

Esse estado não impede navegação nem indexação pelo Portal.

---

# 16. Tratamento de Recursos Ausentes

Quando um recurso não puder ser carregado, a aplicação deve manter o restante da interface operacional.

Devem ser utilizados os seguintes comportamentos padronizados:

| Recurso           | Comportamento                           |
| ----------------- | --------------------------------------- |
| Imagem            | Exibir imagem padrão                    |
| Vídeo             | Exibir miniatura padrão                 |
| Áudio             | Player desabilitado                     |
| Download          | Botão desabilitado                      |
| JSON indisponível | Página amigável preservando a navegação |

Nenhuma dessas situações deve interromper a navegação do usuário.

---

# 17. Atualização da Interface

Sempre que tecnicamente adequado, a interface deve atualizar apenas os elementos afetados pela alteração dos dados.

Entretanto, a arquitetura permite recarga completa da página quando isso representar uma solução mais simples, confiável ou de melhor manutenção.

A implementação não depende obrigatoriamente de atualização parcial.

---

# 18. Player

O player deve permanecer disponível durante toda a navegação.

Na primeira versão ele controla apenas músicas.

A arquitetura deve permitir expansão futura para outros tipos de mídia sem alterações estruturais.

---

# 19. Preferências Persistidas

O Portal deve persistir apenas:

- idioma;
- informações necessárias para restauração da navegação.

A persistência deve minimizar armazenamento desnecessário.

---

# 20. Responsividade

Em dispositivos móveis:

- controles laterais aparecem temporariamente;
- desaparecem automaticamente após curto intervalo;
- a navegação ocorre prioritariamente por gestos.

A funcionalidade disponível deve permanecer equivalente à versão para desktop.

---

# 21. Acessibilidade

Todas as funcionalidades devem ser plenamente utilizáveis por usuários que utilizem recursos de acessibilidade.

A implementação deve garantir, sempre que aplicável:

- navegação por teclado;
- foco visível;
- identificação textual dos elementos;
- compatibilidade com leitores de tela;
- contraste adequado;
- independência exclusiva de cor ou ícones para transmitir informação.

---

# 22. Desempenho

As funcionalidades devem priorizar:

- carregamentos reduzidos;
- reutilização de componentes;
- processamento sob demanda;
- baixo consumo de memória;
- redução de operações redundantes.

A implementação deve evitar reconstruções completas da interface quando não forem necessárias.

---

# 23. Compatibilidade

A implementação deve permanecer compatível com:

- GitHub Pages;
- navegadores modernos;
- dispositivos móveis e desktop;
- interação por teclado, ponteiro e toque, com lista acessível de locais.

A base compartilhada mantém os mesmos IDs e destinos nas páginas e no cenário do Bairro. O contêiner libera recursos da experiência ao sair da sua rota. Nos estados de erro, o visitante pode usar os destinos em HTML e continuar no Portal.

---

# 24. Evolução Funcional

Novos tipos de conteúdo devem integrar-se ao Portal sem exigir alterações estruturais na arquitetura funcional.

Novas funcionalidades devem reutilizar, sempre que possível:

- componentes existentes;
- mecanismos de navegação existentes;
- estrutura de dados existente.

A evolução do sistema deve ocorrer de forma incremental e preservar compatibilidade retroativa sempre que viável.

---

# 25. Responsabilidades deste Documento

Este documento define exclusivamente:

- comportamento funcional da aplicação;
- ciclo de carregamento;
- construção dinâmica da interface;
- pesquisa;
- filtros;
- ordenação;
- preservação de contexto;
- tratamento de recursos ausentes;
- atualização da interface;
- requisitos de desempenho;
- requisitos de acessibilidade;
- regras gerais de funcionamento.
