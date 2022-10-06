import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Job } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';

@Injectable()
export class JobUpdateService {
    constructor(private prisma: PrismaService) { }

    async update(id: number, dataDto: UpdateJobDto) {
        try {
            const props = { id, ...dataDto };

            const data = new UpdateJobDto(props) as unknown as Job;

            // return await this.prisma.job.update({ where: { id }, data })
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }


    }
}
