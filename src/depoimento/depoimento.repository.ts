import { Injectable } from "@nestjs/common";
import { DepoimentoEntity } from "./depoimento.entity";

@Injectable()
export class DepoimentoRepository {
    private depoimentos: DepoimentoEntity[] = [];

    async salvar(depoimento) {
        this.depoimentos.push(depoimento);
        console.log(this.depoimentos);
    }

    async listar() {
        return this.depoimentos;
    }

    private buscaPorId(id: string) {
        const possivelDepoimento = this.depoimentos.find(
            depoimentoSalvo => depoimentoSalvo.id === id
        );

        if(!possivelDepoimento) {
            throw new Error('Depoimento não encontrado');
        }

        return possivelDepoimento;
    }

    async atualizar(id: string, novosDados: Partial<DepoimentoEntity>) {
        const depoimento = this.buscaPorId(id);

        Object.entries(novosDados).forEach(([chave, valor]) => {
            if(chave === id) {
                return;
            }

            depoimento[chave] = valor;
        })

        return depoimento;
    }

    async remove(id: string) {
        const depoimento = this.buscaPorId(id);
        this.depoimentos = this.depoimentos.filter(
            depoimentoSalvo => depoimentoSalvo.id !== id
        );

        return depoimento
    }
}