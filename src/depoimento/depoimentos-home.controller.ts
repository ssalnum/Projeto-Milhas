import { Controller, Get } from "@nestjs/common";
import { DepoimentoRepository } from "./depoimento.repository";
import { ListaDepoimentosHomeDTO } from "./dto/listaDepoimentosHome.dto";

@Controller('/depoimentos-home')
export class DepoimentosHomeController {

    constructor(private depoimentoRepository: DepoimentoRepository){}

    @Get()
    async listaDepoimentos() {
        const depoimentosSalvos = await this.depoimentoRepository.listar();
        const tresDepoimentos = this.tresDepoimentos(depoimentosSalvos)

        return tresDepoimentos;
    }

    private tresDepoimentos(depoimentosSalvos){
        let depoimentos: ListaDepoimentosHomeDTO[] = [];

        for(let i=0; i<3; i++) {
            if(depoimentosSalvos[i]){
                depoimentos.push(new ListaDepoimentosHomeDTO(
                    depoimentosSalvos[i].foto,
                    depoimentosSalvos[i].depoimento,
                    depoimentosSalvos[i].nome,
                ))
            }
        }
        return depoimentos
    }
}