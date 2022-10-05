import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { PrismaService } from "../../database/PrismaService";
import { CreateJobDto } from "../dto/create-job.dto";

@ValidatorConstraint({ async: true })
@Injectable()
export class isIdUserExistConstraint implements ValidatorConstraintInterface {
    constructor(protected prismaService: PrismaService) { }

    async validate(id_author: string, args: ValidationArguments) {

        const id = Number(id_author);

        if (!id) throw new HttpException(`id vazio`, HttpStatus.BAD_REQUEST);

        const checkIsIdExistAndRoleIsCompany = await this.prismaService.user.findMany({ where: { id, AND: { role: UserRole['company'] } } })

        if (checkIsIdExistAndRoleIsCompany.length) return true;

        return false

    }
}

export function IsIdUserExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isIdUserExistConstraint,
        });
    };
}

