class Prato {
    name: string;
    preco: number;
    descricao: string;
    id?: number;

    constructor(
        name: string,
        preco: number,
        descricao: string,
        id?: number
    ) {
        this.name = name;
        this.preco = preco;
        this.descricao = descricao;

        if (id !== undefined) {
            this.id = id;
        }
    }
}

export default Prato;


