import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsDateString, IsBoolean, IsEnum, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  @IsString()
  @IsNotEmpty()
  airline: string;

  @IsString()
  @IsNotEmpty()
  flightNumber: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalTime: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNumber()
  price: number;

  @IsNumber()
  availableSeats: number;

  @IsString()
  @IsOptional()
  aircraft?: string;

  @IsOptional()
  baggage?: any;

  @IsOptional()
  layovers?: any;

  @IsString()
  @IsOptional()
  class?: string = 'Economy';

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

export class SearchFlightDto {
  @IsString()
  @IsOptional()
  origin?: string;

  @IsString()
  @IsOptional()
  destination?: string;

  @IsDateString()
  @IsOptional()
  departureDate?: string;

  @IsDateString()
  @IsOptional()
  returnDate?: string;

  @IsNumber()
  @IsOptional()
  passengers?: number = 1;

  @IsString()
  @IsOptional()
  class?: string;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  minPrice?: number;
}

export class PassengerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  passportNumber: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsOptional()
  title?: string; // Mr, Mrs, Ms, Dr

  @IsString()
  @IsOptional()
  specialRequests?: string;
}

export class ContactInfoDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export class BookFlightDto {
  @IsString()
  @IsNotEmpty()
  flightId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PassengerDto)
  @ArrayMinSize(1)
  passengers: PassengerDto[];

  @ValidateNested()
  @Type(() => ContactInfoDto)
  contactInfo: ContactInfoDto;

  @IsArray()
  @IsOptional()
  seatPreferences?: string[]; // e.g., ['window', 'aisle']

  @IsString()
  @IsOptional()
  specialRequests?: string;
}
