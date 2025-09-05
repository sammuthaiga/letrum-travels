import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

// Define Flight type from Prisma schema
type Flight = {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  duration: string;
  price: number;
  availableSeats: number;
  aircraft?: string;
  baggage?: any;
  layovers?: any;
  class: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
import { CreateFlightDto, SearchFlightDto, BookFlightDto } from './dto/flight.dto';

@Injectable()
export class FlightsService {
  constructor(private prisma: PrismaService) {}

  async createFlight(createFlightDto: CreateFlightDto): Promise<Flight> {
    return this.prisma.flight.create({
      data: createFlightDto,
    });
  }

  async searchFlights(searchParams: SearchFlightDto): Promise<Flight[]> {
    const { origin, destination, departureDate, returnDate, passengers, class: flightClass } = searchParams;

    const where: any = {
      isActive: true,
      availableSeats: { gte: passengers || 1 },
    };

    if (origin) {
      where.origin = { contains: origin, mode: 'insensitive' };
    }

    if (destination) {
      where.destination = { contains: destination, mode: 'insensitive' };
    }

    if (departureDate) {
      const startDate = new Date(departureDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      
      where.departureTime = {
        gte: startDate,
        lt: endDate,
      };
    }

    if (flightClass) {
      where.class = flightClass;
    }

    return this.prisma.flight.findMany({
      where,
      orderBy: [
        { price: 'asc' },
        { departureTime: 'asc' },
      ],
    });
  }

  async getFlightById(id: string): Promise<Flight> {
    const flight = await this.prisma.flight.findUnique({
      where: { id },
    });

    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    return flight;
  }

  async bookFlight(userId: string, bookFlightDto: BookFlightDto) {
    const { flightId, passengers, seatPreferences, contactInfo } = bookFlightDto;

    const flight = await this.getFlightById(flightId);

    if (flight.availableSeats < passengers.length) {
      throw new BadRequestException('Not enough seats available');
    }

    const totalAmount = flight.price * passengers.length;

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        userId,
        type: 'FLIGHT',
        status: 'PENDING',
        totalAmount,
        details: {
          flightId,
          passengers: passengers as any,
          seatPreferences,
          contactInfo: contactInfo as any,
          flightDetails: {
            flightNumber: flight.flightNumber,
            airline: flight.airline,
            origin: flight.origin,
            destination: flight.destination,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Update available seats
    await this.prisma.flight.update({
      where: { id: flightId },
      data: {
        availableSeats: flight.availableSeats - passengers.length,
      },
    });

    return booking;
  }

  async getAllFlights(limit?: number): Promise<Flight[]> {
    return this.prisma.flight.findMany({
      where: { isActive: true },
      orderBy: { departureTime: 'asc' },
      take: limit,
    });
  }

  async updateFlight(id: string, updateData: Partial<CreateFlightDto>): Promise<Flight> {
    await this.getFlightById(id); // Check if exists

    return this.prisma.flight.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteFlight(id: string): Promise<Flight> {
    await this.getFlightById(id); // Check if exists

    return this.prisma.flight.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async getPopularDestinations(): Promise<any[]> {
    const destinations = await this.prisma.flight.groupBy({
      by: ['destination'],
      where: { isActive: true },
      _count: { destination: true },
      orderBy: { _count: { destination: 'desc' } },
      take: 10,
    });

    return destinations.map(dest => ({
      destination: dest.destination,
      flightCount: dest._count.destination,
    }));
  }
}
