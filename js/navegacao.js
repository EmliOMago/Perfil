const Navegacao = {

    rotaAtual: null,

    rotas: new Map(),

    inicializar() {

        this.registrarRotas();

    },

    registrarRotas() {

        this.registrar("", this.renderizarHome.bind(this));
        this.registrar("home", this.renderizarHome.bind(this));

        this.registrar("perfil", this.renderizarPlaceholder.bind(this));
        this.registrar("jogos", this.renderizarPlaceholder.bind(this));
        this.registrar("jogo", this.renderizarPlaceholder.bind(this));
        this.registrar("musicas", this.renderizarPlaceholder.bind(this));
        this.registrar("videos", this.renderizarPlaceholder.bind(this));
        this.registrar("galeria", this.renderizarPlaceholder.bind(this));
        this.registrar("noticias", this.renderizarPlaceholder.bind(this));
        this.registrar("pesquisa", this.renderizarPlaceholder.bind(this));

    },

    registrar(nome, callback) {

        this.rotas.set(nome, callback);

    },

    async processarRota() {

        const hash = window.location.hash.replace(/^#/, "");

        const partes = hash.split("/").filter(Boolean);

        const rota = partes[0] || "home";

        this.rotaAtual = rota;

        const renderizador =
            this.rotas.get(rota) ??
            this.renderizar404.bind(this);

        await renderizador(partes);

        this.atualizarMenu();

    },

    navegar(rota) {

        window.location.hash = rota;

    },

    atualizarMenu() {

        document
            .querySelectorAll(".menu__link")
            .forEach(link => {

                const destino =
                    (link.dataset.rota || "")
                        .replace(/^#/, "");

                link.classList.toggle(
                    "menu__link--ativo",
                    destino === this.rotaAtual
                );

            });

    },

    atualizarBreadcrumbs(itens = []) {

        const container =
            document.getElementById("breadcrumbs");

        if (!container) {
            return;
        }

        container.replaceChildren();

        const lista = document.createElement("nav");
        lista.className = "breadcrumbs";

        itens.forEach((item, indice) => {

            const elemento =
                document.createElement("span");

            elemento.className = "breadcrumbs__item";
            elemento.textContent = item;

            lista.appendChild(elemento);

            if (indice < itens.length - 1) {

                const separador =
                    document.createElement("span");

                separador.className =
                    "breadcrumbs__separador";

                separador.textContent = "›";

                lista.appendChild(separador);

            }

        });

        container.appendChild(lista);

    },

    async renderizarHome() {

        const conteudo =
            document.getElementById("conteudo");

        if (!conteudo) {
            return;
        }

        conteudo.innerHTML = `
            <section class="pagina-home">

                <section class="home-destaque card">
                    <h2>Portal Emli O'Mago</h2>
                    <p>
                        Conteúdo carregado dinamicamente.
                    </p>
                </section>

                <section class="home-secao">
                </section>

            </section>
        `;

        this.atualizarBreadcrumbs([
            "Home"
        ]);

    },

    async renderizarPlaceholder(partes) {

        const conteudo =
            document.getElementById("conteudo");

        if (!conteudo) {
            return;
        }

        const pagina = partes[0];

        conteudo.innerHTML = `
            <section class="card">
                <h2>${pagina}</h2>
                <p>
                    Conteúdo placeholder.
                </p>
            </section>
        `;

        this.atualizarBreadcrumbs([
            "Home",
            pagina
        ]);

    },

    async renderizar404() {

        const conteudo =
            document.getElementById("conteudo");

        if (!conteudo) {
            return;
        }

        conteudo.innerHTML = `
            <section class="pagina-404">

                <h2>Página não encontrada</h2>

                <p>
                    O conteúdo solicitado não existe.
                </p>

            </section>
        `;

        this.atualizarBreadcrumbs([
            "404"
        ]);

    }

};

export { Navegacao };