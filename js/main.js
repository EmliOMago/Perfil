import { Loader } from "./loader.js";
import { I18N } from "./i18n.js";
import { Componentes } from "./componentes.js";
import { Navegacao } from "./navegacao.js";
import { Pesquisa } from "./pesquisa.js";
import { Player } from "./player.js";

const Portal = {

    iniciado: false,

    async iniciar() {

        if (this.iniciado) {
            return;
        }

        this.iniciado = true;

        this.obterElementos();

        await Loader.inicializar();

        await I18N.inicializar();

        Componentes.inicializar();

        Pesquisa.inicializar();

        Player.inicializar();

        Navegacao.inicializar();

        this.configurarEventos();

        await this.carregarPortal();

    },

    obterElementos() {

        this.elementos = {

            app: document.getElementById("app"),

            cabecalho: document.getElementById("cabecalho"),

            navegacao: document.getElementById("barra-navegacao"),

            conteudo: document.getElementById("conteudo"),

            painelEsquerdo: document.getElementById("painel-esquerdo"),

            painelDireito: document.getElementById("painel-direito"),

            breadcrumbs: document.getElementById("breadcrumbs"),

            rodape: document.getElementById("informacoes-rodape")

        };

    },

    configurarEventos() {

        window.addEventListener(
            "hashchange",
            () => Navegacao.processarRota()
        );

        window.addEventListener(
            "popstate",
            () => Navegacao.processarRota()
        );

        window.addEventListener(
            "resize",
            () => Componentes.redimensionar()
        );

    },

    async carregarPortal() {

        await Navegacao.processarRota();

    }

};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Portal.iniciar()
            .catch((erro) => {

                console.error(erro);

                const conteudo = document.getElementById("conteudo");

                if (conteudo) {

                    conteudo.innerHTML = `
                        <section class="pagina-404">
                            <h2>Erro ao iniciar o portal</h2>
                            <p>Não foi possível concluir a inicialização.</p>
                        </section>
                    `;

                }

            });

    }
);

export default Portal;