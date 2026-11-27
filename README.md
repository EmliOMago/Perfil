# Portal Emli O’Mago

O portal é estático. O menu **Jogos**, o Arcade e as fichas que referenciam o catálogo levam à rota interna `#/jogos`. A página incorpora o catálogo público do 777, mantém o cabeçalho e o player do Portal e oferece retorno ao conteúdo anterior. **Entrar no 777** e os links oficiais de partida nas fichas abrem uma nova aba. O catálogo externo também pode ser aberto em outra aba se a incorporação estiver indisponível.

## Publicação no GitHub Pages

1. Extraia o ZIP e copie o **conteúdo da pasta `Perfil`** para a raiz da sua cópia de trabalho. Mantenha `.nojekyll` junto de `index.html`.
2. Confira as alterações em uma branch de trabalho antes de integrá-las à branch de publicação. Os arquivos da versão anterior que sobrarem na pasta podem ser identificados na revisão.
3. Em **Settings → Pages**, selecione **Deploy from a branch** e a pasta **/(root)** da branch desejada. A branch padrão encontrada no repositório é `main`. Se já houver um fluxo de publicação, revise o destino antes de alterá-lo.
4. Depois da publicação, confira Início, Projetos, Jogos e Bairro Mágico. Abra também um link interno copiado em outra aba e recarregue-o.

[Repositório Perfil](https://github.com/EmliOMago/Perfil) · [Documentação do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Teste local

Na pasta `Perfil`, execute `python scripts/servir.py` e abra **http://127.0.0.1:4173/**. Use um servidor HTTP para que o navegador possa carregar módulos e JSON. Rode `python scripts/validar.py` antes de publicar alterações nos dados.

## Atualização de conteúdo

Os arquivos em `data/` são a cópia inicial do catálogo. Para usar **ArquivosNoGitHub**, publique a árvore `data/` completa, incluindo `media/`, em uma URL pública com CORS e ajuste `baseDados` no `config.json`. `baseReserva` aponta para a cópia que acompanha o portal. Mantenha índices e mídia da mesma revisão nas duas bases. Use IDs estáveis ao cadastrar obras e atualize `indice.json` e `projetos.json` conforme o tipo. Os schemas estão em `data/schemas/`.

Os dicionários de interface estão em `data/idiomas/`. O conteúdo começa em português. Para traduzir um registro, adicione `traducoes.en` e os campos traduzidos no registro e no índice quando usados pela busca.

Use `unityUrl` em `config.json` para adicionar o acesso a um build Unity WebGL. A maquete 3D atual funciona no navegador e usa os destinos de `data/locais.json`. O guia percorre esses locais sem IA. A opção experimental conversa em português com o modelo local do planejamento, via WebGPU e download voluntário. A inferência depende do navegador e do hardware. A conversa fica em memória durante a visita. A disponibilidade do modelo externo e a inferência em hardware compatível requerem validação própria.

Para habilitar o player, inclua as faixas autorizadas em `data/media/` e cadastre registros com `id`, `ativo`, `titulo` e `arquivo` no `conteudo` de `data/musicas.json`. As imagens usadas na interface e no catálogo foram extraídas do portfólio fornecido. O e-mail profissional vem do documento de identidade do autor.
