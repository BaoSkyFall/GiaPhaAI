import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useStaticAssets(join(__dirname, '..', 'public')); //js,css,images,...
  app.setBaseViewsDir(join(__dirname, '..', 'views')); //view
  app.setViewEngine('ejs');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2'],
  });
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  });
  app.use(helmet());
  // config swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS Udemy Practices')
    .setDescription('The NestJS Udemy Practices API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
