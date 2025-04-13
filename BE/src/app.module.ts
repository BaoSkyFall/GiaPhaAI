import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FamilyTreeModule } from './family-tree/family-tree.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BlogModule } from './blog/blog.module';
import { FaceRecognitionModule } from './face-recognition/face-recognition.module';
import { OcrModule } from './ocr/ocr.module';
import { DatabasesModule } from './databases/databases.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    
    // Rate limiting
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    
    // Scheduled tasks
    ScheduleModule.forRoot(),
    
    // Application modules
    UsersModule,
    AuthModule,
    FamilyTreeModule,
    NotificationsModule,
    BlogModule,
    FaceRecognitionModule,
    OcrModule,
    PermissionsModule,
    
    // Database initialization module
    DatabasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 