import { Controller, Get } from "@nestjs/common";
import { DepoimentoRepository } from "./depoimento.repository";

@Controller('/depoimentos-home')
export class DepoimentosHomeController {

    constructor(private depoimentoRepository: DepoimentoRepository){}

    @Get()
    async listaDepoimentos() {
        const depoimentosSalvos = await this.depoimentoRepository.listar();
        return depoimentosSalvos;
    }
}