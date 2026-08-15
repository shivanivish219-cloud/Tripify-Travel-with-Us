const dns = require("dns");

// MongoDB Atlas SRV/DNS resolution
dns.setServers(["8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");

const mongoose = require("mongoose");
require("dotenv").config();

const Destination = require("./models/Destination");

const destinations = [
  // =========================
  // DOMESTIC - INDIA
  // =========================

  {
    name: "Goa",
    slug: "goa",
    type: "domestic",
    category: "beach",
    description:
      "A popular beach destination known for beautiful beaches, water activities, Portuguese heritage, and vibrant nightlife.",
    imageUrl:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 15999,
    isPopular: true,
  },

  {
    name: "Manali",
    slug: "manali",
    type: "domestic",
    category: "adventure",
    description:
      "A Himalayan destination famous for mountain landscapes, valleys, snow activities, trekking, and adventure experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 13499,
    isPopular: true,
  },

  {
    name: "Jaipur",
    slug: "jaipur",
    type: "domestic",
    category: "heritage",
    description:
      "The Pink City of India, famous for royal palaces, historic forts, colourful markets, and Rajasthani culture.",
    imageUrl:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    duration: "4N/5D",
    priceFrom: 9999,
    isPopular: true,
  },

  {
    name: "Kashmir",
    slug: "kashmir",
    type: "domestic",
    category: "hill",
    description:
      "A scenic Himalayan destination known for snow-covered mountains, valleys, Dal Lake, and beautiful landscapes.",
    imageUrl:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    duration: "6N/7D",
    priceFrom: 14999,
    isPopular: true,
  },

  {
    name: "Ladakh",
    slug: "ladakh",
    type: "domestic",
    category: "adventure",
    description:
      "A high-altitude Himalayan region known for mountain passes, monasteries, Pangong Lake, and unforgettable road trips.",
    imageUrl:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    duration: "6N/7D",
    priceFrom: 18999,
    isPopular: true,
  },

  {
    name: "Rishikesh",
    slug: "rishikesh",
    type: "domestic",
    category: "adventure",
    description:
      "An adventure destination famous for river rafting, trekking, yoga, camping, and the scenic Ganges.",
    imageUrl:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    duration: "3N/4D",
    priceFrom: 7999,
    isPopular: true,
  },

  {
    name: "Udaipur",
    slug: "udaipur",
    type: "domestic",
    category: "heritage",
    description:
      "The City of Lakes, known for grand palaces, historic architecture, beautiful lakes, and royal Rajasthani culture.",
    imageUrl:
      "https://images.unsplash.com/photo-1602643163986-8c6b5f4c8e7d?auto=format&fit=crop&w=1200&q=80",
    duration: "3N/4D",
    priceFrom: 8999,
    isPopular: true,
  },

  {
    name: "Agra",
    slug: "agra",
    type: "domestic",
    category: "heritage",
    description:
      "A historic city famous for the Taj Mahal, Agra Fort, Mughal architecture, and rich cultural heritage.",
    imageUrl:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    duration: "2N/3D",
    priceFrom: 6999,
    isPopular: true,
  },

  {
    name: "Kerala",
    slug: "kerala",
    type: "domestic",
    category: "adventure",
    description:
      "God's Own Country, known for backwaters, lush landscapes, hill stations, beaches, and cultural experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    duration: "6N/7D",
    priceFrom: 16999,
    isPopular: true,
  },

  {
    name: "Andaman",
    slug: "andaman",
    type: "domestic",
    category: "beach",
    description:
      "A tropical island destination known for crystal-clear waters, beaches, coral reefs, and water sports.",
    imageUrl:
      "https://images.unsplash.com/photo-1589979481223-deb893043163?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 21999,
    isPopular: true,
  },

  {
    name: "Ooty",
    slug: "ooty",
    type: "domestic",
    category: "hill",
    description:
      "A peaceful hill station in Tamil Nadu known for tea gardens, pleasant weather, lakes, and scenic mountain views.",
    imageUrl:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=80",
    duration: "3N/4D",
    priceFrom: 8999,
    isPopular: false,
  },

  {
    name: "Darjeeling",
    slug: "darjeeling",
    type: "domestic",
    category: "hill",
    description:
      "A beautiful Himalayan hill station famous for tea gardens, mountain views, toy trains, and sunrise experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    duration: "4N/5D",
    priceFrom: 9999,
    isPopular: true,
  },

  {
    name: "Shimla",
    slug: "shimla",
    type: "domestic",
    category: "hill",
    description:
      "A popular Himalayan hill station offering colonial architecture, mountain views, shopping, and winter experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80",
    duration: "4N/5D",
    priceFrom: 10999,
    isPopular: true,
  },

  {
    name: "Mussoorie",
    slug: "mussoorie",
    type: "domestic",
    category: "hill",
    description:
      "A charming hill station known for mountain scenery, waterfalls, viewpoints, and a pleasant climate.",
    imageUrl:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80",
    duration: "3N/4D",
    priceFrom: 8999,
    isPopular: false,
  },

  {
    name: "Varanasi",
    slug: "varanasi",
    type: "domestic",
    category: "heritage",
    description:
      "One of India's oldest cities, famous for its ghats, Ganges river, temples, spiritual traditions, and cultural heritage.",
    imageUrl:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    duration: "2N/3D",
    priceFrom: 6999,
    isPopular: true,
  },

  {
    name: "Amritsar",
    slug: "amritsar",
    type: "domestic",
    category: "heritage",
    description:
      "A historic destination known for the Golden Temple, vibrant markets, local cuisine, and important heritage sites.",
    imageUrl:
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
    duration: "2N/3D",
    priceFrom: 6499,
    isPopular: false,
  },

  {
    name: "Meghalaya",
    slug: "meghalaya",
    type: "domestic",
    category: "adventure",
    description:
      "A northeastern paradise featuring waterfalls, caves, living root bridges, forests, and beautiful hill landscapes.",
    imageUrl:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 13999,
    isPopular: true,
  },

  {
    name: "Coorg",
    slug: "coorg",
    type: "domestic",
    category: "hill",
    description:
      "A scenic hill destination in Karnataka known for coffee plantations, forests, waterfalls, and peaceful landscapes.",
    imageUrl:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
    duration: "3N/4D",
    priceFrom: 8999,
    isPopular: false,
  },

  {
    name: "Pachmarhi",
    slug: "pachmarhi",
    type: "domestic",
    category: "hill",
    description:
      "The Queen of Satpura, known for waterfalls, caves, forests, viewpoints, and peaceful mountain scenery.",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    duration: "2N/3D",
    priceFrom: 4999,
    isPopular: false,
  },

  // =========================
  // INTERNATIONAL
  // =========================

  {
    name: "Bali",
    slug: "bali",
    type: "international",
    category: "beach",
    description:
      "An Indonesian island destination famous for tropical beaches, temples, rice terraces, and cultural experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 29999,
    isPopular: true,
  },

  {
    name: "Dubai",
    slug: "dubai",
    type: "international",
    category: "adventure",
    description:
      "A modern destination famous for skyscrapers, luxury shopping, desert safaris, beaches, and entertainment.",
    imageUrl:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    duration: "4N/5D",
    priceFrom: 34999,
    isPopular: true,
  },

  {
    name: "Maldives",
    slug: "maldives",
    type: "international",
    category: "beach",
    description:
      "A tropical island destination known for turquoise waters, coral reefs, luxury resorts, and beautiful beaches.",
    imageUrl:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 39999,
    isPopular: true,
  },

  {
    name: "Bangkok",
    slug: "bangkok",
    type: "international",
    category: "heritage",
    description:
      "Thailand's vibrant capital known for temples, markets, street food, cultural attractions, and city experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 29999,
    isPopular: true,
  },

  {
    name: "Singapore",
    slug: "singapore",
    type: "international",
    category: "adventure",
    description:
      "A modern city-state known for futuristic architecture, gardens, entertainment, shopping, and family attractions.",
    imageUrl:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    duration: "4N/5D",
    priceFrom: 39999,
    isPopular: true,
  },

  {
    name: "Phuket",
    slug: "phuket",
    type: "international",
    category: "beach",
    description:
      "A Thai island destination famous for beaches, island tours, water activities, and tropical landscapes.",
    imageUrl:
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 32999,
    isPopular: true,
  },

  {
    name: "Istanbul",
    slug: "istanbul",
    type: "international",
    category: "heritage",
    description:
      "A historic city connecting Europe and Asia, known for mosques, palaces, bazaars, and rich cultural heritage.",
    imageUrl:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 49999,
    isPopular: true,
  },

  {
    name: "London",
    slug: "london",
    type: "international",
    category: "heritage",
    description:
      "The capital of the United Kingdom, known for historic landmarks, museums, royal attractions, and modern culture.",
    imageUrl:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    duration: "6N/7D",
    priceFrom: 79999,
    isPopular: true,
  },

  {
    name: "Paris",
    slug: "paris",
    type: "international",
    category: "heritage",
    description:
      "France's iconic capital famous for the Eiffel Tower, museums, historic architecture, fashion, and cuisine.",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 69999,
    isPopular: true,
  },

  {
    name: "Rome",
    slug: "rome",
    type: "international",
    category: "heritage",
    description:
      "Italy's historic capital, famous for ancient Roman landmarks, museums, architecture, and Italian culture.",
    imageUrl:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 74999,
    isPopular: true,
  },

  {
    name: "Switzerland",
    slug: "switzerland",
    type: "international",
    category: "hill",
    description:
      "A scenic European destination known for snow-capped Alps, lakes, charming villages, and breathtaking landscapes.",
    imageUrl:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    duration: "7N/8D",
    priceFrom: 99999,
    isPopular: true,
  },

  {
    name: "Mauritius",
    slug: "mauritius",
    type: "international",
    category: "beach",
    description:
      "A tropical island destination known for beaches, lagoons, coral reefs, water activities, and luxury resorts.",
    imageUrl:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 49999,
    isPopular: true,
  },

  {
    name: "Abu Dhabi",
    slug: "abu-dhabi",
    type: "international",
    category: "heritage",
    description:
      "The capital of the UAE, known for grand architecture, cultural attractions, beaches, and luxury experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&w=1200&q=80",
    duration: "4N/5D",
    priceFrom: 39999,
    isPopular: false,
  },

  {
    name: "Malaysia",
    slug: "malaysia",
    type: "international",
    category: "adventure",
    description:
      "A diverse Southeast Asian destination offering modern cities, islands, rainforests, food, and cultural attractions.",
    imageUrl:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 29999,
    isPopular: true,
  },

  {
    name: "Sri Lanka",
    slug: "sri-lanka",
    type: "international",
    category: "adventure",
    description:
      "An island destination known for beaches, wildlife, tea plantations, ancient cities, and scenic landscapes.",
    imageUrl:
      "https://images.unsplash.com/photo-1588598198321-9735fd524a5b?auto=format&fit=crop&w=1200&q=80",
    duration: "5N/6D",
    priceFrom: 27999,
    isPopular: true,
  },

  {
    name: "Vietnam",
    slug: "vietnam",
    type: "international",
    category: "adventure",
    description:
      "A Southeast Asian destination famous for dramatic landscapes, historic cities, local cuisine, and cultural experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    duration: "6N/7D",
    priceFrom: 34999,
    isPopular: true,
  },

  {
    name: "Tokyo",
    slug: "tokyo",
    type: "international",
    category: "heritage",
    description:
      "Japan's dynamic capital blending traditional culture, temples, modern technology, shopping, and entertainment.",
    imageUrl:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    duration: "6N/7D",
    priceFrom: 89999,
    isPopular: true,
  },

  {
    name: "New York",
    slug: "new-york",
    type: "international",
    category: "adventure",
    description:
      "A world-famous city known for iconic landmarks, museums, shopping, entertainment, and diverse neighbourhoods.",
    imageUrl:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=80",
    duration: "6N/7D",
    priceFrom: 109999,
    isPopular: true,
  },

  {
    name: "Cappadocia",
    slug: "cappadocia",
    type: "international",
    category: "adventure",
    description:
      "A unique Turkish destination famous for fairy chimneys, cave dwellings, valleys, and hot-air balloon experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    duration: "4N/5D",
    priceFrom: 54999,
    isPopular: false,
  },
];

const seedDestinations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for seeding");

    await Destination.deleteMany();

    await Destination.insertMany(destinations);

    console.log(`${destinations.length} destinations inserted successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDestinations();
