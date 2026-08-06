import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DEMO_CATEGORIES = [
  { id: 'cat-1', name: 'Electronic', slug: 'electronic', icon: 'smartphone', _count: { products: 12 } },
  { id: 'cat-2', name: 'Fashion', slug: 'fashion', icon: 'shirt', _count: { products: 28 } },
  { id: 'cat-3', name: 'Home', slug: 'home', icon: 'home', _count: { products: 8 } },
  { id: 'cat-4', name: 'Beauty', slug: 'beauty', icon: 'sparkles', _count: { products: 15 } },
  { id: 'cat-5', name: 'Sports', slug: 'sports', icon: 'activity', _count: { products: 6 } },
];

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const items = await this.prisma.category.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
        orderBy: { name: 'asc' },
      });
      if (items.length > 0) return items;
    } catch (err) {}
    return DEMO_CATEGORIES;
  }

  async create(name: string, icon?: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    try {
      const existing = await this.prisma.category.findUnique({ where: { slug } });
      if (existing) {
        throw new ConflictException('Category with this name already exists');
      }
      return await this.prisma.category.create({
        data: { name, slug, icon },
      });
    } catch (err) {
      const newCat = { id: `cat-${Date.now()}`, name, slug, icon: icon || 'tag', _count: { products: 0 } };
      DEMO_CATEGORIES.push(newCat);
      return newCat;
    }
  }
}
