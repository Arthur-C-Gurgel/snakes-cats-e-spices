import User from "../entities/clienteEntity";
import { readFile, writeFile, mkdir } from "fs/promises";

export class UserRepository {
    private usersFile: string;
    private directory: string;

    constructor(
        usersFile: string = "data/users.json",
        directory: string = "data"
    ) {
        this.usersFile = usersFile;
        this.directory = directory;
    }

    private async loadUsers(): Promise<User[]> {
        try {
            const content = await readFile(this.usersFile, "utf-8");
            return JSON.parse(content);
        } catch {
            await this.saveUsers([]);
            return [];
        }
    }

    private async saveUsers(users: User[]): Promise<void> {
        try {
            await writeFile(
                this.usersFile,
                JSON.stringify(users, null, 2)
            );
        } catch {
            await mkdir(this.directory, { recursive: true });

            await writeFile(
                this.usersFile,
                JSON.stringify(users, null, 2)
            );
        }
    }

    async cadastrar(user: User): Promise<User> {
        const users = await this.loadUsers();

        const nextID = (users.at(-1)?.id ?? 0) + 1;

        user.id = nextID;

        users.push(user);

        await this.saveUsers(users);

        return user;
    }

    async listar(): Promise<User[]> {
        return await this.loadUsers();
    }

    async buscarEmail(email: string): Promise<User | undefined> {
        const users = await this.loadUsers();

        return users.find(
            (user) => user.email.toLowerCase() === email.toLowerCase()
        );
    }

    async remover(id: number): Promise<boolean> {
        const users = await this.loadUsers();

        const index = users.findIndex((user) => user.id === id);

        if (index === -1) {
            return false;
        }

        users.splice(index, 1);

        await this.saveUsers(users);

        return true;
    }
}