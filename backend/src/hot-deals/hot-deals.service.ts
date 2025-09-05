import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHotDealDto } from './dto/create-hot-deal.dto';
import { UpdateHotDealDto } from './dto/update-hot-deal.dto';
import { HotDealResponseDto } from './dto/hot-deal-response.dto';

@Injectable()
export class HotDealsService {
  constructor(private prisma: PrismaService) {}

  async create(createHotDealDto: CreateHotDealDto): Promise<HotDealResponseDto> {
    const { startDate, endDate, ...rest } = createHotDealDto;

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      throw new BadRequestException('End date must be after start date');
    }

    if (start < new Date()) {
      throw new BadRequestException('Start date cannot be in the past');
    }

    const hotDeal = await this.prisma.hotDeal.create({
      data: {
        ...rest,
        startDate: start,
        endDate: end,
      },
    });

    return hotDeal;
  }

  async findAll(params?: {
    active?: boolean;
    featured?: boolean;
    category?: string;
    limit?: number;
  }): Promise<HotDealResponseDto[]> {
    const { active, featured, category, limit } = params || {};

    const where: any = {};
    
    if (active !== undefined) {
      where.isActive = active;
    }
    
    if (featured !== undefined) {
      where.isFeatured = featured;
    }
    
    if (category) {
      where.category = category;
    }

    // Only show deals that haven't expired
    where.endDate = {
      gte: new Date(),
    };

    const hotDeals = await this.prisma.hotDeal.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    });

    return hotDeals;
  }

  async findOne(id: string): Promise<HotDealResponseDto> {
    const hotDeal = await this.prisma.hotDeal.findUnique({
      where: { id },
    });

    if (!hotDeal) {
      throw new NotFoundException(`Hot deal with ID ${id} not found`);
    }

    return hotDeal;
  }

  async update(id: string, updateHotDealDto: UpdateHotDealDto): Promise<HotDealResponseDto> {
    const existingDeal = await this.findOne(id);

    const { startDate, endDate, ...rest } = updateHotDealDto;
    const updateData: any = { ...rest };

    // Validate dates if provided
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : existingDeal.startDate;
      const end = endDate ? new Date(endDate) : existingDeal.endDate;

      if (start >= end) {
        throw new BadRequestException('End date must be after start date');
      }

      if (startDate) updateData.startDate = start;
      if (endDate) updateData.endDate = end;
    }

    const hotDeal = await this.prisma.hotDeal.update({
      where: { id },
      data: updateData,
    });

    return hotDeal;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Check if exists

    await this.prisma.hotDeal.delete({
      where: { id },
    });
  }

  async getFeatured(limit: number = 6): Promise<HotDealResponseDto[]> {
    return this.findAll({ 
      active: true, 
      featured: true, 
      limit 
    });
  }

  async getByCategory(category: string, limit?: number): Promise<HotDealResponseDto[]> {
    return this.findAll({ 
      active: true, 
      category, 
      limit 
    });
  }

  async bookSlot(id: string, slots: number = 1): Promise<HotDealResponseDto> {
    const hotDeal = await this.findOne(id);

    if (hotDeal.bookedSlots + slots > hotDeal.availableSlots) {
      throw new BadRequestException('Not enough available slots');
    }

    if (new Date() > hotDeal.endDate) {
      throw new BadRequestException('This deal has expired');
    }

    const updatedDeal = await this.prisma.hotDeal.update({
      where: { id },
      data: {
        bookedSlots: hotDeal.bookedSlots + slots,
      },
    });

    return updatedDeal;
  }
}
