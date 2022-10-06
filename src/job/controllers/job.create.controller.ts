import { Controller, Request, Post, Body, Patch, Param, Delete, HttpCode, createParamDecorator, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { UserPayload } from 'src/auth/services/auth.signIn.service';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { JobCreateService } from '../services/job.create.service';



@Controller('job')
export class JobCreateController {
    constructor(private readonly jobCreateService: JobCreateService) { }

    @HttpCode(201)
    @Post('/create')
    create(@Request() req: any, @Body() createJobDto: CreateJobDto) {
        const id = req.user.id;
        return this.jobCreateService.create(id, createJobDto);
    }

}
