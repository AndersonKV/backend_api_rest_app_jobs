import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { single } from "rxjs/internal/operators/single";
import { AuthSignInService } from "../services/auth.signIn.service";

interface SignIn {
    email: string;
    password: string;
}
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthSignInService) {
        super({ usernameField: 'email', userpasswordField: 'password' });

    }
    validate(email: string, password: string) {
        console.log('LocalStrategy')
        return this.authService.validateUser(email, password);
    }
    // async validate(email: string, password: string): Promise<any> {
    //     console.log(' LocalStrategy  ')

    //     const user = await this.authService.signIn({ email, password });

    //     if (!user) throw new UnauthorizedException('autenticação não autorizada');

    //     return user;
    // }
}