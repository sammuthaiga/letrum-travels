import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, Put, Delete } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, SearchCarDto, BookCarDto } from './dto/car.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCar(createCarDto);
  }

  @Get('search')
  searchCars(@Query() searchParams: SearchCarDto) {
    return this.carsService.searchCars(searchParams);
  }

  @Get('popular-locations')
  getPopularLocations() {
    return this.carsService.getPopularLocations();
  }

  @Get('categories')
  getCarsByCategory() {
    return this.carsService.getCarsByCategory();
  }

  @Get('location/:location')
  getCarsByLocation(@Param('location') location: string) {
    return this.carsService.getCarsByLocation(location);
  }

  @Get()
  getAllCars(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    return this.carsService.getAllCars(parsedLimit);
  }

  @Get(':id')
  getCarById(@Param('id') id: string) {
    return this.carsService.getCarById(id);
  }

  @Post('book')
  @UseGuards(JwtAuthGuard)
  bookCar(@Request() req, @Body() bookCarDto: BookCarDto) {
    return this.carsService.bookCar(req.user.userId, bookCarDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateCar(@Param('id') id: string, @Body() updateCarDto: Partial<CreateCarDto>) {
    return this.carsService.updateCar(id, updateCarDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteCar(@Param('id') id: string) {
    return this.carsService.deleteCar(id);
  }
}
