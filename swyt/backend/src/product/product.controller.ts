import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import type { Category } from './interfaces/product.d';
import { ParseStringPipe } from '../pipes/string.pipe';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('search', ParseStringPipe) search: string,
    @Query('category', ParseStringPipe) category?: Category,
  ) {
    if (category && !this.productService.isProductEnum(category)) {
      return [];
    }
    return await this.productService.getProducts(search, category);
  }

  @Post()
  async postProduct(@Body(ValidationPipe) product: ProductDto) {
    return await this.productService.postProduct(product);
  }
}
