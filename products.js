// Products data from the Excel file
const productData = [
  {
    id: "coccine-cream-elegance",
    title: "Coccine Cream Elegance",
    vendor: "Coccine",
    tags: "Autumn, Coccine, Protect, Shoe Care, Spring",
    price: "€3.99",
    comparePrice: "€4.99",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-tepalas-su-kempinele-neutralios-spalvos-nr-01-coccine-50-ml-2-1.jpg?v=1732421610",
  },
  {
    id: "coccine-nano-protector",
    title: "Coccine Nano Protector",
    vendor: "Coccine",
    tags: "Coccine, Protect, Repel, Shoe Care, Waterproofing",
    price: "€5.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/nano-protector-coccine-100-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-shoe-stretch",
    title: "Coccine Shoe Stretch",
    vendor: "Coccine",
    tags: "Accessories, Coccine, Shoe Care",
    price: "€4.50",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-tempiklis-coccine-100-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-suede-nubuck-cleaner",
    title: "Coccine Suede & Nubuck Cleaner",
    vendor: "Coccine",
    tags: "Cleaner, Cleaning Products, Coccine, Shoe Care",
    price: "€4.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/zomsos-ir-nubuko-valiklis-coccine-100-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-leather-cleaner",
    title: "Coccine Leather Cleaner",
    vendor: "Coccine",
    tags: "Cleaner, Cleaning Products, Coccine, Leather, Shoe Care",
    price: "€4.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/odos-valiklis-coccine-100-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-shoe-deodorant",
    title: "Coccine Shoe Deodorant",
    vendor: "Coccine",
    tags: "Coccine, Deodorant, Shoe Care",
    price: "€3.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-dezodorantas-coccine-150-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-sneaker-cleaner",
    title: "Coccine Sneaker Cleaner",
    vendor: "Coccine",
    tags: "Cleaner, Cleaning Products, Coccine, Shoe Care, Sneakers",
    price: "€5.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/sportbačių-valiklis-coccine-100-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-suede-brush",
    title: "Coccine Suede Brush",
    vendor: "Coccine",
    tags: "Brush, Coccine, Shoe Care, Suede",
    price: "€3.50",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/zomsos-sepetelis-coccine-1.jpg?v=1732421610",
  },
  {
    id: "coccine-leather-lotion",
    title: "Coccine Leather Lotion",
    vendor: "Coccine",
    tags: "Coccine, Leather, Nourishment, Restore, Reviver, Shoe Care",
    price: "€4.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/odos-losjonas-coccine-150-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-shoe-cream",
    title: "Coccine Shoe Cream",
    vendor: "Coccine",
    tags: "Coccine, Nourishment, Restore, Reviver, Shoe Care",
    price: "€3.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-kremas-juodos-spalvos-nr-01-coccine-50-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-shoe-polish",
    title: "Coccine Shoe Polish",
    vendor: "Coccine",
    tags: "Coccine, Nourishment, Restore, Reviver, Shoe Care",
    price: "€4.50",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-blizgis-juodos-spalvos-nr-01-coccine-50-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-shoe-care-kit",
    title: "Coccine Shoe Care Kit",
    vendor: "Coccine",
    tags: "Best Selling, Coccine, Kits, Shoe Care",
    price: "€12.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-prieziuros-rinkinys-coccine-1.jpg?v=1732421610",
  },
  {
    id: "coccine-water-stop-spray",
    title: "Coccine Water Stop Spray",
    vendor: "Coccine",
    tags: "Autumn, Coccine, Protect, Repel, Shoe Care, Waterproofing, Winter",
    price: "€6.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/vandeniui-atsparus-purskiklis-coccine-400-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-suede-renovator",
    title: "Coccine Suede Renovator",
    vendor: "Coccine",
    tags: "Coccine, Nourishment, Restore, Reviver, Shoe Care, Suede",
    price: "€5.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/zomsos-ir-nubuko-atnaujintojas-juodos-spalvos-nr-01-coccine-100-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-leather-wax",
    title: "Coccine Leather Wax",
    vendor: "Coccine",
    tags: "Coccine, Leather, Nourishment, Protect, Restore, Shoe Care",
    price: "€4.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/odos-vaškas-bespalvis-nr-00-coccine-50-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-sport-insoles",
    title: "Coccine Sport Insoles",
    vendor: "Coccine",
    tags: "Coccine, Insole, Insoles, Sport",
    price: "€7.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/vidpadžiai-sportinei-avalynei-coccine-1-pora-1.jpg?v=1732421610",
  },
  {
    id: "coccine-winter-insoles",
    title: "Coccine Winter Insoles",
    vendor: "Coccine",
    tags: "Coccine, Insole, Insoles, Winter",
    price: "€8.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/šilti-vidpadžiai-coccine-1-pora-1.jpg?v=1732421610",
  },
  {
    id: "coccine-comfort-insoles",
    title: "Coccine Comfort Insoles",
    vendor: "Coccine",
    tags: "Basic, Coccine, Insole, Insoles",
    price: "€6.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/vidpadžiai-su-aktyviosios-anglies-sluoksniu-coccine-1-pora-1.jpg?v=1732421610",
  },
  {
    id: "coccine-gel-insoles",
    title: "Coccine Gel Insoles",
    vendor: "Coccine",
    tags: "Basic, Coccine, Insole, Insoles",
    price: "€9.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/gelinis-vidpadis-coccine-1-pora-1.jpg?v=1732421610",
  },
  {
    id: "coccine-leather-laces",
    title: "Coccine Leather Laces",
    vendor: "Coccine",
    tags: "Accessories, Coccine, Laces",
    price: "€3.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/odiniai-batraiščiai-coccine-90-cm-1-pora-1.jpg?v=1732421610",
  },
  {
    id: "coccine-shoe-horn",
    title: "Coccine Shoe Horn",
    vendor: "Coccine",
    tags: "Accessories, Coccine, Horns",
    price: "€2.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batų-šaukštas-coccine-1.jpg?v=1732421610",
  },
  {
    id: "coccine-shoe-trees",
    title: "Coccine Shoe Trees",
    vendor: "Coccine",
    tags: "Accessories, Coccine, Trees",
    price: "€8.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batų-kurpaliai-coccine-1-pora-1.jpg?v=1732421610",
  },
  {
    id: "coccine-eco-cleaner",
    title: "Coccine Eco Cleaner",
    vendor: "Coccine",
    tags: "Cleaner, Cleaning Products, Coccine, Eco, Shoe Care",
    price: "€6.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/eco-valiklis-coccine-100-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-sneaker-whitener",
    title: "Coccine Sneaker Whitener",
    vendor: "Coccine",
    tags: "Cleaner, Cleaning Products, Coccine, Newest Coccine Sneaker Whitener, Shoe Care, Sneakers",
    price: "€5.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/sportbačių-baliklis-coccine-75-ml-1.jpg?v=1732421610",
  },
  {
    id: "coccine-foam-cleaner",
    title: "Coccine Foam Cleaner",
    vendor: "Coccine",
    tags: "Cleaner, Cleaning Products, Coccine, Foam, Shoe Care",
    price: "€6.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/universalus-valiklis-coccine-200-ml-1.jpg?v=1732421610",
  },
  {
    id: "saphir-renovateur",
    title: "Saphir Renovateur",
    vendor: "Saphir",
    tags: "Best Selling Saphir Renovateur, Featured, Leather, Nourishment, Restore, Reviver, Saphir, Shoe Care",
    price: "€15.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-renovateur-leather-conditioner.jpg?v=1732421610",
  },
  {
    id: "saphir-mirror-gloss",
    title: "Saphir Mirror Gloss",
    vendor: "Saphir",
    tags: "Featured, Nourishment, Restore, Reviver, Saphir, Shoe Care",
    price: "€12.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-mirror-gloss-wax-polish.jpg?v=1732421610",
  },
  {
    id: "saphir-medaille-dor",
    title: "Saphir Médaille d'Or Cream Polish",
    vendor: "Saphir",
    tags: "Featured, Nourishment, Restore, Reviver, Saphir, Shoe Care",
    price: "€18.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-medaille-dor-cream-polish.jpg?v=1732421610",
  },
  {
    id: "saphir-super-invulner",
    title: "Saphir Super Invulner Waterproofing Spray",
    vendor: "Saphir",
    tags: "Autumn, Protect, Repel, Saphir, Shoe Care, Waterproofing, Winter",
    price: "€16.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-super-invulner-spray.jpg?v=1732421610",
  },
  {
    id: "saphir-suede-brush",
    title: "Saphir Suede Brush",
    vendor: "Saphir",
    tags: "Brush, Saphir, Shoe Care, Suede",
    price: "€12.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-suede-brush.jpg?v=1732421610",
  },
  {
    id: "saphir-deluxe-shoe-care-kit",
    title: "Saphir Deluxe Shoe Care Kit",
    vendor: "Saphir",
    tags: "Featured, Kits, Saphir, Shoe Care",
    price: "€89.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-deluxe-shoe-care-kit.jpg?v=1732421610",
  },
  {
    id: "tarrago-nano-protector",
    title: "Tarrago Nano Protector",
    vendor: "Tarrago",
    tags: "Protect, Repel, Shoe Care, Tarrago, Waterproofing",
    price: "€9.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/tarrago-nano-protector-spray.jpg?v=1732421610",
  },
  {
    id: "tarrago-color-dye",
    title: "Tarrago Color Dye",
    vendor: "Tarrago",
    tags: "Nourishment, Restore, Reviver, Shoe Care, Tarrago",
    price: "€8.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/tarrago-color-dye.jpg?v=1732421610",
  },
  {
    id: "tarrago-sneakers-cleaner",
    title: "Tarrago Sneakers Cleaner",
    vendor: "Tarrago",
    tags: "Cleaner, Cleaning Products, Newest Tarrago Sneakers Cleaner, Shoe Care, Sneakers, Tarrago",
    price: "€7.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/tarrago-sneakers-cleaner.jpg?v=1732421610",
  },
  {
    id: "tarrago-shoe-deodorant",
    title: "Tarrago Shoe Deodorant",
    vendor: "Tarrago",
    tags: "Deodorant, Shoe Care, Tarrago",
    price: "€6.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/tarrago-shoe-deodorant.jpg?v=1732421610",
  },
  {
    id: "tarrago-leather-care-kit",
    title: "Tarrago Leather Care Kit",
    vendor: "Tarrago",
    tags: "Kits, Leather, Shoe Care, Tarrago",
    price: "€19.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/tarrago-leather-care-kit.jpg?v=1732421610",
  },
  {
    id: "collonil-carbon-pro",
    title: "Collonil Carbon Pro Waterproofing Spray",
    vendor: "Collonil",
    tags: "Autumn, Collonil, Protect, Repel, Shoe Care, Waterproofing, Winter",
    price: "€14.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/collonil-carbon-pro-spray.jpg?v=1732421610",
  },
  {
    id: "collonil-leather-gel",
    title: "Collonil Leather Gel",
    vendor: "Collonil",
    tags: "Collonil, Leather, Nourishment, Restore, Reviver, Shoe Care",
    price: "€11.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/collonil-leather-gel.jpg?v=1732421610",
  },
  {
    id: "collonil-organic-cleaner",
    title: "Collonil Organic Cleaner",
    vendor: "Collonil",
    tags: "Cleaner, Cleaning Products, Collonil, Eco, Shoe Care",
    price: "€12.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/collonil-organic-cleaner.jpg?v=1732421610",
  },
  {
    id: "collonil-suede-brush-set",
    title: "Collonil Suede Brush Set",
    vendor: "Collonil",
    tags: "Brush, Collonil, Shoe Care, Suede",
    price: "€16.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/collonil-suede-brush-set.jpg?v=1732421610",
  },
  {
    id: "collonil-1909-supreme-cream",
    title: "Collonil 1909 Supreme Cream",
    vendor: "Collonil",
    tags: "Collonil, Featured, Nourishment, Restore, Reviver, Shoe Care",
    price: "€19.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/collonil-1909-supreme-cream.jpg?v=1732421610",
  },
  {
    id: "kiwi-shoe-polish",
    title: "Kiwi Shoe Polish",
    vendor: "Kiwi",
    tags: "cheap, Kiwi, Nourishment, Restore, Reviver, Shoe Care",
    price: "€3.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/kiwi-shoe-polish.jpg?v=1732421610",
  },
  {
    id: "kiwi-express-shine-sponge",
    title: "Kiwi Express Shine Sponge",
    vendor: "Kiwi",
    tags: "cheap, Kiwi, Nourishment, Restore, Reviver, Shoe Care",
    price: "€2.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/kiwi-express-shine-sponge.jpg?v=1732421610",
  },
  {
    id: "kiwi-suede-protector",
    title: "Kiwi Suede Protector",
    vendor: "Kiwi",
    tags: "cheap, Kiwi, Protect, Repel, Shoe Care, Suede, Waterproofing",
    price: "€4.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/kiwi-suede-protector.jpg?v=1732421610",
  },
  {
    id: "kiwi-shoe-care-kit",
    title: "Kiwi Shoe Care Kit",
    vendor: "Kiwi",
    tags: "cheap, Kits, Kiwi, Shoe Care",
    price: "€9.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/kiwi-shoe-care-kit.jpg?v=1732421610",
  },
  {
    id: "kiwi-odor-eliminator",
    title: "Kiwi Odor Eliminator",
    vendor: "Kiwi",
    tags: "cheap, Deodorant, Kiwi, Shoe Care",
    price: "€3.99",
    comparePrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/kiwi-odor-eliminator.jpg?v=1732421610",
  },
];

// Export the product data
window.productData = productData;
