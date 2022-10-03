import { UpdateUserDto } from "../dto/update-user.dto";

export interface UserUpdateRepositry {
    update(data: UpdateUserDto): any;
}