import type { Product } from "../types/Product";

export const mobiles: Product[] = [
  {
    _id: "1",
    name: "iPhone 16 Pro",
    brand: "Apple",

    image: "...",
    images: ["...", "...", "..."],

    storage: "256 GB",
    color: "Black Titanium",
    price: 129999,
    costPrice: 110000,

    rating: 5,

    description: "...",

    stock: 20,

    reviews: [
      {
        id: 1,
        user: "John",
        comment: "Excellent phone",
        rating: 5,
      },
    ],

    variants: [
      {
        id: 1,
        storage: "128 GB",
        color: "Black Titanium",
        price: 119999,
        costPrice: 100000,
        image: "...",
      },
      {
        id: 2,
        storage: "256 GB",
        color: "Black Titanium",
        price: 129999,
        costPrice: 110000,
        image: "...",
      },
      {
        id: 3,
        storage: "512 GB",
        color: "White Titanium",
        price: 149999,
        costPrice: 125000,
        image: "...",
      },
    ],
  },
];
