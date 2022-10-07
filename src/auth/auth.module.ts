import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserFindService } from 'src/user/services/user.find.service';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from '../database/PrismaService';
import { AuthSignInController } from './controllers/auth.signIn.controller';
import { AuthSignInService } from './services/auth.signIn.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validate.middleware';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '5h' }

        }),],
    controllers: [AuthSignInController],
    providers: [AuthSignInService, LocalStrategy, UserFindService, PrismaService, JwtStrategy]
})


export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoginValidationMiddleware).forRoutes('login');
    }
}