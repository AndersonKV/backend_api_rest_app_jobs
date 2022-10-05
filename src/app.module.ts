import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JobModule } from './job/jobs.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, JobModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
