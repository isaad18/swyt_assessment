import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('product')
export class ProductController {
  constructor(private prisma: PrismaService, private productService: ProductService) {}
}
