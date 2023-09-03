import { IsString, MaxLength, IsNotEmpty,IsOptional } from "class-validator";

export class AtualizaDepoimentoDTO {
    @IsString({message: 'Foto inválida'})
    @IsOptional()
    foto: string;

    @IsString({message: 'Depoimento inválida'})
    @MaxLength(100, {message: 'Depoimento deve ter no máximo 100 caracteres'})
    @IsOptional()
    depoimento: string;

    @IsString({message: 'Nome inválida'})
    @IsNotEmpty({message: 'O campo nome não pode ser vazio'})
    @IsOptional()
    nome: string;
}


