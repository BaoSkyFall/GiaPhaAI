import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { HttpExceptionFilter } from './core/http-exception.filter';
import { TransformInterceptor } from './core/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true,
  });
  
  // Global pipes, filters and interceptors
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  
  // Cookie parser
  app.use(cookieParser());
  
  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  
  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('GiaPhaAI API')
    .setDescription('API cho ứng dụng Gia Phả Thông Minh')
    .setVersion('1.0')
    .addTag('Authentication', 'API xác thực')
    .addTag('Users', 'API quản lý người dùng')
    .addTag('Family Tree', 'API quản lý gia phả')
    .addTag('Blog', 'API quản lý bài viết')
    .addTag('Notifications', 'API quản lý thông báo')
    .addTag('Face Recognition', 'API nhận diện khuôn mặt')
    .addTag('OCR', 'API nhận diện văn bản')
    .addTag('Health Check', 'API kiểm tra hệ thống')
    .addTag('Databases', 'API quản lý cơ sở dữ liệu')
    .setContact('GiaPhaAI Team', 'https://giaphaai.com', 'contact@giaphaai.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addBearerAuth({ 
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    }, 'JWT-auth')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  
  // Start server
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap(); 