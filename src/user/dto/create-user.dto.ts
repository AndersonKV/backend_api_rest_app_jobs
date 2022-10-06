import { MinLength, IsEmail, Matches, IsDate, registerDecorator, ValidationOptions, IsNotEmpty, NotContains, Length, Min, IsEmpty, IsEnum } from "class-validator";
import { Transform } from 'class-transformer';
import { IsEmailAlreadyExist } from "../constraint/IsEmailAlreadyExist";
import { } from "@prisma/client";
import { EnumUserRole } from '@prisma/client';
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

    @IsEnum(EnumUserRole, { message: "role só permite user ou company" })
    role: EnumUserRole;

    constructor(data: CreateUserDto) {
        const user = Object.assign({}, data);

        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.confirm_password = user.confirm_password;
        this.role = user.role;

        this.created_at = new Date();
        this.updated_at = new Date();
    }



}


