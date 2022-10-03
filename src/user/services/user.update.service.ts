import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserCreateService } from '../repositories/user.create.repository';
import { UserUpdateRepositry } from '../repositories/user.update.repositry';

@Injectable()
export class UserUpdateService implements UserUpdateRepositry {
    constructor(private prisma: PrismaService) { }

    async update(data: UpdateUserDto) {
        const { id } = data;

        return await this.prisma.user.update({ where: { id }, data }).catch((err) => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        });


    }


}
