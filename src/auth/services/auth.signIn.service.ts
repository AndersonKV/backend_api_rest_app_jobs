import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserFindService } from "../../user/services/user.find.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from "@prisma/client";



interface UserToken {
    access_token: string;
}
interface UserPayload {
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

}