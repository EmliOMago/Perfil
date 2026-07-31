const Pesquisa = {

    indice: [],

    resultados: [],

    inicializar() {

        this.indice = [];
        this.resultados = [];

    },

    definirIndice(indice = []) {

        this.indice = Array.isArray(indice)
            ? indice
            : [];

    },

    pesquisar(texto = "", filtros = {}) {

        const termo = texto
            .trim()
            .toLowerCase();

        let resultados = [...this.indice];

        if (termo.length > 0) {

            resultados = resultados.filter(item =>
                this.corresponde(item, termo)
            );

        }

        resultados = this.aplicarFiltros(
            resultados,
            filtros
        );

        this.resultados = resultados;

        return resultados;

    },

    corresponde(item, termo) {

        const campos = [

            item.titulo,
            item.subtitulo,
            item.descricao,
            item.tipo,
            item.categoria

        ];

        return campos.some(campo =>

            typeof campo === "string" &&
            campo.toLowerCase().includes(termo)

        );

    },

    aplicarFiltros(lista, filtros) {

        let resultado = [...lista];

        for (const [campo, valor] of Object.entries(filtros)) {

            if (
                valor === undefined ||
                valor === null ||
                valor === ""
            ) {
                continue;
            }

            resultado = resultado.filter(item =>

                item[campo] === valor

            );

        }

        return resultado;

    },

    ordenar(lista, campo = "titulo", crescente = true) {

        return [...lista].sort((a, b) => {

            const valorA = a[campo] ?? "";
            const valorB = b[campo] ?? "";

            const comparacao = String(valorA)
                .localeCompare(
                    String(valorB),
                    undefined,
                    {
                        numeric: true,
                        sensitivity: "base"
                    }
                );

            return crescente
                ? comparacao
                : -comparacao;

        });

    },

    obterResultados() {

        return [...this.resultados];

    },

    limpar() {

        this.resultados = [];

    }

};

export { Pesquisa };