import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserUpdateRepositry } from '../repositories/user.update.repositry';

@Injectable()
export class UserUpdateService {
    constructor(private prisma: PrismaService) {
    }

    async update(id: number, dataDto: UpdateUserDto) {
        try {
            const props = { id, ...dataDto }
            const data = new UpdateUserDto(props)
            return await this.prisma.user.update({ where: { id }, data })
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
