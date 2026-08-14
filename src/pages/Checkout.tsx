import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import useCart from "../hooks/useCart";
import PromoCode from "../components/PromoCode";
import useOrder from "../hooks/useOrder";
import { generateId } from "../utils/generateId";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { createOrder } = useOrder();

  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [method, setMethod] = useState("COD");

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

    if (address.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    setError("");

    setShowPayment(true);
  };

  async function confirmOrder() {
    if (method === "Card") {
      try {
        const response = await fetch(
          "http://localhost:5000/api/payment/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: finalPrice }),
          },
        );
        const data = await response.json();

        if (!data.success) {
          setError(data.message || "Failed to create payment order");
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "Zellio",
          description: "Payment for order",
          order_id: data.order.id,
          handler: async function (response: any) {
            const verifyRes = await fetch(
              "http://localhost:5000/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              },
            );
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              await processOrderCreation({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });
            } else {
              setError("Payment verification failed");
            }
          },
          prefill: {
            name: address.name,
            contact: address.phone,
          },
          theme: {
            color: "#AAD10A",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          setError(response.error.description);
        });
        rzp.open();
      } catch (err) {
        console.error("Payment error:", err);
        setError("Something went wrong during payment");
      }
    } else {
      await processOrderCreation();
    }
  }

  async function processOrderCreation(paymentDetails?: any) {
    try {
      const createdOrder = await createOrder({
        id: generateId(),

        orderNumber: "ZEL" + Math.floor(100000 + Math.random() * 900000),

        items: cart.map((item) => {
          const variant = item.product.variants?.find(
            (v) => v.id === item.variantId,
          );

          return {
            product: item.product,

            variantId: item.variantId,

            storage: variant?.storage || item.product.storage,

            color: variant?.color || item.product.color,

            costPrice: Number(variant?.costPrice || 0),

            sellingPrice: Number(variant?.price || item.product.price),

            quantity: item.quantity,
          };
        }),

        total: finalPrice,

        address: {
          name: address.name,
          phone: address.phone,
          address: `${address.address}, ${address.additionalAddress}`,
        },

        payment: paymentDetails
          ? {
              method,
              status: "Paid",
              ...paymentDetails,
            }
          : method,

        status: "Processing",

        date: new Date().toISOString(),

        canReturn: true,
      });

      if (!createdOrder) {
        return;
      }

      await clearCart();

      navigate("/orders");
    } catch (error: any) {
      console.error("Order creation error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to place order",
      );
    }
  }

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
        <h1 className="text-3xl sm:text-4xl font-bold">Checkout</h1>
      </div>

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
                  key={`${item.product._id}-${item.variantId}`}
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
                    ₹
                    {(
                      (item.product.variants?.find(
                        (v) => v.id === item.variantId,
                      )?.price ?? item.product.price) * item.quantity
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Explicit spacer to guarantee space between Cart and Delivery */}
          <div style={{ height: "16px" }}></div>

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
                onChange={(e) =>
                  setAddress({
                    ...address,
                    name: e.target.value,
                  })
                }
              />

              <input
                required
                placeholder="Phone Number *"
                type="tel"
                maxLength={10}
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
                onChange={(e) =>
                  setAddress({
                    ...address,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
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
                onChange={(e) =>
                  setAddress({
                    ...address,
                    address: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setAddress({
                    ...address,
                    additionalAddress: e.target.value,
                  })
                }
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

            <PromoCode setDiscount={setDiscount} />

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
              <span>Total</span>

              <span
                className="
              text-[#5C8A05]
            "
              >
                ₹{finalPrice.toLocaleString()}
              </span>
            </div>

            {!showPayment ? (
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
            ) : (
              <div className="mt-8 border-t border-[#E5E5DD] pt-6">
                <h3 className="text-xl font-bold mb-4">Payment Method</h3>
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
                focus:border-[#AAD10A]
                focus:ring-4
                focus:ring-[rgba(170,209,10,0.18)]
                mb-6
              "
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="Card">Card Payment</option>
                </select>

                <button
                  onClick={confirmOrder}
                  className="
                w-full
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
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
