import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserCreateService } from '../services/user.create.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserCreateController {
  constructor(private readonly userCreateService: UserCreateService) { }

  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userCreateService.create(createUserDto);
  }


}
