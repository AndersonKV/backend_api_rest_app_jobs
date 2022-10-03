import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../database/PrismaService';
import { IsEmailUpdateAlreadyExistConstraint } from './ValidatorConstraintInterface/IsEmailUpdateAlreadyExist';

@Module({
  controllers: [UserController],
  providers: [UserService, IsEmailUpdateAlreadyExistConstraint, PrismaService]
})
export class UserModule { }
