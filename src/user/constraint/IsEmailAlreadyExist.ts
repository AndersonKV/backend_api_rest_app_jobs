import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { PrismaService } from "src/database/PrismaService";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(email: string, args: ValidationArguments) {
        return await new PrismaService().user.findUnique({ where: { email } }).then(emailExistis => {
            if (emailExistis) return false;
            return true

        })
    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}

