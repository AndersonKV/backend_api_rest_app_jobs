import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './config/exception/HttpExceptionFilter';
import { useContainer, Validator } from "class-validator";

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3333);

}
bootstrap();

