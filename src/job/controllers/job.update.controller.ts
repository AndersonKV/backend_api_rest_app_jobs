import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';

@Controller('jobs')
export class JobUpdateController {
    constructor(private readonly jobsService: any) { }




    @Patch(':id')
    update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
        return this.jobsService.update(+id, updateJobDto);
    }


}
