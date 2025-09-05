import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tours.module';
import { BookingsModule } from './bookings/bookings.module';
import { VisaModule } from './visa/visa.module';
import { ProductsModule } from './products/products.module';
import { FlightsModule } from './flights/flights.module';
import { CarsModule } from './cars/cars.module';
import { HotDealsModule } from './hot-deals/hot-deals.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'letrum-agency-secret-key-2024',
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
    UsersModule,
    ToursModule,
    BookingsModule,
    VisaModule,
    ProductsModule,
    FlightsModule,
    CarsModule,
    HotDealsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}