const Player = {

    audio: null,

    elementos: {},

    faixaAtual: null,

    listaReproducao: [],

    indiceAtual: -1,

    inicializar() {

        this.audio = new Audio();

        this.obterElementos();

        this.registrarEventos();

        this.atualizarInterface();

    },

    obterElementos() {

        this.elementos = {

            capa: document.getElementById("player-capa"),

            titulo: document.getElementById("player-titulo"),

            subtitulo: document.getElementById("player-subtitulo"),

            controles: document.getElementById("player-controles"),

            progresso: document.getElementById("player-progresso")

        };

    },

    registrarEventos() {

        this.audio.addEventListener(
            "timeupdate",
            () => this.atualizarProgresso()
        );

        this.audio.addEventListener(
            "ended",
            () => this.proximaFaixa()
        );

    },

    definirLista(lista = []) {

        this.listaReproducao = [...lista];

        this.indiceAtual = -1;

    },

    async reproduzir(indice) {

        if (
            indice < 0 ||
            indice >= this.listaReproducao.length
        ) {
            return;
        }

        this.indiceAtual = indice;

        this.faixaAtual =
            this.listaReproducao[indice];

        this.audio.src = this.faixaAtual.url;

        this.audio.load();

        await this.audio.play();

        this.atualizarInterface();

    },

    async pausar() {

        this.audio.pause();

    },

    async continuar() {

        await this.audio.play();

    },

    parar() {

        this.audio.pause();

        this.audio.currentTime = 0;

    },

    async proximaFaixa() {

        if (
            this.indiceAtual + 1 >=
            this.listaReproducao.length
        ) {
            return;
        }

        await this.reproduzir(
            this.indiceAtual + 1
        );

    },

    async faixaAnterior() {

        if (
            this.indiceAtual <= 0
        ) {
            return;
        }

        await this.reproduzir(
            this.indiceAtual - 1
        );

    },

    atualizarInterface() {

        if (!this.faixaAtual) {

            if (this.elementos.titulo) {
                this.elementos.titulo.textContent = "";
            }

            if (this.elementos.subtitulo) {
                this.elementos.subtitulo.textContent = "";
            }

            if (this.elementos.capa) {
                this.elementos.capa.innerHTML = "";
            }

            return;

        }

        if (this.elementos.titulo) {
            this.elementos.titulo.textContent =
                this.faixaAtual.titulo ?? "";
        }

        if (this.elementos.subtitulo) {
            this.elementos.subtitulo.textContent =
                this.faixaAtual.artista ?? "";
        }

        if (
            this.elementos.capa &&
            this.faixaAtual.capa
        ) {

            this.elementos.capa.innerHTML = "";

            const imagem =
                document.createElement("img");

            imagem.src = this.faixaAtual.capa;

            imagem.alt =
                this.faixaAtual.titulo ?? "";

            this.elementos.capa.appendChild(imagem);

        }

    },

    atualizarProgresso() {

        if (!this.elementos.progresso) {
            return;
        }

        const duracao =
            this.audio.duration || 0;

        const atual =
            this.audio.currentTime || 0;

        const percentual =
            duracao > 0
                ? (atual / duracao) * 100
                : 0;

        this.elementos.progresso.innerHTML = `
            <div class="player__barra">
                <div
                    class="player__progresso"
                    style="width:${percentual}%"
                ></div>
            </div>
        `;

    }

};

export { Player };