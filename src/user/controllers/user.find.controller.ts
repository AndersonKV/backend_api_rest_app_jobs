import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { UserFindService } from '../services/user.find.service';

@Controller('user')
export class UserFindController {
    constructor(private readonly userFindService: UserFindService) { }

    @HttpCode(202)
    @Get()
    findAll() {
        return this.userFindService.findAll();
    }

    @HttpCode(202)
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userFindService.findById(+id);
    }


}
