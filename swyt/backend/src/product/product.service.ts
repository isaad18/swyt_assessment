import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Category } from './interfaces/product.d';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  isProductEnum(category: string): boolean {
    return (
      category === 'FOOD' ||
      category === 'DRINK' ||
      category === 'FURNITURE' ||
      category === 'ELECTRONICS' ||
      category === 'MOTORS' ||
      category === 'OTHER'
    );
  }

  async getProducts(
    take: number,
    skip: number,
    orderBy: 'asc' | 'desc' = 'asc',
    category?: Category,
  ) {
    if (category) {
      return await this.prisma.product.findMany({
        take: take,
        skip: skip,
        orderBy: {
          createdAt: orderBy,
        },
        where: {
          category: category,
        },
      });
    }

    return await this.prisma.product.findMany({
      take: take,
      skip: skip,
      orderBy: {
        createdAt: orderBy,
      },
    });
  }

  async postProduct(product: ProductDto) {
    return await this.prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
      },
    });
  }
}
