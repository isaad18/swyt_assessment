import { Module } from '@nestjs/common';
import { MulterController } from './multer.controller';
import { MulterService } from './multer.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule],
  controllers: [MulterController],
  providers: [MulterService, ConfigService],
})
export class MulterModule {}
