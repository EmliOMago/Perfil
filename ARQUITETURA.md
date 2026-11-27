# Portal Emli O'Mago

A interface pública em HTML, CSS e módulos JavaScript consome uma base JSON em português, com IDs permanentes e traduções opcionais. A cópia em `data/` torna este primeiro checkout executável em isolamento. `config.json` permite migrar a base inteira para ArquivosNoGitHub mantendo os mesmos caminhos e contratos.

As rotas usam `#/tipo/id/slug` para garantir links diretos em subdiretórios do GitHub Pages. Jogos no menu global aponta para o catálogo 777 Minigames. As fichas de obras autorais continuam acessíveis em Projetos. Tiger Forest Defense tem link direto com acesso alternativo ao catálogo.

A página do Bairro usa uma cena 3D independente de Unity, derivada dos locais da própria base, e oferece uma lista acessível e exploração guiada. A configuração aceita a URL de um build Unity WebGL quando esse artefato estiver disponível. A paleta magenta do portfólio orienta a interface HTML, com verde, latão e terracota na visualização do Bairro. Artes e fotografia são recortes do PDF fornecido.

O guia funciona sem downloads adicionais. A opção experimental de conversa usa um Worker e o modelo do planejamento mediante acionamento explícito, com fallback para o guia. A reprodução de áudio usa um elemento persistente e fica indisponível quando a base não contém faixas.
