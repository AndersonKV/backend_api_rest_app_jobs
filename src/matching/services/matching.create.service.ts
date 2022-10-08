import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { EnumUserRole, Matching } from "@prisma/client";
import { PrismaService } from "src/database/PrismaService";
import { CreateMatchingDto } from "../dto/create-matching.dto";

@Injectable()
export class MatchingCreateService {
    constructor(private prisma: PrismaService) { }

    async create(id_user: number, dataDto: CreateMatchingDto) {

        const props = { id_user, ...dataDto }

        const data = new CreateMatchingDto(props);

        const { id_job } = data;

        await this.prisma.user.findFirstOrThrow({ where: { id: id_user, AND: { role: EnumUserRole['user'] } } }).catch(_ => {
            throw new HttpException('id não existe ou você não tem autorização', HttpStatus.BAD_REQUEST);
        })

        const hasMatchings = await this.prisma.matching.findMany({ where: { id_user, id_job } })

        if (hasMatchings.length) throw new HttpException('você já aplicou para essa vaga', HttpStatus.BAD_REQUEST);

        return await this.prisma.matching.create({ data })

    }

}