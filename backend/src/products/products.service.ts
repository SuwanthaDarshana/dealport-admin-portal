import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private parseProduct(product: any) {
    if (!product) return null;
    return {
      ...product,
      tags: typeof product.tags === 'string' ? JSON.parse(product.tags || '[]') : product.tags,
      images: typeof product.images === 'string' ? JSON.parse(product.images || '[]') : product.images,
      colorSwatches: typeof product.colorSwatches === 'string' ? JSON.parse(product.colorSwatches || '[]') : product.colorSwatches,
    };
  }

  async findAll(queryDto: ProductQueryDto) {
    const { search, category, status, page = 1, limit = 10 } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (category && category !== 'all') {
      where.OR = [
        { categoryId: category },
        { category: { slug: category } },
      ];
    }

    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    const [total, items] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: items.map((item) => this.parseProduct(item)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.parseProduct(product);
  }

  async create(createProductDto: CreateProductDto) {
    const {
      tags,
      images,
      colorSwatches,
      expirationStart,
      expirationEnd,
      ...rest
    } = createProductDto;

    const product = await this.prisma.product.create({
      data: {
        ...rest,
        tags: JSON.stringify(tags || []),
        images: JSON.stringify(images || []),
        colorSwatches: JSON.stringify(colorSwatches || []),
        expirationStart: expirationStart ? new Date(expirationStart) : null,
        expirationEnd: expirationEnd ? new Date(expirationEnd) : null,
      },
      include: { category: true },
    });

    return this.parseProduct(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id); // Ensure product exists

    const {
      tags,
      images,
      colorSwatches,
      expirationStart,
      expirationEnd,
      ...rest
    } = updateProductDto;

    const data: any = { ...rest };

    if (tags !== undefined) data.tags = JSON.stringify(tags);
    if (images !== undefined) data.images = JSON.stringify(images);
    if (colorSwatches !== undefined) data.colorSwatches = JSON.stringify(colorSwatches);
    if (expirationStart !== undefined) data.expirationStart = expirationStart ? new Date(expirationStart) : null;
    if (expirationEnd !== undefined) data.expirationEnd = expirationEnd ? new Date(expirationEnd) : null;

    const updated = await this.prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });

    return this.parseProduct(updated);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.product.delete({ where: { id } });
    return { success: true, message: `Product ${id} deleted successfully` };
  }

  async getBestSelling() {
    const products = await this.prisma.product.findMany({
      take: 5,
      orderBy: { orderCount: 'desc' },
      include: { category: true },
    });
    return products.map((item) => this.parseProduct(item));
  }

  async getTopRated() {
    const products = await this.prisma.product.findMany({
      take: 4,
      orderBy: { rating: 'desc' },
      include: { category: true },
    });
    return products.map((item) => this.parseProduct(item));
  }
}
