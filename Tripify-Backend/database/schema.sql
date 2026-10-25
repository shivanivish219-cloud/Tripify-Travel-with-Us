-- ==============================================================================
-- Tripify Intelligent Search Database Schema
-- Compatible with PostgreSQL & MySQL (JSON / JSONB support)
-- ==============================================================================

-- 1. Places Table (Base Table)
CREATE TABLE IF NOT EXISTS places (
    id VARCHAR(50) PRIMARY KEY,
    state VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 4.5,
    image TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Place Translations Table (Multilingual Support: en, hi, hi-Latn)
CREATE TABLE IF NOT EXISTS place_translations (
    id SERIAL PRIMARY KEY,
    place_id VARCHAR(50) NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    lang VARCHAR(10) NOT NULL, -- 'en', 'hi', 'hi-Latn'
    name VARCHAR(150) NOT NULL,
    description TEXT,
    keywords JSONB NOT NULL, -- Array of keywords, misspellings, transliterations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_place_lang UNIQUE (place_id, lang)
);

-- 3. Place Tags Table (Category & Semantic Tagging)
CREATE TABLE IF NOT EXISTS place_tags (
    id SERIAL PRIMARY KEY,
    place_id VARCHAR(50) NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Inventory / Hotels Table (Availability & Pricing)
CREATE TABLE IF NOT EXISTS inventory_hotels (
    id SERIAL PRIMARY KEY,
    place_id VARCHAR(50) NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    hotel_name VARCHAR(150) NOT NULL,
    rooms_available INT DEFAULT 5,
    price_per_night DECIMAL(10, 2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE
);

-- Indexes for lightning fast searching
CREATE INDEX IF NOT EXISTS idx_places_category ON places(category);
CREATE INDEX IF NOT EXISTS idx_places_active ON places(is_active);
CREATE INDEX IF NOT EXISTS idx_translations_place ON place_translations(place_id);
CREATE INDEX IF NOT EXISTS idx_translations_lang ON place_translations(lang);
CREATE INDEX IF NOT EXISTS idx_tags_place ON place_tags(place_id);
CREATE INDEX IF NOT EXISTS idx_tags_tag ON place_tags(tag);

-- ==============================================================================
-- SAMPLE DATA (5 Destinations: Manali, Shimla, Goa, Jaipur, Kerala)
-- Includes Hindi names, English names, and 2-3 common phonetic misspellings
-- ==============================================================================

-- 1. PLACES
INSERT INTO places (id, state, category, rating, image, is_active) VALUES
('PLACE_101', 'Himachal Pradesh', 'hill_station', 4.8, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80', TRUE),
('PLACE_102', 'Himachal Pradesh', 'hill_station', 4.7, 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80', TRUE),
('PLACE_103', 'Goa', 'beach', 4.9, 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', TRUE),
('PLACE_104', 'Rajasthan', 'heritage', 4.6, 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=80', TRUE),
('PLACE_105', 'Kerala', 'beach', 4.8, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 2. TRANSLATIONS (English, Hindi, Hinglish / hi-Latn with typo keywords)
INSERT INTO place_translations (place_id, lang, name, description, keywords) VALUES
-- PLACE_101: Manali
('PLACE_101', 'en', 'Manali', 'Popular Himalayan resort town famous for snow-capped peaks, Solang Valley, and adventure sports.', 
 '["manali", "maanale", "manalee", "manali hill station", "manali tour"]'::jsonb),
('PLACE_101', 'hi', 'मनाली', 'हिमाचल प्रदेश की हसीन वादियों, सोलांग वैली और बर्फबारी के लिए विश्व प्रसिद्ध पर्वतीय स्थल।', 
 '["मनाली", "मनालि", "मनाली बर्फबारी", "मनाली हिल स्टेशन"]'::jsonb),
('PLACE_101', 'hi-Latn', 'Manali', 'Himachal ka sabse sundar hill station jahan barf aur pahad dekhne milte hain.', 
 '["maanali", "manali trip", "manali ghumne ki jagah", "snowfall wali jagah"]'::jsonb),

-- PLACE_102: Shimla
('PLACE_102', 'en', 'Shimla', 'The Queen of Hills known for colonial architecture, Mall Road, and the historic toy train.', 
 '["shimla", "simla", "shimala", "shimla mall road", "queen of hills"]'::jsonb),
('PLACE_102', 'hi', 'शिमला', 'पहाड़ों की रानी शिमला अपने सुहावने मौसम, माल रोड और टॉय ट्रेन के लिए प्रसिद्ध।', 
 '["शिमला", "शिमला हिल्स", "शिमला ट्रिप"]'::jsonb),
('PLACE_102', 'hi-Latn', 'Shimla', 'Pahadon ki rani, Mall road aur thand ke mausam ke liye mashhoor jagah.', 
 '["simla", "sheemla", "shimla tour", "thand wali jagah"]'::jsonb),

-- PLACE_103: Goa
('PLACE_103', 'en', 'Goa', 'India coastal paradise famed for golden sand beaches, nightlife, shacks, and water sports.', 
 '["goa", "gova", "goaa", "goa beaches", "north goa", "south goa"]'::jsonb),
('PLACE_103', 'hi', 'गोवा', 'खूबसूरत समुद्र तट, जीवंत नाइटलाइफ़ और रोमांचक वॉटर स्पोर्ट्स का केंद्र।', 
 '["गोवा", "गोआ", "गोवा बीच", "गोवा ट्रिप"]'::jsonb),
('PLACE_103', 'hi-Latn', 'Goa', 'Beaches, parties aur water sports ke liye India ki sabse famous jagah.', 
 '["gova", "goa trip", "beach wali jagah", "samundar kinare"]'::jsonb),

-- PLACE_104: Jaipur
('PLACE_104', 'en', 'Jaipur', 'The Pink City rich in royal heritage, historic forts, grand palaces, and vibrant bazaars.', 
 '["jaipur", "jaypur", "jaipoor", "pink city", "hawa mahal"]'::jsonb),
('PLACE_104', 'hi', 'जयपुर', 'गुलाबी नगर जयपुर, अपने ऐतिहासिक किलों, हवा महल और शाही विरासत के लिए विख्यात।', 
 '["जयपुर", "जयपूर", "गुलाबी नगर", "जयपुर महल"]'::jsonb),
('PLACE_104', 'hi-Latn', 'Jaipur', 'Pink city jahan rajputana itihaas, mahal aur qile dekhne ko milte hain.', 
 '["jaypur", "jaipoor", "jaipur tour", "mahal dekhne ki jagah"]'::jsonb),

-- PLACE_105: Kerala
('PLACE_105', 'en', 'Kerala', 'God Own Country renowned for tranquil backwaters, Ayurveda retreats, and palm-lined beaches.', 
 '["kerala", "kerla", "kairala", "gods own country", "alleppey", "munnar"]'::jsonb),
('PLACE_105', 'hi', 'केरल', 'ईश्वर का अपना देश, शांत बैकवाटर्स, हरियाली और मनमोहक समुद्र तटों की भूमि।', 
 '["केरल", "केरला", "केरल बैकवाटर्स", "केरल टूर"]'::jsonb),
('PLACE_105', 'hi-Latn', 'Kerala', 'Backwaters, houseboats aur hariyali se bhari shandar jagah.', 
 '["kerla", "kairala", "kerala trip", "backwaters wali jagah"]'::jsonb)
ON CONFLICT (place_id, lang) DO NOTHING;

-- 3. PLACE TAGS (Category & Semantic Tagging)
INSERT INTO place_tags (place_id, tag) VALUES
('PLACE_101', 'hill_station'), ('PLACE_101', 'snowfall'), ('PLACE_101', 'adventure'), ('PLACE_101', 'honeymoon'), ('PLACE_101', 'family'),
('PLACE_102', 'hill_station'), ('PLACE_102', 'snowfall'), ('PLACE_102', 'heritage'), ('PLACE_102', 'family'), ('PLACE_102', 'honeymoon'),
('PLACE_103', 'beach'), ('PLACE_103', 'nightlife'), ('PLACE_103', 'adventure'), ('PLACE_103', 'honeymoon'), ('PLACE_103', 'budget_10k'),
('PLACE_104', 'heritage'), ('PLACE_104', 'culture'), ('PLACE_104', 'family'), ('PLACE_104', 'budget_10k'),
('PLACE_105', 'beach'), ('PLACE_105', 'nature'), ('PLACE_105', 'honeymoon'), ('PLACE_105', 'family'), ('PLACE_105', 'budget_10k')
ON CONFLICT DO NOTHING;

-- 4. INVENTORY / HOTELS (Sample availability)
INSERT INTO inventory_hotels (place_id, hotel_name, rooms_available, price_per_night, is_available) VALUES
('PLACE_101', 'Solang Valley Resort Manali', 8, 4500.00, TRUE),
('PLACE_101', 'Snow Peak Retreat', 4, 3200.00, TRUE),
('PLACE_102', 'The Oberoi Cecil Shimla', 5, 8500.00, TRUE),
('PLACE_102', 'Radisson Hotel Shimla', 12, 4200.00, TRUE),
('PLACE_103', 'Taj Fort Aguada Resort Goa', 6, 12000.00, TRUE),
('PLACE_103', 'Calangute Beach Shack Hotel', 15, 2200.00, TRUE),
('PLACE_104', 'ITC Rajputana Jaipur', 7, 6500.00, TRUE),
('PLACE_104', 'Hotel Hawa Mahal Heritage', 10, 2800.00, TRUE),
('PLACE_105', 'Kumarakom Lake Resort Kerala', 3, 9500.00, TRUE),
('PLACE_105', 'Varkala Cliff Beach Stay', 11, 2400.00, TRUE);

