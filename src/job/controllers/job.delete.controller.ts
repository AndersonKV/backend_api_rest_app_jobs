import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { JobDeleteService } from '../services/job.delete.service';

@Controller('job')
export class JobDeleteController {
    constructor(private readonly jobDeleteService: JobDeleteService) { }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.jobDeleteService.deleteById(+id);
    }

    @Delete('')
    destroyer(@Param('id') id: string) {
        return this.jobDeleteService.destroyer();
    }
}
