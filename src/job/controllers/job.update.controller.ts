import { Controller, Request, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { JobFindService } from '../services/job.find.service';
import { JobUpdateService } from '../services/job.update.service';

@Controller('job')
export class JobUpdateController {
    constructor(private readonly jobUpdateService: JobUpdateService) { }

    @Patch()
    update(@Request() req: any, @Body() updateJobDto: UpdateJobDto) {
        const id = req.user.id;
        return this.jobUpdateService.update(id, updateJobDto);
    }


}
