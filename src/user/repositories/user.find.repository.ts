import { User } from "@prisma/client";

export interface UserFindRepository {
    findById(id: number): Promise<User>;
    findAll(): Promise<Array<User>>;
}