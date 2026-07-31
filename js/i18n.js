const I18N = {

    idiomaAtual: "pt-BR",

    idiomaPadrao: "pt-BR",

    idiomas: new Map(),

    async inicializar() {

        this.idiomaAtual = this.detectarIdioma();

        await this.carregarIdioma(this.idiomaPadrao);

        if (this.idiomaAtual !== this.idiomaPadrao) {
            await this.carregarIdioma(this.idiomaAtual);
        }

        this.atualizarDocumento();

    },

    detectarIdioma() {

        if (!navigator.language) {
            return this.idiomaPadrao;
        }

        return navigator.language;

    },

    async carregarIdioma(idioma) {

        if (this.idiomas.has(idioma)) {
            return;
        }

        try {

            const modulo = await import("./loader.js");

            const dados = await modulo.Loader.carregarJSON(
                `i18n/${idioma}.json`
            );

            this.idiomas.set(idioma, dados);

        } catch {

            this.idiomas.set(idioma, {});

        }

    },

    traduzir(chave, parametros = {}) {

        const idioma =
            this.idiomas.get(this.idiomaAtual) || {};

        const padrao =
            this.idiomas.get(this.idiomaPadrao) || {};

        let texto =
            idioma[chave] ??
            padrao[chave] ??
            chave;

        for (const [nome, valor] of Object.entries(parametros)) {

            texto = texto.replaceAll(
                `{${nome}}`,
                valor
            );

        }

        return texto;

    },

    atualizarDocumento() {

        document.documentElement.lang =
            this.idiomaAtual;

        document.querySelectorAll("[data-i18n]")
            .forEach((elemento) => {

                const chave =
                    elemento.dataset.i18n;

                elemento.textContent =
                    this.traduzir(chave);

            });

        document.querySelectorAll("[data-i18n-title]")
            .forEach((elemento) => {

                elemento.title =
                    this.traduzir(
                        elemento.dataset.i18nTitle
                    );

            });

        document.querySelectorAll("[data-i18n-placeholder]")
            .forEach((elemento) => {

                elemento.placeholder =
                    this.traduzir(
                        elemento.dataset.i18nPlaceholder
                    );

            });

    },

    async alterarIdioma(idioma) {

        await this.carregarIdioma(idioma);

        this.idiomaAtual = idioma;

        this.atualizarDocumento();

    },

    obterIdiomaAtual() {

        return this.idiomaAtual;

    }

};

export { I18N };