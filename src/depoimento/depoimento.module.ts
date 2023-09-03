import { Module } from "@nestjs/common";
import { DepoimentoController } from "./depoimento.controller";
import { DepoimentoRepository } from "./depoimento.repository";
import { DepoimentosHomeController } from "./depoimentos-home.controller";

@Module({
    controllers: [DepoimentoController, DepoimentosHomeController],
    providers: [DepoimentoRepository]
})
export class DepoimentoModule {}