import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';

@Injectable()
export class MulterService {
  constructor(private prisma: PrismaService) {}

  createAndDeleteExtraFiles(userDir: string) {
    if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir);
    } else {
      const files = fs.readdirSync(userDir);
      for (const file of files) {
        fs.unlinkSync(`${userDir}/${file}`);
      }
    }
  }
}
