const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedFlights() {
  console.log('🛫 Seeding flights...');

  const flights = [
    // Nairobi to Mombasa
    {
      airline: 'Kenya Airways',
      flightNumber: 'KQ311',
      origin: 'Nairobi (NBO)',
      destination: 'Mombasa (MBA)',
      departureTime: new Date('2025-09-15T06:00:00Z'),
      arrivalTime: new Date('2025-09-15T07:15:00Z'),
      duration: '1h 15m',
      price: 120,
      availableSeats: 180,
      aircraft: 'Boeing 737-800',
      class: 'Economy',
      baggage: {
        cabin: '7kg',
        checked: '23kg'
      },
    },
    // Nairobi to Dar es Salaam
    {
      airline: 'Kenya Airways',
      flightNumber: 'KQ482',
      origin: 'Nairobi (NBO)',
      destination: 'Dar es Salaam (DAR)',
      departureTime: new Date('2025-09-15T08:30:00Z'),
      arrivalTime: new Date('2025-09-15T10:00:00Z'),
      duration: '1h 30m',
      price: 180,
      availableSeats: 156,
      aircraft: 'Embraer E190',
      class: 'Economy',
      baggage: {
        cabin: '7kg',
        checked: '23kg'
      },
    },
    // Nairobi to Kigali
    {
      airline: 'RwandAir',
      flightNumber: 'WB101',
      origin: 'Nairobi (NBO)',
      destination: 'Kigali (KGL)',
      departureTime: new Date('2025-09-15T11:45:00Z'),
      arrivalTime: new Date('2025-09-15T13:15:00Z'),
      duration: '1h 30m',
      price: 220,
      availableSeats: 76,
      aircraft: 'Boeing 737-700',
      class: 'Economy',
      baggage: {
        cabin: '7kg',
        checked: '23kg'
      },
    },
    // Nairobi to Entebbe
    {
      airline: 'Kenya Airways',
      flightNumber: 'KQ412',
      origin: 'Nairobi (NBO)',
      destination: 'Entebbe (EBB)',
      departureTime: new Date('2025-09-15T14:20:00Z'),
      arrivalTime: new Date('2025-09-15T16:10:00Z'),
      duration: '1h 50m',
      price: 195,
      availableSeats: 134,
      aircraft: 'Boeing 737-800',
      class: 'Economy',
      baggage: {
        cabin: '7kg',
        checked: '23kg'
      },
    },
    // Mombasa to Zanzibar
    {
      airline: 'Coastal Aviation',
      flightNumber: 'CQ203',
      origin: 'Mombasa (MBA)',
      destination: 'Zanzibar (ZNZ)',
      departureTime: new Date('2025-09-15T09:15:00Z'),
      arrivalTime: new Date('2025-09-15T10:45:00Z'),
      duration: '1h 30m',
      price: 150,
      availableSeats: 50,
      aircraft: 'Cessna 208 Caravan',
      class: 'Economy',
      baggage: {
        cabin: '5kg',
        checked: '15kg'
      },
    },
    // International - Nairobi to Dubai
    {
      airline: 'Emirates',
      flightNumber: 'EK722',
      origin: 'Nairobi (NBO)',
      destination: 'Dubai (DXB)',
      departureTime: new Date('2025-09-15T23:35:00Z'),
      arrivalTime: new Date('2025-09-16T06:25:00Z'),
      duration: '4h 50m',
      price: 450,
      availableSeats: 280,
      aircraft: 'Boeing 777-300ER',
      class: 'Economy',
      baggage: {
        cabin: '7kg',
        checked: '30kg'
      },
    },
    // International - Nairobi to London
    {
      airline: 'Kenya Airways',
      flightNumber: 'KQ100',
      origin: 'Nairobi (NBO)',
      destination: 'London Heathrow (LHR)',
      departureTime: new Date('2025-09-15T23:25:00Z'),
      arrivalTime: new Date('2025-09-16T05:50:00Z'),
      duration: '8h 25m',
      price: 650,
      availableSeats: 234,
      aircraft: 'Boeing 787-8',
      class: 'Economy',
      baggage: {
        cabin: '7kg',
        checked: '23kg'
      },
    },
    // Business Class flights
    {
      airline: 'Kenya Airways',
      flightNumber: 'KQ311B',
      origin: 'Nairobi (NBO)',
      destination: 'Mombasa (MBA)',
      departureTime: new Date('2025-09-15T16:00:00Z'),
      arrivalTime: new Date('2025-09-15T17:15:00Z'),
      duration: '1h 15m',
      price: 320,
      availableSeats: 20,
      aircraft: 'Boeing 737-800',
      class: 'Business',
      baggage: {
        cabin: '7kg',
        checked: '32kg'
      },
    },
  ];

  for (const flight of flights) {
    await prisma.flight.create({ data: flight });
  }

  console.log(`✅ Created ${flights.length} flights`);
}

async function seedCars() {
  console.log('🚗 Seeding cars...');

  const cars = [
    // Economy Cars - Nairobi
    {
      make: 'Toyota',
      model: 'Corolla',
      year: 2022,
      category: 'Economy',
      transmission: 'Manual',
      fuelType: 'Petrol',
      seats: 5,
      doors: 4,
      aircon: true,
      pricePerDay: 35,
      images: [
        'https://images.unsplash.com/photo-1549399692-8c2c8b5f3a4d?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['Air Conditioning', 'Radio', 'Power Steering'],
      location: 'Nairobi Airport',
      isAvailable: true,
    },
    {
      make: 'Nissan',
      model: 'Sunny',
      year: 2021,
      category: 'Economy',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      doors: 4,
      aircon: true,
      pricePerDay: 40,
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['Air Conditioning', 'Radio', 'Power Steering', 'Automatic Transmission'],
      location: 'Nairobi Downtown',
      isAvailable: true,
    },
    // Compact Cars
    {
      make: 'Volkswagen',
      model: 'Polo',
      year: 2023,
      category: 'Compact',
      transmission: 'Manual',
      fuelType: 'Petrol',
      seats: 5,
      doors: 4,
      aircon: true,
      pricePerDay: 45,
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['Air Conditioning', 'Bluetooth', 'Power Steering', 'Central Locking'],
      location: 'Mombasa',
      isAvailable: true,
    },
    // SUVs - Safari Ready
    {
      make: 'Toyota',
      model: 'Land Cruiser',
      year: 2023,
      category: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 7,
      doors: 5,
      aircon: true,
      pricePerDay: 120,
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['4WD', 'Air Conditioning', 'GPS', 'Bluetooth', 'Roof Rack', 'Safari Equipment'],
      location: 'Nairobi Airport',
      isAvailable: true,
    },
    {
      make: 'Toyota',
      model: 'RAV4',
      year: 2022,
      category: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      doors: 5,
      aircon: true,
      pricePerDay: 85,
      images: [
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['4WD', 'Air Conditioning', 'GPS', 'Bluetooth', 'Reverse Camera'],
      location: 'Nairobi Downtown',
      isAvailable: true,
    },
    // Luxury Cars
    {
      make: 'BMW',
      model: 'X5',
      year: 2023,
      category: 'Luxury',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      doors: 5,
      aircon: true,
      pricePerDay: 180,
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['Leather Seats', 'Premium Sound System', 'GPS', 'Heated Seats', 'Sunroof', 'Parking Sensors'],
      location: 'Nairobi Airport',
      isAvailable: true,
    },
    {
      make: 'Mercedes-Benz',
      model: 'GLE',
      year: 2023,
      category: 'Luxury',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 5,
      doors: 5,
      aircon: true,
      pricePerDay: 200,
      images: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['Leather Seats', 'Premium Sound System', 'GPS', 'Heated Seats', 'Panoramic Roof', 'Ambient Lighting'],
      location: 'Mombasa',
      isAvailable: true,
    },
    // Vans/Minibuses
    {
      make: 'Toyota',
      model: 'Hiace',
      year: 2022,
      category: 'Van',
      transmission: 'Manual',
      fuelType: 'Diesel',
      seats: 14,
      doors: 4,
      aircon: true,
      pricePerDay: 90,
      images: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['Air Conditioning', 'High Seating Capacity', 'Luggage Space', 'Tour Guide Seat'],
      location: 'Nairobi Airport',
      isAvailable: true,
    },
    // More locations
    {
      make: 'Honda',
      model: 'Fit',
      year: 2021,
      category: 'Compact',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      doors: 4,
      aircon: true,
      pricePerDay: 38,
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['Air Conditioning', 'Fuel Efficient', 'Bluetooth', 'USB Charging'],
      location: 'Kisumu',
      isAvailable: true,
    },
    {
      make: 'Mitsubishi',
      model: 'Outlander',
      year: 2022,
      category: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 7,
      doors: 5,
      aircon: true,
      pricePerDay: 95,
      images: [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'
      ],
      features: ['4WD', 'Air Conditioning', '7 Seats', 'GPS', 'Cruise Control'],
      location: 'Eldoret',
      isAvailable: true,
    },
  ];

  for (const car of cars) {
    await prisma.car.create({ data: car });
  }

  console.log(`✅ Created ${cars.length} cars`);
}

async function main() {
  try {
    await seedFlights();
    await seedCars();
    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
