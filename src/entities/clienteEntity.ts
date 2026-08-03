class Cliente {
    id: number;

    nome: string;

    email: string;

    senhaHash: string

    constructor(id: number, nome: string, email: string, senhaHash: string) {
        this.id = id;

        this.nome = nome;

        this.email = email;

        this.senhaHash = senhaHash;
    }
}

export default Cliente;