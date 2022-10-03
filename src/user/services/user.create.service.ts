import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserCreateService } from '../repositories/user.create.repository';

@Injectable()
export class UserCreateService implements IUserCreateService {
  constructor(private prisma: PrismaService) { }

  async create({ name, email, password }: CreateUserDto) {
    try {
      const data = new CreateUserDto(name, email, password);

      return await this.prisma.user.create({
        data
      })
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}
