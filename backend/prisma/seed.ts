import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  await prisma.transaction.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash('password123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@dealport.com',
      password: hashedPassword,
      name: 'Mark (Dealport Admin)',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', adminUser.email);

  // 2. Create Categories
  const electronicCategory = await prisma.category.create({
    data: { name: 'Electronic', slug: 'electronic', icon: 'smartphone' },
  });
  const fashionCategory = await prisma.category.create({
    data: { name: 'Fashion', slug: 'fashion', icon: 'shirt' },
  });
  const homeCategory = await prisma.category.create({
    data: { name: 'Home', slug: 'home', icon: 'home' },
  });
  const beautyCategory = await prisma.category.create({
    data: { name: 'Beauty', slug: 'beauty', icon: 'sparkles' },
  });
  const sportsCategory = await prisma.category.create({
    data: { name: 'Sports', slug: 'sports', icon: 'activity' },
  });

  console.log('✅ Categories created');

  // 3. Create Seed Products
  const productsData = [
    {
      name: 'Apple iPhone 13',
      description: 'The iPhone 13 delivers cutting-edge performance with the A15 Bionic chip, an advanced dual-camera system, and impressive battery life in a durable aluminum design.',
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
      description: 'Classic high-top sneakers offering premium support, leather craftsmanship, and iconic streetwear style.',
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
      description: 'Ultra-soft 100% organic cotton t-shirt with modern regular fit and double-stitched hem.',
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
      description: 'Versatile waterproof crossbody bag with multiple zippered compartments and adjustable ergonomic shoulder strap.',
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
    {
      name: 'Smart Fitness Tracker',
      description: 'Track your heart rate, sleep metrics, daily steps, and workout sessions with high-accuracy sensors and 7-day battery life.',
      price: 39.99,
      discountPrice: null,
      taxIncluded: true,
      stock: 150,
      isUnlimitedStock: false,
      stockStatus: 'IN_STOCK',
      status: 'PUBLISHED',
      categoryId: electronicCategory.id,
      tags: JSON.stringify(['Fitness', 'Wearable', 'Smartwatch']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80']),
      colorSwatches: JSON.stringify(['#059669', '#1E293B']),
      featured: false,
      salesCount: 620,
      orderCount: 89,
      rating: 4.5,
    },
    {
      name: 'Genuine Leather Wallet',
      description: 'Slim RFID-blocking genuine leather bi-fold wallet designed for security and elegance.',
      price: 19.99,
      discountPrice: null,
      taxIncluded: true,
      stock: 85,
      isUnlimitedStock: false,
      stockStatus: 'IN_STOCK',
      status: 'PUBLISHED',
      categoryId: fashionCategory.id,
      tags: JSON.stringify(['Wallet', 'Leather']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80']),
      colorSwatches: JSON.stringify(['#78350F', '#18181B']),
      featured: false,
      salesCount: 450,
      orderCount: 42,
      rating: 4.4,
    },
    {
      name: 'Electric Hair Trimmer Pro',
      description: 'Precision cordless grooming trimmer with self-sharpening titanium blades and digital battery LED monitor.',
      price: 34.99,
      discountPrice: null,
      taxIncluded: true,
      stock: 64,
      isUnlimitedStock: false,
      stockStatus: 'IN_STOCK',
      status: 'PUBLISHED',
      categoryId: beautyCategory.id,
      tags: JSON.stringify(['Grooming', 'Electric', 'Beauty']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80']),
      colorSwatches: JSON.stringify(['#059669', '#475569']),
      featured: false,
      salesCount: 310,
      orderCount: 38,
      rating: 4.6,
    },
    {
      name: 'Modern Ergonomic Desk Chair (Draft)',
      description: 'High-back mesh office chair with lumbar support and 3D adjustable armrests.',
      price: 249.99,
      discountPrice: 199.99,
      taxIncluded: true,
      stock: 20,
      isUnlimitedStock: false,
      stockStatus: 'IN_STOCK',
      status: 'DRAFT',
      categoryId: homeCategory.id,
      tags: JSON.stringify(['Furniture', 'Office', 'Chair']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80']),
      colorSwatches: JSON.stringify(['#000000', '#94A3B8']),
      featured: false,
      salesCount: 0,
      orderCount: 0,
      rating: 4.0,
    },
  ];

  for (const item of productsData) {
    await prisma.product.create({ data: item });
  }

  console.log('✅ Products seeded successfully');

  // 4. Create Sample Transactions
  const transactions = [
    { orderId: '#6545', customerName: 'John Doe', status: 'Paid', amount: 64.00 },
    { orderId: '#5412', customerName: 'Jane Smith', status: 'Pending', amount: 557.00 },
    { orderId: '#6622', customerName: 'Mark Miller', status: 'Paid', amount: 156.00 },
    { orderId: '#6462', customerName: 'Sarah Connor', status: 'Paid', amount: 265.00 },
    { orderId: '#6463', customerName: 'Alex Vance', status: 'Paid', amount: 265.00 },
  ];

  for (const tx of transactions) {
    await prisma.transaction.create({ data: tx });
  }

  console.log('✅ Transactions seeded');
  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
