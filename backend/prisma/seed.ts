import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.visaRequest.deleteMany();
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.car.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Cleaned existing data');

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@letrumagency.com',
        firstName: 'Admin',
        lastName: 'User',
        password: hashedPassword,
        role: 'ADMIN',
        phone: '+254700123456',
      },
    }),
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: hashedPassword,
        role: 'USER',
        phone: '+254700123457',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        password: hashedPassword,
        role: 'USER',
        phone: '+254700123458',
      },
    }),
    prisma.user.create({
      data: {
        email: 'staff@letrumagency.com',
        firstName: 'Staff',
        lastName: 'Member',
        password: hashedPassword,
        role: 'STAFF',
        phone: '+254700123459',
      },
    }),
  ]);

  console.log('👥 Created users');

const tours = [
  {
    title: "Serengeti Safari Adventure",
    description: "Experience the ultimate African safari adventure in the world-famous Serengeti National Park. Witness the Great Migration, see the Big Five, and enjoy luxury accommodations under the African stars.",
    shortDesc: "Ultimate African safari in Serengeti National Park with luxury accommodations",
    duration: "7",
    price: 1299,
    featuredImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    itinerary: {
      day1: 'Arrival in Arusha, welcome dinner',
      day2: 'Drive to Serengeti, afternoon game drive',
      day3: 'Full day game drives',
      day4: 'Hot air balloon safari',
      day5: 'Visit Maasai village',
      day6: 'Final game drive',
      day7: 'Return to Arusha, departure'
    },
    inclusions: ['All meals', 'Accommodation', 'Game drives', 'Park fees', 'Professional guide'],
    exclusions: ['International flights', 'Visa fees', 'Personal items', 'Tips', 'Travel insurance'],
    maxGuests: 12,
    difficulty: 'Easy',
    category: 'Wildlife Safari',
    location: 'Serengeti National Park, Tanzania',
    meetingPoint: 'Arusha Airport',
  },
  {
    title: "Mount Kilimanjaro Trek",
    description: "Conquer Africa's highest peak on this challenging but rewarding 8-day trek. Experience diverse ecosystems from tropical forests to arctic conditions at the summit.",
    shortDesc: "Challenging 8-day trek to Africa's highest peak",
    duration: "8",
    price: 1899,
    featuredImage: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    itinerary: {
      day1: 'Machame Gate to Machame Camp',
      day2: 'Machame Camp to Shira Camp',
      day3: 'Shira Camp to Barranco Camp',
      day4: 'Barranco to Karanga Camp',
      day5: 'Karanga to Barafu Camp',
      day6: 'Summit Day - Uhuru Peak',
      day7: 'Mweka Camp to Mweka Gate',
      day8: 'Departure'
    },
    inclusions: ['Professional guides', 'All meals', 'Camping equipment', 'Park fees', 'Transfers'],
    exclusions: ['International flights', 'Visa fees', 'Personal gear', 'Tips', 'Travel insurance'],
    maxGuests: 8,
    difficulty: 'Challenging',
    category: 'Mountain Trekking',
    location: 'Mount Kilimanjaro, Tanzania',
    meetingPoint: 'Moshi town',
  },
  {
    title: "Zanzibar Beach Paradise",
    description: "Relax on pristine white sand beaches, explore Stone Town's rich history, and enjoy crystal clear waters perfect for snorkeling and diving.",
    shortDesc: "Beach paradise with cultural exploration in Stone Town",
    duration: "5",
    price: 899,
    featuredImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    itinerary: {
      day1: 'Arrival, Stone Town tour',
      day2: 'Spice farm tour, beach relaxation',
      day3: 'Snorkeling trip to Prison Island',
      day4: 'Beach activities, sunset cruise',
      day5: 'Final beach day, departure'
    },
    inclusions: ['Hotel accommodation', 'All tours', 'Airport transfers', 'Some meals'],
    exclusions: ['International flights', 'All meals', 'Personal expenses', 'Travel insurance'],
    maxGuests: 15,
    difficulty: 'Easy',
    category: 'Beach & Culture',
    location: 'Zanzibar, Tanzania',
    meetingPoint: 'Zanzibar Airport',
  },
  {
    title: "Ngorongoro Crater Safari",
    description: "Explore the world's largest intact volcanic caldera, home to over 25,000 large animals including the rare black rhino.",
    shortDesc: "Wildlife safari in the world's largest volcanic caldera",
    duration: "3",
    price: 799,
    featuredImage: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    itinerary: {
      day1: 'Arrival, crater rim lodge',
      day2: 'Full day crater exploration',
      day3: 'Morning game drive, departure'
    },
    inclusions: ['Lodge accommodation', 'All meals', 'Game drives', 'Park fees'],
    exclusions: ['International flights', 'Drinks', 'Personal items', 'Tips'],
    maxGuests: 10,
    difficulty: 'Easy',
    category: 'Wildlife Safari',
    location: 'Ngorongoro Conservation Area, Tanzania',
    meetingPoint: 'Arusha',
  }
];

  // Create Tours
  const createdTours = await Promise.all(tours.map(tour => 
    prisma.tour.create({ data: tour })
  ));

  console.log('🦁 Created tours');

  // Create Flights
  const flights = await Promise.all([
    prisma.flight.create({
      data: {
        airline: 'Kenya Airways',
        flightNumber: 'KQ101',
        origin: 'Nairobi (NBO)',
        destination: 'Dar es Salaam (DAR)',
        departureTime: new Date('2024-12-15T08:00:00Z'),
        arrivalTime: new Date('2024-12-15T09:30:00Z'),
        duration: '1h 30m',
        price: 250,
        availableSeats: 45,
        aircraft: 'Boeing 737-800',
        baggage: {
          checkedBag: '23kg included',
          handBag: '7kg included'
        },
        layovers: null,
        class: 'Economy',
      },
    }),
    prisma.flight.create({
      data: {
        airline: 'Turkish Airlines',
        flightNumber: 'TK672',
        origin: 'Nairobi (NBO)',
        destination: 'Istanbul (IST)',
        departureTime: new Date('2024-12-20T23:55:00Z'),
        arrivalTime: new Date('2024-12-21T06:30:00Z'),
        duration: '6h 35m',
        price: 650,
        availableSeats: 89,
        aircraft: 'Airbus A330',
        baggage: {
          checkedBag: '23kg included',
          handBag: '8kg included'
        },
        layovers: null,
        class: 'Economy',
      },
    }),
    prisma.flight.create({
      data: {
        airline: 'Emirates',
        flightNumber: 'EK722',
        origin: 'Nairobi (NBO)',
        destination: 'Dubai (DXB)',
        departureTime: new Date('2024-12-18T02:35:00Z'),
        arrivalTime: new Date('2024-12-18T08:15:00Z'),
        duration: '5h 40m',
        price: 580,
        availableSeats: 112,
        aircraft: 'Boeing 777-300ER',
        baggage: {
          checkedBag: '30kg included',
          handBag: '7kg included'
        },
        layovers: null,
        class: 'Economy',
      },
    }),
  ]);

  console.log('✈️ Created flights');

  // Create Cars
  const cars = await Promise.all([
    prisma.car.create({
      data: {
        make: 'Toyota',
        model: 'Land Cruiser',
        year: 2022,
        category: 'SUV',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        seats: 7,
        doors: 5,
        aircon: true,
        pricePerDay: 120,
        images: [
          'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        features: ['4WD', 'GPS Navigation', 'Bluetooth', 'USB Charging', 'Roof Rack'],
        location: 'Nairobi Airport',
      },
    }),
    prisma.car.create({
      data: {
        make: 'Toyota',
        model: 'Corolla',
        year: 2023,
        category: 'Sedan',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        seats: 5,
        doors: 4,
        aircon: true,
        pricePerDay: 45,
        images: [
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        features: ['GPS Navigation', 'Bluetooth', 'USB Charging', 'Backup Camera'],
        location: 'Nairobi City Center',
      },
    }),
    prisma.car.create({
      data: {
        make: 'Mercedes-Benz',
        model: 'G-Class',
        year: 2023,
        category: 'Luxury SUV',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        seats: 5,
        doors: 5,
        aircon: true,
        pricePerDay: 250,
        images: [
          'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        features: ['4WD', 'Premium Sound System', 'Leather Seats', 'GPS Navigation', 'Heated Seats'],
        location: 'Nairobi Airport',
      },
    }),
  ]);

  console.log('🚗 Created cars');

  // Create Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Safari Hat',
        description: 'High-quality safari hat with UV protection and chin strap. Perfect for African adventures.',
        price: 35,
        images: [
          'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        category: 'Clothing',
        stock: 50,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Travel Backpack 40L',
        description: 'Durable 40L travel backpack with multiple compartments and rain cover.',
        price: 89,
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        category: 'Bags',
        stock: 25,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Binoculars 10x42',
        description: 'High-performance binoculars perfect for wildlife viewing with crystal clear optics.',
        price: 145,
        images: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        category: 'Optics',
        stock: 15,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Safari Boots',
        description: 'Waterproof hiking boots with ankle support, perfect for safari walks.',
        price: 120,
        images: [
          'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        category: 'Footwear',
        stock: 40,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Portable Power Bank',
        description: '20,000mAh portable power bank with fast charging and multiple USB ports.',
        price: 45,
        images: [
          'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        category: 'Electronics',
        stock: 60,
      },
    }),
  ]);

  console.log('🛍️ Created products');

  // Create Reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        userId: users[1].id,
        tourId: createdTours[0].id,
        rating: 5,
        comment: 'Absolutely amazing safari experience! The guide was knowledgeable and we saw all the Big Five. Highly recommended!',
      },
    }),
    prisma.review.create({
      data: {
        userId: users[2].id,
        tourId: createdTours[0].id,
        rating: 4,
        comment: 'Great tour with excellent accommodations. The food was delicious and the game drives were exciting.',
      },
    }),
    prisma.review.create({
      data: {
        userId: users[1].id,
        tourId: createdTours[1].id,
        rating: 5,
        comment: 'Conquering Kilimanjaro was the adventure of a lifetime! The guides were professional and supportive throughout.',
      },
    }),
    prisma.review.create({
      data: {
        userId: users[2].id,
        tourId: createdTours[2].id,
        rating: 4,
        comment: 'Beautiful beaches and rich culture in Zanzibar. The spice tour was particularly interesting.',
      },
    }),
  ]);

  console.log('⭐ Created reviews');

  // Create Sample Bookings
  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        userId: users[1].id,
        type: 'TOUR',
        status: 'CONFIRMED',
        totalAmount: 1299,
        details: {
          tourId: createdTours[0].id,
          tourName: 'Serengeti Safari Adventure',
          guests: 2,
          travelDate: '2024-12-15',
          specialRequests: 'Vegetarian meals'
        },
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[2].id,
        type: 'FLIGHT',
        status: 'PENDING',
        totalAmount: 650,
        details: {
          flightId: flights[1].id,
          flightNumber: 'TK672',
          passengers: 1,
          bookingReference: 'TK12345'
        },
      },
    }),
  ]);

  console.log('📅 Created bookings');

  // Create Visa Requests
  const visaRequests = await Promise.all([
    prisma.visaRequest.create({
      data: {
        userId: users[1].id,
        destinationCountry: 'Tanzania',
        travelDate: new Date('2024-12-15'),
        returnDate: new Date('2024-12-22'),
        purpose: 'Tourism',
        documents: ['passport.pdf', 'photo.jpg'],
        status: 'UNDER_REVIEW',
      },
    }),
    prisma.visaRequest.create({
      data: {
        userId: users[2].id,
        destinationCountry: 'Kenya',
        travelDate: new Date('2024-12-20'),
        returnDate: new Date('2024-12-28'),
        purpose: 'Safari Tour',
        documents: ['passport.pdf', 'photo.jpg', 'itinerary.pdf'],
        status: 'APPROVED',
      },
    }),
  ]);

  console.log('🛂 Created visa requests');

  console.log('🎉 Database seeded successfully!');
  console.log(`📊 Created:
  - ${users.length} users
  - ${createdTours.length} tours
  - ${flights.length} flights
  - ${cars.length} cars
  - ${products.length} products
  - ${reviews.length} reviews
  - ${bookings.length} bookings
  - ${visaRequests.length} visa requests`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
