import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsDateString, IsBoolean, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsInt()
  year: number;

  @IsString()
  @IsNotEmpty()
  category: string; // Economy, Compact, SUV, Luxury, etc.

  @IsString()
  @IsNotEmpty()
  transmission: string; // Manual, Automatic

  @IsString()
  @IsNotEmpty()
  fuelType: string; // Petrol, Diesel, Electric, Hybrid

  @IsInt()
  seats: number;

  @IsInt()
  doors: number;

  @IsBoolean()
  @IsOptional()
  aircon?: boolean = true;

  @IsNumber()
  pricePerDay: number;

  @IsArray()
  @IsOptional()
  images?: string[] = [];

  @IsArray()
  @IsOptional()
  features?: string[] = []; // GPS, Bluetooth, etc.

  @IsString()
  @IsNotEmpty()
  location: string; // Pickup location

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean = true;
}

export class SearchCarDto {
  @IsString()
  @IsOptional()
  location?: string;

  @IsDateString()
  @IsOptional()
  pickupDate?: string;

  @IsDateString()
  @IsOptional()
  dropoffDate?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  transmission?: string;

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsInt()
  @IsOptional()
  minSeats?: number;

  @IsBoolean()
  @IsOptional()
  airconRequired?: boolean;
}

export class CarContactInfoDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  licenseNumber?: string;
}

export class BookCarDto {
  @IsString()
  @IsNotEmpty()
  carId: string;

  @IsDateString()
  pickupDate: string;

  @IsDateString()
  dropoffDate: string;

  @IsString()
  @IsNotEmpty()
  pickupLocation: string;

  @IsString()
  @IsOptional()
  dropoffLocation?: string;

  @ValidateNested()
  @Type(() => CarContactInfoDto)
  contactInfo: CarContactInfoDto;

  @IsString()
  @IsOptional()
  specialRequests?: string;

  @IsBoolean()
  @IsOptional()
  needsGPS?: boolean;

  @IsBoolean()
  @IsOptional()
  needsChildSeat?: boolean;

  @IsNumber()
  @IsOptional()
  totalAmount?: number;
}
