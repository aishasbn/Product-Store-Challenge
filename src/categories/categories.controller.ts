import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoriesController {
  constructor(private cats: CategoriesService) {}

  @Get()
  findAll() {
    return this.cats.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cats.findOne(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: { name: string }) {
    return this.cats.create(body.name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return this.cats.update(Number(id), body.name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cats.remove(Number(id));
  }
}
