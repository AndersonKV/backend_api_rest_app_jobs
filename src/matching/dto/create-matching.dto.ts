import { Matching } from "@prisma/client";
import { IsDate, IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { isJobIdExist } from "src/job/constraint/isJobIdExist";
import { isRoleUser } from "../constraint/isRoleUser";

export class CreateMatchingDto {
    @isRoleUser()
    id_user: number;

    @isJobIdExist()
    id_job: number;

    @IsDate()
    readonly created_at: Date;

    @IsDate()
    readonly updated_at: Date;

    constructor(data: CreateMatchingDto) {
        const matching = Object.assign({}, data);

        this.id_job = matching.id_job;
        this.id_user = matching.id_user

        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
