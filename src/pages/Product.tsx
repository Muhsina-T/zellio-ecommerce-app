import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProductDetails from "../components/ProductDetails";

import useProducts from "../hooks/useProducts";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      <button
        onClick={() => navigate(-1)}
        className="
          p-2
          rounded-full
          bg-[#FFFFFF]
          border
          border-[#E5E5DD]
          hover:bg-[#F2F2EC]
          transition-colors
          mb-6
          inline-flex
        "
      >
        <ArrowLeft size={24} className="text-[#13160F]" />
      </button>

      <ProductDetails product={product} />
    </div>
  );
}