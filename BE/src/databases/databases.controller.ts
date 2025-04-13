import { Controller } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Databases')
@Controller('databases')
export class DatabasesController {
  constructor(private readonly databasesService: DatabasesService) {}
} 