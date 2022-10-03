import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserUpdateRepositry } from '../repositories/user.update.repositry';

@Injectable()
export class UserUpdateService {
    constructor(private prisma: PrismaService) {
    }

    async update(dataDto: UpdateUserDto) {
        const { id, confirm_password, email,
            name, password, updated_at, } = dataDto;

        const data = {
            id, confirm_password, email,
            name, password, updated_at
        }
        return await this.prisma.user.update({ where: { id }, data })
    }
}
