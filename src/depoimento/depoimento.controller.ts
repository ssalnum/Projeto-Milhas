import { Body, Controller, Post, Get, Put, Param, Delete } from "@nestjs/common";
import { DepoimentoRepository } from "./depoimento.repository";
import { CriaDepoimentoDTO } from "./dto/criaDepoimento.dto";
import { DepoimentoEntity } from "./depoimento.entity";
import { ListaDepoimentosDTO } from "./dto/listaDepoimentos.dto";
import { AtualizaDepoimentoDTO } from "./dto/atualizaDepoimento.dto";

@Controller('/depoimentos')
export class DepoimentoController {

    constructor(private depoimentoRepository: DepoimentoRepository){}

    @Post()
    async criaDepoimento(@Body() dadosDepoimento: CriaDepoimentoDTO) {
        const depoimentoEntity = new DepoimentoEntity();
        depoimentoEntity.foto = dadosDepoimento.foto;
        depoimentoEntity.depoimento = dadosDepoimento.depoimento;
        depoimentoEntity.nome = dadosDepoimento.nome;

        this.depoimentoRepository.salvar(dadosDepoimento);

        return {
            depoimento: new ListaDepoimentosDTO(depoimentoEntity.depoimento, depoimentoEntity.nome),
            message: "Depoimento criado com sucesso!"
        }
    }

    @Get()
    async listaDepoimentos() {
        const depoimentosSalvos = await this.depoimentoRepository.listar();
        const depoimentosLista = depoimentosSalvos.map(
            depoimento => new ListaDepoimentosDTO(
                depoimento.depoimento,
                depoimento.nome
            )
        );

        return depoimentosLista;
    }

    @Put('/:id')
    async atualizaDepoimento(@Param('id') nome: string, @Body() novosDados: AtualizaDepoimentoDTO) {
        const depoimentoAtualizado = await this.depoimentoRepository.atualizar(nome, novosDados)

        return {
            depoimento: depoimentoAtualizado,
            message: 'Depoimento atualizado com sucesso'
        }
    }

    @Delete('/:nome')
    async removeDepoimento(@Param('nome') nome: string) {
        const depoimentoRemovido = await this.depoimentoRepository.remove(nome);

        return {
            depoimento: depoimentoRemovido,
            message: 'Depoimento removido com sucesso'
        }
    }
}