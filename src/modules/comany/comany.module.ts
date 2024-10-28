import { Module } from '@nestjs/common';
import { ComanyService } from './comany.service';
import { ComanyController } from './comany.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comany } from './entities/comany.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comany])],
  controllers: [ComanyController],
  providers: [ComanyService],
})
export class ComanyModule {}
