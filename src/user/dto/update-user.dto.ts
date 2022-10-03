import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, NotContains } from 'class-validator';
import { IsEmailAlreadyExist } from '../ValidatorConstraintInterface/IsEmailAlreadyExistConstraint';
import { IsEmailUpdateAlreadyExist } from '../ValidatorConstraintInterface/IsEmailUpdateAlreadyExist';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail({}, { message: 'email invalido' })
    @IsEmailUpdateAlreadyExist({ message: "email já foi registrado" })
    @NotContains(" ", { message: "não pode haver espaços em branco no email" })
    email: string;
}
