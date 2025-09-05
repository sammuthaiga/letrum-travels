import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTourDto, UpdateTourDto, BookTourDto } from './dto/tour.dto';

export interface TourSearchParams {
  limit?: number;
  category?: string;
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  duration?: number;
  difficulty?: string;
  search?: string;
}

@Injectable()
export class ToursService {
  constructor(private prisma: PrismaService) {}

  async createTour(createTourDto: CreateTourDto) {
    try {
      const tour = await this.prisma.tour.create({
        data: {
          ...createTourDto,
        },
      });

      return {
        message: 'Tour created successfully',
        tour,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create tour');
    }
  }

  async searchTours(params: TourSearchParams) {
    const {
      limit,
      category,
      destination,
      minPrice,
      maxPrice,
      guests,
      duration,
      difficulty,
      search
    } = params;

    const where: any = {
      isActive: true,
    };

    // Filter by category
    if (category) {
      where.category = category;
    }

    // Filter by destination (search in title and description)
    if (destination) {
      where.OR = [
        { title: { contains: destination, mode: 'insensitive' } },
        { description: { contains: destination, mode: 'insensitive' } },
      ];
    }

    // Filter by price range
    if (minPrice !== undefined) {
      where.price = { ...where.price, gte: minPrice };
    }
    if (maxPrice !== undefined) {
      where.price = { ...where.price, lte: maxPrice };
    }

    // Filter by guest capacity
    if (guests) {
      where.maxGuests = { gte: guests };
    }

    // Filter by duration
    if (duration) {
      // Assuming duration is stored as a string like "3 days", we'll do a text search
      where.duration = { contains: duration.toString() };
    }

    // Filter by difficulty
    if (difficulty) {
      where.difficulty = difficulty;
    }

    // General search across multiple fields
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    try {
      const tours = await this.prisma.tour.findMany({
        where,
        take: limit,
        orderBy: [
          { createdAt: 'desc' }
        ],
        include: {
          reviews: true,
          _count: {
            select: { reviews: true }
          }
        }
      });

      // Calculate average rating for each tour
      const toursWithRating = tours.map(tour => ({
        ...tour,
        averageRating: tour.reviews.length > 0 
          ? Math.round((tour.reviews.reduce((sum, review) => sum + review.rating, 0) / tour.reviews.length) * 10) / 10
          : 0
      }));

      // Sort by average rating in descending order
      toursWithRating.sort((a, b) => b.averageRating - a.averageRating);

      return toursWithRating;
    } catch (error) {
      console.error('Search tours error:', error);
      return [];
    }
  }

  async getAllTours(limit?: number, category?: string) {
    const where: any = { isActive: true };
    
    if (category) {
      where.category = category;
    }

    const tours = await this.prisma.tour.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        reviews: true,
        _count: {
          select: { reviews: true }
        }
      }
    });

    // Calculate average rating for each tour
    const toursWithRating = tours.map(tour => ({
      ...tour,
      averageRating: tour.reviews.length > 0 
        ? Math.round((tour.reviews.reduce((sum, review) => sum + review.rating, 0) / tour.reviews.length) * 10) / 10
        : 0
    }));

    return toursWithRating;
  }

  async getPopularTours(limit: number = 4) {
    try {
      const tours = await this.prisma.tour.findMany({
        where: { isActive: true },
        take: limit * 2, // Get more to sort by rating
        orderBy: { createdAt: 'desc' },
        include: {
          reviews: true,
          _count: {
            select: { reviews: true }
          }
        }
      });

      // Calculate average rating for each tour
      const toursWithRating = tours.map(tour => ({
        ...tour,
        averageRating: tour.reviews.length > 0 
          ? Math.round((tour.reviews.reduce((sum, review) => sum + review.rating, 0) / tour.reviews.length) * 10) / 10
          : 0
      }));

      // Sort by average rating and number of reviews, then take the limit
      const popularTours = toursWithRating
        .sort((a, b) => {
          // First sort by average rating
          if (b.averageRating !== a.averageRating) {
            return b.averageRating - a.averageRating;
          }
          // Then by number of reviews
          return b.reviews.length - a.reviews.length;
        })
        .slice(0, limit);

      return popularTours;
    } catch (error) {
      console.error('Get popular tours error:', error);
      return [];
    }
  }

  async getTourById(id: string) {
    const tour = await this.prisma.tour.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { reviews: true }
        }
      }
    });

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    return tour;
  }

  async updateTour(id: string, updateTourDto: UpdateTourDto) {
    try {
      const tour = await this.prisma.tour.update({
        where: { id },
        data: updateTourDto,
      });

      return {
        message: 'Tour updated successfully',
        tour,
      };
    } catch (error) {
      throw new NotFoundException('Tour not found');
    }
  }

  async deleteTour(id: string) {
    try {
      await this.prisma.tour.update({
        where: { id },
        data: { isActive: false },
      });

      return {
        message: 'Tour deleted successfully',
      };
    } catch (error) {
      throw new NotFoundException('Tour not found');
    }
  }

  async bookTour(userId: string, bookTourDto: BookTourDto) {
    const { tourId, guests, startDate, notes, ...bookingDetails } = bookTourDto;

    // Verify tour exists and is active
    const tour = await this.prisma.tour.findFirst({
      where: { id: tourId, isActive: true }
    });

    if (!tour) {
      throw new NotFoundException('Tour not found or inactive');
    }

    // Check if tour has capacity
    if (tour.maxGuests < guests) {
      throw new BadRequestException('Tour exceeds maximum guest capacity');
    }

    try {
      // Calculate total amount (base price × guests)
      const totalAmount = tour.price * guests;

      // Create booking
      const booking = await this.prisma.booking.create({
        data: {
          userId,
          type: 'TOUR',
          status: 'PENDING',
          totalAmount,
          details: {
            tourId,
            tourTitle: tour.title,
            guests,
            startDate,
            notes,
            pricePerPerson: tour.price,
            ...bookingDetails
          }
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      return {
        message: 'Tour booked successfully',
        booking,
        tour: {
          id: tour.id,
          title: tour.title,
          price: tour.price
        }
      };
    } catch (error) {
      console.error('Book tour error:', error);
      throw new BadRequestException('Failed to book tour');
    }
  }

  async getUserBookings(userId: string) {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          userId,
          type: 'TOUR'
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      return bookings;
    } catch (error) {
      console.error('Get user bookings error:', error);
      return [];
    }
  }

  async getUserBookingsByStatus(userId: string, status: string) {
    try {
      // Validate status against enum values
      const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
      const upperStatus = status.toUpperCase();
      
      if (!validStatuses.includes(upperStatus)) {
        throw new BadRequestException('Invalid booking status');
      }

      const bookings = await this.prisma.booking.findMany({
        where: {
          userId,
          type: 'TOUR',
          status: upperStatus as any
        },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      return bookings;
    } catch (error) {
      console.error('Get user bookings by status error:', error);
      return [];
    }
  }

  async getBookingStats(userId: string) {
    try {
      const stats = await this.prisma.booking.groupBy({
        by: ['status'],
        where: {
          userId,
          type: 'TOUR'
        },
        _count: {
          status: true
        }
      });

      const totalBookings = await this.prisma.booking.count({
        where: {
          userId,
          type: 'TOUR'
        }
      });

      const totalSpent = await this.prisma.booking.aggregate({
        where: {
          userId,
          type: 'TOUR',
          status: 'CONFIRMED'
        },
        _sum: {
          totalAmount: true
        }
      });

      return {
        totalBookings,
        totalSpent: totalSpent._sum.totalAmount || 0,
        statusBreakdown: stats.reduce((acc, stat) => {
          acc[stat.status.toLowerCase()] = stat._count.status;
          return acc;
        }, {} as Record<string, number>)
      };
    } catch (error) {
      console.error('Get booking stats error:', error);
      return {
        totalBookings: 0,
        totalSpent: 0,
        statusBreakdown: {}
      };
    }
  }

  async createReview(userId: string, tourId: string, rating: number, comment: string) {
    // Check if user has booked this tour
    const booking = await this.prisma.booking.findFirst({
      where: {
        userId,
        type: 'TOUR',
        details: {
          path: ['tourId'],
          equals: tourId
        }
      }
    });

    if (!booking) {
      throw new BadRequestException('You can only review tours you have booked');
    }

    // Check if user already reviewed this tour
    const existingReview = await this.prisma.review.findFirst({
      where: {
        userId,
        tourId
      }
    });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this tour');
    }

    try {
      const review = await this.prisma.review.create({
        data: {
          userId,
          tourId,
          rating,
          comment
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              avatar: true
            }
          }
        }
      });

      // Update tour average rating (calculate dynamically, no need to store)
      
      return {
        message: 'Review created successfully',
        review
      };
    } catch (error) {
      throw new BadRequestException('Failed to create review');
    }
  }
}
