import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';

@Controller('jobs')
export class JobDeleteController {
    constructor(private readonly jobsService: any) { }


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.jobsService.remove(+id);
    }
}
