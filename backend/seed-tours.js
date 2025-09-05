const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const tours = [
  // AFRICAN TOURS
  {
    title: "Serengeti Wildlife Safari",
    shortDesc: "Experience the Great Migration and Big Five in Tanzania's most famous park",
    description: "Embark on an unforgettable journey through the Serengeti National Park, one of Africa's most iconic wildlife destinations. Witness the annual Great Migration, spot the Big Five, and enjoy luxurious safari camps under the African stars. This comprehensive safari package includes game drives, cultural visits, and expert guides who will share their deep knowledge of the ecosystem.",
    duration: "7 Days",
    price: 2500.00,
    maxGuests: 8,
    difficulty: "Moderate",
    category: "SAFARI",
    location: "Serengeti National Park, Tanzania",
    meetingPoint: "Kilimanjaro International Airport",
    featuredImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Luxury safari lodge accommodation",
      "All meals and beverages",
      "Professional safari guide",
      "Game drives in 4x4 vehicles",
      "Airport transfers",
      "Cultural village visit"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Gratuities"
    ],
    itinerary: [
      { title: "Day 1: Arrival", description: "Arrival in Arusha, transfer to lodge, evening briefing" },
      { title: "Day 2-3: Serengeti Safari", description: "Serengeti National Park game drives, witness the Great Migration" },
      { title: "Day 4: Ngorongoro Crater", description: "Ngorongoro Crater exploration, Big Five spotting" },
      { title: "Day 5: Cultural Experience", description: "Cultural visit to Maasai village, traditional dances" },
      { title: "Day 6: Final Safari", description: "Final game drive, sunset viewing at Kopjes" },
      { title: "Day 7: Departure", description: "Departure, transfer to Kilimanjaro Airport" }
    ]
  },
  {
    title: "Kilimanjaro Summit Adventure",
    shortDesc: "Conquer Africa's highest peak via the scenic Machame route",
    description: "Challenge yourself with this epic climb to the summit of Mount Kilimanjaro, Africa's highest peak. The Machame route offers stunning scenery and excellent acclimatization opportunities. Our experienced guides and porters ensure your safety while you traverse through five distinct climate zones, from tropical rainforest to arctic conditions at the summit.",
    duration: "8 Days",
    price: 1800.00,
    maxGuests: 12,
    difficulty: "Challenging",
    category: "Mountain Trekking",
    location: "Mount Kilimanjaro, Tanzania",
    meetingPoint: "Moshi, Tanzania",
    featuredImage: "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inclusions: [
      "Professional mountain guides",
      "All camping equipment",
      "Three meals daily",
      "Park fees and permits",
      "Porters for equipment",
      "Pre-climb briefing"
    ],
    exclusions: [
      "International flights",
      "Accommodation before/after climb",
      "Personal climbing gear",
      "Travel insurance",
      "Tips for guides and porters"
    ],
    itinerary: [
      { title: "Day 1: Machame Gate to Machame Camp", description: "Trek through rainforest to Machame Camp (3,010m)" },
      { title: "Day 2: Machame Camp to Shira Camp", description: "Ascend through moorland to Shira Camp (3,845m)" },
      { title: "Day 3: Shira Camp to Lava Tower to Barranco", description: "Acclimatization hike to Lava Tower, descend to Barranco (3,960m)" },
      { title: "Day 4: Barranco to Karanga Camp", description: "Climb Barranco Wall to Karanga Camp (3,995m)" },
      { title: "Day 5: Karanga to Barafu Camp", description: "Summit preparation at Barafu Camp (4,673m)" },
      { title: "Day 6: Summit Day - Uhuru Peak", description: "Summit Uhuru Peak (5,895m), descend to Mweka Camp" },
      { title: "Day 7: Mweka Camp to Mweka Gate", description: "Final descent through rainforest to Mweka Gate" },
      { title: "Day 8: Departure", description: "Transfer to hotel, celebration and departure" }
    ]
  },
  {
    title: "Zanzibar Beach Paradise",
    shortDesc: "Relax on pristine beaches with crystal-clear waters and rich history",
    description: "Discover the exotic island of Zanzibar with its pristine white sand beaches, turquoise waters, and rich cultural heritage. Explore Stone Town's winding alleys, spice plantations, and enjoy world-class snorkeling and diving. This tropical paradise offers the perfect blend of relaxation, adventure, and cultural immersion.",
    duration: "5 Days",
    price: 1200.00,
    maxGuests: 10,
    difficulty: "Easy",
    category: "Beach Holiday",
    location: "Zanzibar, Tanzania",
    meetingPoint: "Zanzibar International Airport",
    featuredImage: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inclusions: [
      "Beachfront resort accommodation",
      "Daily breakfast",
      "Stone Town guided tour",
      "Spice plantation visit",
      "Snorkeling equipment",
      "Airport transfers"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Alcoholic beverages",
      "Diving certification courses",
      "Personal expenses"
    ],
    itinerary: [
      { title: "Day 1: Arrival & Stone Town", description: "Arrival, Stone Town exploration, sunset at Forodhani Gardens" },
      { title: "Day 2: Spice Tour & Prison Island", description: "Spice plantation tour, Prison Island visit with giant tortoises" },
      { title: "Day 3: Nungwi Beach", description: "Beach day at Nungwi, snorkeling excursion" },
      { title: "Day 4: Jozani Forest", description: "Jozani Forest, Red Colobus monkeys, beach relaxation" },
      { title: "Day 5: Departure", description: "Final beach morning, departure" }
    ]
  },

  // EUROPEAN TOURS
  {
    title: "Greek Islands Odyssey",
    shortDesc: "Explore the magical islands of Santorini, Mykonos, and Naxos",
    description: "Discover the enchanting Greek Islands with their stunning sunsets, whitewashed villages, and crystal-clear waters. Visit iconic Santorini with its dramatic cliffs, vibrant Mykonos with its nightlife, and authentic Naxos with its ancient ruins. Experience traditional Greek culture, cuisine, and hospitality while island-hopping through the Aegean Sea.",
    duration: "8 Days",
    price: 1900.00,
    maxGuests: 12,
    difficulty: "Easy",
    category: "Island Hopping",
    location: "Cyclades Islands, Greece",
    meetingPoint: "Athens International Airport",
    featuredImage: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504892612851-c91e83d4beb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Boutique hotel accommodation",
      "Daily breakfast",
      "Inter-island ferry tickets",
      "Guided tours of each island",
      "Wine tasting in Santorini",
      "Airport transfers"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Alcoholic beverages",
      "Personal expenses",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1: Arrival in Athens", description: "Arrival, Athens city tour, evening ferry to Mykonos" },
      { title: "Day 2-3: Mykonos", description: "Explore Mykonos town, beaches, and vibrant nightlife" },
      { title: "Day 4-5: Naxos", description: "Ferry to Naxos, ancient temples, traditional villages" },
      { title: "Day 6-7: Santorini", description: "Ferry to Santorini, sunset in Oia, volcano tour" },
      { title: "Day 8: Departure", description: "Morning at leisure, flight back to Athens" }
    ]
  },
  {
    title: "Tuscany Wine & Culture Tour",
    shortDesc: "Discover rolling hills, medieval towns, and world-class wines",
    description: "Immerse yourself in the heart of Tuscany, exploring charming medieval hilltop towns, world-renowned wineries, and Renaissance art. Visit Florence, Siena, and San Gimignano while staying in a traditional villa surrounded by vineyards and olive groves. Experience authentic Italian cuisine, wine tastings, and the timeless beauty of the Tuscan countryside.",
    duration: "6 Days",
    price: 1600.00,
    maxGuests: 10,
    difficulty: "Easy",
    category: "Cultural Tour",
    location: "Tuscany, Italy",
    meetingPoint: "Florence Airport",
    featuredImage: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552832230-592beec42204?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Traditional Tuscan villa accommodation",
      "Daily breakfast and 3 dinners",
      "Wine tastings at 3 vineyards",
      "Guided tours of Florence and Siena",
      "Cooking class with local chef",
      "Private transportation"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Museum entrance fees",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1: Florence Arrival", description: "Arrival, Florence city tour, Duomo and Uffizi Gallery" },
      { title: "Day 2: Chianti Wine Region", description: "Chianti wine tour, vineyard visits, wine tasting" },
      { title: "Day 3: Siena & San Gimignano", description: "Medieval Siena, San Gimignano towers, local market" },
      { title: "Day 4: Cooking & Culture", description: "Tuscan cooking class, villa relaxation, olive oil tasting" },
      { title: "Day 5: Pienza & Montepulciano", description: "Val d'Orcia landscapes, cheese tasting, wine cellars" },
      { title: "Day 6: Departure", description: "Final breakfast, Florence departure" }
    ]
  },
  {
    title: "Norwegian Fjords Adventure",
    shortDesc: "Witness dramatic fjords, northern lights, and midnight sun",
    description: "Experience the breathtaking beauty of Norway's fjords, from the UNESCO-listed Geirangerfjord to the majestic Nærøyfjord. Journey through dramatic landscapes, cascading waterfalls, and picturesque villages. During winter, witness the magical Northern Lights; in summer, experience the midnight sun. This adventure includes scenic train rides, fjord cruises, and Arctic experiences.",
    duration: "7 Days",
    price: 2200.00,
    maxGuests: 14,
    difficulty: "Moderate",
    category: "Nature & Adventure",
    location: "Western Norway",
    meetingPoint: "Bergen Airport",
    featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Boutique hotel accommodation",
      "Daily breakfast",
      "Fjord cruise tickets",
      "Scenic train journeys",
      "Northern Lights tour (winter)",
      "Professional guide"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      { title: "Day 1: Bergen Arrival", description: "Arrival in Bergen, colorful Bryggen wharf tour" },
      { title: "Day 2: Sognefjord", description: "Train to Flåm, Flåm Railway, Sognefjord cruise" },
      { title: "Day 3: Geirangerfjord", description: "Journey to Geiranger, Seven Sisters waterfall" },
      { title: "Day 4: Ålesund", description: "Art Nouveau town of Ålesund, Atlantic Ocean views" },
      { title: "Day 5: Lofoten Islands", description: "Flight to Lofoten, fishing villages, midnight sun/Northern Lights" },
      { title: "Day 6: Arctic Experience", description: "Arctic activities, Sami culture, reindeer encounter" },
      { title: "Day 7: Departure", description: "Return journey, departure from Oslo or Bergen" }
    ]
  },
  {
    title: "Scottish Highlands & Castles",
    shortDesc: "Explore ancient castles, lochs, and Highland culture",
    description: "Journey through Scotland's legendary Highlands, visiting ancient castles, mysterious lochs, and dramatic landscapes. Discover the history of clans, sample world-famous whisky, and search for the Loch Ness Monster. This tour combines Scotland's natural beauty with its rich cultural heritage, including visits to Edinburgh Castle, Isle of Skye, and traditional Highland games.",
    duration: "8 Days",
    price: 1800.00,
    maxGuests: 12,
    difficulty: "Easy",
    category: "Cultural Tour",
    location: "Scottish Highlands, UK",
    meetingPoint: "Edinburgh Airport",
    featuredImage: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552856741-10e34b5b07d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Traditional Highland lodge accommodation",
      "Daily breakfast and 4 dinners",
      "Castle entrance fees",
      "Whisky distillery tours",
      "Loch Ness cruise",
      "Highland guide and transportation"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      { title: "Day 1: Edinburgh", description: "Arrival, Edinburgh Castle, Royal Mile exploration" },
      { title: "Day 2: Loch Lomond", description: "Journey to Highlands, Loch Lomond cruise" },
      { title: "Day 3: Isle of Skye", description: "Ferry to Skye, Old Man of Storr, Dunvegan Castle" },
      { title: "Day 4: Skye Exploration", description: "Fairy Pools, Quiraing, traditional Scottish dinner" },
      { title: "Day 5: Inverness", description: "Return to mainland, Eilean Donan Castle, Inverness" },
      { title: "Day 6: Loch Ness", description: "Loch Ness monster hunting, Urquhart Castle ruins" },
      { title: "Day 7: Whisky Trail", description: "Speyside whisky distilleries, Highland games (seasonal)" },
      { title: "Day 8: Departure", description: "Return to Edinburgh, departure" }
    ]
  },
  {
    title: "Iceland Ring Road Expedition",
    shortDesc: "Discover glaciers, geysers, and the Northern Lights",
    description: "Circle Iceland on the famous Ring Road, experiencing the country's most spectacular natural wonders. Visit powerful waterfalls, active geysers, black sand beaches, and glacier lagoons. Relax in geothermal hot springs and search for the Northern Lights. This comprehensive tour showcases Iceland's otherworldly landscapes and unique geological features.",
    duration: "10 Days",
    price: 2800.00,
    maxGuests: 8,
    difficulty: "Moderate",
    category: "Nature & Adventure",
    location: "Iceland Ring Road",
    meetingPoint: "Reykjavik Airport",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539066830324-41e1c78bee4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Boutique hotel accommodation",
      "Daily breakfast",
      "4WD vehicle and professional driver",
      "Glacier lagoon boat tour",
      "Blue Lagoon geothermal spa",
      "Northern Lights tours (winter)"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Travel insurance",
      "Optional helicopter tours"
    ],
    itinerary: [
      { title: "Day 1: Reykjavik", description: "Arrival, Reykjavik city tour, Northern Lights hunt" },
      { title: "Day 2: Golden Circle", description: "Geysir hot springs, Gullfoss waterfall, Thingvellir National Park" },
      { title: "Day 3: South Coast", description: "Seljalandsfoss and Skógafoss waterfalls, black sand beach" },
      { title: "Day 4: Glacier Lagoon", description: "Jökulsárlón glacier lagoon, Diamond Beach" },
      { title: "Day 5: East Fjords", description: "Dramatic fjords, fishing villages, wildlife spotting" },
      { title: "Day 6: North Iceland", description: "Lake Mývatn, Dettifoss waterfall, volcanic landscapes" },
      { title: "Day 7: Akureyri", description: "Whale watching capital, botanical gardens" },
      { title: "Day 8: Westfjords", description: "Remote Westfjords, dramatic cliffs, bird watching" },
      { title: "Day 9: Snæfellsnes Peninsula", description: "Snæfellsjökull glacier, Kirkjufell mountain" },
      { title: "Day 10: Departure", description: "Blue Lagoon spa, departure from Reykjavik" }
    ]
  },
  {
    title: "Swiss Alpine Adventure",
    shortDesc: "Experience the majestic Swiss Alps with hiking and scenic railways",
    description: "Discover the breathtaking Swiss Alps through scenic train journeys, cable car rides, and alpine hiking. Visit iconic destinations like Matterhorn, Jungfraujoch, and Lake Geneva. Experience traditional Swiss culture in charming mountain villages, taste authentic Swiss cuisine, and enjoy panoramic views from Europe's highest peaks. Perfect for nature lovers and photography enthusiasts.",
    duration: "7 Days",
    price: 2400.00,
    maxGuests: 10,
    difficulty: "Moderate",
    category: "Mountain Trekking",
    location: "Swiss Alps, Switzerland",
    meetingPoint: "Zurich Airport",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605538883669-825200433431?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Mountain lodge accommodation",
      "Daily breakfast and 4 dinners",
      "Swiss Travel Pass",
      "Cable car and train tickets",
      "Guided alpine hikes",
      "Professional mountain guide"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Travel insurance",
      "Optional helicopter tours"
    ],
    itinerary: [
      { title: "Day 1: Zurich to Zermatt", description: "Arrival, scenic train to Zermatt, Matterhorn views" },
      { title: "Day 2: Matterhorn Glacier Paradise", description: "Cable car to highest ski resort in Europe, glacier hiking" },
      { title: "Day 3: Interlaken", description: "Journey to Interlaken, Lake Thun and Lake Brienz" },
      { title: "Day 4: Jungfraujoch", description: "Train to 'Top of Europe', Ice Palace, alpine views" },
      { title: "Day 5: Grindelwald", description: "Alpine village, First Cliff Walk, mountain hiking" },
      { title: "Day 6: Lucerne", description: "Lake Lucerne cruise, Mount Pilatus, Chapel Bridge" },
      { title: "Day 7: Departure", description: "Final alpine views, departure from Zurich" }
    ]
  },
  {
    title: "Croatian Adriatic Coast",
    shortDesc: "Sail through crystal waters visiting historic coastal towns",
    description: "Explore Croatia's stunning Adriatic coastline, sailing between historic towns and pristine islands. Visit Dubrovnik's ancient walls, Split's Roman palace, and the lavender fields of Hvar. Enjoy traditional Croatian cuisine, wine tastings, and swimming in crystal-clear waters. This sailing adventure combines history, culture, and natural beauty along one of Europe's most beautiful coastlines.",
    duration: "8 Days",
    price: 2000.00,
    maxGuests: 12,
    difficulty: "Easy",
    category: "Island Hopping",
    location: "Adriatic Coast, Croatia",
    meetingPoint: "Split Airport",
    featuredImage: "https://images.unsplash.com/photo-1555990538-c875d309c8b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1555990538-c875d309c8b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576020799627-aeac74d58064?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Sailing yacht accommodation",
      "Daily breakfast and lunch",
      "Professional skipper",
      "Island-hopping itinerary",
      "Wine tasting experiences",
      "Historic site visits"
    ],
    exclusions: [
      "International flights",
      "Dinners",
      "Personal expenses",
      "Marina fees",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1: Split Embarkation", description: "Arrival in Split, yacht briefing, Diocletian's Palace tour" },
      { title: "Day 2: Hvar Island", description: "Sail to Hvar, lavender fields, historic town center" },
      { title: "Day 3: Vis Island", description: "Blue Cave excursion, traditional fishing village" },
      { title: "Day 4: Korčula Island", description: "Medieval town walls, wine tasting, Marco Polo house" },
      { title: "Day 5: Mljet National Park", description: "Saltwater lakes, monastery island, nature walks" },
      { title: "Day 6: Dubrovnik", description: "Sail to Dubrovnik, Old Town exploration, city walls" },
      { title: "Day 7: Elaphiti Islands", description: "Island hopping, swimming, traditional lunch" },
      { title: "Day 8: Departure", description: "Final breakfast, departure from Dubrovnik" }
    ]
  },

  // MIDDLE EASTERN TOURS
  {
    title: "Jordan Petra & Wadi Rum Adventure",
    shortDesc: "Discover the lost city of Petra and camp under desert stars",
    description: "Explore Jordan's most iconic treasures from the ancient city of Petra to the otherworldly landscapes of Wadi Rum. Walk through the narrow Siq canyon to discover the magnificent Treasury, explore royal tombs, and learn about Nabataean civilization. Experience Bedouin hospitality in the desert, ride camels across red sand dunes, and sleep under a blanket of stars.",
    duration: "6 Days",
    price: 1500.00,
    maxGuests: 14,
    difficulty: "Moderate",
    category: "Cultural Tour",
    location: "Jordan",
    meetingPoint: "Queen Alia International Airport, Amman",
    featuredImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564759298141-44d8a9919abf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Boutique hotel accommodation",
      "Desert camp experience",
      "All meals included",
      "Professional guide",
      "Petra entrance fees",
      "4WD desert safari"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Personal expenses",
      "Alcoholic beverages",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1: Amman Arrival", description: "Arrival, Amman city tour, Roman amphitheater" },
      { title: "Day 2: Jerash & Dead Sea", description: "Ancient Jerash ruins, float in the Dead Sea" },
      { title: "Day 3: Petra Discovery", description: "Explore Petra archaeological park, Treasury and tombs" },
      { title: "Day 4: Petra by Night", description: "Monastery hike, Petra by candlelight experience" },
      { title: "Day 5: Wadi Rum Desert", description: "Desert safari, camel trek, Bedouin camp under stars" },
      { title: "Day 6: Departure", description: "Sunrise in desert, return to Amman for departure" }
    ]
  },
  {
    title: "Dubai Modern Marvels",
    shortDesc: "Experience luxury, innovation, and traditional culture",
    description: "Discover Dubai's incredible blend of ultra-modern architecture and traditional Arabian culture. Marvel at the world's tallest building, shop in the world's largest mall, and experience luxury like nowhere else. Explore traditional souks, enjoy desert safaris, and witness the contrast between cutting-edge innovation and timeless Bedouin traditions in this fascinating emirate.",
    duration: "5 Days",
    price: 1800.00,
    maxGuests: 12,
    difficulty: "Easy",
    category: "City Break",
    location: "Dubai, UAE",
    meetingPoint: "Dubai International Airport",
    featuredImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571336154358-5aa401fce9ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Luxury hotel accommodation",
      "Daily breakfast",
      "Burj Khalifa observatory ticket",
      "Desert safari with dinner",
      "Dubai Mall and fountain show",
      "Private city tour"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner (except safari)",
      "Personal expenses",
      "Alcoholic beverages",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1: Modern Dubai", description: "Arrival, Burj Khalifa, Dubai Mall, fountain show" },
      { title: "Day 2: Traditional Dubai", description: "Gold and spice souks, Dubai Creek, Al Fahidi historic district" },
      { title: "Day 3: Desert Adventure", description: "Desert safari, camel riding, traditional Bedouin dinner" },
      { title: "Day 4: Palm Jumeirah", description: "Atlantis resort, luxury beach time, Dubai Marina" },
      { title: "Day 5: Departure", description: "Final shopping, departure" }
    ]
  },
  {
    title: "Turkey Cappadocia & Istanbul",
    shortDesc: "Hot air balloons over fairy chimneys and Byzantine wonders",
    description: "Experience the magical landscapes of Cappadocia with its famous hot air balloon flights over fairy chimneys and underground cities. Explore Istanbul's rich Byzantine and Ottoman heritage, visiting the Hagia Sophia, Blue Mosque, and Grand Bazaar. This journey combines natural wonders with cultural treasures, offering insights into Turkey's position as a bridge between Europe and Asia.",
    duration: "8 Days",
    price: 1700.00,
    maxGuests: 16,
    difficulty: "Easy",
    category: "Cultural Tour",
    location: "Turkey",
    meetingPoint: "Istanbul Airport",
    featuredImage: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Boutique hotel accommodation",
      "Daily breakfast and 4 dinners",
      "Hot air balloon flight",
      "Professional guide",
      "All entrance fees",
      "Internal flights"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Alcoholic beverages",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1: Istanbul Arrival", description: "Arrival, Sultanahmet district, welcome dinner" },
      { title: "Day 2: Istanbul Highlights", description: "Hagia Sophia, Blue Mosque, Topkapi Palace" },
      { title: "Day 3: Istanbul Culture", description: "Grand Bazaar, Bosphorus cruise, Galata Tower" },
      { title: "Day 4: Cappadocia", description: "Flight to Cappadocia, Göreme Open Air Museum" },
      { title: "Day 5: Hot Air Balloon", description: "Sunrise balloon flight, underground city exploration" },
      { title: "Day 6: Cappadocia Adventure", description: "Valley hiking, pottery workshop, cave churches" },
      { title: "Day 7: Return to Istanbul", description: "Flight to Istanbul, Turkish bath experience" },
      { title: "Day 8: Departure", description: "Final shopping, departure" }
    ]
  },
  {
    title: "Oman Hidden Treasures",
    shortDesc: "Discover ancient forts, desert oases, and pristine coastlines",
    description: "Explore the authentic Arabian Peninsula in Oman, a country rich in natural beauty and cultural heritage. Discover ancient forts, traditional souks, and stunning landscapes from desert dunes to pristine beaches. Experience Omani hospitality, visit Bedouin settlements, and enjoy outdoor adventures in one of the Middle East's most welcoming and unspoiled destinations.",
    duration: "7 Days",
    price: 1600.00,
    maxGuests: 10,
    difficulty: "Moderate",
    category: "Cultural Tour",
    location: "Oman",
    meetingPoint: "Muscat International Airport",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Traditional Omani accommodation",
      "All meals included",
      "4WD desert vehicles",
      "Professional guide",
      "Fort entrance fees",
      "Desert camping experience"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Personal expenses",
      "Alcoholic beverages",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1: Muscat", description: "Arrival, Sultan Qaboos Grand Mosque, Royal Opera House" },
      { title: "Day 2: Nizwa", description: "Nizwa Fort, traditional souk, rose water distillery" },
      { title: "Day 3: Jebel Shams", description: "Grand Canyon of Oman, mountain villages" },
      { title: "Day 4: Wahiba Sands", description: "Desert dunes, camel trekking, Bedouin camp" },
      { title: "Day 5: Wadi Bani Khalid", description: "Desert oasis, natural pools, traditional villages" },
      { title: "Day 6: Sur & Turtle Beach", description: "Traditional dhow building, turtle nesting (seasonal)" },
      { title: "Day 7: Departure", description: "Return to Muscat, departure" }
    ]
  },
  {
    title: "Morocco Imperial Cities",
    shortDesc: "Journey through ancient medinas and Sahara Desert",
    description: "Discover Morocco's imperial cities of Marrakech, Fez, Meknes, and Rabat, each with its own unique character and history. Navigate bustling medinas, admire intricate Islamic architecture, and experience the magic of the Sahara Desert. This comprehensive tour includes camel trekking, traditional riads, authentic cuisine, and encounters with Berber culture in the Atlas Mountains.",
    duration: "9 Days",
    price: 1400.00,
    maxGuests: 14,
    difficulty: "Moderate",
    category: "Cultural Tour",
    location: "Morocco",
    meetingPoint: "Marrakech Airport",
    featuredImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564759298141-44d8a9919abf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Traditional riad accommodation",
      "Desert camp under stars",
      "All meals included",
      "Professional guide",
      "Camel trek in Sahara",
      "All transportation"
    ],
    exclusions: [
      "International flights",
      "Alcoholic beverages",
      "Personal expenses",
      "Gratuities",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1: Marrakech", description: "Arrival, Jemaa el-Fnaa square, Koutoubia Mosque" },
      { title: "Day 2: Marrakech Exploration", description: "Bahia Palace, Saadian Tombs, traditional souk shopping" },
      { title: "Day 3: Atlas Mountains", description: "High Atlas crossing, Berber villages, Ait Benhaddou" },
      { title: "Day 4: Sahara Desert", description: "Ouarzazate, Dades Valley, camel trek, desert camp" },
      { title: "Day 5: Sahara to Fez", description: "Sunrise over dunes, Erfoud, Midelt, cedar forests" },
      { title: "Day 6: Fez Medina", description: "Ancient medina exploration, tanneries, Al-Qarawiyyin University" },
      { title: "Day 7: Meknes & Volubilis", description: "Imperial city of Meknes, Roman ruins of Volubilis" },
      { title: "Day 8: Rabat", description: "Capital city, Hassan Tower, Royal Palace, coastal views" },
      { title: "Day 9: Return", description: "Return to Marrakech, departure" }
    ]
  },

  // ADDITIONAL AFRICAN TOURS
  {
    title: "Lake Manyara Tree Lodge Safari",
    shortDesc: "Unique tree-house accommodation with incredible bird watching",
    description: "Experience a unique safari adventure at Lake Manyara National Park, famous for its tree-climbing lions and incredible bird diversity. Stay in elevated tree-house lodges overlooking the lake and enjoy excellent game viewing including elephants, hippos, and over 400 bird species. This intimate safari offers a perfect balance of wildlife and luxury.",
    duration: "4 Days",
    price: 1600.00,
    maxGuests: 6,
    difficulty: "Easy",
    category: "Wildlife Safari",
    location: "Lake Manyara, Tanzania",
    meetingPoint: "Arusha Airport",
    featuredImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inclusions: [
      "Tree-house lodge accommodation",
      "All meals and drinks",
      "Professional guide",
      "Game drives",
      "Canoeing on Lake Manyara",
      "Walking safaris"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal laundry",
      "Communication charges"
    ],
    itinerary: [
      { title: "Day 1: Arrival", description: "Arrival at lodge, afternoon game drive" },
      { title: "Day 2: Lake Activities", description: "Morning game drive, canoeing, evening at leisure" },
      { title: "Day 3: Walking Safari", description: "Walking safari, full day game viewing" },
      { title: "Day 4: Departure", description: "Final game drive, departure" }
    ]
  },
  {
    title: "South African Garden Route",
    shortDesc: "Coastal drive through wine lands, beaches, and wildlife",
    description: "Explore South Africa's famous Garden Route, stretching along the southern coast from Cape Town to Port Elizabeth. Experience world-class wine regions, pristine beaches, dramatic coastlines, and diverse wildlife. Visit penguin colonies, whale watching spots, and the stunning Tsitsikamma National Park. This scenic journey combines natural beauty with cultural experiences.",
    duration: "10 Days",
    price: 2100.00,
    maxGuests: 12,
    difficulty: "Easy",
    category: "Scenic Tour",
    location: "Garden Route, South Africa",
    meetingPoint: "Cape Town International Airport",
    featuredImage: "https://images.unsplash.com/photo-1594736797933-d0d48ead4516?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0d48ead4516?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577896851905-7f82e7b0b2e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Boutique accommodation",
      "Daily breakfast and 5 dinners",
      "Wine tasting experiences",
      "Rental car and fuel",
      "Penguin colony visit",
      "Whale watching cruise"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      { title: "Day 1-2: Cape Town", description: "Table Mountain, V&A Waterfront, Cape Point" },
      { title: "Day 3: Stellenbosch", description: "Wine region, cellar tours, gourmet dining" },
      { title: "Day 4: Hermanus", description: "Whale watching capital, coastal walks" },
      { title: "Day 5-6: Garden Route", description: "Knysna lagoon, Tsitsikamma forest" },
      { title: "Day 7: Oudtshoorn", description: "Ostrich farms, Cango Caves exploration" },
      { title: "Day 8-9: Port Elizabeth", description: "Addo Elephant Park, beach activities" },
      { title: "Day 10: Departure", description: "Final coastal views, departure" }
    ]
  },
  {
    title: "Kenya Masai Mara Migration",
    shortDesc: "Witness the greatest wildlife spectacle on Earth",
    description: "Experience the world-famous Great Migration in Kenya's Masai Mara, where millions of wildebeest, zebras, and gazelles cross crocodile-infested rivers in their eternal search for greener pastures. Stay in luxury safari camps, enjoy game drives with expert guides, and immerse yourself in Masai culture. This is wildlife viewing at its most spectacular.",
    duration: "6 Days",
    price: 2300.00,
    maxGuests: 8,
    difficulty: "Moderate",
    category: "Wildlife Safari",
    location: "Masai Mara, Kenya",
    meetingPoint: "Jomo Kenyatta International Airport",
    featuredImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Luxury tented camp accommodation",
      "All meals and beverages",
      "Professional safari guide",
      "Game drives in open vehicles",
      "Masai village cultural visit",
      "Hot air balloon safari (optional)"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Gratuities"
    ],
    itinerary: [
      { title: "Day 1: Nairobi to Masai Mara", description: "Flight to Mara, afternoon game drive" },
      { title: "Day 2-3: Migration Viewing", description: "Full days following the Great Migration" },
      { title: "Day 4: Cultural Experience", description: "Masai village visit, traditional ceremonies" },
      { title: "Day 5: Final Safari", description: "Dawn game drive, river crossing attempts" },
      { title: "Day 6: Departure", description: "Morning game drive, flight to Nairobi" }
    ]
  },
  {
    title: "Egyptian Nile Cruise & Pyramids",
    shortDesc: "Sail the Nile and explore ancient pharaonic treasures",
    description: "Journey through 5,000 years of history along the legendary Nile River. Visit the iconic Pyramids of Giza, explore Luxor's magnificent temples, and cruise between ancient sites aboard a traditional felucca or luxury Nile cruiser. Discover the tombs in the Valley of the Kings, marvel at Karnak Temple, and experience the timeless magic of ancient Egypt.",
    duration: "8 Days",
    price: 1600.00,
    maxGuests: 16,
    difficulty: "Easy",
    category: "Cultural Tour",
    location: "Egypt",
    meetingPoint: "Cairo International Airport",
    featuredImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564759298141-44d8a9919abf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Nile cruise ship accommodation",
      "All meals during cruise",
      "Professional Egyptologist guide",
      "All entrance fees to sites",
      "Domestic flights",
      "Traditional felucca sailing"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Personal expenses",
      "Alcoholic beverages",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1: Cairo Arrival", description: "Arrival, Pyramids of Giza, Great Sphinx" },
      { title: "Day 2: Cairo Museums", description: "Egyptian Museum, Coptic Cairo, Khan el-Khalili bazaar" },
      { title: "Day 3: Fly to Aswan", description: "High Dam, Philae Temple, felucca sailing" },
      { title: "Day 4: Abu Simbel", description: "Abu Simbel temples, begin Nile cruise" },
      { title: "Day 5: Kom Ombo & Edfu", description: "Kom Ombo Temple, Edfu Temple of Horus" },
      { title: "Day 6: Luxor West Bank", description: "Valley of the Kings, Hatshepsut Temple" },
      { title: "Day 7: Luxor East Bank", description: "Karnak Temple, Luxor Temple" },
      { title: "Day 8: Departure", description: "Final morning in Luxor, departure" }
    ]
  },
  {
    title: "Madagascar Wildlife Expedition",
    shortDesc: "Discover unique lemurs and otherworldly landscapes",
    description: "Explore the unique island of Madagascar, home to an incredible array of endemic species found nowhere else on Earth. Encounter over 100 species of lemurs, walk through stone forests, and discover otherworldly baobab trees. This expedition takes you through national parks, rainforests, and coastal areas to witness Madagascar's extraordinary biodiversity and cultural diversity.",
    duration: "12 Days",
    price: 3200.00,
    maxGuests: 8,
    difficulty: "Challenging",
    category: "Wildlife Expedition",
    location: "Madagascar",
    meetingPoint: "Antananarivo Airport",
    featuredImage: "https://images.unsplash.com/photo-1564759298141-44d8a9919abf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1564759298141-44d8a9919abf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Eco-lodge accommodation",
      "All meals included",
      "Expert naturalist guide",
      "Domestic flights",
      "Park entrance fees",
      "4WD transportation"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Alcoholic beverages"
    ],
    itinerary: [
      { title: "Day 1-2: Andasibe National Park", description: "Indri lemur encounters, rainforest walks" },
      { title: "Day 3-4: Tsingy de Bemaraha", description: "Stone forest exploration, unique geological formations" },
      { title: "Day 5-6: Avenue of Baobabs", description: "Iconic baobab trees, sunset photography" },
      { title: "Day 7-8: Isalo National Park", description: "Sandstone formations, natural pools, hiking" },
      { title: "Day 9-10: Berenty Reserve", description: "Ring-tailed lemurs, spiny forests" },
      { title: "Day 11: Nosy Be", description: "Island relaxation, marine activities" },
      { title: "Day 12: Departure", description: "Final wildlife viewing, departure" }
    ]
  },

  // ADDITIONAL EUROPEAN TOURS
  {
    title: "Portuguese Atlantic Coast",
    shortDesc: "Surf beaches, coastal villages, and port wine traditions",
    description: "Explore Portugal's dramatic Atlantic coastline from vibrant Porto to charming fishing villages. Discover world-class surf beaches, historic coastal towns, and traditional port wine cellars. Experience authentic Portuguese culture, sample fresh seafood, and visit stunning cliff-top monasteries. This coastal journey combines natural beauty with rich maritime heritage.",
    duration: "7 Days",
    price: 1300.00,
    maxGuests: 12,
    difficulty: "Easy",
    category: "Coastal Tour",
    location: "Portugal",
    meetingPoint: "Porto Airport",
    featuredImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564759298141-44d8a9919abf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Coastal hotel accommodation",
      "Daily breakfast and 4 dinners",
      "Port wine cellar tours",
      "Surfing lessons (optional)",
      "Traditional fishing village visits",
      "Private transportation"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Alcoholic beverages",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1: Porto Arrival", description: "Arrival, historic center tour, port wine tasting" },
      { title: "Day 2: Douro Valley", description: "River cruise, vineyard visits, quinta lunch" },
      { title: "Day 3: Aveiro & Costa Nova", description: "Venice of Portugal, colorful striped houses" },
      { title: "Day 4: Óbidos & Nazaré", description: "Medieval walled town, giant wave watching" },
      { title: "Day 5: Sintra", description: "Pena Palace, Quinta da Regaleira, coastal views" },
      { title: "Day 6: Cascais & Cabo da Roca", description: "Westernmost point of Europe, coastal walks" },
      { title: "Day 7: Departure", description: "Final coastal morning, departure from Lisbon" }
    ]
  },
  {
    title: "Spain Camino de Santiago",
    shortDesc: "Walk the historic pilgrimage route through northern Spain",
    description: "Experience the spiritual journey of the Camino de Santiago, walking sections of this UNESCO World Heritage pilgrimage route. Discover medieval towns, Romanesque churches, and meet fellow pilgrims from around the world. This cultural and spiritual adventure includes comfortable accommodations, traditional Spanish cuisine, and the satisfaction of earning your Compostela certificate.",
    duration: "8 Days",
    price: 1100.00,
    maxGuests: 16,
    difficulty: "Moderate",
    category: "Pilgrimage Walk",
    location: "Northern Spain",
    meetingPoint: "Santiago de Compostela Airport",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552832230-592beec42204?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Traditional albergue accommodation",
      "Daily breakfast",
      "Luggage transport service",
      "Professional guide",
      "Pilgrim passport and credentials",
      "Compostela certificate ceremony"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      { title: "Day 1: Sarria", description: "Arrival, pilgrim blessing, first walking section" },
      { title: "Day 2: Portomarín", description: "Walk to historic Portomarín, Romanesque church" },
      { title: "Day 3: Palas de Rei", description: "Through Galician countryside, local cuisine" },
      { title: "Day 4: Arzúa", description: "Traditional cheese region, medieval bridges" },
      { title: "Day 5: O Pedrouzo", description: "Final approach to Santiago, Monte do Gozo" },
      { title: "Day 6: Santiago de Compostela", description: "Arrival at cathedral, pilgrimage completion" },
      { title: "Day 7: Santiago Exploration", description: "Cathedral tour, old town, celebration dinner" },
      { title: "Day 8: Departure", description: "Final morning, departure" }
    ]
  },
  {
    title: "French Provence Lavender Tour",
    shortDesc: "Purple lavender fields, hilltop villages, and wine tastings",
    description: "Immerse yourself in the beauty and fragrance of Provence during lavender season. Explore purple fields stretching to the horizon, visit charming hilltop villages, and discover the art of lavender distillation. Experience French country life with wine tastings, local markets, and traditional Provençal cuisine in one of France's most picturesque regions.",
    duration: "6 Days",
    price: 1500.00,
    maxGuests: 12,
    difficulty: "Easy",
    category: "Cultural Tour",
    location: "Provence, France",
    meetingPoint: "Marseille Airport",
    featuredImage: "https://images.unsplash.com/photo-1552832230-592beec42204?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1552832230-592beec42204?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Provençal farmhouse accommodation",
      "Daily breakfast and 3 dinners",
      "Lavender farm visits",
      "Wine tasting experiences",
      "Cooking class",
      "Private transportation"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      { title: "Day 1: Aix-en-Provence", description: "Arrival, market visit, Cézanne's studio" },
      { title: "Day 2: Lavender Fields", description: "Valensole plateau, lavender distillery tour" },
      { title: "Day 3: Hilltop Villages", description: "Gordes, Roussillon, ochre cliffs" },
      { title: "Day 4: Wine Country", description: "Châteauneuf-du-Pape, wine tastings" },
      { title: "Day 5: Cooking & Culture", description: "Provençal cooking class, local artisans" },
      { title: "Day 6: Departure", description: "Final market visit, departure" }
    ]
  },
  {
    title: "Austrian Alps & Music Tour",
    shortDesc: "Sound of Music locations and alpine adventures",
    description: "Discover the musical heritage of Austria while exploring the stunning Austrian Alps. Visit filming locations from The Sound of Music, attend classical concerts in historic venues, and enjoy alpine activities in Salzburg and the Salzkammergut region. This tour combines cultural experiences with breathtaking mountain scenery and traditional Austrian hospitality.",
    duration: "7 Days",
    price: 1800.00,
    maxGuests: 14,
    difficulty: "Easy",
    category: "Cultural Tour",
    location: "Austrian Alps",
    meetingPoint: "Salzburg Airport",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605538883669-825200433431?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Alpine hotel accommodation",
      "Daily breakfast and 4 dinners",
      "Sound of Music tour",
      "Concert tickets",
      "Cable car rides",
      "Professional guide"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      { title: "Day 1: Salzburg", description: "Arrival, Mozart's birthplace, old town tour" },
      { title: "Day 2: Sound of Music", description: "Filming locations, Mirabell Gardens, concert" },
      { title: "Day 3: Hallstatt", description: "Picturesque lakeside village, salt mine tour" },
      { title: "Day 4: Dachstein", description: "Glacier cable car, ice cave exploration" },
      { title: "Day 5: Innsbruck", description: "Olympic city, Swarovski Crystal Worlds" },
      { title: "Day 6: Melk Abbey", description: "Baroque monastery, Danube Valley cruise" },
      { title: "Day 7: Departure", description: "Final alpine views, departure from Vienna" }
    ]
  },
  {
    title: "Israeli Holy Land Journey",
    shortDesc: "Follow ancient footsteps through sacred sites",
    description: "Explore the Holy Land's most significant religious and historical sites. Walk where Jesus walked in Jerusalem, float in the Dead Sea, and discover ancient Masada. This spiritual journey includes visits to Bethlehem, Nazareth, and the Sea of Galilee, offering insights into Christianity, Judaism, and Islam while experiencing modern Israeli culture and cuisine.",
    duration: "8 Days",
    price: 1900.00,
    maxGuests: 20,
    difficulty: "Easy",
    category: "Religious Tour",
    location: "Israel",
    meetingPoint: "Ben Gurion Airport, Tel Aviv",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Hotel accommodation",
      "Daily breakfast and 5 dinners",
      "Professional guide",
      "All entrance fees",
      "Transportation",
      "Religious site visits"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Travel insurance",
      "Gratuities"
    ],
    itinerary: [
      { title: "Day 1: Tel Aviv Arrival", description: "Arrival, Jaffa old port, coastal walk" },
      { title: "Day 2: Jerusalem", description: "Western Wall, Via Dolorosa, Church of Holy Sepulchre" },
      { title: "Day 3: Jerusalem & Bethlehem", description: "Temple Mount, Church of Nativity" },
      { title: "Day 4: Masada & Dead Sea", description: "Ancient fortress, lowest point on Earth" },
      { title: "Day 5: Galilee Region", description: "Nazareth, Sea of Galilee, Capernaum" },
      { title: "Day 6: Golan Heights", description: "Mount of Beatitudes, Jordan River baptism site" },
      { title: "Day 7: Caesarea & Haifa", description: "Roman ruins, Bahai Gardens" },
      { title: "Day 8: Departure", description: "Final reflections, departure from Tel Aviv" }
    ]
  },
  {
    title: "Lebanon Cedar Mountains & Coast",
    shortDesc: "Ancient cedars, Roman ruins, and Mediterranean cuisine",
    description: "Discover Lebanon's rich history and stunning landscapes from ancient cedar forests to Mediterranean coastlines. Explore Roman ruins at Baalbek, visit traditional mountain villages, and experience world-renowned Lebanese cuisine. This cultural journey showcases Lebanon's position as a crossroads of civilizations while enjoying warm hospitality and diverse landscapes.",
    duration: "7 Days",
    price: 1400.00,
    maxGuests: 12,
    difficulty: "Moderate",
    category: "Cultural Tour",
    location: "Lebanon",
    meetingPoint: "Beirut Airport",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Boutique hotel accommodation",
      "All meals included",
      "Professional guide",
      "Entrance fees to all sites",
      "Wine tasting in Bekaa Valley",
      "Transportation"
    ],
    exclusions: [
      "International flights",
      "Alcoholic beverages (except wine tasting)",
      "Personal expenses",
      "Travel insurance",
      "Gratuities"
    ],
    itinerary: [
      { title: "Day 1: Beirut", description: "Arrival, corniche walk, traditional dinner" },
      { title: "Day 2: Byblos & Harissa", description: "Ancient Phoenician port, Our Lady of Lebanon" },
      { title: "Day 3: Baalbek", description: "Roman temple complex, local family lunch" },
      { title: "Day 4: Bekaa Valley", description: "Anjar Umayyad ruins, wine tasting" },
      { title: "Day 5: Cedars of God", description: "Ancient cedar forest, Qadisha Valley" },
      { title: "Day 6: Tripoli", description: "Crusader castle, traditional souks" },
      { title: "Day 7: Departure", description: "Final coastal views, departure" }
    ]
  },
  {
    title: "Iran Persian Heritage",
    shortDesc: "Ancient Persepolis, Isfahan's beauty, and warm hospitality",
    description: "Discover Iran's incredible cultural heritage from ancient Persepolis to the architectural wonders of Isfahan. Experience Persian hospitality, visit magnificent mosques and palaces, and explore traditional bazaars. This comprehensive tour showcases 2,500 years of Persian civilization while experiencing the warmth and kindness of Iranian people.",
    duration: "10 Days",
    price: 1600.00,
    maxGuests: 16,
    difficulty: "Easy",
    category: "Cultural Tour",
    location: "Iran",
    meetingPoint: "Tehran Airport",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Traditional hotel accommodation",
      "All meals included",
      "Professional guide",
      "All entrance fees",
      "Domestic flights",
      "Traditional Persian cooking class"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Personal expenses",
      "Travel insurance",
      "Tips and gratuities"
    ],
    itinerary: [
      { title: "Day 1: Tehran", description: "Arrival, Golestan Palace, National Museum" },
      { title: "Day 2: Tehran to Isfahan", description: "Flight to Isfahan, Imam Square" },
      { title: "Day 3: Isfahan", description: "Shah Mosque, Sheikh Lotfollah Mosque, bazaar" },
      { title: "Day 4: Isfahan", description: "Chehel Sotun Palace, Armenian Quarter" },
      { title: "Day 5: Yazd", description: "Desert city, Zoroastrian fire temple" },
      { title: "Day 6: Yazd to Shiraz", description: "Wind towers, journey to Shiraz" },
      { title: "Day 7: Persepolis", description: "Ancient capital of Persian Empire" },
      { title: "Day 8: Shiraz", description: "Pink Mosque, Hafez tomb, Persian garden" },
      { title: "Day 9: Kashan", description: "Traditional houses, rose water distillery" },
      { title: "Day 10: Departure", description: "Return to Tehran, departure" }
    ]
  },
  {
    title: "Malta Mediterranean Jewel",
    shortDesc: "Knights' history, crystal waters, and ancient temples",
    description: "Explore the Mediterranean jewel of Malta, with its rich history spanning from prehistoric temples to Knights of St. John. Discover Valletta's baroque architecture, swim in crystal-clear waters of the Blue Lagoon, and explore ancient Mdina. This compact island nation offers incredible diversity with megalithic temples, medieval cities, and stunning coastlines.",
    duration: "5 Days",
    price: 900.00,
    maxGuests: 14,
    difficulty: "Easy",
    category: "Cultural Tour",
    location: "Malta",
    meetingPoint: "Malta International Airport",
    featuredImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576020799627-aeac74d58064?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Boutique hotel accommodation",
      "Daily breakfast",
      "Gozo island day trip",
      "Valletta guided tour",
      "Blue Lagoon boat trip",
      "Airport transfers"
    ],
    exclusions: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      { title: "Day 1: Valletta", description: "Arrival, capital city tour, Grand Master's Palace" },
      { title: "Day 2: Three Cities", description: "Historic harbor cities, maritime museum" },
      { title: "Day 3: Gozo Island", description: "Ferry to Gozo, Victoria Citadel, Azure Window" },
      { title: "Day 4: Mdina & Mosta", description: "Silent City, Rotunda dome church" },
      { title: "Day 5: Departure", description: "Blue Lagoon swimming, departure" }
    ]
  },
  {
    title: "Russian Trans-Siberian Railway",
    shortDesc: "Epic rail journey across vast Russian landscapes",
    description: "Embark on one of the world's greatest railway adventures aboard the Trans-Siberian Railway. Journey across eight time zones from Moscow to Vladivostok, stopping in historic cities like Irkutsk and exploring the pristine wilderness of Lake Baikal. This epic adventure combines comfortable train travel with cultural experiences and breathtaking Siberian landscapes.",
    duration: "14 Days",
    price: 3500.00,
    maxGuests: 16,
    difficulty: "Easy",
    category: "Rail Journey",
    location: "Russia",
    meetingPoint: "Moscow Airport",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Train compartment accommodation",
      "All meals on train",
      "Professional guide",
      "City tours in major stops",
      "Lake Baikal excursions",
      "Visa support"
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Hotel accommodation in cities",
      "Personal expenses",
      "Travel insurance"
    ],
    itinerary: [
      { title: "Day 1-2: Moscow", description: "Red Square, Kremlin, train departure" },
      { title: "Day 3: Kazan", description: "Tatar capital, mosque and kremlin visit" },
      { title: "Day 4-5: Yekaterinburg", description: "Europe-Asia border, city exploration" },
      { title: "Day 6-7: Novosibirsk", description: "Siberian capital, Ob River" },
      { title: "Day 8-9: Irkutsk", description: "Gateway to Baikal, wooden architecture" },
      { title: "Day 10-11: Lake Baikal", description: "World's deepest lake, island excursion" },
      { title: "Day 12-13: Ulan-Ude", description: "Buddhist culture, traditional villages" },
      { title: "Day 14: Vladivostok", description: "Pacific terminus, city tour, departure" }
    ]
  },
  {
    title: "Romania Dracula & Castles",
    shortDesc: "Medieval castles, vampire legends, and Carpathian Mountains",
    description: "Explore Romania's mysterious castles and medieval towns, following in Dracula's footsteps through Transylvania. Visit Bran Castle, discover the fortified churches of Transylvania, and explore the painted monasteries of Bucovina. This cultural journey combines Gothic romance with stunning mountain scenery and rich folk traditions.",
    duration: "8 Days",
    price: 1200.00,
    maxGuests: 14,
    difficulty: "Easy",
    category: "Cultural Tour",
    location: "Romania",
    meetingPoint: "Bucharest Airport",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552856741-10e34b5b07d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Traditional hotel accommodation",
      "Daily breakfast and 5 dinners",
      "Castle entrance fees",
      "Professional guide",
      "Folk performance evening",
      "Transportation"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      { title: "Day 1: Bucharest", description: "Arrival, Old Town, Palace of Parliament" },
      { title: "Day 2: Sinaia & Brasov", description: "Peles Castle, medieval Brasov" },
      { title: "Day 3: Bran Castle", description: "Dracula's Castle, Rasnov Fortress" },
      { title: "Day 4: Sighisoara", description: "Medieval citadel, Vlad Dracula birthplace" },
      { title: "Day 5: Sibiu", description: "European Capital of Culture, traditional crafts" },
      { title: "Day 6: Painted Monasteries", description: "Bucovina monasteries, UNESCO sites" },
      { title: "Day 7: Maramures", description: "Wooden churches, traditional villages" },
      { title: "Day 8: Departure", description: "Return to Bucharest, departure" }
    ]
  },
  {
    title: "Cyprus Aphrodite Island",
    shortDesc: "Ancient ruins, pristine beaches, and divided history",
    description: "Discover the island of Aphrodite, where Greek and Turkish cultures blend amid ancient ruins and pristine beaches. Explore Paphos archaeological sites, relax on golden beaches, and taste excellent Cypriot wines. This Mediterranean island offers year-round sunshine, rich history from ancient Greece to Byzantine times, and warm hospitality.",
    duration: "6 Days",
    price: 1100.00,
    maxGuests: 12,
    difficulty: "Easy",
    category: "Cultural Beach",
    location: "Cyprus",
    meetingPoint: "Larnaca Airport",
    featuredImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Beach resort accommodation",
      "Daily breakfast and 3 dinners",
      "Archaeological site visits",
      "Wine tasting tour",
      "Traditional village lunch",
      "Rental car included"
    ],
    exclusions: [
      "International flights",
      "Some meals",
      "Personal expenses",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      { title: "Day 1: Larnaca", description: "Arrival, Hala Sultan Tekke, salt lake" },
      { title: "Day 2: Paphos", description: "Archaeological park, Tombs of the Kings" },
      { title: "Day 3: Troodos Mountains", description: "Byzantine monasteries, mountain villages" },
      { title: "Day 4: Limassol", description: "Wine region tour, Kolossi Castle" },
      { title: "Day 5: Ayia Napa", description: "Beach day, sea caves exploration" },
      { title: "Day 6: Departure", description: "Final coastal views, departure" }
    ]
  },
  {
    title: "Botswana Okavango Delta",
    shortDesc: "Mokoro canoes through pristine wetlands and wildlife",
    description: "Experience the pristine wilderness of the Okavango Delta, one of Africa's last untouched ecosystems. Glide through crystal-clear channels in traditional mokoro canoes, spot elephants, hippos, and hundreds of bird species. This exclusive safari combines water-based game viewing with traditional bush walks, offering an intimate connection with nature in this UNESCO World Heritage site.",
    duration: "6 Days",
    price: 3200.00,
    maxGuests: 8,
    difficulty: "Moderate",
    category: "Wildlife Safari",
    location: "Okavango Delta, Botswana",
    meetingPoint: "Maun Airport",
    featuredImage: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Luxury safari camp accommodation",
      "All meals and premium beverages",
      "Mokoro canoe excursions",
      "Walking safaris with guides",
      "Charter flights",
      "Professional guides"
    ],
    exclusions: [
      "International flights to Botswana",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Gratuities"
    ],
    itinerary: [
      { title: "Day 1: Maun to Delta", description: "Charter flight to camp, afternoon mokoro safari" },
      { title: "Day 2: Water Safari", description: "Full day mokoro excursions, bird watching" },
      { title: "Day 3: Walking Safari", description: "Bush walk, traditional village visit" },
      { title: "Day 4: Game Drives", description: "Morning game drive, afternoon water activities" },
      { title: "Day 5: Elephant Encounters", description: "Special elephant tracking, sunset cruise" },
      { title: "Day 6: Departure", description: "Final mokoro trip, flight back to Maun" }
    ]
  },
  {
    title: "Namibia Desert & Wildlife",
    shortDesc: "Red sand dunes, desert elephants, and star-filled skies",
    description: "Explore Namibia's otherworldly landscapes from the towering red dunes of Sossusvlei to the wildlife-rich Etosha National Park. Encounter desert-adapted elephants, climb some of the world's highest sand dunes, and experience the haunting beauty of the Skeleton Coast. This adventure combines dramatic desert scenery with excellent wildlife viewing under some of the darkest skies on Earth.",
    duration: "9 Days",
    price: 2800.00,
    maxGuests: 10,
    difficulty: "Moderate",
    category: "Desert Safari",
    location: "Namibia",
    meetingPoint: "Windhoek Airport",
    featuredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    inclusions: [
      "Desert lodge accommodation",
      "All meals included",
      "Professional guide and vehicle",
      "Park entrance fees",
      "Sossusvlei sunrise excursion",
      "Stargazing sessions"
    ],
    exclusions: [
      "International flights",
      "Alcoholic beverages",
      "Personal expenses",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: [
      { title: "Day 1: Windhoek", description: "Arrival, city orientation, departure to desert" },
      { title: "Day 2: Sossusvlei", description: "Sunrise at Dune 45, Dead Vlei exploration" },
      { title: "Day 3: Sesriem Canyon", description: "Canyon hike, desert adaptation talks" },
      { title: "Day 4: Swakopmund", description: "Coastal town, desert activities" },
      { title: "Day 5: Skeleton Coast", description: "Seal colonies, shipwrecks, desert meeting ocean" },
      { title: "Day 6: Damaraland", description: "Desert elephants, ancient rock art" },
      { title: "Day 7-8: Etosha National Park", description: "Wildlife viewing at waterholes" },
      { title: "Day 9: Departure", description: "Return to Windhoek, departure" }
    ]
  }
];

async function seedTours() {
  console.log('Starting to seed tours...');
  
  try {
    // Clear existing tours
    await prisma.tour.deleteMany({});
    console.log('Cleared existing tours');

    // Create new tours
    for (const tourData of tours) {
      const tour = await prisma.tour.create({
        data: tourData,
      });
      console.log(`Created tour: ${tour.title}`);
    }

    console.log(`Successfully seeded ${tours.length} tours!`);
  } catch (error) {
    console.error('Error seeding tours:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTours();