import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';

@Module({
  exports: [ServiceService],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
