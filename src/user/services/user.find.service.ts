import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserCreateService } from '../repositories/user.create.repository';
import { UserFindRepository } from '../repositories/user.find.repository';

@Injectable()
export class UserFindService implements UserFindRepository {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.user.findMany({});
    }
    async findById(id: number) {
        return await this.prisma.user.findUnique({ where: { id } }).catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });
    }






}
