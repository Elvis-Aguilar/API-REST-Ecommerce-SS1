import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { ProductsModule } from './modules/products/products.module';
import { CloudinaryModule } from './config/cloudinary/cloudinary.module';
import { CartsModule } from './modules/carts/carts.module';
import { CartItemsModule } from './modules/cart-items/cart-items.module';
import { ServiceModule } from './webServices/service/service.module';
import { ComanyModule } from './modules/comany/comany.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    RolesModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    SuppliersModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CloudinaryModule,
    CartsModule,
    CartItemsModule,
    ServiceModule,
    ComanyModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
