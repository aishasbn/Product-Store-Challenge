import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async create(name: string, categoryId: number) {
    const cat = await this.categoriesService.findOne(categoryId);
    if (!cat) throw new NotFoundException('Category not found');
    const p = this.repo.create({ name, category: cat, categoryId: cat.id });
    return this.repo.save(p);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, name?: string, categoryId?: number) {
    const p = await this.findOne(id);
    if (!p) throw new NotFoundException('Product not found');
    if (categoryId) {
      const cat = await this.categoriesService.findOne(categoryId);
      if (!cat) throw new NotFoundException('Category not found');
      p.category = cat;
      p.categoryId = cat.id;
    }
    p.name = name ?? p.name;
    return this.repo.save(p);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
