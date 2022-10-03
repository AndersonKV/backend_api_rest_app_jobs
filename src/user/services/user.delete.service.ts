import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserCreateService } from '../repositories/user.create.repository';
import { UserDeleteRepository } from '../repositories/user.delete.repository';

@Injectable()
export class UserDeleteService implements UserDeleteRepository {
    constructor(private prisma: PrismaService) { }

    async deleteById(id: number) {
        return await this.prisma.user.delete({ where: { id } }).catch(err => {
            throw new HttpException(`id ${id} não encontrado`, HttpStatus.BAD_REQUEST);
        })
    }
    async destroyer() {
        await this.prisma.user.deleteMany({});
    }



}
