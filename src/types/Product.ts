export type Variant = {
  id: number;
  storage: string;
  color: string;
  costPrice: number;
  price: number;
  image: string;
};

export type Review = {
  _id?: string;
  id?: string | number;
  user: string;
  comment: string;
  rating: number;
};

export interface Product {
  _id?: string;
  id?: string;

  name: string;
  brand: string;

  image: string;
  images: string[];

  rating: number;

  storage: string;
  color: string;

  costPrice: number;
  price: number;

  description: string;
  stock: number;

  reviews?: Review[];

  variants?: Variant[];
}