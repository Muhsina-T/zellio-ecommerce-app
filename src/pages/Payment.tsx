import useCart from "../hooks/useCart";
import useOrder from "../hooks/useOrder";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { generateId } from "../utils/generateId";
import useProducts from "../hooks/useProducts";

export default function Payment() {

  const { cart, total, clearCart } = useCart();

  const { createOrder } = useOrder();

  const { decreaseStock } = useProducts();

  const navigate = useNavigate();

  const [method, setMethod] = useState("COD");


  async function confirm() {
    await createOrder({
      id: generateId(),
      orderNumber: "ZEL" + Math.floor(100000 + Math.random() * 900000),
      items: cart,
      total,
      address: {
        name: "Customer",
        phone: "",
        address: "",
      },
      payment: method,
      status: "Processing",
      date: new Date().toISOString(),
      canReturn: true,
    });

    cart.forEach((item) => {
      decreaseStock(item.product._id || "", item.quantity);
    });

    await clearCart();
    navigate("/orders");
  }


  return (
   <div
  className="
    min-h-screen
    bg-[#FAFAF7]
    text-[#13160F]
    p-6
    sm:p-8
    flex
    items-center
    justify-center
  "
>
  <div
    className="
      w-full
      max-w-lg
      bg-[#FFFFFF]
      border
      border-[#E5E5DD]
      rounded-3xl
      p-6
      sm:p-8
      shadow-sm
    "
  >

    <h1
      className="
        text-3xl
        sm:text-4xl
        font-bold
        text-[#13160F]
      "
    >
      Payment
    </h1>


    <p
      className="
        mt-2
        text-[#7A7E73]
      "
    >
      Choose your preferred payment method
    </p>



    <div className="mt-8">

      <label
        className="
          block
          text-sm
          font-medium
          text-[#3F443A]
          mb-2
        "
      >
        Payment Method
      </label>


      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="
          w-full
          bg-[#FFFFFF]
          border
          border-[#D7D7CD]
          px-4
          py-3
          rounded-2xl
          text-[#13160F]
          outline-none
          cursor-pointer
          transition-all
          focus:border-[#AAD10A]
          focus:ring-4
          focus:ring-[rgba(170,209,10,0.18)]
        "
      >

        <option value="COD">
          Cash on Delivery
        </option>

        <option value="Card">
          Card Payment
        </option>

      </select>

    </div>



    <button
      onClick={confirm}
      className="
        w-full
        mt-8
        bg-[#AAD10A]
        hover:bg-[#C8EE2C]
        text-[#0A0D0A]
        px-8
        py-4
        rounded-2xl
        font-semibold
        transition-all
        duration-300
        shadow-sm
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      Confirm Order
    </button>


  </div>
</div>
  );
}