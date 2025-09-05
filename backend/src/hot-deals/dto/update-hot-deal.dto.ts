import { PartialType } from '@nestjs/mapped-types';
import { CreateHotDealDto } from './create-hot-deal.dto';

export class UpdateHotDealDto extends PartialType(CreateHotDealDto) {}
