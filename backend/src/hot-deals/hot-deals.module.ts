import { Module } from '@nestjs/common';
import { HotDealsService } from './hot-deals.service';
import { HotDealsController } from './hot-deals.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HotDealsController],
  providers: [HotDealsService],
  exports: [HotDealsService],
})
export class HotDealsModule {}
