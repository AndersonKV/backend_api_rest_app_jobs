import { Injectable, NestMiddleware, BadRequestException } from "@nestjs/common";
import { validate } from "class-validator";
import { NextFunction } from "express";

export class LoginRequestBody {
    email: string;
    password: string;
}

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const body = req.body as unknown as LoginRequestBody;

        const loginRequestBody = new LoginRequestBody();

        loginRequestBody.email = body.email;
        loginRequestBody.password = body.password;

        const validations = await validate(loginRequestBody);

        if (validations.length) {
            throw new BadRequestException(
                validations.reduce((acc, curr) => {
                    return [...acc, ...Object.values(curr.constraints)];
                }, []),
            );
        }

        next();
    }
}