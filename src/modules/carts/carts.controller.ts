import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { LoggerPayMethodDto } from './dto/logger-pay-method.dto';
import { PaymentMethod } from '../users/persistance/enums/paymentMethod';
import { Response } from 'express';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}


  @Post()
  async create(@Body() createCartDto: CreateCartDto, @Res() res: Response) {
    const { cart, pdf } = await this.cartsService.create(createCartDto);

    if (pdf) {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="comprobante.pdf"`,
      });
      res.send(pdf);
    } else {
      res.json(cart);
    }
  }


  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cartsService.findOne(id);
  }

  @Get('users/:id')
  findAllByUserId(@Param('id') id: number) {
    return this.cartsService.findAllUserById(id);
  }

  @Post(':payMethod')
  loggerUserPay(@Param('payMethod') payMethod: string, @Body() logger:LoggerPayMethodDto) {
    const pay = payMethod as PaymentMethod
    return this.cartsService.loggerUser(logger, pay)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
