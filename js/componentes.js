const Componentes = {

    componentes: new Map(),

    inicializar() {

        this.registrarPadroes();

    },

    registrarPadroes() {

        this.registrar("card", this.renderizarCard.bind(this));
        this.registrar("botao", this.renderizarBotao.bind(this));
        this.registrar("tag", this.renderizarTag.bind(this));
        this.registrar("lista", this.renderizarLista.bind(this));
        this.registrar("galeria", this.renderizarGaleria.bind(this));

    },

    registrar(nome, renderizador) {

        this.componentes.set(nome, renderizador);

    },

    criar(nome, propriedades = {}) {

        if (!this.componentes.has(nome)) {
            throw new Error(`Componente não registrado: ${nome}`);
        }

        return this.componentes.get(nome)(propriedades);

    },

    renderizar(destino, componente) {

        if (!destino) {
            return;
        }

        destino.appendChild(componente);

    },

    limpar(destino) {

        if (destino) {
            destino.replaceChildren();
        }

    },

    renderizarCard(config = {}) {

        const card = document.createElement("article");
        card.className = "card";

        if (config.clicavel) {
            card.classList.add("card--clicavel");
        }

        if (config.titulo) {

            const cabecalho = document.createElement("header");
            cabecalho.className = "card__cabecalho";

            const titulo = document.createElement("h2");
            titulo.className = "card__titulo";
            titulo.textContent = config.titulo;

            cabecalho.appendChild(titulo);

            card.appendChild(cabecalho);

        }

        if (config.subtitulo) {

            const subtitulo = document.createElement("p");
            subtitulo.className = "card__subtitulo";
            subtitulo.textContent = config.subtitulo;

            card.appendChild(subtitulo);

        }

        const conteudo = document.createElement("div");
        conteudo.className = "card__conteudo";

        if (config.conteudo instanceof Node) {

            conteudo.appendChild(config.conteudo);

        } else if (typeof config.conteudo === "string") {

            conteudo.innerHTML = config.conteudo;

        }

        card.appendChild(conteudo);

        return card;

    },

    renderizarBotao(config = {}) {

        const botao = document.createElement("button");

        botao.type = config.tipo ?? "button";

        botao.className = "botao";

        if (config.classe) {
            botao.classList.add(config.classe);
        }

        botao.textContent = config.texto ?? "";

        if (typeof config.acao === "function") {
            botao.addEventListener("click", config.acao);
        }

        return botao;

    },

    renderizarTag(config = {}) {

        const tag = document.createElement("span");

        tag.className = "tag";

        tag.textContent = config.texto ?? "";

        return tag;

    },

    renderizarLista(config = {}) {

        const lista = document.createElement("div");

        lista.className = "lista";

        (config.itens ?? []).forEach(item => {

            if (item instanceof Node) {
                lista.appendChild(item);
            }

        });

        return lista;

    },

    renderizarGaleria(config = {}) {

        const galeria = document.createElement("div");

        galeria.className = "galeria";

        (config.itens ?? []).forEach(item => {

            if (item instanceof Node) {
                galeria.appendChild(item);
            }

        });

        return galeria;

    },

    redimensionar() {

        window.dispatchEvent(
            new CustomEvent("portal:redimensionado")
        );

    }

};

export { Componentes };