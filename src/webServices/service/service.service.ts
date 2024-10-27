import { ConflictException, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { PaymentMethod } from '../../modules/users/persistance/enums/paymentMethod';
import axios from 'axios';

@Injectable()
export class ServiceService {

  async validUserExisParaseral(paymentho: PaymentMethod, email:string): Promise<boolean> {
    let paymentApiUrl = `${process.env.API_PASARELA_A}api/usuario/public/existeEmail/${email}`;

    if (paymentho === PaymentMethod.PAYMENT_GATEWAY_B) {
      paymentApiUrl = `${process.env.API_PASARELA_B}api/usuario/public/existeEmail/${email}`;
    }

    if (paymentho === PaymentMethod.PAYMENT_GATEWAY_A || paymentho === PaymentMethod.PAYMENT_GATEWAY_B) {

      try {
        const paymentApiResponse = await axios.get(paymentApiUrl);

        const tieneCuenta = paymentApiResponse.data?.tieneCuenta;

        if (!tieneCuenta) {
          throw new ConflictException(
            `El usuario no tiene una cuenta vigente en la pasarela de pagos`,
          );
        }
        return true
      } catch (error) {
        throw new ConflictException(`Error al validar el usuario en la pasarela de pagos`);
      }
    }

    if (paymentho == PaymentMethod.PAYPAL) {
      //TODO: logica para el paypal
      return true;
    }
    return false;
  }

  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
