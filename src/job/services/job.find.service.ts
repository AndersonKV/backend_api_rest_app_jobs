import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class JobFindService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        try {
            return await this.prisma.job.findMany({
                include: {
                    matchings: {
                        select: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                }
                            }
                        }
                    }
                }
            });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: number) {
        return await this.prisma.job.findUniqueOrThrow({ where: { id } }).catch(_ => {
            throw new HttpException('id ' + id + ' não encontrado', HttpStatus.BAD_REQUEST);
        });
    }

}
