import { Controller, Param, Delete, HttpCode } from '@nestjs/common';
import { UserDeleteService } from '../services/user.delete.service';

@Controller('user')
export class UserDeleteController {
    constructor(private readonly userDeleteService: UserDeleteService) { }

    @HttpCode(202)
    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.userDeleteService.deleteById(+id);
    }

    @HttpCode(202)
    @Delete()
    destroyer() {
        return this.userDeleteService.destroyer();
    }
}
