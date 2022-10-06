import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserCreateService } from '../services/user.create.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { IsPublic } from 'src/auth/decorator/is-public.decorator';

@Controller('user')
export class UserCreateController {
  constructor(private readonly userCreateService: UserCreateService) { }

  @IsPublic()
  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userCreateService.create(createUserDto);
  }


}
