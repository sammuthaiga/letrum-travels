import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('🗄️  Connected to PostgreSQL database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🗄️  Disconnected from PostgreSQL database');
  }

  async cleanDb() {
    // Clean database for testing
    const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_' && key[0] !== '$');
    
    return Promise.all(
      models.map((modelKey) => {
        const model = (this as any)[modelKey as string];
        if (model && typeof model.deleteMany === 'function') {
          return model.deleteMany();
        }
        return Promise.resolve();
      }),
    );
  }
}