import { Body, Controller, Post, Get, Put, Param, Delete } from "@nestjs/common";
import { DepoimentoRepository } from "./depoimento.repository";
import { CriaDepoimentoDTO } from "./dto/criaDepoimento.dto";
import { DepoimentoEntity } from "./depoimento.entity";
import { ListaDepoimentosDTO } from "./dto/listaDepoimentos.dto";
import { AtualizaDepoimentoDTO } from "./dto/atualizaDepoimento.dto";
import { v4 as uuid } from "uuid"

@Controller('/depoimentos')
export class DepoimentoController {

    constructor(private depoimentoRepository: DepoimentoRepository){}

    @Post()
    async criaDepoimento(@Body() dadosDepoimento: CriaDepoimentoDTO) {
        const depoimentoEntity = new DepoimentoEntity();
        depoimentoEntity.id = uuid()
        depoimentoEntity.foto = dadosDepoimento.foto;
        depoimentoEntity.depoimento = dadosDepoimento.depoimento;
        depoimentoEntity.nome = dadosDepoimento.nome;

        this.depoimentoRepository.salvar(depoimentoEntity);

        return {
            depoimento: new ListaDepoimentosDTO(depoimentoEntity.id),
            message: "Depoimento criado com sucesso!"
        }
    }

    @Get()
    async listaDepoimentos() {
        const depoimentosSalvos = await this.depoimentoRepository.listar();
        const depoimentosLista = depoimentosSalvos.map(
            depoimento => new ListaDepoimentosDTO(
                depoimento.id,
            )
        );

        return depoimentosLista;
    }

    @Put('/:id')
    async atualizaDepoimento(@Param('id') id: string, @Body() novosDados: AtualizaDepoimentoDTO) {
        const depoimentoAtualizado = await this.depoimentoRepository.atualizar(id, novosDados)

        return {
            depoimento: depoimentoAtualizado,
            message: 'Depoimento atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async removeDepoimento(@Param('id') id: string) {
        const depoimentoRemovido = await this.depoimentoRepository.remove(id);

        return {
            depoimento: depoimentoRemovido,
            message: 'Depoimento removido com sucesso'
        }
    }
}