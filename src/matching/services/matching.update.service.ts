import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class MatchingUpdateService {
    constructor(private prisma: PrismaService) { }

    async update(id: number, dataDto: any) {

    }
}