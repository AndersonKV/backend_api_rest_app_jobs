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
        return this.authService.signIn(email, password);
    }

}