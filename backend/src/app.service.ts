import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Letrum Agency API - Tours & Travel, Car Rentals, Visa Assistance';
  }
}