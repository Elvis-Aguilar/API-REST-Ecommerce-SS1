import { Controller, Get } from '@nestjs/common';
import { ComanyService } from './comany.service';

@Controller('public/company')
export class ComanyController {
  constructor(private readonly comanyService: ComanyService) {}


  @Get()
  findFirst() {
    return this.comanyService.findFirst();
  }


}
