import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { PrismaService } from "../../database/PrismaService";
import { CreateJobDto } from "../dto/create-job.dto";

@ValidatorConstraint({ name: 'isIdJobExistConstraint', async: true })
@Injectable()
export class isIdJobExistConstraint implements ValidatorConstraintInterface {
    constructor(protected prismaService: PrismaService) { }

    async validate(id_job: number, args: ValidationArguments) {
        if (!id_job) throw new HttpException(`id job vazio`, HttpStatus.BAD_REQUEST);

        await this.prismaService.job.findUniqueOrThrow({ where: { id: id_job } }).catch(_ => {
            throw new HttpException(`id jowb ${id_job} não encontrado`, HttpStatus.BAD_REQUEST);
        })

        return true
    }
}

export function isJobIdExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {

        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: isIdJobExistConstraint,
        });
    };
}

