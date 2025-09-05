const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateImages() {
  console.log('🖼️  Updating images for flights and cars...');

  // Sample flight images (using airline logos and aircraft images)
  const flightImages = [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    'https://images.unsplash.com/photo-1583848976427-c87c2e0fd16e?w=800',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800'
  ];

  // Sample car images
  const carImages = {
    'Economy': [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      'https://images.unsplash.com/photo-1562141961-d0d82b12c4d1?w=800'
    ],
    'Compact': [
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800'
    ],
    'Intermediate': [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800'
    ],
    'Full-size': [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800'
    ],
    'Premium': [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
    ],
    'Luxury': [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800'
    ],
    'SUV': [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
    ]
  };

  try {
    // Update car images
    const cars = await prisma.car.findMany();
    for (const car of cars) {
      const categoryImages = carImages[car.category] || carImages['Economy'];
      const selectedImage = categoryImages[Math.floor(Math.random() * categoryImages.length)];
      
      await prisma.car.update({
        where: { id: car.id },
        data: {
          images: [selectedImage, selectedImage.replace('?w=800', '?w=600'), selectedImage.replace('?w=800', '?w=400')]
        }
      });
    }

    console.log(`✅ Updated ${cars.length} car images`);

    // Update flight aircraft images (Note: flights don't have direct images, but we can add aircraft images to baggage or metadata)
    const flights = await prisma.flight.findMany();
    let updatedFlights = 0;

    for (const flight of flights) {
      const aircraftImage = flightImages[Math.floor(Math.random() * flightImages.length)];
      
      await prisma.flight.update({
        where: { id: flight.id },
        data: {
          baggage: {
            ...flight.baggage,
            aircraftImage: aircraftImage
          }
        }
      });
      updatedFlights++;
    }

    console.log(`✅ Updated ${updatedFlights} flight aircraft images`);

    console.log('🎉 Image update completed successfully!');
  } catch (error) {
    console.error('❌ Error updating images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateImages();
