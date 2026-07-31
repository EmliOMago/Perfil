const Loader = {

    cache: new Map(),

    manifesto: null,

    configuracao: {
        basePerfil: ".",
        baseArquivos: "",
        timeout: 30000
    },

    async inicializar() {

        try {

            this.manifesto = await this.carregarJSON("manifest.json", false);

        } catch {

            this.manifesto = null;

        }

    },

    async carregarJSON(caminho, usarCache = true) {

        if (usarCache && this.cache.has(caminho)) {
            return this.cache.get(caminho);
        }

        const url = this.montarURL(caminho);

        const resposta = await fetch(url, {
            cache: "no-cache"
        });

        if (!resposta.ok) {
            throw new Error(
                `Falha ao carregar "${caminho}" (${resposta.status})`
            );
        }

        const json = await resposta.json();

        if (usarCache) {
            this.cache.set(caminho, json);
        }

        return json;

    },

    async carregarTexto(caminho) {

        const resposta = await fetch(
            this.montarURL(caminho),
            {
                cache: "no-cache"
            }
        );

        if (!resposta.ok) {
            throw new Error(
                `Falha ao carregar "${caminho}"`
            );
        }

        return resposta.text();

    },

    async carregarBinario(caminho) {

        const resposta = await fetch(
            this.montarURL(caminho),
            {
                cache: "no-cache"
            }
        );

        if (!resposta.ok) {
            throw new Error(
                `Falha ao carregar "${caminho}"`
            );
        }

        return resposta.blob();

    },

    montarURL(caminho) {

        if (
            caminho.startsWith("http://") ||
            caminho.startsWith("https://")
        ) {
            return caminho;
        }

        if (caminho.startsWith("/")) {
            return caminho;
        }

        return `${this.configuracao.basePerfil}/${caminho}`;

    },

    limparCache() {

        this.cache.clear();

    },

    removerDoCache(caminho) {

        this.cache.delete(caminho);

    },

    existeNoCache(caminho) {

        return this.cache.has(caminho);

    },

    obterDoCache(caminho) {

        return this.cache.get(caminho);

    },

    async precarregar(listaArquivos) {

        const tarefas = [];

        for (const arquivo of listaArquivos) {

            tarefas.push(
                this.carregarJSON(
                    arquivo,
                    true
                )
            );

        }

        await Promise.all(tarefas);

    }

};

export { Loader };