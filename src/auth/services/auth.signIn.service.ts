import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserFindService } from "../../user/services/user.find.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

require("dotenv").config();

interface SignIn {
    email: string;
    password: string;
}

export interface UserToken {
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
    ) { }

    async login(user: any) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signIn(data: SignIn): Promise<any> {
        console.log(' service auth')
        const user = await this.usersService.findByEmail(data.email);


        if (!user) throw new HttpException("email não encontrado", HttpStatus.BAD_REQUEST);

        if (data.password !== user.password) {
            throw new HttpException("senha errada", HttpStatus.BAD_REQUEST);
        }

        const { password, ...result } = user;

        return result;
    }

    async validateUser(email: string, password: string): Promise<any> {
        console.log('validateUser')

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
}