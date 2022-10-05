import { MinLength, IsEmail, Matches, IsDate, registerDecorator, ValidationOptions, IsNotEmpty, NotContains, Length, Min, IsEmpty, IsEnum, IsNumber, IsString, IsNotEmptyObject, isNotEmpty } from "class-validator";
import { Transform } from 'class-transformer';
import { } from "@prisma/client";
import { UserRole } from '@prisma/client';
import { IsIdUserExist } from "../constraint/IsIdUserExist";


export class CreateJobDto {
    @IsNotEmpty({ message: 'titulo não pode ser vazio' })
    @Length(1, 60, { message: 'titulo precisa ter entre 1 e 60 caracteres' })
    @Transform(({ value }) => value.toLowerCase().trim())
    title: string;

    remote: string;

    @Length(1, 60, { message: 'nome da compania precisa ter entre 1 e 60 caracteres' })
    name_company: string;

    @IsIdUserExist({ message: "você não tem permissão para postar" })
    @IsNotEmpty({ message: 'id_author não pode estar vazio' })
    id_author: number

    //@Length(1, 10, { message: 'tech deve ser entre 1 e 10' })
    @IsNotEmpty({ message: 'tech não pode ficar vazio' })
    techs: string[]

    types_contract: string;
    size_company: string;

    @Length(1, 600, { message: 'nome da compania precisa ter entre 1 e 60 caracteres' })
    experience_level: string;

    @IsNumber({}, { message: 'dias para expirar precisa ser um numero' })
    expired_days: number;

    @IsNumber({}, { message: 'salário só aceita números' })
    salary: number;

    @Length(1, 600, { message: 'responsabilidades precisa ter entre 1 e 60 caracteres' })
    responsibilities: string;

    @Length(1, 600, { message: 'requerimentos precisa ter entre 1 e 60 caracteres' })
    requirements: string;

    benefits?: string;

    @IsNotEmpty({ message: "avatar do post não pode estar vazio" })
    avatar: string;

    @IsDate()
    readonly created_at: Date;

    @IsDate()
    readonly updated_at: Date;


    constructor(data: CreateJobDto) {
        const job = Object.assign({}, data);

        this.id_author = job.id_author;
        this.title = job.title;
        this.remote = job.remote;
        this.name_company = job.name_company;
        this.types_contract = job.types_contract;
        this.size_company = job.size_company;
        this.experience_level = job.experience_level;
        this.expired_days = job.expired_days;
        this.salary = job.salary;
        this.responsibilities = job.responsibilities;
        this.requirements = job.requirements;
        this.benefits = job.benefits;
        this.avatar = job.avatar;

        this.created_at = new Date();
        this.updated_at = new Date();
    }



}


