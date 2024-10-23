import {
  BadRequestException,
  Controller,
  FileTypeValidator, HttpCode, HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary.service';
import { AuthGuard } from '../../../guards/auth.guard';

@Controller('upload')
@UseGuards(AuthGuard)
export class UploadController {

  constructor(private readonly cloudinaryService: CloudinaryService  ) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // 10 MB
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|gif|svg|webp)' })
        ]
      })
    ) file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    try {
      const result = await this.cloudinaryService.uploadFile(file);
      return {
        url: result.url,
      };
    } catch (error) {
      throw new BadRequestException('File upload failed');
    }
  }
}
