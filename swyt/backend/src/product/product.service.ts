import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

  async getProducts(search: string = '', category?: Category) {
    const where = {
      name: {
        contains: search,
      },
      category: undefined,
    };

    if (search !== '') {
      where.name.contains = search;
    }

    if (category) {
      where.category = category;
    }

    const res = await this.prisma.product.findMany({
      where: where,
    });

    return res;
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
