import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserUpdateRepositry } from '../repositories/user.update.repositry';

@Injectable()
export class UserUpdateService {
    constructor(private prisma: PrismaService) {
    }

    async update(dataDto: UpdateUserDto) {
        const id = dataDto.id;

        const data = new UpdateUserDto(dataDto)
        console.log({ data })
        return await this.prisma.user.update({ where: { id }, data })
    }
}
