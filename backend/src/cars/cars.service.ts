import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto, SearchCarDto, BookCarDto } from './dto/car.dto';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  async createCar(createCarDto: CreateCarDto) {
    try {
      return await this.prisma.car.create({
        data: {
          make: createCarDto.make,
          model: createCarDto.model,
          year: createCarDto.year,
          category: createCarDto.category,
          transmission: createCarDto.transmission,
          fuelType: createCarDto.fuelType,
          seats: createCarDto.seats,
          doors: createCarDto.doors,
          aircon: createCarDto.aircon ?? true,
          pricePerDay: createCarDto.pricePerDay,
          images: createCarDto.images || [],
          features: createCarDto.features || [],
          location: createCarDto.location,
          isAvailable: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(`Failed to create car: ${error.message}`);
    }
  }

  async searchCars(searchParams: SearchCarDto) {
    const { location, pickupDate, dropoffDate, category, transmission, minPrice, maxPrice } = searchParams;

    const where: any = {
      isAvailable: true,
    };

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (transmission) {
      where.transmission = { equals: transmission, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      where.pricePerDay = {};
      if (minPrice) where.pricePerDay.gte = minPrice;
      if (maxPrice) where.pricePerDay.lte = maxPrice;
    }

    return this.prisma.car.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCarById(id: string) {
    const car = await this.prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return car;
  }

  async bookCar(userId: string, bookCarDto: BookCarDto) {
    const { carId, pickupDate, dropoffDate, totalAmount, pickupLocation, dropoffLocation, contactInfo, specialRequests } = bookCarDto;

    // Check if car exists and is available
    const car = await this.getCarById(carId);
    
    if (!car.isAvailable) {
      throw new BadRequestException('Car is not available for booking');
    }

    // Check for date conflicts (simplified - in production, you'd want more sophisticated logic)
    const startDate = new Date(pickupDate);
    const endDate = new Date(dropoffDate);
    
    if (startDate >= endDate) {
      throw new BadRequestException('Pickup date must be before dropoff date');
    }

    if (startDate < new Date()) {
      throw new BadRequestException('Pickup date cannot be in the past');
    }

    // Calculate days and total amount if not provided
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const calculatedAmount = totalAmount || (car.pricePerDay * days);

    try {
      // Create the booking
      const booking = await this.prisma.booking.create({
        data: {
          userId,
          type: 'CAR_RENTAL',
          status: 'PENDING',
          details: JSON.stringify({
            carId,
            make: car.make,
            model: car.model,
            pickupDate,
            dropoffDate,
            pickupLocation,
            dropoffLocation: dropoffLocation || pickupLocation,
            contactInfo,
            specialRequests,
            days,
            pricePerDay: car.pricePerDay,
          }),
          totalAmount: calculatedAmount,
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

      return {
        success: true,
        message: 'Car booking created successfully',
        booking,
        car: {
          id: car.id,
          make: car.make,
          model: car.model,
          pricePerDay: car.pricePerDay,
        },
      };
    } catch (error) {
      console.error('Error creating car booking:', error);
      throw new InternalServerErrorException('Failed to create car booking');
    }
  }

  async getAllCars(limit?: number) {
    return this.prisma.car.findMany({
      where: { isAvailable: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCarsByLocation(location: string) {
    return this.prisma.car.findMany({
      where: {
        location: { contains: location, mode: 'insensitive' },
        isAvailable: true,
      },
    });
  }

  async updateCar(id: string, updateData: Partial<CreateCarDto>) {
    await this.getCarById(id); // Check if exists

    return this.prisma.car.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteCar(id: string) {
    await this.getCarById(id); // Check if exists

    return this.prisma.car.update({
      where: { id },
      data: { isAvailable: false },
    });
  }

  async getPopularLocations() {
    const locations = await this.prisma.car.groupBy({
      by: ['location'],
      where: { isAvailable: true },
      _count: {
        location: true,
      },
      orderBy: {
        _count: {
          location: 'desc',
        },
      },
      take: 10,
    });

    return locations.map(location => ({
      name: location.location,
      count: location._count.location,
    }));
  }

  async getCarsByCategory() {
    const categories = await this.prisma.car.groupBy({
      by: ['category'],
      where: { isAvailable: true },
      _count: {
        category: true,
      },
      orderBy: {
        _count: {
          category: 'desc',
        },
      },
    });

    return categories.map(category => ({
      name: category.category,
      count: category._count.category,
    }));
  }
}