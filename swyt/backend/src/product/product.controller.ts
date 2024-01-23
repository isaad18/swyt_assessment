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
import { PosNumberPipe } from 'src/pipes/posNumber.pipe';
import { ParseStringPipe } from 'src/pipes/string.pipe';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('take', PosNumberPipe) take: number,
    @Query('skip', PosNumberPipe) skip: number,
    @Query('search', ParseStringPipe) search: string,
    @Query('category', ParseStringPipe) category?: Category,
  ) {
    if (!take || take === 0) {
      return [];
    }
    if (!skip) {
      skip = 0;
    }
    if (category && !this.productService.isProductEnum(category)) {
      return [];
    }
    return await this.productService.getProducts(take, skip, search, category);
  }

  @Post()
  async postProduct(@Body(ValidationPipe) product: ProductDto) {
    return await this.productService.postProduct(product);
  }
}
