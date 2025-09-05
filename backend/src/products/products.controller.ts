import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService, CreateProductDto, UpdateProductDto, CreateOrderDto } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('limit') limit?: string,
  ) {
    const limitNumber = limit ? parseInt(limit) : undefined;
    return this.productsService.findAll(category, search, limitNumber);
  }

  @Get('categories')
  async getCategories() {
    return this.productsService.getCategories();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @Post('orders')
  @UseGuards(JwtAuthGuard)
  async createOrder(@Request() req: any, @Body() createOrderDto: CreateOrderDto) {
    return this.productsService.createOrder(req.user.userId, createOrderDto);
  }

  @Get('orders/my')
  @UseGuards(JwtAuthGuard)
  async getUserOrders(@Request() req: any) {
    return this.productsService.getUserOrders(req.user.userId);
  }

  @Get('orders/:id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(@Param('id') id: string, @Request() req: any) {
    return this.productsService.getOrderById(id, req.user.userId);
  }

  @Put('orders/:id/status')
  @UseGuards(JwtAuthGuard)
  async updateOrderStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.productsService.updateOrderStatus(id, status);
  }
}