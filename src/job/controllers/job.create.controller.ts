import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { JobCreateService } from '../services/job.create.service';

@Controller('job')
export class JobCreateController {
    constructor(private readonly jobCreateService: JobCreateService) { }

    @HttpCode(201)
    @Post('/create')
    create(@Body() createJobDto: CreateJobDto) {
        return this.jobCreateService.create(createJobDto);
    }

}
