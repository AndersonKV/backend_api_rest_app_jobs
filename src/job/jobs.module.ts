import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { isIdUserExistConstraint } from './constraint/IsIdUserExist';
import { JobCreateController } from './controllers/job.create.controller';
import { JobCreateService } from './services/job.create.service';

@Module({
  controllers: [JobCreateController],
  providers: [JobCreateService, PrismaService, isIdUserExistConstraint]
})
export class JobModule { }
