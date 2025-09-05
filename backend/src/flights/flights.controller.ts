import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, Put, Delete } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto, SearchFlightDto, BookFlightDto } from './dto/flight.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createFlight(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.createFlight(createFlightDto);
  }

  @Get('search')
  searchFlights(@Query() searchParams: SearchFlightDto) {
    return this.flightsService.searchFlights(searchParams);
  }

  @Get('popular-destinations')
  getPopularDestinations() {
    return this.flightsService.getPopularDestinations();
  }

  @Get()
  getAllFlights(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    return this.flightsService.getAllFlights(parsedLimit);
  }

  @Get(':id')
  getFlightById(@Param('id') id: string) {
    return this.flightsService.getFlightById(id);
  }

  @Post('book')
  @UseGuards(JwtAuthGuard)
  bookFlight(@Request() req, @Body() bookFlightDto: BookFlightDto) {
    return this.flightsService.bookFlight(req.user.userId, bookFlightDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateFlight(@Param('id') id: string, @Body() updateFlightDto: Partial<CreateFlightDto>) {
    return this.flightsService.updateFlight(id, updateFlightDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteFlight(@Param('id') id: string) {
    return this.flightsService.deleteFlight(id);
  }
}
