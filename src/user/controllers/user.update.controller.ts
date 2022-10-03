import { Controller, Body, Patch, HttpCode } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserUpdateService } from '../services/user.update.service';

@Controller('user')
export class UserUpdateController {
    constructor(private readonly userUpdateService: UserUpdateService) { }

    @HttpCode(201)
    @Patch()
    update(@Body() updateUserDto: UpdateUserDto) {
        return this.userUpdateService.update(updateUserDto);
    }

}
