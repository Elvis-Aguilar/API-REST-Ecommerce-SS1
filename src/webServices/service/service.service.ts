import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PaymentMethod } from '../../modules/users/persistance/enums/paymentMethod';
import axios from 'axios';
import { TransactionRequestDto } from './dto/transaction-request.dto';
import * as process from 'node:process';
import { LoggerPayMethodDto } from '../../modules/carts/dto/logger-pay-method.dto';

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
        throw new ConflictException(`El usuario no tiene una cuenta vigente en la pasarela de pagos`);
      }
    }

    if (paymentho == PaymentMethod.PAYPAL) {
      //TODO: logica para el paypal
      return true;
    }
    return false;
  }

  async loggerUser(logger:LoggerPayMethodDto, payMethod: PaymentMethod) {
    let paymentApiUrl = `${process.env.API_PASARELA_A}api/usuario/public/login`;

    if (payMethod === PaymentMethod.PAYMENT_GATEWAY_B) {
      paymentApiUrl = `${process.env.API_PASARELA_B}api/usuario/public/login`;
    }
    try {
      const response = await axios.post(paymentApiUrl, logger);

      const jwt = response.data?.jwt;
      if (jwt) {
        return {
          jwt: jwt
        };
      } else {
        throw new HttpException('JWT no encontrado en la respuesta de la pasarela de pagos', 404);
      }
    } catch (error) {
      if (error.response) {
        throw new HttpException('Error al conectar con la pasarela de pagos', 404);
      } else {
        throw new HttpException('Error al conectar con la pasarela de pagos', 404);
      }
    }
  }

  async validTransactionMoney(jwt: string, paymentho: PaymentMethod, name:string,total: number): Promise<string> {
    let respuesta = 'OK';
    let paymentApiUrl = `${process.env.API_PASARELA_A}api/transaccion/protected/pagarGetComprobante`;

    if (paymentho === PaymentMethod.PAYMENT_GATEWAY_B) {
      paymentApiUrl = `${process.env.API_PASARELA_B}api/transaccion/protected/pagarGetComprobante`;
    }

    if (paymentho === PaymentMethod.PAYMENT_GATEWAY_A || paymentho === PaymentMethod.PAYMENT_GATEWAY_B) {
      try {
        const transaccionInfo: TransactionRequestDto = {
          concepto: `compra del cliente: ${name}, con un Total gastado: ${total} la fecha: fecha de hoy`,
          identificadorTienda: 'a',
          nombreTienda: `${process.env.NAME_TIENDA}`,
          cantidad: Number(total),
          correoReceptor: `${process.env.EMAIL_TIENDA}`,
        };

        const paymentApiResponse = await axios.post(paymentApiUrl, transaccionInfo, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (paymentApiResponse.status === 200) {
          return respuesta;
        }
      } catch (error) {
        if (error.response) {
          // Manejo de respuestas específicas según el código de error de la API
          switch (error.response.status) {
            case 400:
              respuesta = 'Solicitud incorrecta';
              break;
            case 404:
              respuesta = 'Usuario no encontrado en la pasarela de pagos';
              break;
            case 409:
              respuesta = 'Saldo insuficiente para la transacción';
              break;
            default:
              respuesta = 'Error al realizar la transacción de dinero';
          }
          return respuesta;
        } else {
          return 'Error al realizar la transacción de dinero';
        }
      }
    } else {
      // Lógica para otras pasarelas de pago (como PayPal) si es necesario
    }

    return respuesta;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
