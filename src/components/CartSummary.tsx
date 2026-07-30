import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function CartSummary() {
  const { total } = useCart();

  return (
    <div
      className="
        bg-[#FFFFFF]
        border
        border-[#E5E5DD]
        rounded-3xl
        p-6
        shadow-sm
        lg:sticky
        lg:top-24
        h-fit
      "
    >
      <h2 className="text-2xl font-bold text-[#13160F]">
        Order Summary
      </h2>

      <div className="mt-6 border-t border-[#E5E5DD] pt-5 space-y-2">
        <div className="flex justify-between text-[#7A7E73]">
          <span>Subtotal</span>
          <span>₹{total.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-[#7A7E73]">
          <span>Shipping</span>
          <span className="text-[#5C8A05] font-medium">Free</span>
        </div>

        <div className="border-t border-[#E5E5DD] pt-4 mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-[#13160F]">
            Total
          </span>

          <span className="text-3xl font-bold text-[#5C8A05]">
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="
          mt-8
          w-full
          flex
          items-center
          justify-center
          rounded-2xl
          bg-[#AAD10A]
          text-[#0A0D0A]
          font-semibold
          py-3
          border
          border-[#AAD10A]
          shadow-sm
          transition-all
          duration-300
          hover:bg-[#C8EE2C]
          hover:border-[#C8EE2C]
          hover:-translate-y-0.5
          hover:shadow-md
        "
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}