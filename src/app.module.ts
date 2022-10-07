import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JobModule } from './job/jobs.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MatchingModule } from './matching/matching.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, JobModule, AuthModule, MatchingModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule { }
