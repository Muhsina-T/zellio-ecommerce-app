export type Variant = {
  id: number;
  storage: string;
  color: string;
  price: number;
  image: string;
};

export type Review = {
  id: number;
  user: string;
  comment: string;
  rating: number;
};

export interface Product {
  id: number;
  name: string;
  brand: string;

  image: string;
  images: string[];

  rating: number;

  storage: string;
  color: string;
  price: number;

  description: string;
  stock: number;

  reviews: Review[];

  
  variants: Variant[];
}