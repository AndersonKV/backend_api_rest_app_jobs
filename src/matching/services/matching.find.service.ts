import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class MatchingFindService {
    constructor(private prisma: PrismaService) { }


    async findAll() {
        return await this.prisma.matching.findMany({
            select: {
                post: {
                    include: {
                        matchings: {
                            select: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                    }
                                },
                            }
                        }
                    }
                }
            }
        })

    }

    async findById(id: number) {
        return await this.prisma.matching.findFirstOrThrow({
            where: {
                id
            }
        }).catch(_ => {
            throw new HttpException('id ' + id + ' não encontrado', HttpStatus.BAD_REQUEST);
        })
    }
}