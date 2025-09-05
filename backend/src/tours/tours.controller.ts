import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ToursService } from './tour.service';
import { CreateTourDto, UpdateTourDto, BookTourDto } from './dto/tour.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTour(@Body(ValidationPipe) createTourDto: CreateTourDto) {
    return this.toursService.createTour(createTourDto);
  }

  @Get()
  async getAllTours(
    @Query('limit') limit?: string,
    @Query('category') category?: string,
    @Query('destination') destination?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('guests') guests?: string,
    @Query('duration') duration?: string,
    @Query('difficulty') difficulty?: string,
    @Query('search') search?: string
  ) {
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    const minPriceNum = minPrice ? parseFloat(minPrice) : undefined;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : undefined;
    const guestsNum = guests ? parseInt(guests, 10) : undefined;
    const durationNum = duration ? parseInt(duration, 10) : undefined;
    
    return this.toursService.searchTours({
      limit: limitNum,
      category,
      destination,
      minPrice: minPriceNum,
      maxPrice: maxPriceNum,
      guests: guestsNum,
      duration: durationNum,
      difficulty,
      search
    });
  }

  @Get('popular')
  async getPopularTours(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 4;
    return this.toursService.getPopularTours(limitNum);
  }

  @Get(':id')
  async getTourById(@Param('id') id: string) {
    return this.toursService.getTourById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTour(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTourDto: UpdateTourDto
  ) {
    return this.toursService.updateTour(id, updateTourDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTour(@Param('id') id: string) {
    return this.toursService.deleteTour(id);
  }

  @Post('book')
  @UseGuards(JwtAuthGuard)
  async bookTour(
    @Request() req,
    @Body(ValidationPipe) bookTourDto: BookTourDto
  ) {
    return this.toursService.bookTour(req.user.userId, bookTourDto);
  }

  @Get('bookings/my')
  @UseGuards(JwtAuthGuard)
  async getMyBookings(@Request() req) {
    return this.toursService.getUserBookings(req.user.userId);
  }

  @Get('bookings/stats')
  @UseGuards(JwtAuthGuard)
  async getBookingStats(@Request() req) {
    return this.toursService.getBookingStats(req.user.userId);
  }

  @Get('bookings/status/:status')
  @UseGuards(JwtAuthGuard)
  async getBookingsByStatus(@Request() req, @Param('status') status: string) {
    return this.toursService.getUserBookingsByStatus(req.user.userId, status);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  async createReview(
    @Request() req,
    @Param('id') tourId: string,
    @Body() body: { rating: number; comment: string }
  ) {
    return this.toursService.createReview(
      req.user.userId, 
      tourId, 
      body.rating, 
      body.comment
    );
  }
}
