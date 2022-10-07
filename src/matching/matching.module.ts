import { Module } from '@nestjs/common';
import { MatchingFindService } from './services/matching.find.service';
import { MatchingUpdateService } from './services/matching.update.service';
import { MatchingDeleteService } from './services/matching.delete.service';
import { MatchingController } from './controllers/matching.controller';
import { MatchingCreateService } from './services/matching.create.service';
import { PrismaService } from '../database/PrismaService';
import { isIdJobExistConstraint } from 'src/job/constraint/isJobIdExist';
import { isRoleUserConstraint } from './constraint/isRoleUser';

@Module({
  controllers: [MatchingController],
  providers: [MatchingCreateService,
    MatchingFindService,
    MatchingUpdateService,
    MatchingDeleteService, PrismaService,
    isIdJobExistConstraint, isRoleUserConstraint]
})
export class MatchingModule { }
