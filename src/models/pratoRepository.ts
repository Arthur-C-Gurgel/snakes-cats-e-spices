import Prato from "../entities/pratoEntity";
import { readFile, writeFile, mkdir } from "fs/promises";

export class pratoRepository {
    private pratosFile: string;
    private directory: string;

    constructor(
        pratosFile: string = "data/pratos.json",
        directory: string = "data"
    ) {
        this.pratosFile = pratosFile;
        this.directory = directory;
    }

    private async loadPratos(): Promise<Prato[]> {
        try {
            const content = await readFile(this.pratosFile, "utf-8");
            return JSON.parse(content);
        } catch {
            console.log("pratoRepository loadPratos() | Nenhum prato cadastrado.");
            await this.savePratos([]);
            return [];
        }
    }

    private async savePratos(pratos: Prato[]): Promise<void> {
        try {
            await writeFile(
                this.pratosFile,
                JSON.stringify(pratos, null, 2)
            );
        } catch {
            await mkdir(this.directory, { recursive: true });

            await writeFile(
                this.pratosFile,
                JSON.stringify(pratos, null, 2)
            );
        }
    }

    async cadastrar(prato: Prato): Promise<Prato> {
        const pratos = await this.loadPratos();

        const nextID =
            (pratos.length > 0 ? pratos[pratos.length - 1].id : 0) + 1;

        prato.id = nextID;

        pratos.push(prato);

        await this.savePratos(pratos);

        return prato;
    }

    async listar(): Promise<Prato[]> {
        return await this.loadPratos();
    }

    async remover(id: number): Promise<boolean> {
        const pratos = await this.loadPratos();

        const index = pratos.findIndex(p => p.id === id);

        if (index === -1) {
            return false;
        }

        pratos.splice(index, 1);

        await this.savePratos(pratos);

        return true;
    }
}