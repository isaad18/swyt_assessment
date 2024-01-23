import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MulterModule } from './multer/multer.module';

@Module({
  imports: [ProductModule, MulterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
