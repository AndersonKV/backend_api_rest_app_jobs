import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserFindService } from "../../user/services/user.find.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EnumUserRole, User } from "@prisma/client";
import { PrismaService } from "src/database/PrismaService";



interface UserToken {
    access_token: string;
}
export interface UserPayload {
    sub: number;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
}

@Injectable()
export class AuthSignInService {
    constructor(private readonly usersService: UserFindService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    protected mappingCompanyRole = {
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

    protected mappingUserRole = {
        matchings: {
            include: {
                post: {

                }
            }
        }
    }


    async login(user: User) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signIn(email: string, password: string): Promise<User> {

        const user = await this.usersService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }

        throw new HttpException("O endereço de e-mail ou a senha fornecidos estão incorretos.", HttpStatus.BAD_REQUEST);
    }

    async dashboard(id: number) {
        try {
            const { role } = await this.prisma.user.findFirstOrThrow({ where: { id } })


            return this.verifyRole(role) === 'company' ? await this.findHasMatchingInJobs(id) : await this.findUsersMatchings(id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }

    }

    protected verifyRole(role: EnumUserRole) {
        if (EnumUserRole[role]) {
            return role
        }

        throw new HttpException("error", HttpStatus.BAD_REQUEST);

    }
    protected async findHasMatchingInJobs(id: number) {
        return await this.prisma.user.findFirstOrThrow({
            where: { id }, include: {
                posts: {
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
                }
            }
        });
    }

    protected async findUsersMatchings(id: number) {
        return await this.prisma.user.findFirstOrThrow({
            where: { id }, include: {
                matchings: {
                    include: {
                        post: {

                        }
                    }
                }
            }
        });
    }

}