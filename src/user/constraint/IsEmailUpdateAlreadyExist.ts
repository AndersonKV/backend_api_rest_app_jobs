import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";
import { PrismaService } from "../../database/PrismaService";
import { UpdateUserDto } from "../dto/update-user.dto";

@ValidatorConstraint({ name: 'IsEmailUpdateAlreadyExistConstraint', async: true })
@Injectable()
export class IsEmailUpdateAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(protected prismaService: PrismaService) { }

    async validate(emailShouldUpdate: string, args: ValidationArguments) {
        try {
            const object = args.object as UpdateUserDto

            const id = Number(object.id);

            if (!id) throw new HttpException(`id vazio`, HttpStatus.BAD_REQUEST);


            const findUser = await this.prismaService.user.findUniqueOrThrow({ where: { id } }).catch(_ => {
                throw new HttpException(`id ${id} não encontrado`, HttpStatus.BAD_REQUEST);
            })

            if (findUser.email === emailShouldUpdate) return true;

            const emailAlreadyExist = await this.prismaService.user.findUnique({ where: { email: emailShouldUpdate } })

            if (emailAlreadyExist) return false;

            return true
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }

    }
}

export function IsEmailUpdateAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUpdateAlreadyExistConstraint,
        });
    };
}

