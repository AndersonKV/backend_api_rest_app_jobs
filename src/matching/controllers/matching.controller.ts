import { Controller, Get, Request, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { EnumUserRole } from '@prisma/client';
import { IsPublic } from 'src/auth/decorator/is-public.decorator';
import { CreateMatchingDto } from '../dto/create-matching.dto';
import { UpdateMatchingDto } from '../dto/update-matching.dto';
import { MatchingCreateService } from '../services/matching.create.service';
import { MatchingDeleteService } from '../services/matching.delete.service';
import { MatchingFindService } from '../services/matching.find.service';
import { MatchingUpdateService } from '../services/matching.update.service';

@Controller('matching')
export class MatchingController {
    constructor(
        private readonly matchingCreateService: MatchingCreateService,
        private readonly matchingFindService: MatchingFindService,
        private readonly matchingDeleteService: MatchingDeleteService,
        private readonly matchingUpdateService: MatchingUpdateService) { }

    @HttpCode(201)
    @Post()
    create(@Request() req: any, @Body() createMatchingDto: CreateMatchingDto) {
        return this.matchingCreateService.create(req.user.id, createMatchingDto);
    }

    @IsPublic()
    @Get()
    getAll(@Param('role') role: EnumUserRole) {
        return this.matchingFindService.findAll(role);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.matchingFindService.findById(+id);
    }

    @Patch()
    update(@Param('id') id: string, @Body() updateMatchingDto: UpdateMatchingDto) {
        return this.matchingUpdateService.update(+id, updateMatchingDto);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.matchingDeleteService.deleteById(+id);
    }

    @Delete()
    destroyer() {
        return this.matchingDeleteService.destroyer();
    }
}



