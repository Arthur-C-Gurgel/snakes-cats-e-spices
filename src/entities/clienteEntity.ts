class Cliente {
    id: number;

    nome: string;

    telefone: string;

    email: string;

    constructor(id: number, nome: string, telefone: string, email: string) {
        this.id = id;

        this.nome = nome;

        this.telefone = telefone;

        this.email = email;
    }
}

export default Cliente;