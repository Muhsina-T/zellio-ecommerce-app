import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCart from "../hooks/useCart";
import PromoCode from "../components/PromoCode";

export default function Checkout() {
  const { cart, total } = useCart();

  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    additionalAddress: "",
  });

  const [error, setError] = useState("");

  const finalPrice = total - (total * discount) / 100;

  const handlePayment = () => {
    if (
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.additionalAddress
    ) {
      setError("Please fill all delivery details");

      return;
    }

    setError("");

    navigate("/payment", {
      state: {
        address,
        total: finalPrice,
      },
    });
  };

  return (
    <div
  className="
    min-h-screen
    bg-[#FAFAF7]
    px-4
    py-6
    sm:px-6
    lg:px-10
    text-[#13160F]
  "
>
  <h1 className="text-3xl sm:text-4xl font-bold mb-8">
    Checkout
  </h1>


  <div
    className="
      grid
      grid-cols-1
      lg:grid-cols-3
      gap-6
      lg:gap-8
    "
  >

    {/* LEFT SIDE */}

    <div
      className="
        lg:col-span-2
        space-y-6
      "
    >

      {/* Products */}

      <div
        className="
          bg-[#FFFFFF]
          border
          border-[#E5E5DD]
          rounded-3xl
          shadow-sm
          p-6
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            text-[#13160F]
            mb-5
          "
        >
          Your Cart
        </h2>


        <div className="space-y-4">

          {cart.map((item) => (

            <div
              key={item.product.id}
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
                border-b
                border-[#E5E5DD]
                pb-4
              "
            >

              <div>

                <h3
                  className="
                    font-semibold
                    text-base
                    sm:text-lg
                    text-[#13160F]
                  "
                >
                  {item.product.name}
                </h3>


                <p
                  className="
                    text-sm
                    text-[#7A7E73]
                  "
                >
                  Quantity: {item.quantity}
                </p>

              </div>


              <p
                className="
                  font-bold
                  text-[#5C8A05]
                  text-lg
                  sm:text-xl
                "
              >
                ₹{(item.product.price * item.quantity).toLocaleString()}
              </p>


            </div>

          ))}

        </div>

      </div>



      {/* Delivery Details */}


      <div
        className="
          bg-[#FFFFFF]
          border
          border-[#E5E5DD]
          rounded-3xl
          shadow-sm
          p-5
          sm:p-6
        "
      >

        <h2
          className="
            text-xl
            sm:text-2xl
            font-bold
            mb-5
          "
        >
          Delivery Details
        </h2>


        {error && (

          <p
            className="
              bg-red-50
              text-red-600
              border
              border-red-200
              p-3
              rounded-2xl
              mb-4
            "
          >
            {error}
          </p>

        )}



        <div className="space-y-4">


          <input
            required
            placeholder="Full Name *"
            className="
              w-full
              border
              border-[#D7D7CD]
              bg-[#FFFFFF]
              p-3
              rounded-2xl
              outline-none
              text-sm
              sm:text-base
              focus:border-[#AAD10A]
              focus:ring-4
              focus:ring-[rgba(170,209,10,0.18)]
            "
            value={address.name}
            onChange={(e)=>setAddress({
              ...address,
              name:e.target.value
            })}
          />



          <input
            required
            placeholder="Phone Number *"
            type="tel"
            className="
              w-full
              border
              border-[#D7D7CD]
              bg-[#FFFFFF]
              p-3
              rounded-2xl
              outline-none
              text-sm
              sm:text-base
              focus:border-[#AAD10A]
              focus:ring-4
              focus:ring-[rgba(170,209,10,0.18)]
            "
            value={address.phone}
            onChange={(e)=>setAddress({
              ...address,
              phone:e.target.value
            })}
          />



          <textarea
            required
            placeholder="House / Street Address *"
            rows={3}
            className="
              w-full
              border
              border-[#D7D7CD]
              bg-[#FFFFFF]
              p-3
              rounded-2xl
              outline-none
              resize-none
              text-sm
              sm:text-base
              focus:border-[#AAD10A]
              focus:ring-4
              focus:ring-[rgba(170,209,10,0.18)]
            "
            value={address.address}
            onChange={(e)=>setAddress({
              ...address,
              address:e.target.value
            })}
          />



          <input
            required
            placeholder="City, State, Pincode / Landmark *"
            className="
              w-full
              border
              border-[#D7D7CD]
              bg-[#FFFFFF]
              p-3
              rounded-2xl
              outline-none
              text-sm
              sm:text-base
              focus:border-[#AAD10A]
              focus:ring-4
              focus:ring-[rgba(170,209,10,0.18)]
            "
            value={address.additionalAddress}
            onChange={(e)=>setAddress({
              ...address,
              additionalAddress:e.target.value
            })}
          />


        </div>


      </div>


    </div>





    {/* SUMMARY */}


    <div>

      <div
        className="
          bg-[#FFFFFF]
          border
          border-[#E5E5DD]
          rounded-3xl
          shadow-sm
          p-5
          sm:p-6
          lg:sticky
          lg:top-5
        "
      >


        <h2
          className="
            text-2xl
            font-bold
            mb-5
          "
        >
          Order Summary
        </h2>



        <PromoCode setDiscount={setDiscount}/>



        <div
          className="
            flex
            justify-between
            items-center
            mt-6
            text-lg
            sm:text-xl
            font-bold
          "
        >

          <span>
            Total
          </span>


          <span
            className="
              text-[#5C8A05]
            "
          >
            ₹{finalPrice.toLocaleString()}
          </span>


        </div>



        <button
          onClick={handlePayment}
          className="
            w-full
            mt-6
            bg-[#AAD10A]
            hover:bg-[#C8EE2C]
            text-[#0A0D0A]
            py-3.5
            sm:py-4
            rounded-2xl
            font-bold
            transition-all
            duration-300
            shadow-sm
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          Continue Payment
        </button>


      </div>


    </div>


  </div>


</div>
  );
}
