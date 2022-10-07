import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EnumUserRole, Job } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';
import { CreateJobDto } from '../dto/create-job.dto';


@Injectable()
export class JobCreateService {
    constructor(private prisma: PrismaService) { }

    async create(id_author: number, dataDto: CreateJobDto) {
        try {
            const checkIsIdExistAndRoleIsCompany = await this.prisma.user.findMany({ where: { id: id_author, AND: { role: EnumUserRole['company'] } } })

            if (!checkIsIdExistAndRoleIsCompany.length) throw new HttpException(`você não tem autorização para postar`, HttpStatus.BAD_REQUEST);

            const props = { id_author, ...dataDto, } as Job

            const data = new CreateJobDto(props) as Job;
            return await this.prisma.job.create({ data });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

}
