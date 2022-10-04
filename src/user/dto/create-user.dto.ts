import { MinLength, IsEmail, Matches, IsDate, registerDecorator, ValidationOptions, IsNotEmpty, NotContains, Length, Min, IsEmpty, IsEnum } from "class-validator";
import { Transform } from 'class-transformer';
import { IsEmailAlreadyExist } from "../constraint/IsEmailAlreadyExist";
import { } from "@prisma/client";
import { UserRole } from '@prisma/client';
import { IsConfirmPasswordEqualPassword } from "../constraint/IsConfirmPasswordEqualPassword";


export class CreateUserDto {
    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @Length(1, 60, { message: 'Nome precisa ter entre 1 e 60 caracteres' })
    @Transform(({ value }) => value.toLowerCase().trim())
    name: string;

    @IsEmail({}, { message: 'email invalido' })
    @IsEmailAlreadyExist({ message: "email já foi registrado" })
    @NotContains(" ", { message: "não pode haver espaços em branco no email" })
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string;

    @MinLength(8, { message: "senha deve ter 8 ou mais digitos" })
    @NotContains(" ", { message: "não pode haver espaços em branco na senha" })
    password: string;

    @IsConfirmPasswordEqualPassword({ message: "senha de confirmação deve ser igual" })
    confirm_password: string;

    @IsDate()
    readonly created_at: Date;

    @IsDate()
    readonly updated_at: Date;

    @IsEnum(UserRole, { message: "só pode escolher entre usúario e compania" })
    role: UserRole;


    constructor(name: string, email: string, password: string, confirm_password: string, role: UserRole) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirm_password = confirm_password;
        this.role = role
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}


