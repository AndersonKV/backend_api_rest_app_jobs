import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDeleteRepository } from '../repositories/user.delete.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserDeleteService implements UserDeleteRepository {
    constructor(private prisma: PrismaService) {
    }

    async deleteById(id: number) {
        return await this.prisma.user.delete({ where: { id } }).catch(err => {
            throw new HttpException(`id ${id} não encontrado`, HttpStatus.BAD_REQUEST);
        })
    }
    async destroyer() {
        console.log('delete')
        return await this.prisma.user.deleteMany();
    }


}
