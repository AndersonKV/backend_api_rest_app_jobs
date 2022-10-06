import { PartialType } from '@nestjs/mapped-types';
import { idExist } from '../constraint/IsIdUserExist';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {
    @idExist({ message: "id do job não foi encontrado" })
    id: number
}
