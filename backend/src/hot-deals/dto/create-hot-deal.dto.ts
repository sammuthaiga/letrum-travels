import { IsString, IsNumber, IsArray, IsBoolean, IsDateString, IsOptional, Min, Max } from 'class-validator';

export class CreateHotDealDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  shortDesc: string;

  @IsNumber()
  @Min(0)
  originalPrice: number;

  @IsNumber()
  @Min(0)
  discountPrice: number;

  @IsNumber()
  @Min(1)
  @Max(99)
  discountPercent: number;

  @IsString()
  duration: string;

  @IsString()
  location: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsString()
  featuredImage: string;

  @IsArray()
  @IsString({ each: true })
  highlights: string[];

  @IsArray()
  @IsString({ each: true })
  inclusions: string[];

  @IsNumber()
  @Min(1)
  maxGuests: number;

  @IsString()
  category: string;

  @IsString()
  difficulty: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsNumber()
  @Min(1)
  availableSlots: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  bookedSlots?: number;
}
