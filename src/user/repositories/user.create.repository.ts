import { User } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";

export interface IUserCreateService {
    create({ name, email, password }: CreateUserDto): Promise<User>;
}