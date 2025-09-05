import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VisaRequest, VisaRequestStatus } from '@prisma/client';

export interface CreateVisaRequestDto {
  destinationCountry: string;
  travelDate: string;
  returnDate?: string;
  purpose: string;
  documents?: string[];
}

export interface UpdateVisaRequestDto {
  destinationCountry?: string;
  travelDate?: string;
  returnDate?: string;
  purpose?: string;
  documents?: string[];
  status?: VisaRequestStatus;
  notes?: string;
}

@Injectable()
export class VisaService {
  constructor(private prisma: PrismaService) {}

  async createVisaRequest(userId: string, createVisaRequestDto: CreateVisaRequestDto): Promise<VisaRequest> {
    return this.prisma.visaRequest.create({
      data: {
        userId,
        destinationCountry: createVisaRequestDto.destinationCountry,
        travelDate: new Date(createVisaRequestDto.travelDate),
        returnDate: createVisaRequestDto.returnDate ? new Date(createVisaRequestDto.returnDate) : null,
        purpose: createVisaRequestDto.purpose,
        documents: createVisaRequestDto.documents || [],
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
  }

  async getAllVisaRequests(userId?: string): Promise<VisaRequest[]> {
    const where = userId ? { userId } : {};

    return this.prisma.visaRequest.findMany({
      where,
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
      orderBy: { createdAt: 'desc' },
    });
  }

  async getVisaRequestById(id: string): Promise<VisaRequest> {
    const visaRequest = await this.prisma.visaRequest.findUnique({
      where: { id },
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

    if (!visaRequest) {
      throw new NotFoundException('Visa request not found');
    }

    return visaRequest;
  }

  async updateVisaRequest(id: string, updateVisaRequestDto: UpdateVisaRequestDto): Promise<VisaRequest> {
    await this.getVisaRequestById(id); // Check if exists

    const updateData: any = { ...updateVisaRequestDto };
    if (updateData.travelDate) {
      updateData.travelDate = new Date(updateData.travelDate);
    }
    if (updateData.returnDate) {
      updateData.returnDate = new Date(updateData.returnDate);
    }

    return this.prisma.visaRequest.update({
      where: { id },
      data: updateData,
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
  }

  async updateVisaStatus(id: string, status: VisaRequestStatus, notes?: string): Promise<VisaRequest> {
    await this.getVisaRequestById(id); // Check if exists

    return this.prisma.visaRequest.update({
      where: { id },
      data: {
        status,
        notes: notes || undefined,
        updatedAt: new Date(),
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
  }

  async getUserVisaRequests(userId: string): Promise<VisaRequest[]> {
    return this.prisma.visaRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.visaRequest.findMany({
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
      orderBy: { createdAt: 'desc' },
    });
  }
}