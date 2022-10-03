
import { UserFindRepository } from '../repositories/user.find.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserFindService implements UserFindRepository {
    constructor(private prisma: PrismaService) {
    }

    async findAll() {
        return await this.prisma.user.findMany({});
    }
    async findById(id: number) {
        return await this.prisma.user.findUnique({ where: { id } }).catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });
    }

}
