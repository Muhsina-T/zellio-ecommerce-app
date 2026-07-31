import useCart from "../hooks/useCart";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        bg-[#FAFAF7]
        px-4
        py-6
        lg:px-8
      "
    >

      <div className="flex items-center gap-4 mb-8">
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
          "
        >
          <ArrowLeft size={24} className="text-[#13160F]" />
        </button>
        <h1
          className="
            text-3xl
            lg:text-4xl
            font-bold
            text-[#13160F]
          "
        >
          My Cart
        </h1>
      </div>


      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        "
      >

        {/* Cart Items */}

        <div
          className="
            lg:col-span-2
            grid
            grid-cols-2
            lg:grid-cols-1
            gap-3
            lg:gap-5
          "
        >

          {cart.length === 0 ? (

            <div
              className="
                bg-[#FFFFFF]
                border
                border-[#E5E5DD]
                rounded-3xl
                p-8
                text-center
                text-[#7A7E73]
                shadow-sm
              "
            >
              Cart is empty
            </div>

          ) : (

            cart.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
              />
            ))

          )}

        </div>



        {/* Summary */}

        <CartSummary />


      </div>


    </div>
  );
}