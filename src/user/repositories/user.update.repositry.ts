import { User } from "@prisma/client";
import { UpdateUserDto } from "../dto/update-user.dto";

export interface UserUpdateRepositry {
    update(data: UpdateUserDto): Promise<User>;
}
