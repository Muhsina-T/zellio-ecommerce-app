import useCart from "../hooks/useCart";
import useOrder from "../hooks/useOrder";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useProducts from "../hooks/useProducts";
import axios from "axios";

export default function Payment() {

  const { cart, total, clearCart } = useCart();

  const { createOrder } = useOrder();

  const { decreaseStock } = useProducts();

  const navigate = useNavigate();

  const [method, setMethod] = useState("COD");

  const token = localStorage.getItem("token");


  async function confirm() {

    const orderData = {

      orderNumber:
        "ZEL" + Math.floor(100000 + Math.random() * 900000),

      items: cart,

      total,

      address: {
        name: "Customer",
        phone: "",
        address: "",
      },

      payment: method,

      status: "Processing" as const,

      canReturn: true,

      date: new Date().toISOString(),
    };


    // COD PAYMENT
    if (method === "COD") {

      await createOrder(orderData);


      cart.forEach((item) => {

        decreaseStock(
          item.product._id || item.product.id || "",
          item.quantity
        );

      });


      await clearCart();

      navigate("/orders");

      return;
    }



    // CREATE DATABASE ORDER
    const order = await createOrder(orderData);



    // CREATE RAZORPAY ORDER
    const response = await axios.post(

      "http://localhost:5000/api/payment/create-order",

      {
        amount: total,
      },

      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }

    );



    const options = {

      key:
      import.meta.env.VITE_RAZORPAY_KEY_ID,


      amount:
      response.data.amount,


      currency:"INR",


      name:"Zellio",


      description:"Order Payment",


      order_id:
      response.data.id,


      handler: async function(
        razorpayResponse:any
      ){


        await axios.put(

          `http://localhost:5000/api/orders/${order?._id}/payment`,

          {

            razorpayOrderId:
            razorpayResponse.razorpay_order_id,


            razorpayPaymentId:
            razorpayResponse.razorpay_payment_id,


            razorpaySignature:
            razorpayResponse.razorpay_signature,

          },


          {
            headers:{
              Authorization:
              `Bearer ${token}`
            }
          }

        );



        cart.forEach((item)=>{

          decreaseStock(
            item.product._id || item.product.id || "",
            item.quantity
          );

        });



        await clearCart();

        navigate("/orders");

      }

    };



    const razorpay =
      new window.Razorpay(options);


    razorpay.open();

  }



  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 mt-24">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Order Total: ₹{total}</h2>
        <div className="mb-6">
          <label className="block mb-2 font-medium">Select Payment Method</label>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="payment_method" 
                value="COD" 
                checked={method === "COD"} 
                onChange={() => setMethod("COD")} 
                className="w-4 h-4"
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="payment_method" 
                value="Razorpay" 
                checked={method === "Razorpay"} 
                onChange={() => setMethod("Razorpay")} 
                className="w-4 h-4"
              />
              Pay Online (Razorpay)
            </label>
          </div>
        </div>
        <button 
          onClick={confirm}
          className="w-full bg-black text-white font-bold py-3 px-4 rounded-xl hover:bg-opacity-90 transition-all"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}