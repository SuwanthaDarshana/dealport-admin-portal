import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      await this.autoSeedIfEmpty();
    } catch (err) {
      this.logger.warn(`Database connection deferred or pending: ${err}`);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch {}
  }

  private async autoSeedIfEmpty() {
    try {
      const userCount = await this.user.count();
      if (userCount > 0) return;

      this.logger.log('🌱 Database is empty. Running automatic seed on deployment...');

      const hashedPassword = await bcrypt.hash('password123', 10);
      await this.user.create({
        data: {
          email: 'admin@dealport.com',
          password: hashedPassword,
          name: 'Mark (Dealport Admin)',
          role: 'ADMIN',
        },
      });

      const electronicCategory = await this.category.create({
        data: { name: 'Electronic', slug: 'electronic', icon: 'smartphone' },
      });
      const fashionCategory = await this.category.create({
        data: { name: 'Fashion', slug: 'fashion', icon: 'shirt' },
      });
      const homeCategory = await this.category.create({
        data: { name: 'Home', slug: 'home', icon: 'home' },
      });
      const beautyCategory = await this.category.create({
        data: { name: 'Beauty', slug: 'beauty', icon: 'sparkles' },
      });
      const sportsCategory = await this.category.create({
        data: { name: 'Sports', slug: 'sports', icon: 'activity' },
      });

      const productsData = [
        {
          name: 'Apple iPhone 13',
          description: 'The iPhone 13 delivers cutting-edge performance with the A15 Bionic chip.',
          price: 999.00,
          discountPrice: 900.89,
          taxIncluded: true,
          stock: 104,
          isUnlimitedStock: false,
          stockStatus: 'IN_STOCK',
          status: 'PUBLISHED',
          categoryId: electronicCategory.id,
          tags: JSON.stringify(['Mobile', 'Apple', 'Smartphone']),
          images: JSON.stringify(['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80']),
          colorSwatches: JSON.stringify(['#1E293B', '#E2E8F0', '#F43F5E']),
          featured: true,
          salesCount: 1250,
          orderCount: 104,
          rating: 4.9,
        },
        {
          name: 'Nike Air Jordan',
          description: 'Classic high-top sneakers offering premium support and iconic streetwear style.',
          price: 72.40,
          discountPrice: 65.00,
          taxIncluded: true,
          stock: 0,
          isUnlimitedStock: false,
          stockStatus: 'OUT_OF_STOCK',
          status: 'PUBLISHED',
          categoryId: fashionCategory.id,
          tags: JSON.stringify(['Sneakers', 'Shoes', 'Nike']),
          images: JSON.stringify(['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80']),
          colorSwatches: JSON.stringify(['#EF4444', '#18181B']),
          featured: true,
          salesCount: 840,
          orderCount: 56,
          rating: 4.8,
        },
        {
          name: 'Essential Cotton T-shirt',
          description: 'Ultra-soft 100% organic cotton t-shirt with modern regular fit.',
          price: 35.40,
          discountPrice: 29.99,
          taxIncluded: true,
          stock: 266,
          isUnlimitedStock: true,
          stockStatus: 'IN_STOCK',
          status: 'PUBLISHED',
          categoryId: fashionCategory.id,
          tags: JSON.stringify(['Apparel', 'Tshirt', 'Cotton']),
          images: JSON.stringify(['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80']),
          colorSwatches: JSON.stringify(['#000000', '#FFFFFF', '#059669']),
          featured: false,
          salesCount: 1920,
          orderCount: 266,
          rating: 4.6,
        },
        {
          name: 'Assorted Cross Bag',
          description: 'Versatile waterproof crossbody bag with multiple zippered compartments.',
          price: 80.00,
          discountPrice: 69.99,
          taxIncluded: true,
          stock: 506,
          isUnlimitedStock: false,
          stockStatus: 'IN_STOCK',
          status: 'PUBLISHED',
          categoryId: fashionCategory.id,
          tags: JSON.stringify(['Bag', 'Accessories', 'Travel']),
          images: JSON.stringify(['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80']),
          colorSwatches: JSON.stringify(['#374151', '#D97706']),
          featured: true,
          salesCount: 1430,
          orderCount: 506,
          rating: 4.7,
        },
      ];

      for (const item of productsData) {
        await this.product.create({ data: item });
      }

      const transactions = [
        { orderId: '#6545', customerName: 'John Doe', status: 'Paid', amount: 64.00 },
        { orderId: '#5412', customerName: 'Jane Smith', status: 'Pending', amount: 557.00 },
        { orderId: '#6622', customerName: 'Mark Miller', status: 'Paid', amount: 156.00 },
        { orderId: '#6462', customerName: 'Sarah Connor', status: 'Paid', amount: 265.00 },
      ];

      for (const tx of transactions) {
        await this.transaction.create({ data: tx });
      }

      this.logger.log('✅ Automatic database seed completed successfully!');
    } catch (err) {
      this.logger.warn(`Auto-seed skipped or non-fatal initialization notice: ${err}`);
    }
  }
}
