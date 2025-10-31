import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { User } from './users/user.entity';
import { Category } from './categories/category.entity';
import { Product } from './products/product.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Category, Product],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}
