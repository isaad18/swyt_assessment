import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Category } from './interfaces/product.d';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
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
