import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Category } from './interfaces/product.d';

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
}
