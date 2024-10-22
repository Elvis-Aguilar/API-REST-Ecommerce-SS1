import { Module } from '@nestjs/common';
import { SuppliersService } from './domain/service/suppliers.service';
import { SuppliersController } from './controller/suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService],
})
export class SuppliersModule {}
