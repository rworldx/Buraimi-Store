export interface Product {
  productId: string;
  name: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  price: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileDescription: string;
  purchaseHistory: Product[];
}
