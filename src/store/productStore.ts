import { create } from "zustand";
import type { Product } from "../types/Product";
import { mobiles } from "../data/mobiles";


type ProductStore = {

  products: Product[];

  addProduct: (product: Product)=>void;

  deleteProduct:(id:number)=>void;

};


export const useProductStore = create<ProductStore>((set)=>({

  products: mobiles,


  addProduct:(product)=>set((state)=>({

    products:[
      ...state.products,
      product
    ]

  })),


  deleteProduct:(id)=>set((state)=>({

    products:
    state.products.filter(
      item=>item.id !== id
    )

  }))


}));