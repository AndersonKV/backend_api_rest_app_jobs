import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { PrismaService } from "src/database/PrismaService";
import { CreateUserDto } from "../dto/create-user.dto";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsConfirmPasswordEqualPasswordConstraint implements ValidatorConstraintInterface {
    async validate(confirm_password: string, args: ValidationArguments) {
        const { password } = args.object as CreateUserDto;
        if (confirm_password !== password) return false
        return true;
    }
}

export function IsConfirmPasswordEqualPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsConfirmPasswordEqualPasswordConstraint,
        });
    };
}

