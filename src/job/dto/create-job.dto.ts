import { IsDate, IsNotEmpty, Length, IsEmpty, IsEnum, IsNumber, IsString, IsNotEmptyObject, isNotEmpty, ArrayMaxSize, ArrayMinSize, IsArray, ValidateNested, isEmpty } from "class-validator";
import { Transform, Type } from 'class-transformer';
import { Job } from "@prisma/client";
import { EnumTypesContract, EnumExperienceLevel, EnumSizeCompany, EnumRemote } from '@prisma/client';


export class CreateJobDto {
    @IsEmpty({ message: "id deve ficar vazio" })
    id: number

    @IsNotEmpty({ message: 'titulo não pode ser vazio' })
    @Length(1, 60, { message: 'titulo precisa ter entre 1 e 60 caracteres' })
    @Transform(({ value }) => value.toLowerCase().trim())
    title: string;

    @IsEnum(EnumRemote, { message: "remoto dever ser entre sim e não" })
    remote: string;

    @Length(1, 60, { message: 'nome da compania precisa ter entre 1 e 60 caracteres' })
    name_company: string;

    @IsEmpty({ message: "id_author deve ficar vazio" })
    id_author: number

    @Length(1, 60, { message: 'tech não pode estar vazio' })
    techs: string

    @IsEnum(EnumTypesContract, { message: "tipo de contrato dever ser, clt, pj" })
    types_contract: string;

    @IsEnum(EnumSizeCompany, { message: "tamanho da compania deve ser, pequeno, medio, grande" })
    size_company: string;

    @IsEnum(EnumExperienceLevel, { message: "experiencia deve ser entre estagio, junior, pleno e senior" })
    experience_level: string;

    @IsNumber({}, { message: 'dias para expirar precisa ser um numero' })
    expired_days: number;

    @IsNumber({}, { message: 'salário só aceita números' })
    salary: number;

    @Length(1, 600, { message: 'responsabilidades precisa ter entre 1 e 60 caracteres' })
    responsibilities: string;

    @Length(1, 600, { message: 'requerimentos precisa ter entre 1 e 60 caracteres' })
    requirements: string;

    @Length(1, 600, { message: 'benefits precisa ter entre 1 e 60 caracteres' })
    benefits?: string;

    @IsNotEmpty({ message: "avatar do post não pode estar vazio" })
    avatar: string;

    @IsDate()
    readonly created_at: Date;

    @IsDate()
    readonly updated_at: Date;


    constructor(data: Job) {
        const job = Object.assign({}, data) as Job;

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
        this.techs = job.techs;

        this.created_at = new Date();
        this.updated_at = new Date();
    }



}


