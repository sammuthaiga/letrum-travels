import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HotDealsService } from './hot-deals.service';
import { CreateHotDealDto } from './dto/create-hot-deal.dto';
import { UpdateHotDealDto } from './dto/update-hot-deal.dto';
import { HotDealResponseDto } from './dto/hot-deal-response.dto';

@Controller('hot-deals')
export class HotDealsController {
  constructor(private readonly hotDealsService: HotDealsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createHotDealDto: CreateHotDealDto): Promise<HotDealResponseDto> {
    return this.hotDealsService.create(createHotDealDto);
  }

  @Get()
  async findAll(
    @Query('active') active?: string,
    @Query('featured') featured?: string,
    @Query('category') category?: string,
    @Query('limit') limit?: string,
  ): Promise<HotDealResponseDto[]> {
    const params = {
      active: active === 'true' ? true : active === 'false' ? false : undefined,
      featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
      category: category || undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    };

    return this.hotDealsService.findAll(params);
  }

  @Get('featured')
  async getFeatured(@Query('limit') limit?: string): Promise<HotDealResponseDto[]> {
    const limitNum = limit ? parseInt(limit, 10) : 6;
    return this.hotDealsService.getFeatured(limitNum);
  }

  @Get('category/:category')
  async getByCategory(
    @Param('category') category: string,
    @Query('limit') limit?: string,
  ): Promise<HotDealResponseDto[]> {
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    return this.hotDealsService.getByCategory(category, limitNum);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<HotDealResponseDto> {
    return this.hotDealsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHotDealDto: UpdateHotDealDto,
  ): Promise<HotDealResponseDto> {
    return this.hotDealsService.update(id, updateHotDealDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.hotDealsService.remove(id);
  }

  @Post(':id/book')
  async bookSlot(
    @Param('id') id: string,
    @Body('slots') slots: number = 1,
  ): Promise<HotDealResponseDto> {
    return this.hotDealsService.bookSlot(id, slots);
  }
}
