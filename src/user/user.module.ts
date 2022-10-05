import { Module } from '@nestjs/common';
import { UserCreateService } from './services/user.create.service';
import { UserCreateController } from './controllers/user.create.controller';
import { PrismaService } from '../database/PrismaService';
import { IsEmailUpdateAlreadyExistConstraint } from './constraint/IsEmailUpdateAlreadyExist';
import { UserFindService } from './services/user.find.service';
import { UserUpdateService } from './services/user.update.service';
import { UserDeleteService } from './services/user.delete.service';
import { UserDeleteController } from './controllers/user.delete.controller';
import { UserUpdateController } from './controllers/user.update.controller';
import { UserFindController } from './controllers/user.find.controller';

@Module({
  controllers: [
    UserCreateController,
    UserDeleteController,
    UserUpdateController,
    UserFindController,
  ],
  providers: [
    UserCreateService,
    UserFindService,
    UserDeleteService,
    UserUpdateService,
    IsEmailUpdateAlreadyExistConstraint,
    PrismaService]

})

export class UserModule { }
