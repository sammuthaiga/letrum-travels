const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const hotDealsData = [
  {
    title: "Maasai Mara Safari Spectacular",
    description: "Experience the wonder of the Great Migration in Kenya's most famous national reserve. Witness millions of wildebeest and zebras crossing the Mara River while staying in luxury tented camps. This exclusive safari includes game drives, cultural visits to Maasai villages, and breathtaking wildlife photography opportunities.",
    shortDesc: "Luxury safari experience during the Great Migration season",
    originalPrice: 2500,
    discountPrice: 1850,
    discountPercent: 26,
    duration: "4 Days / 3 Nights",
    location: "Maasai Mara National Reserve",
    images: [
      "https://images.unsplash.com/photo-1549366021-9f761d040115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516454133305-f7c0f6b3cf95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    featuredImage: "https://images.unsplash.com/photo-1549366021-9f761d040115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Great Migration viewing",
      "Big Five game drives",
      "Maasai cultural experience",
      "Hot air balloon safari option",
      "Professional wildlife photography"
    ],
    inclusions: [
      "Luxury tented accommodation",
      "All meals and beverages",
      "Airport transfers",
      "Professional safari guide",
      "Game drive vehicles"
    ],
    maxGuests: 8,
    category: "Safari",
    difficulty: "Easy",
    startDate: new Date('2025-09-15'),
    endDate: new Date('2025-12-15'),
    isActive: true,
    isFeatured: true,
    availableSlots: 12
  },
  {
    title: "Amboseli Elephant Paradise",
    description: "Discover the majestic elephants of Amboseli with the stunning backdrop of Mount Kilimanjaro. This intimate safari focuses on elephant behavior and conservation while offering spectacular views of Africa's highest peak. Stay in eco-friendly lodges and enjoy unique wildlife encounters.",
    shortDesc: "Elephant conservation safari with Mount Kilimanjaro views",
    originalPrice: 1800,
    discountPrice: 1350,
    discountPercent: 25,
    duration: "3 Days / 2 Nights",
    location: "Amboseli National Park",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571029177506-8c80d5ed1736?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    featuredImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Mount Kilimanjaro views",
      "Large elephant herds",
      "Conservation education",
      "Bird watching",
      "Sunset game drives"
    ],
    inclusions: [
      "Eco-lodge accommodation",
      "All meals",
      "Park fees",
      "Expert naturalist guide",
      "Conservation talk"
    ],
    maxGuests: 10,
    category: "Safari",
    difficulty: "Easy",
    startDate: new Date('2025-09-20'),
    endDate: new Date('2025-11-30'),
    isActive: true,
    isFeatured: true,
    availableSlots: 15
  },
  {
    title: "Samburu Cultural Safari",
    description: "Immerse yourself in the rich culture of the Samburu people while exploring one of Kenya's most pristine wilderness areas. This unique safari combines wildlife viewing with authentic cultural experiences, traditional ceremonies, and community interactions in the heart of northern Kenya.",
    shortDesc: "Cultural immersion safari in Kenya's northern frontier",
    originalPrice: 2200,
    discountPrice: 1650,
    discountPercent: 25,
    duration: "5 Days / 4 Nights",
    location: "Samburu National Reserve",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553662256-eb7c9f3e5e4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566554273541-37a9ca77b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Samburu cultural experiences",
      "Special northern species",
      "Traditional ceremonies",
      "Community visits",
      "Local craft workshops"
    ],
    inclusions: [
      "Traditional accommodation",
      "Cultural activities",
      "All meals",
      "Community guide",
      "Craft workshop materials"
    ],
    maxGuests: 6,
    category: "Cultural",
    difficulty: "Moderate",
    startDate: new Date('2025-10-01'),
    endDate: new Date('2025-12-20'),
    isActive: true,
    isFeatured: false,
    availableSlots: 8
  },
  {
    title: "Diani Beach Paradise Getaway",
    description: "Escape to Kenya's pristine white sand beaches for the ultimate tropical paradise experience. Enjoy crystal-clear waters, water sports, and beachfront luxury accommodations. Perfect for relaxation after a safari or as a standalone beach holiday with coral reef snorkeling and local cuisine.",
    shortDesc: "Luxury beach holiday on Kenya's stunning coastline",
    originalPrice: 1500,
    discountPrice: 1125,
    discountPercent: 25,
    duration: "4 Days / 3 Nights",
    location: "Diani Beach, Coast Province",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    featuredImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Pristine white sand beaches",
      "Coral reef snorkeling",
      "Water sports activities",
      "Swahili cuisine",
      "Sunset dhow cruises"
    ],
    inclusions: [
      "Beachfront resort accommodation",
      "Water sports equipment",
      "Snorkeling gear",
      "Daily breakfast",
      "Airport transfers"
    ],
    maxGuests: 12,
    category: "Beach",
    difficulty: "Easy",
    startDate: new Date('2025-09-10'),
    endDate: new Date('2025-01-15'),
    isActive: true,
    isFeatured: true,
    availableSlots: 20
  },
  {
    title: "Mount Kenya Trekking Adventure",
    description: "Conquer Africa's second-highest peak on this challenging yet rewarding mountain trekking expedition. Experience diverse ecosystems from bamboo forests to alpine zones while attempting to reach Point Lenana. This adventure includes professional mountain guides and full camping equipment.",
    shortDesc: "Challenging mountain trek to Africa's second highest peak",
    originalPrice: 1200,
    discountPrice: 900,
    discountPercent: 25,
    duration: "6 Days / 5 Nights",
    location: "Mount Kenya National Park",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1468359601543-843bfaef291a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562786193-89d5c5b69fc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Point Lenana summit attempt",
      "Diverse ecosystems",
      "Professional mountain guides",
      "Alpine camping",
      "Wildlife encounters"
    ],
    inclusions: [
      "Mountain camping equipment",
      "Professional guides",
      "All meals on mountain",
      "Park fees",
      "Emergency evacuation insurance"
    ],
    maxGuests: 8,
    category: "Adventure",
    difficulty: "Challenging",
    startDate: new Date('2025-10-15'),
    endDate: new Date('2025-12-31'),
    isActive: true,
    isFeatured: false,
    availableSlots: 10
  },
  {
    title: "Lake Nakuru Flamingo Spectacle",
    description: "Witness one of nature's most spectacular displays as thousands of flamingos paint Lake Nakuru pink. This day safari includes game drives in search of rhinos, lions, and leopards, plus visits to Baboon Cliff for panoramic views of the alkaline lake and its incredible birdlife.",
    shortDesc: "Day safari featuring flamingos and rhino conservation",
    originalPrice: 800,
    discountPrice: 600,
    discountPercent: 25,
    duration: "1 Day",
    location: "Lake Nakuru National Park",
    images: [
      "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d040115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    featuredImage: "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Flamingo populations",
      "Rhino sanctuary visit",
      "Baboon Cliff viewpoint",
      "Bird watching paradise",
      "Big cat sightings"
    ],
    inclusions: [
      "Round trip transport",
      "Park entrance fees",
      "Lunch",
      "Professional guide",
      "Binoculars"
    ],
    maxGuests: 15,
    category: "Safari",
    difficulty: "Easy",
    startDate: new Date('2025-09-12'),
    endDate: new Date('2025-12-10'),
    isActive: true,
    isFeatured: false,
    availableSlots: 25
  },
  {
    title: "Tsavo East & West Safari",
    description: "Explore Kenya's largest national park complex on this extended safari covering both Tsavo East and West. Known for red elephants, man-eating lions, and diverse landscapes, this adventure offers authentic wilderness experiences away from crowds in one of Africa's last untamed frontiers.",
    shortDesc: "Extended safari in Kenya's largest park complex",
    originalPrice: 3000,
    discountPrice: 2250,
    discountPercent: 25,
    duration: "6 Days / 5 Nights",
    location: "Tsavo East & West National Parks",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    featuredImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Red elephants of Tsavo",
      "Mzima Springs",
      "Shetani Lava Flows",
      "Diverse landscapes",
      "Historical sites"
    ],
    inclusions: [
      "Safari lodge accommodation",
      "All meals",
      "Game drives",
      "Park fees",
      "Professional guide"
    ],
    maxGuests: 10,
    category: "Safari",
    difficulty: "Moderate",
    startDate: new Date('2025-10-05'),
    endDate: new Date('2025-12-25'),
    isActive: true,
    isFeatured: true,
    availableSlots: 12
  },
  {
    title: "Hell's Gate Adventure",
    description: "Experience Kenya's most adventurous national park where you can walk and cycle among wildlife. This unique destination offers rock climbing, hiking through dramatic gorges, hot springs, and geothermal features. Perfect for adventure seekers and families looking for active safari experiences.",
    shortDesc: "Adventure park with cycling, climbing, and hiking",
    originalPrice: 600,
    discountPrice: 450,
    discountPercent: 25,
    duration: "1 Day",
    location: "Hell's Gate National Park",
    images: [
      "https://images.unsplash.com/photo-1562786193-89d5c5b69fc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1468359601543-843bfaef291a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    featuredImage: "https://images.unsplash.com/photo-1562786193-89d5c5b69fc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Cycling safari",
      "Rock climbing",
      "Hell's Gate Gorge",
      "Hot springs",
      "Geothermal features"
    ],
    inclusions: [
      "Bicycle rental",
      "Climbing equipment",
      "Professional guide",
      "Park fees",
      "Lunch"
    ],
    maxGuests: 20,
    category: "Adventure",
    difficulty: "Moderate",
    startDate: new Date('2025-09-08'),
    endDate: new Date('2025-12-31'),
    isActive: true,
    isFeatured: false,
    availableSlots: 30
  },
  {
    title: "Lamu Island Cultural Heritage",
    description: "Step back in time on UNESCO World Heritage Lamu Island, where traditional Swahili culture remains unchanged. Experience dhow sailing, traditional architecture, local festivals, and authentic coastal cuisine in this car-free island paradise steeped in history and culture.",
    shortDesc: "UNESCO heritage island with traditional Swahili culture",
    originalPrice: 1800,
    discountPrice: 1350,
    discountPercent: 25,
    duration: "4 Days / 3 Nights",
    location: "Lamu Island, Coast Province",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553662256-eb7c9f3e5e4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566554273541-37a9ca77b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    featuredImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "UNESCO World Heritage site",
      "Traditional dhow sailing",
      "Swahili architecture",
      "Local cultural festivals",
      "Authentic coastal cuisine"
    ],
    inclusions: [
      "Traditional accommodation",
      "Dhow trips",
      "Cultural tours",
      "Local meals",
      "Airport transfers"
    ],
    maxGuests: 8,
    category: "Cultural",
    difficulty: "Easy",
    startDate: new Date('2025-09-25'),
    endDate: new Date('2025-01-10'),
    isActive: true,
    isFeatured: true,
    availableSlots: 16
  },
  {
    title: "Aberdare Forest Adventure",
    description: "Discover the mystical Aberdare Mountains with their dense bamboo forests, waterfalls, and unique wildlife. This highland safari offers cool mountain air, tree lodges, night game drives, and encounters with rare species like the bongo antelope in Kenya's most scenic mountain range.",
    shortDesc: "Highland safari in mystical mountain forests",
    originalPrice: 2000,
    discountPrice: 1500,
    discountPercent: 25,
    duration: "3 Days / 2 Nights",
    location: "Aberdare National Park",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    featuredImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Mountain tree lodges",
      "Rare bongo antelopes",
      "Spectacular waterfalls",
      "Night game drives",
      "Bamboo forest walks"
    ],
    inclusions: [
      "Tree lodge accommodation",
      "All meals",
      "Night game drives",
      "Forest walks",
      "Professional guide"
    ],
    maxGuests: 12,
    category: "Safari",
    difficulty: "Moderate",
    startDate: new Date('2025-10-10'),
    endDate: new Date('2025-12-15'),
    isActive: true,
    isFeatured: false,
    availableSlots: 18
  }
];

async function seedHotDeals() {
  console.log('🌟 Starting Hot Deals seeding...');

  try {
    // Clear existing hot deals
    await prisma.hotDeal.deleteMany({});
    console.log('🗑️  Cleared existing hot deals');

    // Create new hot deals
    for (const deal of hotDealsData) {
      const createdDeal = await prisma.hotDeal.create({
        data: deal,
      });
      console.log(`✅ Created hot deal: ${createdDeal.title}`);
    }

    console.log(`🎉 Successfully seeded ${hotDealsData.length} hot deals!`);
  } catch (error) {
    console.error('❌ Error seeding hot deals:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
if (require.main === module) {
  seedHotDeals().catch(console.error);
}

module.exports = { seedHotDeals };
