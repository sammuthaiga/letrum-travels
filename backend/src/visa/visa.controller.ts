import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VisaService, CreateVisaRequestDto, UpdateVisaRequestDto } from './visa.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VisaRequestStatus } from '@prisma/client';

@ApiTags('Visa')
@Controller('visa')
export class VisaController {
  constructor(private readonly visaService: VisaService) {}

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.visaService.getAllVisaRequests(userId);
  }

  @Get('my-requests')
  @UseGuards(JwtAuthGuard)
  getMyVisaRequests(@Request() req) {
    return this.visaService.getUserVisaRequests(req.user.userId);
  }

  @Get(':id')
  getVisaRequestById(@Param('id') id: string) {
    return this.visaService.getVisaRequestById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createVisaRequest(@Request() req, @Body() createVisaRequestDto: CreateVisaRequestDto) {
    return this.visaService.createVisaRequest(req.user.userId, createVisaRequestDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateVisaRequest(@Param('id') id: string, @Body() updateVisaRequestDto: UpdateVisaRequestDto) {
    return this.visaService.updateVisaRequest(id, updateVisaRequestDto);
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  updateVisaStatus(
    @Param('id') id: string, 
    @Body() body: { status: VisaRequestStatus; notes?: string }
  ) {
    return this.visaService.updateVisaStatus(id, body.status, body.notes);
  }

  @Post(':id/documents')
  @UseGuards(JwtAuthGuard)
  uploadDocuments(@Param('id') id: string, @Body() body: { documentUrls: string[] }) {
    // In a real implementation, you'd handle file uploads here
    return { message: 'Documents uploaded successfully' };
  }
}