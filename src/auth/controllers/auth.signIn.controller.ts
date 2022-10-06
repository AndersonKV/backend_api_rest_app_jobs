import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from '../dto/Sign-in.dto';
import { AuthSignInService } from '../services/auth.signIn.service';
import { Controller, Request, Post, UseGuards, HttpCode, Req, createParamDecorator, ExecutionContext, Get } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { IsPublic } from '../decorator/is-public.decorator';
import { User } from '@prisma/client';
import { CurrentUser } from '../decorator/current-user.decorator';




@Controller()
export class AuthSignInController {
    constructor(private readonly authSignInService: AuthSignInService) { }

    @IsPublic()
    @HttpCode(202)
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: any) {
        return this.authSignInService.login(req.user)
    }


    @Get('me')
    getMe(@CurrentUser() user: User): User {
        return user;
    }
}
