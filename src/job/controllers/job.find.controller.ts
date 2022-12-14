import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorator/is-public.decorator';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { JobFindService } from '../services/job.find.service';

@Controller('job')
export class JobFindController {
    constructor(private readonly jobFindService: JobFindService) { }

    @IsPublic()
    @Get()
    findAll() {
        return this.jobFindService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.jobFindService.findById(+id);
    }
}
