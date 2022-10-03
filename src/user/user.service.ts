import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async create({ name, email, password }: CreateUserDto) {
    try {
      const data = new CreateUserDto(name, email, password);

      return await new PrismaService().user.create({
        data
      })
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

  }

  async findAll() {
    return await new PrismaService().user.findMany({});
  }

  async findOne(id: number) {
    return await new PrismaService().user.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateUserDto) {
    return true;
    // return await new PrismaService().user.update({ where: { id }, data }).catch((err) => {
    //   throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    // });


  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
