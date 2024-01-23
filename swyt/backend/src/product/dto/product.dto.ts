import { Category } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(250)
  @MinLength(1)
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsUrl()
  @MaxLength(250)
  @IsNotEmpty()
  image: string;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  price: number;
}
