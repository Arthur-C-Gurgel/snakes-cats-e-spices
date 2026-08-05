class Mesa {
    numero: number;

    capacidade: number;

    ocupada: boolean;

    constructor(numero: number, capacidade: number, ocupada: boolean) {
        this.numero = numero;

        this.capacidade = capacidade;

        this.ocupada = ocupada;
    }
}

export default Mesa;