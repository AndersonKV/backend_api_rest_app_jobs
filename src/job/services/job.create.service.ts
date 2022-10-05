import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateJobDto } from '../dto/create-job.dto';

@Injectable()
export class JobCreateService {
    constructor(private prisma: PrismaService) { }

    async create(dataDto: CreateJobDto) {
        try {
            return dataDto;
            //return await this.prisma.user.create({ data });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

}
