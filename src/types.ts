export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
   ягоды: number; // number of berries
  toppings: string[];
  tag?: string; // 'Start Pack', 'Bestseller', 'Hit', 'New', 'Royal'
  image: string; // Emoji, SVG, or Picsum/custom placeholder URL
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  instagramTag?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
