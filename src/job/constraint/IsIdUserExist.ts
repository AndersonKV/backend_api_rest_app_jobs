import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { PrismaService } from "../../database/PrismaService";
import { CreateJobDto } from "../dto/create-job.dto";

@ValidatorConstraint({ async: true })
@Injectable()
export class isIdUserExistConstraint implements ValidatorConstraintInterface {
    constructor(protected prismaService: PrismaService) { }

    async validate(id_job: string, args: ValidationArguments) {
        const id = Number(id_job);

        if (!id) throw new HttpException(`id vazio`, HttpStatus.BAD_REQUEST);

        const idJobExist = await this.prismaService.job.findMany({ where: { id } })

        if (idJobExist.length) return true;

        return false

    }
}

export function idExist(validationOptions?: ValidationOptions) {
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

