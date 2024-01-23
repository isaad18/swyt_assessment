import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import type { Category } from './interfaces/product.d';
import { PosNumberPipe } from 'src/pipes/posNumber.pipe';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query('take', PosNumberPipe) take: number,
    @Query('skip', PosNumberPipe) skip: number,
    @Query('orderBy') orderBy: 'asc' | 'desc',
    @Query('category') category?: Category,
  ) {
    if (!take || take === 0) {
      return [];
    }
    if (!skip) {
      skip = 0;
    }
    if (!orderBy || (orderBy !== 'asc' && orderBy !== 'desc')) {
      orderBy = 'asc';
    }
    return await this.productService.getProducts(take, skip, orderBy, category);
  }
}
