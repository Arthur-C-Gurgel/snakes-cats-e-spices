class Pedido {
    id: number;

    mesa: number;

    itens: string[];

    status: string;

    constructor(id: number, mesa: number, itens: string[], status: string) {
        this.id = id;

        this.mesa = mesa;

        this.itens = itens;

        this.status = status;
    }
}

export default Pedido;