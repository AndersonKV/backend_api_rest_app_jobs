import { IsDate, IsEmail, IsEnum, IsNotEmpty, MinLength, } from 'class-validator';

export class User {
    @MinLength(1, { message: "Nome não pode estar vazio" })
    name: string;

    @IsEmail({}, { message: 'Email invalido' })
    email: string;

    @MinLength(8, { message: "Senha deve ter 8 digitos ou mais" })
    password: string;

    @IsDate()
    createDate: Date;
}
