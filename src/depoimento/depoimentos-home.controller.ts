import { Controller, Get } from "@nestjs/common";
import { DepoimentoRepository } from "./depoimento.repository";
import { ListaDepoimentosHomeDTO } from "./dto/listaDepoimentosHome.dto";
import { DepoimentoEntity } from "./depoimento.entity";

@Controller('/depoimentos-home')
export class DepoimentosHomeController {

    constructor(private depoimentoRepository: DepoimentoRepository) { }

    @Get()
    async listaDepoimentos() {
        const depoimentosSalvos = await this.depoimentoRepository.listar();
        const tresDepoimentos = this.tresDepoimentos(depoimentosSalvos)

        return tresDepoimentos;
    }

    private tresDepoimentos(depoimentosSalvos: DepoimentoEntity[]) {
        let depoimentos: ListaDepoimentosHomeDTO[] = [];

        const min = 0;
        let max = 3;
        if(depoimentosSalvos.length > 3)
            max = depoimentosSalvos.length;
        const quantidade = 3;

        const numerosGerados = this.geraNumerosUnicos(min, max, quantidade);
        console.log(depoimentos)

        for (let i = 0; i < 3; i++) {
            if (depoimentosSalvos[i]) {
                depoimentos.push(new ListaDepoimentosHomeDTO(
                    depoimentosSalvos[numerosGerados[i]].foto,
                    depoimentosSalvos[numerosGerados[i]].depoimento,
                    depoimentosSalvos[numerosGerados[i]].nome,
                ))
            }
        }
        return depoimentos
    }

    private geraNumerosUnicos(min: number, max: number = 3, quantidade: number) {
        const numerosUnicos = new Set();
        const numerosGerados = [];

        while (numerosUnicos.size < quantidade) {
            const numeroAleatorio = Math.floor(Math.random() * (max - min) + min);
            console.log('numero aleatorio - '+numeroAleatorio)

            if (!numerosUnicos.has(numeroAleatorio)) {
                numerosUnicos.add(numeroAleatorio);
                numerosGerados.push(numeroAleatorio);
            }
            console.log('numeros unicos - '+numerosUnicos)
            console.log('numeros unicos size - '+numerosUnicos.size)
        }

        return numerosGerados;
    }
}