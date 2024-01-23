import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MulterService } from './multer.service';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { ParseStringPipe } from '../pipes/string.pipe';

@Controller('/multer')
export class MulterController {
  constructor(
    private multerService: MulterService,
    private configService: ConfigService,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'jpeg|jpg|png' })
        .addMaxSizeValidator({ maxSize: 2000000 })
        .build({ errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE }),
    )
    file: any,
  ) {
    const target = randomUUID();
    const targetDir = `./uploads/${target}`;
    this.multerService.createAndDeleteExtraFiles(targetDir);
    const filePath = `${targetDir}/${file.originalname}`;
    const currentUri = `/multer/${target}/files/${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);
    return { file_url: currentUri };
  }

  @Get('/:target/files/:filename')
  async getFile(
    @Param('target', ParseStringPipe) target: string,
    @Param('filename', ParseStringPipe) filename: string,
    @Res() res: any,
  ) {
    const userDir = `./uploads/${target}`;
    const filePath = `${userDir}/${filename}`;
    if (fs.existsSync(filePath)) {
      res.sendFile(filename, { root: userDir });
    } else {
      throw new NotFoundException('File not found');
    }
  }
}
