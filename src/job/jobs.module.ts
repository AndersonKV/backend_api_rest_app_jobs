import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { isIdUserExistConstraint } from './constraint/IsIdUserExist';
import { JobCreateController } from './controllers/job.create.controller';
import { JobDeleteController } from './controllers/job.delete.controller';
import { JobFindController } from './controllers/job.find.controller';
import { JobUpdateController } from './controllers/job.update.controller';
import { JobCreateService } from './services/job.create.service';
import { JobDeleteService } from './services/job.delete.service';
import { JobFindService } from './services/job.find.service';
import { JobUpdateService } from './services/job.update.service';

@Module({
  controllers: [JobCreateController, JobDeleteController, JobUpdateController, JobFindController],
  providers: [JobCreateService, JobFindService, JobDeleteService, JobUpdateService, PrismaService, isIdUserExistConstraint]
})
export class JobModule { }
