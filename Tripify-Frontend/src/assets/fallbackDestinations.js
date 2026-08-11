// Mirrors tripify-backend/seed.js so the UI still looks complete
// even if the backend / MongoDB isn't running yet (e.g. first run,
// or while you're still wiring up the API).
export const fallbackDestinations = [
  {
    name: "Pachmarhi",
    slug: "pachmarhi",
    type: "domestic",
    category: "hill",
    description:
      "The Queen of Satpura, known for waterfalls, caves, forests, and scenic viewpoints.",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    duration: "1N/2D",
    priceFrom: 4999,
    isPopular: true,
  },
  {
    name: "Jaipur",
    slug: "jaipur",
    type: "domestic",
    category: "heritage",
    description:
      "The Pink City famous for royal palaces, forts, and vibrant Rajasthani culture.",
    imageUrl:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80",
    duration: "4N/5D",
    priceFrom: 4999,
    isPopular: true,
  },
  {
    name: "Manali",
    slug: "manali",
    type: "domestic",
    category: "adventure",
    description:
      "A popular Himalayan destination offering snow activities, trekking, and mountain views.",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    duration: "5N/6D",
    priceFrom: 13499,
    isPopular: true,
  },
  {
    name: "Goa",
    slug: "goa",
    type: "domestic",
    category: "beach",
    description:
      "India's most famous beach destination known for nightlife and water sports.",
    imageUrl:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
    duration: "5N/6D",
    priceFrom: 15999,
    isPopular: true,
  },
  {
    name: "Ladakh",
    slug: "ladakh",
    type: "domestic",
    category: "adventure",
    description:
      "High-altitude desert known for Pangong Lake, monasteries, and bike trips.",
    imageUrl:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80",
    duration: "4N/5D",
    priceFrom: 12499,
    isPopular: true,
  },
  {
    name: "Varkala",
    slug: "varkala",
    type: "domestic",
    category: "beach",
    description:
      "A beautiful cliff-side beach destination in Kerala famous for relaxation and Ayurveda.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    duration: "3N/4D",
    priceFrom: 13499,
    isPopular: false,
  },
  {
    name: "Kashmir",
    slug: "kashmir",
    type: "domestic",
    category: "hill",
    description:
      "Known as Paradise on Earth, featuring snow-covered mountains and Dal Lake.",
    imageUrl:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
    duration: "7N/8D",
    priceFrom: 14999,
    isPopular: true,
  },
  {
    name: "Rishikesh",
    slug: "rishikesh",
    type: "domestic",
    category: "adventure",
    description:
      "Adventure capital of India offering rafting, yoga retreats, and bungee jumping.",
    imageUrl:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",
    duration: "4N/5D",
    priceFrom: 7999,
    isPopular: true,
  },
  {
    name: "Bali",
    slug: "bali",
    type: "international",
    category: "beach",
    description:
      "Indonesia's island paradise famous for beaches, temples, and rice terraces.",
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    duration: "5N/6D",
    priceFrom: 20000,
    isPopular: true,
  },
  {
    name: "Dubai",
    slug: "dubai",
    type: "international",
    category: "heritage",
    description:
      "A futuristic city known for luxury shopping, skyscrapers, and desert adventures.",
    imageUrl:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
    duration: "4N/5D",
    priceFrom: 30000,
    isPopular: true,
  },
  {
    name: "Maldives",
    slug: "maldives",
    type: "international",
    category: "beach",
    description:
      "World-famous island destination known for overwater villas and crystal-clear waters.",
    imageUrl:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=600&q=80",
    duration: "6N/7D",
    priceFrom: 30000,
    isPopular: true,
  },
  {
    name: "Bangkok",
    slug: "bangkok",
    type: "international",
    category: "heritage",
    description:
      "Thailand's vibrant capital known for temples, markets, and street food.",
    imageUrl:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80",
    duration: "6N/7D",
    priceFrom: 30000,
    isPopular: true,
  },
  {
    name: "Istanbul",
    slug: "istanbul",
    type: "international",
    category: "heritage",
    description:
      "A city spanning Europe and Asia, famous for historic architecture and culture.",
    imageUrl:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=600&q=80",
    duration: "5N/6D",
    priceFrom: 40000,
    isPopular: false,
  },
  {
    name: "London",
    slug: "london",
    type: "international",
    category: "heritage",
    description:
      "Historic and modern attractions blend together in the capital of the UK.",
    imageUrl:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
    duration: "7N/8D",
    priceFrom: 60000,
    isPopular: true,
  },
  {
    name: "Abu Dhabi",
    slug: "abu-dhabi",
    type: "international",
    category: "heritage",
    description:
      "Capital of UAE known for Sheikh Zayed Mosque and luxury attractions.",
    imageUrl:
      "https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&w=600&q=80",
    duration: "9N/10D",
    priceFrom: 45000,
    isPopular: false,
  },
  {
    name: "Las Vegas",
    slug: "las-vegas",
    type: "international",
    category: "adventure",
    description:
      "Entertainment capital of the world known for casinos, shows, and nightlife.",
    imageUrl:
      "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=600&q=80",
    duration: "10N/11D",
    priceFrom: 100000,
    isPopular: false,
  },
];
