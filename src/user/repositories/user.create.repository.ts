import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "@prisma/client";

export interface UserCreateRepositry {
    create({ name, email, password, confirm_password, role }: CreateUserDto): Promise<User>;
}