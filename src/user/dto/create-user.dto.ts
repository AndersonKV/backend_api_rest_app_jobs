import { MinLength, IsEmail, IsDate, ValidationArguments, registerDecorator, ValidationOptions, IsNotEmpty, NotContains, Length, Min, IsEmpty } from "class-validator";
import { IsEmailAlreadyExist } from "../ValidatorConstraintInterface/IsEmailAlreadyExistConstraint";
import { Transform } from 'class-transformer';



export class CreateUserDto {
    id: number;

    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @Length(1, 60, { message: 'Nome precisa ter entre 1 e 60 caracteres' })
    @Transform(({ value }) => value.toLowerCase().trim())
    name: string;

    @IsEmail({}, { message: 'email invalido' })
    @IsEmailAlreadyExist({ message: "email já foi registrado" })
    @NotContains(" ", { message: "não pode haver espaços em branco no email" })
    email: string;

    @MinLength(8, { message: "senha deve ter 8 ou mais digitos" })
    @NotContains(" ", { message: "não pode haver espaços em branco" })
    password: string;


    @IsDate()
    readonly created_at: Date;

    @IsDate()
    readonly updated_at: Date;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
