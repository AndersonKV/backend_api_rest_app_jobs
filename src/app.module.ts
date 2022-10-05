import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JobModule } from './job/jobs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, JobModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
