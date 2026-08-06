import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DEMO_TRANSACTIONS = [
  { id: 'tx-1', orderId: '#6545', customerName: 'John Doe', status: 'Paid', amount: 64.00, createdAt: new Date().toISOString() },
  { id: 'tx-2', orderId: '#5412', customerName: 'Jane Smith', status: 'Pending', amount: 557.00, createdAt: new Date().toISOString() },
  { id: 'tx-3', orderId: '#6622', customerName: 'Mark Miller', status: 'Paid', amount: 156.00, createdAt: new Date().toISOString() },
  { id: 'tx-4', orderId: '#6462', customerName: 'Sarah Connor', status: 'Paid', amount: 265.00, createdAt: new Date().toISOString() },
];

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const items = await this.prisma.transaction.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
      if (items.length > 0) return items;
    } catch (err) {}
    return DEMO_TRANSACTIONS;
  }
}
