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
    hindiName: "गोवा",
    keywords: ["goa", "gova", "goaa", "गोवा", "goa beach", "north goa", "south goa", "samundar"],
    tags: ["beach", "nightlife", "party", "adventure", "honeymoon"],
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
    hindiName: "मनाली",
    keywords: ["manali", "maanale", "manalee", "मनाली", "manali hill station", "solang valley", "rohtang", "snowfall wali jagah"],
    tags: ["adventure", "hill", "snowfall", "honeymoon", "family"],
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
    hindiName: "जयपुर",
    keywords: ["jaipur", "jaypur", "jaipoor", "जयपुर", "pink city", "hawa mahal", "amer fort", "gulabi nagar"],
    tags: ["heritage", "culture", "palace", "fort", "family"],
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
    hindiName: "कश्मीर",
    keywords: ["kashmir", "casmir", "kashmeer", "कश्मीर", "srinagar", "dal lake", "gulmarg", "jannat"],
    tags: ["hill", "snowfall", "nature", "honeymoon", "valley"],
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
    hindiName: "लद्दाख",
    keywords: ["ladakh", "laddakh", "ladak", "लद्दाख", "leh", "leh ladakh", "pangong lake", "bike trip"],
    tags: ["adventure", "roadtrip", "mountains", "biking", "valley"],
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
    hindiName: "ऋषिकेश",
    keywords: ["rishikesh", "risikesh", "hrishikesh", "ऋषिकेश", "rafting", "river rafting", "yoga", "ganga"],
    tags: ["adventure", "rafting", "spiritual", "yoga", "camping"],
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
    hindiName: "उदयपुर",
    keywords: ["udaipur", "udaypur", "udaipoor", "उदयपुर", "city of lakes", "lake pichola", "city palace"],
    tags: ["heritage", "lakes", "royal", "honeymoon", "palace"],
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
    hindiName: "आगरा",
    keywords: ["agra", "aagra", "agrah", "आगरा", "taj mahal", "agra fort", "tajmahal"],
    tags: ["heritage", "monument", "seven wonders", "historic", "family"],
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
    hindiName: "केरल",
    keywords: ["kerala", "kerla", "kairala", "केरल", "gods own country", "alleppey", "munnar", "backwaters"],
    tags: ["nature", "backwaters", "beach", "honeymoon", "ayurveda"],
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
    hindiName: "अंडमान",
    keywords: ["andaman", "andman", "andaman nicobar", "अंडमान", "havelock", "radhanagar", "port blair"],
    tags: ["beach", "island", "scuba", "honeymoon", "water sports"],
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
    hindiName: "ऊटी",
    keywords: ["ooty", "ootee", "uti", "ऊटी", "queen of hill stations", "nilgiri", "toy train"],
    tags: ["hill", "tea gardens", "nature", "family", "honeymoon"],
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
    hindiName: "दार्जिलिंग",
    keywords: ["darjeeling", "darjiling", "darjeling", "दार्जिलिंग", "tiger hill", "toy train", "kanchendzonga"],
    tags: ["hill", "tea gardens", "mountains", "snow", "family"],
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
    hindiName: "शिमला",
    keywords: ["shimla", "simla", "sheemla", "शिमला", "mall road", "kufri", "queen of hills", "snowfall"],
    tags: ["hill", "snowfall", "colonial", "family", "honeymoon"],
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
    hindiName: "मसूरी",
    keywords: ["mussoorie", "masuri", "mussorie", "मसूरी", "kempty falls", "queen of hills", "dehradun"],
    tags: ["hill", "waterfalls", "nature", "weekend", "family"],
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
    hindiName: "वाराणसी",
    keywords: ["varanasi", "banaras", "kashi", "वाराणसी", "बनारस", "काशी", "ganga aarti", "ghats", "kashi vishwanath"],
    tags: ["heritage", "spiritual", "temples", "ghats", "culture"],
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
    hindiName: "अमृतसर",
    keywords: ["amritsar", "amritser", "ambarsar", "अमृतसर", "golden temple", "wagah border", "harmandir sahib"],
    tags: ["heritage", "spiritual", "culture", "food", "family"],
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
    hindiName: "मेघालय",
    keywords: ["meghalaya", "megalaya", "shillong", "मेघालय", "cherrapunji", "living root bridges", "dawki"],
    tags: ["adventure", "waterfalls", "nature", "caves", "rain"],
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
    hindiName: "कूर्ग",
    keywords: ["coorg", "kurg", "kodagu", "कूर्ग", "scotland of india", "coffee plantations", "madikeri"],
    tags: ["hill", "coffee", "nature", "waterfalls", "honeymoon"],
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
    hindiName: "पचमढ़ी",
    keywords: ["pachmarhi", "panchmarhi", "pachmarhi hill station", "पचमढ़ी", "queen of satpura", "bee falls", "satpura"],
    tags: ["hill", "waterfalls", "caves", "nature", "peaceful"],
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
    hindiName: "बाली",
    keywords: ["bali", "balee", "baali", "बाली", "ubud", "kuta", "indonesia", "bali island"],
    tags: ["beach", "tropical", "temples", "honeymoon", "island"],
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
    hindiName: "दुबई",
    keywords: ["dubai", "doobai", "dubye", "दुबई", "burj khalifa", "desert safari", "uae", "dubai mall"],
    tags: ["adventure", "luxury", "shopping", "desert", "family"],
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
    hindiName: "मालदीव",
    keywords: ["maldives", "maldive", "maldiev", "मालदीव", "water villas", "resorts", "male"],
    tags: ["beach", "luxury", "honeymoon", "coral", "island"],
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
    hindiName: "बैंकॉक",
    keywords: ["bangkok", "bangkock", "bankok", "बैंकॉक", "thailand", "grand palace", "street food", "siam"],
    tags: ["heritage", "shopping", "nightlife", "temples", "culture"],
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
    hindiName: "सिंगापुर",
    keywords: ["singapore", "singapur", "singpore", "सिंगापुर", "sentosa", "marina bay", "universal studios"],
    tags: ["adventure", "city", "family", "modern", "gardens"],
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
    hindiName: "फुकेत",
    keywords: ["phuket", "puket", "fuket", "फुकेत", "phi phi island", "thailand beach", "patong"],
    tags: ["beach", "island", "nightlife", "water sports", "honeymoon"],
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
    hindiName: "इस्तांबुल",
    keywords: ["istanbul", "istanbool", "istanbal", "इस्तांबुल", "turkey", "hagia sophia", "bosphorus", "blue mosque"],
    tags: ["heritage", "historic", "architecture", "bazaars", "culture"],
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
    hindiName: "लंदन",
    keywords: ["london", "landan", "londun", "लंदन", "uk", "big ben", "london eye", "tower bridge"],
    tags: ["heritage", "museums", "historic", "city", "landmarks"],
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
    hindiName: "पेरिस",
    keywords: ["paris", "pariss", "paaris", "पेरिस", "france", "eiffel tower", "louvre", "notre dame"],
    tags: ["heritage", "romantic", "honeymoon", "art", "fashion"],
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
    hindiName: "रोम",
    keywords: ["rome", "room", "rom", "रोम", "italy", "colosseum", "vatican", "trevi fountain"],
    tags: ["heritage", "ancient", "historic", "architecture", "monuments"],
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
    hindiName: "स्विट्जरलैंड",
    keywords: ["switzerland", "swis", "swizerland", "swiss", "स्विट्जरलैंड", "alps", "zurich", "interlaken", "jungfrau"],
    tags: ["hill", "snowfall", "alps", "honeymoon", "luxury"],
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
    hindiName: "मॉरीशस",
    keywords: ["mauritius", "maritius", "morishas", "मॉरीशस", "mauritius beaches", "island resort", "port louis"],
    tags: ["beach", "honeymoon", "coral", "luxury", "island"],
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
    hindiName: "अबू धाबी",
    keywords: ["abu dhabi", "abudhabi", "abu dabi", "अबू धाबी", "grand mosque", "ferrari world", "uae capital"],
    tags: ["heritage", "luxury", "architecture", "desert", "modern"],
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
    hindiName: "मलेशिया",
    keywords: ["malaysia", "malesia", "malasiya", "मलेशिया", "kuala lumpur", "genting", "petronas towers", "langkawi"],
    tags: ["adventure", "nature", "islands", "shopping", "family"],
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
    hindiName: "श्रीलंका",
    keywords: ["sri lanka", "srilanka", "shri lanka", "श्रीलंका", "colombo", "kandy", "sigiriya", "bentota"],
    tags: ["adventure", "beaches", "tea plantations", "wildlife", "nature"],
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
    hindiName: "वियतनाम",
    keywords: ["vietnam", "veitnam", "viet nam", "वियतनाम", "ha long bay", "hanoi", "da nang", "ho chi minh"],
    tags: ["adventure", "landscapes", "culture", "street food", "nature"],
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
    hindiName: "टोक्यो",
    keywords: ["tokyo", "tokiyo", "tokio", "टोक्यो", "japan", "shibuya", "mount fuji", "shinjuku"],
    tags: ["heritage", "technology", "culture", "temples", "modern"],
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
    hindiName: "न्यू यॉर्क",
    keywords: ["new york", "newyork", "ny", "nyc", "न्यू यॉर्क", "times square", "manhattan", "statue of liberty"],
    tags: ["adventure", "city", "skyscrapers", "shopping", "entertainment"],
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
    hindiName: "कप्पाडोसिया",
    keywords: ["cappadocia", "capadocia", "kapadokya", "कप्पाडोसिया", "hot air balloon", "turkey valleys", "goreme"],
    tags: ["adventure", "hot air balloon", "valleys", "unique", "romantic"],
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
