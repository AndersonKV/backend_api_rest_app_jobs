import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EnumUserRole } from "@prisma/client";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { PrismaService } from "../../database/PrismaService";

@ValidatorConstraint({ name: 'isRoleUserConstraint', async: true })
@Injectable()
export class isRoleUserConstraint implements ValidatorConstraintInterface {
    constructor(protected prismaService: PrismaService) { }

    async validate(id: number, args: ValidationArguments) {

        if (!id) throw new HttpException(`id user vazio`, HttpStatus.BAD_REQUEST);

        await this.prismaService.user.findFirstOrThrow({ where: { id, AND: { role: EnumUserRole['user'] } } }).catch(_ => {
            throw new HttpException(`id user ${id} não encontrado ou não tem autorização`, HttpStatus.BAD_REQUEST);
        })

        return true
    }
}

export function isRoleUser(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isRoleUserConstraint,
        });
    };
}

