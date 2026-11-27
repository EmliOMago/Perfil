# 015 — Experiências HTML5 e integração com o 777 Minigames

**Portal Emli O'Mago**  
**Versão:** 1.0  
**Status:** Vigente  
**Data:** 2026-11-27 (horário de Brasília)

## Plataforma

O Portal e o Bairro Mágico são publicados juntos no GitHub Pages. A base técnica é HTML5, CSS e módulos JavaScript. O cenário desta versão desenha uma maquete tridimensional em Canvas 2D. WebGL nativo é uma opção de renderização em uma revisão futura e depende dos requisitos da cena. O acesso ao Bairro continua disponível pela rota `#/bairro` e o acesso aos seus destinos também é oferecido em uma lista HTML.

## Arquitetura de referência

No 777 Minigames, o TigerGameHost centraliza o ciclo de vida das experiências e os componentes comuns são mantidos em Storybook. O Portal adota o mesmo princípio de composição. Os nomes e interfaces abaixo são o contrato próprio do Portal.

| Parte | Responsabilidade |
| --- | --- |
| Interface do Portal | Cabeçalho, rotas, histórico, preferências, player e navegação acessível. |
| Contêiner de experiências | Carregar o módulo da rota, exibir os estados de carregamento e erro, fornecer serviços compartilhados e liberar a experiência ao sair. |
| Módulo de experiência | Renderizar a cena, tratar entradas, selecionar locais e solicitar navegação por ID. |
| Componentes compartilhados | Estados da interface, controles, temas e recursos gráficos reutilizáveis. O Storybook documenta variações e estados durante o desenvolvimento. |
| Base de dados | Registrar locais, conteúdos, links, idiomas e mídia. IDs permanecem estáveis entre páginas e experiências. |

A cena publicada usa os componentes do Portal diretamente. Os serviços de sessão, anúncios e publicação do 777 pertencem ao próprio 777 e são acionados pelos links oficiais.

## Contrato do contêiner

- Uma rota interna seleciona um módulo entre os registrados pelo Portal. A base JSON define conteúdo, destinos e relacionamentos. O carregador resolve os módulos JavaScript pelo registro mantido no código.
- O módulo expõe `mount(elemento, contexto)`. A montagem pode ser assíncrona e devolve uma função de desmontagem. O contexto fornece as operações de leitura e tradução, a navegação por ID e um sinal de cancelamento quando houver trabalho assíncrono.
- O contêiner monta somente a experiência da rota ativa. Se o usuário sair durante o carregamento, o resultado dessa montagem deve ser descartado. Ao desmontar, a experiência libera observadores, eventos, animações, áudio próprio e Workers que tenha iniciado.
- Em caso de erro, o contêiner apresenta um aviso e mantém o acesso aos destinos disponíveis via HTML. O cabeçalho, a navegação e o player do Portal continuam utilizáveis.
- Cada módulo deve tolerar mídias ausentes e usar os IDs oficiais. As ações do guia e do assistente passam pelas mesmas operações de navegação. O guia funciona sem baixar o modelo de IA.

## Jogos e Arcade

| Entrada | Destino |
| --- | --- |
| Menu **Jogos** e local **Arcade** | [Catálogo do 777 Minigames](https://777minigames.com.br/games) |
| Destaque **Tiger Forest Defense** | Ficha no Portal com [entrada oficial da partida](https://777minigames.com.br/play/tiger-forest-defense) e acesso ao catálogo. |
| Outros jogos associados a uma obra | Página oficial cadastrada na base de links. |

Tiger Forest Defense é a referência de integração por link. A partida, seus anúncios e sua inicialização acontecem no domínio do 777. A arquitetura do Portal admite experiências autorais próprias hospedadas pelo mesmo contêiner, caso venham a integrar o Bairro.

## Adoção no código

1. Manter o cenário existente como primeiro módulo hospedado e preservar seus dados e destinos atuais.
2. Extrair do roteador o carregamento e a desmontagem compartilhados das experiências. Usar o contrato acima também nos estados de falha.
3. Remover da configuração e da interface a opção legada de abrir um build externo do Bairro.
4. Documentar em Storybook os componentes realmente reutilizados. Incluir estados de carregamento, falha e navegação acessível, conforme forem integrados.

## Critérios de aceitação

- O Portal abre na raiz ou em um subdiretório do GitHub Pages. Recarregar a rota do Bairro restaura seu acesso, e o botão Voltar preserva o histórico do navegador.
- O código e os recursos do cenário são solicitados ao entrar no Bairro. Entrar, sair e voltar não duplica ouvintes, Workers nem ciclos de renderização.
- Em desktop e celular, o cenário e a lista HTML oferecem os mesmos destinos. A lista funciona por teclado e leitores de tela.
- A falha do módulo visual mantém a lista de locais e navegação do Portal operantes. O guia pode ser usado com a IA indisponível ou desativada.
- O menu Jogos e o Arcade apontam ao catálogo oficial. A ficha de Tiger Forest Defense aponta à partida oficial e ao catálogo, independentemente da disponibilidade da partida.
