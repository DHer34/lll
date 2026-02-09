-- Seed menu_prices with all menu items from the static data
-- Using ON CONFLICT to avoid duplicates if run multiple times

INSERT INTO menu_prices (id, name, description, price_en, price_familj, category, vegetarian, spicy) VALUES
-- Pizzor
('v1', 'Margherita', 'Tomatsås, mozzarella, parmesan', 100, 230, 'vardagspizzor', true, false),
('v2', 'Vesuvio', 'Skinka', 110, 250, 'vardagspizzor', false, false),
('v3', 'Capricciosa', 'Skinka, champinjoner', 115, 260, 'vardagspizzor', false, false),
('v4', 'Hawaii', 'Skinka, ananas', 115, 260, 'vardagspizzor', false, false),
('v5', 'Calzone', 'Inbakad med skinka', 110, NULL, 'vardagspizzor', false, false),

-- Tacos / Mexicana
('t1', 'Tacopizza', 'Tacokryddad nötfärs, tacosås, nachos, gräddfil', 125, 280, 'tacos-mexicana', false, true),
('t2', 'Mexicana', 'Köttfärs, champinjoner, lök, vitlök, tacosås, jalapeño', 125, 280, 'tacos-mexicana', false, true),
('t3', 'Oxfilé & Bearnaise', 'Oxfilé, béarnaisesås', 130, 290, 'tacos-mexicana', false, false),
('t4', 'Oxfilé Special', 'Oxfilé, färska champinjoner, lök, färska tomater, bearnaisesås', 130, 290, 'tacos-mexicana', false, false),
('t5', 'Acapulco', 'Oxfilé, champinjoner, lök, vitlök, tacosås, jalapeño', 130, 290, 'tacos-mexicana', false, true),

-- Kycklingpizzor
('k1', 'Kycklingpizza', 'Kyckling, banan, curry, jordnötter, valfri sås', 115, 260, 'kycklingpizzor', false, false),
('k2', 'Kycklingkebab', 'Kycklingkebab, valfri sås', 115, 260, 'kycklingpizzor', false, false),
('k3', 'Kyckling & BBQ', 'Kyckling, BBQ-sås, rödlök', 115, 260, 'kycklingpizzor', false, false),
('k4', 'Kyckling Pesto', 'Kyckling, grön pesto, marinerad skivade-tomater', 115, 260, 'kycklingpizzor', false, false),

-- Fisk & Skaldjur
('f1', 'Tonfiskpizza', 'Tonfisk, lök', 110, 250, 'fisk-skaldjur', false, false),

-- Kebab / Special
('kb1', 'Kebabpizza', 'Kebabkött, ost, lök, feferoni, valfri sås', 115, 260, 'kebab-special', false, false),
('kb2', 'Pommes pizza', 'Kebabkött, pommes, valfri sås', 120, 270, 'kebab-special', false, false),
('kb3', 'Konkurs pizza', 'Kebabkött, tomat, lök, gurka, sallad, feferoni, valfri sås', 120, 270, 'kebab-special', false, false),

-- Lyxpizzor
('l1', 'Oxfilé & Bearnaise Supreme', 'Oxfilé, sparris, parmesan', 130, 290, 'lyxpizzor', false, false),
('l2', 'Getost & Honung', 'Getost, rödbetor, honung, valnöt, ruccola (bianco/tomatsås)', 130, 290, 'lyxpizzor', true, false),
('l3', 'Secret Level Pizza', 'Tomatsås, grillad kyckling, krämig pesto, fetaost, krispiga salt & vinägerchips', 130, 290, 'lyxpizzor', false, false),

-- Rullar / Tallrikar
('r1', 'Kebab i bröd', 'Kebabkött, sallad, tomat, gurka, feferoni, valfri sås', 100, NULL, 'rullar-tallrikar', false, false),
('r2', 'Kebabrulle', 'Kebabkött, sallad, tomat, gurka, feferoni, valfri sås', 100, NULL, 'rullar-tallrikar', false, false),
('r3', 'Kebabtallrik', 'Kebabkött, pommes, sallad, tomat, gurka, feferoni, valfri sås', 115, NULL, 'rullar-tallrikar', false, false),
('r4', 'Kycklingrulle', 'Kyckling/kycklingkebab, sallad, tomat, gurka, feferoni, valfri sås', 100, NULL, 'rullar-tallrikar', false, false),
('r5', 'Kycklingtallrik', 'Kyckling/kycklingkebab, pommes, sallad, tomat, gurka, feferoni, valfri sås', 115, NULL, 'rullar-tallrikar', false, false),
('r6', 'Falafelrulle', 'Falafel, sallad, tomat, gurka, feferoni, valfri sås', 75, NULL, 'rullar-tallrikar', true, false),
('r7', 'Falafeltallrik', 'Falafel, pommes, sallad, tomat, gurka, feferoni, valfri sås', 100, NULL, 'rullar-tallrikar', true, false),

-- Burgare
('b1', 'Cheeseburger 2x90gr', 'Högkvalitativ nötkött, smörrostat briochebröd, dubbel cheddarost, hackad gul lök, picklad gurka, ketchup och senap', 120, NULL, 'burgare', false, false),
('b2', 'Hot N'' Cheesy 2x90gr', 'Högkvalitativ nötkött, smörrostat briochebröd, Chili Majo, jalapeños, karamelliserad lök, rostad lök, trippel cheddarost serveras med pommes', 120, NULL, 'burgare', false, true),
('b3', 'Halloumiburger', 'Smörrostat briochebröd, Chili Majo, Jalapeños, krispsallad, tomat, syltad rödlök och cheddarost och serveras med pommes', 100, NULL, 'burgare', true, false),
('b4', 'Grilled Chicken Classic', 'Grillad kycklingfilé, krispsallad, tomat, picklad rödlök, krämig aioli i smörrostat briochebröd serveras med pommes', 100, NULL, 'burgare', false, false),

-- Shawarma & Pommes
('s1', 'Shawarma arabi (Kyckling)', 'Kyckling shawarma rulle delad i bitar serveras med pommes, vitlökssås, tomat, mixed pickles, granatäppelsås', 105, NULL, 'shawarma', false, false),
('s2', 'Kyckling Shawarma Rulle', 'Kyckling, vitlökssås, saltgurka, granatäppelsås', 80, NULL, 'shawarma', false, false),
('s3', 'Lamm shawarmarulle', 'Lammkött, tomat, saltgurka, persilja, lök, inlagd rättika, tahinisås, granatäppelsås', 90, NULL, 'shawarma', false, false),
('s4', 'Shawarma arabi (Lamm)', 'Lammkött, pommes, persiljesallad, tomat, inlagd rättika, tahinisås, granatäppelsås', 115, NULL, 'shawarma', false, false),
('s5', 'Pommesrulle', 'Pommes, vitlökssås, coleslaw, ketchup', 65, NULL, 'shawarma', true, false),
('s6', 'Pommestallrik', 'Pommes + valfri sås', 50, NULL, 'shawarma', true, false)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_en = EXCLUDED.price_en,
  price_familj = EXCLUDED.price_familj,
  category = EXCLUDED.category,
  vegetarian = EXCLUDED.vegetarian,
  spicy = EXCLUDED.spicy,
  updated_at = NOW();
