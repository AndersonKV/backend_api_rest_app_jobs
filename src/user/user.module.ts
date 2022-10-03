import { Module } from '@nestjs/common';
import { UserCreateService } from './services/user.create.service';
import { UserCreateController } from './controllers/user.create.controller';
import { PrismaService } from '../database/PrismaService';
import { IsEmailUpdateAlreadyExistConstraint } from './constraintInterface/IsEmailUpdateAlreadyExist';
import { UserFindService } from './services/user.find.service';
import { UserUpdateService } from './services/user.update.service';
import { UserDeleteService } from './services/user.delete.service';
import { UserDeleteController } from './controllers/user.delete.controller';
import { UserFindController } from './controllers/user.find.controller';
import { UserUpdateController } from './controllers/user.update.controller';

@Module({
  controllers: [
    UserCreateController,
    UserDeleteController,
    UserFindController,
    UserUpdateController],
  providers: [
    UserCreateService,
    UserFindService,
    UserUpdateService,
    UserDeleteService,
    IsEmailUpdateAlreadyExistConstraint, PrismaService]
})
export class UserModule { }
