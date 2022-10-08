import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class MatchingDeleteService {
    constructor(private prisma: PrismaService) { }

    async deleteById(id: number) {
        await this.prisma.matching.delete({ where: { id } }).catch(_ => {
            throw new HttpException('id nao ' + id + ' encontrado', HttpStatus.BAD_REQUEST);
        })
    }

    async destroyer() {
        return await this.prisma.matching.deleteMany({})
    }
}