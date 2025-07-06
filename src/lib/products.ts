import type { Product } from './types';

const products: Product[] = [
  {
    productId: '1',
    name: 'Omani Frankincense Resin',
    description: 'Aromatic resin for incense.',
    longDescription: 'Sourced from the Dhofar region, this high-quality frankincense resin is perfect for creating a calming and aromatic atmosphere in your home. Traditionally used in ceremonies and for its therapeutic properties.',
    price: 25.00,
    imageUrl: '/Frankincense-Salalah-Dhofar.png',
    category: 'Spices',
  },
  {
  productId: '2',
  name: 'Handwoven Bedouin Rug',
  description: 'Vibrant, handcrafted textile.',
  longDescription: 'A beautiful, one-of-a-kind rug handwoven by Bedouin artisans...',
  price: 150.00,
  imageUrl: '/rug.jpg',
  category: 'Textiles',
},
  {
    productId: '3',
    name: 'Bahla Terracotta Pot',
    description: 'Artisanal, unglazed pottery.',
    longDescription: 'Handcrafted in the famous pottery town of Bahla, this terracotta pot showcases the raw beauty of Omani clay. Its unglazed finish and classic shape make it a timeless piece for both decorative and practical use.',
    price: 45.00,
    imageUrl: '/cdn4.premiumread.com.jpeg',
    category: 'Pottery',
  },
  {
    productId: '4',
    name: 'Khalas Dates Selection',
    description: 'Premium Omani dates.',
    longDescription: 'A selection of the finest Khalas dates, known for their rich, caramel-like flavor and soft texture. These premium dates are a healthy and delicious treat, perfect for gifting or personal enjoyment.',
    price: 18.50,
    imageUrl: '/khalas-pitloos-5kg-tomoor0050.jpg',
    category: 'Dates',
  },
  {
    productId: '5',
    name: 'Silver Khanjar Pendant',
    description: 'Symbolic Omani dagger necklace.',
    longDescription: 'An elegant silver pendant shaped like the Khanjar, the traditional Omani dagger. This piece of jewelry is a symbol of heritage and pride, intricately designed to be worn as a statement of Omani culture.',
    price: 85.00,
    imageUrl: '/hvwo%20126%20xx.jpg',
    category: 'Jewelry',
  },
  {
    productId: '6',
    name: 'Mixed Omani Spices (Bzar)',
    description: 'Aromatic blend for cooking.',
    longDescription: 'A traditional Omani spice blend (Bzar) that adds depth and warmth to stews, rice, and grilled meats. This aromatic mix includes coriander, cumin, turmeric, and other secret spices for an authentic taste of Oman.',
    price: 12.00,
    imageUrl: '/exotic-spices-old-souq-mutrah-oman-traditional-bazaar-ingredients-omani-cuisine-264485533.jpg.webp',
    category: 'Spices',
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.productId === id);
}