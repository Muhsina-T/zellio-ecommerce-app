import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";


type Props = {
  products: Product[];
};


export default function ProductGrid({ products }: Props) {


  return (

    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-6
      "
    >

      {
        products.length === 0 ?

        (

          <div
            className="
            col-span-full
            flex
            justify-center
            items-center
            py-20
            text-[#7A7E73]
            "
          >
            No products found.
          </div>

        )

        :

        (

          products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))

        )

      }


    </div>

  );

}