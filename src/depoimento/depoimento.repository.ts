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

    private buscaPorNome(nome: string) {
        const possivelDepoimento = this.depoimentos.find(
            depoimentoSalvo => depoimentoSalvo.nome === nome
        );

        if(!possivelDepoimento) {
            throw new Error('Depoimento não encontrado');
        }

        return possivelDepoimento;
    }

    async atualizar(nome: string, novosDados: Partial<DepoimentoEntity>) {
        const depoimento = this.buscaPorNome(nome);

        Object.entries(novosDados).forEach(([chave, valor]) => {
            if(chave === nome) {
                return;
            }

            depoimento[chave] = valor;
        })

        return depoimento;
    }

    async remove(nome: string) {
        const depoimento = this.buscaPorNome(nome);
        this.depoimentos = this.depoimentos.filter(
            depoimentoSalvo => depoimentoSalvo.nome !== nome
        );

        return depoimento
    }
}