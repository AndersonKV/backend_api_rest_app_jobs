import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EnumUserRole, Job } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';
import { CreateJobDto } from '../dto/create-job.dto';

export type JobCreateInput = {
    title: string
    remote: string
    name_company: string
    techs?: any
    types_contract: string
    size_company: string
    experience_level: string
    expired_days: string
    created_at?: Date | string
    updated_at?: Date | string
    salary: string
    responsibilities: string
    requirements: string
    benefits: string
    avatar: string
}

@Injectable()
export class JobCreateService {
    constructor(private prisma: PrismaService) { }

    async create(id_author: number, dataDto: CreateJobDto) {
        try {
            const checkIsIdExistAndRoleIsCompany = await this.prisma.user.findMany({ where: { id: id_author, AND: { role: EnumUserRole['company'] } } })

            if (!checkIsIdExistAndRoleIsCompany.length) throw new HttpException(`você não tem autorização para postar`, HttpStatus.BAD_REQUEST);

            const props = { ...dataDto, id_author } as Job

            const data = new CreateJobDto(props) as unknown as Job;

            return await this.prisma.job.create({ data });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

}
