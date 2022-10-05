import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';

@Controller('jobs')
export class JobFindController {
    constructor(private readonly jobsService: any) { }

    @Get()
    findAll() {
        return this.jobsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobsService.findOne(+id);
    }
}
