import { Module } from '@nestjs/common';
import { DepoimentoModule } from './depoimento/depoimento.module';

@Module({
  imports: [DepoimentoModule],
})
export class AppModule {}
