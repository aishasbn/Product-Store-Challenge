import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Get()
  findAll() {
    return this.products.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.products.findOne(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: { name: string; categoryId: number }) {
    return this.products.create(body.name, body.categoryId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name?: string; categoryId?: number }) {
    return this.products.update(Number(id), body.name, body.categoryId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.products.remove(Number(id));
  }
}