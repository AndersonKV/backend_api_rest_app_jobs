import { User } from "@prisma/client";

export interface UserFindRepository {
    findAll(): Promise<Array<User>>;
    findById(id: number): Promise<User>;
}