const Utils = {

    gerarId(prefixo = "id") {

        if (window.crypto && crypto.randomUUID) {
            return `${prefixo}-${crypto.randomUUID()}`;
        }

        return `${prefixo}-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 10)}`;

    },

    clonar(objeto) {

        if (typeof structuredClone === "function") {
            return structuredClone(objeto);
        }

        return JSON.parse(JSON.stringify(objeto));

    },

    debounce(funcao, atraso = 300) {

        let temporizador = null;

        return (...argumentos) => {

            clearTimeout(temporizador);

            temporizador = setTimeout(() => {

                funcao(...argumentos);

            }, atraso);

        };

    },

    throttle(funcao, intervalo = 100) {

        let executando = false;

        return (...argumentos) => {

            if (executando) {
                return;
            }

            executando = true;

            funcao(...argumentos);

            setTimeout(() => {

                executando = false;

            }, intervalo);

        };

    },

    formatarData(data, idioma = navigator.language) {

        if (!(data instanceof Date)) {
            data = new Date(data);
        }

        return new Intl.DateTimeFormat(
            idioma,
            {
                dateStyle: "medium"
            }
        ).format(data);

    },

    formatarHora(data, idioma = navigator.language) {

        if (!(data instanceof Date)) {
            data = new Date(data);
        }

        return new Intl.DateTimeFormat(
            idioma,
            {
                timeStyle: "short"
            }
        ).format(data);

    },

    formatarNumero(valor, idioma = navigator.language) {

        return new Intl.NumberFormat(idioma)
            .format(valor);

    },

    formatarPercentual(valor, idioma = navigator.language) {

        return new Intl.NumberFormat(
            idioma,
            {
                style: "percent",
                maximumFractionDigits: 2
            }
        ).format(valor);

    },

    escaparHTML(texto) {

        const elemento = document.createElement("div");

        elemento.textContent = texto;

        return elemento.innerHTML;

    },

    criarElemento(tag, propriedades = {}, filhos = []) {

        const elemento = document.createElement(tag);

        for (const [chave, valor] of Object.entries(propriedades)) {

            if (chave === "class") {

                elemento.className = valor;
                continue;

            }

            if (chave === "text") {

                elemento.textContent = valor;
                continue;

            }

            if (chave === "html") {

                elemento.innerHTML = valor;
                continue;

            }

            elemento.setAttribute(chave, valor);

        }

        for (const filho of filhos) {

            if (filho instanceof Node) {
                elemento.appendChild(filho);
            }

        }

        return elemento;

    },

    limparElemento(elemento) {

        if (!elemento) {
            return;
        }

        elemento.replaceChildren();

    },

    mostrar(elemento) {

        if (elemento) {
            elemento.classList.remove("is-oculto");
        }

    },

    ocultar(elemento) {

        if (elemento) {
            elemento.classList.add("is-oculto");
        }

    },

    alternarVisibilidade(elemento) {

        if (!elemento) {
            return;
        }

        elemento.classList.toggle("is-oculto");

    },

    esperar(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    }

};

export { Utils };