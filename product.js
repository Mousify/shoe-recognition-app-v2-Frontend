// Create a products.js file with all 46 products from the Excel file
const productData = [
  {
    id: "coccine-cream-elegance",
    title: "Coccine Cream Elegance",
    price: "$3.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-tepalas-su-kempinele-neutralios-spalvos-nr-01-coccine-50-ml-2-1.jpg?v=1732421610",
    tags: "Autumn, Coccine, Protect, Shoe Care, Spring",
  },
  {
    id: "coccine-nano-protector",
    title: "Coccine Nano Protector",
    price: "$5.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/nano-protector-coccine-100-ml-1.jpg?v=1732421610",
    tags: "Coccine, Protect, Repel, Shoe Care, Waterproofing",
  },
  {
    id: "coccine-shoe-stretch",
    title: "Coccine Shoe Stretch",
    price: "$4.50",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-tempiklis-coccine-100-ml-1.jpg?v=1732421610",
    tags: "Accessories, Coccine, Shoe Care",
  },
  {
    id: "coccine-suede-nubuck-cleaner",
    title: "Coccine Suede & Nubuck Cleaner",
    price: "$4.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/zomsos-ir-nubuko-valiklis-coccine-100-ml-1.jpg?v=1732421610",
    tags: "Cleaner, Cleaning Products, Coccine, Shoe Care",
  },
  {
    id: "coccine-leather-cleaner",
    title: "Coccine Leather Cleaner",
    price: "$4.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/odos-valiklis-coccine-100-ml-1.jpg?v=1732421610",
    tags: "Cleaner, Cleaning Products, Coccine, Leather, Shoe Care",
  },
  {
    id: "coccine-shoe-deodorant",
    title: "Coccine Shoe Deodorant",
    price: "$3.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-dezodorantas-coccine-150-ml-1.jpg?v=1732421610",
    tags: "Coccine, Deodorant, Shoe Care",
  },
  {
    id: "coccine-sneaker-cleaner",
    title: "Coccine Sneaker Cleaner",
    price: "$5.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/sportbačių-valiklis-coccine-100-ml-1.jpg?v=1732421610",
    tags: "Cleaner, Cleaning Products, Coccine, Shoe Care, Sneakers",
  },
  {
    id: "coccine-suede-brush",
    title: "Coccine Suede Brush",
    price: "$3.50",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/zomsos-sepetelis-coccine-1.jpg?v=1732421610",
    tags: "Brush, Coccine, Shoe Care, Suede",
  },
  {
    id: "coccine-leather-lotion",
    title: "Coccine Leather Lotion",
    price: "$4.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/odos-losjonas-coccine-150-ml-1.jpg?v=1732421610",
    tags: "Coccine, Leather, Nourishment, Restore, Reviver, Shoe Care",
  },
  {
    id: "coccine-shoe-cream",
    title: "Coccine Shoe Cream",
    price: "$3.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-kremas-juodos-spalvos-nr-01-coccine-50-ml-1.jpg?v=1732421610",
    tags: "Coccine, Nourishment, Restore, Reviver, Shoe Care",
  },
  {
    id: "coccine-shoe-polish",
    title: "Coccine Shoe Polish",
    price: "$4.50",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-blizgis-juodos-spalvos-nr-01-coccine-50-ml-1.jpg?v=1732421610",
    tags: "Coccine, Nourishment, Restore, Reviver, Shoe Care",
  },
  {
    id: "coccine-shoe-care-kit",
    title: "Coccine Shoe Care Kit",
    price: "$12.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batu-prieziuros-rinkinys-coccine-1.jpg?v=1732421610",
    tags: "Best Selling, Coccine, Kits, Shoe Care",
  },
  {
    id: "coccine-water-stop-spray",
    title: "Coccine Water Stop Spray",
    price: "$6.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/vandeniui-atsparus-purskiklis-coccine-400-ml-1.jpg?v=1732421610",
    tags: "Autumn, Coccine, Protect, Repel, Shoe Care, Waterproofing, Winter",
  },
  {
    id: "coccine-suede-renovator",
    title: "Coccine Suede Renovator",
    price: "$5.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/zomsos-ir-nubuko-atnaujintojas-juodos-spalvos-nr-01-coccine-100-ml-1.jpg?v=1732421610",
    tags: "Coccine, Nourishment, Restore, Reviver, Shoe Care, Suede",
  },
  {
    id: "coccine-leather-wax",
    title: "Coccine Leather Wax",
    price: "$4.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/odos-vaškas-bespalvis-nr-00-coccine-50-ml-1.jpg?v=1732421610",
    tags: "Coccine, Leather, Nourishment, Protect, Restore, Shoe Care",
  },
  {
    id: "coccine-sport-insoles",
    title: "Coccine Sport Insoles",
    price: "$7.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/vidpadžiai-sportinei-avalynei-coccine-1-pora-1.jpg?v=1732421610",
    tags: "Coccine, Insole, Insoles, Sport",
  },
  {
    id: "coccine-winter-insoles",
    title: "Coccine Winter Insoles",
    price: "$8.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/šilti-vidpadžiai-coccine-1-pora-1.jpg?v=1732421610",
    tags: "Coccine, Insole, Insoles, Winter",
  },
  {
    id: "coccine-comfort-insoles",
    title: "Coccine Comfort Insoles",
    price: "$6.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/vidpadžiai-su-aktyviosios-anglies-sluoksniu-coccine-1-pora-1.jpg?v=1732421610",
    tags: "Basic, Coccine, Insole, Insoles",
  },
  {
    id: "coccine-gel-insoles",
    title: "Coccine Gel Insoles",
    price: "$9.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/gelinis-vidpadis-coccine-1-pora-1.jpg?v=1732421610",
    tags: "Basic, Coccine, Insole, Insoles",
  },
  {
    id: "coccine-leather-laces",
    title: "Coccine Leather Laces",
    price: "$3.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/odiniai-batraiščiai-coccine-90-cm-1-pora-1.jpg?v=1732421610",
    tags: "Accessories, Coccine, Laces",
  },
  {
    id: "coccine-shoe-horn",
    title: "Coccine Shoe Horn",
    price: "$2.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batų-šaukštas-coccine-1.jpg?v=1732421610",
    tags: "Accessories, Coccine, Horns",
  },
  {
    id: "coccine-shoe-trees",
    title: "Coccine Shoe Trees",
    price: "$8.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/batų-kurpaliai-coccine-1-pora-1.jpg?v=1732421610",
    tags: "Accessories, Coccine, Trees",
  },
  {
    id: "coccine-eco-cleaner",
    title: "Coccine Eco Cleaner",
    price: "$6.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/eco-valiklis-coccine-100-ml-1.jpg?v=1732421610",
    tags: "Cleaner, Cleaning Products, Coccine, Eco, Shoe Care",
  },
  {
    id: "coccine-sneaker-whitener",
    title: "Coccine Sneaker Whitener",
    price: "$5.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/sportbačių-baliklis-coccine-75-ml-1.jpg?v=1732421610",
    tags: "Cleaner, Cleaning Products, Coccine, Newest Coccine Sneaker Whitener, Shoe Care, Sneakers",
  },
  {
    id: "coccine-foam-cleaner",
    title: "Coccine Foam Cleaner",
    price: "$6.99",
    vendor: "Coccine",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/universalus-valiklis-coccine-200-ml-1.jpg?v=1732421610",
    tags: "Cleaner, Cleaning Products, Coccine, Foam, Shoe Care",
  },
  {
    id: "saphir-renovateur",
    title: "Saphir Renovateur",
    price: "$15.99",
    vendor: "Saphir",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-renovateur-leather-conditioner.jpg?v=1732421610",
    tags: "Best Selling Saphir Renovateur, Featured, Leather, Nourishment, Restore, Reviver, Saphir, Shoe Care",
  },
  {
    id: "saphir-mirror-gloss",
    title: "Saphir Mirror Gloss",
    price: "$12.99",
    vendor: "Saphir",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-mirror-gloss-wax-polish.jpg?v=1732421610",
    tags: "Featured, Nourishment, Restore, Reviver, Saphir, Shoe Care",
  },
  {
    id: "saphir-medaille-dor",
    title: "Saphir Médaille d'Or Cream Polish",
    price: "$18.99",
    vendor: "Saphir",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-medaille-dor-cream-polish.jpg?v=1732421610",
    tags: "Featured, Nourishment, Restore, Reviver, Saphir, Shoe Care",
  },
  {
    id: "saphir-super-invulner",
    title: "Saphir Super Invulner Waterproofing Spray",
    price: "$16.99",
    vendor: "Saphir",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-super-invulner-spray.jpg?v=1732421610",
    tags: "Autumn, Protect, Repel, Saphir, Shoe Care, Waterproofing, Winter",
  },
  {
    id: "saphir-suede-brush",
    title: "Saphir Suede Brush",
    price: "$12.99",
    vendor: "Saphir",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-suede-brush.jpg?v=1732421610",
    tags: "Brush, Saphir, Shoe Care, Suede",
  },
  {
    id: "saphir-deluxe-shoe-care-kit",
    title: "Saphir Deluxe Shoe Care Kit",
    price: "$89.99",
    vendor: "Saphir",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/saphir-deluxe-shoe-care-kit.jpg?v=1732421610",
    tags: "Featured, Kits, Saphir, Shoe Care",
  },
  {
    id: "tarrago-nano-protector",
    title: "Tarrago Nano Protector",
    price: "$9.99",
    vendor: "Tarrago",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/tarrago-nano-protector-spray.jpg?v=1732421610",
    tags: "Protect, Repel, Shoe Care, Tarrago, Waterproofing",
  },
  {
    id: "tarrago-color-dye",
    title: "Tarrago Color Dye",
    price: "$8.99",
    vendor: "Tarrago",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/tarrago-color-dye.jpg?v=1732421610",
    tags: "Nourishment, Restore, Reviver, Shoe Care, Tarrago",
  },
  {
    id: "tarrago-sneakers-cleaner",
    title: "Tarrago Sneakers Cleaner",
    price: "$7.99",
    vendor: "Tarrago",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/tarrago-sneakers-cleaner.jpg?v=1732421610",
    tags: "Cleaner, Cleaning Products, Newest Tarrago Sneakers Cleaner, Shoe Care, Sneakers, Tarrago",
  },
  {
    id: "tarrago-shoe-deodorant",
    title: "Tarrago Shoe Deodorant",
    price: "$6.99",
    vendor: "Tarrago",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/tarrago-shoe-deodorant.jpg?v=1732421610",
    tags: "Deodorant, Shoe Care, Tarrago",
  },
  {
    id: "tarrago-leather-care-kit",
    title: "Tarrago Leather Care Kit",
    price: "$19.99",
    vendor: "Tarrago",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/tarrago-leather-care-kit.jpg?v=1732421610",
    tags: "Kits, Leather, Shoe Care, Tarrago",
  },
  {
    id: "collonil-carbon-pro",
    title: "Collonil Carbon Pro Waterproofing Spray",
    price: "$14.99",
    vendor: "Collonil",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/collonil-carbon-pro-spray.jpg?v=1732421610",
    tags: "Autumn, Collonil, Protect, Repel, Shoe Care, Waterproofing, Winter",
  },
  {
    id: "collonil-leather-gel",
    title: "Collonil Leather Gel",
    price: "$11.99",
    vendor: "Collonil",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/collonil-leather-gel.jpg?v=1732421610",
    tags: "Collonil, Leather, Nourishment, Restore, Reviver, Shoe Care",
  },
  {
    id: "collonil-organic-cleaner",
    title: "Collonil Organic Cleaner",
    price: "$12.99",
    vendor: "Collonil",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/collonil-organic-cleaner.jpg?v=1732421610",
    tags: "Cleaner, Cleaning Products, Collonil, Eco, Shoe Care",
  },
  {
    id: "collonil-suede-brush-set",
    title: "Collonil Suede Brush Set",
    price: "$16.99",
    vendor: "Collonil",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/collonil-suede-brush-set.jpg?v=1732421610",
    tags: "Brush, Collonil, Shoe Care, Suede",
  },
  {
    id: "collonil-1909-supreme-cream",
    title: "Collonil 1909 Supreme Cream",
    price: "$19.99",
    vendor: "Collonil",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/collonil-1909-supreme-cream.jpg?v=1732421610",
    tags: "Collonil, Featured, Nourishment, Restore, Reviver, Shoe Care",
  },
  {
    id: "kiwi-shoe-polish",
    title: "Kiwi Shoe Polish",
    price: "$3.99",
    vendor: "Kiwi",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/kiwi-shoe-polish.jpg?v=1732421610",
    tags: "cheap, Kiwi, Nourishment, Restore, Reviver, Shoe Care",
  },
  {
    id: "kiwi-express-shine-sponge",
    title: "Kiwi Express Shine Sponge",
    price: "$2.99",
    vendor: "Kiwi",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/kiwi-express-shine-sponge.jpg?v=1732421610",
    tags: "cheap, Kiwi, Nourishment, Restore, Reviver, Shoe Care",
  },
  {
    id: "kiwi-suede-protector",
    title: "Kiwi Suede Protector",
    price: "$4.99",
    vendor: "Kiwi",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/kiwi-suede-protector.jpg?v=1732421610",
    tags: "cheap, Kiwi, Protect, Repel, Shoe Care, Suede, Waterproofing",
  },
  {
    id: "kiwi-shoe-care-kit",
    title: "Kiwi Shoe Care Kit",
    price: "$9.99",
    vendor: "Kiwi",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/kiwi-shoe-care-kit.jpg?v=1732421610",
    tags: "cheap, Kits, Kiwi, Shoe Care",
  },
  {
    id: "kiwi-odor-eliminator",
    title: "Kiwi Odor Eliminator",
    price: "$3.99",
    vendor: "Kiwi",
    image:
      "https://cdn.shopify.com/s/files/1/0922/4883/4388/files/kiwi-odor-eliminator.jpg?v=1732421610",
    tags: "cheap, Deodorant, Kiwi, Shoe Care",
  },
];

// Export the product data
window.productData = productData;