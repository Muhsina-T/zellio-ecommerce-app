import { useParams } from "react-router-dom";

import ProductDetails from "../components/ProductDetails";

import useProducts from "../hooks/useProducts";

export default function Product() {
  const { id } = useParams();

  const { products } = useProducts();

  const product = products.find(
    (item) => item.id === Number(id)
  );


  if (!product) {
    return (
      <div
        className="
          min-h-screen
          bg-[#FAFAF7]
          flex
          items-center
          justify-center
        "
      >
        <h1
          className="
            text-2xl
            font-bold
            text-[#13160F]
          "
        >
          Product Not Found
        </h1>
      </div>
    );
  }


  return (
    <div
      className="
        min-h-screen
        bg-[#FAFAF7]
        text-[#13160F]
        px-4
        sm:px-6
        lg:px-10
        py-6
      "
    >
      <ProductDetails product={product} />
    </div>
  );
}