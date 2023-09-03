import { IsString, MaxLength, IsNotEmpty } from "class-validator";

export class CriaDepoimentoDTO {
    @IsString({message: 'Foto inválida'})
    foto: string;

    @IsString({message: 'Depoimento inválida'})
    @MaxLength(100, {message: 'Depoimento deve ter no máximo 100 caracteres'})
    depoimento: string;

    @IsString({message: 'Nome inválida'})
    @IsNotEmpty({message: 'O campo nome não pode ser vazio'})
    nome: string;
}