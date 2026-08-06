import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    // Non-blocking serverless initialization: Prisma connects lazily per request
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch {}
  }
}
