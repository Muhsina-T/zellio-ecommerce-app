import useOrder from "../hooks/useOrder";
import type { Order } from "../types/Order";
import OrderCard from "../components/OrderCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Orders() {
  const { orders } = useOrder();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        min-h-screen
        bg-[#FAFAF7]
        px-4
        py-6
        lg:px-8
        overflow-x-hidden
      "
    >

      <div className="flex items-center gap-4">
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
          My Orders
        </h1>
      </div>

      <div style={{ height: '16px' }}></div>



      {orders.length === 0 ? (

        <div
          className="
            bg-[#FFFFFF]
            border
            border-[#E5E5DD]
            rounded-3xl
            p-10
            text-center
            shadow-sm
          "
        >

          <p
            className="
              text-[#7A7E73]
              text-lg
            "
          >
            No orders found
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">

          {orders.map((order: Order) => (

            <OrderCard
              key={order._id}
              order={order}
            />

          ))}

        </div>

      )}


    </motion.div>
  );
}