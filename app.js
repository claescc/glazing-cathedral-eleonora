const rooms = [
  ["atlas", "The Stained-Glass Atlas"],
  ["recipes", "The Recipe Library"],
  ["kiln", "The Kiln Chapel"],
  ["materials", "The Materials Archive"],
  ["restoration", "The Restoration Room"],
  ["masters", "The Hall of Masters"],
  ["notebook", "Eleonora’s Notebook"],
  ["reading", "The Reading Room"],
];
const families = [
  [
    "Crackled celadon",
    "tile_celadon.jpg",
    "blue green",
    "Gloss · crackle",
    "Cone 9–10",
    "Reduction",
    "Ru · Longquan · Goryeo",
    "Iron-bearing translucent feldspathic glass, developed through celebrated Chinese and Korean celadon traditions.",
  ],
  [
    "Tenmoku black",
    "tile_tenmoku.jpg",
    "black brown",
    "Gloss",
    "Cone 9–10",
    "Oxidation / reduction",
    "Jian · China",
    "The iron-saturated family that includes hare’s-fur, oil-spot, kaki and tea-dust.",
  ],
  [
    "Hare’s fur",
    "tile_haresfur.jpg",
    "black amber",
    "Streaked gloss",
    "Cone 9–12",
    "Reduction",
    "Jian kilns",
    "Iron-rich streaks flow through a dark Jian-type glaze.",
  ],
  [
    "Oil spot · yuteki",
    "tile_oilspot.jpg",
    "black silver",
    "Spotted gloss",
    "Cone 9–12",
    "Oxidation",
    "China · Japan",
    "Bubbles raft iron to the surface and heal into metallic spots.",
  ],
  [
    "Kaki · persimmon",
    "tile_kaki.jpg",
    "orange red brown",
    "Crystalline satin",
    "Cone 9–10",
    "Oxidation",
    "East Asia",
    "Iron saturation develops rust, persimmon and tomato-red crystal fields.",
  ],
  [
    "Tea dust",
    "tile_teadust.jpg",
    "green brown",
    "Fine crystalline",
    "Cone 9–12",
    "Controlled cooling",
    "China",
    "Minute yellow-green crystals scatter through a dark ground.",
  ],
  [
    "Carbon-trap shino",
    "tile_shino.jpg",
    "white orange grey",
    "Fat satin",
    "Cone 9–10",
    "Early reduction",
    "Japan · USA",
    "Soda-rich Shino can seal carbon beneath an early-forming melt.",
  ],
  [
    "Oribe green",
    "tile_oribe.jpg",
    "green",
    "Gloss",
    "Cone 6–10",
    "Oxidation",
    "Mino · Japan",
    "Copper green associated with Momoyama Oribe ware.",
  ],
  [
    "Sang-de-boeuf",
    "tile_copperred.jpg",
    "red crimson",
    "Gloss",
    "Cone 9–10",
    "Reduction",
    "China · France",
    "Copper forms colloidal ruby red under carefully timed reduction.",
  ],
  [
    "Alkaline turquoise",
    "tile_turquoise.jpg",
    "turquoise blue",
    "Gloss · crackle",
    "Cone 04–6",
    "Oxidation",
    "Egypt · West Asia",
    "Copper turns turquoise in sodium-rich alkaline glass.",
  ],
  [
    "Jun opalescent",
    "tile_chun.jpg",
    "blue violet",
    "Opalescent",
    "Cone 9–10",
    "Reduction",
    "Henan · China",
    "Phase separation scatters blue light through a milky glaze.",
  ],
  [
    "Floating blue",
    "tile_floatingblue.jpg",
    "blue brown",
    "Variegated gloss",
    "Cone 5–6",
    "Oxidation",
    "Modern studio",
    "Boron and rutile reveal blue over warm breaks through thickness and cooling.",
  ],
  [
    "Ash rivulets",
    "tile_ash.jpg",
    "green amber",
    "Runny gloss",
    "Cone 8–12",
    "Wood / reduction",
    "Global",
    "Plant ash melts with clay and feldspar into glassy rivulets.",
  ],
  [
    "Nuka white",
    "tile_nuka.jpg",
    "white cream",
    "Opaque satin",
    "Cone 9–12",
    "Reduction",
    "Japan · Korea",
    "Rice-straw-ash lineage valued for soft opaque white.",
  ],
  [
    "Zinc crystalline",
    "tile_crystalline.jpg",
    "blue crystalline",
    "Macrocrystalline",
    "Cone 6–10",
    "Oxidation",
    "European studio",
    "Willemite crystals grow during a programmed cooling hold.",
  ],
  [
    "Yohen halos",
    "tile_yohen.jpg",
    "black blue violet",
    "Iridescent spots",
    "Cone 12+",
    "Complex",
    "Jian · China",
    "Exceptionally rare Jian surfaces whose full historical mechanism remains unresolved.",
  ],
  [
    "Metallic raku",
    "tile_manganese.jpg",
    "copper bronze",
    "Metallic",
    "Cone 06–04",
    "Post-fire reduction",
    "Western raku",
    "Reduced metal films flash copper, bronze and violet.",
  ],
  [
    "Volcanic crater",
    "tile_crater.jpg",
    "black grey",
    "Cratered",
    "Cone 04–6",
    "Oxidation",
    "Modern studio",
    "Gas generation inside a stiff melt freezes sculptural craters.",
  ],
  [
    "Lichen crawl",
    "tile_lichen.jpg",
    "white black",
    "Crawled",
    "Cone 04–6",
    "Oxidation",
    "Modern studio",
    "High drying shrinkage breaks glaze into islands.",
  ],
  [
    "Wood-fired flash",
    "tile_woodfired.jpg",
    "orange brown",
    "Flashed · ash",
    "Cone 10–13",
    "Wood",
    "Anagama",
    "Flame, ember, ash and kiln position become the glaze.",
  ],
  [
    "Salt orange peel",
    "tile_saltglaze.jpg",
    "orange brown",
    "Orange peel",
    "Cone 8–12",
    "Vapour",
    "Germany · Britain",
    "Salt vapour reacts with clay silica to form pebbled glass.",
  ],
  [
    "Raku crackle",
    "tile_raku.jpg",
    "white black",
    "Crackle",
    "Cone 06–04",
    "Post-fire reduction",
    "Japan · West",
    "Smoke marks a deliberate crack network.",
  ],
  [
    "Obvara",
    "tile_obvara.jpg",
    "brown black",
    "Scald pattern",
    "≈900°C",
    "Post-fire process",
    "Baltic",
    "Hot ware meets fermented flour and records an organic pattern.",
  ],
  [
    "Cobalt gloss",
    "tile_cobalt.png",
    "blue",
    "Gloss",
    "Broad range",
    "Oxidation / reduction",
    "Global",
    "Powerful cobalt blue survives across many glaze chemistries.",
  ],
  [
    "Peach bloom",
    "tile_chrometin.jpg",
    "pink red",
    "Mottled gloss",
    "Cone 9–10",
    "Reduction",
    "Qing China",
    "Copper-red subtype with pink, moss-green and red transitions.",
  ],
  [
    "Iridescent iron rust",
    "tile_saiyu.jpg",
    "red gold violet",
    "Iridescent",
    "High fire",
    "Controlled cooling",
    "China · studio",
    "Thin iron-rich crystals create optical red, gold and violet.",
  ],
].map((x, i) => ({
  id: "family-" + i,
  name: x[0],
  image: "assets/glazes/" + x[1],
  color: x[2],
  surface: x[3],
  cone: x[4],
  atmosphere: x[5],
  origin: x[6],
  history: x[7],
  kind: "family",
}));
const familyDetails = {
  "Crackled celadon": [
    "Look for a translucent grey-green to blue-green glass that pools darker in carving; crackle may be broad or fine.",
    "A small iron addition colours a feldspathic glaze. Body colour, reduction, cooling and glaze thickness determine whether it reads grey, green or blue.",
    "Test over white and iron-bearing stoneware, across a carved ridge and hollow. Record reduction timing and cooling.",
    "Chinese Ceramics · The History of Chinese Ceramics · Colour in Glazes",
  ],
  "Tenmoku black": [
    "A deep brown-black gloss, usually warmer and thinner at rims and high points.",
    "High iron dissolves in the melt; thickness, atmosphere and cooling decide whether it stays black or grows rust and metallic crystals.",
    "Use a vertical tile with a catch basin. Compare fast and slow cooling before changing the recipe.",
    "Chinese Ceramics · Hamer · Colour in Glazes",
  ],
  "Hare’s fur": [
    "Fine amber, rust or silver streaks travel downward through a dark glaze.",
    "Gas bubbles and iron-rich material migrate through a fluid, iron-saturated melt before crystallising in trails.",
    "Test vertically and photograph the direction of flow. Thickness and cooling are essential variables.",
    "The History of Chinese Ceramics · Chinese Ceramics · Hamer",
  ],
  "Oil spot · yuteki": [
    "Round silver, bronze or rust spots sit on black, often with a halo or iridescent centre.",
    "Iron-rich bubbles reach the surface and burst; iron oxide concentrates at their edges and crystallises as the glaze heals.",
    "Give the glaze room to bubble and heal. Test peak soak and cooling separately, and protect the kiln shelf.",
    "The History of Chinese Ceramics · Colour in Glazes · Hamer",
  ],
  "Kaki · persimmon": [
    "Rust-red, orange or persimmon crystals form over a darker iron-rich ground.",
    "Iron saturation plus suitable alumina, silica and cooling encourages hematite-rich surface crystals.",
    "Compare a straight cool with a controlled slow cool. A dark body and a light body can produce very different readings.",
    "Colour in Glazes · Hamer",
  ],
  "Tea dust": [
    "Very fine yellow-green or olive crystals scatter evenly through a dark brown ground.",
    "A high-iron glaze precipitates minute crystals during cooling; magnesium and the cooling path often influence the character.",
    "Make identical tiles and change only the cooling schedule. Examine with a loupe, not just across the room.",
    "The History of Chinese Ceramics · Colour in Glazes",
  ],
  "Carbon-trap shino": [
    "Cream, orange and smoky grey-black areas share a thick, satin-to-gloss feldspathic surface.",
    "Soda-rich glaze can begin sealing early enough to trap carbon introduced by reduction; iron in body and glaze supplies warm fire colour.",
    "Use the same clay, application and early-reduction schedule across a tile set. Carbon trapping is highly kiln-specific.",
    "Hamer · Mastering Kilns and Firing · Colour in Glazes",
  ],
  "Oribe green": [
    "A saturated copper green, often transparent over texture and historically paired with iron drawing.",
    "Copper colours an alkaline glaze green in oxidation; thickness and body iron can push it toward turquoise, bottle green or black.",
    "Test thin, medium and thick over white slip and bare body. Keep it from food surfaces unless the specific glaze passes durability tests.",
    "The History of Chinese Ceramics · Colour in Glazes · Hamer",
  ],
  "Sang-de-boeuf": [
    "Ruby, crimson and oxblood move through cloudy lavender, clear or greenish passages.",
    "A minute copper addition forms red metallic or colloidal particles under reduction, then survives a carefully managed cooling and reoxidation balance.",
    "Use a dedicated firing log. Compare body, thickness, reduction onset and reoxidation; change one at a time.",
    "The History of Chinese Ceramics · Colour in Glazes · Hamer",
  ],
  "Alkaline turquoise": [
    "Bright turquoise to blue-green glass, frequently transparent and finely crackled.",
    "Copper in a sodium-rich alkaline glaze shifts toward turquoise; low alumina can make the colour brilliant but also soluble or crazed.",
    "Treat historical alkaline colour as a family, not a food-safe promise. Test fit and leaching before any functional use.",
    "Hamer · Colour in Glazes · Global Clay",
  ],
  "Jun opalescent": [
    "A milky sky-blue or blue-violet surface with depth that seems suspended inside the glaze.",
    "Liquid–liquid phase separation creates droplets that scatter blue light; iron, phosphorus, atmosphere and thickness modify the effect.",
    "Apply across relief so thin and pooled zones are visible. Compare cooling schedules without assuming cobalt makes the blue.",
    "The History of Chinese Ceramics · Chinese Ceramics · Hamer",
  ],
  "Floating blue": [
    "Blue breaks through tan, cream and brown, often strongly dependent on thickness and texture.",
    "Rutile or titanium, iron, cobalt and a boron-bearing base interact; slow cooling can increase mottling or crystal development.",
    "Use a staircase tile with three thicknesses and a textured edge. Keep the firing schedule with the recipe.",
    "Amazing Glaze · Colour in Glazes · Cone 5–6 Glazes",
  ],
  "Ash rivulets": [
    "Glossy green, olive, amber or clear rivers collect on shoulders and carved channels.",
    "Plant ash supplies calcium, potassium and other fluxes; natural ash deposited by flame can combine directly with the clay surface.",
    "Wash and sieve ash according to the source method. Use tall tests, generous shelf protection and location notes.",
    "Ash Glazes · Hamer · Mastering Kilns and Firing",
  ],
  "Nuka white": [
    "A soft opaque white to warm cream, sometimes breaking translucent on edges.",
    "Silica-rich plant ash—traditionally rice-straw ash—combines with feldspar and clay; phosphorus and fine bubbles can contribute opacity.",
    "Test ash source and preparation as named variables. Avoid treating every white ash glaze as historically interchangeable.",
    "Ash Glazes · Colour in Glazes · Hamer",
  ],
  "Zinc crystalline": [
    "Large, visible flower, fan or star-shaped crystals float in a glossy ground.",
    "Zinc and silica form willemite crystals during a controlled cooling plateau; low alumina keeps the melt mobile enough for growth.",
    "Use a catch basin, accurate controller and dedicated schedule. These fluid, specialised surfaces need separate functional-safety evaluation.",
    "Colour in Glazes · Hamer · Mastering Kilns and Firing",
  ],
  "Yohen halos": [
    "Blue, violet and iridescent halos appear around spots on a dark Jian-type bowl.",
    "The rare historical effect is linked to complex iron crystallisation, phase separation and firing conditions; no simple studio recipe equals the surviving originals.",
    "Study museum objects as history, not as a guaranteed recipe target. Record any experiment without claiming historical equivalence.",
    "The History of Chinese Ceramics · Precious beyond Measure",
  ],
  "Metallic raku": [
    "Copper, bronze, blue and violet metallic films flash over a dark or crackled ground.",
    "Hot ware enters a reducing container; oxygen-starved metal oxides form thin metallic films. Reoxidation begins immediately where air reaches them.",
    "Wear appropriate heat protection and work only in a suitable outdoor procedure. Raku ware is porous and decorative, not food ware.",
    "Hamer · Mastering Kilns and Firing",
  ],
  "Volcanic crater": [
    "Open pits, frozen bubbles and rough crater rims create a lava-like surface.",
    "Gas is deliberately generated in a melt stiff enough to hold the burst bubbles instead of healing smooth.",
    "Separate intentional crater glaze from accidental pinholing. Test gas-former level, thickness and peak soak on protected shelves.",
    "Hamer · Colour in Glazes",
  ],
  "Lichen crawl": [
    "Distinct islands of glaze expose the clay between them, like lichen or dried mud.",
    "Extreme raw-glaze shrinkage and poor adhesion break the coating apart; high surface tension keeps the islands separated when molten.",
    "Use only where sharp edges and exposed body are appropriate. Test application thickness and adhesion before altering firing.",
    "Hamer · Colour in Glazes",
  ],
  "Wood-fired flash": [
    "Orange, peach, charcoal and ash-glass passages record the path of flame and embers.",
    "Flame chemistry, volatile salts, deposited ash, body iron and kiln position react over long high-temperature firing.",
    "Map every piece and test tile to its kiln position. In wood firing, placement is part of the recipe.",
    "Mastering Kilns and Firing · Ash Glazes · Global Clay",
  ],
  "Salt orange peel": [
    "A glossy or satin pebbled skin resembles orange peel, often strongest on the flame side.",
    "Introduced sodium vapour reacts with silica and alumina in the clay surface to build a glaze in place.",
    "Salt firing requires a kiln designed for corrosive vapour and appropriate environmental controls. Do not improvise it in a shared electric kiln.",
    "Hamer · Mastering Kilns and Firing",
  ],
  "Raku crackle": [
    "A pale glaze is crossed by a dark smoke-filled crack network.",
    "Rapid cooling opens cracks; smoke from post-fire reduction penetrates the crazing and unglazed clay.",
    "Treat the crackle as decorative evidence of process. The porous body and intentionally crazed glaze are not for food or drink.",
    "Hamer · Mastering Kilns and Firing",
  ],
  Obvara: [
    "Cream, brown and black scald marks spread organically across an unglazed or lightly coated surface.",
    "A red-hot pot is plunged into a fermented flour mixture, then cooled; the organic liquid scorches on contact.",
    "Use an established outdoor safety procedure. Record clay, surface temperature, dip time and mixture age.",
    "Global Clay · contemporary Baltic practice",
  ],
  "Cobalt gloss": [
    "Intense blue remains visible in very small additions and may pool darker where glaze is thick.",
    "Cobalt is a powerful colorant across many bases; magnesium can push it toward purple and zinc or titanium can change its response.",
    "Run a line blend in tenths of a percent. More cobalt is rarely the most informative next step.",
    "Colour in Glazes · Hamer",
  ],
  "Peach bloom": [
    "Blush pink, red, moss green and pale passages bloom through a copper-red glaze.",
    "Copper reduction and later reoxidation vary across a deliberately sensitive glaze; thickness and cooling create the mottled transitions.",
    "Use repeated tiles and an exact firing record. The effect is a copper-red subtype, not a stable single colour chip.",
    "The History of Chinese Ceramics · Colour in Glazes",
  ],
  "Iridescent iron rust": [
    "Red, gold and violet shift with viewing angle across a thin iron-rich crystalline surface.",
    "Very thin iron-oxide crystals interfere with light; cooling and oxidation determine whether the surface develops colour or stays brown.",
    "Compare direct and controlled cooling on identical tiles and inspect under several light sources.",
    "Colour in Glazes · Hamer",
  ],
};
const familySources = {
  "Crackled celadon":
    "https://commons.wikimedia.org/wiki/File:Korea,_Goryeo_period_-_Crackle-glazed_Bowl_-_1921.626_-_Cleveland_Museum_of_Art.tif",
  "Tenmoku black":
    "https://commons.wikimedia.org/wiki/File:Tea_bowl_with_hare%27s_fur_glaze,_Jian_ware,_Fujian_province,_China,_Southern_Song_dynasty,_1100s-1200s_AD,_stoneware,_black-brown_glaze_-_Portland_Art_Museum_-_Portland,_Oregon_-_DSC08459.jpg",
  "Hare’s fur":
    "https://commons.wikimedia.org/wiki/File:Hare%27s_fur_Tea_bowl_Song_Dynasty_Mus%C3%A9e_Mariemont_08112015_1.jpg",
  "Oil spot · yuteki":
    "https://commons.wikimedia.org/wiki/File:TEA_BOWL_(Yuteki_Tenmoku)_(3).jpg",
  "Kaki · persimmon":
    "https://www.derekau.net/blog/2015/01/11/kaki-persimmon-tomato-glaze",
  "Tea dust":
    "https://commons.wikimedia.org/wiki/File:Six_conjoined_vases_in_tea-dust_glaze.jpg",
  "Carbon-trap shino":
    "https://commons.wikimedia.org/wiki/File:Tea_Bowl_known_as_%27Furisode%27,_Mino_ware,_Shino_type,_Azuchi-Momoyama_to_Edo_period,_16th-17th_century_-_Tokyo_National_Museum_-_DSC05893.JPG",
  "Oribe green": "https://commons.wikimedia.org/wiki/File:ORIBE_DISH.JPG",
  "Sang-de-boeuf":
    "https://commons.wikimedia.org/wiki/File:Baluster_vase,_China,_Qing_dynasty,_1800s_AD,_porcelain_with_copper-red_(langyao)_glaze_-_Portland_Art_Museum_-_Portland,_Oregon_-_DSC08420.jpg",
  "Alkaline turquoise":
    "https://commons.wikimedia.org/wiki/File:Pitcher_with_applied_turquoise_dots,_Iran,_12th_century_AD,_blue_glaze_pottery_-_Matsuoka_Museum_of_Art_-_Tokyo,_Japan_-_DSC07239.JPG",
  "Jun opalescent":
    "https://commons.wikimedia.org/wiki/File:Jin_Jun_ware_dish_with_splashed_glazes.jpg",
  "Floating blue":
    "https://www.oldforgecreations.co.uk/blog/understanding-floating-blues",
  "Ash rivulets":
    "https://commons.wikimedia.org/wiki/File:Tea_bowl,_Korea,_Joseon_dynasty,_15th_century_AD,_Muji-hakeme_type,_stoneware_with_engobe_and_translucent_ash_glaze_-_Ethnological_Museum,_Berlin_-_DSC02057.JPG",
  "Nuka white":
    "https://commons.wikimedia.org/wiki/File:Sake_Bottle_(tokkuri)_LACMA_M.2008.264.1a-b.jpg",
  "Zinc crystalline":
    "https://www.potteryboys.com/video-blog/acid-etching-pushing-the-contrast-and-color",
  "Yohen halos":
    "https://commons.wikimedia.org/wiki/File:YOUHEN_TENMOKU_bowl_FUJITA.JPG",
  "Metallic raku":
    "https://commons.wikimedia.org/wiki/File:Copper_Matte_raku_bowl_with_lid_by_Dan_Leonette,_Gotland,_Sweden_3.jpg",
  "Volcanic crater": "https://glazy.org/recipes/4454",
  "Lichen crawl":
    "https://commons.wikimedia.org/wiki/File:Glaz_Crawling_Defect.jpg",
  "Wood-fired flash":
    "https://commons.wikimedia.org/wiki/File:Flower_Vase_called_%27Tabimakura%27_(Portable_pillow),_Bizen_ware,_Edo_period,_17th_century_-_Tokyo_National_Museum_-_DSC05874.JPG",
  "Salt orange peel":
    "https://commons.wikimedia.org/wiki/File:Post_Medieval,_Salt_glazed_Stoneware_Bellamine_Jug_vessel_sherd_(FindID_281602).jpg",
  "Raku crackle":
    "https://www.hot-clay.com/products/vitraglaze-raku-glaze-transparent",
  Obvara:
    "https://commons.wikimedia.org/wiki/File:Raku_Obvara_fired_Tsuri_vases_from_RAAQUU_Malaysia.jpg",
  "Cobalt gloss":
    "https://commons.wikimedia.org/wiki/File:%E9%9C%BD%E9%9D%92%E8%B1%A1%E8%80%B3%E5%95%A3%E7%92%B0%E7%90%AE%E5%BC%8F%E7%93%B6.png",
  "Peach bloom":
    "https://commons.wikimedia.org/wiki/File:Chinese_-_%22Three-String%22_Vase_(%22The_Peach_Bloom_Vase%22)_-_Walters_49155_-_Profile.jpg",
  "Iridescent iron rust":
    "https://commons.wikimedia.org/wiki/File:Chinese_-_Iridescent_Iron-Rust_Vase_-_Walters_492063_-_Front_View_B.jpg",
};
const familyPresentation = {
  "Crackled celadon": { zoom: 2.15, position: "50% 58%" },
  "Tenmoku black": { zoom: 1.65, position: "50% 45%" },
  "Hare’s fur": { zoom: 2.05, position: "55% 48%" },
  "Oil spot · yuteki": { zoom: 2.65, position: "50% 43%" },
  "Kaki · persimmon": { zoom: 1.55, position: "48% 44%" },
  "Tea dust": { zoom: 2.15, position: "55% 54%" },
  "Carbon-trap shino": { zoom: 1.75, position: "50% 50%" },
  "Oribe green": { zoom: 1.42, position: "50% 48%" },
  "Sang-de-boeuf": {
    zoom: 2.15,
    position: "50% 45%",
    concept: "copper-reduction",
  },
  "Alkaline turquoise": { zoom: 2.05, position: "55% 44%" },
  "Jun opalescent": { zoom: 2.3, position: "47% 55%" },
  "Floating blue": { zoom: 1.55, position: "44% 47%" },
  "Ash rivulets": { zoom: 1.42, position: "50% 48%" },
  "Nuka white": { zoom: 2.1, position: "50% 48%" },
  "Zinc crystalline": { zoom: 1.55, position: "50% 45%" },
  "Yohen halos": { zoom: 1.55, position: "50% 50%" },
  "Metallic raku": { zoom: 1.48, position: "50% 55%" },
  "Volcanic crater": { zoom: 1.28, position: "50% 50%" },
  "Lichen crawl": { zoom: 1.35, position: "50% 50%" },
  "Wood-fired flash": { zoom: 2.15, position: "50% 48%" },
  "Salt orange peel": { zoom: 2.35, position: "82% 48%" },
  "Raku crackle": { zoom: 1.45, position: "50% 50%" },
  Obvara: { zoom: 4.2, position: "50% 88%" },
  "Cobalt gloss": { zoom: 2, position: "50% 54%" },
  "Peach bloom": {
    zoom: 2.55,
    position: "50% 57%",
    objectFit: "contain",
    concept: "copper-reduction",
  },
  "Iridescent iron rust": { zoom: 2.05, position: "50% 48%" },
};
const familyVisualOverrides = {
  "Tenmoku black": {
    imageCredit:
      "Jian-family tea bowl with a dark iron glaze · Portland Art Museum",
  },
  "Oribe green": {
    image: "assets/recipes/oribe.jpg",
    imageCredit:
      "Modern fired Oribe test · Gabriel Kline, Amazing Glaze · recipe p. 262 · photograph p. 263",
  },
  "Ash rivulets": {
    image: "assets/recipes/van-guilder-blue-ash.jpg",
    color: "Grey · blue",
    imageCredit:
      "Modern fired Van Guilder Blue Ash test · Gabriel Kline, Amazing Glaze · recipe p. 113 · photograph p. 114",
  },
  "Yohen halos": {
    image: "assets/glazes/tile_yohen_colour.jpg",
    color: "Black · blue · green",
    imageCredit:
      "Yōhen Tenmoku bowl · Fujita Museum · Southern Song, 13th century · public-domain photograph",
  },
  "Metallic raku": {
    image: "assets/recipes/raku-love.jpg",
    color: "Turquoise · copper · bronze",
    imageCredit:
      "Modern fired Raku Love test showing turquoise oxidation and brass reduction · Gabriel Kline, Amazing Glaze · recipe p. 429 · photograph p. 430",
  },
  "Volcanic crater": {
    image: "assets/glazes/tile_crater_glazy.png",
    color: "Grey · white · brown",
    imageCredit: "Akiko’s crater glaze #4454 · Kenneth Ibbett · Glazy",
  },
  "Lichen crawl": {
    image: "assets/recipes/fs-lichen-crawl.jpg",
    imageCredit:
      "Fired Lichen Crawl laboratory test · Gabriel Kline and Bill Collins, Amazing Glaze Food-Safe Recipes · p. 119",
  },
  "Nuka white": {
    imageCredit:
      "Historic Japanese ash-glazed bottle · used here as a white-ash recognition reference, not proof of one Nuka formula",
  },
  "Zinc crystalline": {
    imageCredit: "Fired zinc-crystalline glaze · Pottery Boys Clay Studios",
  },
  "Raku crackle": {
    imageCredit: "Fired commercial raku-crackle example · Hot Clay",
  },
  "Iridescent iron rust": {
    color: "Smoky grey · iron red",
    imageCredit: "Iridescent iron-rust vase · Walters Art Museum",
  },
};
families.forEach((f) => {
  const d = familyDetails[f.name] || [];
  Object.assign(
    f,
    familyPresentation[f.name] || {},
    familyVisualOverrides[f.name] || {},
  );
  f.hoverZoom = (f.zoom || 1.08) + 0.14;
  f.recognition = d[0];
  f.mechanism = d[1];
  f.practice = d[2];
  f.reading = d[3];
  f.sourceUrl = familySources[f.name];
});
const tenmokuFamily = families.find((f) => f.name === "Tenmoku black");
Object.assign(tenmokuFamily, {
  name: "Tenmoku / Jian lineage",
  history:
    "A broad dark iron-glaze lineage rather than one flat black colour. The pictured Jian-family bowl shows the iron activity from which hare’s-fur, oil-spot, kaki and tea-dust branches are studied separately.",
});
const nukaFamily = families.find((f) => f.name === "Nuka white");
Object.assign(nukaFamily, {
  name: "White ash · Nuka lineage",
  history:
    "A white-ash study corridor. Nuka commonly refers to Japanese rice-straw-ash glazes, but the pictured historic ash-glazed bottle is presented as visual context—not as proof of one universal Nuka recipe.",
});
const shinoFamily = families.find((f) => f.name === "Carbon-trap shino");
Object.assign(shinoFamily, {
  name: "Historic Shino · Furisode bowl",
  surface: "Feldspathic white · iron fire colour",
  atmosphere: "Wood firing",
  origin: "Mino · Japan · 16th–17th century",
  history:
    "The photograph is the historic Furisode Shino tea bowl. It teaches Japanese Shino’s feldspathic white and iron fire colour; it is not evidence of later American carbon trapping.",
  recognition:
    "A thick feldspathic white lies over a warm, iron-bearing body; fire colour and small exposed passages animate the irregular tea-bowl form.",
  mechanism:
    "Historic Japanese Shino depends on feldspathic glaze, iron-bearing decoration or body, application, long wood firing and the Mino kiln tradition. Carbon-trap Shino is a later American development and is not what this photograph proves.",
  practice:
    "Use this object to learn recognition and lineage. For studio testing, separate feldspathic Shino, American carbon-trap recipes and firing schedules instead of treating them as one glaze.",
});
const peachBloom = families.find((f) => f.name === "Peach bloom");
Object.assign(peachBloom, {
  name: "Peach bloom · 豇豆红",
  image: "assets/glazes/tile_peachbloom_met.jpg",
  color: "pink red moss green",
  surface: "Mottled translucent gloss",
  cone: "Cone 9–10 reconstruction",
  atmosphere: "Copper reduction",
  origin: "Jingdezhen · Kangxi reign · 1662–1722",
  history:
    "A technically difficult imperial copper-red glaze made for only a brief period of the Kangxi reign and on a limited repertory of small forms. The pictured Met water pot dates to 1662–1722.",
  recognition:
    "Do not look for one flat pink. Peach-bloom moves through dusty rose, pale blush, deeper copper red and moss-green flecks or clouds beneath a translucent gloss—like colour developing across ripening peach skin.",
  mechanism:
    "A copper-bearing pigment or glaze is enclosed by clear glaze and fired in a carefully managed reducing atmosphere. Finely dispersed copper produces the red; local copper enrichment and reoxidation help create green passages. Thickness, reduction timing, peak heatwork and cooling make the surface deliberately variable.",
  practice:
    "Begin with 100 g vertical tests on porcelain and a catch tile. Record copper amount, tin, application sequence, reduction onset and cooling as separate variables. A successful modern test is a reconstruction, not proof that the Kangxi workshop formula has been recovered.",
  reading:
    "The History of Chinese Ceramics · Colour in Glazes · British Museum · Met Museum · John Britt experiments",
  sourceUrl: "https://www.metmuseum.org/art/collection/search/460689",
  aliases: "Peach bloom · jiangdou hong · cowpea-red",
  date: "Kangxi reign · 1662–1722",
  rarity: "Brief production · limited small forms",
  objectRecord: "Met water pot · 1975.1.1690",
  historySources: [
    [
      "Met Museum object record",
      "https://www.metmuseum.org/art/collection/search/460689",
    ],
    [
      "British Museum peach-bloom water pot",
      "https://www.britishmuseum.org/collection/object/A_PDF-580",
    ],
    [
      "John Britt · Experiments in Peach Bloom",
      "https://ceramicartsnetwork.org/ceramic-recipes/recipe/Experiments-in-Peach-Bloom",
    ],
  ],
  reconstruction: {
    name: "Copper Red Peach Bloom · archival studio formula",
    cone: "9–10",
    atmosphere: "Reduction",
    ingredients: [
      { material: "Godfrey feldspar", amount: 77.8 },
      { material: "Colemanite", amount: 10.6 },
      { material: "Whiting", amount: 11.6 },
    ],
    additions: [
      { material: "Copper oxide", amount: 0.3 },
      { material: "Tin oxide", amount: 1 },
    ],
    status:
      "Published archival formula · not the original Kangxi formula · unverified in Eleonora’s kiln",
    notes:
      "Mix only as a 100 g research test. Godfrey feldspar and Colemanite are legacy materials and must not be replaced one-for-one without recalculation. Fire on porcelain with a vertical catch tile. Do not assume food safety; copper-red durability and glaze fit require testing.",
    source: "Linda Arbuckle · High Fire Glaze Recipes",
    sourceUrl:
      "https://www.lindaarbuckle.com/handouts/highfire-glaze-recipes.htm",
  },
});
const recipes = [
  ...(window.GLAZY_RECIPES || []),
  ...(window.GLAZY_IMPORTED_RECIPES || []),
  ...RECIPES,
  ...(window.BOOK_RECIPES || []),
].map((r) => ({
  ...r,
  kind: "recipe",
  origin: r.author,
  history:
    r.history ||
    `Published in ${r.source} by ${r.author}, page ${r.page}. The cathedral preserves the named source and does not invent an earlier attribution.`,
}));
function readStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
const collection = [...recipes, ...families];
let activeKind = "all",
  activeHue = "all",
  activeView = "mosaic",
  selected = null,
  saved = readStoredArray("eleonora-saved");
const $ = (s) => document.querySelector(s),
  all = (s) => [...document.querySelectorAll(s)];
const assetVersion = "20260831-pastel-m3-rebuild";
const imageSrc = (src) => (src ? `${src}?v=${assetVersion}` : "");
const hueDefinitions = [
  {
    key: "all",
    label: "All colours",
    color: "conic-gradient(#934047,#c9a45c,#4f745a,#416c86,#715270,#934047)",
  },
  {
    key: "red",
    label: "Red & pink",
    color: "#934047",
    pattern:
      /\b(red|pink|rose|blush|cranberry|peach|maroon|magenta|oxblood|sang-de-boeuf)\b/i,
  },
  {
    key: "earth",
    label: "Earth & orange",
    color: "#996445",
    pattern:
      /\b(orange|amber|brown|gold|bronze|rust|tan|buff|apricot|copper|ochre|oatmeal|persimmon|brass)\b/i,
  },
  {
    key: "yellow",
    label: "Yellow & ivory",
    color: "#d1ae58",
    pattern: /\b(yellow|cream|ivory|canary|sunshine|chartreuse|straw)\b/i,
  },
  {
    key: "green",
    label: "Green",
    color: "#53755b",
    pattern:
      /\b(green|celadon|jade|mint|oribe|chartreuse|olive|moss|spearmint)\b/i,
  },
  {
    key: "blue",
    label: "Blue & teal",
    color: "#416d85",
    pattern: /\b(blue|aqua|turquoise|teal|cobalt|celadon)\b/i,
  },
  {
    key: "violet",
    label: "Violet",
    color: "#705273",
    pattern: /\b(purple|violet|mulberry|lilac|plum|maroon)\b/i,
  },
  {
    key: "dark",
    label: "Black & grey",
    color: "#292829",
    pattern: /\b(black|grey|gray|charcoal)\b/i,
  },
  {
    key: "light",
    label: "White & clear",
    color: "#ddd7c8",
    pattern:
      /\b(white|clear|transparent|translucent|cream|ivory|opal|off[- ]?white)\b/i,
  },
];
function huesFor(value) {
  const searchable =
    typeof value === "string"
      ? value
      : `${value.color || ""} ${value.name || ""}`;
  return hueDefinitions
    .filter((h) => h.pattern?.test(searchable))
    .map((h) => h.key);
}
const escapeHtml = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const coneLabel = (value) => {
  const raw = String(value ?? "Not specified").trim();
  return raw.replace(/^cone\s*/i, "") || "Not specified";
};
const atlasFocus = (value) =>
  /^\d+(?:\.\d+)?%\s+\d+(?:\.\d+)?%$/.test(String(value || ""))
    ? String(value)
    : "50% 50%";
$("#roomGrid").innerHTML = rooms
  .map(
    (r, i) =>
      `<a href="#${r[0]}"><small>${String(i + 1).padStart(2, "0")}</small><h3>${r[1]}</h3><p>${["Browse real fired surfaces by colour and behaviour.", "Weighable formulas with exact sources.", "Atmosphere, heatwork and cooling.", "Clay, oxides, minerals and substitutions.", "Diagnose defects and choose the next test.", "People, kilns, places and traditions.", "Save favourites and plan tests.", "The attached books and their citations."][i]}</p></a>`,
  )
  .join("");
$("#roomMenu").innerHTML = rooms
  .map((r) => `<a href="#${r[0]}">${r[1]}</a>`)
  .join("");
$("#roomsButton").onclick = () => {
  const open = $("#roomMenu").classList.toggle("open");
  $("#roomsButton").setAttribute("aria-expanded", String(open));
};
all("#roomMenu a").forEach(
  (a) =>
    (a.onclick = () => {
      $("#roomMenu").classList.remove("open");
      $("#roomsButton").setAttribute("aria-expanded", "false");
    }),
);
document.addEventListener("pointerdown", (e) => {
  if (!$("#roomMenu").classList.contains("open")) return;
  if (!e.target.closest("#roomMenu") && !e.target.closest("#roomsButton")) {
    $("#roomMenu").classList.remove("open");
    $("#roomsButton").setAttribute("aria-expanded", "false");
  }
});
$("#window").innerHTML = families
  .slice(0, 9)
  .map((x) => `<img src="${imageSrc(x.image)}" alt="">`)
  .join("");
$("#hues").innerHTML = hueDefinitions
  .map(
    (h, i) =>
      `<button data-hue="${h.key}" class="${i ? "" : "on"}" aria-pressed="${i === 0}" title="${h.label}"><i style="background:${h.color}"></i><span>${h.label}</span></button>`,
  )
  .join("");
function tile(x) {
  const label = x.kind === "recipe" ? "RECIPE" : "HISTORIC FAMILY";
  const focus = atlasFocus(
    { "glazy-27852": "50% 63%", "glazy-844452": "37% 28%" }[x.id] || x.position,
  );
  const [fx, fy] = focus.split(" ").map(parseFloat);
  const firing = coneLabel(x.cone);
  const firingLabel = /^\d/.test(firing) ? `Cone ${firing}` : firing;
  return `<button class="tile" data-id="${x.id}" aria-label="Open ${escapeHtml(x.name)}"><span class="image">${x.image ? `<span class="cone-surface"><img loading="lazy" decoding="async" src="${imageSrc(x.image)}" alt="Digital cone visualisation of ${escapeHtml(x.name)}, based on a cropped source photograph" style="--cone-left:${50 - fx * 4}%;--cone-top:${50 - fy * 4}%"></span><span class="cone-caption">Digital cone preview</span>` : `<span class="no-photo">Photograph not supplied</span>`}</span><span class="tile-copy"><small>${label}<span class="firing-label">${escapeHtml(firingLabel)}</span></small><strong>${escapeHtml(x.name)}</strong><i>${escapeHtml(x.color)} · ${escapeHtml(x.surface)}</i><span class="tile-source">${escapeHtml(x.source || x.origin)}</span></span></button>`;
}
let atlasLimit = 30;
function render(expand = false) {
  if (expand !== true) atlasLimit = 30;
  let q = $("#search").value.toLowerCase();
  let list = collection.filter(
    (x) =>
      (activeKind === "all" || x.kind === activeKind) &&
      (activeHue === "all" || huesFor(x).includes(activeHue)) &&
      ($("#photoFilter").value === "all" || x.image) &&
      JSON.stringify(x).toLowerCase().includes(q) &&
      (!$("#coneFilter").value || String(x.cone) === $("#coneFilter").value) &&
      (!$("#sourceFilter").value ||
        (x.source || x.origin) === $("#sourceFilter").value),
  );
  const order = $("#sortFilter").value;
  const rank = (x) => {
    const h = huesFor(x)[0];
    return h ? hueDefinitions.findIndex((v) => v.key === h) : 99;
  };
  list.sort((a, b) =>
    order === "name"
      ? a.name.localeCompare(b.name)
      : order === "source"
        ? (a.source || a.origin).localeCompare(b.source || b.origin) ||
          a.name.localeCompare(b.name)
        : rank(a) - rank(b) || a.name.localeCompare(b.name),
  );
  const matchedCount = list.length;
  list = list.slice(0, atlasLimit);
  $("#atlasMore").hidden = atlasLimit >= matchedCount;
  $("#wall").classList.toggle("index-view", activeView === "index");
  $("#wall").innerHTML = !list.length
    ? `<div class="empty-corridor"><small>CATALOGUE GAP</small><h3>No records match “${escapeHtml($("#search").value || activeHue)}”.</h3><p>Try including text-only formulas, clearing the source or cone filter, or searching inside the books.</p></div>`
    : activeView === "mosaic"
      ? list.map(tile).join("")
      : list
          .map(
            (x, i) =>
              `<button class="index-row tile" data-id="${x.id}"><span>${String(i + 1).padStart(2, "0")}</span>${x.image ? `<img loading="lazy" src="${imageSrc(x.image)}" alt="Fired ceramic surface: ${x.name}">` : `<span class="no-photo">Formula</span>`}<strong>${x.name}</strong><i>${x.color}</i><i>${x.surface}</i><i>${x.cone}</i><i>${x.atmosphere}</i><small>${x.kind === "recipe" ? "OPEN RECIPE" : "OPEN HISTORY"}</small></button>`,
          )
          .join("");
  $("#resultCount").textContent =
    `${matchedCount} matching · showing ${list.length}`;
  all(".tile").forEach(
    (b) =>
      (b.onclick = () =>
        openBook(collection.find((x) => x.id === b.dataset.id))),
  );
}
for (const [id, values] of [
  ["coneFilter", collection.map((x) => String(x.cone))],
  ["sourceFilter", collection.map((x) => x.source || x.origin)],
]) {
  const el = document.getElementById(id);
  [...new Set(values)]
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .forEach((v) => el.add(new Option(v, v)));
  el.onchange = render;
}
$("#atlasMore").onclick = () => {
  atlasLimit += 30;
  render(true);
};
$("#sortFilter").onchange = render;
$("#photoFilter").onchange = render;
$("#totalCount").textContent = collection.length;
$("#search").oninput = render;
all("#kindTabs button").forEach(
  (b) =>
    (b.onclick = () => {
      activeKind = b.dataset.kind;
      all("#kindTabs button").forEach((x) => {
        const on = x === b;
        x.classList.toggle("on", on);
        x.setAttribute("aria-pressed", String(on));
      });
      render();
    }),
);
all("#hues button").forEach(
  (b) =>
    (b.onclick = () => {
      activeHue = b.dataset.hue;
      all("#hues button").forEach((x) => {
        x.classList.toggle("on", x === b);
        x.setAttribute("aria-pressed", String(x === b));
      });
      render();
    }),
);
all("#viewTabs button").forEach(
  (b) =>
    (b.onclick = () => {
      activeView = b.dataset.view;
      all("#viewTabs button").forEach((x) => {
        const on = x === b;
        x.classList.toggle("on", on);
        x.setAttribute("aria-pressed", String(on));
      });
      render();
    }),
);
const typeGroups = window.GLAZY_TYPE_GROUPS || [];
$("#typeGrid").innerHTML = typeGroups
  .map(
    (g) =>
      `<article class="type-card"><img src="${imageSrc(g.image)}" alt="One fired gallery-cover reference for ${g.name}"><div><small>GALLERY GUIDE · GLAZY PDF PP. ${g.pages}</small><h4>${g.name}</h4><p>${g.description}</p><span class="type-visual-note">Cover image only—each named subtype may look different.</span><nav>${g.types.map((t) => `<button data-type-query="${t}">${t}</button>`).join("")}</nav></div></article>`,
  )
  .join("");
all("[data-type-query]").forEach(
  (b) =>
    (b.onclick = () => {
      activeKind = "all";
      activeHue = "all";
      all("#kindTabs button").forEach((x) => {
        const on = x.dataset.kind === "all";
        x.classList.toggle("on", on);
        x.setAttribute("aria-pressed", String(on));
      });
      all("#hues button").forEach((x) => {
        const on = x.dataset.hue === "all";
        x.classList.toggle("on", on);
        x.setAttribute("aria-pressed", String(on));
      });
      $("#search").value = b.dataset.typeQuery;
      render();
      $("#atlas .filters").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }),
);
document.querySelector("#recipes .under").onclick = () => {
  $("#photoFilter").value = "all";
  activeKind = "recipe";
  activeHue = "all";
  $("#search").value = "";
  $("#sourceFilter").value = "";
  $("#coneFilter").value = "";
  all("#kindTabs button").forEach((b) => {
    const on = b.dataset.kind === "recipe";
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", String(on));
  });
  all("#hues button").forEach((b) => {
    const on = b.dataset.hue === "all";
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", String(on));
  });
  render();
};
let recipeLimit = 12;
function renderRecipeLibrary() {
  $("#recipeRail").innerHTML = recipes
    .slice(0, recipeLimit)
    .map(
      (x) =>
        `<button data-id="${x.id}">${x.image ? `<img loading="lazy" src="${imageSrc(x.image)}" alt="Fired test for ${escapeHtml(x.name)}">` : '<span class="no-photo">Source formula</span>'}<span><small>CONE ${escapeHtml(x.cone)} · ${escapeHtml(x.atmosphere)}</small><strong>${escapeHtml(x.name)}</strong></span></button>`,
    )
    .join("");
  $("#recipeCount").textContent =
    `Showing ${Math.min(recipeLimit, recipes.length)} of ${recipes.length} recipes`;
  $("#recipeMore").hidden = recipeLimit >= recipes.length;
}
$("#recipeRail").onclick = (event) => {
  const button = event.target.closest("[data-id]");
  if (button) openBook(recipes.find((x) => x.id === button.dataset.id));
};
$("#recipeMore").onclick = () => {
  recipeLimit += 12;
  renderRecipeLibrary();
};
renderRecipeLibrary();
$("#featuredGlazy").onclick = () =>
  openBook(recipes.find((x) => x.id === "glazy-27852"));
let layerPlans = readStoredArray("eleonora-layer-plans");
const layerRecipes = recipes.filter((r) => r.image);
const layerOptions = layerRecipes
  .map(
    (r) =>
      `<option value="${r.id}">${r.name} · cone ${r.cone} · ${r.atmosphere}</option>`,
  )
  .join("");
$("#layerA").innerHTML = layerOptions;
$("#layerB").innerHTML = layerOptions;
$("#layerA").value =
  layerRecipes.find((r) => /tenmoku gold/i.test(r.name))?.id ||
  layerRecipes[0].id;
$("#layerB").value =
  layerRecipes.find((r) => /isa.s bomb blue/i.test(r.name))?.id ||
  layerRecipes[1].id;
function layerCell(label, detail, images) {
  return `<div class="test-cell"><div class="layers ${images.length > 1 ? "two" : ""}">${images.map((src) => `<img src="${imageSrc(src)}" alt="">`).join("")}</div><span><b>${label}</b><small>${detail}</small></span></div>`;
}
function updateLayerLab() {
  const a = recipes.find((r) => r.id === $("#layerA").value),
    b = recipes.find((r) => r.id === $("#layerB").value);
  $("#layerAImage").src = imageSrc(a.image);
  $("#layerAImage").alt = `Fired test for ${a.name}`;
  $("#layerAName").textContent = a.name;
  $("#layerBImage").src = imageSrc(b.image);
  $("#layerBImage").alt = `Fired test for ${b.name}`;
  $("#layerBName").textContent = b.name;
  const sameCone = String(a.cone).trim() === String(b.cone).trim();
  const aAt = a.atmosphere.toLowerCase(),
    bAt = b.atmosphere.toLowerCase();
  const compatibleAtmos =
    aAt === bAt ||
    aAt.includes(bAt) ||
    bAt.includes(aAt) ||
    aAt.includes("see source") ||
    bAt.includes("see source");
  const box = $("#compatibility");
  box.classList.toggle("warn", !sameCone || !compatibleAtmos);
  box.innerHTML =
    sameCone && compatibleAtmos
      ? `<b>Useful first pairing</b><br>Both records point to cone ${a.cone} and compatible atmosphere notes. Their overlap still needs its own fit, flow and durability tests.`
      : `<b>Do not combine yet</b><br>These records do not clearly share cone and atmosphere. Choose a compatible pair or research a deliberate refire experiment first.`;
  const ta = $("#thicknessA").value,
    tb = $("#thicknessB").value;
  $("#testMatrix").innerHTML = [
    layerCell("Witness A", `${a.name} alone · ${ta}`, [a.image]),
    layerCell("Witness B", `${b.name} alone · ${tb}`, [b.image]),
    layerCell("A → B", `${a.name}, then ${b.name}`, [a.image, b.image]),
    layerCell("B → A", `${b.name}, then ${a.name}`, [b.image, a.image]),
    layerCell("Thickness test", `${a.name} thick · ${b.name} thin`, [
      a.image,
      b.image,
    ]),
    layerCell("Boundary test", "Half overlap · leave a clean edge", [
      a.image,
      b.image,
    ]),
  ].join("");
}
["layerA", "layerB", "thicknessA", "thicknessB", "layerMethod"].forEach(
  (id) => ($("#" + id).onchange = updateLayerLab),
);
$("#saveLayerPlan").onclick = () => {
  const a = recipes.find((r) => r.id === $("#layerA").value),
    b = recipes.find((r) => r.id === $("#layerB").value);
  layerPlans.unshift({
    id: String(Date.now()),
    a: a.id,
    b: b.id,
    aName: a.name,
    bName: b.name,
    thicknessA: $("#thicknessA").value,
    thicknessB: $("#thicknessB").value,
    method: $("#layerMethod").value,
    cone: a.cone,
    atmosphere: a.atmosphere,
  });
  layerPlans = layerPlans.slice(0, 24);
  localStorage.setItem("eleonora-layer-plans", JSON.stringify(layerPlans));
  renderLayerPlans();
  $("#saveLayerPlan").textContent = "Saved in Eleonora’s Notebook ✓";
  setTimeout(
    () =>
      ($("#saveLayerPlan").textContent = "Save this test plan in the Notebook"),
    1800,
  );
};
updateLayerLab();
const lessonData = [
  [
    "Clay is geology made workable",
    "Weathered rock becomes plate-like mineral particles. Water lets them slide; drying pulls them together; firing removes structural water and begins irreversible ceramic change.",
    [
      "Compare earthenware, stoneware and porcelain",
      "Measure wet-to-dry and fired shrinkage",
      "Test fired absorption",
      "Match glaze to a matured body",
    ],
    "Glazy: What Is Clay? · Hamer · Bodies of Clay",
    "assets/glazes/tile_woodfired.jpg",
  ],
  [
    "Make forms that survive drying",
    "Particle alignment, uneven wall thickness, attached parts and trapped moisture all create stresses before the kiln is even lit.",
    [
      "Compress slabs and rims",
      "Join at compatible moisture",
      "Dry evenly under loose plastic",
      "Never fire suspect damp ware",
    ],
    "Basic Pottery Making · Mastering Hand Building · Practical Pottery",
    "assets/glazes/tile_obvara.jpg",
  ],
  [
    "Flux + alumina + silica",
    "Silica builds glass, alumina stabilises the melt, and flux oxides make melting possible. Colorants modify a base whose chemistry still governs durability and surface.",
    [
      "Learn material-to-oxide relationships",
      "Convert a recipe to UMF",
      "Plot silica against alumina",
      "Change one variable",
    ],
    "Bloomfield · Carter · Glazy: What Is Glaze?",
    "assets/glazes/tile_cobalt.png",
  ],
  [
    "A test tile is a small experiment",
    "A recipe is not a result. Clay, thickness, application, heatwork, atmosphere and cooling all participate.",
    [
      "Mix 100 g",
      "Record water and specific gravity",
      "Apply three thicknesses",
      "Photograph with the kiln log",
    ],
    "Amazing Glaze · Cone 5–6 Glazes · Glazy Testing",
    "assets/recipes/sunshine.jpg",
  ],
  [
    "Application has measurable thickness",
    "Brushing, dipping, pouring and spraying leave different coats. Water, porosity, bisque temperature and time in suspension change pickup.",
    [
      "Weigh dry tile before and after glazing",
      "Use a cut edge or stepped texture",
      "Record dip time and number of coats",
      "Keep wax and dust off glaze zones",
    ],
    "Intermediate Guide to Ceramic Glazing · Amazing Glaze",
    "assets/recipes/odyssey-gloss-white.jpg",
  ],
  [
    "Atmosphere changes oxide state",
    "Oxidation, neutral firing, reduction, reoxidation, vapour and post-fire reduction are not aesthetic labels; they change reactions in clay and glaze.",
    [
      "Use witness cones",
      "Log reduction onset and pressure",
      "Map tile position in the kiln",
      "Compare oxidation and reduction safely",
    ],
    "Mastering Kilns and Firing · Electric Kilns for Ceramics · Hamer",
    "assets/glazes/tile_copperred.jpg",
  ],
  [
    "Cooling is part of the firing",
    "A fast cool can freeze a uniform glass. A slow cool can grow crystals, change colour, matte a surface or turn a promising glaze dry.",
    [
      "Keep the same peak heatwork",
      "Design one controlled-cool comparison",
      "Mark crystal-growth holds",
      "Do not alter recipe and schedule together",
    ],
    "Mastering Kilns and Firing · Colour in Glazes",
    "assets/glazes/tile_crystalline.jpg",
  ],
  [
    "Beauty does not prove durability",
    "A smooth glaze can still leach; an attractive crackle can harbour residue; a poorly fitted glaze can fail months later. Functional ware needs a stable system.",
    [
      "Wet-clean the studio",
      "Use stable liners",
      "Check fit and absorption",
      "Commission leach tests for production",
    ],
    "Amazing Glaze Food-Safe · Glazy Safety · Hamer",
    "assets/glazes/tile_raku.jpg",
  ],
];
$("#lessons").innerHTML = lessonData
  .map(
    (l, i) =>
      `<article class="lesson"><span>${String(i + 1).padStart(2, "0")}</span><figure><img src="${l[4]}" alt="Visual reference for ${l[0]}"></figure><div><h3>${l[0]}</h3><p>${l[1]}</p></div><ol>${l[2].map((x) => `<li>${x}</li>`).join("")}</ol><aside><b>READ FURTHER</b><p>${l[3]}</p></aside></article>`,
  )
  .join("");
const atmos = [
  [
    "OXIDATION",
    "Oxygen is available throughout the firing. Electric kilns commonly work here; copper usually gives green or turquoise while iron often gives honey, rust or brown.",
    "tile_oribe.jpg",
    "COMPARE · copper green",
  ],
  [
    "NEUTRAL",
    "Fuel and oxygen are balanced. It is a deliberate control zone—not simply the absence of a decision—and may be used between oxidising or reducing phases.",
    "tile_nuka.jpg",
    "CONTROL · balanced flame",
  ],
  [
    "REDUCTION",
    "Fuel consumes available oxygen and changes oxide states. Copper may become red; iron can help produce celadon blue-green.",
    "tile_celadon.jpg",
    "COMPARE · iron celadon",
  ],
  [
    "REOXIDATION",
    "Oxygen returns during a later stage or cooling. Surfaces can reabsorb oxygen, changing copper reds, iron crystals and metallic effects.",
    "tile_chrometin.jpg",
    "WATCH · changing copper",
  ],
  [
    "POST-FIRE REDUCTION",
    "Red-hot raku ware meets combustible material outside the kiln. Smoke marks cracks and reduced metals flash, but the porous ware remains decorative.",
    "tile_raku.jpg",
    "DECORATIVE · thermal shock",
  ],
  [
    "WOOD · SALT · SODA",
    "Flame carries ash or introduced vapour. Direction, kiln position, wadding and exposure become part of the surface record.",
    "tile_woodfired.jpg",
    "MAP · kiln position",
  ],
];
$("#atmospheres").innerHTML = atmos
  .map(
    (x) =>
      `<article class="visual-card"><img src="assets/glazes/${x[2]}" alt="Fired ceramic example of ${x[0]}"><small>${x[3]}</small><h3>${x[0]}</h3><p>${x[1]}</p></article>`,
  )
  .join("");
const heatStages = [
  [
    "ROOM TEMPERATURE → 200°C",
    "Free water leaves",
    "Slow early heating protects thick or incompletely dried work. Steam pressure—not the quartz inversion—is the classic cause of a damp pot bursting.",
  ],
  [
    "≈ 300–650°C",
    "Burnout and dehydroxylation",
    "Organics burn and clay minerals lose chemically bound hydroxyl groups across a range. Give gases oxygen and time to escape before the glaze seals.",
  ],
  [
    "573°C",
    "Quartz inversion",
    "Quartz changes crystal form and expands on heating, then contracts on cooling. Move evenly through this range, especially with thick or quartz-rich bodies.",
  ],
  [
    "≈ 800–1100°C",
    "Sintering and early glass",
    "Particles bond, pores change and flux-bearing phases begin forming glass. Exact ranges depend on the body and glaze.",
  ],
  [
    "Maturing range",
    "Vitrification and glaze melt",
    "Heatwork—not a single thermometer number—matures body and glaze. Witness cones show the combined effect of temperature and time.",
  ],
  [
    "COOLING",
    "Glass freezes; crystals may grow",
    "Fit stress develops as body and glaze contract. Controlled cooling can grow crystals or mattes; critical transitions still matter on the way down.",
  ],
];
$("#heatwork").innerHTML =
  `<div class="heatwork-head"><p class="eyebrow">HEATWORK MAP</p><h3>A firing is a sequence, not a destination temperature.</h3><p>Ranges overlap and materials vary. Use this as orientation, then follow the clay, glaze, kiln and cone evidence.</p></div><div class="heat-line">${heatStages.map((x, i) => `<article><span>${String(i + 1).padStart(2, "0")}</span><small>${x[0]}</small><h4>${x[1]}</h4><p>${x[2]}</p></article>`).join("")}</div>`;
const materials = [
  [
    "GLASS NETWORK",
    "Silica · SiO₂",
    "The principal glass former. More is not automatically better: it must be melted by the available fluxes and balanced with alumina.",
    "tile_celadon.jpg",
  ],
  [
    "STABILISER",
    "Alumina · Al₂O₃",
    "Raises viscosity, resists flow and often improves durability. Too much for the heatwork can leave a glaze dry or underfired.",
    "tile_nuka.jpg",
  ],
  [
    "ALKALI FLUXES",
    "Sodium · potassium · lithium",
    "Powerful fluxes that can brighten colour and raise thermal expansion. Their balance influences crazing, fluidity and colour response.",
    "tile_turquoise.jpg",
  ],
  [
    "EARTH FLUXES",
    "Calcium · magnesium · strontium",
    "Calcium supports many durable glosses; magnesium can create buttery mattes and shift cobalt; strontium can replace some barium effects.",
    "tile_teadust.jpg",
  ],
  [
    "COLOURANT",
    "Iron · Fe",
    "From honey and celadon to tenmoku, kaki and metallic crystals. Concentration, atmosphere, base and cooling matter more than the word brown.",
    "tile_haresfur.jpg",
  ],
  [
    "COLOURANTS",
    "Cobalt · copper · chrome · manganese",
    "Tiny additions can dominate a glaze. Each responds to the base and atmosphere; brilliant colour is never proof of chemical stability.",
    "tile_cobalt.png",
  ],
];
$("#materialsGrid").innerHTML = materials
  .map(
    (x) =>
      `<article class="material-card"><img src="assets/glazes/${x[3]}" alt="Ceramic material reference for ${x[1]}"><small>${x[0]}</small><h3>${x[1]}</h3><p>${x[2]}</p></article>`,
  )
  .join("");
const defects = [
  [
    "Crazing",
    "A network of cracks in the glaze. Often the glaze is in excess tension because its thermal expansion is too high for the body.",
    "Lower glaze expansion or adjust the body; retest immediately and after heating/freezing cycles.",
    "tile_raku.jpg",
    "REAL CRACKLE REFERENCE",
  ],
  [
    "Shivering",
    "Sharp flakes break from rims or edges when the glaze is too compressed. This is a serious safety failure.",
    "Stop using the combination. Increase glaze expansion or change the body, then inspect rims carefully.",
    null,
    "NO SUBSTITUTE IMAGE",
  ],
  [
    "Crawling",
    "Bare islands appear where the raw coat pulled apart during drying or melting.",
    "Clean the bisque; reduce excessive thickness or raw shrinkage; review clay content, binder and application.",
    "tile_lichen.jpg",
    "REAL INTENTIONAL CRAWL",
  ],
  [
    "Pinholes",
    "Small open pits remain where gas escaped after the glaze became too stiff to heal.",
    "Improve bisque burnout; alter the final ramp or soak; test a more fluid melt without simply overfiring.",
    null,
    "IMAGE INDEX IN PROGRESS",
  ],
  [
    "Blisters",
    "Larger bubbles freeze in the surface when gas release and melt fluidity are badly timed.",
    "Check overfiring, thick application and gassing materials; compare a drop-and-soak schedule.",
    "tile_crater.jpg",
    "RELATED GAS-CRATER SURFACE",
  ],
  [
    "Dunting",
    "A clean body crack forms from thermal stress, often during heating or cooling through inversion ranges.",
    "Slow the critical part of the cycle; check wall thickness, quartz content, joins and kiln cooling.",
    null,
    "IMAGE INDEX IN PROGRESS",
  ],
];
$("#defects").innerHTML = defects
  .map(
    (x) =>
      `<article class="defect-card">${x[3] ? `<img src="assets/glazes/${x[3]}" alt="Diagnostic ceramic example of ${x[0]}">` : `<div class="image-missing">Exact diagnostic photograph<br>still being indexed</div>`}<small>${x[4]}</small><h3>${x[0]}</h3><p>${x[1]}</p><b>Next controlled test</b><p>${x[2]}</p></article>`,
  )
  .join("");
const diagnosticMap = Object.fromEntries(
  defects.map((d) => [d[0].toLowerCase(), d]),
);
function updateDiagnostic() {
  const d = diagnosticMap[$("#symptom").value];
  $("#diagnosticAnswer").innerHTML =
    `<small>FIRST HYPOTHESIS · NOT A FINAL VERDICT</small><h3>${d[0]}</h3><p>${d[1]}</p><b>Change one thing next:</b><p>${d[2]}</p>`;
}
$("#symptom").onchange = updateDiagnostic;
updateDiagnostic();
const lineages = [
  [
    "c. 1600 BCE",
    "Egyptian and West Asian faience",
    "Communities developed brilliant alkaline copper blues and greens on silica-rich bodies.",
    "tile_turquoise.jpg",
  ],
  [
    "Han period",
    "Lead-glazed earthenware in China",
    "Low-temperature lead fluxes enabled luminous green and amber burial wares; their toxicity belongs to history, not contemporary studio practice.",
    "tile_oribe.jpg",
  ],
  [
    "618–907",
    "Tang sancai workshops",
    "Cream, amber and green lead glazes flowed together across moulded wares and cosmopolitan forms.",
    "tile_kaki.jpg",
  ],
  [
    "960–1279",
    "Song kiln constellations",
    "Ru, Longquan, Jun, Jian and Jizhou represent distinct kiln ecologies—not a single anonymous Chinese style.",
    "tile_chun.jpg",
  ],
  [
    "10th–14th c.",
    "Goryeo celadon potters",
    "Korean workshops developed refined celadon colour and inlaid sanggam decoration with extraordinary control.",
    "tile_celadon.jpg",
  ],
  [
    "12th–13th c.",
    "Jian kiln communities",
    "Iron-rich bowls formed hare’s-fur, oil-spot and rare yohen surfaces through material and firing knowledge distributed across workshops.",
    "tile_haresfur.jpg",
  ],
  [
    "16th–17th c.",
    "Mino kilns · Japan",
    "Shino and Oribe transformed feldspathic white, iron drawing and copper green within Momoyama tea culture.",
    "tile_shino.jpg",
  ],
  [
    "17th–18th c.",
    "European salt-glaze potters",
    "Sodium vapour created durable orange-peel skins on stoneware, linking kiln architecture directly to surface.",
    "tile_saltglaze.jpg",
  ],
  [
    "1662–1722",
    "Jingdezhen · Kangxi copper-red specialists",
    "Peach bloom—jiangdou hong—was a technically difficult imperial glaze used only briefly and on a limited repertory of small forms.",
    "tile_peachbloom_met.jpg",
  ],
  [
    "1880s",
    "Ernest Chaplet and European art pottery",
    "French experiments helped recover high-fire copper-red effects for European studio practice.",
    "tile_copperred.jpg",
  ],
  [
    "Early 20th c.",
    "Bernard Leach · Shōji Hamada",
    "Their influential studio-pottery dialogue carried recipes, aesthetics and contested ideas of tradition across Britain and Japan.",
    "tile_nuka.jpg",
  ],
  [
    "Mid 20th c.",
    "Michael Cardew",
    "Potter, writer and teacher whose materials-led practice linked geology, local production and high-temperature firing.",
    "tile_ash.jpg",
  ],
  [
    "Mid 20th c.",
    "Lucie Rie · Hans Coper",
    "Urban European studio ceramics demonstrated how disciplined surfaces, form and modernism could meet without historical imitation.",
    "tile_manganese.jpg",
  ],
  [
    "Late 20th c.",
    "Robin Hopper",
    "Systematic attention to glaze colour, surface and mark-making made studio knowledge visually teachable.",
    "tile_cobalt.png",
  ],
  [
    "Late 20th c.",
    "Phil Rogers",
    "Ash-glaze research connected plant source, preparation, kiln and form in an unusually practical lineage.",
    "tile_ash.jpg",
  ],
  [
    "Late 20th c. →",
    "Ian Currie · John Britt",
    "Grid testing and comparative recipe research made variation legible instead of mysterious.",
    "tile_teadust.jpg",
  ],
  [
    "Contemporary",
    "Linda Bloomfield",
    "Accessible explanations of colour response connect oxide chemistry to recognisable fired surfaces.",
    "tile_floatingblue.jpg",
  ],
  [
    "Contemporary",
    "Living kiln communities",
    "Anagama, raku, Indigenous, industrial and local studio traditions continue to change. The hall remains deliberately unfinished.",
    "tile_woodfired.jpg",
  ],
];
$("#timeline").innerHTML = lineages
  .map(
    (x) =>
      `<article class="event"><time>${x[0]}</time><img src="assets/glazes/${x[3]}" alt="Ceramic lineage reference for ${x[1]}"><div><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`,
  )
  .join("");
function ingredientClues(x) {
  const names = [...(x.ingredients || []), ...(x.additions || [])]
    .map((v) => v.material)
    .join(" · ");
  const clues = [];
  if (/cobalt/i.test(names))
    clues.push("cobalt can supply powerful blue or purple");
  if (/copper/i.test(names))
    clues.push("copper response depends strongly on base and atmosphere");
  if (/iron|redart|ilmenite/i.test(names))
    clues.push("iron may colour, break or crystallise");
  if (/rutile|titanium/i.test(names))
    clues.push("rutile or titanium can variegate and seed crystals");
  if (/tin|zircopax/i.test(names))
    clues.push("an opacifier changes depth and colour response");
  if (/manganese/i.test(names))
    clues.push("manganese demands careful dust and durability practice");
  return clues.length
    ? clues.join("; ") + "."
    : "Its character comes from the complete oxide balance, application and firing—not one named material.";
}
function relatedFor(x) {
  const targetHues = huesFor(x);
  return collection
    .filter(
      (y) =>
        y.image &&
        y.id !== x.id &&
        (huesFor(y).some((h) => targetHues.includes(h)) ||
          String(y.surface).toLowerCase() === String(x.surface).toLowerCase()),
    )
    .slice(0, 4);
}
function openBook(x) {
  selected = x;
  $("#modalImage").hidden = !x.image;
  $("#modalImage").parentElement.classList.toggle("without-photo", !x.image);
  if (x.image) $("#modalImage").src = imageSrc(x.image);
  $("#modalImage").alt = `Real fired ceramic surface: ${x.name}`;
  $("#modalImage").classList.toggle("contain", x.objectFit === "contain");
  $("#modalImage").style.objectPosition = x.position || "50% 50%";
  $("#modalImage").style.transform = "none";
  $("#recordType").textContent = !x.image
    ? "SOURCE FORMULA · NO MATCHED PHOTOGRAPH"
    : x.platform === "Glazy"
      ? `GLAZY ${String(x.sourceStatus || "RECIPE").toUpperCase()} RECORD`
      : x.kind === "recipe"
        ? "FIRED RECIPE STUDY"
        : "HISTORICAL SURFACE FAMILY";
  $("#modalEyebrow").textContent =
    x.kind === "recipe" ? `CONE ${x.cone} · ${x.atmosphere}` : x.origin;
  $("#modalTitle").textContent = x.name;
  $("#modalIntro").textContent = x.history;
  const facts =
    x.kind === "family" && x.date
      ? [
          ["DATE", x.date],
          ["HISTORIC NAME", x.aliases],
          ["RARITY", x.rarity],
          ["OBJECT", x.objectRecord],
          ["MODERN TEST RANGE", x.cone],
          ["MECHANISM", x.atmosphere],
        ]
      : x.platform === "Glazy"
        ? [
            ["GLAZY CATEGORY", x.glazyClassification || "Glaze"],
            ...(x.studyClassification
              ? [["STUDY PATH", x.studyClassification]]
              : []),
            ["COLOUR", x.color],
            ["SURFACE / OPACITY", `${x.surface} · ${x.transparency}`],
            ["CONE / ATMOSPHERE", `${x.cone} · ${x.atmosphere}`],
            ["PUBLISHED", x.created || "See source"],
            [
              "RECORD STATE",
              `${x.sourceStatus || "See source"} · supplied snapshot`,
            ],
            ...(x.galleryEvidence
              ? [["COMMUNITY EVIDENCE", x.galleryEvidence]]
              : []),
            ["SELECTED PHOTOGRAPH", x.imageCredit],
          ]
        : [
            ["COLOUR", x.color],
            ["SURFACE", x.surface],
            ["CONE / HEAT", x.cone],
            ...(x.firingTemperature
              ? [["PUBLISHED TEMPERATURE", x.firingTemperature]]
              : []),
            ["ATMOSPHERE", x.atmosphere],
          ];
  $("#facts").innerHTML = facts
    .map((v) => `<span><small>${v[0]}</small>${v[1]}</span>`)
    .join("");
  $("#recognitionBlock").innerHTML =
    x.kind === "family"
      ? `
  <section class="book-section"><small>01 · RECOGNISE IT</small><h3>What your eye should notice</h3>${x.reconstruction ? `<figure class="surface-zoom"><img src="${imageSrc(x.image)}" alt="Close view of the peach-bloom glaze on the Met water pot"><figcaption>Surface close-up · the Atlas crops the same museum object so the mottled glaze, not merely the vessel silhouette, becomes recognisable.</figcaption></figure>` : ""}<p>${x.recognition}</p></section>
  <section class="book-section"><small>02 · UNDERSTAND IT</small><h3>Why the surface happens</h3><p>${x.mechanism}</p></section>
  <section class="book-section"><small>03 · TEST IT</small><h3>Turn resemblance into evidence</h3><p>${x.practice}</p>${x.concept ? `<a class="concept-jump" href="#${x.concept}">Open the copper-reduction lesson →</a>` : ""}</section>`
      : `
  <section class="book-section"><small>01 · RECOGNISE IT</small><h3>${x.color} · ${x.surface}</h3><p>${x.recognition || "Read the source photograph and recipe together. Where a photograph is unavailable, no substitute colour is supplied."}</p></section>
  <section class="book-section"><small>02 · READ THE MATERIAL CLUES</small><h3>A formula is a set of hypotheses</h3><p>${ingredientClues(x)}</p></section>`;
  if (x.kind === "recipe") {
    const baseTotal = x.ingredients.reduce((n, v) => n + v.amount, 0),
      publishedTotal =
        x.publishedTotal ||
        baseTotal + x.additions.reduce((n, v) => n + v.amount, 0),
      divisor = x.calculationBasis === "total" ? publishedTotal : baseTotal;
    let sectionNo = 4;
    const umfSection = x.umf
      ? `<section class="book-section"><small>${String(sectionNo++).padStart(2, "0")} · READ THE UMF</small><h3>The oxide balance behind the recipe</h3><div class="umf-grid"><span><small>FLUXES</small>${x.umf.fluxes}</span><span><small>STABILISERS</small>${x.umf.stabilizers}</span><span><small>GLASS FORMERS</small>${x.umf.glassFormers}</span><span><small>RATIOS</small>${x.umf.ratio}</span>${x.umf.trace ? `<span><small>TRACE OXIDES</small>${x.umf.trace}</span>` : ""}${x.umf.thermalExpansion ? `<span><small>THERMAL EXPANSION</small>${x.umf.thermalExpansion}</span>` : ""}</div><p>The UMF is a comparison tool, not a firing prediction. Material analyses vary and glaze fit still belongs to the clay-and-firing system.</p></section>`
      : "";
    const techniqueSection = x.technique
      ? `<section class="book-section experiment-plan"><small>${String(sectionNo++).padStart(2, "0")} · RECREATE THE FLASHING</small><h3>${x.technique.title}</h3><ol>${x.technique.steps.map((v) => `<li>${v}</li>`).join("")}</ol><div class="status danger"><b>Chromium studio caution</b><br>${x.technique.caution}</div></section>`
      : "";
    const testSection = x.testEvidence
      ? `<section class="book-section experiment-plan"><small>${String(sectionNo++).padStart(2, "0")} · MAKE THE FIRST TEST USEFUL</small><h3>Thickness and chrome-flashing matrix</h3><ol>${x.testEvidence.map((v) => `<li>${v}</li>`).join("")}</ol></section>`
      : "";
    const sourceSectionNo = String(sectionNo++).padStart(2, "0");
    x._relatedSectionNo = String(sectionNo).padStart(2, "0");
    const weight = (a) => ((a / divisor) * 100).toFixed(1);
    $("#formulaBlock").innerHTML =
      `<section class="book-section"><small>03 · WEIGH THE RECIPE</small><h3>Published formula</h3><label class="batch">${x.calculationBasis === "total" ? "Total dry batch size" : "Base batch size (additions extra)"} <input id="batch" type="number" value="100" min="10"> g</label><table class="formula"><thead><tr><th>Material</th><th>Parts / %</th><th>Weight</th></tr></thead><tbody>${x.ingredients.map((a) => `<tr><td>${a.material}</td><td>${a.amount}</td><td data-pct="${a.amount}" data-divisor="${divisor}">${weight(a.amount)} g</td></tr>`).join("")}${x.additions.length ? `<tr><th colspan="3">ADDITIONS · published beyond the ${baseTotal.toFixed(1)} base</th></tr>` : ""}${x.additions.map((a) => `<tr><td>+ ${a.material}</td><td>${a.amount}</td><td data-pct="${a.amount}" data-divisor="${divisor}">${weight(a.amount)} g</td></tr>`).join("")}</tbody></table><p><b>Published total: ${publishedTotal.toFixed(1)}</b> · ${x.calculationBasis === "total" ? "all printed parts are scaled together to the chosen dry batch" : "base " + baseTotal.toFixed(1) + " plus additions; the calculator preserves this structure"}.</p></section>${umfSection}${techniqueSection}${testSection}<section class="book-section"><small>${sourceSectionNo} · SOURCE NOTES & EVIDENCE BOUNDARIES</small><h3>What the publication records and what it does not</h3><div class="status ${/failed|decorative/i.test(x.status) ? "danger" : ""}"><b>${x.status}</b></div>${x.notes ? `<p>${x.notes}</p>` : ""}${x.sourceNotes ? `<p>${x.sourceNotes}</p>` : ""}${x.missingFields ? `<div class="missing-fields"><b>Not supplied by this Glazy record</b><ul>${x.missingFields.map((v) => `<li>${v}</li>`).join("")}</ul></div>` : ""}<div class="source"><b>${x.source}</b><br>${x.author} · formula on supplied PDF p. ${x.page}${x.imageSourcePage ? `<br>Fired photograph: supplied PDF p. ${x.imageSourcePage} · matched to this formula during the source-page audit` : ""}${x.imageCredit ? `<br>Selected photograph: ${x.imageCredit}` : ""}${x.sourceUrl ? `<br><a href="${x.sourceUrl}" target="_blank" rel="noopener">Open the live Glazy record ↗</a>` : ""}${x.relatedSourceUrl ? `<br><a href="${x.relatedSourceUrl}" target="_blank" rel="noopener">Read the maker’s atmospheric-colour notes ↗</a>` : ""}${x.license ? `<br><br>${x.license}${x.licenseUrl ? ` · <a href="${x.licenseUrl}" target="_blank" rel="noopener">licence ↗</a>` : ""}` : ""}</div></section>`;
  } else if (x.reconstruction) {
    const r = x.reconstruction,
      baseTotal = r.ingredients.reduce((n, v) => n + v.amount, 0);
    x._relatedSectionNo = "07";
    $("#formulaBlock").innerHTML =
      `<section class="book-section history-chapter"><small>04 · WHY IT MATTERS</small><h3>Old, rare and technically extraordinary</h3><p>Peach-bloom was made at Jingdezhen for only a brief part of the Kangxi reign. Surviving objects belong to a deliberately limited repertory—especially small water pots and writing-table forms. The Western name evokes ripening peach skin; Chinese connoisseurs call it <i>jiangdou hong</i>, “cowpea-red.” It is not merely an attractive pink glaze but a highly sensitive achievement of imperial copper-red technology.</p><div class="source"><b>Authoritative object and research records</b>${x.historySources.map((s) => `<br><a href="${s[1]}" target="_blank" rel="noopener">${s[0]} ↗</a>`).join("")}</div></section><section class="book-section reconstruction"><small>05 · RECREATE IT · RESEARCH STARTING POINT</small><h3>${r.name}</h3><div class="status danger"><b>${r.status}</b><br>This is a modern experimental route toward the family—not a recovered seventeenth-century workshop secret.</div><div class="batch">Batch size <input id="batch" type="number" value="100" min="10"> g</div><table class="formula"><thead><tr><th>Material</th><th>%</th><th>Weight</th></tr></thead><tbody>${r.ingredients.map((a) => `<tr><td>${a.material}</td><td>${a.amount}</td><td data-pct="${a.amount}">${a.amount} g</td></tr>`).join("")}<tr><th colspan="3">ADDITIONS · added beyond the ${baseTotal.toFixed(1)}% base</th></tr>${r.additions.map((a) => `<tr><td>+ ${a.material}</td><td>${a.amount}</td><td data-pct="${a.amount}">${a.amount} g</td></tr>`).join("")}</tbody></table><p>${r.notes}</p><div class="source"><b>${r.source}</b><br><a href="${r.sourceUrl}" target="_blank" rel="noopener">Open the published formula source ↗</a></div></section><section class="book-section experiment-plan"><small>06 · RUN THE EXPERIMENT</small><h3>Three firings, one variable at a time</h3><ol><li>Make four identical porcelain test tiles: thin, medium and thick glaze bands plus a bare control edge.</li><li>Fire the same 100 g batch in three separate firings, changing only the onset of reduction: around cone 012, cone 010, then cone 08.</li><li>Log witness cones, kiln position, atmosphere and cooling. Photograph red, blush and green zones in the same light.</li><li>Do not intensify reduction blindly: too much can muddy a copper red; too little may leave green or clear passages.</li></ol><p>John Britt’s published experiments describe reduction timing, application sequence, tin, copper and strike firing as test variables rather than a single guaranteed schedule.</p></section>`;
  } else {
    x._relatedSectionNo = "05";
    $("#formulaBlock").innerHTML =
      `<section class="book-section"><small>04 · HISTORY & READING TRAIL</small><h3>A family is not one universal recipe</h3><p>Historical names describe lineages of material, kiln, place and appearance. The cathedral will not fabricate a definitive formula where none exists.</p><div class="source"><b>Continue in Eleonora’s library</b><br>${x.reading}${x.imageCredit ? `<br><br><b>Atlas photograph</b><br>${x.imageCredit}` : ""}${x.sourceUrl ? `<br><br><a href="${x.sourceUrl}" target="_blank" rel="noopener">Open the attributed image or lineage record ↗</a>` : ""}</div></section>`;
  }
  const rel = relatedFor(x);
  $("#relatedBlock").innerHTML =
    `<section class="book-section"><small>${x._relatedSectionNo || "05"} · CONTINUE THROUGH THE COLLECTION</small><h3>Related surfaces</h3><div class="related-books">${rel.map((r) => `<button data-related="${r.id}"><img src="${imageSrc(r.image)}" alt="Fired surface: ${r.name}"><b>${r.name}</b></button>`).join("")}</div></section>`;
  let batch = $("#batch");
  if (batch) {
    const error = document.createElement("p");
    error.id = "batchError";
    error.className = "field-error";
    error.setAttribute("role", "status");
    batch.closest(".batch").after(error);
    batch.setAttribute("aria-describedby", "batchError");
    batch.setAttribute(
      "aria-label",
      batch.closest(".batch").textContent.trim(),
    );
    batch.oninput = () => {
      const valid =
        batch.value !== "" &&
        Number.isFinite(+batch.value) &&
        +batch.value >= 10;
      batch.setAttribute("aria-invalid", String(!valid));
      error.textContent = valid ? "" : "Enter a batch size of at least 10 g.";
      all("[data-pct]").forEach(
        (c) =>
          (c.textContent = valid
            ? (
                (+c.dataset.pct * +batch.value) /
                (+c.dataset.divisor || 100)
              ).toFixed(1) + " g"
            : "—"),
      );
    };
  }
  all("[data-related]").forEach(
    (b) =>
      (b.onclick = () =>
        openBook(collection.find((r) => r.id === b.dataset.related))),
  );
  all(".concept-jump").forEach((a) => (a.onclick = () => $("#close").click()));
  updateSaveButton();
  $("#modal").hidden = false;
  document.body.style.overflow = "hidden";
  $("#close").focus();
}
function updateSaveButton() {
  $("#saveButton").textContent = saved.includes(selected?.id)
    ? "Saved in Eleonora’s Notebook"
    : "Save in Eleonora’s Notebook";
  $("#saveButton").classList.toggle("on", saved.includes(selected?.id));
}
$("#saveButton").onclick = () => {
  saved = saved.includes(selected.id)
    ? saved.filter((x) => x !== selected.id)
    : [...saved, selected.id];
  localStorage.setItem("eleonora-saved", JSON.stringify(saved));
  updateSaveButton();
  renderSaved();
};
let modalReturnFocus = null;
const originalOpenBook = openBook;
const pageSurfaces = all(".threshold, main, body > footer, .mobile-nav");
function setPageInert(inert) {
  pageSurfaces.forEach((el) => {
    el.inert = inert;
  });
}
openBook = function (x) {
  if ($("#modal").hidden) modalReturnFocus = document.activeElement;
  const result = originalOpenBook(x);
  setPageInert(true);
  $("#modal article").scrollTop = 0;
  return result;
};
$("#close").onclick = () => {
  $("#modal").hidden = true;
  document.body.style.overflow = "";
  setPageInert(false);
  modalReturnFocus?.focus?.();
};
$("#modal").onmousedown = (e) => {
  if (e.target === $("#modal")) $("#close").click();
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && $("#roomMenu").classList.contains("open")) {
    $("#roomMenu").classList.remove("open");
    $("#roomsButton").setAttribute("aria-expanded", "false");
    $("#roomsButton").focus();
    return;
  }
  if (document.getElementById("sourceReader")?.open) return;
  if ($("#modal").hidden) return;
  if (e.key === "Escape") {
    $("#close").click();
    return;
  }
  if (e.key === "Tab") {
    const focusable = all(
      '#modal a[href],#modal button:not([disabled]),#modal input:not([disabled]),#modal select:not([disabled]),#modal [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0],
      last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
function renderSaved() {
  $("#savedCount").textContent = saved.length;
  $("#notebookTitle").textContent =
    saved.length || layerPlans.length
      ? `${saved.length} surfaces and ${layerPlans.length} layer plans are waiting for you.`
      : "Your own collection begins with one surface.";
  $("#saved").innerHTML = saved.length
    ? collection
        .filter((x) => saved.includes(x.id))
        .map(
          (x) =>
            `<button data-id="${x.id}">${x.image ? `<img src="${imageSrc(x.image)}" alt="Fired surface: ${x.name}">` : `<span class="no-photo">Source formula</span>`}<strong>${x.name}</strong></button>`,
        )
        .join("")
    : `<a href="#atlas">Return to the Atlas and choose what calls to you →</a>`;
  all("#saved button").forEach(
    (b) =>
      (b.onclick = () =>
        openBook(collection.find((x) => x.id === b.dataset.id))),
  );
}
function renderLayerPlans() {
  $("#layerPlans").innerHTML = layerPlans.length
    ? `<h3>Layering test plans</h3><div class="plan-grid">${layerPlans.map((p) => `<article class="plan-card"><small>CONE ${p.cone} · ${p.method}</small><h4>${p.aName} → ${p.bName}</h4><p>${p.thicknessA} base layer · ${p.thicknessB} upper layer<br>${p.atmosphere}</p><button data-delete-plan="${p.id}">Remove plan</button></article>`).join("")}</div>`
    : "";
  all("[data-delete-plan]").forEach(
    (b) =>
      (b.onclick = () => {
        layerPlans = layerPlans.filter((p) => p.id !== b.dataset.deletePlan);
        localStorage.setItem(
          "eleonora-layer-plans",
          JSON.stringify(layerPlans),
        );
        renderLayerPlans();
        renderSaved();
      }),
  );
  renderSaved();
}
renderLayerPlans();
function bookTopic(name) {
  if (
    /history|chinese|athens|palestin|african|peru|prehistor|apulian|global clay|southwestern|picture worlds|precious/i.test(
      name,
    )
  )
    return "history";
  if (
    /materials|chemistry|mineral|phase|powder|piezo|nuclear|manufactur|arthroplasty/i.test(
      name,
    )
  )
    return "science";
  return "practice";
}
all("#bookFilters button").forEach(
  (b) =>
    (b.onclick = () => {
      all("#bookFilters button").forEach((x) => {
        const on = x === b;
        x.classList.toggle("on", on);
        x.setAttribute("aria-pressed", String(on));
      });
      document.dispatchEvent(new Event("library-filter-change"));
    }),
);
render();

const mobileNavLinks = all(".mobile-nav a");
function setMobileNav(id) {
  mobileNavLinks.forEach((a) => {
    const on = a.dataset.navSection === id;
    a.classList.toggle("active", on);
    on
      ? a.setAttribute("aria-current", "page")
      : a.removeAttribute("aria-current");
  });
}
setMobileNav(location.hash.replace("#", "") || "top");
mobileNavLinks.forEach((a) =>
  a.addEventListener("click", () => setMobileNav(a.dataset.navSection)),
);
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setMobileNav(visible.target.id);
    },
    { rootMargin: "-15% 0px -70% 0px", threshold: [0, 0.1, 0.25] },
  );
  ["top", "atlas", "recipes", "path", "notebook"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) navObserver.observe(section);
  });
}
