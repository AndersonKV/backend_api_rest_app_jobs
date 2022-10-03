import { PartialType } from '@nestjs/mapped-types';
import { UserRole } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, isNotEmpty, IsNotEmpty, Length, MinLength, NotContains } from 'class-validator';
import { IsConfirmPasswordEqualPassword } from '../constraintInterface/IsConfirmPasswordEqualPassword';
import { IsEmailUpdateAlreadyExist } from '../constraintInterface/IsEmailUpdateAlreadyExist';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    id: number;

    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @Length(1, 60, { message: 'Nome precisa ter entre 1 e 60 caracteres' })
    @Transform(({ value }) => value.toLowerCase().trim())
    name: string;

    @IsEmail({}, { message: 'email invalido' })
    @IsEmailUpdateAlreadyExist({ message: "email já foi registrado" })
    @NotContains(" ", { message: "não pode haver espaços em branco no email" })
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string;

    @MinLength(8, { message: "senha deve ter 8 ou mais digitos" })
    @NotContains(" ", { message: "não pode haver espaços em branco na senha" })
    password: string;

    @IsConfirmPasswordEqualPassword({ message: "senha de confirmação deve ser igual" })
    confirm_password: string;


    @IsDate()
    readonly updated_at: Date;

    constructor(name: string, email: string, password: string, confirm_password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirm_password = confirm_password;
        this.updated_at = new Date();
    }
}
