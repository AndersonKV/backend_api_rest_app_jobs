import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Job } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';

@Injectable()
export class JobUpdateService {
    constructor(private prisma: PrismaService) { }

    async update(dataDto: UpdateJobDto) {
        try {
            const { id } = dataDto;

            const props = { ...dataDto } as Job;

            const data = new UpdateJobDto(props) as Job;

            return await this.prisma.job.update({ where: { id }, data })
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }


    }
}
