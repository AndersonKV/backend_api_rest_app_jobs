import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateJobDto } from '../dto/create-job.dto';

@Injectable()
export class JobDeleteService {
    constructor(private prisma: PrismaService) { }

    async deleteById(id: number) {
        try {
            return await this.prisma.job.delete({ where: { id } });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async destroyer() {
        try {
            return await this.prisma.job.deleteMany();
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

}
