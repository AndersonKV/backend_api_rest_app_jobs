import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, isNotEmpty, IsNotEmpty, NotContains } from 'class-validator';
import { IsEmailUpdateAlreadyExist } from '../constraintInterface/IsEmailUpdateAlreadyExist';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: number;

    @IsEmail({}, { message: 'email invalido' })
    @IsEmailUpdateAlreadyExist({ message: "email já foi registrado" })
    @NotContains(" ", { message: "não pode haver espaços em branco no email" })
    email: string;
}
