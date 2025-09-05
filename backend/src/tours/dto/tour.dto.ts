import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, Min, Max, IsObject } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTourDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  shortDesc: string;

  @IsString()
  duration: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsString()
  featuredImage: string;

  @IsObject()
  itinerary: any;

  @IsArray()
  @IsString({ each: true })
  inclusions: string[];

  @IsArray()
  @IsString({ each: true })
  exclusions: string[];

  @IsNumber()
  @Min(1)
  maxGuests: number;

  @IsString()
  difficulty: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateTourDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  shortDesc?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  featuredImage?: string;

  @IsOptional()
  @IsObject()
  itinerary?: any;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  inclusions?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  exclusions?: string[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxGuests?: number;

  @IsOptional()
  @IsString()
  difficulty?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class BookTourDto {
  @IsString()
  tourId: string;

  @IsNumber()
  @Min(1)
  guests: number;

  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  documents?: string[]; // URLs or base64 strings of uploaded documents

  @IsOptional()
  @IsString()
  passportNumber?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @IsOptional()
  @IsString()
  dietaryRequirements?: string;

  @IsOptional()
  @IsString()
  medicalConditions?: string;
}
