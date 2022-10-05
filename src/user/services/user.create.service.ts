import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserCreateRepositry } from '../repositories/user.create.repository';

@Injectable()
export class UserCreateService implements UserCreateRepositry {
    constructor(private prisma: PrismaService) { }

    async create(dataDto: CreateUserDto) {
        try {
            const data = new CreateUserDto(dataDto);

            return await this.prisma.user.create({ data });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

}
