export class HotDealResponseDto {
  id: string;
  title: string;
  description: string;
  shortDesc: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: number;
  duration: string;
  location: string;
  images: string[];
  featuredImage: string;
  highlights: string[];
  inclusions: string[];
  maxGuests: number;
  category: string;
  difficulty: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isFeatured: boolean;
  availableSlots: number;
  bookedSlots: number;
  createdAt: Date;
  updatedAt: Date;
}
