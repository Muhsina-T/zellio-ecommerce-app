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
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      gap-4
      sm:gap-5
      lg:gap-6
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